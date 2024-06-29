import React from 'react';
import { useLanguage } from '../../../language_context';

function ProjectSource({ setActiveTab }) {
    const { language } = useLanguage();

    const buttonStyle = {
        display: 'inline-block',
        outline: 0,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        borderRadius: '4px',
        fontSize: '13px',
        height: '30px',
        backgroundColor: '#2542ac',
        color: 'white',
        padding: '0 20px',
        transition: 'background-color 0.3s',
    };

    const hoverStyle = {
        backgroundColor: '#1f3997',
    };

    const floatRight = {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '40px'
    };

    const languageContent = {
        en: {
            title: 'Software documentation',
            overview: `The project's source folder houses all the logic for both the backend and the RC car. Additionally, this directory includes the main.py script for launching the application. Executing this script establishes communication between the frontend, backend, and RC car and starts the polling for input data. Moreover, all networking configurations and input device calibrations are stored in a config.json file within the same directory.`,
            files: 'Files',
            runningProject: 'Running the Project',
            runScript: `To run the entire project, simply execute main.py. This script initializes all required components and starts their asynchronous execution:`,
            importantNote: `IMPORTANT: It is required to create and start instances of ALL three components of this project. Neglecting their dependencies could result in unexpected behavior and should therefore be avoided.`,
            projectConfig: 'Project Configuration',
            configDescription: `The entire configuration for this project is contained within a single config.json file. This includes sections for network setup (UDP, Websockets) as well as mappings for input devices.`,
            networkConfigExample: `Please make sure that the network configurations are correctly set with the appropriate IP addresses for both server and client. Do not modify the port and buffer settings if you are uncertain about their impact on the UDP or Websocket connection.`,
            deviceConfig: `The configuration settings for the input device depend on the selected gaming wheel. By default, the settings are configured for a Logitech G29 steering wheel. To use other devices, key mappings must be edited within the config.json file.`,
        },
        de: {
            title: 'Software-Dokumentation',
            overview: `Der Ordner des Projekts enthält die Logik für Backend und RC-Auto sowie die Hauptdatei main.py zur Anwendungsausführung. Durch Ausführen dieses Skripts wird die Kommunikation zwischen Frontend, Backend und RC-Auto etabliert und die Abfrage von Eingabedaten gestartet. Alle Netzwerkkonfigurationen und Eingabegerätekalibrierungen sind in der Datei config.json im gleichen Verzeichnis gespeichert.`,
            files: 'Dateien',
            runningProject: 'Projekt ausführen',
            runScript: `Um das gesamte Projekt auszuführen, führen Sie einfach main.py aus. Dieses Skript initialisiert alle erforderlichen Komponenten und startet ihre asynchrone Ausführung:`,
            importantNote: `WICHTIG: Es ist erforderlich, Instanzen ALLER drei Komponenten dieses Projekts zu erstellen und zu starten. Vernachlässigen ihrer Abhängigkeiten könnte zu unerwartetem Verhalten führen und sollte daher vermieden werden.`,
            projectConfig: 'Projektkonfiguration',
            configDescription: `Die gesamte Konfiguration für dieses Projekt ist in einer einzigen config.json-Datei enthalten. Dies umfasst Abschnitte für die Netzwerkeinrichtung (UDP, Websockets) sowie Zuordnungen für Eingabegeräte.`,
            networkConfigExample: `Bitte stellen Sie sicher, dass die Netzwerkkonfigurationen korrekt mit den entsprechenden IP-Adressen für Server und Client eingestellt sind. Modifizieren Sie die Port- und Puffer-Einstellungen NICHT, wenn Sie sich über deren Auswirkungen auf die UDP- oder Websocket-Verbindung unsicher sind.`,
            deviceConfig: `Die Konfigurationseinstellungen für das Eingabegerät hängen von dem ausgewählten Lenkrad ab. Standardmäßig sind die Einstellungen für ein Logitech G29-Lenkrad konfiguriert. Um andere Geräte zu verwenden, müssen die Tastenzuordnungen in der config.json-Datei bearbeitet werden.`,
        }
    };

    return (
        <div>
            <h1>{languageContent[language].title}</h1>

            <p>{languageContent[language].overview}</p>
            <br/>

            <h2>{languageContent[language].files}</h2>
            <ul>
                <li><strong>main.py</strong></li>
                <li><strong>config.json</strong></li>
            </ul>
            <br/>

            <h2>{languageContent[language].runningProject}</h2>
            <p>{languageContent[language].runScript}</p>
            <br/>

            <pre style={{marginLeft: 40 + "px"}}>
                <code>
                    {`deviceListener = InputDeviceListener()
                    server = ServerUDP()
                    websocket_server = WebSocketServer()
                    
                    await asyncio.gather(
                        deviceListener.run(),
                        server.start(),
                        websocket_server.start()
                    )`}
                </code>
            </pre>
            <br/>

            <p><strong>{languageContent[language].importantNote}</strong></p>
            <br/>

            <h2>{languageContent[language].projectConfig}</h2>
            <p>{languageContent[language].configDescription}</p>
            <p>{languageContent[language].networkConfigExample}</p>
            <p>{languageContent[language].deviceConfig}</p>
            <br/>
            <div style={floatRight}>
                <button
                    style={buttonStyle}
                    onMouseEnter={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                    onMouseLeave={e => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onClick={() => setActiveTab('backend')}
                >
                    next
                </button>
            </div>
        </div>
    );
}

export default ProjectSource;
