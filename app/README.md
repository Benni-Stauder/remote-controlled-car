1. node installieren [download](https://nodejs.org/en)
2. rust installieren [download](https://www.rust-lang.org/) (Bei Windows wird C++ Compiler hierfür benötigt, auswählbar in VS Installation)
3. pnpm installieren ```npm i -g pnpm```
4. in app directory navigieren ```cd app```
5. dependencies installieren ```pnpm i```

Frontend im **Dev-Modus** ausführen: ```pnpm tauri dev```
Ausführbaren **Build** erstellen:  ```pnpm tauri build``` (Executable befindet sich danach in ```target/release/```)

*Achtung: Sollte Schritt 5 zu Problemen führen, müssen ggf. Execution_Policies angepasst werden. Hierzu ```Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted``` ausführen.*
