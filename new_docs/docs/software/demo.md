Hier ist die Übersetzung der Markdown-Datei:

# Demo Simulator Verzeichnis
## Übersicht
Der Demo-Ordner enthält Skripte, um das Verhalten eines ferngesteuerten Autos als UDP-Client zu simulieren. Daher ist der Inhalt dieses Ordners nicht Teil des eigentlichen Backends und dient nur zu Testzwecken. Dies ermöglicht die Möglichkeit, die gesamte Datenkommunikation zwischen Backend, Frontend und einem simulierten Auto ohne zusätzliche Hardware zu testen.

## Dateien
- UDPClient.py
- VehicleDataSimulator.py

## Den Simulator ausführen
Um das simulierte ferngesteuerte Auto zu starten, führen Sie einfach das Python-Skript in UDPClient.py aus. Da dieses Skript dieselbe Konfigurationsdatei wie das gesamte Backend verwendet, sind keine weiteren Konfigurationen erforderlich.

```bash
python UDPClient.py
```

Falls die config.json-Datei noch nicht konfiguriert wurde, folgen Sie bitte diesen Schritten:

- Ermitteln Sie Ihre aktuelle IP-Adresse mit einer Windows-Shell: ipconfig
- Ersetzen Sie die IP-Adresse sowohl für den Server als auch für den Client in der config.json
- Wenn Sie unsicher sind, ändern Sie nichts an den Einstellungen für das Frontend, den Port oder den Puffer. Behalten Sie die Standardwerte bei.
- Führen Sie den Simulator aus, indem Sie das Client-Skript in UDPClient.py ausführen

## Zweck
Der Zweck des Demo-Verzeichnisses besteht darin, eine Simulation bereitzustellen, die die typischerweise von einem ferngesteuerten Auto generierten Daten nachahmt. Dies beinhaltet die Simulation von Geschwindigkeit und Drehzahl (RPM) als abhängiges Datenpaar und die Berücksichtigung zuvor generierter Werte, um den Eindruck von Beschleunigung oder Bremsen zu erzeugen.

Zusätzlich wird ein UDP-Client benötigt, um eine Verbindung zum Backend herzustellen und die generierten Daten zu senden. Ein weiterer Zweck dieses Verzeichnisses besteht daher darin, Steuerungen und Einstellungen sowohl vom Frontend als auch vom Backend zu empfangen. Diese Steuerungen und Einstellungen werden als binärer Datenstrom übertragen und müssen ordnungsgemäß dekodiert werden. Mit diesem Client wird die vollständige Dekodierung und Extraktion der erforderlichen Daten validiert und getestet.

Dieser Datenfluss kann wie folgt beschrieben werden: Der Client sendet die aktuelle Geschwindigkeit, Drehzahl und den Batteriestand des simulierten Autos an den Server (Backend). Bevor diese Daten gesendet werden, werden sie in eine vordefinierte Byte-Sequenz kodiert, um unnötigen Overhead zu vermeiden. Im Gegenzug erhält der Client die aktuellen Steuerungen (z.B. Lenkwinkel) und Frontend-Einstellungen (z.B. Fahrmodus).