from gpiozero import Servo
from time import sleep
import socket
import json

servo = Servo(18)

bufferSize = 1024

UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
UDPClientSocket.setblocking(0)

try:
    while True:
        msgFromServer = ""
        try:
            msgFromServer = UDPClientSocket.recvfrom(bufferSize)
            msg = f"Message from Server {msgFromServer[0]}"
            print(msg)

            jsonMsg = json.dumps(msg)
        except:
            pass

        if msgFromServer != "":
            if jsonMsg['type'] == 'control':
                steeringSent = jsonMsg['values']['steering']
                steeringSent = int(steeringSent)
                steeringSent -= 90

                print("Steering in Grad: ", steeringSent)

except KeyboardInterrupt:
    print("Programm wurde gestoppt")