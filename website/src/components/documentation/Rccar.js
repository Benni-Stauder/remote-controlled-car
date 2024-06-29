import { useLanguage } from '../../language_context';

const content = {
    en: {
        title: "RC Car Software",
        sections: [
            { id: "overview", title: "Overview", content: "This documentation provides an overview of the code for controlling an RC car that communicates with a PC via UDP and controls a servo and ESC (Electronic Speed Controller) based on received messages." },
            { id: "dependencies", title: "Dependencies", content: "The following Python libraries are required to execute this code:" },
            { id: "global-variables", title: "Global Variables", content: "servo: Instance of the servo class for steering control.\nesc: Instance of the servo class for ESC control.\nbufferSize: Size of the UDP message buffer.\ndebug: Debug flag for print statements.\nmaxSpeedPos: Maximum forward speed.\nmaxSpeedNeg: Maximum reverse speed.\ncurrentMode: Current driving mode.\nUDP_IP: IP address for UDP connection.\nUDP_PORT: Port for UDP connection." },
            { id: "functions", title: "Functions", content: "send_udp_message(message, dest_ip, dest_port): Sends a UDP message to a specific IP address and port.\nreceive_udp_message(): Receives UDP messages sent by the PC.\ngetSteering(jsonMsg): Returns the steering angle requested by the PC.\nestimateSpeed(escValue): Estimates speed based on ESC value.\nlimitSpeed(reqEscValue, speedLimit): Calculates the new ESC value based on the configured speed limit.\ngetPower(jsonMsg): Returns the power requested by the PC (acceleration or deceleration value).\ngetSpeedLimit(jsonMsg): Returns the speed limit sent by the PC.\ngetMode(jsonMsg): Returns the current mode sent by the PC.\ncreateUDPMessage(type, value): Creates a UDP message in JSON format to be sent to the PC.\nfull_brake(): Sets the motor value to maximum braking power and then to neutral." },
            { id: "classes", title: "Classes", content: "TractionControl: Emulates traction control by limiting acceleration.\n__init__(): Initializes traction control with default parameters.\ncontrol_acceleration(currentSpeed, targetSpeed): Limits acceleration to achieve traction control effect." },
            { id: "main-flow", title: "Main Execution Flow", content: "control_servo(): Main function that sets the ESC based on received values and mode.\nmain(): Program entry point. Executes the control_servo function and handles any keyboard-triggered interrupts." },
            { id: "unittests", title: "Unit Tests", content: "Unit tests are designed to evaluate all logic functions within the RC car class and thus test the code's functionality. As Raspberry Pi proprietary software, these tests must be executed on hardware that supports GPIO. Therefore, the unit tests must currently be run on your own Pi or via a GitHub runner using CI/CD." }
        ]
    },
    de: {
        title: "RC Auto Software",
        sections: [
            { id: "übersicht", title: "Übersicht", content: "Diese Dokumentation bietet einen Überblick über den Code für die Steuerung eines RC-Autos, das über UDP mit einem PC kommuniziert und ein Servo sowie einen ESC (Electronic Speed Controller) basierend auf empfangenen Nachrichten steuert." },
            { id: "abängigkeiten", title: "Abhängigkeiten", content: "Die folgenden Python-Bibliotheken sind erforderlich, um diesen Code auszuführen:" },
            { id: "globale-variablen", title: "Globale Variablen", content: "servo: Instanz der Servo-Klasse zur Steuerung des Lenkservos.\nesc: Instanz der Servo-Klasse zur Steuerung des ESC.\nbufferSize: Größe des UDP-Nachrichtenpuffers.\ndebug: Debug-Flag für Druckanweisungen.\nmaxSpeedPos: Maximale Vorwärtsgeschwindigkeit.\nmaxSpeedNeg: Maximale Rückwärtsgeschwindigkeit.\ncurrentMode: Aktueller Fahrmodus.\nUDP_IP: IP-Adresse für die UDP-Verbindung.\nUDP_PORT: Port für die UDP-Verbindung." },
            { id: "funktionen", title: "Funktionen", content: "send_udp_message(message, dest_ip, dest_port): Sendet eine UDP-Nachricht an eine bestimmte IP-Adresse und einen bestimmten Port.\nreceive_udp_message(): Empfängt UDP-Nachrichten, die vom PC gesendet werden.\ngetSteering(jsonMsg): Gibt den Lenkwinkel zurück, der vom PC angefordert wurde.\nestimateSpeed(escValue): Schätzt die Geschwindigkeit basierend auf dem ESC-Wert.\nlimitSpeed(reqEscValue, speedLimit): Berechnet den neuen ESC-Wert basierend auf der konfigurierten Geschwindigkeitsbegrenzung.\ngetPower(jsonMsg): Gibt die vom PC angeforderte Leistung (Beschleunigung oder Abbremsung) zurück.\ngetSpeedLimit(jsonMsg): Gibt die vom PC gesendete Geschwindigkeitsbegrenzung zurück.\ngetMode(jsonMsg): Gibt den aktuellen Modus zurück, der vom PC gesendet wurde.\ncreateUDPMessage(type, value): Erstellt eine UDP-Nachricht im JSON-Format, die an den PC gesendet werden soll.\nfull_brake(): Setzt den Motorwert auf maximale Bremsleistung und dann auf neutral." },
            { id: "klassen", title: "Klassen", content: "TractionControl: Emuliert die Traktionskontrolle, indem die Beschleunigung begrenzt wird.\n__init__(): Initialisiert die Traktionskontrolle mit Standardparametern.\ncontrol_acceleration(currentSpeed, targetSpeed): Begrenzt die Beschleunigung, um einen Traktionskontrolleffekt zu erzielen." },
            { id: "hauptausführungsfluss", title: "Hauptausführungsfluss", content: "control_servo(): Hauptfunktion, die den ESC basierend auf den empfangenen Werten und Modus auf die Steuerungsdaten setzt.\nmain(): Einstiegspunkt des Programms. Führt die control_servo-Funktion aus und behandelt etwaige durch die Tastatur ausgelöste Unterbrechungen." },
            { id: "unittests", title: "Unittests", content: "Unittests sind darauf ausgelegt, alle Logikfunktionen innerhalb der RC-Auto-Klasse zu bewerten und somit die Funktionalität des Codes zu testen. Da es sich um proprietäre Software von Raspberry Pi handelt, müssen diese Tests auf Hardware ausgeführt werden, die GPIO unterstützt. Daher müssen die Unittests derzeit auf Ihrem eigenen Pi oder über einen GitHub-Runner unter Verwendung von CI/CD ausgeführt werden." }
        ]
    }
};

const Rccar = () => {
    const { language } = useLanguage()
    const { title, sections } = content[language];

    return (
        <div>
            <h1>{title}</h1>

            {sections.map(section => (
                <section key={section.id} id={section.id}>
                    <h2>{section.title}</h2>
                    <p>{section.content}</p>
                </section>
            ))}
        </div>
    );
};

export default Rccar;
