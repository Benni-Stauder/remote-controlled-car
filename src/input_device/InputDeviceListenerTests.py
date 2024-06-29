import asyncio
import sys
import unittest
from unittest.mock import MagicMock

from src.backend.SharedData import SharedData
from src.input_device.InputDevice import InputDevice
from src.input_device.InputDeviceListener import InputDeviceListener

"""
To run these unit tests, a valid input device (e.g. Xbox Controller) needs to be connected to your PC.
"""

class TestInputDeviceListener(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        SharedData.update = MagicMock()

    def setUp(self):
        self.mock_input_device = MagicMock(spec=InputDevice)
        self.mock_input_device.getConnectedDevices.return_value = ["Device1", "Device2"]
        self.mock_input_device.initDevice.return_value = True
        self.mock_input_device.getInput.return_value = {"type": "steering", "value": 45}
        self.mock_input_device.checkConnection.return_value = True

        self.listener = InputDeviceListener(deviceIndex=0)

    async def mock_storeInput(self):
        await self.listener.storeInput()

    async def test_run(self):
        asyncio.sleep = MagicMock()
        self.mock_input_device.checkConnection.side_effect = [True, False]

        await self.listener.run()

        SharedData.update.assert_called()

    async def test_storeInput_steering(self):
        self.listener.inputData = {"type": "steering", "value": 45}
        await self.mock_storeInput()
        SharedData.update.assert_called_once_with('steering', 45)

    async def test_storeInput_accelerating(self):
        self.listener.inputData = {"type": "accelerating", "value": 75}
        await self.mock_storeInput()
        SharedData.update.assert_called_once_with('accelerating', 75)

    async def test_storeInput_braking(self):
        self.listener.inputData = {"type": "braking", "value": 30}
        await self.mock_storeInput()
        SharedData.update.assert_called_once_with('braking', 30)

    async def test_storeInput_unhandled(self):
        self.listener.inputData = {"type": "unknown", "value": "some_value"}
        await self.mock_storeInput()
        self.assertIn("Unhandled input type", sys.stdout.getvalue())

    @classmethod
    def tearDownClass(cls):
        pass

if __name__ == '__main__':
    unittest.main()
