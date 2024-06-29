# Backend-Verzeichnis

Das Backend ist darauf ausgelegt, die Kommunikation und den Datenfluss zwischen dem Frontend und dem RC-Auto zu verwalten. Es stellt sicher, dass alle Daten korrekt zwischen den verschiedenen Komponenten dieses Projekts geteilt werden. Zusätzlich verarbeitet das Backend alle eingehenden Steuerungseingaben und speichert sie, sodass sie für alle Backend-Komponenten zugänglich sind.

## Dateien
- UDPServer.py
- WebSocketServer.py
- SharedData.py

## Ausführen des Backends
Die Dateien des Backends sollen als ein komplettes Ökosystem ausgeführt werden, nicht separat. Um das Backend auszuführen, sollten Sie das ../main.py Skript im übergeordneten Verzeichnis dieses Ordners verwenden. Dieses Skript führt alle erforderlichen Teile des Backends zusammen aus. Versuchen Sie nicht, einzelne Komponenten wie UDPServer.py oder WebSocketServer.py separat zu starten, da dies zu unerwartetem Verhalten führen wird. Weitere Anweisungen zum korrekten Ausführen des Backends finden Sie in der README-Datei im src-Verzeichnis.

## Zweck
Das Backend-Verzeichnis enthält hauptsächlich einen UDP-Server zur Kommunikation mit dem RC-Auto, einen WebSocket-Server zum Datenaustausch mit dem Frontend und einen gemeinsamen Datenspeicher. Der Hauptzweck besteht darin, die erforderlichen Datenaustausche durch den asynchronen Betrieb aller Schnittstellen zu erleichtern. Das Frontend, das RC-Auto und das Eingabegerät (z.B. Lenkrad) greifen alle auf eine einzelne statische Klasse zu, die als gemeinsamer Speicher dient. Ein großer Vorteil dieses Ansatzes ist, dass er blockierende Schnittstellen verhindert, da sie alle unabhängig voneinander arbeiten.

## Gemeinsamer Datenzugriff
SharedData ist eine statische Klasse, die ausgetauschte Daten wie Steuerungseingaben, Odometrie des RC-Autos und Benutzereinstellungen enthält. Sie ermöglicht es asynchronen Komponenten, auf einen gemeinsamen Datenspeicher sowohl zum Schreiben als auch zum Lesen zuzugreifen, sodass alle Teile des Backends konstant Zugang zu den aktuell verfügbaren Werten haben. Um Probleme mit der Datenkonkurrenz zu verhindern, wird Python's asyncio.Lock verwendet. Dadurch wird sichergestellt, dass nur eine Komponente gleichzeitig in die gemeinsamen Daten schreiben kann. Lesen erfordert jedoch keinen Lock und ist jederzeit für jede Komponente möglich.