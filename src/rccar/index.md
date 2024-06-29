# RC Auto Software

Diese Dokumentation bietet einen Überblick über den Code für die Ansteuerung eines RC-Autos, das mit einem PC über UDP kommuniziert und ein Servo sowie einen ESC (Electronic Speed Controller) basierend auf den empfangenen Nachrichten steuert.

## Inhaltsverzeichnis

1. [Übersicht](#übersicht)
2. [Abhängigkeiten](#abhängigkeiten)
3. [Globale Variablen](#globale-variablen)
4. [Funktionen](#funktionen)
5. [Klassen](#klassen)
6. [Hauptausführungsfluss](#hauptausführungsfluss)
7. [Unittests](#unittests)

## Übersicht

Basierend auf von einem PC empfangenen UDP-Nachrichten wird ein Servo und ein ESC gesteuert. Des Weiteren beinhaltet die Steuerung Funktionen zur Geschwindigkeitsabschätzung, Geschwindigkeitsbegrenzung, Modusauswahl und Traktionskontrolle.

## Abhängigkeiten

Die folgenden Python-Bibliotheken sind erforderlich, um diesen Code auszuführen:

- `asyncio`
- `socket`
- `json`
- `gpiozero`
- `time`

## Globale Variablen

- **servo**: Instanz der `Servo`-Klasse zur Steuerung des Lenkservos.
- **esc**: Instanz der `Servo`-Klasse zur Steuerung des ESC.
- **bufferSize**: Größe des UDP-Nachrichtenpuffers.
- **debug**: Debug-Flag für Druckanweisungen.
- **maxSpeedPos**: Maximale Vorwärtsgeschwindigkeit.
- **maxSpeedNeg**: Maximale Rückwärtsgeschwindigkeit.
- **currentMode**: Aktueller Fahrmodus.
- **UDP_IP**: IP-Adresse für die UDP-Verbindung.
- **UDP_PORT**: Port für die UDP-Verbindung.

## Funktionen

### `send_udp_message(message, dest_ip, dest_port)`

Sendet eine UDP-Nachricht an eine bestimmte IP-Adresse und einen bestimmten Port.

**Parameter:**
- `message`: Die zu sendende Nachricht.
- `dest_ip`: Ziel-IP-Adresse.
- `dest_port`: Zielport.

### `receive_udp_message()`

Empfängt UDP-Nachrichten, die vom PC gesendet werden.

**Rückgabewert:**
- Geparste JSON-Nachricht.

### `getSteering(jsonMsg)`

Gibt den vom PC angeforderten Lenkwinkel zurück.

**Parameter:**
- `jsonMsg`: JSON-Nachricht mit Steuerungsdaten.

**Rückgabewert:**
- Lenkwinkel in Grad [-90° bis 90°].

### `estimateSpeed(escValue)`

Schätzt die Geschwindigkeit basierend auf dem ESC-Wert.

**Parameter:**
- `escValue`: Wert des ESC.

**Rückgabewert:**
- Geschätzte Geschwindigkeit [kmh].

### `limitSpeed(reqEscValue, speedLimit)`

Berechnet den neuen ESC-Wert basierend auf der konfigurierten Geschwindigkeitsbegrenzung.

**Parameter:**
- `reqEscValue`: Angeforderter ESC-Wert.
- `speedLimit`: Gewünschte Geschwindigkeitsbegrenzung.

**Rückgabewert:**
- Begrenzter ESC-Wert.

### `getPower(jsonMsg)`

Gibt die vom PC angeforderte Leistung (Wert für Beschleunigung oder Abbremsung) zurück.

**Parameter:**
- `jsonMsg`: JSON-Nachricht mit Steuerungsdaten.

**Rückgabewert:**
- Leistungswert für Beschleunigung und Abbremsung [0 bis 100].

### `getSpeedLimit(jsonMsg)`

Gibt die vom PC gesendete Geschwindigkeitsbegrenzung zurück.

**Parameter:**
- `jsonMsg`: JSON-Nachricht mit Modusdaten.

**Rückgabewert:**
- Geschwindigkeitsbegrenzung [kmh].

### `getMode(jsonMsg)`

Gibt den aktuellen Modus zurück, der vom PC gesendet wurde.

**Parameter:**
- `jsonMsg`: JSON-Nachricht mit Modusdaten.

**Rückgabewert:**
- Aktueller Modus.

### `createUDPMessage(type, value)`

Erstellt eine UDP-Nachricht im JSON-Format, die an den PC gesendet werden soll.

**Parameter:**
- `type`: Typ der Nachricht.
- `value`: In der Nachricht enthaltener Wert.

**Rückgabewert:**
- JSON-formatierte UDP-Nachricht.

### `full_brake()`

Setzt den Motorwert auf maximale Bremsleistung und anschließend auf neutral.

## Klassen

### `TractionControl`

Emuliert die Traktionskontrolle, indem die Beschleunigung begrenzt wird.

#### `__init__()`

Initialisiert die Traktionskontrolle mit Standardparametern.

#### `control_acceleration(currentSpeed, targetSpeed)`

Begrenzt die Beschleunigung, um einen Traktionskontrolleffekt zu erzielen.

**Parameter:**
- `currentSpeed`: Aktuelle Geschwindigkeit des Reifens.
- `targetSpeed`: Zielgeschwindigkeit des Reifens, die erreicht werden soll.

**Rückgabewert:**
- Neue Geschwindigkeit nach Anwendung der Traktionskontrolle.

## Ausführungsfluss

### `control_servo()`

Hauptfunktion, die den ESC basierend auf den empfangenen Werten und Modus auf die Steuerungsdaten setzt.

### `main()`

Einstiegspunkt des Programms. Führt die Funktion `control_servo` aus und behandelt evtl. durch Tastatur ausgelöste Interrupts.

## Unittests

The Unittests are designed to evaluate all logic containing functions inside the rccar class and therfor test the functionality of the code
The downside of using Raspberry Pi propretary software is, that those unittests must be run on hardware, that support GPIO.
Because of this the unittest currently must be run on your own Pi or via a github runner using CI/CD
