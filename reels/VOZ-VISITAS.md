# Locución — reel `Visitas` · para ElevenLabs

Voz en off **femenina**, español latino neutro (Perú-friendly), para el tercer tutorial
(`Visitas`, `out/visitas.mp4`).

**No está grabada todavía.** Este documento es la orden de trabajo: se pega el bloque de abajo en
ElevenLabs, se descarga la toma a `remotion/public/voz/visitas.mp3`, se mide, y **recién ahí** el
reel tiene sus frames de verdad. Mientras tanto la composición corre muda y su `GUION` es una
estimación — está marcada como tal en `remotion/src/reels/Visitas.tsx`.

Un solo mensaje: **puedes ir a verlo antes de ofertar, y agendar son tres pasos.** La voz no explica
qué es consignar, ni cómo se oferta, ni qué pasa si ganas. Cada una de esas es otro artículo del
Centro de Ayuda y, cuando toque, otro reel.

---

## Casting

Mismo casting que `Registro` y `Consignar`. Los tutoriales son una serie y la voz es lo que los hace
sonar como una.

| Atributo | Qué buscar |
|---|---|
| Voz | **Jessica** (*Playful, Bright, Warm*), la misma de los otros cuatro reels |
| Modelo | **Eleven v3** — es el que respeta las etiquetas de emoción |
| Género / edad | Femenino, 28–38 |
| Acento | Español latinoamericano **neutro**. Nada de rioplatense, ibérico ni mexicano marcado |
| Energía | De alguien que te guía por encima del hombro, no de comercial |

**Ajustes:** Stability media-baja (~0.40, preset *Natural*) · Similarity ~0.75 · Style bajo ·
Speaker boost on · Speed 1.0.

## El tono, contra los otros dos tutoriales

Las reglas de siempre valen: decir los botones tal cual (*Ver detalle*, *Visitas*, *Agenda tu
visita*), no correr, y vender en las puntas.

Lo que cambia acá es que **este es el tutorial amable de los tres**. `Consignar` habla de plata que
sale de una billetera y va plano; éste habla de algo que **no cuesta nada** —basta estar registrado—
y puede permitirse ser cálido de principio a fin. Es el reel más fácil de leer bien.

Con una excepción: los bloques **4, 5 y 6** llevan datos que arruinan un plan si se pasan por alto
—las 48 horas, que la dirección exacta no está en la pantalla, y que entra una sola persona—. Esos
van **claros y sin apuro**, con la misma energía cálida pero sin sonreír por encima del dato. No son
advertencias: son cosas que alguien necesita oír bien la primera vez para no manejar hasta un almacén
en vano.

El bloque 5 es el más importante de la toma. Es el que evita el viaje perdido.

## Pronunciación — escríbelo así en el prompt, no como se escribe

| Se escribe | Se manda |
|---|---|
| VMC | `ve eme ce` |
| vmcsubastas.com | `ve eme ce subastas punto com` |
| DNI | `de ene i` — se deletrea |
| 48 horas | `cuarenta y ocho horas` |
| Ver detalle · Visitas · Agenda tu visita | tal cual, son rótulos de la pantalla |

---

## La toma, para pegar de una

**Una sola toma corrida.** No la grabes beat por beat: los empalmes se notan y el reel se retimea
igual al final. Pega esto tal cual en ElevenLabs v3:

```
[warm, inviting] Antes de ofertar puedes ir a verlo en persona. Agendar la visita son tres pasos, y lo único que necesitas es estar registrado.

[clear, instructive] Elige la oferta que te interesa y entra a Ver detalle.

[bright] Baja hasta la sección Visitas y ábrela. No todas las ofertas la tienen.

[steady, guiding] Elige fecha y hora, y toca Agenda tu visita. Tiene que ser con más de cuarenta y ocho horas de anticipación.

[clear, unhurried] La ubicación está en Información general, pero solo el distrito. La dirección exacta te llega por correo al agendar.

[steady, guiding] El día de la visita lleva tu de ene i vigente. Entra una sola persona, y la inspección es solo visual.

[warm, closing] Y listo. Vas, lo ves, y después decides si ofertas. Todo está en ve eme ce subastas punto com.
```

Los saltos de línea dobles son las pausas. Son los cortes de escena: si la voz los come, la toma no
sirve y hay que regrabar con `...` al final de cada bloque.

### De dónde sale cada frase

Ninguna línea es de cosecha propia: todas salen de los Términos y Condiciones o del Centro de
Ayuda. La trazabilidad completa —incluido lo que está sólo en pantalla— está en `GUION-VISITAS.md`
§Validación. Los cuatro que conviene tener a mano al dirigir la toma:

