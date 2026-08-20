# Subastop · Instagram

Dos productos en un repo, cada uno en su propio árbol. **Identifica cuál te están pidiendo antes de
tocar nada.**

- **`carrusel/`** — posts de una subasta puntual. Pipeline con script. Lee `carrusel/README.md`.
- **`reels/`** — los videos verticales de marca. Pipeline a mano. Lee `reels/REELS.md`.

No comparten código: cada uno tiene su propio proyecto Remotion (`carrusel/remotion/`,
`reels/remotion/`) con su propio `npm install`. Lo único duplicado a propósito son tres tokens de
marca y el logo — ver "Lo que está en los dos lados" más abajo.

## Antes de tocar un reel

Lee `reels/REELS.md` completo. No improvises el método: cada regla de ahí salió de un error
concreto. Las cuatro que más se rompen:

1. **El reel se retima a la voz, nunca al revés.** Si la locución dura 52.6 s, el reel dura 53 s.
2. **Los cortes se miden con `ffmpeg silencedetect`, no con una transcripción.** Las marcas de
   palabra de un transcriptor no coinciden con la onda y los cortes caen encima de la voz.
3. **No escribas en pantalla lo que la voz ya dice** (salvo los titulares del primer acto, que van
   palabra por palabra a propósito).
4. **Si el vendedor lo vería en la app, sale de Concorde** (`reels/remotion/concorde/`), no lo
   dibujes de nuevo.

Cambiar los frames de `GUION` en un `.tsx` obliga a actualizar la tabla del `VOZ-<reel>.md`
correspondiente. Van siempre juntos.

**Los tutoriales** (`Registro`, `Consignar`) comparten su formato en
`reels/remotion/src/reels/tutorial.tsx`, y no usan Concorde para las pantallas: van las capturas
reales del Centro de Ayuda, por el motivo del punto 4 al revés. Y el gancho de un tutorial dice
**qué enseña el video**, no qué vende el producto.

## Comandos

```bash
cd reels/remotion
npm install
npm run dev                                          # Remotion Studio
npm run reel:vendesolo                               # render → out/vendesolo.mp4
npm run reel:consignar                               # los tutoriales, mudos por ahora
npm run lint                                         # eslint + tsc, antes de commitear
npx remotion still VendeSolo /tmp/f.png --frame=640 --scale=2   # revisar un frame suelto
```

```bash
cd carrusel
./estudio.sh                                         # el estudio en el navegador
./nueva-subasta.sh 63014                             # código de oferta → PNG en Posts/<slug>/
cd remotion && npm run dev                           # el Studio del slide
```

Renderizar completo toma minutos. Para revisar composición usa `remotion still`, no el render.

## Dónde va cada archivo

- Fotos de una subasta → `carrusel/Materiales/<id>/`. De ahí las toma `nueva-subasta.sh`.
- Tomas y locuciones de un reel → `reels/tomas/<reel>/`. **Nunca** en `carrusel/Materiales/`: el
  script del carrusel se lleva lo que encuentre suelto ahí.
- `carrusel/Materiales/*/`, `carrusel/Posts/`, `carrusel/remotion/public/autos/` y
  `reels/remotion/out/` están en `.gitignore`: se regeneran.
- Lo de `reels/tomas/`, `reels/marca/` y `reels/remotion/public/` sí va al repo: una toma de un
  generador no se puede volver a pedir.

## Lo que está en los dos lados

El split dejó cuatro cosas duplicadas por necesidad. Si tocas una, toca la otra en el mismo commit:

- `sans`, `gradient.borde` y `shadow.glassInset` en `carrusel/remotion/src/brand/vmc.ts` y en
  `reels/remotion/src/brand/vmc.ts`.
- `public/brand/vmc-logo.svg`, en los dos `remotion/public/brand/`.

## Requisitos del sistema

`ffmpeg`, `ffprobe` e `imagemagick` (`convert`). Node 20+. Instalación desde cero, cuentas y
verificación: `reels/REELS.md` §0 y `carrusel/README.md`.

## Skills del repo

`copy-subastas-vmc` (copy de venta), `concorde-ui` (traer componentes del design system),
`vmc-subastas-content`, `remotion-to-hyperframes`.

## Idioma

Comentarios de código en inglés. Documentación y contenido en español neutro — nada de rioplatense.
