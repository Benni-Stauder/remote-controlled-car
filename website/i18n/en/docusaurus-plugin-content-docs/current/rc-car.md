# RC Car Software
## Overview
This documentation provides an overview of the code for controlling an RC car that communicates with a PC via UDP and controls a servo and ESC (Electronic Speed Controller) based on received messages.

## Dependencies
The following Python libraries are required to execute this code:

## Global Variables
servo: Instance of the servo class for steering control. esc: Instance of the servo class for ESC control. bufferSize: Size of the UDP message buffer. debug: Debug flag for print statements. maxSpeedPos: Maximum forward speed. maxSpeedNeg: Maximum reverse speed. currentMode: Current driving mode. UDP_IP: IP address for UDP connection. UDP_PORT: Port for UDP connection.

## Functions
send_udp_message(message, dest_ip, dest_port): Sends a UDP message to a specific IP address and port. receive_udp_message(): Receives UDP messages sent by the PC. getSteering(jsonMsg): Returns the steering angle requested by the PC. estimateSpeed(escValue): Estimates speed based on ESC value. limitSpeed(reqEscValue, speedLimit): Calculates the new ESC value based on the configured speed limit. getPower(jsonMsg): Returns the power requested by the PC (acceleration or deceleration value). getSpeedLimit(jsonMsg): Returns the speed limit sent by the PC. getMode(jsonMsg): Returns the current mode sent by the PC. createUDPMessage(type, value): Creates a UDP message in JSON format to be sent to the PC. full_brake(): Sets the motor value to maximum braking power and then to neutral.

## Classes
TractionControl: Emulates traction control by limiting acceleration. __init__(): Initializes traction control with default parameters. control_acceleration(currentSpeed, targetSpeed): Limits acceleration to achieve traction control effect.

## Main Execution Flow
control_servo(): Main function that sets the ESC based on received values and mode. main(): Program entry point. Executes the control_servo function and handles any keyboard-triggered interrupts.

## Unit Tests
Unit tests are designed to evaluate all logic functions within the RC car class and thus test the code's functionality. As Raspberry Pi proprietary software, these tests must be executed on hardware that supports GPIO. Therefore, the unit tests must currently be run on your own Pi or via a GitHub runner using CI/CD.