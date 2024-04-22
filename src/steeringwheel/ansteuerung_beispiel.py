from SteeringWheel import *

# Klasse instanziieren
wheel = SteeringWheel()

# Liste mit Namen aller verbundenen Joysticks
connected = wheel.get_connected_joysticks()

# Beispiel: erstes Lenkrad/erster Joystick ausgewaehlt, Auswahl dann durch GUI
selected = 0

# ausgewaehltes Lenkrad/Joystick initialisieren
if wheel.init_wheel(connected[selected]):
    # aktueller Input muss gepolled werden
    while True:
        # Abfrage des aktuellen Inputs
        input = wheel.getInput()

        # Verarbeitung, nur wenn sich Input von Lenkrad geaendert hat
        if input != None:
            print("input: ", input)

        # Abbruch, wenn Verbindung zu ausgewaehltem Lenkrad/Joystick verloren wird
        if not wheel.check_connection():
            print("Connection to wheel lost")
            break
else:
    print("Initialization failed")