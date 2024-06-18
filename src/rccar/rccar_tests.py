import unittest
import json
import rccar


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

if __name__ == '__main__':
    unittest.main()