import json
import socket

# from pathlib import Path
# print(Path(__file__).parent.parent)

from src.steeringwheel.SteeringWheel import SteeringWheel

class ServerUDP:

    def __init__(self):
        # load configurations from server
        with open('../../config.json', 'r') as f:
            serverConfig = json.load(f)
            serverConfig = serverConfig['backend']

        # retrieve host ip address
        host = socket.gethostname()
        hostIP = socket.gethostbyname(host)

        # create UDP socket
        serverSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

        # set class parameters
        self.socket = serverSocket
        self.hostIP = hostIP
        self.clientIP = serverConfig['client']['ip']
        self.port = serverConfig['server']['port'] 
        self.bufferSize = serverConfig['server']['bufferSize']

    def start(self, msg):
        # start server
        self.socket.bind((self.hostIP, self.port))
        print(f"UDP server listening on port {self.port} with IP {self.hostIP}...")

        # listen for incoming messages
        while True:
            # receive message
            bytesAddressPair = self.socket.recvfrom(self.bufferSize)

            # retrieve message and address from client
            message = bytesAddressPair[0]
            address = bytesAddressPair[1]

            # print received message from correct client
            if self.clientIP in address:
                print(f"Message from Client: {message}")
            else:
                print(f"Message from unknown Client: {address}")

            self.socket.sendto(str.encode(msg), address)

            wheel = SteeringWheel()
            connected = wheel.getConnectedJoysticks()
            selected = 0

            if wheel.initWheel(connected[selected]):

                wheelInput = wheel.getInput()
                if wheelInput is not None:
                    controlsMessage = str(wheelInput)
                    self.socket.sendto(str.encode(controlsMessage), address)

                if not wheel.checkConnection():
                    controlsMessage = "Lost connection to wheel"
                    self.socket.sendto(str.encode(controlsMessage), address)
                    break

            else:
                print("Initialization failed")


ServerUDP().start("Hello World!")


