#!/usr/bin/env python3
"""
Página de encuadre: arrastrar la foto, rueda para acercar, guardar.

Se abre desde `./ajustar.sh <slug>`. Lo único que ajusta es qué parte de la foto
entra en el 1080×1080 — el recorte, que es lo que la terminal no puede decidir.
Los datos del auto no se tocan acá: para eso está `--editar` del script.

El marco dibuja dónde caen el header, el título, la píldora, la tarjeta y el
logo. Son guías, no el render: sirven para ver qué le tapan al auto. El render
de verdad sale al guardar, del mismo `ajustar.sh --render` de siempre.

Servidor de la stdlib, en 127.0.0.1: no se instala nada y no sale de la máquina.
"""
import http.server
import json
import mimetypes
import os
import subprocess
import sys
import threading
import webbrowser

RAIZ = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(RAIZ, "social-content", "public")
PUERTO = 4173

SLUG = sys.argv[1] if len(sys.argv) > 1 else ""
DATOS = os.path.join(RAIZ, "Posts", SLUG, "datos.json")
if not os.path.isfile(DATOS):
    sys.exit(f"No existe {DATOS}.")


def normalizar(f):
    """Un string suelto es una foto centrada sin zoom. Adentro se trabaja
    siempre con la forma larga; al guardar se vuelve a acortar."""
    if isinstance(f, str):
        return {"src": f, "foco": "50% 50%", "escala": 1}
    return {
        "src": f["src"],
        "foco": f.get("foco", "50% 50%"),
        "escala": f.get("escala", 1),
    }


def leer():
    d = json.load(open(DATOS, encoding="utf8"))
    d["fotos"] = [normalizar(f) for f in d["fotos"]]
    return d


