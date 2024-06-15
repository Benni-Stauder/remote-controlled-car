import asyncio
from math import floor
from src.backend.SharedData import SharedData
from src.steeringwheel.InputDevice import InputDevice


class InputDeviceListener:
    """
    InputDeviceListener creates an instance of class InputDevice, which can either be a gaming wheel or controller.
    This class listens for all incoming inputs, processes them and finally stores the received values in the SharedData class.
    """

    def __init__(self, deviceIndex=0):
        """
        Initializes the InputDeviceListener with a specified device index. This index is used to choose which
        of all connected devices will be listened to.

        :param deviceIndex: Index of the input device to be initialized. Default is zero (first device).
        :raises Exception: If no connected input device is found for the given index.
        """

        # Retrieve all connected input devices
        self.inputDevice = InputDevice()
        self.connectedDevices = self.inputDevice.getConnectedJoysticks()

        # Try to initialize the selected device
        if len(self.connectedDevices) > deviceIndex:
            selectedDevice = self.connectedDevices[deviceIndex]
            self.initialized = self.inputDevice.initDevice(selectedDevice)
        else:
            raise Exception("No connected input device found for index " + str(deviceIndex))

    async def run(self):
        """
        Continuously listens for incoming inputs and updates the SharedData class.
        This method acts as the event loop and therefore runs indefinitely until the input device is disconnected.
        """

        if self.initialized:
            while True:
                input_data = self.inputDevice.getInput()

                # Ensure that received input data is valid
                if input_data and input_data.get('type') != "NaN":
                    print("Input received: ", input_data)

                    # Store the received inputs in the SharedData class
                    await self.storeInput(input_data)

                # End loop if the input device is not connected anymore
                if not self.inputDevice.checkConnection():
                    print("Connection to wheel lost")
                    break

                await asyncio.sleep(0.01)

    async def storeInput(self, input_data):
        """
        Updates the SharedData class based on the type of input data received.

        :param input_data: Dictionary containing input data with keys "type" and "value".
        """
        match input_data.get("type"):
            case "steering":
                # Set 90 and -90 degrees as steering limits
                steering = max(-90, min(90, floor(input_data["value"])))
                await SharedData.update('steering', steering)

            case "accelerating":
                await SharedData.update("accelerating", input_data["value"])

            case "braking":
                await SharedData.update("braking", input_data["value"])

            case _:
                # Print and optionally handle other input types
                print(f"Unhandled input type: {input_data.get('type')} with value \"{input_data.get('value')}\"")
