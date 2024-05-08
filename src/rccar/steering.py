import asyncio
import socket
import json
from gpiozero import Servo

servo = Servo(18)
esc = Servo(19)
bufferSize = 1024

async def receive_udp_message():
    # Create a UDP socket
    UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
    UDPClientSocket.setblocking(False)
    # Bind the socket to all interfaces on a given port (replace `9999` with your port number)
    UDPClientSocket.bind(("10.3.141.1", 3107))

    UDPClientSocket.sendto(str.encode("Hello"), ("10.3.141.233", 3107))

    loop = asyncio.get_running_loop()
    while True:
        try:
            # Wait for a message to be received
            data, addr = await loop.sock_recvfrom(UDPClientSocket, bufferSize)
            msg = f"Message from Server {data.decode()}"
            print(msg)
            return json.loads(data.decode().replace("'", "\"").encode())
        except socket.error:
            # Non-blocking socket would raise an error if no data is available
            await asyncio.sleep(0.1)  # Add a short delay to prevent CPU spin
            continue

async def control_servo():
    while True:
        jsonMsg = await receive_udp_message()
        if jsonMsg['type'] == 'control':
            steeringSent = int(jsonMsg['values']['steering'])
            print("Steering in Grad: ", steeringSent)
            # Position the servo based on steering value
            if steeringSent != 0:
                servo.value = steeringSent / 90.0  # Assuming values between -90 and 90
            if float(jsonMsg['values']['accelerating']) != 0:
                power = float(jsonMsg['values']['accelerating'])
                power = power / 50 - 1
                if power > 0.2:
                    power = 0.2
                if float(jsonMsg['values']['braking']) > 0:
                    power = -1
                esc.value = power

async def main():
    try:
        await control_servo()
    except KeyboardInterrupt:
        print("Programm wurde gestoppt")

# Run the main function
asyncio.run(main())

#from gpiozero import Servo
#from time import sleep
#import socket
#import json

#servo = Servo(18)

#bufferSize = 1024

#UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
#UDPClientSocket.setblocking(0)
#UDPClientSocket.sendto(str.encode("Hello"), ("10.3.141.233", 3107))

#try:
#    print("Listening...")
#    while True:
#        print("loop")
#        msgFromServer = ""
#        try:
#            msgFromServer = UDPClientSocket.recvfrom(bufferSize)
#            msg = f"Message from Server {msgFromServer[0]}"
            #print(msg)
            
#           try:
#               jsonStr = msgFromServer[0].decode().replace("'", "\"")
               #print("jsonStr: ", jsonStr)
#               jsonMsg = json.loads(jsonStr.encode())
               #print(msgFromServer[0].decode())
#            except Exception as e: print(e)
            #print("jsonMsg: ", jsonMsg)
#        except:
#            pass
#
#        if msgFromServer != "":
#            if jsonMsg['type'] == 'control':
#                steeringSent = jsonMsg['values']['steering']
#                steeringSent = int(steeringSent)
#                steeringSent -= 90

#                print("Steering in Grad: ", steeringSent)

#except KeyboardInterrupt:
#    print("Programm wurde gestoppt")
