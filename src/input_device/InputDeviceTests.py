import os
import unittest
from unittest.mock import MagicMock

import pygame

from src.input_device.InputDevice import InputDevice


class TestInputDevice(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.mock_wheel_config = {
            "wheel": {
                "buttons": {
                    "0": "A",
                    "1": "B"
                },
                "axes_wheel": {
                    "0": "steering",
                    "1": "accelerating",
                    "2": "braking"
                },
                "axes_controller": {
                    "0": "steering",
                    "1": "accelerating",
                    "2": "braking"
                },
                "calibration": {
                    "steeringType": "linear",
                    "steeringMin": -100,
                    "steeringMax": 100,
                    "maxDegrees": 180,
                    "acceleratingType": "linear",
                    "acceleratingMin": 0,
                    "acceleratingMax": 100,
                    "brakingType": "linear",
                    "brakingMin": 0,
                    "brakingMax": 100
                }
            }
        }
        cls.mock_config_file = os.path.join(os.path.dirname(__file__), 'mock_config.json')

    def setUp(self):
        self.input_device = InputDevice()

    def test_getInput_button_event(self):
        mock_event = MagicMock()
        mock_event.type = pygame.JOYBUTTONDOWN
        mock_event.button = 0
        pygame.event.get = MagicMock(return_value=[mock_event])

        input_data = self.input_device.getInput()

        expected_data = {"type": "button", "value": "A"}
        self.assertEqual(input_data, expected_data)

    def test_getInput_axis_event(self):
        mock_event = MagicMock()
        mock_event.type = pygame.JOYAXISMOTION
        mock_event.axis = 0
        mock_event.value = 0.5
        pygame.event.get = MagicMock(return_value=[mock_event])

        input_data = self.input_device.getInput()
        self.assertEqual(input_data, None)

    def test_setSampleRate(self):
        self.input_device.setSampleRate(2)
        self.assertEqual(self.input_device.sample_rate, 2)

    def test_checkConnection_false(self):
        connected = self.input_device.checkConnection()
        self.assertFalse(connected)


if __name__ == '__main__':
    unittest.main()
