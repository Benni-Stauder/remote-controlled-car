1. node installieren [download](https://nodejs.org/en)
2. rust installieren [download](https://www.rust-lang.org/) (Bei Windows wird C++ Compiler hierfür benötigt, auswählbar in VS Installation)
3. pnpm installieren ```npm i -g pnpm```
4. in app directory navigieren ```cd app```
5. dependencies installieren ```pnpm i```

zum dev modus laufen lassen ```pnpm tauri dev```


zum app bauen ```pnpm tauri build```, die executable befindet sich danach in ```target/release/```
