#!/usr/bin/env python3
"""
Lee una oferta de vmcsubastas.com: los datos del auto y las fotos de la galería.

La página viene renderizada del servidor, así que todo está en el HTML y no hace
falta navegador. Lo que sale de acá son valores por defecto: todo se puede
corregir después, ni el script ni la app dan el scraping por infalible.

Como módulo:
    import scraper
    datos, fotos = scraper.leer("62996")     # fotos = URLs, en orden de galería
    scraper.bajar(fotos, "Materiales/62996") # las guarda numeradas

Desde la terminal (lo que usa `nueva-subasta.sh`):
    python3 scraper.py 62996 [carpeta-destino]
Imprime CLAVE<tab>VALOR por línea, solo de lo que encontró: así el default de
quien llama sobrevive.
"""
import os
import re
import sys
import time
import urllib.request as U
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

CLAVES = ("MARCA", "MODELO", "ANIO", "TRANSMISION", "PRECIO", "TIENDA",
          "FECHA", "HORA")


def _bajar(url):
    return U.urlopen(
        U.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read()


def leer(oferta, intentos=3):
    """Devuelve (datos, fotos). `oferta` puede ser el código o la URL entera."""
    ident = str(oferta).rstrip("/").rsplit("/", 1)[-1]

    # A veces el sitio contesta con la portada en vez de la oferta. Se nota en
    # que no hay galería; se reintenta antes de seguir con datos inventados.
    for intento in range(intentos):
        html = _bajar(f"https://www.vmcsubastas.com/oferta/{ident}").decode(
            "utf8", "replace")
        # El carrusel es de 3 slides: de la galería solo interesan las primeras.
        fotos = list(dict.fromkeys(
            re.findall(r'\\"image\\":\\"(https://[^\\]+?\.jpe?g)', html)))[:8]
        if fotos:
            break
        time.sleep(2)
    else:
        raise LookupError(f"La oferta {ident} no trajo fotos. "
                          "¿El código es correcto?")

    def uno(patron):
        m = re.search(patron, html, re.S)
        return m.group(1).strip() if m else ""

    # "Toyota Fortuner 2023" → marca / modelo / 23'
    titulo = uno(r"<h1[^>]*>([^<]+)</h1>").split()
    anio = titulo.pop() if titulo and titulo[-1].isdigit() else ""
    datos = {
        "MARCA": titulo[0] if titulo else "",
        "MODELO": " ".join(titulo[1:]),
        "ANIO": anio[2:] + "'" if anio else "",
        "TRANSMISION": uno(r"Transmisión.{0,80}?<span[^>]*>([^<]+)</span>"),
        # Del payload y no del HTML pintado: en las ofertas que ya cerraron o
        # que son negociables la tarjeta del precio no viene renderizada.
        "PRECIO": uno(r'basePriceLabel\\":\\"US\$\s*([\d.,]+)'),
        "TIENDA": uno(r"Vendedor:\s*([^<]+)<"),
    }
    cuando = uno(r'processDatetime\\":\\"([^\\]+)')
    if cuando:
        d = datetime.strptime(cuando, "%Y-%m-%d %H:%M:%S")
        datos["FECHA"] = d.strftime("%d/%m")
        datos["HORA"] = d.strftime("%I:%M %p").lstrip("0").lower()
    return datos, fotos


def bajar(fotos, destino):
    """Guarda las fotos numeradas. El orden de la galería importa: se numeran
    para que un `sort` posterior no lo revuelva. Las que ya están no se
    vuelven a bajar. Devuelve las rutas."""
    os.makedirs(destino, exist_ok=True)
    rutas = [os.path.join(destino, f"{i:02d}.jpeg")
             for i in range(1, len(fotos) + 1)]

    def guardar(par):
        ruta, url = par
        if not os.path.exists(ruta):
            with open(ruta, "wb") as f:
                f.write(_bajar(url))

    with ThreadPoolExecutor(8) as pool:
        list(pool.map(guardar, zip(rutas, fotos)))
    return rutas


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("Uso: scraper.py <código-o-URL> [carpeta-destino]")
    ident = sys.argv[1]
    print(f"Leyendo oferta {ident}…", file=sys.stderr)
    try:
        datos, fotos = leer(ident)
    except LookupError as e:
        sys.exit(str(e))

    if len(sys.argv) > 2:
        destino = sys.argv[2]
        # El carrusel de la terminal es de 3; la app usa más y elige después.
        bajar(fotos[:3], destino)
        print(f"{len(fotos[:3])} fotos en {destino}/", file=sys.stderr)

    # Lo que no se encontró no se imprime: así el default de quien llama vive.
    for clave in CLAVES:
        if datos.get(clave):
            print(f"{clave}\t{datos[clave]}")
