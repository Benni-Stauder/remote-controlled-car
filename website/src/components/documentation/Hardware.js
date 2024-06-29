import React from 'react';
import { useLanguage } from '../../language_context'; // Replace with your actual context import
import webcam from '../../media/3-raspi_webcam.webp';
import pwm from '../../media/Raspberry pi 3 PWM pins.webp';
import usb from '../../media/raspberry_pi_4_USB-C_power_1.webp';

function HardwareSetup() {
    const { language } = useLanguage();

    return (
        <div>
            <h1>{language === 'en' ? 'Hardware Setup' : 'Hardware Einrichtung'}</h1>

            <h2>{language === 'en' ? 'Connecting the USB Webcam to the Raspberry Pi' : 'Anschließen der USB-Webcam an den Raspberry Pi'}</h2>
            <p>{language === 'en' ? 'First, you need to connect the USB webcam to the Raspberry Pi:' : 'Zuerst müssen Sie die USB-Webcam mit dem Raspberry Pi verbinden:'}</p>
            <ol>
                <li>{language === 'en' ? 'Locate an available USB port on the Raspberry Pi.' : 'Suchen Sie einen verfügbaren USB-Anschluss am Raspberry Pi.'}</li>
                <li>{language === 'en' ? 'Connect the USB webcam to the USB port on the Raspberry Pi.' : 'Verbinden Sie die USB-Webcam mit dem USB-Anschluss am Raspberry Pi.'}</li>
                <li>{language === 'en' ? 'Ensure the connection is secure.' : 'Stellen Sie sicher, dass die Verbindung sicher ist.'}</li>
                <img src={webcam} alt="Webcam connection to the Pi" />
            </ol>

            <h2>{language === 'en' ? 'Connecting the Servo and ESC to the Integrated Adapter Board' : 'Anschließen des Servos und ESC an die integrierte Adapterplatine'}</h2>
            <p>{language === 'en' ? 'Next, you have to connect the servo and ESC to the integrated adapter board:' : 'Als nächstes müssen Sie den Servo und ESC an die integrierte Adapterplatine anschließen:'}</p>
            <ol>
                <li>{language === 'en' ? 'Identify the integrated adapter board on the RC car chassis.' : 'Identifizieren Sie die integrierte Adapterplatine am RC-Auto-Chassis.'}</li>
                <li>{language === 'en' ? 'Connect the servo and ESC to the designated ports on the adapter board.' : 'Verbinden Sie den Servo und ESC mit den dafür vorgesehenen Anschlüssen auf der Adapterplatine.'}</li>
                <li>{language === 'en' ? 'Ensure the connections are secure.' : 'Stellen Sie sicher, dass die Verbindungen sicher sind.'}</li>
                <img src={pwm} alt="PWM connection to the Pi" />
            </ol>

            <h2>{language === 'en' ? 'Connecting Power for the Raspberry Pi' : 'Anschließen der Stromversorgung für den Raspberry Pi'}</h2>
            <p>{language === 'en' ? 'Finally, you need to connect power for the Raspberry Pi:' : 'Schließlich müssen Sie die Stromversorgung für den Raspberry Pi anschließen:'}</p>
            <ol>
                <li>{language === 'en' ? 'Locate the power input port on the Raspberry Pi.' : 'Suchen Sie den Stromanschluss am Raspberry Pi.'}</li>
                <li>{language === 'en' ? 'Connect the power source (e.g., battery pack or power adapter) to the power input port.' : 'Schließen Sie die Stromquelle (z.B. Batteriepack oder Netzteil) an den Stromanschluss an.'}</li>
                <li>{language === 'en' ? 'Ensure the power connection is secure.' : 'Stellen Sie sicher, dass die Stromverbindung sicher ist.'}</li>
                <img src={usb} alt="Power connection to the Pi" />
            </ol>
        </div>
    );
}

export default HardwareSetup;
