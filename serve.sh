#!/usr/bin/env bash
# Лендинг Валерии — отдельный порт (8765 занят другим проектом).
PORT="${PORT:-8771}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
echo "Taplink: http://127.0.0.1:${PORT}/index.html"
exec python3 -m http.server "$PORT" --directory "$ROOT"
