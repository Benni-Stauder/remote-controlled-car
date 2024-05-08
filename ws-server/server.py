import asyncio
import websockets
import json
import random


async def send_data(websocket):
    while True:
        speed = random.randint(0, 10)
        rpm = random.randint(1000, 2000)
        lateral_acceleration = random.randint(1, 5)
        brake_percentage = random.randint(0, 100)

        #insert real data here
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
        print("Received message from client:", message.maxSpeed)
        message_from_client = json.dumps({
            "maxSpeed": message.maxSpeed,
            "assistance": message.assistance,
            "drivingMode": message.drivingMode,
        })


async def handler(websocket, path):
    sender_task = asyncio.ensure_future(send_data(websocket))
    receiver_task = asyncio.ensure_future(receive_data(websocket))

    done, pending = await asyncio.wait(
        [sender_task, receiver_task],
        return_when=asyncio.FIRST_COMPLETED,
    )

    for task in pending:
        task.cancel()


start_server = websockets.serve(handler, "localhost", 8000)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
