# Subastop · Instagram

Dos productos en un repo. **Identifica cuál te están pidiendo antes de tocar nada.**

- **Carrusel** — posts de una subasta puntual. Pipeline con script. Lee `README.md`.
- **Reels** — los videos verticales de marca. Pipeline a mano. Lee `social-content/REELS.md`.

## Antes de tocar un reel

Lee `social-content/REELS.md` completo. No improvises el método: cada regla de ahí salió de un
error concreto. Las cuatro que más se rompen:

1. **El reel se retima a la voz, nunca al revés.** Si la locución dura 52.6 s, el reel dura 53 s.
2. **Los cortes se miden con `ffmpeg silencedetect`, no con una transcripción.** Las marcas de
   palabra de un transcriptor no coinciden con la onda y los cortes caen encima de la voz.
3. **No escribas en pantalla lo que la voz ya dice** (salvo los titulares del primer acto, que van
   palabra por palabra a propósito).
4. **Si el vendedor lo vería en la app, sale de Concorde** (`social-content/concorde/`), no lo
   dibujes de nuevo.

Cambiar los frames de `GUION` en un `.tsx` obliga a actualizar la tabla del `VOZ-<reel>.md`
correspondiente. Van siempre juntos.

## Comandos

```bash
cd social-content
npm install
npm run dev                                          # Remotion Studio
npm run reel:vendesolo                               # render → out/vendesolo.mp4
npm run lint                                         # eslint + tsc, antes de commitear
npx remotion still VendeSolo /tmp/f.png --frame=640 --scale=2   # revisar un frame suelto
```

Renderizar completo toma minutos. Para revisar composición usa `remotion still`, no el render.

## Dónde va cada archivo

`Materiales/` en su raíz es de donde el script del carrusel toma fotos sueltas. **Nunca dejes ahí
material de un reel**: se lo lleva. Lo de reel va a `Materiales/reels/<reel>/`.

Las fotos de `social-content/public/autos/` están en `.gitignore` (son de subasta, se regeneran).
Las que usan los reels van en `social-content/public/reel/`, que sí va al repo.

## Requisitos del sistema

`ffmpeg`, `ffprobe` e `imagemagick` (`convert`). Node 20+. Instalación desde cero, cuentas y
verificación: `social-content/REELS.md` §0.

## Skills del repo

`copy-subastas-vmc` (copy de venta), `concorde-ui` (traer componentes del design system),
`vmc-subastas-content`, `remotion-to-hyperframes`.

## Idioma

Comentarios de código en inglés. Documentación y contenido en español neutro — nada de rioplatense.
