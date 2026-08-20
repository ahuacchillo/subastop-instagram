# Reels de VMC — cómo se construyen

Handoff completo. Si vas a tomar la posta de estos videos, esto es lo único que tienes que leer
antes de tocar nada: qué hay, cómo se hace, por qué se hace así, y qué está flojo.

**Última actualización:** 14 de agosto de 2026.

---

## 0. Setup desde cero

Si no tienes nada instalado, esto es lo primero. Toma unos 20 minutos.

### 0.1 · Lo que hay que instalar

| Qué | Para qué | Versión con la que corre hoy |
|---|---|---|
| **Node.js** | Remotion es JavaScript | v24.16.0 (sirve cualquier 20+) |
| **ffmpeg** + **ffprobe** | medir la voz, cortar y parchar tomas | 6.1.1 |
| **ImageMagick** (`convert`) | hornear los fondos desenfocados | 6.9.12 |
| **git** | el repo | 2.43 |

**Ubuntu / Debian**

```bash
sudo apt update
sudo apt install -y git ffmpeg imagemagick
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

**macOS** (con [Homebrew](https://brew.sh))

```bash
brew install git node ffmpeg imagemagick
```

**Windows** — instala **WSL2** con Ubuntu y sigue los pasos de Ubuntu dentro de WSL. Remotion corre
en Windows nativo, pero medio pipeline son comandos de shell y te vas a pelear con las rutas.

Comprueba que quedó todo:

```bash
node --version && ffmpeg -version | head -1 && convert --version | head -1
```

Si `convert` no existe pero sí `magick`, tienes ImageMagick 7: usa `magick` en lugar de `convert`
en los comandos de este documento.

### 0.2 · Clonar y arrancar

```bash
git clone https://github.com/ahuacchillo/subastop-instagram.git
cd subastop-instagram/reels/remotion
npm install          # ~2 min, baja Remotion y Chrome Headless Shell
npm run dev          # abre Remotion Studio en el navegador
```

En el Studio, en la barra izquierda, elige la composición `VendeSolo` y dale play. Si se ve y se
oye, tienes el entorno completo: el repo trae las tomas, la voz y las fotos.

Y comprueba que renderiza:

```bash
npm run reel:vendesolo     # ~5 min → out/vendesolo.mp4
```

**Si eso funciona, ya puedes trabajar.** El resto de este documento es cómo se hace un reel nuevo.

### 0.3 · Las cuentas que hacen falta

Sólo para **crear material nuevo**. Para tocar los reels que ya existen no necesitas ninguna.

| Servicio | Para qué | Nota |
|---|---|---|
| **ElevenLabs** | la voz en off | tiene que ser un plan que dé acceso a **Eleven v3**: es el que respeta las etiquetas de emoción |
| **Un generador de video** | las tomas | hoy salen de generadores tipo Veo / Kling. Cualquiera sirve mientras acepte **imagen de referencia** para mantener el personaje |
| **Gemini / Nano Banana** o similar | las imágenes base del personaje | opcional, si prefieres generar el still y después animarlo |

No hay claves de API en el repo ni el pipeline las usa: la voz y las tomas se generan en la web de
cada servicio y se descargan a mano. Es a propósito — son pocos archivos al mes y automatizarlo no
compensa.

### 0.4 · Claude Code

El repo está preparado para trabajar con [Claude Code](https://claude.com/claude-code):

```bash
npm install -g @anthropic-ai/claude-code
cd subastop-instagram
claude
```

- `CLAUDE.md` en la raíz se carga solo en cada sesión: le dice cuál de los dos productos es cuál y
  las cuatro reglas que no se rompen.
- Los **skills** del repo se activan solos por contexto: `concorde-ui` para traer componentes del
  design system, `vmc-ig-copy-ficha-tecnica` (en `carrusel/.claude/`) para el copy de una subasta.
- Arranca cada sesión de reel pidiéndole que lea este documento: *"lee reels/REELS.md antes
  de tocar el reel"*. Es lo que evita que improvise el método.

---

## 1. Qué hay hoy

Seis reels hechos con Remotion: tres de marca y tres tutoriales. Los seis son verticales
1080×1920 para Instagram, y **los tres tutoriales se entregan además en 1920×1080 para YouTube** —
ver §1.1.

| Composición | Archivo | Dura | Voz | Estado |
|---|---|---|---|---|
| `Negociable` | `src/reels/Negociable.tsx` | 42 s | Kate | terminado |
| `Vender` | `src/reels/Vender.tsx` | 42.2 s | Jessica | terminado |
| `VendeSolo` | `src/reels/VendeSolo.tsx` | 53 s | Jessica | terminado, con un pendiente (§9) |
| `Registro` | `src/reels/Registro.tsx` | ~42.7 s | **sin grabar** | montado y mudo — le falta la voz (§9) |
| `Consignar` | `src/reels/Consignar.tsx` | ~52.6 s | **sin grabar** | montado y mudo — le falta la voz (§9) |
| `Visitas` | `src/reels/Visitas.tsx` | ~41.8 s | **sin grabar** | montado y mudo — le falta la voz (§9) |

Cada uno tiene sus documentos hermanos:

- `GUION-<reel>.md` — voz y pantalla beat por beat, para revisar la copia de un vistazo.
- `VOZ-<reel>.md` — el casting, el texto para ElevenLabs y **la tabla de tiempos medidos**.
- `PROMPTS-<reel>.md` — los prompts de cada toma generada (sólo `VendeSolo` por ahora).

`Negociable` y `Vender` son dos formas de contar lo mismo (cómo se vende en VMC).
`VendeSolo` es la tercera pasada y la más lograda: **reemplaza a `Vender`**, no lo complementa.
Los tres siguen en el repo porque el material se recicla entre ellos.

**`Registro`, `Consignar` y `Visitas` son de otra familia.** Los tres primeros son reels de marca: venden una
idea y reconstruyen el producto con componentes de Concorde para que el reel se mueva cuando el
producto se mueva. Los tutoriales hacen lo contrario: reproducen las capturas reales del Centro de
Ayuda dentro de una ventana de teléfono y se acercan al control que hay que tocar. Quien los ve va a
ir a buscar ese botón, y un botón redibujado que está 90% bien manda a alguien a buscar un control
que no se ve así. La regla de "todo sale de Concorde" (§4) es de los reels de marca; no aplica a un
tutorial y el motivo largo está en `GUION-REGISTRO.md`.

### 1.1 · Los tutoriales tienen dos formas

| Composición | Entrega | Para | Comando |
|---|---|---|---|
| `Registro` · `Consignar` · `Visitas` | 1080×1920 | Instagram | `npm run reel:<nombre>` |
| `RegistroYT` · `ConsignarYT` · `VisitasYT` | 1920×1080 | YouTube | `npm run yt:<nombre>` |

**No son dos builds.** Es la misma composición con un prop `ancho`, y los beats se reacomodan de una
columna a dos a través de `FormatoTutorial` en `tutorial.tsx`. Copy, capturas, frames y voz son los
mismos: **arreglas una línea una vez y las dos formas la reciben**. Dos archivos separados
significarían corregir cada copy dos veces, y la segunda se olvidaría.

Existen porque **los tres artículos del Centro de Ayuda enlazan un video de YouTube, y los tres
enlazan el viejo** (`DGFzz3IY_hg`, `BArqY0cM39I`, `3wqedeVF4d8`). Un archivo vertical en YouTube es
un Short, no un reemplazo de lo que esos artículos apuntan.

Qué cambia entre las dos formas, y por qué:

- **Vertical:** una columna — encabezado, pantalla, aviso. La pantalla va al medio porque es la masa
  más grande y el ojo cae ahí primero.
- **Horizontal:** dos columnas — todo el texto a la izquierda, la pantalla a la derecha. **No es
  preferencia**: a 480×270 el cuadro mide 270 de alto, así que apilar un titular sobre una ventana de
  teléfono la deja en ~120 px y su texto deja de leerse. De lado la ventana conserva su altura
  completa, y el texto gana una columna que no lo parte cada tres palabras.

Los ganchos y los cierres no cambian de forma: son tarjetas centradas y funcionan igual en las dos.

**Los tres tutoriales comparten su formato** en `src/reels/tutorial.tsx`: el corte (no la
disolvencia), la ventana de teléfono con bordes desenfocados, el anillo de toque y la geometría
idéntica de los pasos. Se extrajo de `Registro` cuando `Consignar` necesitó las mismas cuatro cosas,
y `Visitas` ya no tuvo que tocarlo: importó y escribió sólo su `GUION`, sus capturas y sus beats.
**No es `ui.tsx`** —ése lo comparten los reels de marca, que están terminados— y cada pieza existe
*porque* un tutorial se comporta distinto.

Y hay una regla que los tres respetan y que vale más que el código: **la fuente manda sobre el video
viejo**. Los tres artículos enlazan un video de YouTube que describe un flujo que ya no existe, y en
`Visitas` el video pide **mascarilla y distanciamiento social** que el artículo actual no menciona en
ninguna parte. Si el brief de un reel viene del video, hay que ir al artículo antes de escribir.

Y una regla que salió de `Consignar`: **el gancho de un tutorial dice qué enseña el video.** Costó
cuatro versiones aprenderlo — dos estrechaban el marketplace nombrando el bien («autos», cuando los
T&C dicen *activos*), y una tercera, impecablemente citada, leía como publicidad de las modalidades
y no anunciaba de qué era el video. El titular dice qué enseña, la bajada qué tan ancho es el
beneficio, y la voz por qué hace falta.

Y trae una regla propia que los de marca no necesitaban: **cada frase se contrasta contra los T&C y
el Centro de Ayuda antes de entrar**, con el skill `vmc-modelo-negocio`. Un reel de marca que
exagera queda cursi; un tutorial que exagera manda a alguien a hacer algo que la plataforma no
hace. La tabla de trazabilidad —qué dice cada línea y de qué sección sale— está en
`GUION-REGISTRO.md` §Validación, y **es parte del entregable**: si escribes una línea nueva, va con
su cita o no va.

### Lo que NO es esto

Este repo también arma **carruseles de subastas** (los posts de un auto puntual). Es otro pipeline,
con otro script, otros datos y otras carpetas. No los mezcles — §7 es el mapa de qué es qué.

---

## 2. El stack

| Para qué | Herramienta | Nota |
|---|---|---|
| Montaje y render | **Remotion 4.0.506** + React 19 | el video es un componente de React |
| Componentes de producto | **Concorde** (design system de Subastop) | ver `concorde/` y el skill `concorde-ui` |
| Voz en off | **ElevenLabs**, modelo **Eleven v3** | v3 es el que respeta las etiquetas de emoción |
| Tomas de video | generador texto/imagen→video (Veo / Kling / similar) | los prompts van en inglés |
| Corte, parche y medición | **ffmpeg / ffprobe** | `silencedetect`, `delogo`, `trim` |
| Fondos desenfocados | **ImageMagick** (`convert`) | se hornea el blur, no se hace en CSS |

Todo el montaje corre local. No hay render en la nube ni pipeline de CI para los reels.

Las rutas `public/...` de los bloques de comandos de este documento son relativas a
`reels/remotion/`: es desde ahí que corren npm y ffmpeg.

```bash
cd reels/remotion
npm install
npm run dev                # Remotion Studio: previsualizar y mover cosas en vivo
npm run reel               # render Negociable  → out/negociable.mp4
npm run reel:vender        # render Vender      → out/vender.mp4
npm run reel:vendesolo     # render VendeSolo   → out/vendesolo.mp4
npm run reel:registro      # render Registro    → out/registro.mp4   (mudo)
npm run reel:consignar     # render Consignar   → out/consignar.mp4  (mudo)
npm run reel:visitas       # render Visitas     → out/visitas.mp4    (mudo)
npm run yt:registro        # 16:9 para YouTube  → out/yt-registro.mp4
npm run yt:consignar       # 16:9 para YouTube  → out/yt-consignar.mp4
npm run yt:visitas         # 16:9 para YouTube  → out/yt-visitas.mp4
npm run lint               # eslint + tsc, corre esto antes de commitear
```

Un frame suelto, que es como se revisa sin esperar el render completo:

```bash
npx remotion still VendeSolo /tmp/f.png --frame=640 --scale=2
```

---

## 3. La metodología, en orden

Este es el pipeline real, y el orden **importa**. La regla que gobierna todo:

> **El reel se retima a la voz. Nunca la voz al reel.**

### Paso 1 · Un solo mensaje

Antes de escribir una línea: ¿qué tiene que poder decir el que terminó de verlo? Si son dos cosas,
son dos reels. `Vender` no explica cómo publicar; `Negociable` no explica qué hace VMC por ti. Esa
disciplina es la que hace que los reels duren 40 s y no 90.

### Paso 2 · El guion, en bloques

Se escribe la voz en bloques —uno por beat— separados por línea en blanco. Cada bloque lleva su
etiqueta de emoción de Eleven v3 al inicio:

```
[warm, smiling] Publica en ve eme ce, y observa cómo tu auto se vende solo.

