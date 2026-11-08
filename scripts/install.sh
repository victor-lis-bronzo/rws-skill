#!/usr/bin/env bash
# Install the rws skill by copying (or symlinking) it into agent skill folders.
# Usage: scripts/install.sh [--claude] [--agy] [--project <dir>] [--link] [--uninstall]
# With no target flag, installs globally for both Claude Code and Antigravity.
set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/../skills/rws" && pwd)"
NAME="rws"
CLAUDE=0; AGY=0; LINK=0; UNINSTALL=0; PROJECT=""

while [ $# -gt 0 ]; do
  case "$1" in
    --claude) CLAUDE=1 ;;
    --agy) AGY=1 ;;
    --link) LINK=1 ;;
    --uninstall) UNINSTALL=1 ;;
    --project) shift; PROJECT="${1:?--project needs a directory}" ;;
    -h|--help) sed -n '2,4p' "$0"; exit 0 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
  shift
done
[ $CLAUDE -eq 0 ] && [ $AGY -eq 0 ] && CLAUDE=1 && AGY=1

targets=()
if [ -n "$PROJECT" ]; then
  [ $CLAUDE -eq 1 ] && targets+=("$PROJECT/.claude/skills")
  [ $AGY -eq 1 ] && targets+=("$PROJECT/.agents/skills")
else
  [ $CLAUDE -eq 1 ] && targets+=("$HOME/.claude/skills")
  # Antigravity documents ~/.gemini/config/skills; the skills CLI writes to antigravity-cli/skills.
  [ $AGY -eq 1 ] && targets+=("$HOME/.gemini/config/skills" "$HOME/.gemini/antigravity-cli/skills")
fi

for dir in "${targets[@]}"; do
  dest="$dir/$NAME"
  rm -rf "$dest"
  if [ $UNINSTALL -eq 1 ]; then echo "removed  $dest"; continue; fi
  mkdir -p "$dir"
  if [ $LINK -eq 1 ]; then ln -s "$SRC" "$dest"; echo "linked   $dest -> $SRC"
  else cp -R "$SRC" "$dest"; echo "copied   $dest"; fi
done
