import unittest

import rccar


class CarTest(unittest.TestCase):
    def test_steering_angle(self):
        self.assertEqual(rccar.getSteering(""), 0)
        self.assertEqual(rccar.getSteering(""), 90)
        self.assertEqual(rccar.getSteering(""), 45)

    def test_power(self):
        self.assertEqual(rccar.getPower(""), -1)
        self.assertEqual(rccar.getPower(""), -1)
        self.assertEqual(rccar.getPower(""), 0)
        self.assertEqual(rccar.getPower(""), 0)
        self.assertEqual(rccar.getPower(""), 0.4)
        self.assertEqual(rccar.getPower(""), 0.8)
        self.assertEqual(rccar.getPower(""), 1)
