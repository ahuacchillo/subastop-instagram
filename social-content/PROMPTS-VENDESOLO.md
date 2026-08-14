# Tomas — reel `VendeSolo`

Prompts para generar el metraje del reel *"tu auto se vende solo"* (`VendeSolo`, 270×480 @ 30 fps,
1590 frames = 53 s). Los prompts van **en inglés**: los generadores de video obedecen mucho mejor en
inglés, y el texto en pantalla no sale de aquí sino de Remotion.

**Regla que no se rompe:** ninguna toma lleva texto, subtítulos, logos ni marcas de agua. Todo el
texto es del reel.

## Estado — actualizado con las tomas generadas

Los frames son los definitivos, medidos contra la locución (ver `VOZ-VENDESOLO.md`). El reel dura
53 s, no 42.

| Beat | Frames | Qué se ve | Archivo |
|---|---|---|---|
| `gancho` | 0–119 | ella publica desde el sofá | ✅ `videos/sofa.mp4` (T1) |
| `painsA` | 119–208 | el teléfono sonando en la mesa | ✅ `videos/cocina.mp4` (T2) |
| `painsB` | 208–297 | la espera junto al auto | ✅ `videos/espera.mp4` (T2b) |
| `expectativa` | 297–393 | tarjeta del auto + monto tecleado | UI Remotion |
| `reglas` | 393–680 | 25 SubasCoins + 0% comisión | UI Remotion |
| `exposicion` | 680–870 | el auto + su tile en el marketplace | ✅ `videos/auto.mp4` (T5) + `OfferCard` |
| `negociacion` | 870–1059 | propuestas subiendo + mensaje del equipo | `BidProposal` + `BidMessage` |
| `alerta` | 1059–1199 | la notificación sobre su reacción | ♻️ `videos/alivio.mp4` |
| `cierre` | 1199–1590 | «te conectamos con tu comprador» → logo + CTA | un solo frame, sin metraje |

✅ generado · ♻️ reciclado del reel anterior.

**Lo único que sigue prestado es `alerta`**, con el sofá de `Vender`, y calza bien: misma luz, mismo
mueble.

`vinculacion` llevaba metraje prestado y **se le quitó**: el auto de esa toma era el Camry beige del
reel viejo, y un plano prestado que contradice la historia cuesta más de lo que aporta. Ahora el beat
es texto sobre el fondo de marca. **T8 quedó descartada**, no pendiente — el prompt sigue abajo por
si algún día se rehace la toma con el auto correcto.

---

## Bloques que se repiten en todos los prompts

Pégalos **literalmente iguales** en cada toma. La fidelidad no sale de pedirla una vez, sale de
repetir la misma descripción palabra por palabra.

### A · Personaje (referencia)

Sube la imagen de referencia del personaje y acompáñala con:

> **CHARACTER (reference image attached):** the exact same woman as in the reference image. Preserve
> her face 1:1 — same bone structure, same eyes, same eyebrows, same nose, same lips, same skin tone
> and skin texture, same hairstyle and hair length, same age. Do not beautify, do not slim, do not
> change her hair, do not age her up or down. Same wardrobe across all shots: plain heather-grey
> crew-neck t-shirt, dark trousers, no jewellery, no visible logos.

Si el generador acepta varias referencias, manda **dos**: un primer plano frontal y un plano medio.
Con una sola, la identidad se cae en cuanto la cabeza gira más de 3/4.

### B · Auto

Mismo auto en todas las tomas donde aparezca, con esta descripción exacta:

> **CAR:** a clean compact 5-door hatchback, 2020-era design, metallic silver-grey paint, smooth
> uncluttered bodywork, horizontal LED headlights, 16-inch multi-spoke alloy wheels, lightly tinted
> rear windows, freshly washed with soft reflections on the panels. No license plate, no badges, no
> dealer stickers, no roof rack, no damage.

Es un Suzuki Baleno 2020 plata en la data del reel (`VENDESOLO` en `src/reels/VendeSolo.tsx`), pero
**no le pidas la marca al generador**: los logos que inventa salen mal y hay que borrarlos después.
Descripción genérica y consistente rinde más que una marca mal escrita.

### C · Técnica

