import asyncio
import websockets
import json
import random

async def handler(websocket, path):
    while True:
        try:
            # Erzeugt einen zufälligen Geschwindigkeitswert
            speed = random.randint(20, 100)
            # Verpackt den Geschwindigkeitswert in ein JSON-Format
            message = json.dumps({"speed": speed})
            await websocket.send(message)  # Sendet die JSON-formatierte Nachricht an den Client
            await asyncio.sleep(1)
            print("hier")# Warte für 1 Sekunde vor dem Senden der nächsten Nachricht
        except websockets.ConnectionClosed:
            break  # Beendet die Schleife, wenn der Client die Verbindung trennt

# Startet den WebSocket-Server
start_server = websockets.serve(handler, "localhost", 8000)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
