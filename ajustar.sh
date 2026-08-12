#!/usr/bin/env bash
#
# Renderiza un carrusel desde su `datos.json`, o abre el Studio para ajustarlo.
#
#   ./ajustar.sh 62915-dfsk-glory            # abre el Studio con esa subasta
#   ./ajustar.sh 62915-dfsk-glory --render   # rehace los PNG desde datos.json
#
# El bucle de encuadre es: abrir el Studio, mover `foco` y `escala` en el panel
# de props hasta que el auto quede bien, copiar esos dos valores al datos.json,
# y volver con --render. El Studio muestra el render real, no una maqueta: lo
# que ves ahí es lo que sale en el PNG.
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
  # El Studio abre en el slide 0; para ver los otros se cambia `indice` en el
  # panel de props, igual que siempre.
  PROPS="$(mktemp --suffix=.json)"
  DATOS="$DATOS" SALIDA="$PROPS" python3 - <<'PY'
import json, os
datos = json.load(open(os.environ["DATOS"]))
json.dump({"s": datos, "indice": 0}, open(os.environ["SALIDA"], "w"))
PY
  echo "Studio con $SLUG. Ctrl-C para salir."
  echo "Ajustá 'foco' y 'escala' en el panel de props, y pasalos a:"
  echo "  Posts/$SLUG/datos.json"
  cd social-content
  exec npx remotion studio --props="$PROPS"
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
