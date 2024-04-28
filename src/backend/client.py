import socket
import time

msgFromClient = "Hello UDP Server"

bytesToSend = str.encode(msgFromClient)

serverAddressPort = ("192.168.137.175", 3107)

bufferSize = 1024

# Create a UDP socket at client side

UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

# Send to server using created UDP socket

UDPClientSocket.sendto(bytesToSend, serverAddressPort)
currentTime = time.time()

while True:
    UDPClientSocket.sendto(bytesToSend, serverAddressPort)
    UDPClientSocket.settimeout(10)

    try:
        msgFromServer = UDPClientSocket.recvfrom(bufferSize)
        msg = f"{currentTime}: Message from Server {msgFromServer[0]}"

        print(msg)

    except socket.timeout:
        print("timed out")
