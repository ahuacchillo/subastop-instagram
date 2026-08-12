# Carruseles de Instagram — VMC Subastas

Generador de piezas para @vmcsubastas: le das el código de una oferta de
vmcsubastas.com y te devuelve los 3 PNG del carrusel listos para publicar.

```bash
./nueva-subasta.sh 62996
# → Posts/62996-toyota-hilux/1.png 2.png 3.png + datos.json
```

Sin código que editar. Los datos entran a Remotion por `--props`, así que se
puede correr dos veces seguidas con autos distintos sin que quede nada pegado.

---

## Ponerlo a funcionar

Hace falta `node` (18+), `npm` y `python3`. Nada más — el scraping usa solo
stdlib.

```bash
git clone git@github.com:ahuacchillo/subastop-instagram.git
cd subastop-instagram/social-content && npm install && cd ..
./nueva-subasta.sh 62996
```

El primer render se demora extra: Remotion se baja su Chrome headless solo. Los
siguientes van a ~13s por slide.

Si `npx remotion` falla por librerías del sistema (Linux limpio):

```bash
npx remotion browser ensure
```

### Comprobar que quedó bien

```bash
./nueva-subasta.sh 62996
```

Si imprime las 3 rutas de `Posts/` y los PNG abren, está funcional. Ese código
es una oferta real y sirve de prueba de humo.

---

## Cómo funciona

Cuatro etapas dentro de `nueva-subasta.sh`, en ese orden:

**1. Scraping.** La página de vmcsubastas viene renderizada del servidor, así
que los datos y las fotos están en el HTML — no hace falta navegador. Se sacan
con regex marca, modelo, año, transmisión, precio base, vendedor y fecha/hora
del proceso, y se bajan las 3 primeras fotos de la galería a `Materiales/<id>/`.
Se reintenta 3 veces: a veces el sitio contesta con la portada en vez de la
oferta, y se nota en que no hay galería.

**2. Datos.** Con URL o código no pregunta nada: lo que sale del sitio se da por
bueno. Con `--editar` se revisan los ocho campos uno por uno, y lo que el
scraping no encontró se pregunta siempre. Enter acepta el valor entre corchetes.

**3. Props.** Se arma un JSON por slide en un tempdir, y una copia legible en
`Posts/<slug>/datos.json` — con eso la pieza se rehace igual dentro de un año.
El slug lleva el código de oferta adelante (`62996-toyota-hilux`) porque es el
único nombre que no cambia si después se corrige la marca, y es lo que se busca
cuando hay que volver a la publicación original.

**4. Render.** `npx remotion still Auto --props=...` una vez por slide.

### Modos

```bash
./nueva-subasta.sh 62996                # código de oferta
./nueva-subasta.sh https://www.vmcsubastas.com/oferta/62996
./nueva-subasta.sh 62996 --editar       # igual, pero revisando cada dato
./nueva-subasta.sh Materiales/toyota    # fotos propias, sin scraping
./nueva-subasta.sh                      # fotos sueltas en Materiales/
```

Sin código de oferta el script pregunta todo y pide el orden de las fotos. La
primera del orden es la portada.

### Con Claude Code

```
/subasta 62996
```

Hace lo mismo pero con el paso de criterio incluido: mira las fotos antes de
elegir portada (si el título cae contra un cielo quemado propone otra) y revisa
los tres PNG al final. Definido en `.claude/commands/subasta.md`; el sistema
visual completo está en `.agents/skills/vmc-subastas-content/SKILL.md`.

---

## El diseño

```
social-content/src/
├── brand/vmc.ts          ← tokens VOYAGER. Fuente de verdad, única.
├── subasta.ts            ← subasta de ejemplo, solo para el Studio
├── posts/AutoSlide.tsx   ← el slide del carrusel
├── reels/                ← reel "Negociable" (aparte del script)
└── Root.tsx              ← composición `Auto`; el slide lo elige `indice`
```

Ningún componente define colores, sombras ni degradados propios: si un número no
está en `vmc.ts`, no existe. Las coordenadas son absolutas contra el frame de
1080×1080, iguales a las de Figma, para poder comparar render contra diseño sin
recalcular nada.

Dos reglas que se rompen solas si no se saben:

