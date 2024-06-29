import random
import time

import random
import time


class VehicleDataSimulator:
    """
    This class is only for demonstration purposes. It simulates a random behavior of a rc car.
    """

    def __init__(self):
        """
        Initialize the VehicleDataSimulator with default values.
        """
        # initialize randomly generated values for speed, rpm, and battery percentage
        self.speed = 0
        self.rpm = 0
        self.battery = 100

        # retrieve current value for maximum speed from shared data
        self.max_speed = 33

    def simulate_driving(self):
        """
        Simulate a driving maneuver by randomly switching between accelerating and braking.
        Update the values of rpm and slowly decrease the battery percentage.

        :return: A tuple containing the generated speed, rpm, and battery percentage.
        """

        # randomly choose to accelerate or brake by generating a random number between 0 and 1
        self.accelerate() if random.random() < 0.5 else self.brake()

        # generate values for rpm and battery
        self.update_rpm()
        self.update_battery()

        return int(self.speed), int(self.rpm), int(self.battery)

    def accelerate(self):
        """
        Increase the speed by a random amount and ensure it does not exceed the maximum speed.
        """

        if self.speed < self.max_speed:
            self.speed += random.uniform(0.2, 2.0)
            self.speed = min(self.speed, self.max_speed)

    def brake(self):
        """
        Decrease the speed by a random amount and ensure it does not drop below zero.
        """

        if self.speed > 0:
            self.speed -= random.uniform(0.2, 2.0)
            self.speed = max(self.speed, 0)

    def update_rpm(self):
        """
        Update the rpm value proportionally to the current speed.
        """

        self.rpm = (self.speed / self.max_speed) * 100

    def update_battery(self):
        """
        Simulate a slowly decreasing battery percentage. Stop at 0 to prevent negative battery values.
        """

        self.battery -= 0.05
        self.battery = max(self.battery, 0)


if __name__ == "__main__":
    simulator = VehicleDataSimulator()
    battery = 100

    while battery > 1:
        speed, rpm, battery = simulator.simulate_driving()
        print(f"Speed: {speed:.2f}, RPM: {rpm:.2f}, Battery: {battery:.2f}%")

        time.sleep(0.5)

    print(f"\nSimulation has been canceled due to low vehicle battery.")