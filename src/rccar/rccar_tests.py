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
        self.assertEqual(rccar.getMode(""), 30)