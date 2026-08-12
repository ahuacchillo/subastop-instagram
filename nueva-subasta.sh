#!/usr/bin/env bash
#
# Arma un carrusel de subasta completo: pregunta los datos, toma las fotos de
# Materiales/ y deja los PNG listos para publicar en Posts/<slug>/.
#
# No edita código. Los datos van a Remotion por --props, así que este script y
# el proyecto son independientes: se puede correr dos veces seguidas con autos
# distintos sin que quede nada pegado.
#
#   ./nueva-subasta.sh 62996                # de la URL a los PNG, sin preguntar
#   ./nueva-subasta.sh https://www.vmcsubastas.com/oferta/62996
#   ./nueva-subasta.sh 62996 --editar       # igual, pero revisando cada dato
#   ./nueva-subasta.sh Materiales/toyota    # fotos propias, sin scraping
#   ./nueva-subasta.sh                      # fotos sueltas en Materiales/
#
# Con URL no pregunta nada: lo que sale del sitio se da por bueno y se
# renderiza. Lo único que hay que mirar son los PNG del final.
#
set -euo pipefail
cd "$(dirname "$0")"

RAIZ="$PWD"
AUTOS="$RAIZ/social-content/public/autos"
ORIGEN="Materiales"
EDITAR=""
FOTOS_PROPIAS=""
while [ $# -gt 0 ]; do
  case "$1" in
    --editar|-e) EDITAR=1 ;;
    # Datos del sitio, fotos mías: para cuando la galería de la oferta es mala
    # o tengo fotos mejores del patio.
    --fotos|-f) FOTOS_PROPIAS="${2:?--fotos necesita una carpeta}"; shift ;;
    *) ORIGEN="$1" ;;
  esac
  shift
done
[ -z "$FOTOS_PROPIAS" ] || [ -d "$FOTOS_PROPIAS" ] || {
  echo "No existe la carpeta de fotos '$FOTOS_PROPIAS'." >&2; exit 1; }

# ── Scraping de la oferta ────────────────────────────────────────────────────
# La página de vmcsubastas viene renderizada del servidor: los datos y las
# fotos están en el HTML, no hace falta navegador. Lo que sale de acá son solo
# los valores por defecto de las preguntas: todo se puede corregir a mano.
MARCA=""; MODELO=""; ANIO="25'"; TRANSMISION="Mecánica"; PRECIO=""
FECHA=""; HORA=""; TIENDA=""; OFERTA=""
if [[ "$ORIGEN" =~ ^https?://|^[0-9]+$ ]]; then
  ID="${ORIGEN##*/}"
  OFERTA="$ID"
  # Las fotos se guardan por código: es el único nombre que no cambia si
  # después corrijo la marca o el modelo, y así no se rebajan dos veces.
  # Con --fotos no se baja ninguna: la galería solo sirve para confirmar que la
  # página que contestó es la oferta y no la portada del sitio.
  if [ -n "$FOTOS_PROPIAS" ]; then
    ORIGEN="$FOTOS_PROPIAS"
    DESTINO=""
  else
    ORIGEN="Materiales/$ID"
    mkdir -p "$ORIGEN"
    DESTINO="$ORIGEN"
  fi
  # ${DESTINO:+…} desaparece entero cuando está vacío: con --fotos el scraper
  # no recibe carpeta y por lo tanto no baja nada.
  SCRAPE="$(python3 "$RAIZ/scraper.py" "$ID" ${DESTINO:+"$DESTINO"})"
  while IFS=$'\t' read -r clave valor; do
    printf -v "$clave" '%s' "$valor"
  done <<< "$SCRAPE"
fi

[ -d "$ORIGEN" ] || { echo "No existe la carpeta '$ORIGEN'." >&2; exit 1; }

# ── Datos ────────────────────────────────────────────────────────────────────
# Enter acepta el valor entre corchetes. Si el dato ya vino del scraping no se
# pregunta nada: el sitio es la fuente. Con --editar se revisan todos, y lo que
# el scraping no encontró se pregunta siempre.
preguntar() { # preguntar VARIABLE "Texto" ["default"]
  local resp
  if [ -z "$EDITAR" ] && [ -n "$OFERTA" ] && [ -n "${3:-}" ]; then
    printf -v "$1" '%s' "$3"
    printf "  %-32s %s\n" "$2:" "$3"
    return
  fi
  read -r -p "  $2${3:+ [$3]}: " resp
  resp="${resp:-${3:-}}"
  [ -n "$resp" ] || { echo "  ↳ hace falta un valor." >&2; preguntar "$1" "$2" "${3:-}"; return; }
  printf -v "$1" '%s' "$resp"
}

echo
echo "── Datos del auto ─────────────────────────────────────────"
preguntar MARCA       "Marca (título con degradado)"   "$MARCA"
preguntar MODELO      "Modelo (va encima, en blanco)"  "$MODELO"
preguntar ANIO        "Año corto"                      "$ANIO"
preguntar TRANSMISION "Transmisión"                    "$TRANSMISION"
preguntar PRECIO      "Precio base (sin US\$)"         "$PRECIO"
echo
echo "── Subasta ────────────────────────────────────────────────"
preguntar FECHA       "Fecha (dd/mm)"                  "$FECHA"
preguntar HORA        "Hora"                           "$HORA"
preguntar TIENDA      "Tienda oficial"                 "$TIENDA"

# ── Fotos ────────────────────────────────────────────────────────────────────
mapfile -t DISPONIBLES < <(
  find "$ORIGEN" -maxdepth 1 -type f \
    \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) | sort
)
[ "${#DISPONIBLES[@]}" -gt 0 ] || { echo "No hay fotos en $ORIGEN/." >&2; exit 1; }

echo
echo "── Fotos en $ORIGEN/ ──────────────────────────────────────"
for i in "${!DISPONIBLES[@]}"; do
  printf "  %d) %s\n" "$((i + 1))" "$(basename "${DISPONIBLES[$i]}")"
done
echo
echo "  El primero es la portada: es el único slide que lleva marca y modelo."
# El carrusel es de 3: si sobran fotos en la carpeta, se ignoran las demás.
TODAS="$(seq -s' ' 1 "$(( ${#DISPONIBLES[@]} < 3 ? ${#DISPONIBLES[@]} : 3 ))")"
ORDEN=""
if [ -z "$EDITAR" ] && [ -n "$OFERTA" ] && [ -z "$FOTOS_PROPIAS" ]; then
  # Las del sitio ya vienen en el orden de la galería: se usan tal cual. Las
  # mías no: si las elegí a mano, la portada es una decisión y se pregunta.
  ORDEN="$TODAS"
else
  while [ -z "$ORDEN" ]; do
    read -r -p "  Orden del carrusel (3 slides) [$TODAS]: " ORDEN
    ORDEN="$(echo "${ORDEN:-$TODAS}" | cut -d' ' -f1-3)"
    malo=""
    for idx in $ORDEN; do
      case "$idx" in
        ''|*[!0-9]*) malo="$idx" ;;
        *) [ "$idx" -ge 1 ] && [ "$idx" -le "${#DISPONIBLES[@]}" ] || malo="$idx" ;;
      esac
    done
    [ -z "$malo" ] || {
      echo "  ↳ '$malo' no está en la lista. Números del 1 al ${#DISPONIBLES[@]}, separados por espacio."
      ORDEN=""
    }
  done
fi

# Quien escribe "3" está eligiendo la portada, no pidiendo un carrusel de un
# solo slide: se completa con las que falten, en el orden del listado.
# ponytail: por lo mismo ya no se puede renderizar un subconjunto a propósito.
# Si algún día hace falta, es una bandera --slides, no otro prompt.
for idx in $(seq 1 "${#DISPONIBLES[@]}"); do
  case " $ORDEN " in *" $idx "*) ;; *) ORDEN="$ORDEN $idx" ;; esac
