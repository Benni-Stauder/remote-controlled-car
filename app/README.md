# Frontend-Dokumentation

## Inhaltsverzeichnis
1. [Einführung](#einführung)
2. [Projektstruktur](#projektstruktur)
3. [Installation](#installation)
4. [Verbindung zum Backend](#verbindung-zum-backend)
5. [Frontend-Komponenten](#frontend-komponenten)
6. [Tauri und Rust](#tauri-und-rust)


## Einführung
<p style="text-align: justify;">
Dieses Projekt ist eine Softwarelösung, die es ermöglicht, ein Auto per Racing Lenkrad zu steuern und einen Live-Video-Stream im Frontend anzuzeigen. 

<p style="text-align: justify;">
Diese Dokumentation bezieht sich lediglich auf das Frontend des Projektes und seine Funktionalitäten.

### Technologie-Stack

1. React

   React ist eine beliebte JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen, insbesondere von Single-Page-Anwendungen, bei denen sich Daten häufig ändern. In diesem Projekt wird React aus folgenden Gründen verwendet:

   - Komponentenbasierte Architektur: Die komponentenbasierte Struktur von React ermöglicht wiederverwendbare UI-Komponenten, wodurch der Code modularer und einfacher zu warten ist.
   - Deklarative UI: React ermöglicht die deklarative UI-Entwicklung, was den Prozess der Gestaltung interaktiver und dynamischer Benutzeroberflächen vereinfacht.
   - Virtueller DOM: Der virtuelle DOM von React verbessert die Leistung, indem er die direkte Manipulation des tatsächlichen DOM minimiert und somit schnellere UI-Updates ermöglicht.
   - Tailwind CSS: Tailwind ist ein vielseitiges CSS-Framework, das die Entwicklung von anpassbaren und reaktionsfähigen Designs beschleunigt. Es ermöglicht es, direkt in den Klassenstilen zu arbeiten, was die Entwicklungszeit verkürzt und die Konsistenz erhöht.
   - ShadCN: ShadCN ist eine Bibliothek, die speziell dafür entwickelt wurde, um mit React und Tailwind zu arbeiten. Sie bietet eine Sammlung von vorgefertigten UI-Komponenten, die nahtlos in das Projekt integriert werden können und die Entwicklung von Benutzeroberflächen weiter beschleunigen.
   - Zustand: Dies ist eine Lösung zum Statemanagement in React, es wird ein globaler Store erstellt, in dem alle Daten der Anwendung gespeichert sind, dadurch können Daten im Store geändert werden und die neuen Daten sind an allen Stellen direkt vorhanden wo sie aus dem Store ausgelesen werden. Somit müssen Daten vom Backend nicht doppelt geladen werden, da sie durch den store global verfügbar sind.

2. Vite

   Vite ist ein modernes Frontend-Tooling, das auf Geschwindigkeit und Leistung ausgelegt ist. Es wird in diesem Projekt aus folgenden Gründen verwendet:

   - Schneller Entwicklungsserver: Vite bietet einen extrem schnellen Entwicklungsserver mit sofortigem Hot Module Replacement (HMR), was den Entwicklungsprozess erheblich beschleunigt.
   - Optimierter Build: Vite nutzt moderne JavaScript-Funktionen, um einen optimierten Build-Prozess mit schnelleren Builds und kleineren Bundle-Größen zu ermöglichen.
   - Einfache Integration: Die Konfiguration von Vite ist einfach und lässt sich nahtlos in React integrieren, was es zu einer idealen Wahl für dieses Projekt macht.


3. Tauri

   Tauri ist ein Framework zur Erstellung kleiner, schneller Binärdateien für alle wichtigen Desktop-Plattformen. Es wird in diesem Projekt verwendet, um eine Desktop-Anwendung zur Steuerung des RC-Autos zu erstellen. Die Gründe für die Wahl von Tauri sind:

   - Plattformübergreifend: Tauri ermöglicht die Erstellung plattformübergreifender Desktop-Anwendungen aus einer einzigen Codebasis und unterstützt Windows, macOS und Linux.
   - Sicherheit: Tauri bietet eine sicherheitsorientierte Umgebung, die sicherstellt, dass die Anwendung standardmäßig sicher ist.
   - Leichtgewichtig: Tauri-Anwendungen sind im Vergleich zu traditionellen Electron-Anwendungen extrem leichtgewichtig, da sie keine vollständige Webbrowser-Engine mitbringen.
   - Rust-Integration: Tauri verwendet Rust für das Backend, was hohe Leistung und Zuverlässigkeit bietet. Die Speichersicherheitsfunktionen von Rust helfen, häufige Fehler und Sicherheitslücken zu verhindern.


4. Rust

   Rust ist eine Systemprogrammiersprache, die für ihre Leistung und Sicherheit bekannt ist. Sie wird in diesem Projekt verwendet, um das Backend der Tauri-Anwendung zu erstellen. Die Gründe für die Wahl von Rust sind:

   - Leistung: Rust bietet eine Leistung, die mit C und C++ vergleichbar ist, und ist daher ideal für ressourcenintensive Anwendungen.
   - Sicherheit: Das Ownership-System von Rust gewährleistet Speichersicherheit, ohne dass ein Garbage Collector erforderlich ist, und verringert das Risiko von Speicherlecks und anderen häufigen Fehlern.
   - Nebenläufigkeit: Das Nebenläufigkeitsmodell von Rust erleichtert das Schreiben von sicherem und effizientem nebenläufigem Code, was für die Verarbeitung von Echtzeitdaten vom RC-Auto von Vorteil ist. 

   
#### Fazit

Die Kombination aus React, Vite, Tauri und Rust bietet einen leistungsstarken und effizienten Technologie-Stack zur Entwicklung einer Desktop-Anwendung zur Steuerung eines RC-Autos. React und Vite kümmern sich um das Frontend und bieten eine schnelle und reaktionsfähige Benutzeroberfläche, während Tauri und Rust eine leichtgewichtige, sichere und leistungsstarke Desktop-Anwendung gewährleisten. Dieser Technologie-Stack verbessert nicht nur das Entwicklungserlebnis, sondern stellt auch eine robuste und benutzerfreundliche Anwendung für die Endnutzer sicher.

## Projektstruktur
```plaintext
app/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── assistance_systems.tsx
│   │   ├── connector.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── store.ts
│   │   ├── websocket_manager.ts
│   │   ├── ...
│   ├── main.tsx
│   └── ...
├── src-tauri/
│   ├── src/
│   │   ├── main.rs
│   ├── tauri.conf.json
│   └── ...
├── index.html
├── package.json
├── pnpm-lock.yaml
└── ...
```

## Installation

### Vorraussetzungen
- Node.js (>= 14.x)
- Rust 1.79.0
- ffmpeg

#### Installationsschritte
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
   Die gebaute App kann dann mit der `src-tauri/target/release/<app_name>` Executable gestartet werden.


7. Tauri-App im Developmentmodus starten:
    ```bash
    pnpm tauri dev
    ```

## Verbindung zum Backend
<p style="text-align: justify;">
Die Frontend-Anwendung wird über eine Websocket-Verbindung mit dem Backend verbunden. Dabei fungiert das Backend als Websocket-Server, mit dem sich das Frontend verbindet. 
Nachdem eine Verbindung zum Backend hergestellt wurde, ist ein beidseitiger Datenaustausch möglich. 
<p style="text-align: justify;">
Der Verbindungsversuch wird durch den Nutzer getriggert (hierzu später mehr). 
Der websocket manager (siehe Projektstruktur) sorgt dafür dass es immer nur eine verbindung des frontends mit dem webscoket backend gitb, dies erfolgt dadurch das ein Singleton des Websockets erschaffen wird, somit kann nur eine Verbindung existieren
<p style="text-align: justify;">
Das Frontend schickt Daten in Form eines json-Objektes, bei Änderung einer der für das Backend relevanten Daten.
Das erwähnte Objekt ist wie folgt aufgebaut:

```plaintext
websocketMessage = {
   maxSpeed: string,
   mode: string,
   assistance: bool,
};
```
<p style="text-align: justify;">
Durch den websocket werden konintuirlich livedaten aus dem backend an das frontend übertragen, welche dann in der UI verwendet werden. Ein beispiel hierfür ist zb die aktuelle Geschwindigkeit oder die aktuelle RPM (Drehzahl).



## Frontend-Komponenten
<p style="text-align: justify;">
Das Frontend besteht aus zwei Hauptkomponenten, der Startseite (index.tsx) und den Einstellungen (settings.tsx).
Beide Seiten bestehen aus mehrern React-Komponenten. Der Aufbau wird in folgender Abbildung verdeutlicht:

![Aufbau Komponenten](src/assets/Komponenten.png)


Im Folgenden werden die oben zu sehenden Komponenten genauer erläutert.


### index.tsx

<p style="text-align: justify;">
Hierbei handelt es sich um die Hauptkomponente der App, sie ist gleichzeitig die Startseite.

<p style="text-align: justify;">
Die Seite besteht aus zwei Hauptkomponenten, dem Videoscreen (videoscreen.tsx) und einer Komponente, die den Verbindungsfortschritt zu RC-Auto und Kamera anzeigt (connector.tsx).

Folgende Abbildung zeigt die Startseite:

![Startseite](src/assets/inedx.png)
<p style="text-align: justify;">
Durch Betätigen des "Connect"-Buttons ist es dem User möglich sich zu den anderen Komponenten des Projekts 
( Auto bzw. hier dem Websocket-Server, welcher die Fahrdaten liefert und Live Kamera).
Es erscheint eine Verbindungsfortschrittanzeigen (hierzu später mehr), sobald alle Verbindungen hergestellt wurde, wird der Live-Kamera Feed in der Videoscreen-Komponente angezeigt.

<p style="text-align: justify;">
Durch Betätigen des "Disconnect"-Buttons werden die Verbindungen getrennt, dementsprechend werden weder Kamera-Feed noch Live-Daten des RC-Autos angezeigt.

<p style="text-align: justify;">
Desweiteren kann der User über das Settings-Symbol unten rechts auf die Einstellungen zugreifen (settings.tsx).
Diese Funktion ist jedoch lediglich bei hergestellter Verbindung möglich.



### connector.tsx
<p style="text-align: justify;">
Dieses React-Component ist für die Visualisierung der Verbindung zum Backend (Websocket-Server) und zur Kamera zuständig.

<div style="text-align: center;">
<img src="src/assets/connector.png" alt="Connector-Screen" width="300" center/>
</div>



### videoscreen.tsx
<p style="text-align: justify;">
Diese Komponente dient zum Abrufen und Anzeigen des Live Kamera Feeds.
Zudem werden hier die Geschwindigkeit, die Drehzahl und weitere Livedaten angezeigt.


### settings.tsx
<p style="text-align: justify;">
Die Settings-Komponente ist die zweite "page" der Anwendung. Hier hat der Nutzer verschiedene Einstellungsmöglichkeiten.

<p style="text-align: justify;">
Die Seite besteht aus 5 kleineren Komponenten, die jeweils eine Hauptfunktionalität besitzen. Diese Aufteilung bewirkt, dass der Code modularer, leichter zu warten und wiederverwendbar ist, da jede Komponente klar abgegrenzte Aufgaben hat und unabhängig von den anderen entwickelt und getestet werden kann. 
Zudem ermöglicht es eine bessere Skalierbarkeit und vereinfacht die Fehlersuche, da Probleme auf einzelne Komponenten isoliert werden können.

Folgende Abbildung zeigt die vollständige Einstellungsseite:

![Startseite](src/assets/settings.png)


### header.tsx
<p style="text-align: justify;">
Dieses Component stellt, wie der Name schon sagt, den Header der Settingspage dar. Er besteht aus der Überschrift "Settings", dem Navigationsbutton zurück zur index.tsx und der Auswahl der Fahrmodi.
Der Fahrmodus wird durch klicken der Checkbox ausgewählt. Je nach Modus kann der Benutzer mehr oder weniger Einstellungen treffen. Beispielsweise lassen sich die Assistenzsysteme nur ausschalten, sollte der Modus "Pro" ausgwählt sein.
Der ausgewählte Fahrmodus wird durch eine neu getroffene Auswahl automatisch per Websocket-Verbindung an das Backend geschickt und dort weiter verarbeitet. Darum ist es zwingend notwendig, dass vor Änderung einer Einstellung bereits eine Verbindung zum Backend besteht. Dies ist dadurch gegeben, dass sich die Seite nur öffnen lässt, sollte eine Verbindung established sein.

### settings_form.tsx
<p style="text-align: justify;">
Dieses Component managed alle Einstellungen, die in der Anwendung getroffen werden können.
wird unterteilt in speed_settings, assistance_system und dashboard_customization.

### speed_settings.tsx
<p style="text-align: justify;">
Hier kann der Nutzer die maximal mögliche Geschwindigkeit, die das RC-Auto fahren kann, einstellen. Sobald diese geändert wird, egal, ob durch Eingabe einer Zahl in das Inputfeld oder durch Bewegen des "Sliders", wird diese Information über die Websocket-Verbindung an das Backend gesendet.

<p style="text-align: justify;">
Die maximal einstellbare Geschwindigkeit beträgt 100 km/h, beziehungsweise 50 km/h, sollte sich das RC-Auto im "Child"-Modus befinden.


### assistance_system.tsx
<p style="text-align: justify;">
Dieses Component besteht aus einer Überschrift "Driver Assistance Systems" und einem "Switch", durch welchen sich die Fahrerassistenzsysteme an- und ausschalten lassen. Bei einer Änderung des Schalters wird dies ebenfalls an das Backend gesendet und die Information weiter verarbeitet.

<p style="text-align: justify;">
Wichtig zu Erwähnen ist hier, dass ein Ausschalten der Assistenzsysteme nur möglich ist, wenn sich das RC-Auto im Modus "Pro" befindet.


### dashboard_customization.tsx
<p style="text-align: justify;">
In diesem Component kann der Nutzer sein "Dashboard" verändern. Es lässt sich eine Auswahl an möglichen Anzeigeoptionen treffen. Zu Beginn werden lediglich die Geschwindigkeit (Velocity), die Maximalgeschwindigkeit (Max Speed) und die Drehzahl (Rpm) angezeigt. Zusätzlich dazu stellt das RC-Auto jedoch Daten zur Beschleunigung und Bremspedalstellung zur Verfügung, die ebenfalls angezeigt werden können. 
Der Schalter "Map", also eine Live-Karte ist in der aktuellen leider noch nicht möglich, da das RC-Auto noch über kein GPS-Signal verfügt.

<p style="text-align: justify;">
Diese Komponente ist im Kindermodus "Child" ebenfalls nicht verfügbar, um die Anzeige und damit das Fahrerlebnis möglichst einfacher zu halten.


### dashboard_preview.tsx
<p style="text-align: justify;">
Die zuvor erläuterten Anzeigeoptionen des Dashboards lassen sich in diesem Component direkt einsehen. Die Komponente besteht aus einem "Miniatur"-Videoscreen, der sich, je nach Auswahl in dashboard_customization.tsx, aktualisiert.
So bekommt der Nutzer eine genaue Vorstellung, wie der von ihm aufgebaute Videoscreen der Anwendung aussehen wird.

## Tauri und Rust
<p style="text-align: justify;">
Tauri ist ein Crossplattform (Mac, Windows und Linux) Desktopbundler, welcher es ermöglicht,
Webanwendungen als Executables zu bauen, und diese als "normale" Anwendungen auf unserem Computer zu starten.
Dies erfolgt mithilfe der Webview Plattform. Innerhalb unserer Anwendung laufen zwei Prozesse, der Webview Prozess, zum Anzeigen der UI, 
und der Tauri Prozess, mit dem durch Eventemitter, Funktionen aus dem Frontend in dem Tauri-Rust Backend aufgerufen werden können.
So wird zum Beispiel in unserer Anwendung ein RSP-Stream in ein für das Frontend nutzbares Format geändert.


### Stream 
<p style="text-align: justify;">
Rust wird neben dem Starten der Anwendung ebenfalls zum Abrufen und prüfen des Live  Streams verwendet.

<p style="text-align: justify;">
Bei dem Stream handelt es sich um einen rsp-stream, der direkt vom RC-Auto bzw vom darin verbauten Rasberry Pi gesendet wird.
Da dieses Format nicht direkt über einen Browser abrufbar ist, wird dieser mithilfe von FFMPEG in das Videoformat h256 umgewandelt, und dann über einen Rust-Webserver dem Frontend zur Verfügung gestellt, sodass das Livebild
des Autos in der Anwendung angezeigt werden kann. Zum starten des FFMPEG Prozesses, der die Videodateien umwandelt, wird ebenfalls Rust benutzt.





