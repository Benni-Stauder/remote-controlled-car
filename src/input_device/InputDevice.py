import contextlib
import json

with contextlib.redirect_stdout(None):
    import pygame


class InputDevice:
    """Class for input device connection"""

    def __init__(self) -> None:
        """Initialization of pygame joysticks and variables"""
        with open('../config.json') as f:
            wheel_config = json.load(f)

        pygame.joystick.init()
        self.wheel_config = wheel_config['wheel']
        self.connected_devices = []
        self.device_used = None
        self.sample_count = 0
        self.sample_rate = 1

    def getConnectedDevices(self):
        """Returns list with names of all joysticks that are connected to the computer"""
        self.connected_devices = [pygame.joystick.Joystick(x) for x in range(pygame.joystick.get_count())]
        names = [x.get_name() for x in self.connected_devices]
        return names
    
    def initDevice(self, name: str):
        """Initializes input device with respective name

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
                    is_controller = False
                    axis = event.axis

                    try:
                        if "controller" in self.device_used.get_name().lower():
                            axis = self.wheel_config['axes_controller'][str(axis)]
                            is_controller = True
                        else:
                            axis = self.wheel_config['axes_wheel'][str(axis)]
                    except:
                        axis = "NaN"
                    value = event.value

                    if axis == "steering":
                        if self.wheel_config["calibration"]["steeringType"] == "linear":
                            min = self.wheel_config["calibration"]["steeringMin"]
                            max = self.wheel_config["calibration"]["steeringMax"]
                            degMax = self.wheel_config["calibration"]["maxDegrees"]
                            value = int(round(degMax/(max-min)*value, 0))

                            # ensure steering values between -90 and 90 degrees for controllers
                            if is_controller:
                                value /= 5

                    if axis in ["accelerating", "braking"]:
                        if self.wheel_config["calibration"][f"{axis}Type"] == "linear":
                            min = self.wheel_config["calibration"][f"{axis}Min"]
                            max = self.wheel_config["calibration"][f"{axis}Max"]
                            value = int(round(-100/(min-max)*(value)+50, 0))

                            # reverse input for controller to recognize little button press as low acceleration / braking
                            if is_controller:
                                value = 100 - value

                            if value < 0:
                                value = 100 if is_controller else 0
                            if value > 100:
                                value = 0 if is_controller else 100

                    event_dict = {"type": axis, "value": value}
                    self.sample_count = 0
                    return event_dict
                else:
                    self.sample_count += 1
    
    def setSampleRate(self, n: int):
        """Sample rate of axes input can be set
        
        n: every n-th value of axes input is used, values in between are skipped
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
        