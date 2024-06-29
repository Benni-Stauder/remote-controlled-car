import asyncio
import json
import socket
import traceback
from pathlib import Path

from src.backend.SharedData import SharedData


class ServerUDP:
    """
    This class handles the UDP communication between backend and rc car.
    """

    def __init__(self, demo=False):
        """
        Initializes the UDP server with  socket parameters.

        :param demo: Boolean flag to turn off timeouts for demo_simulator mode.
        """
        self.protocol = None
        self.transport = None
        self.serverSocket = None
        self.demo = demo

        # Load configurations from server
        self.serverConfig = self.load_config(str(Path(__file__).parent) + '\\..\\config.json')

        # Retrieve host IP address
        self.hostIP = self.get_host_ip()

        # Set socket parameters
        self.clientIP = self.serverConfig['client']['ip']
        self.port = self.serverConfig['port']
        self.bufferSize = self.serverConfig['bufferSize']

    @staticmethod
    def load_config(config_path):
        """
        Loads server configurations from a JSON file.

        :param config_path: Path to the configuration file.
        :return: Dictionary containing the backend configurations.
        """
        with open(config_path) as f:
            serverConfig = json.load(f)
            return serverConfig['backend']

    @staticmethod
    def get_host_ip():
        """
        Retrieves the IP address of the host.

        :return: Host IP address.
        """
        host = socket.gethostname()
        return socket.gethostbyname(host)

    async def start(self):
        """
        Starts the UDP server and waits for incoming messages.
        """
        # Create UDP socket
        self.serverSocket = await self.create_udp_socket()

        print(f"UDP server listening on port {self.port} with IP {self.hostIP}...")

        try:
            # Keep the server running indefinitely
            while True:
                await asyncio.sleep(3600)
        except asyncio.CancelledError:
            pass
        finally:
            self.transport.close()

    async def create_udp_socket(self):
        """
        Creates a UDP socket.

        :return: Configured server socket.
        """
        loop = asyncio.get_running_loop()
        serverSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        serverSocket.bind((self.hostIP, self.port))

        self.transport, self.protocol = await loop.create_datagram_endpoint(
            lambda: UDPServerProtocol(self.clientIP, self.bufferSize),
            sock=serverSocket
        )

        return serverSocket


class UDPServerProtocol:
    """
    UDPServerProtocol handles incoming UDP messages and processes data.
    """

    def __init__(self, clientIP, bufferSize):
        """
        Initializes the UDPServerProtocol.

        :param clientIP: The IP address of the client.
        :param bufferSize: Buffer size for receiving data.
        """
        self.transport = None
        self.clientIP = clientIP
        self.bufferSize = bufferSize

    def connection_made(self, transport):
        """
        Called when a connection is made.

        :param transport: The transport object contains the socket representing the connection.
        """
        self.transport = transport

    def datagram_received(self, data, addr):
        """
        Called when a message is received.

        :param data: The data received.
        :param addr: The address of the client.
        """

        # check if message arrived for the expected client
        if self.clientIP in addr:
            asyncio.create_task(self.process_data(data, addr))
        else:
            print(f"Message from unknown Client: {addr}")

    async def process_data(self, data, address):
        """
        Processes the received binary stream by transforming them into separate values for speed and rpm.
        Periodically send controls stored in SharedData to the rc car.

        :param data: The received binary stream.
        :param address: The address of the client.
        """

        # Send current controls to the client
        binaryControls = await SharedData.getBinaryData()
        self.transport.sendto(binaryControls.to_bytes(5), address)

        try:
            # Convert received odometry data into a binary
            binVehicleData = int.from_bytes(data, byteorder='big')

            # Get vehicle rpm from byte 0
            # To reduce overhead rpm data was reduced by 100 and decided by 10 on client side
            rpm = 100 + 10 * (binVehicleData & 0x0000FF)

            # Get vehicle speed from byte 1 and battery from byte 2
            speed = (binVehicleData & 0x00FF00) >> 8
            battery = (binVehicleData & 0xFF0000) >> 8 * 2

            # Store received values in shared data class
            await SharedData.update("rpm", rpm)
            await SharedData.update("speed", speed)
            await SharedData.update("battery", battery)

            print(f"Rpm: {rpm}, Speed: {speed}, battery: {battery}")

        except:
            traceback.print_exc()

    def connection_lost(self, connection):
        """
        This method is automatically called when the connection to the UDP server is lost.
        It ensures that the UDP socket is properly closed.
        """

        if not connection:
            self.transport.close()
            print("\n" +  "UDP server closed due to connection loss.")
