# Subastop · Instagram

Dos productos, dos árboles independientes.

| Carpeta | Qué produce | Empieza en |
|---|---|---|
| **`carrusel/`** | Los 4 PNG del carrusel de una subasta, desde el código de la oferta | [`carrusel/README.md`](carrusel/README.md) |
| **`reels/`** | Los reels verticales de marca, 1080×1920 | [`reels/REELS.md`](reels/REELS.md) |

Cada uno trae su propio proyecto Remotion (`carrusel/remotion/`, `reels/remotion/`) con su propio
`npm install`. No hay nada que instalar en la raíz.

```bash
cd carrusel/remotion && npm install     # el carrusel
cd reels/remotion   && npm install      # los reels
```

Lo que vive en la raíz es lo que sirve a los dos: `RESULTADOS.md` (las métricas de lo publicado,
se llenan a mano), `CLAUDE.md` (el enrutador para Claude Code) y `.claude/` con `.agents/`
(comandos y skills).

**Lo duplicado a propósito:** `sans`, `gradient.borde` y `shadow.glassInset` en los dos `vmc.ts`, y
`vmc-logo.svg` en los dos `public/brand/`. Es el precio de tener los dos productos separados; si
tocas uno, toca el otro en el mismo commit.

---

## Hacia dónde va

Hoy el repo produce **archivos**: PNG, MP4 y un `copy.md` que alguien copia y pega en la app de
Instagram. El final del camino es que no haya ese paso a mano.

### 1. Publicar desde el estudio, por la API de Meta

El estudio ya arma el carrusel y su copy. Falta el último botón: *Publish*, que llame a la Graph
API en vez de bajar un ZIP. No hay que empezar de cero — `../ig-comentarios` ya tiene la app de
Meta Developer andando, con Instagram Login, el token de larga duración y su `authorize.py` para
renovarlo cada 60 días. Es la misma app: se le agrega el permiso `instagram_content_publish` y se
reusa el token.

Publicar un carrusel son tres llamadas: un contenedor por imagen, un contenedor de carrusel con
los `children`, y `media_publish`. Y trae **un requisito que decide arquitectura**: la API no
acepta que le subas los bytes — descarga cada imagen de una **URL pública**. Los PNG del estudio
viven hoy en el disco efímero de su instancia, así que esto no se puede hacer sin mover los
archivos a un bucket. Es exactamente el mismo cambio que hace falta para que el servicio pueda
escalar a más de una instancia (ver `carrusel/README.md`, pendiente 2): una sola pieza resuelve
las dos cosas, y por eso es la siguiente.

### 2. Un solo panel: publicar y responder

`../ig-comentarios` responde los comentarios de los posts: lee los últimos, redacta con DeepSeek
usando el Centro de Ayuda como única fuente, publica la respuesta y marca `SKIP` lo que no sabe.
Corre en cron, sin servidor.

Las dos herramientas son la misma cosa vista en dos momentos —antes y después de publicar— y
comparten hasta la implementación: Python de la librería estándar sin dependencias, DeepSeek para
redactar, y la misma app de Meta con el mismo token. Separadas obligan a mantener dos
autorizaciones, dos `.env` y dos paneles.

Juntas cierran el ciclo entero de una subasta en una sola pantalla:

```
código de oferta → fotos y datos → carrusel + copy → publicado en IG → comentarios respondidos
        scraper         estudio          DeepSeek        Graph API        ig-comentarios
```

El orden importa: primero el bucket, después publicar, y recién entonces fusionar los paneles.
Fusionarlos antes es mover código de un lado a otro sin que nada nuevo funcione.
