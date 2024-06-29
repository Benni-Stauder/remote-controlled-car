import asyncio
import websockets
import json

from src.backend.SharedData import SharedData


class WebSocketServer:
    """
    This class acts as a websocket server to send data between frontend and src.
    """

    def __init__(self):
        """
         Initializes the websocket server by loading ip address and port from config.json.
        """
        with open("../../config.json") as f:
            serverConfig = json.load(f)

            self.host = serverConfig['frontend']['ip']
            self.port = serverConfig['frontend']['port']

    async def start(self):
        """
         Starts the websocket server and waits for incoming connections.
         """

        server = await websockets.serve(self.handler, self.host, self.port)
        await server.wait_closed()

    async def handler(self, websocket, path):
        """
         Handles the server behavior for sending and receiving data.

         :param websocket: The websocket connection.
         :param path: The URL path is not used in this case, but required due to the websocket interface.
         """

        sender_task = asyncio.ensure_future(self.send_data(websocket))
        receiver_task = asyncio.ensure_future(self.receive_data(websocket))

        # Wait until either the sender or receiver task is completed
        done, pending = await asyncio.wait(
            [sender_task, receiver_task],
            return_when=asyncio.FIRST_COMPLETED,
        )

        # cancel any pending tasks
        for task in pending:
            task.cancel()

    @classmethod
    async def send_data(cls, websocket):
        """
        Send speed and rpm (received from rc car) as well as acceleration and braking percentage (calculated from
        controls input) to the frontend.

        :param websocket: The websocket connection.
        """

        while True:
            # retrieve data from SharedData class
            speed = (await SharedData.getOdometry())["speed"]
            rpm = (await SharedData.getOdometry())["rpm"]
            lateral_acceleration = (await SharedData.getControls())["accelerating"]
            brake_percentage = (await SharedData.getControls())["braking"]

            # create a JSON message with the data
            message = json.dumps({
                "speed": speed,
                "rpm": rpm,
                "lateralAcceleration": lateral_acceleration,
                "brakePercentage": brake_percentage
            })

            # send the message to the client
            await websocket.send(message)
            await asyncio.sleep(0.5)

    @classmethod
    async def receive_data(cls, websocket):
        """
        Receives data from the frontend via websocket.

        :param websocket: The websocket connection.
        """

        async for message in websocket:
            data = json.loads(message)
            message_from_client = {
                "maxSpeed": data.get("maxSpeed"),
                "mode": data.get("mode"),
                "assistance": data.get("assistance"),
            }
            print("message: ", json.dumps(message_from_client))
            await SharedData.update("maxSpeed", message_from_client["maxSpeed"])
            await SharedData.update("assistance", message_from_client["assistance"])
            await SharedData.update("drivingMode", message_from_client["mode"])

            # extract the expected values from the received message
            max_speed = message.get("maxSpeed")
            drive_mode = message.get("mode")
            assistance = message.get("assistance")

if __name__ == "__main__":
    websocket_server = WebSocketServer()
    asyncio.run(websocket_server.start())
