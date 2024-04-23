
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
        self.connectedDevices = []
        self.deviceUsed = None
        self.sampleCount = 0
        self.sampleRate = 1

    def getConnectedJoysticks(self):
        """Returns list with names of all joysticks that are connected to the computer"""
        self.connectedDevices = [pygame.joystick.Joystick(x) for x in range(pygame.joystick.get_count())]
        names = [x.getName() for x in self.connectedDevices]
        return names
    
    def initWheel(self, name: str):
        """Initializes wheel with respective name

        name: name of joystick

        Returns 'False' if invalid name has been provided.
        Returns 'True' if initialization was successful.
        
        """
        names = [x.getName() for x in self.connectedDevices]
        if name not in names:
            return False
        for device in self.connectedDevices:
            if name == device.getName():
                self.deviceUsed = device
                break
        pygame.init()
        self.deviceUsed.init()
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
                    button = config.steeringWheel["buttons"][button]
                except:
                    button = "NaN"
                eventDict = {"type": "button", "value": button}
                return eventDict
            
            if event.type == pygame.JOYAXISMOTION:
                if self.sampleCount > self.sampleRate:
                    axis = event.axis
                    try:
                        axis = config.steeringWheel["axes"][axis]
                    except:
                        axis = "NaN"
                    value = event.value

                    if axis == "steering":
                        if config.steeringWheel["calibration"]["steeringType"] == "linear":
                            min = config.steeringWheel["calibration"]["steeringMin"]
                            max = config.steeringWheel["calibration"]["steeringMax"]
                            degMax = config.steeringWheel["calibration"]["maxDegrees"]
                            value = int(round(degMax/(max-min)*value, 0))

                    if axis == "accelerating":
                        if config.steeringWheel["calibration"]["accelerationType"] == "linear":
                            min = config.steeringWheel["calibration"]["accelerationMin"]
                            max = config.steeringWheel["calibration"]["accelerationMax"]
                            value = int(round(-100/(min-max)*(value)+50, 0))
                            value = 0 if value < 0 else value
                            value = 100 if value > 0 else value

                    if axis == "braking":
                        if config.steeringWheel["calibration"]["brakingType"] == "linear":
                            min = config.steeringWheel["calibration"]["brakingMin"]
                            max = config.steeringWheel["calibration"]["brakingMax"]
                            value = int(round(-100/(min-max)*(value)+50, 0))
                            value = 0 if value < 0 else value
                            value = 100 if value > 0 else value

                    eventDict = {"type": axis, "value": value}
                    self.sampleCount = 0
                    return eventDict
                else:
                    self.sampleCount += 1
    
    def setSampleRate(self, n: int):
        """Sample rate of axes input can be set
        
        n: every n'th value of axes input is used, values in between are skipped
        """
        self.sampleRate = n

    def checkConnection(self):
        """
        Function to check if connection to initialized device is active. Need to be polled.

        Returns 'True' if connection is active. 
        Returns 'False' if device is no longer available (e.g. has been unplugged).
        """
        connectedDevices = [pygame.joystick.Joystick(x) for x in range(pygame.joystick.get_count())]
        if self.deviceUsed not in connectedDevices:
            return False
        else:
            return True
        