[dry, matter-of-fact] Sin llamadas de curiosos. Sin regateos. Sin perder el tiempo...
```

Se escribe **como se pronuncia, no como se escribe**: `ve eme ce`, `veinticinco Subas Coins`,
`cien por ciento`. Las tablas de pronunciación están en cada `VOZ-*.md`.

### Paso 3 · Grabar la voz — una sola toma corrida

En ElevenLabs, todo el guion de una. **No beat por beat**: los empalmes se oyen y además el reel se
retima igual al final, así que grabar por partes no compra nada.

Ajustes que venimos usando: Eleven v3 · Stability ~0.40 (*Natural*) · Similarity ~0.75 · Style bajo ·
Speaker boost on · Speed 1.0.

### Paso 4 · Medir la onda ← el paso que nadie se salta

De la toma salen los frames de corte. Se miden **con el detector de energía, no con una
transcripción**:

```bash
ffmpeg -i public/voz/vendesolo.mp3 -af silencedetect=noise=-35dB:d=0.15 -f null -
```

Tres cosas que aprendimos a la mala:

1. **La transcripción miente.** Las marcas de palabra de un transcriptor no coinciden con la onda.
   En `vender.mp3`, cuatro cortes derivados del transcript cayeron **encima de la voz**.
2. **El umbral cambia por toma.** `vender.mp3` se mide a −30 dB; `vendesolo.mp3` es más caliente
   (mean −18.8 dB, pico −0.9) y a −45 dB el medidor no encuentra absolutamente nada. Ajusta hasta
   que el número de huecos tenga sentido.
3. **No todo hueco es un corte.** En `vendesolo.mp3` salen 18 huecos y sólo 8 son límites de bloque;
   los otros diez son las comas dentro de una frase. Se identifican cruzando con la puntuación del
   guion: si el hueco cae donde escribiste una coma, es una coma.

Cada corte va **en el medio del silencio, sesgado ~0.2 s hacia adelante**, para que la escena
entrante ya esté puesta cuando arranca la línea siguiente. Eso se convierte en el objeto `GUION`:

```ts
const GUION = {
  gancho: [0, 119],        // [primer frame, cuántos dura]
  painsA: [119, 89],
  ...
} as const;
```

Y se refleja en la tabla de `VOZ-<reel>.md`. **Si cambias uno, cambia el otro.**

### Paso 5 · Los prompts de las tomas

Sólo para los beats que llevan metraje real. La fidelidad del personaje no sale de pedirla una vez:
sale de **repetir el mismo bloque de descripción, palabra por palabra, en todas las tomas**.
`PROMPTS-VENDESOLO.md` tiene los cuatro bloques que se pegan siempre iguales (personaje, auto,
técnica, negativo).

Reglas del prompt:

- Van **en inglés**. Los generadores obedecen bastante mejor.
- **Cero texto en la toma.** Ni subtítulos, ni logos, ni marcas de agua. Todo el texto lo pone
  Remotion, porque así se corrige sin regenerar.
- Cada toma declara su **zona libre**: dónde no puede haber cabezas ni detalle, porque ahí va a caer
  el texto del reel.
- Pide **un segundo de más por punta**. Los cortes se mueven cuando se retima, y una toma justa
  deja el beat corto.

### Paso 6 · Parchar y guardar las tomas

Los generadores suelen estampar una marca de agua (un brillito de cuatro puntas abajo a la derecha).
**No la recortes** — te come el encuadre. Se parcha en origen:

```bash
# 720×1280
ffmpeg -i <original> -vf "delogo=x=560:y=1125:w=90:h=90" -c:v libx264 -crf 18 -an <destino>
# 1080×1920
ffmpeg -i <original> -vf "delogo=x=855:y=1675:w=125:h=125" -c:v libx264 -crf 18 -an <destino>
```

Si la toma vino limpia, basta copiar el stream: `ffmpeg -i <original> -c:v copy -an <destino>`.
**Revisa siempre**: de las cuatro tomas de `VendeSolo`, tres vinieron limpias y una no.

El `-an` es a propósito: el audio de origen es ruido de sala que pelea con la locución.

El original va a `reels/tomas/<reel>/video/`; el parcheado a
`reels/remotion/public/videos/`. **Se les pone el mismo nombre a los dos** para que la
correspondencia sea obvia.

### Paso 7 · Montar

Se abre `src/reels/<Reel>.tsx` y se arma escena por escena. La anatomía está en §5.

### Paso 8 · Revisar por frames, no por render

Renderizar 1590 frames a `--scale=4` toma minutos. Para revisar composición, `remotion still` de un
frame representativo de cada beat, a `--scale=2`. Así se cazan los desbordes de texto y los
solapamientos sin esperar nada.

### Paso 9 · Render final

`npm run reel:<nombre>`. Sale a `out/`, que está en `.gitignore` porque se regenera.

**El reel completo son 2 min 18 s**, medido con `VendeSolo` (1590 frames, 1080×1920). Antes eran
4 min 3 s: la diferencia es `Config.setChromiumOpenGlRenderer("vulkan")` en `remotion.config.ts`.
Por defecto Remotion rasteriza con SwiftShader, que es CPU pura, y estos reels son `backdrop-filter:
blur()` de punta a punta — justo lo que un rasterizador de software hace más lento. Con Vulkan el
trabajo se va a la GPU.

Dos cosas que hay que saber de ese cambio:

- **No es idéntico pixel a pixel.** Cambia ~24% de los píxeles en ±1, todos en el dithering del
  degradado violeta; el texto y los bordes de las tarjetas no se mueven. Verificado frame por frame
  antes de activarlo, y el mp4 pesa 3% más porque el encoder gasta bits en ese ruido.
- **Necesita Vulkan en la máquina.** En un Mac o en un contenedor sin `/dev/dri` hay que comentar
  esa línea del config, o pasar `--gl=swiftshader` en la línea de comandos, que la pisa.

La concurrencia también se probó: entre 3 y 6 no hay diferencia medible en esta máquina, así que
sigue en 6. `--concurrency` no acepta más que núcleos disponibles.

---

## 4. Las reglas que costaron

Esto es lo que no se deduce leyendo el código. Cada una salió de un error.

**El reel se retima a la voz.** `VendeSolo` estaba presupuestado en 42 s; la toma salió de 52.6 s y
el reel pasó a 53 s. No se acelera la voz ni se recorta el guion para que entre en un número
redondo.

**No escribas lo que la voz ya dice.** El cierre tenía en pantalla «VMC hace el trabajo pesado y tú
te quedas con el 100% de tu dinero» mientras la voz lo decía. Leer y oír lo mismo a la vez es más
lento que cualquiera de las dos cosas por separado. Se quitó. **La excepción son los titulares del
primer acto**, donde la pantalla sí va palabra por palabra con la voz: ahí el texto es lo único que
la acompaña, y oír «un montón de trabajo» sobre una placa que dice «un trabajo» se nota aunque no
sepas por qué.

**Nada en pantalla puede ir adelantado a la voz.** Los `retraso` de cada elemento se derivan de los
segundos en que la voz llega a esa idea. La tarjeta de reglas de `VendeSolo` dura 9.6 s y se
construye en tres tiempos (frame 2, 100 y 178) porque la frase tiene tres partes.

**Un solo auto.** La foto de la ficha era un Baleno blanco de lote y el metraje un hatchback plata:
dos autos en el mismo reel. Se sacó la foto de un frame del propio clip. Si el reel muestra el auto
más de una vez, tiene que ser el mismo.

**Componentes de Concorde, no dibujos del producto.** Si el vendedor lo vería en la app, sale del
design system: `OfferCard` para el aviso, `BidProposal` para las ofertas, `BidMessage` para el
mensaje del equipo, `Button` para el CTA. El día que cambie el producto, cambia el reel solo. Lo
único que se dibuja a mano es lo que no tiene componente.

**El texto se rompe a mano.** A 270 px de ancho entran ~22 caracteres por línea a tamaño 21. Dejar
que envuelva solo deja huérfanas («observa» sola en una línea). Todos los `<br/>` están puestos a
propósito y hay un comentario donde el tamaño está al límite.

**El filtro frío se aplica en Remotion, no se hornea.** La prop `frio` de `<Toma>` dessatura y mete
el lavado violeta. Así la misma toma sirve fría en un beat y cálida en otro.

**El fondo desenfocado se hornea, no se hace con CSS.** Un `blur(34px)` sobre una foto a pantalla
completa se re-rasteriza en cada frame y era la mayor parte del tiempo de render. Un JPEG de 320 px
ya suave cuesta cero:

```bash
convert <foto> -resize 320x -blur 0x22 -modulate 55,58 -quality 82 <foto>-fondo.jpg
```

**El vidrio necesita algo debajo.** `backdropFilter` sobre un degradado liso no tiene nada que
refractar y el panel se ve como plástico plano. El fondo desenfocado no es decoración: es lo que
hace que el glass se vea vidrio.

**El elemento que entra tarde ocupa su espacio desde el frame 0.** `useEntrada` sólo toca opacidad y
transform, así que un panel invisible sigue midiendo. Por eso nada se reacomoda cuando aparece. Si
en cambio lo montas condicionalmente, todo salta.

**Las ventanas de metraje van en segundos del archivo fuente**, no en frames del reel (`desde` /
`hasta` en `<Toma>`). Es lo que las hace verificables contra `ffprobe`.

**Los iconos se dimensionan contra el texto que acompañan**, no contra su archivo. Un icono más
chico que su etiqueta se lee como viñeta. Si eso obliga a un upscale de 1.5×, en arte plano no se
nota; si se nota, se re-exporta el PNG más grande, no se achica el icono.

---

## 5. Anatomía de un reel

Un solo archivo `src/reels/<Reel>.tsx`, y encima de todo un bloque de comentario que dice **de qué
va el reel y en qué actos está dividido**. Ese comentario es lo primero que se lee y lo primero que
se actualiza.

```tsx
export const VENDESOLO = { ... }        // 1. los datos: precio, auto, propuestas
const GUION = { gancho: [0,119], ... }  // 2. los frames medidos contra la voz
const Gancho = () => <Toma .../>        // 3. una escena por beat
export const ReelVendeSoloVideo = ...   // 4. el ensamble
```

Las piezas compartidas:

| Pieza | Dónde | Qué hace |
|---|---|---|
| `<Escena de dura>` | `ui.tsx` | monta un beat en su ventana de frames, con fundido |
| `<Toma src desde hasta frio abajo>` | `Vender.tsx` | metraje a pantalla completa, con degradado para el texto |
| `<Fondo fondo>` | `ui.tsx` | el degradado de marca + halos + la foto desenfocada |
| `<Vidrio>` | `ui.tsx` | el panel de vidrio con borde degradado |
| `<Titular> <Bajada> <Chip>` | `ui.tsx` | la tipografía del sistema |
| `useEntrada(retraso)` | `ui.tsx` | la entrada estándar (sube, aparece, se enfoca) |
| `<DS e={0.72}>` | `ui.tsx` | mete un componente de Concorde a escala del reel |
| `PilaPropuestas` | `pantallas.tsx` | las ofertas subiendo hacia la expectativa |

**Ojo con `DS`:** usa `zoom`, no `transform: scale()`. Concorde está diseñado para un móvil de
420 px y el reel mide 270; `zoom` encoge el componente **y su caja de layout**, que es lo que hace
que el flex de alrededor siga midiendo bien.

Se autoriza a 270×480 y se entrega a `--scale=4` → 1080×1920. Se trabaja en chico para que los
números sean los mismos que los del Figma del producto.

---

## 6. Cómo se decide una escena

No hay una regla dura, pero sí un criterio: **el metraje lleva la emoción, la UI lleva la prueba.**

- ¿El beat dice cómo se siente? → toma real. (el gancho, los dolores, la alerta)
- ¿El beat dice qué hace la plataforma? → componente de Concorde. (el aviso, las ofertas, el mensaje)
- ¿El beat dice un número o una regla? → tarjeta de vidrio. (el precio, los 25 SubasCoins)
- ¿El beat es puro remate? → tipografía sobre el fondo, sin contenedor.

Y un corte se justifica sólo si cambia algo. Los dos últimos beats de `VendeSolo` eran dos escenas y
se fusionaron en una: ninguna tenía metraje, las dos iban sobre el mismo fondo, y el corte sólo
anunciaba que empezaba otra tarjeta.

---

## 7. Dónde vive cada cosa — carrusel vs. reel

**Este es el mapa que evita el desorden.** El repo hace dos productos distintos.

### Carrusel (posts de una subasta puntual) — efímero, todo en `carrusel/`

| Carpeta | Qué es | ¿Al repo? |
|---|---|---|
| `carrusel/Materiales/<id>/` | fotos que bajó el scraper | **no** (`.gitignore`) |
| `carrusel/Materiales/cierre.png`, `logo.svg`, flechas | placas y flechas del carrusel | sí |
| `carrusel/remotion/public/autos/` | las mismas fotos, servidas a Remotion | **no** |
| `carrusel/Posts/<slug>/` | los PNG finales | **no** |
| `carrusel/remotion/src/posts/`, `src/subasta.ts` | la composición `Auto` | sí |
| `carrusel/nueva-subasta.sh`, `scraper.py`, `ajustar.sh` | el pipeline | sí |

Todo eso se regenera corriendo el script. Por eso no va al repo.

### Reel — irreemplazable, todo en `reels/`

| Carpeta | Qué es | ¿Al repo? |
|---|---|---|
| `reels/tomas/<reel>/video/` | las tomas **originales** del generador | **sí** |
| `reels/tomas/<reel>/voz/` | la locución original de ElevenLabs | **sí** |
| `reels/marca/` | iconos de marca en su tamaño original | **sí** |
| `reels/remotion/public/videos/` | las tomas ya parcheadas que usa el reel | **sí** |
| `reels/remotion/public/voz/` | las locuciones que usa el reel | **sí** |
| `reels/remotion/public/reel/` | fotos fijas y fondos que usan los reels | **sí** |
| `reels/remotion/public/personas/`, `frames/` | recortes y SVG de los reels | **sí** |
| `reels/remotion/public/brand/` | logo, tipografías, iconos | **sí** |
| `reels/remotion/src/reels/`, `reels/*-VENDESOLO.md` | el código y los documentos | **sí** |
| `reels/remotion/out/` | los mp4 renderizados | **no**, se regeneran |

**Por qué el material de reel sí va al repo:** una toma de un generador **no se puede volver a
pedir**. Aunque repitas el prompt exacto, sale otra. Lo mismo con la locución. Son ~50 MB que valen
más que su peso.

**La trampa que ya nos mordió, y que este layout cierra:** `nueva-subasta.sh` toma las fotos sueltas
de `carrusel/Materiales/`. Cuando el material de reel vivía en esa misma carpeta, un PNG olvidado
ahí se iba de portada a un carrusel. Ahora los dos árboles no se tocan: lo de reel entra por
`reels/tomas/` y el script del carrusel no puede verlo. La única regla que queda es no cruzarlos.

**Lo que sí quedó duplicado por el split:** `sans`, `gradient.borde` y `shadow.glassInset` en
`reels/remotion/src/brand/vmc.ts` y en `carrusel/remotion/src/brand/vmc.ts`, y el `vmc-logo.svg` en
los dos `public/brand/`. Si tocas uno, toca el otro en el mismo commit.

---

## 8. Qué haría yo si sigo

Ordenado por lo que más rinde primero.

1. **Un `data.json` por reel, fuera del `.tsx`.** Hoy `VENDESOLO` vive dentro del componente. Sacarlo
   permitiría `--props=` y rehacer el mismo reel con otro auto sin tocar código, que es exactamente
   lo que ya hace el carrusel.
2. **Un script que mida la voz y escupa el `GUION`.** Hoy se corre `silencedetect` a mano, se lee la
   tabla y se copian los números. Es mecánico y es donde se cuelan los errores. Un script de 30
   líneas que lea el mp3 y el guion en bloques y proponga los frames se paga solo en el segundo reel.
3. **Sacar `<Toma>` de `Vender.tsx` a `ui.tsx`.** `VendeSolo` la importa desde ahí, que funciona pero
   se lee raro: un reel importando de otro. Es un mover-y-listo.
4. **Subtítulos quemados.** Instagram se ve en silencio. Hoy los reels dependen de que el texto en
   pantalla cargue el mensaje, y funciona, pero no es lo mismo que subtitular. Ya tenemos los tiempos
   medidos por bloque, que es el 80% del trabajo.
5. **Una toma propia de la vendedora.** Todo el metraje es generado. Con una sesión de una tarde con
   una persona real y un auto real se resuelven las cuatro tomas de golpe, se acaban los problemas de
   fidelidad de personaje y de continuidad de auto, y sube un escalón de credibilidad.
6. **Retirar `Vender`.** `VendeSolo` lo reemplaza. Mientras los dos existan hay que mantener los dos.
7. **Medir en Instagram y volver.** No hay ningún dato de retención en este repo. Saber en qué
   segundo se caen cambiaría más el próximo reel que cualquier decisión de diseño de esta lista.

---

## 9. Pendientes abiertos

- **La ficha de `VendeSolo` dice «Suzuki Baleno» y el auto del clip no lo es.** Es un campo en
  `VENDESOLO` (`src/reels/VendeSolo.tsx`). Hay que decidir el nombre correcto o volverlo genérico.
- **El beat `alerta` usa metraje prestado de `Vender`** (`videos/alivio.mp4`). Calza bien —mismo
  sofá, misma luz— pero no es propio. El prompt para reemplazarlo (T7) está en
  `PROMPTS-VENDESOLO.md`.
- **`Vender` y `VendeSolo` cuentan lo mismo.** Decidir cuál se publica.
- **A los tres tutoriales les falta la voz.** `Registro`, `Consignar` y `Visitas` están montados,
  corren mudos y sus frames son una **estimación** por conteo de palabras, no una medición. Los
  bloques para pegar en ElevenLabs están en `VOZ-REGISTRO.md`, `VOZ-CONSIGNAR.md` y `VOZ-VISITAS.md`;
  cuando llegue cada toma se mide con `silencedetect` y se reemplazan `GUION` y la tabla del `VOZ-`,
  en el mismo commit.
- **¿El descuento por consignar en SubasCoins es real?** El modal de una oferta Negociable muestra
  `>S< 60 ó US$ 180` —o sea que en SubasCoins sale menos— y el de una En Vivo muestra un solo monto
  (`>S< 50`). **Ninguna de las dos fuentes lo dice**, y los T&C fijan el SubasCoin en un valor
  referencial de US$ 1.00 (IV.2.2.d). `Consignar` muestra la captura y no afirma nada. Si el
  descuento existe es un beneficio fuerte que el artículo debería decir; si no existe, los dos
  modales deberían mostrar lo mismo. Es la pregunta de contenido más valiosa que quedó abierta.
- **El artículo de consignación sigue enlazando su video viejo** (`BArqY0cM39I`), que recorre todo el
  camino hasta la sala en vivo —favoritos, scroll, cuenta regresiva, sala de espera— y muestra
  pantallas que ya no están en el artículo, incluida una amarilla de «Ya eres participante». Ese
  tramo es `[oferta-en-vivo] Es hora de participar`, no consignación.
- **El artículo de SubasPass promete más que el contrato.** Dice que el pase deja participar «sin
  restricciones … sin que tu nivel de riesgo limite tu participación»; los T&C condicionan el
  beneficio entero a que la cuenta esté «habilitada y libre de deuda y/o bloqueos por parte del
  vendedor» (IV.9.b) y lo declaran «inaccesible» mientras haya deuda (IV.9.c). `Consignar` dice la
  condición porque los Términos prevalecen, pero hay que alinear el artículo.
- **¿SubasPass anula también la comisión?** Su captura rotula la línea en cero como «Comisión >S< 0»
  y las dos fuentes hablan de la **consignación**. Si además anula el 7.5% de comisión, el pase vale
  mucho más de lo que el artículo cuenta y nadie lo está diciendo.
- **Los T&C se contradicen sobre la vigencia de SubasPass.** El glosario (II.24) dice «suscripción
  anual»; IV.9.d enumera mensual, trimestral, semestral y anual, que es lo que muestra el producto.
  `Consignar` sigue IV.9.d.
- **El artículo de visitas enlaza un video que pide mascarilla y distanciamiento social.** El
  artículo actual pide **DNI vigente** y revisar los requisitos del vendedor, y no menciona ninguna
  de las dos cosas. Es el más urgente de los tres videos viejos: no es información desactualizada,
  es una instrucción equivocada.
- **Falta la captura del paso 3 de visitas.** Las imágenes del artículo van `paso-1`, `paso-2` y
  `paso-4`. `Visitas` se las arregla usando `paso-2` dos veces con foco distinto, pero conviene saber
  si falta una captura en `CentroDeAyudaVMC`.
- **El artículo de registro se contradice con su propia captura.** Su Paso 1 dice «haz clic en el
  botón **Ingresar**» y la imagen que lo acompaña muestra un botón que dice **Ingresa**. El reel
  sigue la captura, que es lo que el usuario ve; hay que alinear el texto en el repo
  `CentroDeAyudaVMC`.
- **El scraper del skill `vmc-modelo-negocio` se salta los `div[role="alert"]`.** «No permitimos
  registros de terceros» está en el artículo publicado y no en `reference/centro-de-ayuda.md`. Es
  un agujero de validación, no sólo de este reel.
- **El artículo de registro sigue enlazando el video viejo de YouTube** (`DGFzz3IY_hg`), que camina
  por la compra de SubaCoins y una pasarela de pago que ya no son parte del registro. Mientras los
  dos convivan, el artículo se contradice a sí mismo.

---

## 10. Si sólo lees una cosa

Graba la voz primero. Mide la onda con `silencedetect`, no con un transcriptor. Pon los cortes en el
silencio. Todo lo demás de este documento es consecuencia de eso.
