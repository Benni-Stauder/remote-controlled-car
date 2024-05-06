import socket
import time
import RPi.GPIO as GPIO

msgFromClient = "Hello UDP Server"

bytesToSend = str.encode(msgFromClient)

serverAddressPort = ("192.168.137.175", 3107)

bufferSize = 1024

# Create a UDP socket at client side

UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

# Send to server using created UDP sockets

UDPClientSocket.sendto(bytesToSend, serverAddressPort)
currentTime = time.time()

# Set up the GPIO pin for PWM
GPIO.setmode(GPIO.BCM)  # Use Broadcom pin numbering
GPIO.setup(18, GPIO.OUT)  # Set GPIO18 as an output

# Create PWM instance on pin 18 with frequency of 50Hz
pwm = GPIO.PWM(18, 50)
pwm.start(0)

def set_speed(duty_cycle):
    pwm.ChangeDutyCycle(duty_cycle)

try:
    print("Starting motor. Press CTRL+C to exit.")
    time.sleep(1)  # Warm-up time

    # Calibrate ESC (specific to your ESC, check the manual)
    print("Calibrating ESC...")
    set_speed(10)  # Max throttle
    time.sleep(1)
    set_speed(5)   # Min throttle
    time.sleep(1)
    
    # Main loop to change the speed
    while True:

        #UDPClientSocket.sendto(bytesToSend, serverAddressPort)
        UDPClientSocket.settimeout(10)

        try:
            msgFromServer = UDPClientSocket.recvfrom(bufferSize)
            msg = f"{currentTime}: Message from Server {msgFromServer[0]}"

            print(msg)

        except socket.timeout:
            print("timed out")

        command = input("Set speed (0 to 10): ")
        if command.isdigit():
            speed = int(command)
            if 0 <= speed <= 10:
                set_speed(speed * 10)  # Convert 0-10 scale to 0-100 for duty cycle
            else:
                print("Please enter a number between 0 and 10.")
        else:
            print("Please enter a valid number.")

except KeyboardInterrupt:
    print("Stopping motor.")
finally:
    pwm.stop()  # Stop PWM
    GPIO.cleanup()  # Clean up GPIO on CTRL+C exit

