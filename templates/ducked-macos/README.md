# ducked-macos

Affiche une fenêtre noire « 🦆 DUCKED » en plein écran sur chaque écran détecté. Espace pour quitter.

## Prérequis

- macOS, clavier AZERTY, session déverrouillée.
- `win.js` à la racine du volume DUCKY : le payload le lit à cet emplacement.

## Déroulé

1. Le Ducky se présente en clavier et en stockage (`ATTACKMODE HID STORAGE`).
2. Il ouvre Spotlight, lance Terminal et tape `osascript /Volumes/DUCKY/win.js`.
3. `win.js` ouvre une fenêtre par écran et se ferme sur la touche espace.

Au premier branchement sur un Mac, macOS peut demander d'autoriser l'accessoire, puis l'accès de Terminal au volume amovible. Terminal reste ouvert exprès, pour laisser le temps de cliquer sur Autoriser.

## Fichiers à copier sur le Ducky

- `inject.bin`, compilé depuis `payload.txt` avec le layout `fr.json`.
- `win.js`.

## Tester sans le Ducky

```bash
osascript templates/ducked-macos/win.js
```
