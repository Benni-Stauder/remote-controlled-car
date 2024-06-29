# README - Backend

## Overview

The backend is designed to manage communication and data flow between the frontend and the rc car. It ensures that all data is correctly shared among the different components of this project.
Additionally, the backend handels all incoming control inputs and stores them to be accessible for all components of the backend.

## Files

- **UDPServer.py**
- **WebSocketServer.py**
- **SharedData.py**

## Running the backend

The files of the backend are supposed to be executed as one complete ecosystem, not separately.
To run the backend, you should use the `../main.py` script located in the parent folder of this directory.

This script runs all the required parts of the backend together.
**Do not attempt** to start individual components like `UDPServer.py` or `WebSocketServer.py` separately, as this will lead to unintended behavior.
Refer to the README in the `src` directory for detailed instructions on how to run the backend correctly. 

## Purpose
The backend directory primarily contains a UDP server for communication with the RC car, a WebSocket server for data exchange with the frontend, and a shared data storage.

The primary purpose is to facilitate the required data exchanges by running all interfaces asynchronously. The frontend, the RC car, and the input device (e.g., steering wheel) all access a single static class that acts as shared storage. A big advantage of this approach is that it prevents blocking interfaces since they all operate independently of each other.

## Shared Data Access

`SharedData` is a static class that contains exchanged data such as control inputs, rc car odometry, and user settings. 
It allows asynchronous components to access a common data storage for both writing and reading, ensuring that all parts of the backend have constant access to the currently available values.

To prevent issues with data concurrency, Python's `asyncio.Lock` is used. Therefore, the lock makes sure that only one component can write to the shared data at a time. Meanwhile, reading does not require a lock and is possible for any component at any time.

