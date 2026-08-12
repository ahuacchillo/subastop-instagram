#!/usr/bin/env python3
"""
Studio: from a listing code to publishable PNGs, without touching a terminal.

    ./estudio.sh                   # start a new carousel
    ./estudio.sh 62915-dfsk-glory  # reopen a finished one, to reframe it

Everything on one page: paste the listing, check the details, pick the photos
and their order, frame them. It then renders and shows the four slides.

Same pipeline as always: `scraper.py` for the details and `ajustar.sh --render`
for the PNGs. This page renders nothing of its own, so it cannot drift away
from what the terminal produces.

A stdlib server on 127.0.0.1: nothing is installed and nothing leaves the
machine, which also means no phone or other computer can reach it.
"""
import base64
import http.server
import json
import mimetypes
import os
import re
import subprocess
import sys
import threading
import unicodedata
import urllib.parse
import webbrowser

import scraper

RAIZ = os.path.dirname(os.path.abspath(__file__))
MATERIALES = os.path.join(RAIZ, "Materiales")
POSTS = os.path.join(RAIZ, "Posts")
AUTOS = os.path.join(RAIZ, "social-content", "public", "autos")
PUERTO = 4173
EXTS = (".png", ".jpg", ".jpeg")

# Starting slug, set when reopening a finished carousel.
SLUG_INICIAL = sys.argv[1].strip("/").removeprefix("Posts/") if len(sys.argv) > 1 else ""


def seguro(nombre):
    """A file name with no path in it. Nothing arriving from the browser gets
    to choose which folder is written to."""
    return os.path.basename(nombre).replace("\x00", "")


def slugificar(*partes):
    """Same slug as `nueva-subasta.sh`: code-make-model."""
    crudo = "-".join(str(p) for p in partes)
    plano = unicodedata.normalize("NFKD", crudo).encode("ascii", "ignore").decode()
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]", "-", plano.lower())).strip("-")


def listar(carpeta):
    if not os.path.isdir(carpeta):
        return []
    return sorted(f for f in os.listdir(carpeta) if f.lower().endswith(EXTS))


def normalizar(f):
    if isinstance(f, str):
        return {"src": f, "foco": "50% 50%", "escala": 1}
    return {"src": f["src"], "foco": f.get("foco", "50% 50%"),
            "escala": f.get("escala", 1)}


PAGINA = os.path.join(RAIZ, "estudio.html")
FUENTE = os.path.join(RAIZ, "social-content", "public", "brand",
                      "plus-jakarta-sans.woff2")


