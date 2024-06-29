import asyncio
import socket
import json
from gpiozero import Servo
import time

# initialize PWM outputs for esc and steering servo

servo = Servo(18)
esc = Servo(19)
bufferSize = 1024

# debug print statement flag

debug = False

# define maximum speeds for forward and reverse

maxSpeedPos = 50
maxSpeedNeg = 20

# define standard drive mode as normal mode

currentMode = 0

# define UDP connection

UDP_IP = "10.3.141.1"
UDP_PORT = 3107


async def send_udp_message(message, dest_ip, dest_port):
    """
    Send a UDP message to a specific IP address and port
    """
    # Create a UDP socket
    UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
    UDPClientSocket.setblocking(False)

    # Encode the message to bytes
    message_bytes = json.dumps(message).encode()

    loop = asyncio.get_running_loop()
    try:
        # Send the message
        await loop.sock_sendall(UDPClientSocket, message_bytes, (dest_ip, dest_port))
        if debug:
            print(f"Message sent to {dest_ip}:{dest_port}")
    except socket.error as e:
        # Handle the socket error
        print(f"Error during UDP send message: {e}")
    finally:
        # Close the socket
        UDPClientSocket.close()


async def receive_udp_message():
    """
    Receive all UDP messages sent by PC
    """
    # Create a UDP socket
    UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
    UDPClientSocket.setblocking(False)
    UDPClientSocket.bind((UDP_IP, UDP_PORT))

    loop = asyncio.get_running_loop()
    while True:
        try:
            # Wait for a message to be received
            data, addr = await loop.sock_recvfrom(UDPClientSocket, bufferSize)
            msg = f"Message from Server {data.decode()}"
            if debug:
                print(msg)
            return json.loads(data.decode().replace("'", "\"").encode())
        except socket.error:
            # Non-blocking socket would raise an error if no data is available
            await asyncio.sleep(0.1)  # Add a short delay to prevent CPU spin
            full_brake()
            return None, False


def getSteering(jsonMsg):
    """
    Returns requested steering by PC
    """
    if jsonMsg['type'] != 'control':
        return servo.value
    if debug:
        print("Raw Steering Angle: ", jsonMsg['values']['steering'])
    steering = jsonMsg['values']['steering']
    if steering > 90:
        steering = 90
    if steering < -90:
        steering = -90
    return steering


def estimateSpeed(escValue):
    """
    Speed estimation based on calculated value of ESC
    escValue = 0.5: no speed
    escValue = 1: maximum speed
    escValue = 0: minimum speed
    """
    if escValue > 0.5:
        # Interpolating between 0.5 (stop) to 1 (full forward)
        currentSpeed = (escValue - 0.5) * 2 * maxSpeedPos
    elif escValue < 0.5:
        # Interpolating between 0 (full reverse) to 0.5 (stop)
        currentSpeed = (escValue - 0.5) * 2 * maxSpeedNeg
    else:
        # escValue == 0.5
        currentSpeed = 0
    
    return currentSpeed


def limitSpeed(reqEscValue, speedLimit):
    """
    Calculates new value for ESC based on configured speed limit
    """
    # Calculate the requested speed
    reqSpeed = estimateSpeed(reqEscValue)
    
    # Limit the speed
    if reqSpeed > speedLimit:
        limitedSpeed = speedLimit
    elif reqSpeed < -speedLimit:
        limitedSpeed = -speedLimit
    else:
        limitedSpeed = reqSpeed
    
    # Find the corresponding ESC value for the limited speed
    if limitedSpeed > 0:
        limitedEscValue = (limitedSpeed / 50) / 2 + 0.5
    elif limitedSpeed < 0:
        limitedEscValue = (limitedSpeed / 20) / 2 + 0.5
    else:
        limitedEscValue = 0.5
    
    return limitedEscValue


def getPower(jsonMsg):
    """
    Returns requested power by PC
    """
    if jsonMsg['type'] != 'control':
        return esc.value
    if debug:
        print("Raw Accel: ", jsonMsg['values']['accelerating'])
        print("Raw Braking: ", jsonMsg['values']['braking'])
    if jsonMsg['values']['braking'] > 10:
        return -1
    if jsonMsg['values']['accelerating'] > 10:
        return (jsonMsg['values']['accelerating'] - 10) / 90
    return 0


def getSpeedLimit(jsonMsg):
    """
    Returns speed limit sent by PC
    """
    if jsonMsg['type'] != 'mode':
        return maxSpeedPos
    else:
     return jsonMsg['values']['speedlimit']
    

def getMode(jsonMsg):
    """
    Returns current mode sent by PC
    0 = standard mode
    1 = children mode
    2 = offroad mode
    3 = pro mode
    """
    if jsonMsg['type'] != 'mode':
        return currentMode
    
    return jsonMsg['values']['mode']


def createUDPMessage(type, value):
    """
    Creates UDP message in JSON format to be send to PC
    """
    if type == 'drivestatus':
        message = {
            "type": "drivestatus",
            "values": {
                "speed": value
            }
        }
        return json.dumps(message)
    else:
        return ""
    

# Emergency braking if the connection is lost
def full_brake():
    
    esc.value = 0
    time.sleep(0.1)
    esc.value = 0.5

class TractionControl:
    """
    Class to emulate the idea of a traction control (because of no control loop more a acceleration limitation)
    """
    def __init__(self):
            self.previous_speed = 0.5  # Initially stopped
            self.max_acceleration = 0.001  # Maximum allowed acceleration per time step

    def control_acceleration(self, currentSpeed, targetSpeed):
            """
            Limits acceleration to achieve a traction control effect
            """
            # Calculate the allowed change in speed based on max_acceleration
            allowed_speed_change = self.max_acceleration
            
            # Calculate the difference between desired speed and current speed
            speed_difference = targetSpeed - currentSpeed
            
            # Limit the speed change to the allowed speed change
            if abs(speed_difference) > allowed_speed_change:
                if speed_difference > 0:
                    new_speed = currentSpeed + allowed_speed_change
                else:
                    new_speed = currentSpeed - allowed_speed_change
            else:
                new_speed = targetSpeed
            
            self.previous_speed = new_speed

            return new_speed
        

async def control_servo():
    """
    Sets servo and ESC to received value
    """

    tc = TractionControl()

    while True:
        jsonMsg = await receive_udp_message()

        currentMode = getMode(jsonMsg)

        servo.value = getSteering(jsonMsg)

        if currentMode == 0:
            # standard mode
            esc.value = tc.control_acceleration(esc.value, limitSpeed(getPower(jsonMsg), getSpeedLimit(jsonMsg)))
        elif currentMode == 1:
            # Children's mode implemented -> limited speed of 20 km/h
            esc.value = tc.control_acceleration(esc.value, limitSpeed(getPower(jsonMsg), 20))
        elif currentMode == 2:
            # offroad mode
            esc.value = tc.control_acceleration(esc.value, limitSpeed(getPower(jsonMsg), 30))
        elif currentMode == 3:
            # pro mode: no TC and no speed limit
            esc.value = getPower(jsonMsg)

        asyncio.run(send_udp_message(createUDPMessage('drivestatus', estimateSpeed(esc.value)), UDP_IP, UDP_PORT))


async def main():
    try:
        await control_servo()
    except KeyboardInterrupt:
        print("Programm wurde gestoppt")
        full_brake()


# Run the main function
asyncio.run(main())