PAGINA = r"""<!doctype html>
<meta charset="utf8">
<title>Encuadre</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; background: #14111c; color: #e8e4f0;
    font: 15px/1.5 system-ui, sans-serif;
    display: flex; flex-direction: column; align-items: center; gap: 18px;
    padding: 24px 16px 40px;
  }
  h1 { font-size: 18px; font-weight: 600; margin: 0; }
  h1 small { color: #8a82a8; font-weight: 400; }
  .slides { display: flex; gap: 8px; }
  .slides button {
    width: 40px; height: 40px; border-radius: 10px; cursor: pointer;
    border: 1px solid #3a3350; background: #221d33; color: #cfc7e6;
    font: 600 15px system-ui;
  }
  .slides button.on { background: #8460E5; border-color: #8460E5; color: #fff; }

  /* El marco es cuadrado y se achica solo: adentro todo va en % de 1080. */
  #marco {
    position: relative; width: min(78vw, 560px); aspect-ratio: 1;
    overflow: hidden; border-radius: 12px; background: #000;
    cursor: grab; touch-action: none; user-select: none;
    box-shadow: 0 12px 40px rgba(0,0,0,.5);
  }
  #marco.arrastrando { cursor: grabbing; }
  #foto { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }

  .guia {
    position: absolute; border: 1px dashed rgba(255,255,255,.55);
    background: rgba(0,0,0,.34); border-radius: 6px; pointer-events: none;
    font: 500 11px/1 system-ui; color: rgba(255,255,255,.85);
    display: flex; align-items: center; justify-content: center; text-align: center;
  }
  .guia.redonda { border-radius: 50%; }

  .barra { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; justify-content: center; }
  .barra label { color: #8a82a8; font-size: 13px; }
  input[type=range] { width: 190px; accent-color: #8460E5; }
  button.accion {
    border: 0; border-radius: 10px; padding: 11px 20px; cursor: pointer;
    font: 600 15px system-ui; background: #8460E5; color: #fff;
  }
  button.accion:disabled { opacity: .5; cursor: default; }
  button.suave { background: #2b2440; color: #cfc7e6; }
  #estado { min-height: 22px; color: #8a82a8; font-size: 14px; }
  #estado.ok { color: #6ee7b7; }
  #estado.mal { color: #fca5a5; }
  code { color: #cfc7e6; background: #221d33; padding: 2px 6px; border-radius: 5px; }
</style>

<h1>Encuadre <small id="titulo"></small></h1>
<div class="slides" id="slides"></div>

<div id="marco">
  <img id="foto" alt="">
</div>

<div class="barra">
  <label>zoom</label>
  <input type="range" id="zoom" min="1" max="3" step="0.02" value="1">
  <span id="zoomTxt">1.00×</span>
  <button class="accion suave" id="reset">Centrar</button>
</div>

<div class="barra">
  <button class="accion" id="guardar">Guardar y renderizar</button>
</div>
<div id="estado">Arrastrá la foto para moverla. Rueda del mouse para acercar.</div>

<script>
// Las guías son las coordenadas reales del diseño, en el frame de 1080×1080.
// Si el diseño se mueve en Figma, se mueven acá.
const GUIAS = [
  { x: 45,     y: 49,     w: 372,    h: 104,    txt: "tienda" },
  { x: 600,    y: 42,     w: 409.56, h: 188,    txt: "marca y modelo", soloPortada: true },
  { x: 45.19,  y: 515.22, w: 92.386, h: 92.386, txt: "‹", redonda: true, soloDesde: 1 },
  { x: 942.42, y: 515.22, w: 92.386, h: 92.386, txt: "›", redonda: true, hastaAnteultima: true },
  { x: 45,     y: 778.25, w: 353,    h: 51,     txt: "fecha" },
  { x: 45,     y: 845,    w: 466,    h: 176,    txt: "datos del auto" },
  { x: 855.29, y: 952.32, w: 179.51, h: 66.69,  txt: "vmc" },
];

const marco = document.getElementById("marco");
const foto = document.getElementById("foto");
const zoom = document.getElementById("zoom");
const zoomTxt = document.getElementById("zoomTxt");
const estado = document.getElementById("estado");
const guardar = document.getElementById("guardar");

let datos = null, i = 0;

const pct = (s) => s.split(" ").map((v) => parseFloat(v));

function pintarGuias() {
  document.querySelectorAll(".guia").forEach((g) => g.remove());
  const ultima = datos.fotos.length - 1;
  for (const g of GUIAS) {
    if (g.soloPortada && i !== 0) continue;
    if (g.soloDesde !== undefined && i < g.soloDesde) continue;
    if (g.hastaAnteultima && i >= ultima) continue;
    const d = document.createElement("div");
    d.className = "guia" + (g.redonda ? " redonda" : "");
    d.style.left = (g.x / 1080 * 100) + "%";
    d.style.top = (g.y / 1080 * 100) + "%";
    d.style.width = (g.w / 1080 * 100) + "%";
    d.style.height = (g.h / 1080 * 100) + "%";
    d.textContent = g.txt;
    marco.appendChild(d);
  }
}

// pintar() corre en cada movimiento del mouse, así que el src solo se toca
// cuando de verdad cambia: si no, el navegador recarga la foto entera mientras
// arrastrás y parpadea.
let srcPintado = null;

function pintar() {
  const f = datos.fotos[i];
  const src = "/foto/" + i;
  if (srcPintado !== src) {
    foto.src = src;
    srcPintado = src;
  }
  foto.style.objectPosition = f.foco;
  // Igual que el componente: sin zoom no se emite transform.
  if (f.escala === 1) {
    foto.style.transform = "";
    foto.style.transformOrigin = "";
  } else {
    foto.style.transform = "scale(" + f.escala + ")";
    foto.style.transformOrigin = f.foco;
  }
  zoom.value = f.escala;
  zoomTxt.textContent = Number(f.escala).toFixed(2) + "×";
  document.querySelectorAll(".slides button").forEach((b, n) =>
    b.classList.toggle("on", n === i));
  pintarGuias();
}

// Cuánto se puede recorrer en cada eje. Dos fuentes que se suman:
//   - lo que sobra de la foto al recortarla en cuadrado (una foto apaisada
//     sobra a los lados y nada arriba: ahí el arrastre vertical no hace nada);
//   - lo que agrega el zoom, que sobra en los dos ejes por igual.
// Si el total es 0 en un eje, arrastrar en ese eje no mueve nada, y así debe
// ser: no hay foto escondida para revelar.
function recorrido() {
  const lado = marco.clientWidth;
  const w = foto.naturalWidth, h = foto.naturalHeight;
  if (!w || !h) return { x: 0, y: 0 };
  const cubrir = Math.max(lado / w, lado / h);
  const extra = lado * (datos.fotos[i].escala - 1);
  return { x: w * cubrir - lado + extra, y: h * cubrir - lado + extra };
}

let arrastre = null;
marco.addEventListener("pointerdown", (e) => {
  const f = datos.fotos[i];
  arrastre = { x: e.clientX, y: e.clientY, foco: pct(f.foco), rango: recorrido() };
  marco.setPointerCapture(e.pointerId);
  marco.classList.add("arrastrando");
});
marco.addEventListener("pointermove", (e) => {
  if (!arrastre) return;
  const f = datos.fotos[i];
  // El zoom amplifica el movimiento en pantalla, así que se divide por él.
  const dx = (e.clientX - arrastre.x) / f.escala;
  const dy = (e.clientY - arrastre.y) / f.escala;
  const cerca = (v, min, max) => Math.min(max, Math.max(min, v));
  const px = arrastre.rango.x ? cerca(arrastre.foco[0] - dx / arrastre.rango.x * 100, 0, 100) : arrastre.foco[0];
  const py = arrastre.rango.y ? cerca(arrastre.foco[1] - dy / arrastre.rango.y * 100, 0, 100) : arrastre.foco[1];
  f.foco = px.toFixed(1) + "% " + py.toFixed(1) + "%";
  pintar();
});
const soltar = () => { arrastre = null; marco.classList.remove("arrastrando"); };
marco.addEventListener("pointerup", soltar);
marco.addEventListener("pointercancel", soltar);

marco.addEventListener("wheel", (e) => {
  e.preventDefault();
  const f = datos.fotos[i];
  f.escala = Math.min(3, Math.max(1, +(f.escala - e.deltaY * 0.0015).toFixed(3)));
  pintar();
}, { passive: false });

zoom.oninput = () => { datos.fotos[i].escala = +zoom.value; pintar(); };
document.getElementById("reset").onclick = () => {
  datos.fotos[i].foco = "50% 50%";
  datos.fotos[i].escala = 1;
  pintar();
};

guardar.onclick = async () => {
  guardar.disabled = true;
  estado.className = "";
  estado.textContent = "Renderizando… (unos segundos por slide)";
  try {
    const r = await fetch("/guardar", {
      method: "POST",
      body: JSON.stringify(datos.fotos.map((f) => ({ foco: f.foco, escala: f.escala }))),
    });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "falló el render");
    estado.className = "ok";
    estado.textContent = "Listo. Los PNG están en Posts/" + datos.slug + "/";
  } catch (e) {
    estado.className = "mal";
    estado.textContent = "No se pudo: " + e.message;
  }
  guardar.disabled = false;
};

fetch("/datos").then((r) => r.json()).then((d) => {
  datos = d;
  document.getElementById("titulo").textContent =
    "· " + d.marca + " " + d.modelo + " · " + d.slug;
  const cont = document.getElementById("slides");
  d.fotos.forEach((_, n) => {
    const b = document.createElement("button");
    b.textContent = n + 1;
    b.onclick = () => { i = n; pintar(); };
    cont.appendChild(b);
  });
  pintar();
});
</script>
"""


