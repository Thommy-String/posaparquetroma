#!/usr/bin/env bash
set -euo pipefail

OUTDIR="dist"
SRC="$OUTDIR/index.html"

ROUTES=(
  "servizi/posa-parquet-prefinito-roma"
  "servizi/posa-parquet-prefinito-flottante-roma"
  "servizi/posa-parquet-prefinito-spina-roma"
  "servizi/posa-pavimento-spc-roma"
  "servizi/posa-pavimento-laminato-roma"
  "servizi/posa-battiscopa-roma"
  "servizi/rivestimento-scale-roma"
)

for r in "${ROUTES[@]}"; do
  mkdir -p "$OUTDIR/$r"
  cp "$SRC" "$OUTDIR/$r/index.html"
  echo "✅ $OUTDIR/$r/index.html creato"
done

echo "🎉 Finito. Ora carica TUTTO il contenuto di dist/ su Aruba."