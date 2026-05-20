#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "→ Preview deploy…"
vercel --yes

echo ""
echo "→ Production deploy…"
vercel --prod --yes

echo ""
echo "Done. Open the Production URL above."