- **Marca y modelo salen únicamente en la primera imagen.** De la segunda en
  adelante se repite todo lo demás idéntico: es lo que hace que el carrusel se
  lea como una sola pieza al deslizar.
- **El borde degradado del glass no se puede hacer con `background-clip`.** Los
  rellenos son translúcidos y el degradado se ve a través, tiñendo la tarjeta de
  naranja. Va en capa aparte con máscara `xor` — ver `<BordeGlass>`.

Para trabajar el componente:

```bash
cd social-content && npm run dev
```

Abre el Studio con la subasta de ejemplo de `subasta.ts`. Se previsualiza el
slide 0; para ver los otros se cambia `indice` en el panel de props.

---

## Revisar antes de publicar

Este paso no se salta. Dos fallas que ya pasaron:

- **El título contra la foto.** El modelo va en blanco arriba a la derecha; si
  esa zona de la foto es cielo quemado, se pierde. Se resuelve eligiendo otra
  portada, no subiéndole sombra al texto.
- **La tarjeta de datos.** Un precio de cinco cifras deja la fila al límite de
  los 466px; uno de seis la revienta. Una transmisión larga ("Automática
  secuencial") hace lo mismo.

Después de publicar, la fila va a `RESULTADOS.md`. Las métricas se llenan a mano
desde IG Insights a las 72h. Antes de armar una pieza nueva se lee ese archivo:
el formato y el orden de fotos se eligen con lo que ya funcionó.

---

## Pendientes

Ordenados por lo que más duele.

### 1. Generador de copys — no existe

Es el hueco grande. Hoy el script deja los PNG y el copy se escribe a mano cada
vez, que es donde se pierde el tiempo y donde se pierde la consistencia.

Debería salir del mismo `datos.json` que ya se genera, en la misma corrida:

```
Posts/<slug>/
├── 1.png 2.png 3.png
├── datos.json          ← ya existe
└── copy.md             ← falta
```

Con dentro: caption de feed (gancho + datos + CTA + link), variante corta para
Stories, y el bloque de hashtags. Los datos ya están todos —marca, modelo, año,
precio, fecha, hora, tienda, código de oferta—, así que es un paso más al final
del script, no un proyecto aparte.

Lo que hay que definir antes de escribirlo: si el texto se arma con plantillas
(determinista, gratis, siempre igual) o con la API de Claude (mejor gancho,
distinto cada vez). La recomendación es plantillas con 3–4 variantes de gancho
rotando por tipo de auto, y subir a la API solo si el copy plantillado se nota
repetido en el feed.

### 2. Un bundle de Remotion por slide

~13s por slide porque cada `npx remotion still` bundlea de nuevo. Se arregla
pasando a la API de Node (`@remotion/renderer`), que bundlea una vez y renderiza
los tres. Marcado con `ponytail:` en el script. No corre prisa: 40s por carrusel
es tolerable.

### 3. `RESULTADOS.md` está vacío

Ocho carruseles publicados, cero métricas anotadas. Sin esos números el criterio
de portada es opinión. El experimento abierto es el orden de fotos: frontal →
interior → 3/4 contra uno que abra en 3/4.

### 4. El reel no está en el pipeline

`reels/Negociable.tsx` se renderiza a mano con `npm run reel` y sus datos están
quemados en la constante `NEGOCIABLE`. Si se va a usar seguido, merece el mismo
tratamiento que el carrusel: props por JSON y una entrada en el script.

### 5. Solo vmcsubastas.com

El scraping es específico de ese sitio. @subascars.pe no tiene scraper; ahí toca
el modo manual con fotos propias.

### 6. El scraping es regex contra HTML

Si vmcsubastas cambia el markup, se rompe. Falla ruidosamente (sale con "no
trajo fotos") en vez de renderizar datos vacíos, que es lo importante, pero
alguien va a tener que arreglar los patrones algún día.

### 7. El carrusel está fijo en 3 slides

Instagram acepta 10. Tres es una decisión, no un límite técnico, pero está
cableada en tres lugares (el `[:3]` del scraping, el `TODAS` del orden, y el
guion visual de las flechas).

### 8. Fotos y renders fuera del repo

`Materiales/<auto>/` y `Posts/` están en `.gitignore`: son 50 MB que se
regeneran con el código de oferta. La consecuencia es que no hay historial
compartido de piezas publicadas. Si el equipo lo necesita, va a un Drive, no a
git.