class Handler(http.server.BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass  # El log de cada request no aporta nada acá.

    def responder(self, codigo, tipo, cuerpo):
        self.send_response(codigo)
        self.send_header("Content-Type", tipo)
        self.send_header("Content-Length", str(len(cuerpo)))
        self.end_headers()
        self.wfile.write(cuerpo)

    def do_GET(self):
        ruta = self.path.split("?")[0]
        if ruta == "/":
            return self.responder(200, "text/html; charset=utf8", PAGINA.encode())
        if ruta == "/datos":
            d = leer()
            d["slug"] = SLUG
            return self.responder(
                200, "application/json", json.dumps(d).encode())
        if ruta.startswith("/foto/"):
            # Se sirve por índice y no por ruta: el navegador nunca elige qué
            # archivo se abre.
            try:
                foto = leer()["fotos"][int(ruta.rsplit("/", 1)[1])]
            except (ValueError, IndexError):
                return self.responder(404, "text/plain", b"no existe")
            archivo = os.path.join(PUBLIC, foto["src"])
            if not os.path.isfile(archivo):
                return self.responder(404, "text/plain", b"falta la foto")
            tipo = mimetypes.guess_type(archivo)[0] or "application/octet-stream"
            return self.responder(200, tipo, open(archivo, "rb").read())
        self.responder(404, "text/plain", b"no existe")

    def do_POST(self):
        if self.path != "/guardar":
            return self.responder(404, "text/plain", b"no existe")
        try:
            largo = int(self.headers.get("Content-Length", 0))
            ajustes = json.loads(self.rfile.read(largo))
            d = leer()
            if len(ajustes) != len(d["fotos"]):
                raise ValueError("llegaron ajustes para otra cantidad de fotos")
            # Lo que quedó centrado y sin zoom vuelve a ser un string suelto:
            # el datos.json no se llena de ruido por haber abierto la página.
            fotos = []
            for foto, a in zip(d["fotos"], ajustes):
                foco, escala = a["foco"], float(a["escala"])
                if foco == "50% 50%" and escala == 1:
                    fotos.append(foto["src"])
                else:
                    fotos.append(
                        {"src": foto["src"], "foco": foco, "escala": escala})
            d["fotos"] = fotos
            d.pop("slug", None)
            with open(DATOS, "w", encoding="utf8") as f:
                json.dump(d, f, ensure_ascii=False, indent=2)

            r = subprocess.run(
                [os.path.join(RAIZ, "ajustar.sh"), SLUG, "--render"],
                capture_output=True, text=True)
            if r.returncode != 0:
                raise RuntimeError((r.stderr or r.stdout).strip()[-300:])
            # flush: el stdout de un servidor va a un buffer, y sin esto la
            # terminal no muestra nada hasta que se cierra.
            print(f"  ✓ guardado y renderizado: Posts/{SLUG}/", flush=True)
            self.responder(200, "application/json", b'{"ok":true}')
        except Exception as e:  # noqa: BLE001 — lo que falle se muestra en la página
            self.responder(200, "application/json",
                           json.dumps({"ok": False, "error": str(e)}).encode())


if __name__ == "__main__":
    servidor = http.server.ThreadingHTTPServer(("127.0.0.1", PUERTO), Handler)
    url = f"http://127.0.0.1:{PUERTO}/"
    print(f"Encuadre de {SLUG} → {url}")
    print("Ctrl-C para cerrar.", flush=True)
    threading.Timer(0.5, lambda: webbrowser.open(url)).start()
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print()
