import React from 'react';
import { useLanguage } from '../../language_context'; // Replace with your actual context import

function GettingStarted() {
    const { language } = useLanguage();

    return (
        <div>
            <h1>{language === 'en' ? 'Getting Started' : 'Erste Schritte'}</h1>
            <h2>{language === 'en' ? 'Product Overview' : 'Produktübersicht'}</h2>
            <p>{language === 'en' ? 'Welcome to your new RC car with integrated camera! This setup allows you to capture high-quality video footage while controlling the RC car remotely.' : 'Willkommen zu Ihrem neuen RC-Auto mit integrierter Kamera! Diese Einrichtung ermöglicht es Ihnen, hochwertige Videoaufnahmen zu machen, während Sie das RC-Auto fernsteuern.'}</p>

            <h2>{language === 'en' ? 'Package Contents' : 'Lieferumfang'}</h2>
            <ul>
                <li>RC Car chassis</li>
                <li>Camera module</li>
                <li>Remote control</li>
                <li>Battery pack and charger</li>
                <li>Installation guide</li>
            </ul>

            <h2>{language === 'en' ? 'Installation Steps' : 'Installations Schritte'}</h2>
            <ol>
                <li>{language === 'en' ? 'Attach the camera module to the designated slot on the RC car.' : 'Befestigen Sie das Kameramodul am dafür vorgesehenen Platz am RC-Auto.'}</li>
                <li>{language === 'en' ? 'Secure the camera with screws provided in the package.' : 'Sichern Sie die Kamera mit den im Lieferumfang enthaltenen Schrauben.'}</li>
                <li>{language === 'en' ? 'Insert the battery pack into the battery compartment.' : 'Legen Sie den Batteriepack in das Batteriefach ein.'}</li>
                <li>{language === 'en' ? 'Ensure all connections are secure before proceeding.' : 'Stellen Sie sicher, dass alle Verbindungen sicher sind, bevor Sie fortfahren.'}</li>
            </ol>

            <h2>{language === 'en' ? 'Software Installation' : 'Software Installation'}</h2>
            <p>{language === 'en' ? 'Download the \'RC Cam Control\' app from the App Store or Google Play to control your RC car and view live camera feed.' : 'Laden Sie die \'RC Cam Control\' App aus dem App Store oder Google Play herunter, um Ihr RC-Auto zu steuern und das Live-Kamerabild zu sehen.'}</p>

            <h2>{language === 'en' ? 'Initial Configuration' : 'Erstkonfiguration'}</h2>
            <p>{language === 'en' ? 'Follow these steps to configure your car and camera:' : 'Folgen Sie diesen Schritten, um Ihr Auto und Ihre Kamera zu konfigurieren:'}</p>
            <ol>
                <li>{language === 'en' ? 'Turn on the RC car and open the \'RC Cam Control\' app.' : 'Schalten Sie das RC-Auto ein und öffnen Sie die \'RC Cam Control\' App.'}</li>
                <li>{language === 'en' ? 'Follow the in-app instructions to connect to the camera.' : 'Befolgen Sie die Anweisungen in der App, um eine Verbindung zur Kamera herzustellen.'}</li>
                <li>{language === 'en' ? 'Adjust the camera settings as needed via the app\'s settings menu.' : 'Passen Sie bei Bedarf die Kameraeinstellungen über das Einstellungsmenü der App an.'}</li>
            </ol>

            <h2>{language === 'en' ? 'Basic Operation' : 'Grundlegende Bedienung'}</h2>
            <p>{language === 'en' ? 'To start using your RC car, simply turn on the car, connect using your remote or app, and you\'re ready to go! Use the controls to navigate and the camera button to start recording or taking pictures.' : 'Um Ihr RC-Auto zu benutzen, schalten Sie einfach das Auto ein, verbinden Sie es mit Ihrer Fernbedienung oder App und schon kann es losgehen! Verwenden Sie die Steuerelemente zur Navigation und die Kamerataste zum Starten der Aufnahme oder zum Fotografieren.'}</p>
        </div>
    );
}

export default GettingStarted;