- **«lo único que necesitas es estar registrado»** es literal del artículo («solo debes estar
  registrado como usuario de nuestro servicio») y es la barra más baja de todo el producto: sin
  consignar, sin SubasCoins, sin habilitación. Dilo con algo de alivio — todo lo demás en VMC cuesta
  algo, y esto no.
- **«con más de cuarenta y ocho horas de anticipación»** es literal, y la coletilla que la sigue en
  pantalla («salvo que el detalle de la oferta diga otra cosa») también. No la endurezcas al leerla:
  es un plazo, no un reto.
- **«la dirección exacta te llega por correo al agendar»** es la línea más útil del reel. Alguien que
  agenda y después busca una dirección en la página **no la va a encontrar**, porque no está ahí.
  Va clara y sin apuro, con un respiro antes.
- **«entra una sola persona»** viene del aforo del almacén del vendedor, no de una regla de VMC. Dilo
  como un dato del lugar, no como una prohibición.

## Los tiempos — **estimados, no medidos**

Nadie ha grabado esto todavía. La tabla de abajo es aritmética, no una medición: el conteo de
palabras de cada bloque a **3.21 palabras/s** —el ritmo real de `vendesolo.mp3`, 150 palabras en
46.8 s de habla— más **0.73 s** de silencio entre bloques, que es la pausa promedio de esa misma
toma. Los cortes se pusieron 0.15 s después del final del habla.

| # | Beat (`GUION`) | Frames | Habla (est.) | Palabras | Emoción | Locución |
|---|---|---|---|---|---|---|
| 1 | `gancho` | 0–219 | 0.00–7.17 | 23 | cálida, invitando | Antes de ofertar puedes ir a verlo en persona. Agendar la visita son tres pasos, y lo único que necesitas es estar registrado. |
| 2 | `oferta` | 219–344 | 7.90–11.32 | 11 | clara, instructiva | Elige la oferta que te interesa y entra a Ver detalle. |
| 3 | `visitas` | 344–488 | 12.05–16.10 | 13 | brillante | Baja hasta la sección Visitas y ábrela. No todas las ofertas la tienen. |
| 4 | `fechahora` | 488–706 | 16.83–23.37 | 21 | firme, guiando | Elige fecha y hora, y toca Agenda tu visita. Tiene que ser con más de cuarenta y ocho horas de anticipación. |
| 5 | `direccion` | 706–905 | 24.10–30.02 | 19 | clara, sin apuro | La ubicación está en Información general, pero solo el distrito. La dirección exacta te llega por correo al agendar. |
| 6 | `eldia` | 905–1105 | 30.75–36.67 | 19 | firme, guiando | El día de la visita lleva tu DNI vigente. Entra una sola persona, y la inspección es solo visual. |
| 7 | `cierre` | 1105–1253 | 37.40–41.76 | 14 | cálida, cerrando | Y listo. Vas, lo ves, y después decides si ofertas. Todo está en vmcsubastas.com. |

**Total estimado: 41.8 s / 1253 frames.** Es el más corto de los tres tutoriales, y tiene sentido:
el flujo son tres pasos, no cuatro ni dos-por-dos. El error esperable es de ±10% y el sesgo es hacia
**más largo**.

El bloque 2 son 3.4 s y es una **línea de tránsito**: nombra una pantalla y un botón. Si la toma lo
estira más allá de 5 s, la voz está poniendo énfasis donde no toca.

### Cuando llegue la toma — los cuatro pasos, en orden

1. Guarda el original en `tomas/visitas/voz/` y la copia que usa el reel en
   `remotion/public/voz/visitas.mp3`. Mismo nombre en las dos.
2. Mide la onda. **Con el detector de energía, no con una transcripción** — las marcas de palabra
   de un transcriptor no coinciden con la onda, y en `vender.mp3` cuatro cortes derivados de ellas
   cayeron encima de la voz:

   ```bash
   ffmpeg -i remotion/public/voz/visitas.mp3 -af silencedetect=noise=-35dB:d=0.15 -f null -
   ```

   El umbral es por toma: `vender.mp3` se mide a −30 dB y `vendesolo.mp3` a −35 dB. Ajústalo hasta
   que el número de huecos tenga sentido contra la puntuación del guion. **Este guion tiene seis
   límites de bloque**, y una trampa propia: el respiro pedido antes de «la dirección exacta» va a
   aparecer como un hueco **dentro** del bloque 5 y no es un corte.
3. Reescribe `GUION` en `remotion/src/reels/Visitas.tsx` y esta tabla. Van siempre juntos. Cada
   corte va **en el medio del silencio, sesgado ~0.2 s hacia adelante**, para que la escena entrante
   ya esté puesta cuando arranca la línea siguiente.
4. Descomenta el `<Audio>` en `ReelVisitasVideo` — hoy la composición es muda a propósito.

Y si la toma sale más larga, **manda la toma**: el reel dura lo que dura la voz.
