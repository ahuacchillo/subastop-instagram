# Locución — Cómo funciona vender en VMC · para ElevenLabs

Voz en off **femenina**, español latino neutro (Perú-friendly), para el reel de 42.2 s
(`out/vender.mp4`, composición `Vender`).

**Ya está grabada.** La toma en uso es `public/voz/vender.mp3` — Jessica (*Playful, Bright,
Warm*), Eleven v3, **una sola toma corrida** de 41.6 s. Como vino corrida y no beat por beat,
pasó lo mismo que con Negociable: **el reel se retimó al audio**, no al revés. Los frames de
`GUION` en `src/reels/Vender.tsx` salen de las pausas medidas sobre el archivo.

La toma también **reescribió algunas líneas** respecto del guión original que está más abajo
(«un montón de trabajo», «Explicas, esperas, repites», «te terminan bajando», «cuánto vale tu
auto para ti», «Lo sacamos al mercado», «Así de simple»). Manda lo grabado: los titulares del
acto 1 en pantalla se alinearon palabra por palabra con la voz.

Un solo mensaje: **ella pone el precio, VMC lo consigue**. La voz nunca explica cómo publicar,
cuánto cuesta, ni qué es una Oferta Negociable. Eso es otro reel (`Negociable`).

---

## Casting de la voz

| Atributo | Qué buscar |
|---|---|
| Género | Femenino |
| Edad percibida | 28–38 |
| Acento | Español latinoamericano **neutro**. Evitar rioplatense, ibérico y mexicano marcado |
| Timbre | Cálido, medio-grave, cercano |
| Energía | Baja y seca en el acto 1; firme —no eufórica— desde la bisagra |

Si se consigue **la misma voz de `negociable.mp3`** (Kate, Eleven v3), mejor: las dos piezas
salen de la misma cuenta y conviene que suenen a la misma marca.

## La diferencia de tono con Negociable

En `VOZ-NEGOCIABLE.md` la voz es cómplice y entusiasta: vende una plataforma fácil y barata.
Aquí es **firme**. El mensaje no es "qué fácil", es "nosotros nos hacemos cargo". La línea
`No cerramos por menos` tiene que sonar a compromiso, no a eslogan. Si la toma sale animada
tipo comercial, está mal.

## Ajustes sugeridos

- **Modelo:** Eleven v3 para las etiquetas de emoción; Multilingual v2 si prefieres estabilidad.
- **Stability:** media-baja (~0.40 / preset *Natural*).
- **Similarity:** ~0.75. **Style:** bajo. **Speaker boost:** on.
- **Speed:** 1.0.

## Pronunciación

- **VMC** → deletreado: "ve, eme, ce".
- **US$ 12,000** → escribe *doce mil dólares*.
- **US$ 11,300** → escribe *once mil trescientos*.
- **Marketplace** → "márket-pleis". Si la voz lo lee raro, cámbialo por *vitrina*.

---

## Lo que está grabado hoy

Medido sobre `public/voz/vender.mp3`. «Habla» son los segundos en que suena cada línea; el
corte de escena va en el silencio siguiente. Los frames son los de `GUION`.

| # | Beat (`GUION`) | Frames | Habla | Locución tal como quedó |
|---|---|---|---|---|
| 1 | `calleA` | 0–100 | 0.00–2.94 | Vender tu auto por tu cuenta es un montón de trabajo. |
| 2 | `tramites` | 100–204 | 4.28–6.06 | Explicas, esperas, repites, |
| 3 | `calleB` | 204–305 | 7.17–9.72 | y al final siempre te terminan bajando el precio. |
| 4 | `bisagra` | 305–451 | 10.52–14.62 | En VMC, no. Nosotros nos encargamos de conseguir el precio que quieres. |
| 5 | `paso1` | 451–605 | 15.40–19.66 | Tú nos dices cuánto vale tu auto para ti, y ese número se vuelve nuestro objetivo. |
| 6 | `paso2` | 605–721 | 20.54–23.54 | Lo sacamos al mercado, lo ponemos en nuestro marketplace |
| 7 | `paso3` | 721–861 | 24.14–28.08 | y cuando empiezan a llegar las propuestas, la negociación la manejamos nosotros. |
| 8 | `paso4` | 861–975 | 28.66–32.26 | No cerramos por menos, vamos por el número que pusiste. |
| 9 | `paso5` | 975–1081 | 32.82–35.74 | Y en el momento justo en que se cumple, cerramos. |
| 10 | `cierre` | 1081–1265 | 36.38–41.44 | Así de simple: tú pones el precio, nosotros lo conseguimos. VMC. |

### Cómo se midieron los cortes

Con el detector de energía, **no** con la transcripción. Las marcas de palabra de un
transcriptor no coinciden con la onda: cuatro cortes derivados de ellas caían encima de la voz.

```
ffmpeg -i public/voz/vender.mp3 -af silencedetect=noise=-30dB:d=0.20 -f null -
```

