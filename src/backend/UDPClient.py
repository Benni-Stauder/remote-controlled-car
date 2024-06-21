import socket
import json
import random
from time import sleep

"""
This script provides a simulation of the UDP client running on the rc car. It serves as a demonstration of
how the entire communication between backend, frontend and the car works. 

Additionally, this script can be used for testing purposes. 

Hence the data is sent using a binary encoding, this is the byte order:
    - Byte 0: revolutions per minute (rpm)
    - Byte 1: current vehicle speed
    - Byte 2: battery percentage
"""

# load configurations
with open("../../config.json") as f:
    config = json.load(f)
    config = config["backend"]

# Create a UDP client socket
UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
serverIP = config["server"]["ip"]
port = config["port"]
bufferSize = config["bufferSize"]

while True:
    # generate random vehicle data
    speed = random.randint(0, 33)
    rpm = random.randint(0, 100)
    battery = random.randint(0, 100)

    # create binary encoding of vehicle data
    binVehicleData = (battery << 2*8) | (speed << 8) | rpm

    # send the generated vehicle data to the backend
    UDPClientSocket.sendto(binVehicleData.to_bytes(3), (serverIP, port))

    # receive data from backend
    binBackendData, _ = UDPClientSocket.recvfrom(bufferSize)
    binBackendData = int.from_bytes(binBackendData)

    # extract the values from the received byte sequence
    positiveSteering = binBackendData & 0xFF
    acceleration = (binBackendData >> 8) & 0xFF
    braking = (binBackendData >> 2*8) & 0xFF
    driveMode = (binBackendData >> 3*8) & 0xFF
    emergencyStop = (binBackendData >> 4*8) & 0xFF

    # convert data where required
    emergencyStop = "no" if emergencyStop != 0xFF else "yes"
    steering = positiveSteering - 90

    # print all received values
    print(f"Emergency Stop: {emergencyStop}, Drive Mode: {driveMode}, Braking: {braking},"
          f" Acceleration: {acceleration}, Steering: {steering}")

    # limit the sending speed to 100ms for demonstration purpose
    sleep(0.1)


