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
