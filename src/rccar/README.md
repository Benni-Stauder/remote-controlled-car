# RC Car Software

This documentation provides an overview of the code for controlling an RC car that communicates with a PC via UDP. It controls a servo and an Electronic Speed Controller (ESC) based on the received messages.

## Table of contents

1. [Overview](#Overview)
2. [Dependencies](#Dependencies)
3. [Global Variables](#Global-Variables)
4. [Functions](#Functions)
5. [Classes](#Classes)
6. [Main Execution Flow](#Execution-flow)
7. [Unit Tests](#Unit-tests)


## Overview

Based on UDP messages received from a PC, this control system manages a servo and an ESC. Additionally, it includes functions for speed estimation, speed limitation, mode selection, and traction control.

## Dependencies

The following Python libraries are required to execute this code:
- `asyncio`
- `socket`
- `json`
- `gpiozero`
- `time`

## Global Variables

- **servo**: Instance of the `Servo` class for controlling the steering servo.
- **esc**: Instance of the `Servo` class for controlling the ESC.
- **bufferSize**: Size of the UDP message buffer.
- **debug**: Debug flag for print statements.
- **maxSpeedPos**: Maximum forward speed.
- **maxSpeedNeg**: Maximum reverse speed.
- **currentMode**: Current driving mode.
- **UDP_IP**: IP address for the UDP connection.
- **UDP_PORT**: Port for the UDP connection.

## Functions

### `send_udp_message(message, dest_ip, dest_port)`

Sends a UDP message to a specific IP address and port.

**Parameter:**
- `message`: The message to be sent.
- `dest_ip`: Destination IP address.
- `dest_port`: Destination port..

### `receive_udp_message()`

Receives UDP messages sent from the PC.

**Return:**
- Parsed JSON message.

### `getSteering(jsonMsg)`

Returns the steering angle requested by the PC.

**Parameter:**
- `jsonMsg`: JSON message containing control data.

**Return:**
- Steering angle in degrees [-90° bis 90°].

### `estimateSpeed(escValue)`

Estimates the speed based on the ESC value.

**Parameter:**
- `escValue`: Current ESC value.

**Return:**
- Estimated speed [kmh].

### `limitSpeed(reqEscValue, speedLimit)`

Calculates the new ESC value based on the configured speed limit.

**Parameter:**
- `reqEscValue`: Requested ESC value.
- `speedLimit`: Desired speed limitation.

**Return:**
- Limited ESC value.

### `getPower(jsonMsg)`

Returns the power requested by the PC (value for acceleration or deceleration).

**Parameter:**
- `jsonMsg`: JSON message containing control data.

**Return:**
- Power value for acceleration and deceleration [0 to 100].

### `getSpeedLimit(jsonMsg)`

Returns the speed limit sent by the PC.

**Parameter:**
- `jsonMsg`: JSON message containing drive mode.

**Return:**
- Speed limitation [kmh].

### `getMode(jsonMsg)`

Returns the current drive mode sent by the PC.

**Parameter:**
- `jsonMsg`: JSON message containing drive mode.

**Return:**
- Current drive mode.

### `createUDPMessage(type, value)`

Creates a UDP message in JSON format to be sent to the PC.

**Parameter:**
- `type`: Type of the message.
- `value`: Value contained in the message.
- 
**Return:**
- A JSON-formatted UDP message.

### `full_brake()`

Sets the motor value to maximum braking power and then to neutral.

## Classes

### `TractionControl`

Emulates traction control by limiting acceleration.

#### `__init__()`

Initializes traction control with default parameters.

#### `control_acceleration(currentSpeed, targetSpeed)`

Limits acceleration to achieve a traction control effect.

**Parameter:**
- `currentSpeed`: Current wheel speed.
- `targetSpeed`: Target wheel speed, that is supposed to be reached.

**Return:**
- New speed after applying traction control.

## Execution flow

### `control_servo()`

Major function that sets ESC based on the received values and mode to the control data.

### `main()`

Entry point of the program. Executes the `control_servo` function and handles any keyboard-triggered interrupts.

## Unit tests

These unit tests are designed to evaluate all logic-containing functions inside the RCCar class and therefore test the functionality of the code. The downside of using Raspberry Pi proprietary software is that these unit tests must be run on hardware that supports GPIO. Because of this, the unit tests currently must be run on your own Pi or via a GitHub runner using CI/CD.