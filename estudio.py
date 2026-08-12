#!/usr/bin/env python3
"""
Estudio: de un código de oferta a los PNG listos para publicar, sin terminal.

    ./estudio.sh                 # empezar un carrusel nuevo
    ./estudio.sh 62915-dfsk-glory  # reabrir uno ya hecho, para reencuadrar

Cuatro pasos en una sola página: pegar la oferta, revisar los datos, elegir las
fotos y su orden, encuadrar. Al final genera y muestra los cuatro slides.

Es la misma tubería de siempre: `scraper.py` para los datos y
`ajustar.sh --render` para los PNG. Esta página no renderiza nada por su cuenta,
así que no puede desincronizarse de lo que sale por la terminal.

Servidor de la stdlib en 127.0.0.1: no se instala nada y no sale de la máquina.
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

# Slug de arranque, cuando se reabre un carrusel ya hecho.
SLUG_INICIAL = sys.argv[1].strip("/").removeprefix("Posts/") if len(sys.argv) > 1 else ""


def seguro(nombre):
    """Un nombre de archivo, sin rutas. Lo que llega del navegador no elige en
    qué carpeta se escribe."""
    return os.path.basename(nombre).replace("\x00", "")


def slugificar(*partes):
    """Mismo slug que `nueva-subasta.sh`: código-marca-modelo."""
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


PAGINA = r"""<!doctype html>
<meta charset="utf8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Estudio · carrusel de subasta</title>
<style>
  :root { color-scheme: dark; --violeta: #8460E5; --naranja: #ED8936; }
  * { box-sizing: border-box; }
  /* El `display` de una regla propia le gana al `hidden` del navegador. */
  [hidden] { display: none !important; }
  body {
    margin: 0; min-height: 100vh; background: #14111c; color: #e8e4f0;
    font: 15px/1.55 system-ui, -apple-system, sans-serif;
    padding: 0 16px 140px;
  }
  .hoja { max-width: 1080px; margin: 0 auto; }
  header { padding: 28px 0 8px; }
  header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -.3px; }
  header p { margin: 4px 0 0; color: #8a82a8; font-size: 14px; }

  section {
    border: 1px solid #2b2440; border-radius: 14px; background: #1a1626;
    padding: 20px; margin-top: 16px;
  }
  section.apagada { opacity: .45; pointer-events: none; }
  h2 {
    margin: 0 0 14px; font-size: 15px; font-weight: 600;
    display: flex; align-items: center; gap: 10px;
  }
  h2 .n {
    width: 24px; height: 24px; border-radius: 7px; background: var(--violeta);
    color: #fff; display: grid; place-items: center; font-size: 13px; flex: none;
  }
  h2 small { color: #8a82a8; font-weight: 400; margin-left: auto; font-size: 13px; }

  input[type=text], input[type=url] {
    background: #221d33; border: 1px solid #3a3350; border-radius: 9px;
    color: #e8e4f0; padding: 10px 12px; font: inherit; width: 100%;
  }
  input:focus { outline: 2px solid var(--violeta); outline-offset: -1px; }

  .fila { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
  .fila input { flex: 1; min-width: 220px; }

  .campos { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
  .campo label { display: block; font-size: 12px; color: #8a82a8; margin-bottom: 5px; }

  button {
    border: 0; border-radius: 9px; padding: 10px 18px; cursor: pointer;
    font: 600 15px system-ui; background: var(--violeta); color: #fff;
  }
  button.suave { background: #2b2440; color: #cfc7e6; }
  button:disabled { opacity: .45; cursor: default; }

  .galeria { display: grid; grid-template-columns: repeat(auto-fill, minmax(132px, 1fr)); gap: 10px; }
  .miniatura {
    position: relative; aspect-ratio: 1; border-radius: 10px; overflow: hidden;
    cursor: pointer; border: 2px solid transparent; background: #221d33;
  }
  .miniatura img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .miniatura.elegida { border-color: var(--violeta); }
  .miniatura .orden {
    position: absolute; top: 6px; left: 6px; width: 26px; height: 26px;
    border-radius: 8px; background: var(--violeta); color: #fff;
    display: grid; place-items: center; font: 700 14px system-ui;
  }
  .miniatura .portada {
    position: absolute; bottom: 0; left: 0; right: 0; background: var(--naranja);
    color: #fff; font: 700 10px system-ui; text-align: center; padding: 3px;
    letter-spacing: .5px;
  }
  .subir {
    display: grid; place-items: center; aspect-ratio: 1; border-radius: 10px;
    border: 2px dashed #3a3350; color: #8a82a8; cursor: pointer;
    text-align: center; font-size: 13px; padding: 8px;
  }
  .subir:hover { border-color: var(--violeta); color: #cfc7e6; }

  .encuadre { display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start; }
  #marco {
    position: relative; width: min(100%, 420px); aspect-ratio: 1;
    overflow: hidden; border-radius: 12px; background: #000;
    cursor: grab; touch-action: none; user-select: none; flex: none;
  }
  #marco.arrastrando { cursor: grabbing; }
  #foto { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
  .guia {
    position: absolute; border: 1px dashed rgba(255,255,255,.5);
    background: rgba(0,0,0,.32); border-radius: 6px; pointer-events: none;
    font: 500 10px/1 system-ui; color: rgba(255,255,255,.85);
    display: flex; align-items: center; justify-content: center; text-align: center;
  }
  .guia.redonda { border-radius: 50%; }
  .controles { flex: 1; min-width: 230px; display: flex; flex-direction: column; gap: 14px; }
  .pestanias { display: flex; gap: 8px; }
  .pestanias button { width: 42px; padding: 9px 0; }
  .pestanias button:not(.on) { background: #2b2440; color: #cfc7e6; }
  input[type=range] { width: 100%; accent-color: var(--violeta); }
  .pista { color: #8a82a8; font-size: 13px; }

  .previews { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
  .previews a { display: block; border-radius: 10px; overflow: hidden; border: 1px solid #2b2440; }
  .previews img { width: 100%; display: block; }
  .previews .rotulo { font-size: 12px; color: #8a82a8; padding: 6px 8px; background: #1a1626; }

  .barra {
    position: fixed; left: 0; right: 0; bottom: 0; background: #100d18;
    border-top: 1px solid #2b2440; padding: 14px 16px;
    display: flex; gap: 16px; align-items: center; justify-content: center;
  }
  .barra button { padding: 13px 28px; font-size: 16px; }
  #estado { color: #8a82a8; font-size: 14px; }
  #estado.ok { color: #6ee7b7; }
  #estado.mal { color: #fca5a5; }
  .cargando { color: var(--violeta); }
</style>

<div class="hoja">
<header>
  <h1>Estudio · carrusel de subasta</h1>
  <p>Del código de la oferta a los cuatro slides listos para publicar.</p>
</header>

<section id="s1">
  <h2><span class="n">1</span> La oferta</h2>
  <div class="fila">
    <input type="text" id="codigo" placeholder="62996  ·  o pegá el link de la oferta"
           autocomplete="off">
    <button id="traer">Traer datos</button>
    <button class="suave" id="sinCodigo">No tengo código</button>
  </div>
  <p class="pista" id="pista1" style="margin-bottom:0">
    Trae marca, modelo, año, precio, fecha, hora, tienda y las fotos del sitio.
  </p>
</section>

<section id="s2" class="apagada">
  <h2><span class="n">2</span> Los datos <small>revisá lo que trajo el sitio</small></h2>
  <div class="campos" id="campos"></div>
</section>

<section id="s3" class="apagada">
  <h2><span class="n">3</span> Las fotos <small>clic para elegir · el orden es el del carrusel</small></h2>
  <div class="galeria" id="galeria"></div>
  <input type="file" id="archivos" accept="image/*" multiple hidden>
</section>

<section id="s4" class="apagada">
  <h2><span class="n">4</span> El encuadre <small>arrastrá la foto · rueda para acercar</small></h2>
  <div class="encuadre">
    <div id="marco"><img id="foto" alt=""></div>
    <div class="controles">
      <div class="pestanias" id="pestanias"></div>
      <div>
        <label class="pista">zoom <span id="zoomTxt">1.00×</span></label>
        <input type="range" id="zoom" min="1" max="3" step="0.02" value="1">
      </div>
      <div><button class="suave" id="centrar">Centrar esta foto</button></div>
      <p class="pista" id="pista4">
        El recuadro punteado es donde caen el título y la tarjeta. Que no tapen
        el auto.
      </p>
    </div>
  </div>
</section>

<section id="s5" style="display:none">
  <h2><span class="n">✓</span> Listo <small id="ruta"></small></h2>
  <div class="previews" id="previews"></div>
</section>
</div>

<div class="barra">
  <button id="generar" disabled>Generar carrusel</button>
  <span id="estado">Empezá pegando el código de la oferta.</span>
</div>

<script>
const CAMPOS = [
  ["marca", "Marca"], ["modelo", "Modelo"], ["anio", "Año (25')"],
  ["transmision", "Transmisión"], ["precio", "Precio base (sin US$)"],
  ["fecha", "Fecha (dd/mm)"], ["hora", "Hora"], ["tienda", "Tienda oficial"],
];
// Coordenadas reales del diseño, en el frame de 1080×1080.
const GUIAS = [
  { x: 45, y: 49, w: 372, h: 104, txt: "tienda" },
  { x: 600, y: 42, w: 409.56, h: 188, txt: "marca y modelo", soloPortada: true },
  { x: 45.19, y: 515.22, w: 92.386, h: 92.386, txt: "‹", redonda: true, desde: 1 },
  { x: 942.42, y: 515.22, w: 92.386, h: 92.386, txt: "›", redonda: true, salvoUltima: true },
  { x: 45, y: 778.25, w: 353, h: 51, txt: "fecha" },
  { x: 45, y: 845, w: 466, h: 176, txt: "datos del auto" },
  { x: 855.29, y: 952.32, w: 179.51, h: 66.69, txt: "vmc" },
];

const S = { codigo: "", fotos: [], elegidas: [], ajustes: {}, i: 0 };
const $ = (id) => document.getElementById(id);
const marco = $("marco"), foto = $("foto"), estado = $("estado");

function decir(txt, clase) { estado.textContent = txt; estado.className = clase || ""; }
function prender(id, si) { $(id).classList.toggle("apagada", !si); }

// ── 2 · datos ───────────────────────────────────────────────────────────────
for (const [clave, rotulo] of CAMPOS) {
  const d = document.createElement("div");
  d.className = "campo";
  d.innerHTML = `<label for="c-${clave}">${rotulo}</label>
                 <input type="text" id="c-${clave}" autocomplete="off">`;
  $("campos").appendChild(d);
}
const dato = (k) => $("c-" + k).value.trim();
const ponerDatos = (d) => CAMPOS.forEach(([k]) => { if (d[k] != null) $("c-" + k).value = d[k]; });
CAMPOS.forEach(([k]) => $("c-" + k).addEventListener("input", revisar));

// ── 1 · la oferta ───────────────────────────────────────────────────────────
$("traer").onclick = async () => {
  const codigo = $("codigo").value.trim();
  if (!codigo) return decir("Falta el código o el link.", "mal");
  $("traer").disabled = true;
  decir("Leyendo la oferta…", "cargando");
  try {
    const r = await fetch("/oferta", { method: "POST", body: JSON.stringify({ codigo }) });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error);
    S.codigo = j.codigo; S.fotos = j.fotos;
    S.elegidas = j.fotos.slice(0, 3).map((f) => f.url);
    ponerDatos(j.datos);
    prender("s2", true); prender("s3", true);
    pintarGaleria(); pintarEncuadre();
    decir(`${j.fotos.length} fotos del sitio. Podés sumar las tuyas.`, "ok");
  } catch (e) { decir(e.message, "mal"); }
  $("traer").disabled = false;
  revisar();
};
$("codigo").addEventListener("keydown", (e) => { if (e.key === "Enter") $("traer").click(); });

$("sinCodigo").onclick = () => {
  S.codigo = ""; S.fotos = []; S.elegidas = [];
  prender("s2", true); prender("s3", true);
  pintarGaleria();
  decir("Subí las fotos y completá los datos a mano.", "");
  revisar();
};

// ── 3 · las fotos ───────────────────────────────────────────────────────────
// Las miniaturas se crean una sola vez. Si se recrearan en cada clic, cada
// <img> nuevo relanza la descarga y cancela la anterior: con una galería de
// diez fotos eso deja la mitad colgada.
function pintarGaleria() {
  const g = $("galeria");
  g.innerHTML = "";
  for (const f of S.fotos) {
    const d = document.createElement("div");
    d.className = "miniatura";
    d.dataset.k = f.url;
    d.innerHTML = `<img src="${f.url}" alt="">
                   <div class="orden" hidden></div>
                   <div class="portada" hidden>PORTADA</div>`;
    d.onclick = () => elegir(f.url);
    g.appendChild(d);
  }
  const mas = document.createElement("div");
  mas.className = "subir";
  mas.textContent = "+ subir mis fotos";
  mas.onclick = () => $("archivos").click();
  g.appendChild(mas);
  marcarGaleria();
}

/** Solo los distintivos de selección: no toca los <img>. */
function marcarGaleria() {
  for (const d of document.querySelectorAll(".miniatura")) {
    const n = S.elegidas.indexOf(d.dataset.k);
    d.classList.toggle("elegida", n >= 0);
    const orden = d.querySelector(".orden");
    orden.hidden = n < 0;
    orden.textContent = n + 1;
    d.querySelector(".portada").hidden = n !== 0;
  }
}

// Clic = agregar al final del orden; clic de nuevo = sacarla. El orden en que
// se tocan ES el orden del carrusel, y la primera es la portada.
function elegir(url) {
  const n = S.elegidas.indexOf(url);
  if (n >= 0) S.elegidas.splice(n, 1);
  else if (S.elegidas.length < 3) S.elegidas.push(url);
  else return decir("Ya hay 3. Sacá una para cambiarla.", "mal");
  if (S.i >= S.elegidas.length) S.i = 0;
  marcarGaleria(); pintarEncuadre(); revisar();
}

$("archivos").onchange = async (e) => {
  const archivos = [...e.target.files];
  if (!archivos.length) return;
  decir(`Subiendo ${archivos.length} foto(s)…`, "cargando");
  for (const a of archivos) {
    const b64 = await new Promise((res) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result.split(",")[1]);
      fr.readAsDataURL(a);
    });
    const r = await fetch("/subir", {
      method: "POST",
      body: JSON.stringify({ codigo: S.codigo, nombre: a.name, datos: b64 }),
    });
    const j = await r.json();
    if (!j.ok) { decir(j.error, "mal"); break; }
    if (!S.fotos.some((f) => f.url === j.foto.url)) S.fotos.push(j.foto);
    if (S.elegidas.length < 3) S.elegidas.push(j.foto.url);
  }
  e.target.value = "";
  pintarGaleria(); pintarEncuadre(); revisar();
  decir("Fotos subidas.", "ok");
};

// ── 4 · el encuadre ─────────────────────────────────────────────────────────
const ajuste = (url) => (S.ajustes[url] ||= { foco: "50% 50%", escala: 1 });
const pct = (s) => s.split(" ").map(parseFloat);

function pintarEncuadre() {
  prender("s4", S.elegidas.length > 0);
  $("pestanias").innerHTML = "";
  S.elegidas.forEach((_, n) => {
    const b = document.createElement("button");
    b.textContent = n + 1;
    b.className = n === S.i ? "on" : "";
    b.onclick = () => { S.i = n; pintarEncuadre(); };
    $("pestanias").appendChild(b);
  });
  if (!S.elegidas.length) return;
  const url = S.elegidas[S.i], a = ajuste(url);
  if (foto.getAttribute("src") !== url) foto.src = url;  // no recargar al arrastrar
  foto.style.objectPosition = a.foco;
  if (a.escala === 1) { foto.style.transform = ""; foto.style.transformOrigin = ""; }
  else { foto.style.transform = `scale(${a.escala})`; foto.style.transformOrigin = a.foco; }
  $("zoom").value = a.escala;
  $("zoomTxt").textContent = Number(a.escala).toFixed(2) + "×";
  pintarGuias();
}

function pintarGuias() {
  document.querySelectorAll(".guia").forEach((g) => g.remove());
  const ultima = S.elegidas.length - 1;
  for (const g of GUIAS) {
    if (g.soloPortada && S.i !== 0) continue;
    if (g.desde !== undefined && S.i < g.desde) continue;
    if (g.salvoUltima && S.i >= ultima) continue;
    const d = document.createElement("div");
    d.className = "guia" + (g.redonda ? " redonda" : "");
    d.style.cssText = `left:${g.x / 10.8}%;top:${g.y / 10.8}%;` +
                      `width:${g.w / 10.8}%;height:${g.h / 10.8}%`;
    d.textContent = g.txt;
    marco.appendChild(d);
  }
}

// Cuánto se puede recorrer: lo que sobra del recorte cuadrado (una foto
// apaisada sobra a los lados y nada arriba) más lo que agrega el zoom.
function recorrido() {
  const lado = marco.clientWidth, w = foto.naturalWidth, h = foto.naturalHeight;
  if (!w || !h) return { x: 0, y: 0 };
  const cubrir = Math.max(lado / w, lado / h);
  const extra = lado * (ajuste(S.elegidas[S.i]).escala - 1);
  return { x: w * cubrir - lado + extra, y: h * cubrir - lado + extra };
}

let arrastre = null;
marco.addEventListener("pointerdown", (e) => {
  if (!S.elegidas.length) return;
  arrastre = { x: e.clientX, y: e.clientY,
               foco: pct(ajuste(S.elegidas[S.i]).foco), rango: recorrido() };
  marco.setPointerCapture(e.pointerId);
  marco.classList.add("arrastrando");
});
marco.addEventListener("pointermove", (e) => {
  if (!arrastre) return;
  const a = ajuste(S.elegidas[S.i]);
  const cerca = (v) => Math.min(100, Math.max(0, v));
  const dx = (e.clientX - arrastre.x) / a.escala;
  const dy = (e.clientY - arrastre.y) / a.escala;
  const px = arrastre.rango.x ? cerca(arrastre.foco[0] - dx / arrastre.rango.x * 100) : arrastre.foco[0];
  const py = arrastre.rango.y ? cerca(arrastre.foco[1] - dy / arrastre.rango.y * 100) : arrastre.foco[1];
  a.foco = px.toFixed(1) + "% " + py.toFixed(1) + "%";
  pintarEncuadre();
});
const soltar = () => { arrastre = null; marco.classList.remove("arrastrando"); };
marco.addEventListener("pointerup", soltar);
marco.addEventListener("pointercancel", soltar);
marco.addEventListener("wheel", (e) => {
  if (!S.elegidas.length) return;
  e.preventDefault();
  const a = ajuste(S.elegidas[S.i]);
  a.escala = Math.min(3, Math.max(1, +(a.escala - e.deltaY * 0.0015).toFixed(3)));
  pintarEncuadre();
}, { passive: false });

$("zoom").oninput = () => {
  if (!S.elegidas.length) return;
  ajuste(S.elegidas[S.i]).escala = +$("zoom").value;
  pintarEncuadre();
};
$("centrar").onclick = () => {
  S.ajustes[S.elegidas[S.i]] = { foco: "50% 50%", escala: 1 };
  pintarEncuadre();
};

// ── generar ─────────────────────────────────────────────────────────────────
function revisar() {
  const faltan = CAMPOS.filter(([k]) => !dato(k)).map(([, r]) => r);
  const listo = S.elegidas.length > 0 && !faltan.length;
  $("generar").disabled = !listo;
  if (!S.elegidas.length && !faltan.length) decir("Elegí al menos una foto.", "");
  else if (faltan.length && estado.className !== "mal")
    decir("Falta completar: " + faltan.join(", "), "");
  else if (listo && estado.className !== "ok") decir("Todo listo.", "");
}

$("generar").onclick = async () => {
  $("generar").disabled = true;
  decir("Generando… (unos segundos por slide)", "cargando");
  const cuerpo = {
    codigo: S.codigo,
    datos: Object.fromEntries(CAMPOS.map(([k]) => [k, dato(k)])),
    fotos: S.elegidas.map((url) => {
      const f = S.fotos.find((x) => x.url === url);
      return { archivo: f.archivo, carpeta: f.carpeta, ...ajuste(url) };
    }),
  };
  try {
    const r = await fetch("/generar", { method: "POST", body: JSON.stringify(cuerpo) });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error);
    $("s5").style.display = "";
    $("ruta").textContent = "Posts/" + j.slug + "/";
    $("previews").innerHTML = j.slides.map((u, n) =>
      `<a href="${u}" target="_blank"><img src="${u}" alt="slide ${n + 1}">
       <div class="rotulo">${n + 1 === j.slides.length ? "placa de cierre" : "slide " + (n + 1)}</div></a>`
    ).join("");
    decir("Listo. Miralos antes de publicar.", "ok");
    $("s5").scrollIntoView({ behavior: "smooth" });
  } catch (e) { decir("No se pudo: " + e.message, "mal"); }
  $("generar").disabled = false;
};

// ── reabrir un carrusel ya hecho ────────────────────────────────────────────
(async () => {
  const r = await fetch("/inicio");
  const j = await r.json();
  if (!j.slug) return revisar();
  S.codigo = j.codigo; S.fotos = j.fotos;
  S.elegidas = j.elegidas; S.ajustes = j.ajustes;
  ponerDatos(j.datos);
  prender("s2", true); prender("s3", true);
  pintarGaleria(); pintarEncuadre(); revisar();
  decir("Reabierto " + j.slug + ". Reencuadrá y volvé a generar.", "ok");
})();
</script>
"""


class Handler(http.server.BaseHTTPRequestHandler):
    # HTTP/1.1 para que el navegador reuse la conexión. Con 1.0 abre una por
    # foto, se queda sin pool a la decena de miniaturas y las que faltan quedan
    # colgadas para siempre. Todas las respuestas mandan Content-Length, que es
    # lo que 1.1 exige para poder reusar.
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
        """Sirve un archivo, siempre de adentro de `base`."""
        ruta = os.path.abspath(ruta)
        if not ruta.startswith(os.path.abspath(base) + os.sep) or not os.path.isfile(ruta):
            return self.responder(404, "text/plain", b"no existe")
        tipo = mimetypes.guess_type(ruta)[0] or "application/octet-stream"
        with open(ruta, "rb") as f:
            self.responder(200, tipo, f.read())

    # ── GET ──────────────────────────────────────────────────────────────────
    def do_GET(self):
        # unquote: los nombres de WhatsApp traen espacios y el navegador los
        # manda como %20. Sin esto la miniatura sale rota.
        ruta = urllib.parse.unquote(self.path.split("?")[0])
        if ruta == "/":
            return self.responder(200, "text/html; charset=utf8", PAGINA.encode())
        if ruta == "/inicio":
            return self.json(self.inicio())
        if ruta.startswith("/foto/"):
            _, _, carpeta, archivo = ruta.split("/", 3)
            return self.archivo(
                os.path.join(MATERIALES, seguro(carpeta), seguro(archivo)), MATERIALES)
        if ruta.startswith("/auto/"):
            # Las fotos ya copiadas de un carrusel hecho.
            return self.archivo(
                os.path.join(AUTOS, seguro(ruta.split("/", 2)[2])), AUTOS)
        if ruta.startswith("/post/"):
            _, _, slug, archivo = ruta.split("/", 3)
            return self.archivo(
                os.path.join(POSTS, seguro(slug), seguro(archivo)), POSTS)
        self.responder(404, "text/plain", b"no existe")

    def inicio(self):
        """Estado para reabrir un carrusel ya hecho. Sin argumento, vacío."""
        if not SLUG_INICIAL:
            return {"slug": ""}
        datos_json = os.path.join(POSTS, SLUG_INICIAL, "datos.json")
        if not os.path.isfile(datos_json):
            return {"slug": ""}
        d = json.load(open(datos_json, encoding="utf8"))
        codigo = SLUG_INICIAL.split("-")[0]
        codigo = codigo if codigo.isdigit() else ""

        # Las fotos que se usaron son las copiadas a public/autos: se ofrecen
        # desde ahí y no desde Materiales, porque son las únicas que mapean
        # exacto contra el encuadre guardado. Adivinar por posición pega el
        # encuadre a la foto equivocada apenas el orden no fue 1-2-3.
        fotos, elegidas, ajustes = [], [], {}
        for f in (normalizar(x) for x in d["fotos"]):
            archivo = os.path.basename(f["src"])
            url = f"/auto/{archivo}"
            fotos.append({"archivo": archivo, "carpeta": "", "url": url})
            elegidas.append(url)
            ajustes[url] = {"foco": f["foco"], "escala": f["escala"]}

        # Y además la carpeta original, para poder cambiar una foto por otra.
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
        except Exception as e:  # noqa: BLE001 — lo que falle se muestra en la página
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
        # Sin código las fotos van a una carpeta propia: nunca se mezclan con
        # las de una oferta que no les corresponde.
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

        # Se lee TODO antes de escribir nada: al reabrir un carrusel, la fuente
        # y el destino son la misma carpeta, y reordenar las fotos escribiría
        # encima de una que todavía falta leer.
        crudo = []
        for f in fotos:
            archivo, carpeta = seguro(f["archivo"]), seguro(f.get("carpeta") or "")
            base = os.path.join(MATERIALES, carpeta) if carpeta else AUTOS
            with open(os.path.join(base, archivo), "rb") as a:
                crudo.append((os.path.splitext(archivo)[1].lower(), a.read()))

        # Nombre estable y prefijado por slug, igual que el script: así dos
        # subastas no se pisan en public/.
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
        # El ?v= evita que el navegador muestre el render anterior en caché.
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
