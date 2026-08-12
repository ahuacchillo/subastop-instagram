# Carruseles de Instagram — VMC Subastas

Generador de piezas para @vmcsubastas: le das el código de una oferta de
vmcsubastas.com y te devuelve los 3 PNG del carrusel listos para publicar.

```bash
./nueva-subasta.sh 62996
# → Posts/62996-toyota-hilux/1.png 2.png 3.png 4.png + datos.json
```

El `4.png` es la placa de cierre (`Materiales/cierre.png`): se copia tal cual al
final de todos los carruseles, no pasa por Remotion y no cambia nunca.

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

**4. Render.** Delega en `./ajustar.sh <slug> --render`, que renderiza un slide
por vez desde el `datos.json` y copia la placa de cierre al final. Hay un solo
camino de render en todo el proyecto: lo que se arregla ahí, se arregla para
todos los modos de entrada.

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

En el prompt del orden alcanza con escribir la portada: `3` se completa a
`3 1 2` con las que falten, en el orden del listado. El carrusel siempre sale de
3 slides (o de las que haya, si hay menos).

### Datos del sitio, fotos mías

```bash
./subasta-fotos-propias.sh 62996 Materiales/toyota
```

Scrapea los ocho datos de la oferta pero arma el carrusel con las fotos de esa
carpeta. Para cuando la galería del sitio es mala o hay fotos mejores del patio.
Sí pregunta el orden: si las fotos las elegiste vos, cuál va de portada es una
decisión tuya, no del sitio.

Es un wrapper de `nueva-subasta.sh 62996 --fotos <carpeta>` — un solo generador,
tres formas de entrar.

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

## Ajustar el encuadre

La foto se monta con `objectFit: cover`, así que el recorte al 1080×1080 sale
del centro. Cuando eso se come parte del auto —está bajo en la foto, corrido, o
la foto es muy horizontal— se corrige por foto en el `datos.json`:

```json
"fotos": [
  { "src": "autos/x-1.jpeg", "foco": "50% 35%", "escala": 1.2 },
  "autos/x-2.jpeg"
]
```

`foco` es un `object-position` y mueve el recorte; `escala` acerca, y lo hace
alrededor del foco, no del centro. Un string suelto es lo mismo que
`"50% 50%"` con `escala: 1` — o sea, el comportamiento de siempre. Todos los
`datos.json` viejos siguen renderizando byte a byte igual.

Pero a mano no se aciertan esos números. Para eso está la página de encuadre:

```bash
./ajustar.sh 62915-dfsk-glory            # abre la página en el navegador
./ajustar.sh 62915-dfsk-glory --render   # rehace los PNG desde datos.json
```

Sin bandera abre una página local que hace una sola cosa: **arrastrás la foto
para moverla, rueda del mouse para acercar, y el botón guarda y renderiza.** Los
valores del `datos.json` los escribe ella; no hace falta tocarlos.

Los botones de arriba cambian de slide. El marco dibuja dónde caen el header, el
título, la píldora, la tarjeta y el logo: son guías para ver qué le tapan al
auto, no el render. El render sale al guardar, del mismo `--render` de siempre.

Dos cosas que confunden si no se saben:

- **Una foto apaisada no se mueve en vertical** hasta que la acerques. Recortada
  en cuadrado no sobra nada arriba ni abajo, así que no hay foto escondida para
  revelar; el zoom es el que crea ese margen.
- Es `python3` de la stdlib escuchando en `127.0.0.1:4173`. No instala nada y no
  sale de la máquina. Ctrl-C la cierra.

Para trabajar el componente en sí —mover coordenadas, tocar el glass— sigue
siendo el Studio (`cd social-content && npm run dev`). Esa es la herramienta del
que diseña la pieza; la página de encuadre es la del que arma el post.

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

### 8. El render no es 100% determinista

Renderizar el mismo slide dos veces puede dar PNG distintos. Medido: la
diferencia son ~2500 píxeles (0.2% de la imagen) concentrados en el texto de la
píldora de fecha — antialiasing, invisible a ojo. Es anterior a todo esto y no
afecta lo publicado, pero significa que no se puede usar el md5 como prueba de
que un cambio no rompió nada. Hay que mirar.

### 9. Fotos y renders fuera del repo

`Materiales/<auto>/` y `Posts/` están en `.gitignore`: son 50 MB que se
regeneran con el código de oferta. La consecuencia es que no hay historial
compartido de piezas publicadas. Si el equipo lo necesita, va a un Drive, no a
git.