done
ORDEN="$(echo $ORDEN | cut -d' ' -f1-3)"
echo "  Carrusel: $ORDEN"

# ── Copiar fotos con nombre estable ──────────────────────────────────────────
# El slug prefija los archivos para que dos subastas no se pisen en public/.
# Va el código de oferta adelante: dos Fortuner distintos se distinguen, y el
# número es el que se busca cuando hay que volver a la publicación original.
SLUG="$(printf '%s-%s-%s' "$OFERTA" "$MARCA" "$MODELO" \
  | iconv -f utf8 -t ascii//TRANSLIT \
  | tr '[:upper:]' '[:lower:]' \
  | tr -cs 'a-z0-9' '-' \
  | sed 's/^-//; s/-$//')"

mkdir -p "$AUTOS" "$RAIZ/Posts/$SLUG"
FOTOS=()
n=0
for idx in $ORDEN; do
  origen="${DISPONIBLES[$((idx - 1))]}"
  ext="${origen##*.}"
  n=$((n + 1))
  destino="$AUTOS/$SLUG-$n.${ext,,}"
  cp "$origen" "$destino"
  FOTOS+=("autos/$SLUG-$n.${ext,,}")
done

# ── datos.json ───────────────────────────────────────────────────────────────
# Se arma con python y no con un heredoc porque los valores traen apóstrofes
# (25') y acentos, y ahí un heredoc se rompe callado. Queda junto a los renders:
# la pieza se puede rehacer igual dentro de un año.
MARCA="$MARCA" MODELO="$MODELO" ANIO="$ANIO" TRANSMISION="$TRANSMISION" \
PRECIO="$PRECIO" FECHA="$FECHA" HORA="$HORA" TIENDA="$TIENDA" \
FOTOS="${FOTOS[*]}" SALIDA="$RAIZ/Posts/$SLUG" \
python3 - <<'PY'
import json, os
e = os.environ
s = {
    "marca": e["MARCA"], "modelo": e["MODELO"], "anio": e["ANIO"],
    "transmision": e["TRANSMISION"], "precioBase": "US$ " + e["PRECIO"],
    "fecha": e["FECHA"], "hora": e["HORA"], "tienda": e["TIENDA"],
    "fotos": e["FOTOS"].split(),
}
with open(f"{e['SALIDA']}/datos.json", "w") as f:
    json.dump(s, f, ensure_ascii=False, indent=2)
PY

# ── Render ───────────────────────────────────────────────────────────────────
# Renderiza `ajustar.sh`: un solo camino, así la placa de cierre y el soporte de
# encuadre no viven en dos lugares que se desincronizan.
exec "$RAIZ/ajustar.sh" "$SLUG" --render
