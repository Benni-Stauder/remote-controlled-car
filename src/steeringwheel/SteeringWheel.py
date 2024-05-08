
import contextlib
import json

with contextlib.redirect_stdout(None):
    import pygame


class SteeringWheel:
    """Class for steering wheel connection"""

    def __init__(self) -> None:
        """Initialization of pygame joysticks and variables"""
        with open('../../config.json', 'r') as f:
            wheelConfig = json.load(f)
        
        pygame.joystick.init()
        self.wheelConfig = wheelConfig['wheel']
        self.connectedDevices = []
        self.deviceUsed = None
        self.sampleCount = 0
        self.sampleRate = 1

        #print(self.wheelConfig)

    def getConnectedJoysticks(self):
        """Returns list with names of all joysticks that are connected to the computer"""
        self.connectedDevices = [pygame.joystick.Joystick(x) for x in range(pygame.joystick.get_count())]
        names = [x.get_name() for x in self.connectedDevices]
        return names
    
    def initWheel(self, name: str):
        """Initializes wheel with respective name

        name: name of joystick

        Returns 'False' if invalid name has been provided.
        Returns 'True' if initialization was successful.
        
        """
        names = [x.get_name() for x in self.connectedDevices]
        if name not in names:
            return False
        for device in self.connectedDevices:
            if name == device.get_name():
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
                    button = self.wheelConfig["buttons"][str(button)]
                except:
                    button = "NaN"
                eventDict = {"type": "button", "value": button}
                return eventDict
            
            if event.type == pygame.JOYAXISMOTION:
                if self.sampleCount > self.sampleRate:
                    axis = event.axis
                    print("axis: ", axis)
                    try:
                        axis = self.wheelConfig['axes'][str(axis)]
                    except:
                        axis = "NaN"
                    value = event.value

                    if axis == "steering":
                        if self.wheelConfig["calibration"]["steeringType"] == "linear":
                            min = self.wheelConfig["calibration"]["steeringMin"]
                            max = self.wheelConfig["calibration"]["steeringMax"]
                            degMax = self.wheelConfig["calibration"]["maxDegrees"]
                            value = int(round(degMax/(max-min)*value, 0))

                    if axis == "accelerating":
                        if self.wheelConfig["calibration"]["accelerationType"] == "linear":
                            print("value: ", value)
                            min = self.wheelConfig["calibration"]["accelerationMin"]
                            max = self.wheelConfig["calibration"]["accelerationMax"]
                            value = int(round(-100/(min-max)*(value)+50, 0))
                            if value < 0:
                                value = 0
                            if value > 100:
                                value = 100

                    if axis == "braking":
                        if self.wheelConfig["calibration"]["brakingType"] == "linear":
                            min = self.wheelConfig["calibration"]["brakingMin"]
                            max = self.wheelConfig["calibration"]["brakingMax"]
                            value = int(round(-100/(min-max)*(value)+50, 0))
                            if value < 0:
                                value = 0
                            if value > 100:
                                value = 100

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
        