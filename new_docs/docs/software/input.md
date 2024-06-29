# Eingabegerät-Verzeichnis

## Übersicht
Das Eingabegerät-Verzeichnis wird verwendet, um eine Verbindung zu einem Gaming-Lenkrad oder Controller herzustellen, die empfangenen Daten zu verarbeiten und diese in der SharedData.py-Klasse des Backends zu speichern. Eine korrekte Zuordnung zwischen den empfangenen Eingaben und den tatsächlich gedrückten Tasten wird durch die Geräteeinrichtung in config.json sichergestellt (nur für Gaming-Lenkräder erforderlich).

## Dateien
- InputDevice.py
- InputDeviceListener.py

## Ausführen des Eingabegerät-Listeners
Um den Eingabegerät-Listener auszuführen, können Sie direkt eine Instanz der InputDeviceListener-Klasse erstellen. Dies wird jedoch nur für Testzwecke empfohlen. Für alle anderen Anwendungsfälle sollte der Eingabegerät-Listener zusammen mit dem gesamten Backend ausgeführt werden. Daher sollte das ../main.py Skript des übergeordneten Verzeichnisses (src) ausgeführt werden. Auf diese Weise wird sichergestellt, dass die empfangenen Eingaben tatsächlich an das RC-Auto gesendet werden.

Für Testzwecke können Sie eine Instanz wie folgt erstellen:

```python
inputDeviceListener = InputDeviceListener(<device_index>)
inputDeviceListener.run()
```

Der Konstruktor von InputDeviceListener nimmt optional einen Integer-Wert namens device_index als Eingabe entgegen. Dieser Wert muss verwendet werden, wenn mehr als ein Gerät angeschlossen ist. Um auszuwählen, welches Gerät initialisiert werden soll, wird der angegebene device_index verwendet. Wenn nur ein Gerät angeschlossen ist, kann dieser Parameter weggelassen werden, da sein Standardwert 1 ist.

## Zweck
Die InputDevice-Klasse ist so konfiguriert, dass alle relevanten Ereignisse wie Tastendrücke, Joystick-Bewegungen oder Lenkbewegungen erfasst werden. Sie verarbeitet diese Steuereingaben vor und ordnet sie entweder Lenkwinkeln oder Prozentsätzen für Beschleunigung und Bremsen zu. Die Datenabfrage vom angeschlossenen Eingabegerät wird durch die Python-Bibliothek pygame implementiert, die als einfache API zur Verbindung mit beliebigen Eingabegeräten dient.

Die separate InputDeviceListener-Klasse ist darauf ausgelegt, die Eingabedaten asynchron abzufragen. Durch die Verwendung dieser dedizierten Listener-Klasse können Eingabeereignisse registriert werden, ohne die Kommunikation zwischen Frontend, Backend und dem RC-Auto zu blockieren.