> **TECHNICAL:** vertical 9:16, 1080×1920, 24 fps, shallow depth of field, 35 mm look, natural light,
> realistic skin, subtle handheld micro-movement, no camera shake. Photoreal, cinematic, not stylised.
> **No text, no captions, no subtitles, no watermark, no logos, no UI overlays anywhere in frame.**

### D · Negativo

> text, captions, subtitles, watermark, logo, brand marks, extra fingers, deformed hands, warped
> face, identity drift, plastic skin, over-smoothed skin, cartoon, anime, 3D render, motion blur
> smear, jump cut, zoom punch, fast camera moves

---

## T1 · `gancho` — ella publica y se relaja

**✅ Generada** → `public/videos/sofa.mp4`, ventana 0.2–4.3 s.

**Dura:** 4.5 s (pide 6 s y recorta). **Texto del reel:** abajo a la izquierda, tres líneas.
→ **Deja el tercio inferior limpio y oscuro.** Su cara va en el tercio superior-medio.

**Still (imagen base):**

> [BLOQUE A] Medium shot, seated on a beige fabric sofa in a warm sunlit living room, late-afternoon
> golden light through sheer curtains, a plant blurred in the background. She is holding a phone in
> both hands, looking down at it, relaxed, with a small satisfied smile — the smile of someone who
> just finished something, not of someone posing. Her body is loose, shoulders down, one leg tucked
> under her. Camera slightly below eye level, 3/4 from her left. Background soft and out of focus.
> [BLOQUE C]

**Movimiento (image-to-video):**

> Very slow push-in. She scrolls the phone once with her thumb, then lowers it to her lap and looks
> off toward the window, smile widening slightly, and exhales. Nothing else moves. No cuts.

---

## T2 · `pains` — lo que ya no va a pasar

**✅ Generadas las dos** → `public/videos/cocina.mp4` (1.9–5.0 s) y `public/videos/espera.mp4`
(0.3–3.4 s). El beat quedó partido en dos escenas, `painsA` y `painsB`.

**Dura:** 4.5 s. **Texto del reel:** tres líneas tachadas, arriba a la izquierda.
→ **Deja el tercio superior sin cabezas ni detalle.** El reel le mete arriba un degradado oscuro y
un filtro frío (`frio` en el código): no lo generes ya frío, lo pone Remotion.

**Still:**

> [BLOQUE A] Medium-wide shot of a plain kitchen table. In the foreground, sharp, a phone lies face
> up on the table, screen lit with an incoming call. Behind it, out of focus, she sits back in a
> chair with her chin resting on her hand, looking at the phone without picking it up, tired and
> unamused. Flat overcast daylight from a window on the left, cold and dull. Camera at table height,
> the top third of the frame is empty wall. [BLOQUE C]

**Movimiento:**

> The phone vibrates twice on the table, screen lighting up each time. She does not pick it up; she
> looks away and rubs her eye. Static camera, no cuts.

**T2b (opcional, si quieres partir el beat en dos):**

> [BLOQUE A][BLOQUE B] Wide shot, suburban street. She stands beside the car with her arms crossed,
> looking down the empty street, waiting for someone who has not arrived. Overcast, flat light.
> Static camera. She shifts her weight and checks her phone. [BLOQUE C]

Si generas T2b hay que partir el beat en dos `Escena` de ~67 frames en `VendeSolo.tsx`.

---

## T3 · `expectativa` — OPCIONAL, no generada

Hoy este beat es una tarjeta renderizada (foto del auto + el monto tecleándose). **No hace falta
metraje.** Sólo si prefieres el beat sobre video:

> [BLOQUE A] Extreme close-up of her hands holding a phone, thumbs typing numbers on the screen with
> a calm, decided rhythm. The screen content is blurred out — unreadable. Warm indoor light, shallow
> focus on the hands, her face out of frame. [BLOQUE C]

Si la usas, la tarjeta pasa a ir encima del video, no en el fondo violeta.

---

## T5 · `exposicion` — el auto luciéndose

**✅ Generada** → `public/videos/auto.mp4`, ventana 3.4–9.7 s. Salió como recorrido handheld
estilo iPhone en vez del orbit descrito, y funciona mejor: se lee como un video que grabó el dueño.
De ahí sale también la foto de la ficha (`autos/vendesolo-auto.jpg`), para que el auto de la tarjeta
y el del metraje sean el mismo.

