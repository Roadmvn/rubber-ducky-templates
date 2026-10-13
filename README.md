# rubber-ducky-templates

Templates DuckyScript 3.0 pour le USB Rubber Ducky de Hak5 (modèle 2022).

À utiliser sur ses propres machines, ou dans un cadre explicitement autorisé.

## Templates

| Template | Cible | Effet |
|---|---|---|
| [ducked-macos](templates/ducked-macos/) | macOS, clavier AZERTY | Fenêtre plein écran sur chaque écran, espace pour quitter |
| [multi-effets-macos](templates/multi-effets-macos/) | macOS, clavier AZERTY | Plusieurs effets sur la clé, choisis dans `choix.txt` ou au hasard |

## Compiler et installer un template

1. Ouvrir [Payload Studio Community](https://payloadstudio.hak5.org/community/).
2. Dans Settings > Compiler Settings, choisir le layout `fr.json`.
3. Coller le `payload.txt` du template, puis Generate Payload et Download.
4. Copier `inject.bin` et les fichiers annexes du template à la racine du volume DUCKY.
5. Éjecter le volume, débrancher, rebrancher.

## Reprogrammer le Ducky

Un payload en `ATTACKMODE HID STORAGE` monte le volume DUCKY à chaque branchement : il suffit de remplacer `inject.bin`.

Un payload en `ATTACKMODE HID` seul ne monte plus le volume. Il faut alors passer en mode armement :

1. Ouvrir la coque pour accéder au bouton, sur la carte électronique.
2. Brancher le Ducky normalement et laisser le payload finir.
3. Appuyer une fois sur le bouton. Le volume DUCKY apparaît.

Tenir le bouton pendant le branchement ne fonctionne pas. Voir la [documentation Hak5](https://documentation.hak5.org/hak5-usb-rubber-ducky/unboxing-quack-start-guide).

## Pièges connus

- **Layout `fr.json` et Mac.** Le `fr.json` de Hak5 correspond à un AZERTY PC. Sur un Mac AZERTY, `-` sort `§`, `+` sort `_`, `<` sort `@` et `>` sort `#`. Dans un payload macOS, se limiter aux lettres, aux chiffres et à `/ . ; ' &`.
- **Lignes trop longues.** Payload Studio Community plante, page blanche, sur une ligne `STRING` de plus de 1 000 caractères. Des lignes de 200 caractères passent.
- **Permissions macOS.** Sur un Mac Apple Silicon, macOS demande d'autoriser tout nouvel accessoire USB. Lire un fichier sur le volume DUCKY déclenche aussi une demande d'accès au volume amovible. Laisser l'application ouverte le temps de cliquer sur Autoriser.
- **Layout de la cible.** Un payload compilé pour AZERTY ne fonctionne pas sur une machine en QWERTY.

## Ajouter un template

Créer un dossier `templates/<nom>/` avec au minimum un `payload.txt` et un `README.md` qui indique la cible, le layout et les fichiers à copier sur le Ducky.

## Licence

[MIT](LICENSE)
