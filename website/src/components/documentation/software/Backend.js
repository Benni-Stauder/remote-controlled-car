import React from 'react';
import { useLanguage } from '../../../language_context';

function Backend({ setActiveTab }) {
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
        justifyContent: 'space-between',
        marginTop: '40px'
    };

    const languageContent = {
        en: {
            title: 'Backend Directory',
            overview: `The backend is designed to manage communication and data flow between the frontend and the RC car. It ensures that all data is correctly shared among the different components of this project. Additionally, the backend handles all incoming control inputs and stores them to be accessible for all components of the backend.`,
            files: 'Files',
            runningBackend: 'Running the Backend',
            runScript: `The files of the backend are supposed to be executed as one complete ecosystem, not separately. To run the backend, you should use the ../main.py script located in the parent folder of this directory. This script runs all the required parts of the backend together. Do not attempt to start individual components like UDPServer.py or WebSocketServer.py separately, as this will lead to unintended behavior. Refer to the README in the src directory for detailed instructions on how to run the backend correctly.`,
            purpose: 'Purpose',
            purposeDescription: `The backend directory primarily contains a UDP server for communication with the RC car, a WebSocket server for data exchange with the frontend, and a shared data storage. The primary purpose is to facilitate the required data exchanges by running all interfaces asynchronously. The frontend, the RC car, and the input device (e.g., steering wheel) all access a single static class that acts as shared storage. A big advantage of this approach is that it prevents blocking interfaces since they all operate independently of each other.`,
            sharedDataAccess: 'Shared Data Access',
            sharedDataDescription: `SharedData is a static class that contains exchanged data such as control inputs, RC car odometry, and user settings. It allows asynchronous components to access a common data storage for both writing and reading, ensuring that all parts of the backend have constant access to the currently available values. To prevent issues with data concurrency, Python's asyncio.Lock is used. Therefore, the lock makes sure that only one component can write to the shared data at a time. Meanwhile, reading does not require a lock and is possible for any component at any time.`,
            previousButton: 'previous',
            nextButton: 'next',
        },
        de: {
            title: 'Backend Verzeichnis',
            overview: `Das Backend ist darauf ausgelegt, die Kommunikation und den Datenfluss zwischen dem Frontend und dem RC-Auto zu verwalten. Es stellt sicher, dass alle Daten korrekt zwischen den verschiedenen Komponenten dieses Projekts ausgetauscht werden. Darüber hinaus verarbeitet das Backend alle eingehenden Steuereingaben und speichert sie, damit sie für alle Komponenten des Backends zugänglich sind.`,
            files: 'Dateien',
            runningBackend: 'Backend ausführen',
            runScript: `Die Dateien des Backends sollen als ein zusammenhängendes Ökosystem ausgeführt werden, nicht separat. Um das Backend auszuführen, sollten Sie das ../main.py Skript verwenden, das sich im übergeordneten Ordner dieses Verzeichnisses befindet. Dieses Skript führt alle erforderlichen Teile des Backends zusammen aus. Versuchen Sie nicht, einzelne Komponenten wie UDPServer.py oder WebSocketServer.py separat zu starten, da dies zu unerwünschtem Verhalten führen wird. Lesen Sie die README im src-Verzeichnis für detaillierte Anweisungen zum korrekten Ausführen des Backends.`,
            purpose: 'Zweck',
            purposeDescription: `Das Backend-Verzeichnis enthält hauptsächlich einen UDP-Server zur Kommunikation mit dem RC-Auto, einen WebSocket-Server zum Datenaustausch mit dem Frontend und einen gemeinsamen Datenspeicher. Der Hauptzweck besteht darin, die erforderlichen Datenaustausche durch das asynchrone Ausführen aller Schnittstellen zu erleichtern. Das Frontend, das RC-Auto und das Eingabegerät (z.B. Lenkrad) greifen alle auf eine einzige statische Klasse zu, die als gemeinsamer Speicher fungiert. Ein großer Vorteil dieses Ansatzes besteht darin, dass blockierende Schnittstellen vermieden werden, da sie unabhängig voneinander operieren.`,
            sharedDataAccess: 'Zugang zu gemeinsamen Daten',
            sharedDataDescription: `SharedData ist eine statische Klasse, die ausgetauschte Daten wie Steuereingaben, RC-Auto-Odometrie und Benutzereinstellungen enthält. Sie ermöglicht asynchronen Komponenten den Zugriff auf einen gemeinsamen Datenspeicher zum Schreiben und Lesen und stellt sicher, dass alle Teile des Backends ständigen Zugang zu den derzeit verfügbaren Werten haben. Um Probleme mit Datenkonkurrenz zu vermeiden, wird Python's asyncio.Lock verwendet. Daher stellt das Schloss sicher, dass nur eine Komponente gleichzeitig Daten in den gemeinsamen Speicher schreiben kann. Das Lesen erfordert keinen Schutz und ist jederzeit für jede Komponente möglich.`,
            previousButton: 'vorherige',
            nextButton: 'nächste',
        },
    };

    return (
        <div>
            <h1>{languageContent[language].title}</h1>

            <p>{languageContent[language].overview}</p>
            <br/>

            <h2>{languageContent[language].files}</h2>
            <ul>
                <li><strong>UDPServer.py</strong></li>
                <li><strong>WebSocketServer.py</strong></li>
                <li><strong>SharedData.py</strong></li>
            </ul>
            <br/>

            <h2>{languageContent[language].runningBackend}</h2>
            <p>{languageContent[language].runScript}</p>
            <br/>

            <h2>{languageContent[language].purpose}</h2>
            <p>{languageContent[language].purposeDescription}</p>
            <br/>

            <h2>{languageContent[language].sharedDataAccess}</h2>
            <p>{languageContent[language].sharedDataDescription}</p>

            <div style={floatRight}>
                <button
                    style={buttonStyle}
                    onMouseEnter={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                    onMouseLeave={e => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onClick={() => setActiveTab('source')}
                >
                    {languageContent[language].previousButton}
                </button>
                <button
                    style={buttonStyle}
                    onMouseEnter={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                    onMouseLeave={e => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onClick={() => setActiveTab('input')}
                >
                    {languageContent[language].nextButton}
                </button>
            </div>
        </div>
    );
}

export default Backend;