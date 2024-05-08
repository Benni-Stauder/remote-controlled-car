import asyncio
import socket
import json
from gpiozero import Servo

# initialize PWM outputs for esc and steering servo

servo = Servo(18)
esc = Servo(19)
bufferSize = 1024

# debug print statement flag

debug = False


async def receive_udp_message():
    # Create a UDP socket
    UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
    UDPClientSocket.setblocking(False)
    # Bind the socket to all interfaces on a given port (replace `9999` with your port number)
    UDPClientSocket.bind(("10.3.141.1", 3107))

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
            continue


def getSteering(jsonMsg):
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


def getPower(jsonMsg):
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


async def control_servo():
    while True:
        jsonMsg = await receive_udp_message()
        servo.value = getSteering(jsonMsg)
        esc.value = getPower(jsonMsg)


async def main():
    try:
        await control_servo()
    except KeyboardInterrupt:
        print("Programm wurde gestoppt")


# Run the main function
asyncio.run(main())
