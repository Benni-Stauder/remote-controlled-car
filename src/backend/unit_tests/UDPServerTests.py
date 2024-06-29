import unittest
from unittest.mock import patch, MagicMock, AsyncMock
import asyncio
import socket
import json

from src.backend.UDPServer import ServerUDP, UDPServerProtocol
class TestServerUDP(unittest.TestCase):
    @patch('UDPServer.ServerUDP.load_config')
    @patch('UDPServer.ServerUDP.get_host_ip')
    def setUp(self, mock_get_host_ip, mock_load_config):
        mock_get_host_ip.return_value = '127.0.0.1'
        mock_load_config.return_value = {
            'client': {'ip': '192.168.1.10'},
            'port': 9999,
            'bufferSize': 1024,
        }
        self.server = ServerUDP()
        self.serverProtocol = UDPServerProtocol(self.server.clientIP, self.server.bufferSize)

    def test_initialization(self):
        self.assertEqual(self.server.hostIP, '127.0.0.1')
        self.assertEqual(self.server.clientIP, '192.168.1.10')
        self.assertEqual(self.server.port, 9999)
        self.assertEqual(self.server.bufferSize, 1024)

    @patch('builtins.open', new_callable=unittest.mock.mock_open,
           read_data=json.dumps({'backend': {'client': {'ip': '192.168.1.10'}, 'port': 9999, 'bufferSize': 1024}}))
    def test_load_config(self, mock_open):
        config = ServerUDP.load_config('../config.json')
        self.assertEqual(config['client']['ip'], '192.168.1.10')
        self.assertEqual(config['port'], 9999)
        self.assertEqual(config['bufferSize'], 1024)

    @patch('socket.gethostname')
    @patch('socket.gethostbyname')
    def test_get_host_ip(self, mock_gethostbyname, mock_gethostname):
        mock_gethostname.return_value = 'localhost'
        mock_gethostbyname.return_value = '127.0.0.1'
        ip = ServerUDP.get_host_ip()
        self.assertEqual(ip, '127.0.0.1')

    @patch('asyncio.create_task')
    @patch('src.backend.SharedData.SharedData.getBinaryData', new_callable=AsyncMock)
    def test_process_data(self, mock_get_binary_data, mock_create_task):
        mock_get_binary_data.return_value = MagicMock(to_bytes=MagicMock(return_value=b'\x00\x01\x02\x03\x04'))
        data = b'\x00\x64\x64'
        address = ('192.168.1.10', 12345)

        asyncio.run(self.serverProtocol.process_data(data, address))

        mock_get_binary_data.assert_called_once()
        mock_create_task.assert_called_once()

    @patch('asyncio.create_task')
    @patch('src.backend.SharedData.SharedData.update', new_callable=AsyncMock)
    @patch('src.backend.SharedData.SharedData.getBinaryData', new_callable=AsyncMock)
    def test_process_data_values(self, mock_get_binary_data, mock_update, mock_create_task):
        mock_get_binary_data.return_value = MagicMock(to_bytes=MagicMock(return_value=b'\x00\x01\x02\x03\x04'))
        data = b'\x00\x64\x64'
        address = ('192.168.1.10', 12345)

        asyncio.run(self.serverProtocol.process_data(data, address))

        mock_update.assert_any_call("rpm", 700)
        mock_update.assert_any_call("speed", 100)
        mock_update.assert_any_call("battery", 100)

    @patch('asyncio.create_task')
    def test_datagram_received_from_known_client(self, mock_create_task):
        data = b'\x00\x64\x64'
        addr = ('192.168.1.10', 12345)

        self.serverProtocol.datagram_received(data, addr)

        mock_create_task.assert_called_once()

    def test_datagram_received_from_unknown_client(self):
        data = b'\x00\x64\x64'
        addr = ('192.168.1.11', 12345)

        with patch('builtins.print') as mock_print:
            self.serverProtocol.datagram_received(data, addr)
            mock_print.assert_called_with(f"Message from unknown Client: {addr}")

    @patch('asyncio.get_event_loop', new_callable=MagicMock)
    @patch('asyncio.DatagramProtocol')
    def test_create_udp_socket(self, mock_protocol, mock_get_event_loop):
        mock_loop = mock_get_event_loop.return_value
        mock_transport, mock_protocol_instance = MagicMock(), MagicMock()
        mock_loop.create_datagram_endpoint.return_value = (mock_transport, mock_protocol_instance)

        result = asyncio.run(self.server.create_udp_socket())

        self.assertEqual(result, mock_transport)
        mock_loop.create_datagram_endpoint.assert_called_once()

    @patch('asyncio.sleep', new_callable=AsyncMock)
    @patch('builtins.print')
    @patch('UDPServer.ServerUDP.create_udp_socket', new_callable=AsyncMock)
    def test_start_server(self, mock_create_udp_socket, mock_print, mock_sleep):
        mock_create_udp_socket.return_value = MagicMock()

        async def test_start():
            task = asyncio.create_task(self.server.start())
            await asyncio.sleep(0.1)
            task.cancel()

        asyncio.run(test_start())

        mock_create_udp_socket.assert_called_once()
        mock_print.assert_any_call(f"UDP server listening on port {self.server.port} with IP {self.server.hostIP}...")

    @patch('builtins.print')
    def test_connection_lost(self, mock_print):
        self.server.transport = MagicMock()
        self.serverProtocol.connection_lost(None)
        self.server.transport.close.assert_called_once()
        mock_print.assert_called_with("\nUDP server closed due to connection loss.")


if __name__ == '__main__':
    unittest.main()
