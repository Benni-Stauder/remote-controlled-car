import asyncio
import socket
import random
from time import sleep

# Create a UDP socket at client side
UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
serverAddressPort = ("192.168.1.112", 3107)
bufferSize = 1024

while True:
    # generate vehicle data
    speed = random.randint(0, 33)
    rpm = random.randint(0, 100)

    # create binary vehicle data
    binVehicleData = (speed << 8) | rpm

    # send demo vehicle data
    UDPClientSocket.sendto(binVehicleData.to_bytes(2, "big"), serverAddressPort)

    vehicleData, _ = UDPClientSocket.recvfrom(bufferSize)
    print("controls: " + str(vehicleData))
    sleep(1)