El corte va al punto medio de cada silencio. Para comprobar uno, mide 0.24 s a su alrededor:
la voz en esta toma corre a **−17/−20 dB** y los silencios tocan **−62 dB**, así que un corte
limpio mide por debajo de −50.

```
ffmpeg -ss <t-0.12> -t 0.24 -i public/voz/vender.mp3 -af volumedetect -f null -
```

---

## Guión original

Lo que se pidió antes de grabar. Se conserva porque es la intención de cada beat; la letra
exacta la manda la tabla de arriba.

| # | Locución pedida | Intención |
|---|---|---|
| 1 | Vender tu auto por tu cuenta es un trabajo. | Constatación, sin drama. No es una queja |
| 2 | Explicar. Esperar. Repetir. | Seca, cansada. Tres palabras, tres silencios |
| 3 | Y al final, siempre te quieren bajar el precio. | Resignación. Cae al piso al terminar |
| 4 | En VMC no. Nosotros nos encargamos de conseguir tu precio. | **El giro.** Firme, casi seria. *No es alegría, es respaldo* |
| 5 | Tú nos dices cuánto quieres por tu auto. Ese número es el objetivo. | Directa. *Tú* va marcado |
| 6 | Salimos al mercado y lo ponemos en nuestro marketplace. | Práctica, sin adornos |
| 7 | Empiezan a llegar propuestas, y la negociación la manejamos nosotros. | Alivio: eso ya dejó de ser tu problema |
| 8 | No cerramos por menos. Vamos por el número que pusiste. | La promesa dura. Marcar *no cerramos por menos* |
| 9 | Y en el momento en que se cumple, cerramos. | Resolución limpia. Punto final, no celebración |
| 10 | Tú pones el precio. Nosotros lo conseguimos. VMC. | Cálida. Invitación, no orden |

---

## Bloque para pegar — Eleven v3 (con etiquetas)

Solo hace falta si se **regraba**. Las etiquetas entre corchetes son instrucciones de
actuación: no se leen.

```
[matter-of-fact] Vender tu auto por tu cuenta es un trabajo.
```
```
[tired] Explicar... Esperar... Repetir.
```
```
[resigned] Y al final, siempre te quieren bajar el precio.
```
```
[confident] En VMC no. Nosotros nos encargamos de conseguir tu precio.
```
```
[warm] Tú nos dices cuánto quieres por tu auto. Ese número es el objetivo.
```
```
[matter-of-fact] Salimos al mercado y lo ponemos en nuestro marketplace.
```
```
[reassuring] Empiezan a llegar propuestas, y la negociación la manejamos nosotros.
```
```
[firm] No cerramos por menos. Vamos por el número que pusiste.
```
```
[calm] Y en el momento en que se cumple, cerramos.
```
```
[warm] Tú pones el precio. Nosotros lo conseguimos. Ve, eme, ce.
```

## Bloque limpio — Multilingual v2 (sin etiquetas)

La emoción la carga la puntuación: los puntos suspensivos abren aire, las comas marcan el
énfasis. Mismo orden, un beat por generación.

```
Vender tu auto por tu cuenta es un trabajo.
Explicar... Esperar... Repetir.
Y al final, siempre te quieren bajar el precio.
En VMC no. Nosotros nos encargamos... de conseguir tu precio.
Tú nos dices cuánto quieres por tu auto. Ese número es el objetivo.
Salimos al mercado y lo ponemos en nuestro marketplace.
Empiezan a llegar propuestas, y la negociación la manejamos nosotros.
No cerramos por menos. Vamos por el número que pusiste.
Y en el momento en que se cumple, cerramos.
Tú pones el precio. Nosotros lo conseguimos. Ve, eme, ce.
```

---

## Si se regraba

El montaje ya está hecho: `<Audio src={staticFile("voz/vender.mp3")} />` vive en
`ReelVenderVideo`. Reemplazar el mp3 **no basta** — `GUION` está medido contra esta toma, y
otra toma tiene otras pausas.

Para cambiar la voz:

1. Exporta a `public/voz/vender.mp3`.
2. Corre `silencedetect` (comando arriba) y saca los silencios.
3. Mueve cada beat de `GUION` al punto medio del silencio que le corresponde, y ajusta la
   última cifra de cada par para que los beats queden pegados sin huecos.
4. Reajusta las ventanas `desde`/`hasta` de los cinco `<Toma>`: cada escena de video necesita
   `dura + 12` frames de metraje (el `SOLAPE` del fundido), o congela en el último frame.
5. Verifica con `volumedetect` que los nueve cortes midan por debajo de −50 dB.

**Si en cambio generas una toma por beat** —diez archivos, uno por línea— nada de esto hace
falta: cada línea cae en su escena y el silencio lo pone el montaje. Es el camino corto, y es
el que conviene pedir la próxima vez.
