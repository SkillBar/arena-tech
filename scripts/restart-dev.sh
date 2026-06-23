#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-3002}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Stopping processes on port ${PORT}..."
PIDS=$(lsof -ti ":${PORT}" 2>/dev/null || true)
if [ -n "${PIDS}" ]; then
  kill -9 ${PIDS} 2>/dev/null || true
  sleep 2
fi

if lsof -ti ":${PORT}" >/dev/null 2>&1; then
  echo "Port ${PORT} is still in use. Stop the process manually and retry."
  exit 1
fi

echo "Starting dev server in ${ROOT} on port ${PORT}..."
cd "${ROOT}"
exec pnpm dev -p "${PORT}"
