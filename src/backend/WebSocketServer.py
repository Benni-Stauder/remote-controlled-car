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
         Initializes the websocket server by loading ip and port from config.json.
        """
        with open("../config.json") as f:
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

        # Cancel any pending tasks
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
            # Retrieve data from SharedData class
            speed = (await SharedData.getOdometry())["speed"]
            rpm = (await SharedData.getOdometry())["rpm"]
            lateral_acceleration = (await SharedData.getControls())["accelerating"]
            brake_percentage = (await SharedData.getControls())["braking"]

            # Create a JSON message with the data
            message = json.dumps({
                "speed": speed,
                "rpm": rpm,
                "lateralAcceleration": lateral_acceleration,
                "brakePercentage": brake_percentage
            })

            # Send the message to the client
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


async def send_data(websocket):
    while True:
        speed = (await SharedData.getOdometry())["speed"]
        rpm = (await SharedData.getOdometry())["rpm"]
        lateral_acceleration = (await SharedData.getControls())["accelerating"]
        brake_percentage = (await SharedData.getControls())["braking"]

        speed = 0
        rpm = 0
        lateral_acceleration = 0
        brake_percentage = 0

        message = json.dumps({
            "speed": speed,
            "rpm": rpm,
            "lateralAcceleration": lateral_acceleration,
            "brakePercentage": brake_percentage
        })

        await websocket.send(message)
        await asyncio.sleep(0.5)


async def receive_data(websocket):
    async for message in websocket:
        data = json.loads(message)
        message_from_client = {
            "maxSpeed": data.get("maxSpeed"),
            "mode": data.get("mode"),
            "assistance": data.get("assistance"),
        }
        print("message: ", json.dumps(message_from_client))


async def handler(websocket, path):
    sender_task = asyncio.ensure_future(send_data(websocket))
    receiver_task = asyncio.ensure_future(receive_data(websocket))

    done, pending = await asyncio.wait(
        [sender_task, receiver_task],
        return_when=asyncio.FIRST_COMPLETED,
    )

    for task in pending:
        task.cancel()


# if __name__ == "__main__":
#     start_server = websockets.serve(handler, "localhost", 8000)
#     asyncio.get_event_loop().run_until_complete(start_server)
#     asyncio.get_event_loop().run_forever()

if __name__ == "__main__":
    websocket_server = WebSocketServer()
    asyncio.run(websocket_server.start())

#
# class WebSocketServer:
#
#     @classmethod
#     async def receive_data(cls, websocket):
#         """
#         Receives data from the frontend via websocket.
#
#         :param websocket: The websocket connection.
#         """
#         async for message in websocket:
#             # Parse the received JSON message
#             message = json.loads(message)
#             print("Received message from client:", message)
#
#             # Optionally update SharedData with received values
#             # await SharedData.update("maxSpeed", message["maxSpeed"])
#             # await SharedData.update("assistance", message["assistance"])
#             # await SharedData.update("drivingMode", message["drivingMode"])
#
#
# if __name__ == "__main__":
#     websocket_server = WebSocketServer()
#     asyncio.run(websocket_server.start())
