#!/bin/sh
# Lance l'effet indique dans choix.txt, puis ferme la fenetre Terminal qui l'a lance.
# Le Ducky tape seulement : sh /Volumes/DUCKY/go.sh
D=$(cd "$(dirname "$0")" && pwd)
TTY=$(tty 2>/dev/null)
choix=$(tr -d '[:space:]' < "$D/choix.txt" 2>/dev/null)

case "$choix" in
  aleatoire|aléatoire|random) f=$(ls "$D"/effets/*.js | sort -R | head -n 1) ;;
  *) f="$D/effets/$choix.js" ;;
esac
[ -f "$f" ] || f="$D/effets/ducked.js"

nohup osascript "$f" </dev/null >/dev/null 2>&1 &

# Si Terminal etait deja ouvert, le Ducky a tape dans une fenetre de l'utilisateur :
# on ne ferme que si c'est l'unique fenetre et qu'elle est vierge (quelques lignes).
nohup osascript \
  -e 'on run {t}' -e 'delay 1' -e 'tell application "Terminal"' \
  -e 'if (count windows) is not 1 then return' \
  -e 'set w to window 1' \
  -e 'if tty of selected tab of w is not t then return' \
  -e 'set n to 0' \
  -e 'repeat with p in paragraphs of (get history of selected tab of w)' \
  -e 'if length of p > 0 then set n to n + 1' \
  -e 'end repeat' \
  -e 'if n > 6 then return' \
  -e 'quit' \
  -e 'end tell' -e 'end run' "$TTY" </dev/null >/dev/null 2>&1 &
