import contextlib
import json

with contextlib.redirect_stdout(None):
    import pygame


class SteeringWheel:
    """Class for steering wheel connection"""

    def __init__(self) -> None:
        """Initialization of pygame joysticks and variables"""
        with open('../../config.json', 'r') as f:
            wheel_config = json.load(f)
        
        pygame.joystick.init()
        self.wheel_config = wheel_config['wheel']
        self.connected_devices = []
        self.device_used = None
        self.sample_count = 0
        self.sample_rate = 1

    def getConnectedJoysticks(self):
        """Returns list with names of all joysticks that are connected to the computer"""
        self.connected_devices = [pygame.joystick.Joystick(x) for x in range(pygame.joystick.get_count())]
        names = [x.get_name() for x in self.connected_devices]
        return names
    
    def initWheel(self, name: str):
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
                    button = self.wheel_config["buttons"][str(button)]
                except:
                    button = "NaN"
                event_dict = {"type": "button", "value": button}
                return event_dict
            
            if event.type == pygame.JOYAXISMOTION:
                if self.sample_count > self.sample_rate:
                    axis = event.axis
                    print("axis: ", axis)
                    try:
                        axis = self.wheel_config['axes'][str(axis)]
                    except:
                        axis = "NaN"
                    value = event.value

                    if axis == "steering":
                        if self.wheel_config["calibration"]["steeringType"] == "linear":
                            min = self.wheel_config["calibration"]["steeringMin"]
                            max = self.wheel_config["calibration"]["steeringMax"]
                            degMax = self.wheel_config["calibration"]["maxDegrees"]
                            value = int(round(degMax/(max-min)*value, 0))

                    if axis == "accelerating":
                        if self.wheel_config["calibration"]["accelerationType"] == "linear":
                            print("value: ", value)
                            min = self.wheel_config["calibration"]["accelerationMin"]
                            max = self.wheel_config["calibration"]["accelerationMax"]
                            value = int(round(-100/(min-max)*(value)+50, 0))
                            if value < 0:
                                value = 0
                            if value > 100:
                                value = 100

                    if axis == "braking":
                        if self.wheel_config["calibration"]["brakingType"] == "linear":
                            min = self.wheel_config["calibration"]["brakingMin"]
                            max = self.wheel_config["calibration"]["brakingMax"]
                            value = int(round(-100/(min-max)*(value)+50, 0))
                            if value < 0:
                                value = 0
                            if value > 100:
                                value = 100

                    event_dict = {"type": axis, "value": value}
                    self.sample_count = 0
                    return event_dict
                else:
                    self.sample_count += 1
    
    def setSampleRate(self, n: int):
        """Sample rate of axes input can be set
        
        n: every n'th value of axes input is used, values in between are skipped
        """
        self.sample_rate = n

    def checkConnection(self):
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

        