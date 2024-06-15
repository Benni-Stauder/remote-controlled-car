import asyncio

from src.backend.InputDeviceListener import InputDeviceListener
from src.backend.Server import ServerUDP
from src.backend.WebSocketServer import WebSocketServer


async def main():
    """
    This is the main function of the backend. It starts three asynchronous tasks for receiving controls from
    input devices and communicating between the rc car, frontend and backend.
    """

    listener = InputDeviceListener()
    server = ServerUDP()
    websocket_server = WebSocketServer()

    await asyncio.gather(
        listener.run(),
        server.start(),
        websocket_server.start()
    )


if __name__ == "__main__":

    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass
