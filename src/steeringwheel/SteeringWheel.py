
import contextlib
with contextlib.redirect_stdout(None):
    import pygame

# Calibration and button mapping is saved in config file
import config

class SteeringWheel():
    """Class for steering wheel connection"""

    def __init__(self) -> None:
        """Initialization of pygame joysticks and variables"""
        pygame.joystick.init()
        self.connected_devices = []
        self.device_used = None
        self.sample_count = 0
        self.sample_rate = 1

    def get_connected_joysticks(self):
        """Returns list with names of all joysticks that are connected to the computer"""
        self.connected_devices = [pygame.joystick.Joystick(x) for x in range(pygame.joystick.get_count())]
        names = [x.get_name() for x in self.connected_devices]
        return names
    
    def init_wheel(self, name: str):
        """Initializes wheel with respective name

        name: name of joystick

        Returns 'False' if invalid name has been provided.
        Returns 'True' if initialization was successful.
        
        """
        names = [x.get_name() for x in self.connected_devices]
        if name not in names:
            return False
        for device in self.connected_devices:
            if name == device.get_name():
                self.device_used = device
                break
        pygame.init()
        self.device_used.init()
        return True
    
    def getInput(self):
        """Returns dictionary with type of input and value of input.
        
        Currently supported:
        - Buttons input ('A'/'B'/'X'/'Y'/'Downshift'/'Upshift') (string value)
        - Steering input (in °) (int value)
        - Throttle input (in %) (int value)
        - Brake input (in %) (int value)
        """
        for event in pygame.event.get():
            if event.type == pygame.JOYBUTTONDOWN:
                button = event.button
                try:
                    button = config.steering_wheel["buttons"][button]
                except:
                    button = "NaN"
                eventDict = {"type": "button", "value": button}
                return eventDict
            
            if event.type == pygame.JOYAXISMOTION:
                if self.sample_count > self.sample_rate:
                    axis = event.axis
                    try:
                        axis = config.steering_wheel["axes"][axis]
                    except:
                        axis = "NaN"
                    value = event.value

                    if axis == "steering":
                        if config.steering_wheel["calibration"]["steeringType"] == "linear":
                            min = config.steering_wheel["calibration"]["steeringMin"]
                            max = config.steering_wheel["calibration"]["steeringMax"]
                            degMax = config.steering_wheel["calibration"]["maxDegrees"]
                            value = int(round(degMax/(max-min)*value, 0))

                    if axis == "accelerating":
                        if config.steering_wheel["calibration"]["accelerationType"] == "linear":
                            min = config.steering_wheel["calibration"]["accelerationMin"]
                            max = config.steering_wheel["calibration"]["accelerationMax"]
                            value = int(round(-100/(min-max)*(value)+50, 0))
                            value = 0 if value < 0 else value
                            value = 100 if value > 0 else value

                    if axis == "braking":
                        if config.steering_wheel["calibration"]["brakingType"] == "linear":
                            min = config.steering_wheel["calibration"]["brakingMin"]
                            max = config.steering_wheel["calibration"]["brakingMax"]
                            value = int(round(-100/(min-max)*(value)+50, 0))
                            value = 0 if value < 0 else value
                            value = 100 if value > 0 else value

                    eventDict = {"type": axis, "value": value}
                    self.sample_count = 0
                    return eventDict
                else:
                    self.sample_count += 1
    
    def set_sample_rate(self, n: int):
        """Sample rate of axes input can be set
        
        n: every n'th value of axes input is used, values in between are skipped
        """
        self.sample_rate = n

    def check_connection(self):
        """
        Function to check if connection to initialized device is active. Need to be polled.

        Returns 'True' if connection is active. 
        Returns 'False' if device is no longer available (e.g. has been unplugged).
        """
        connected_devices = [pygame.joystick.Joystick(x) for x in range(pygame.joystick.get_count())]
        if self.device_used not in connected_devices:
            return False
        else:
            return True
        