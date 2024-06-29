# RC-Car-Software

## Überblick

Diese Dokumentation bietet einen Überblick über den Code zur Steuerung eines RC-Autos, das über UDP mit einem PC kommuniziert und einen Servo sowie einen ESC (Electronic Speed Controller) basierend auf empfangenen Nachrichten steuert.

## Abhängigkeiten

Die folgenden Python-Bibliotheken sind erforderlich, um diesen Code auszuführen:

## Globale Variablen

- servo: Instanz der Servoklasse zur Steuerung der Lenkung.
- esc: Instanz der Servoklasse zur Steuerung des ESC.
- bufferSize: Größe des UDP-Nachrichtenpuffers.
- debug: Debug-Flag für Druckanweisungen.
- maxSpeedPos: Maximale Vorwärtsgeschwindigkeit.
- maxSpeedNeg: Maximale Rückwärtsgeschwindigkeit.
- currentMode: Aktueller Fahrmodus.
- UDP_IP: IP-Adresse für die UDP-Verbindung.
- UDP_PORT: Port für die UDP-Verbindung.

## Funktionen

-	send_udp_message(message, dest_ip, dest_port): Sendet eine UDP-Nachricht an eine bestimmte IP-Adresse und einen bestimmten Port.
- receive_udp_message(): Empfängt von dem PC gesendete UDP-Nachrichten.
- getSteering(jsonMsg): Gibt den vom PC angeforderten Lenkwinkel zurück.
- estimateSpeed(escValue): Schätzt die Geschwindigkeit basierend auf dem ESC-Wert.
-	limitSpeed(reqEscValue, speedLimit): Berechnet den neuen ESC-Wert basierend auf der konfigurierten Geschwindigkeitsbegrenzung.
-	getPower(jsonMsg): Gibt die vom PC angeforderte Leistung (Beschleunigungs- oder Verzögerungswert) zurück.
- setSpeedLimit(jsonMsg): Gibt die vom PC gesendete Geschwindigkeitsbegrenzung zurück.
-	getMode(jsonMsg): Gibt den aktuellen Modus zurück, der vom PC gesendet wurde.
-	createUDPMessage(type, value): Erstellt eine UDP-Nachricht im JSON-Format, die an den PC gesendet wird.
-	full_brake(): Setzt den Motorwert auf maximale Bremskraft und dann auf Neutral.

## Klassen

-	TractionControl: Emuliert die Traktionskontrolle durch Begrenzung der Beschleunigung.
-	init(): Initialisiert die Traktionskontrolle mit Standardparametern.
-	control_acceleration(currentSpeed, targetSpeed): Begrenzung der Beschleunigung, um den Effekt der Traktionskontrolle zu erreichen.

## Hauptausführungsfluss

-	control_servo(): Hauptfunktion, die den ESC basierend auf den empfangenen Werten und dem Modus einstellt.
-	main(): Programmeinstiegspunkt. Führt die Funktion control_servo aus und behandelt alle durch die Tastatur ausgelösten Unterbrechungen.

## Unit-Tests

Unit-Tests sind darauf ausgelegt, alle logischen Funktionen innerhalb der RC-Car-Klasse zu bewerten und somit die Funktionalität des Codes zu testen. Da es sich um proprietäre Software des Raspberry Pi handelt, müssen diese Tests auf Hardware ausgeführt werden, die GPIO unterstützt. Daher müssen die Unit-Tests derzeit auf Ihrem eigenen Pi oder über einen GitHub-Runner mithilfe von CI/CD ausgeführt werden.