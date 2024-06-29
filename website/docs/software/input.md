# Input Device Directory
## Overview
The input device directory is used to establish a connection to a gaming wheel or controller, process the received data, and store it inside the SharedData.py class of the backend. A correct mapping between the received inputs and the actually pressed buttons is guaranteed through the device setup in config.json (only required for gaming wheel).


## Files
- InputDevice.py
- InputDeviceListener.py

## Running the Input Device Listener
To run the input device listener, you can create an instance of the InputDeviceListener class directly. However, this is only recommended for testing purposes. For any other use case, the input device listener should be executed together with the entire backend. Therefore, the ../main.py script of the parent directory (src) should be executed. By doing so, it is ensured that the received inputs are actually sent to the RC car.

For testing purposes, you can create an instance like this:

```python
inputDeviceListener = InputDeviceListener(<device_index>)
inputDeviceListener.run()
```


The constructor of InputDeviceListener optionally takes an Integer value called device_index as input. This value has to be used if more than one device is connected. To select which device should be initialized, the provided device_index is used. If only one device is connected, this parameter may be left out as its default value is 1.


## Purpose
The InputDevice class is configured to capture all relevant events, such as key presses, joystick movements or steering. It preprocesses these control inputs, mapping them to either steering angles or percentages for acceleration and braking. Data retrieval from the connected input device is implemented through the Python library pygame, which serves as a simple API to connect with arbitrary input devices.

The separate InputDeviceListener class is designed to asynchronously poll the input data. By using this dedicated listener class, input events can be registered without blocking the communication between frontend, backend, and the RC car.