import asyncio


class SharedData:
    """
    SharedData provides a safe access and update mechanisms
    for vehicle control and odometry data.
    """

    # add lock to handle multiple access attempts
    _lock = asyncio.Lock()

    # general status codes
    STATUS_UPDATE_OK = 1
    STATUS_NOT_FOUND = -1

    _controls = {
        "steering": 0,
        "accelerating": 0,
        "braking": 0
    }

    _odometry = {
        "speed": 0,
        "rpm": 0
    }

    @classmethod
    async def update(cls, key, value):
        """
        Update values using a given key in the controls or odometry JSON.

        :param key: The key used to update.
        :param value: The new value.
        :return: Status code indicating success or failure.
        """

        async with cls._lock:
            # update values inside controls JSON
            if key in ["steering", "accelerating", "braking"]:
                cls._controls[key] = value

            # update values inside odometry JSON
            elif key in ["speed", "rpm"]:
                cls._odometry[key] = value

            # return either success or failure
            else:
                return cls.STATUS_NOT_FOUND
            return cls.STATUS_UPDATE_OK

    @classmethod
    async def getOdometry(cls):
        """
        Access the odometry JSON.

        :return: Dictionary containing odometry data.
        """

        async with cls._lock:
            return cls._odometry

    @classmethod
    async def getControls(cls):
        """
        Access the controls JSON.

        :return: Dictionary containing controls data.
        """

        async with cls._lock:
            return cls._controls

    @classmethod
    async def getBinaryControls(cls):
        """
        Create a single binary value for all controls. Use this format:
            - Byte 2: steering
            - Byte 1: accelerating
            - Byte 0: braking

        :return: Integer representing of the binary controls data.
        """

        async with cls._lock:
            # get the controls from JSON
            steering = cls._controls["steering"]
            acceleration = cls._controls["accelerating"]
            braking = cls._controls["braking"]

        print(f"Test s:{steering}, a:{acceleration}, b:{braking}")

        # shift steering values by 90 degrees to avoid negative values
        positiveSteering = steering + 90

        # return steering, acceleration & braking as one binary message
        return positiveSteering | (acceleration << 8) | (braking << 16)
