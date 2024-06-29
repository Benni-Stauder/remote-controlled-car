import unittest
import json
import time

import Rccar  as rccar


class CarTest(unittest.TestCase):
    def test_steering_angle(self):
        message = """
        {
            "type": "control",
            "values": {
                "steering": 0,
                "accelerating": 40,
                "braking": 0
            }
        }
        """
        self.assertEqual(rccar.getSteering(json.load(message)), 0)
        message = """
        {
            "type": "control",
            "values": {
                "steering": 90,
                "accelerating": 40,
                "braking": 0
            }
        }
        """
        self.assertEqual(rccar.getSteering(message), 90)
        message = """
        {
            "type": "control",
            "values": {
                "steering": 45,
                "accelerating": 40,
                "braking": 0
            }
        }
        """
        self.assertEqual(rccar.getSteering(message), 45)

    def test_power(self):
        message = """
        {
            "type": "control",
            "values": {
                "steering": 90,
                "accelerating": 0,
                "braking": 100
            }
        }
        """
        self.assertEqual(rccar.getPower(message), -1)
        message = """
        {
            "type": "control",
            "values": {
                "steering": 90,
                "accelerating": 45,
                "braking": 100
            }
        }
        """
        self.assertEqual(rccar.getPower(message), -1)
        message = """
        {
            "type": "control",
            "values": {
                "steering": 90,
                "accelerating": 0,
                "braking": 0
            }
        }
        """
        self.assertEqual(rccar.getPower(message), 0)
        message = """
        {
            "type": "control",
            "values": {
                "steering": 90,
                "accelerating": 5,
                "braking": 5
            }
        }
        """
        self.assertEqual(rccar.getPower(message), 0)
        message = """
        {
            "type": "control",
            "values": {
                "steering": 90,
                "accelerating": 40,
                "braking": 0
            }
        }
        """
        self.assertEqual(rccar.getPower(message), 0.4)
        message = """
        {
            "type": "control",
            "values": {
                "steering": 90,
                "accelerating": 80,
                "braking": 0
            }
        }
        """
        self.assertEqual(rccar.getPower(message), 0.8)
        message = """
        {
            "type": "control",
            "values": {
                "steering": 90,
                "accelerating": 100,
                "braking": 0
            }
        }
        """
        self.assertEqual(rccar.getPower(message), 1)
        self.assertEqual(rccar.getPower(""), -1)
        self.assertEqual(rccar.getPower(""), -1)
        self.assertEqual(rccar.getPower(""), 0)
        self.assertEqual(rccar.getPower(""), 0)
        self.assertEqual(rccar.getPower(""), 0.4)
        self.assertEqual(rccar.getPower(""), 0.8)
        self.assertEqual(rccar.getPower(""), 1)

    def test_speed_estimation(self):
        self.assertEqual(rccar.estimateSpeed(0.5), 0)
        self.assertEqual(rccar.estimateSpeed(1), 50)
        self.assertEqual(rccar.estimateSpeed(0), -20)

    def test_speed_limitation(self):
        self.assertGreater(1, rccar.limitSpeed(1, 20))

    def test_mode(self):
        self.assertEqual(rccar.getMode(""), 0)
        self.assertEqual(rccar.getMode(""), 1)
        self.assertEqual(rccar.getMode(""), 2)

    def test_get_speed_limit(self):
        self.assertEqual(rccar.getSpeedLimit(""), 30)

    def test_create_udp_message(self):
        result = rccar.createUDPMessage('drivestatus', 45)
        expected = json.dumps({"type": "drivestatus", "values": {"speed": 45}})
        self.assertEqual(result, expected)

        result = rccar.createUDPMessage('invalidtype', 45)
        expected = ""
        self.assertEqual(result, expected)

    def test_full_brake(self):
        rccar.esc.value = 0.7
        rccar.full_brake()
        self.assertEqual(rccar.esc.value, -1)
        time.sleep(0.1)
        self.assertEqual(rccar.esc.value, 0.5)
        
if __name__ == '__main__':
    unittest.main()
