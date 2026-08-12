#!/usr/bin/env bash
#
# Ajusta el encuadre de un carrusel, o lo rehace desde su `datos.json`.
#
#   ./ajustar.sh 62915-dfsk-glory            # abre la página de encuadre
#   ./ajustar.sh 62915-dfsk-glory --render   # rehace los PNG desde datos.json
#
# Sin bandera abre `encuadre.py` en el navegador: arrastrás la foto, rueda para
# acercar, y el botón guarda y renderiza. Eso escribe en el datos.json:
#
#   "fotos": [
#     { "src": "autos/x-1.jpeg", "foco": "50% 35%", "escala": 1.2 },
#     "autos/x-2.jpeg"          ← string suelto = centrado, sin zoom
#   ]
#
# `nueva-subasta.sh` termina llamando acá: hay un solo camino de render, y por
# eso la placa de cierre y el soporte de encuadre viven en un solo lugar.
#
set -euo pipefail
cd "$(dirname "$0")"

RAIZ="$PWD"
SLUG="${1:-}"
MODO="${2:-}"
[ -n "$SLUG" ] || { echo "Uso: $(basename "$0") <slug-de-Posts> [--render]" >&2; exit 1; }

# Se acepta tanto el slug como la ruta entera: `Posts/x` y `Posts/x/` también.
SLUG="${SLUG#Posts/}"; SLUG="${SLUG%/}"
DATOS="$RAIZ/Posts/$SLUG/datos.json"
[ -f "$DATOS" ] || { echo "No existe $DATOS." >&2; exit 1; }

if [ "$MODO" != "--render" ]; then
  exec python3 "$RAIZ/estudio.py" "$SLUG"
fi

# ── Render ───────────────────────────────────────────────────────────────────
# Un JSON de props por slide. Se arma con python y no con un heredoc porque los
# valores traen apóstrofes (25') y acentos, y ahí un heredoc se rompe callado.
PROPS="$(mktemp -d)"
trap 'rm -rf "$PROPS"' EXIT
SLIDES="$(DATOS="$DATOS" DESTINO="$PROPS" python3 - <<'PY'
import json, os
datos = json.load(open(os.environ["DATOS"]))
for i in range(len(datos["fotos"])):
    with open(f"{os.environ['DESTINO']}/{i}.json", "w") as f:
        json.dump({"s": datos, "indice": i}, f, ensure_ascii=False)
print(len(datos["fotos"]))
PY
)"

echo
echo "── Renderizando $SLIDES slides ───────────────────────────────"
# ponytail: un bundle por slide (~13s cada uno). Si molesta, se cambia a la API
# de Node (@remotion/renderer), que bundlea una vez sola.
cd social-content
for i in $(seq 0 $((SLIDES - 1))); do
  npx remotion still Auto \
    --props="$PROPS/$i.json" \
    --output="$RAIZ/Posts/$SLUG/$((i + 1)).png" \
    --overwrite --log=error
  echo "  ✓ Posts/$SLUG/$((i + 1)).png"
done

# ── Placa de cierre ──────────────────────────────────────────────────────────
# Va siempre al final y va tal cual: no pasa por Remotion, no lleva datos del
# auto, no cambia nunca. Si falta, el carrusel ya renderizado no se pierde.
CIERRE="$RAIZ/Materiales/cierre.png"
if [ -f "$CIERRE" ]; then
  cp "$CIERRE" "$RAIZ/Posts/$SLUG/$((SLIDES + 1)).png"
  echo "  ✓ Posts/$SLUG/$((SLIDES + 1)).png  (placa de cierre)"
else
  echo "  ⚠ Falta Materiales/cierre.png: el carrusel quedó sin placa final." >&2
fi

echo
echo "Listo → $RAIZ/Posts/$SLUG/"
echo "Míralos antes de publicar: que el título no se pierda contra el cielo y"
echo "que el precio no reviente la tarjeta."
