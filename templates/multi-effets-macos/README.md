# multi-effets-macos

Plusieurs effets sur la même clé. Le mot écrit dans `choix.txt` décide lequel se lance, sans recompiler le Ducky.

## Effets

| `choix.txt` | Effet |
|---|---|
| `ducked` | Écran noir « 🦆 DUCKED » sur chaque écran |
| `anonymous` | Écran Anonymous : `effets/anonymous.png` si présent, avec le texte de `effets/anonymous.txt` ou le texte par défaut |
| `aleatoire` | Un effet au hasard parmi ceux du dossier `effets/` |

Un mot inconnu lance `ducked`. Tous les effets se ferment avec la touche espace.

Aucune image n'est fournie dans ce repo. Pour l'effet `anonymous`, dépose ton image sous le nom `effets/anonymous.png`, en vérifiant que tu as le droit de l'utiliser.

## Prérequis

- macOS, clavier AZERTY, session déverrouillée.
- `go.sh`, `choix.txt` et le dossier `effets/` à la racine du volume DUCKY.

## Déroulé

1. Le Ducky ouvre Terminal et tape seulement `sh /Volumes/DUCKY/go.sh`.
2. `go.sh` lit `choix.txt` et lance l'effet en arrière-plan.
3. `go.sh` quitte Terminal, mais seulement si sa fenêtre est la seule ouverte et qu'elle est vierge. Si Terminal était déjà ouvert, rien n'est fermé.

Au premier branchement sur un Mac, cliquer sur Autoriser quand macOS demande l'accès de Terminal au volume amovible.

## Fichiers à copier sur le Ducky

- `inject.bin`, compilé depuis `payload.txt` avec le layout `fr.json`.
- `go.sh`, `choix.txt` et le dossier `effets/`.

## Ajouter un effet

Déposer un script JXA dans `effets/<nom>.js`. Il devient disponible avec `<nom>` dans `choix.txt` et entre automatiquement dans le tirage aléatoire.

## Tester sans le Ducky

```bash
sh templates/multi-effets-macos/go.sh
```
