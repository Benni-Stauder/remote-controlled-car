# Software-Dokumentation

## Überblick

Der Quellordner des Projekts enthält die Logik sowohl für das Backend als auch für das RC-Auto. Zusätzlich enthält dieses Verzeichnis das Skript `main.py` zum Starten der Anwendung. Durch Ausführen dieses Skripts wird die Kommunikation zwischen Frontend, Backend und RC-Auto hergestellt und das Abfragen von Eingabedaten gestartet. Darüber hinaus werden alle Netzwerkkonfigurationen und Kalibrierungen der Eingabegeräte in einer `config.json` Datei im selben Verzeichnis gespeichert.

### Dateien
- `main.py`
- `config.json`

## Ausführen des Projekts

Um das gesamte Projekt auszuführen, führen Sie einfach `main.py` aus. Dieses Skript initialisiert alle erforderlichen Komponenten und startet ihre asynchrone Ausführung:

```python
deviceListener = InputDeviceListener()
server = ServerUDP()
websocket_server = WebSocketServer()
await asyncio.gather(
    deviceListener.run(),
    server.start(),
    websocket_server.start()
)
```
**WICHTIG:** Es ist erforderlich, Instanzen ALLER drei Komponenten dieses Projekts zu erstellen und zu starten. Ein Vernachlässigen der Abhängigkeiten könnte zu unerwartetem Verhalten führen und sollte daher vermieden werden.

## Projekt-Konfiguration
Die gesamte Konfiguration für dieses Projekt befindet sich in einer einzigen config.json Datei. Dies umfasst Abschnitte für die Netzwerkeinrichtung (UDP, Websockets) sowie Zuordnungen für Eingabegeräte.

Stellen Sie sicher, dass die Netzwerkkonfigurationen mit den entsprechenden IP-Adressen für Server und Client korrekt eingestellt sind. Modifizieren Sie die Port- und Puffer-Einstellungen nicht, wenn Sie sich über deren Auswirkungen auf die UDP- oder WebSocket-Verbindung nicht sicher sind.

Eine korrekte Netzwerkkonfiguration sollte diesem Beispiel ähneln:
```json
{
  "frontend": {
    "ip": "localhost",
    "port": 8000
  },
  "backend": {
    "port": "<zufälliger Port>",
    "bufferSize": 1024,
    "server": {
      "ip": "<IP-Adresse Ihres PCs>"
    },
    "client": {
      "ip": "<IP-Adresse des RC-Autos>"
    }
  }
}
```
Die Konfigurationseinstellungen für das Eingabegerät hängen von dem ausgewählten Gaminglenkrad ab. Standardmäßig sind die Einstellungen für ein Logitech G29 Lenkrad konfiguriert. Um andere Geräte zu verwenden, müssen die Tastenzuordnungen in der config.json Datei angepasst werden.

Diese Übersetzung stellt sicher, dass der Inhalt und die Formatierung der Software-Dokumentation erhalten bleiben und für deutschsprachige Benutzer leicht verständlich sind.