**Dura:** 5 s. **Texto del reel:** chip + tres líneas arriba, y tres píldoras de oferta subiendo
abajo a la izquierda. → **Limpio arriba y en la franja inferior izquierda.** El auto va al centro-derecha.

**Still:**

> [BLOQUE B] Beauty shot of the car parked at an angle on a clean paved area, empty background,
> early evening light, low sun raking across the side of the body, soft reflections travelling along
> the doors. Front 3/4 view from a low camera position, the car occupying the centre-right of a
> vertical frame. No people in the shot. Uncluttered, premium, calm. [BLOQUE C]

**Movimiento:**

> Slow orbit to the right around the front of the car, about 15 degrees, while the reflection slides
> along the bodywork. No people enter frame. No cuts.

---

## T7 · `alerta` — llega la oferta buena

**⏳ Pendiente.** Hoy corre con `videos/alivio.mp4` reciclado, que calza bastante bien.

**Dura:** 4 s. **Texto del reel:** tarjeta de notificación abajo, ancha.
→ **Deja los 140 px inferiores despejados.** La cara, arriba y a la derecha.

**Still:**

> [BLOQUE A] Close-up, same warm living room as the first shot. She is sitting on the sofa looking
> slightly off-camera, calm. Her phone is on the low table in front of her, in the lower part of the
> frame but out of focus. Warm golden light. Camera at eye level, framed so her face sits in the
> upper right of a vertical frame. [BLOQUE C]

**Movimiento:**

> The phone lights up and buzzes on the table. She glances down at it, her eyebrows lift in surprise,
> then she breaks into a real, delighted smile and covers her mouth for a second. Genuine reaction,
> not theatrical. Static camera, no cuts.

---

## T8 · `vinculacion` — el bye bye

**✂️ Descartada.** El beat se resolvió con texto sobre el fondo. El prompt queda por si se retoma.

**Dura:** 4 s. **Texto del reel:** chip + dos líneas + bajada, abajo a la izquierda.
→ **Deja el tercio inferior limpio.** Ella a la izquierda, el auto alejándose a la derecha.

**Still:**

> [BLOQUE A][BLOQUE B] Wide shot from the sidewalk of a quiet residential street, warm late-afternoon
> light. She stands on the left of the frame, in the foreground, her back three-quarters to camera,
> raising one hand in a small goodbye wave. The car is driving slowly away from her down the street,
> already some distance off, seen from behind. A driver is visible inside as a silhouette only. She
> looks content, at peace. [BLOQUE C]

**Movimiento:**

> The car drives calmly away down the street, getting smaller. She waves once, lowers her hand, and
> turns her head slightly to watch it go, smiling. Static camera. No cuts.

---

## Después de generar

1. **Marca de agua — revísala, no la asumas.** De las cuatro tomas de esta tanda, tres vinieron
   limpias y sólo `auto.mp4` traía el brillito de cuatro puntas. No lo recortes — te come el
   encuadre. Párchalo en origen:

   ```bash
   # 720×1280, marca al 78% / 88% (la de auto.mp4)
   ffmpeg -i <original> -vf "delogo=x=560:y=1125:w=90:h=90" \
          -c:v libx264 -crf 18 -an social-content/public/videos/<nombre>.mp4

   # 1080×1920, marca al 84% / 90% (las tomas viejas de `Vender`)
   ffmpeg -i <original> -vf "delogo=x=855:y=1675:w=125:h=125" ...
   ```

   Si viene limpia, con copiar el stream basta: `ffmpeg -i <original> -c:v copy -an <destino>`.

2. **`-an` a propósito.** El audio de origen es ruido de sala y pelea con la locución.

3. **Conectar la toma.** En `src/reels/VendeSolo.tsx`, cambia el `src` del `<Toma>` del beat y ajusta
   `desde` / `hasta`, que están **en segundos del archivo fuente**, no en frames del reel. Los
   comentarios `ponytail:` marcan exactamente dónde.

4. **Genera un segundo de más por punta.** Los cortes se van a mover cuando se retimee el reel a la
   locución (ver `VOZ-VENDESOLO.md`), y una toma justa deja el beat corto.
