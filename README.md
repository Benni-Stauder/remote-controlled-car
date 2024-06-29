# remote-controlled-car

venv activate
req installieren

## Inhaltsverzeichnis
1. [Einführung](#einführung)
2. [Installationsanleitung](#installationsanleitung)
    - [Backend zur Auto-Connection](#backend-zur-auto-connection)
    - [WebSocket-Server](#websocket-server)
    - [Tauri-App](#tauri-app)
3. [Nutzung](#nutzung)
4. [Mitwirken](#mitwirken)
5. [Lizenz](#lizenz)

## Einführung
Dieses Projekt beinhaltet die Software für das Ansteuern eines RC-Autos.
## Installationsanleitung

#### Voraussetzungen
- Node.js (>= 14.x)
- Rust 1.79.0
- ffmpeg
- Python (>= 3.11)

#### Installation
1. Repository klonen:
    ```bash
    git clone https://github.com/benutzername/repo-name.git
    ```

2. Abhängigkeiten installieren:
    ```bash
   
    pnpm i
    ```

### WebSocket-Server 

1. Venv activieren
   ```bash
   source venv/bin/activate
   ```
   oder 
   ```bash
   ./venv/bin/activate 
      ```
2. Requirements installieren
   ```bash
   pip install -r requirements.txt 
   ```
3. Server starten
   ```bash
   cd src
   python main.py
   ```

### Frontend

#### Installation
1. Repository klonen (falls noch nicht geschehen):
    ```bash
    git clone https://github.com/benutzername/repo-name.git
    cd app
    ```
2. node installieren [download](https://nodejs.org/en)

3. Rust installieren (falls noch nicht installiert):
   Folgen Sie den Anweisungen auf [rust-lang.org](https://www.rust-lang.org/).
   (Bei Windows wird C++ Compiler hierfür benötigt, auswählbar in VS Installation)
4. pnpm installieren
   ```
   npm i -g pnpm
   ```

5. Abhängigkeiten installieren:
    ```bash
    pnpm i
    ```

6. Tauri-App bauen:
   hier wird die App lediglich gebaut (gebuilded), nicht gestartet
   ```bash
    pnpm tauri build
    ```
7. Tauri-App starten:
    ```bash
    pnpm tauri dev
    ```

   
## Nutzung
Nach der Installation und dem Start der jeweiligen Komponenten können Sie die Anwendungen nutzen. Weitere Informationen zur Nutzung und API-Dokumentation finden Sie im jeweiligen Unterverzeichnis.

## Mitwirken
Beiträge sind willkommen! Bitte lesen Sie die [CONTRIBUTING.md](CONTRIBUTING.md) für Details zum Einreichen von Pull Requests.

## Lizenz
Dieses Projekt steht unter der MIT-Lizenz. Weitere Informationen finden Sie in der [LICENSE](LICENSE) Datei.
