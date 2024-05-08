import json
import socket
import time
import random

# from pathlib import Path
# print(Path(_file_).parent.parent)

from src.steeringwheel.SteeringWheel import SteeringWheel


class ServerUDP:

    def _init_(self):
        # load configurations from server
        with open('../../config.json', 'r') as f:
            serverConfig = json.load(f)
            serverConfig = serverConfig['backend']

        # retrieve host ip address
        host = socket.gethostname()
        hostIP = socket.gethostbyname(host)

        # create UDP socket
        serverSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
        #serverSocket.setblocking(False)

        # set class parameters
        self.socket = serverSocket
        self.hostIP = hostIP
        self.clientIP = serverConfig['client']['ip']
        self.port = serverConfig['server']['port']
        self.bufferSize = serverConfig['server']['bufferSize']

        self.DEMO_MODE = True
        self.counter = 2

    def demoControllerInput(self):
        #print("demo called")
        button = random.randint(1, 4)
        steering = random.randint(0, 180)

        time.sleep(self.counter)

        # self.counter += 1

        #if button == 1:
        #    return "A, 0"
        #if button == 2:
        #    return "B, 0"
        #if button == 3:
        #    return "X, 0"
        #if button == 4:
        #    return "Y, 0"

        steeringJSON = {"type": "control", "values": {"steering": steering, "accelerating": 0, "braking": 0}}

        return steeringJSON

    def start(self, msg):
        # start server
        self.socket.bind((self.hostIP, self.port))
        print(f"UDP server listening on port {self.port} with IP {self.hostIP}...")

        # Byte 1: steering
        # Byte 2: accelerating
        # Byte 3: braking
        binaryControls = 0x000000

        wheel = SteeringWheel()
        connected = wheel.getConnectedJoysticks()
        selected = 0

        bytesAddressPair = self.socket.recvfrom(self.bufferSize)

        # listen for incoming messages
        while True:
            # receive message
            # try:

            # except timeout:
            #    print("timeout caught")
            #
            # except:
            #    pass

            # # retrieve message and address from client
            message = bytesAddressPair[0]
            address = bytesAddressPair[1]
            #
            # # print received message from correct client
            # if self.clientIP in address:
            #    print(f"Message from Client: {message}")
            # else:
            #    print(f"Message from unknown Client: {address}")

            # self.socket.sendto(str.encode(msg), address)

            try:
                if wheel.initWheel(connected[selected]):
                    # print("wheel initialized")
                    wheelInput = wheel.getInput()
                    if wheelInput is not None:
                        print("wheelInput: ", wheelInput)
                        steering = 0
                        acceleration = 0
                        braking = 0
                        # create the binary message
                        if wheelInput.get("type") == "steering":
                            binaryControls &= 0x00FFFF
                            binaryControls |= wheelInput["value"]
                            if wheelInput["value"] > 90:
                                steering = 90
                            elif wheelInput["value"] < -90:
                                steering = -90
                            else:
                                steering = wheelInput["value"]

                        elif wheelInput.get("type") == "accelerating":
                            binaryControls &= 0xFF00FF
                            binaryControls |= (wheelInput["value"] << 8)
                            acceleration = wheelInput["value"]

                        elif wheelInput.get("type") == "braking":
                            binaryControls &= 0xFFFF00
                            binaryControls |= (wheelInput["value"] << 16)
                            braking = wheelInput["value"]

                        controlJSON = {"type": "control",
                                       "values": {"steering": steering, "accelerating": acceleration,
                                                  "braking": braking}}
                        self.socket.sendto(str.encode(str(controlJSON)), address)

                        # self.socket.sendto(binaryControls.to_bytes(3, byteorder='big'), address)
                        # self.socket.sendto(binaryControls.to_bytes(3, byteorder='big'), (self.clientIP, self.port))

                    if not wheel.checkConnection():
                        controlsMessage = "Lost connection to wheel"
                        # self.socket.sendto(str.encode(controlsMessage), address)
                        self.socket.sendto(str.encode(controlsMessage), (self.clientIP, self.port))
                        break

            except:
                # print("loop")
                wheelInput = self.demoControllerInput()
                if wheelInput != None:
                    # self.socket.sendto(str.encode(str(wheelInput)), (self.clientIP, self.port))
                    self.socket.sendto(str.encode(str(wheelInput)), address)
                    print("msg sent: ", str.encode(str(wheelInput)))


ServerUDP().start("Hello World!")
