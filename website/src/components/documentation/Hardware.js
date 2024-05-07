import React from 'react';
import webcam from '../../media/3-raspi_webcam.webp';
import pwm from '../../media/Raspberry pi 3 PWM pins.webp';
import usb from '../../media/raspberry_pi_4_USB-C_power_1.webp';

function HardwareSetup() {
    return (
        <div>
            <h1>Hardware Setup</h1>

            <h2>Connecting the USB Webcam to the Raspberry Pi</h2>
            <p>First, you need to connect the USB webcam to the Raspberry Pi:</p>
            <ol>
                <li>Locate an available USB port on the Raspberry Pi.</li>
                <li>Connect the USB webcam to the USB port on the Raspberry Pi.</li>
                <li>Ensure the connection is secure.</li>
                <img src={webcam} alt="Webcam connection to the Pi" />
            </ol>

            <h2>Connecting the Servo and ESC to the Integrated Adapter Board</h2>
            <p>Next, you have to connect the servo and ESC to the integrated adapter board:</p>
            <ol>
                <li>Identify the integrated adapter board on the RC car chassis.</li>
                <li>Connect the servo and ESC to the designated ports on the adapter board.</li>
                <li>Ensure the connections are secure.</li>
                <img src={pwm} alt="PWM connection to the Pi" />
            </ol>

            <h2>Connecting Power for the Raspberry Pi</h2>
            <p>Finally, you need to connect power for the Raspberry Pi:</p>
            <ol>
                <li>Locate the power input port on the Raspberry Pi.</li>
                <li>Connect the power source (e.g., battery pack or power adapter) to the power input port.</li>
                <li>Ensure the power connection is secure.</li>
                <img src={usb} alt="Power connection to the Pi" />
            </ol>
        </div>
    );
}

export default HardwareSetup;