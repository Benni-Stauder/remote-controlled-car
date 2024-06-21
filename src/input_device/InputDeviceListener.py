import asyncio
import sys
from math import floor
from time import sleep

from src.backend.SharedData import SharedData
from src.input_device.InputDevice import InputDevice


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
        """

        # retrieve all connected input devices
        self.inputDevice = InputDevice()
        connectedDevices = self.inputDevice.getConnectedDevices()

        # wait until the selected device is connected
        while len(connectedDevices) <= deviceIndex:
            if len(connectedDevices) == 1:
                message = (f"{len(connectedDevices)} device is connected. Please connect input device N.{deviceIndex + 1}"
                           f" and restart the application.")
            else:
                message = (f"{len(connectedDevices)} devices are connected.Please connect input device N.{deviceIndex + 1}"
                           f" and restart the application.")

            # print the message and flush the buffer to stay at the same line
            sys.stdout.write("\r" + message)
            sys.stdout.flush()
            sleep(10)

        # try to initialize the selected device
        selectedDevice = connectedDevices[deviceIndex]
        self.initialized = self.inputDevice.initDevice(selectedDevice)

        self.inputData = None

    async def run(self):
        """
        Continuously listens for incoming inputs and updates the SharedData class.
        This method acts as the event loop and therefore runs indefinitely until the input device is disconnected.
        """

        if self.initialized:
            while True:
                self.inputData = self.inputDevice.getInput()

                # ensure that received input data is valid
                if self.inputData and self.inputData.get('type') != "NaN":
                    print("Input received: ", self.inputData)

                    # Store the received inputs in the SharedData class
                    await self.storeInput()

                # end loop if the input device is not connected anymore
                if not self.inputDevice.checkConnection():
                    print("Connection to wheel lost")
                    break

                await asyncio.sleep(0.01)

    async def storeInput(self):
        """
        Updates the SharedData class based on the type of input data received.
        """

        match self.inputData.get("type"):
            case "steering":
                # Set 90 and -90 degrees as steering limits
                steering = max(-90, min(90, floor(self.inputData["value"])))
                await SharedData.update('steering', steering)

            case "accelerating":
                await SharedData.update("accelerating", self.inputData["value"])

            case "braking":
                await SharedData.update("braking", self.inputData["value"])

            case _:
                print(f"Unhandled input type: {self.inputData.get('type')} with value \"{self.inputData.get('value')}\"")
