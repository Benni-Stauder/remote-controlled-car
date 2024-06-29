import unittest
from unittest.mock import MagicMock
from websockets import WebSocketServerProtocol

from src.backend.SharedData import SharedData
from src.backend.WebSocketServer import WebSocketServer


class TestWebSocketServer(unittest.TestCase):

    def setUp(self):
        self.websocket_server = WebSocketServer()

    async def mock_shared_data(self):
        SharedData.getOdometry = MagicMock(return_value={"speed": 50, "rpm": 2000})
        SharedData.getControls = MagicMock(return_value={"accelerating": 0.5, "braking": 0.3})

    async def mock_websocket(self):
        websocket = MagicMock(spec=WebSocketServerProtocol)
        websocket.send = MagicMock()
        websocket.recv = MagicMock(side_effect=[
            '{"maxSpeed": 100, "mode": "normal", "assistance": "on"}',
            '{"maxSpeed": 120, "mode": "sport", "assistance": "off"}'
        ])
        return websocket

    async def test_send_data(self):
        await self.mock_shared_data()
        websocket = await self.mock_websocket()
        await self.websocket_server.send_data(websocket)
        websocket.send.assert_called()

    async def test_receive_data(self):
        websocket = await self.mock_websocket()
        await self.websocket_server.receive_data(websocket)
        SharedData.update.assert_called()


if __name__ == '__main__':
    unittest.main()
