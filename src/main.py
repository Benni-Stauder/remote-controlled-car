import asyncio

from src.input_device.InputDeviceListener import InputDeviceListener
from src.backend.UDPServer import ServerUDP
from src.backend.WebSocketServer import WebSocketServer


async def main():
    """
    This is the main function of the src. It starts three asynchronous tasks for receiving controls from
    input devices and communicating between the rc car, frontend and src.
    """

    deviceListener = InputDeviceListener()
    server = ServerUDP()
    websocket_server = WebSocketServer()

    await asyncio.gather(
        deviceListener.run(),
        server.start(),
        websocket_server.start()
    )


if __name__ == "__main__":

    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass
