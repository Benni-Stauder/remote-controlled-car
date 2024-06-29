# README - Project source 

## Overview
The project's source folder houses all the logic for both the backend and rc car. Additionally, this directory includes the main.py script for launching the application. Executing this script establishes communication between the frontend, backend, and rc car and starts the polling for input data.
Moreover, all networking configurations and input device calibrations are stored in a `config.json` file within this directory.
## Files

- **main.py**
- **config.json**

## Running the project

To run the entire project, simply execute `main.py`. This script initializes all required components and starts their asynchronous execution:
```python
deviceListener = InputDeviceListener()
server = ServerUDP()
websocket_server = WebSocketServer()

await asyncio.gather(
    deviceListener.run(),
    server.start(),
    websocket_server.start()
)
```
**IMPORANT:** It is required to create and start instances of ALL three components of this project. 
Neglecting their dependencies could result in unexpected behavior and should therefore be avoided.

## Project configuration

The entire configuration for this project is contained within a single `config.json` file. This includes sections for network setup (UDP, Websockets) as well as mappings for input devices.

Please make sure that the network configurations are correctly set with the appropriate IP addresses for both server and client. **Do not modify** the port and buffer settings if you are uncertain about their impact on the UDP or Websocket connection.

A correct network configuration should resemble this example:

```json
{
  "frontend": {
    "ip": "localhost",
    "port": 8000
  },
  
  "backend": {
    "port": <random port>,
    "bufferSize": 1024,
    "server": {
      "ip": <IP address of your pc>
    },
    
    "client": {
      "ip": <IP address of the rc car>
    }
  }
}
```

The configuration settings for the input device depend on the selected gaming wheel. By default, the settings are configured for a `Logitech G29` steering wheel. To use other devices, key mappings must be edited within the `config.json` file.