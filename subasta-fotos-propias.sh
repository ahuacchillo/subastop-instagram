#!/usr/bin/env bash
#
# Los datos salen de la oferta, las fotos las pongo yo.
#
# Igual que `nueva-subasta.sh <código>` pero sin bajar la galería del sitio:
# marca, modelo, año, transmisión, precio, fecha, hora y tienda se leen de
# vmcsubastas.com, y el carrusel se arma con las fotos de la carpeta que le
# pases. Para cuando las fotos de la oferta son malas o tengo mejores.
#
#   ./subasta-fotos-propias.sh 62996 Materiales/toyota
#   ./subasta-fotos-propias.sh https://www.vmcsubastas.com/oferta/62996 fotos/
#
# Pregunta el orden del carrusel: si elegiste las fotos a mano, cuál va de
# portada es una decisión tuya, no del sitio. Con --editar además revisa cada
# dato scrapeado.
#
set -euo pipefail

[ $# -ge 2 ] || {
  echo "Uso: $(basename "$0") <código-o-URL> <carpeta-de-fotos> [--editar]" >&2
  exit 1
}

OFERTA="$1"; CARPETA="$2"; shift 2
exec "$(dirname "$0")/nueva-subasta.sh" "$OFERTA" --fotos "$CARPETA" "$@"
