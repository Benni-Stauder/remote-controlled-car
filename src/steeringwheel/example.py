from InputDevice import *

# Klasse instanziieren
wheel = InputDevice()

# Liste mit Namen aller verbundenen Joysticks
connected = wheel.getConnectedJoysticks()

# Beispiel: erstes Lenkrad/erster Controller ausgewaehlt, Auswahl dann durch GUI
selected = 0

# ausgewähltes Lenkrad/Joystick initialisieren
if wheel.initDevice(connected[selected]):
    # aktueller Input muss gepolled werden
    while True:
        # Abfrage des aktuellen Inputs
        input = wheel.getInput()

        # Verarbeitung, nur wenn sich Input von Lenkrad geaendert hat
        if input and input.get('type') != "NaN":
            print("input: ", input)

        # Abbruch, wenn Verbindung zu ausgewaehltem Lenkrad/Joystick verloren wird
        if not wheel.checkConnection():
            print("Connection to wheel lost")
            break
else:
    print("Initialization failed")
