#!/bin/sh
# Lance l'effet indique dans choix.txt, puis ferme la fenetre Terminal ouverte par le Ducky.
# Le Ducky tape dans sa propre fenetre (Cmd+N) : sh /Volumes/DUCKY/go.sh; exit
D=$(cd "$(dirname "$0")" && pwd)
TTY=$(tty 2>/dev/null)
choix=$(tr -d '[:space:]' < "$D/choix.txt" 2>/dev/null)

case "$choix" in
  aleatoire|aléatoire|random) f=$(ls "$D"/effets/*.js | sort -R | head -n 1) ;;
  *) f="$D/effets/$choix.js" ;;
esac
[ -f "$f" ] || f="$D/effets/ducked.js"

nohup osascript "$f" </dev/null >/dev/null 2>&1 &

# On ne ferme que la fenetre du Ducky, reperee par son tty. Les fenetres de l'utilisateur
# (Claude Code, un shell en cours...) restent intactes. Terminal ne quitte que s'il ne reste
# que des fenetres vierges, c'est-a-dire celle creee par son propre lancement.
nohup osascript \
  -e 'on run {t}' -e 'delay 1' -e 'tell application "Terminal"' \
  -e 'repeat with w in (get every window)' \
  -e 'try' -e 'if tty of selected tab of w is t then close w' -e 'end try' \
  -e 'end repeat' \
  -e 'set vierge to true' \
  -e 'repeat with w in (get every window)' \
  -e 'if busy of selected tab of w then set vierge to false' \
  -e 'set n to 0' \
  -e 'repeat with p in paragraphs of (get history of selected tab of w)' \
  -e 'if length of p > 0 then set n to n + 1' \
  -e 'end repeat' \
  -e 'if n > 3 then set vierge to false' \
  -e 'end repeat' \
  -e 'if vierge then quit' \
  -e 'end tell' -e 'end run' "$TTY" </dev/null >/dev/null 2>&1 &