class Handler(http.server.BaseHTTPRequestHandler):
    # HTTP/1.1 so the browser reuses the connection. With 1.0 it opens one per
    # photo, runs out of pool around the tenth thumbnail, and the rest hang
    # forever. Every response sends Content-Length, which is what 1.1 needs in
    # order to reuse a connection.
    protocol_version = "HTTP/1.1"

    def log_message(self, *_):
        pass

    def responder(self, codigo, tipo, cuerpo):
        self.send_response(codigo)
        self.send_header("Content-Type", tipo)
        self.send_header("Content-Length", str(len(cuerpo)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(cuerpo)

    def json(self, obj):
        self.responder(200, "application/json",
                       json.dumps(obj, ensure_ascii=False).encode())

    def archivo(self, ruta, base):
        """Serve a file, always from inside `base`."""
        ruta = os.path.abspath(ruta)
        if not ruta.startswith(os.path.abspath(base) + os.sep) or not os.path.isfile(ruta):
            return self.responder(404, "text/plain", b"no existe")
        tipo = mimetypes.guess_type(ruta)[0] or "application/octet-stream"
        with open(ruta, "rb") as f:
            self.responder(200, tipo, f.read())

    # ── GET ──────────────────────────────────────────────────────────────────
    def do_GET(self):
        # unquote: WhatsApp file names carry spaces and the browser sends them
        # as %20. Without this the thumbnail comes out broken.
        ruta = urllib.parse.unquote(self.path.split("?")[0])
        if ruta == "/":
            # From disk rather than a constant: reloading the browser is all
            # it takes to see a page change, with no restart.
            with open(PAGINA, "rb") as f:
                return self.responder(200, "text/html; charset=utf8", f.read())
        if ruta == "/fuente":
            return self.archivo(FUENTE, os.path.dirname(FUENTE))
        if ruta == "/inicio":
            return self.json(self.inicio())
        if ruta.startswith("/foto/"):
            _, _, carpeta, archivo = ruta.split("/", 3)
            return self.archivo(
                os.path.join(MATERIALES, seguro(carpeta), seguro(archivo)), MATERIALES)
        if ruta.startswith("/auto/"):
            # Photos already copied into a finished carousel.
            return self.archivo(
                os.path.join(AUTOS, seguro(ruta.split("/", 2)[2])), AUTOS)
        if ruta.startswith("/post/"):
            _, _, slug, archivo = ruta.split("/", 3)
            return self.archivo(
                os.path.join(POSTS, seguro(slug), seguro(archivo)), POSTS)
        self.responder(404, "text/plain", b"no existe")

    def inicio(self):
        """State for reopening a finished carousel. Empty without an argument."""
        if not SLUG_INICIAL:
            return {"slug": ""}
        datos_json = os.path.join(POSTS, SLUG_INICIAL, "datos.json")
        if not os.path.isfile(datos_json):
            return {"slug": ""}
        d = json.load(open(datos_json, encoding="utf8"))
        codigo = SLUG_INICIAL.split("-")[0]
        codigo = codigo if codigo.isdigit() else ""

        # The photos actually used are the ones copied into public/autos, so
        # they are offered from there and not from Materiales: they are the
        # only ones that map exactly onto the saved framing. Guessing by
        # position pins the framing to the wrong photo the moment the order
        # was not 1-2-3.
        fotos, elegidas, ajustes = [], [], {}
        for f in (normalizar(x) for x in d["fotos"]):
            archivo = os.path.basename(f["src"])
            url = f"/auto/{archivo}"
            fotos.append({"archivo": archivo, "carpeta": "", "url": url})
            elegidas.append(url)
            ajustes[url] = {"foco": f["foco"], "escala": f["escala"]}

        # Plus the original folder, so a photo can still be swapped out.
        carpeta = codigo if os.path.isdir(os.path.join(MATERIALES, codigo)) else ""
        fotos += [{"archivo": f, "carpeta": carpeta, "url": f"/foto/{carpeta}/{f}"}
                  for f in listar(os.path.join(MATERIALES, carpeta))] if carpeta else []
        return {
            "slug": SLUG_INICIAL, "codigo": codigo,
            "fotos": fotos, "elegidas": elegidas, "ajustes": ajustes,
            "datos": {
                "marca": d.get("marca", ""), "modelo": d.get("modelo", ""),
                "anio": d.get("anio", ""), "transmision": d.get("transmision", ""),
                "precio": d.get("precioBase", "").replace("US$", "").strip(),
                "fecha": d.get("fecha", ""), "hora": d.get("hora", ""),
                "tienda": d.get("tienda", ""),
            },
        }

    # ── POST ─────────────────────────────────────────────────────────────────
    def do_POST(self):
        try:
            largo = int(self.headers.get("Content-Length", 0))
            cuerpo = json.loads(self.rfile.read(largo) or b"{}")
            accion = {"/oferta": self.oferta, "/subir": self.subir,
                      "/generar": self.generar}.get(self.path)
            if not accion:
                return self.responder(404, "text/plain", b"no existe")
            r = accion(cuerpo)
            r["ok"] = True
            self.json(r)
        except Exception as e:  # noqa: BLE001 - whatever fails is shown on the page
            self.json({"ok": False, "error": str(e) or type(e).__name__})

    def oferta(self, c):
        codigo = str(c.get("codigo", "")).strip().rstrip("/").rsplit("/", 1)[-1]
        if not codigo.isdigit():
            raise ValueError("Eso no parece un código de oferta ni un link.")
        datos, urls = scraper.leer(codigo)
        carpeta = os.path.join(MATERIALES, codigo)
        scraper.bajar(urls, carpeta)
        return {
            "codigo": codigo, "carpeta": codigo,
            "fotos": [{"archivo": f, "carpeta": codigo,
                       "url": f"/foto/{codigo}/{f}"}
                      for f in listar(carpeta)],
            "datos": {
                "marca": datos.get("MARCA", ""), "modelo": datos.get("MODELO", ""),
                "anio": datos.get("ANIO", "") or "25'",
                "transmision": datos.get("TRANSMISION", "") or "Mecánica",
                "precio": datos.get("PRECIO", ""), "fecha": datos.get("FECHA", ""),
                "hora": datos.get("HORA", ""), "tienda": datos.get("TIENDA", ""),
            },
        }

    def subir(self, c):
        # With no code the photos get their own folder, so they never mix with
        # a listing they do not belong to.
        carpeta = seguro(str(c.get("codigo") or "").strip()) or "subidas"
        destino = os.path.join(MATERIALES, carpeta)
        os.makedirs(destino, exist_ok=True)
        nombre = seguro(c["nombre"])
        if not nombre.lower().endswith(EXTS):
            raise ValueError(f"{nombre}: solo PNG o JPG.")
        with open(os.path.join(destino, nombre), "wb") as f:
            f.write(base64.b64decode(c["datos"]))
        return {"foto": {"archivo": nombre, "carpeta": carpeta,
                         "url": f"/foto/{carpeta}/{nombre}"}}

    def generar(self, c):
        d, fotos = c["datos"], c["fotos"]
        if not fotos:
            raise ValueError("No hay fotos elegidas.")
        faltan = [k for k in ("marca", "modelo", "anio", "transmision", "precio",
                              "fecha", "hora", "tienda") if not d.get(k, "").strip()]
        if faltan:
            raise ValueError("Faltan datos: " + ", ".join(faltan))

        slug = slugificar(c.get("codigo", ""), d["marca"], d["modelo"])
        os.makedirs(AUTOS, exist_ok=True)
        os.makedirs(os.path.join(POSTS, slug), exist_ok=True)

        # Read EVERYTHING before writing anything: when a carousel is reopened
        # the source and the destination are the same folder, and reordering
        # would overwrite a photo that has not been read yet.
        crudo = []
        for f in fotos:
            archivo, carpeta = seguro(f["archivo"]), seguro(f.get("carpeta") or "")
            base = os.path.join(MATERIALES, carpeta) if carpeta else AUTOS
            with open(os.path.join(base, archivo), "rb") as a:
                crudo.append((os.path.splitext(archivo)[1].lower(), a.read()))

        # Stable names prefixed by the slug, same as the script, so two
        # auctions cannot collide inside public/.
        salida = []
        for n, (f, (ext, contenido)) in enumerate(zip(fotos, crudo), 1):
            with open(os.path.join(AUTOS, f"{slug}-{n}{ext}"), "wb") as b:
                b.write(contenido)
            entrada = {"src": f"autos/{slug}-{n}{ext}"}
            if f.get("foco", "50% 50%") != "50% 50%" or float(f.get("escala", 1)) != 1:
                entrada.update(foco=f["foco"], escala=float(f["escala"]))
                salida.append(entrada)
            else:
                salida.append(entrada["src"])

        with open(os.path.join(POSTS, slug, "datos.json"), "w", encoding="utf8") as f:
            json.dump({
                "marca": d["marca"], "modelo": d["modelo"], "anio": d["anio"],
                "transmision": d["transmision"], "precioBase": "US$ " + d["precio"],
                "fecha": d["fecha"], "hora": d["hora"], "tienda": d["tienda"],
                "fotos": salida,
            }, f, ensure_ascii=False, indent=2)

        r = subprocess.run([os.path.join(RAIZ, "ajustar.sh"), slug, "--render"],
                           capture_output=True, text=True)
        if r.returncode != 0:
            raise RuntimeError((r.stderr or r.stdout).strip()[-300:])
        print(f"  ✓ Posts/{slug}/", flush=True)
        pngs = sorted(f for f in os.listdir(os.path.join(POSTS, slug))
                      if f.endswith(".png"))
        # The ?v= keeps the browser from serving the previous render from cache.
        import time as _t
        v = int(_t.time())
        return {"slug": slug, "slides": [f"/post/{slug}/{p}?v={v}" for p in pngs]}


if __name__ == "__main__":
    servidor = http.server.ThreadingHTTPServer(("127.0.0.1", PUERTO), Handler)
    url = f"http://127.0.0.1:{PUERTO}/"
    print(f"Estudio → {url}")
    print("Ctrl-C para cerrar.", flush=True)
    threading.Timer(0.5, lambda: webbrowser.open(url)).start()
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print()
