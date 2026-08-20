# Locución — reel `Consignar` · para ElevenLabs

Voz en off **femenina**, español latino neutro (Perú-friendly), para el segundo tutorial
(`Consignar`, `out/consignar.mp4`).

**No está grabada todavía.** Este documento es la orden de trabajo: se pega el bloque de abajo en
ElevenLabs, se descarga la toma a `remotion/public/voz/consignar.mp3`, se mide, y **recién ahí** el
reel tiene sus frames de verdad. Mientras tanto la composición corre muda y su `GUION` es una
estimación — está marcada como tal en `remotion/src/reels/Consignar.tsx`.

Un solo mensaje: **para participar hay que consignar, y son dos taps.** La voz no explica qué es un
bid, ni cómo se compite en la sala, ni cómo se recarga la billetera paso a paso. Cada una de esas es
otro artículo del Centro de Ayuda y, cuando toque, otro reel.

---

## Casting

Mismo casting que `Registro`, y a propósito: los tutoriales son una serie y la voz es lo que los
hace sonar como una.

| Atributo | Qué buscar |
|---|---|
| Voz | **Jessica** (*Playful, Bright, Warm*), la misma de `vender.mp3`, `vendesolo.mp3` y `registro.mp3` |
| Modelo | **Eleven v3** — es el que respeta las etiquetas de emoción |
| Género / edad | Femenino, 28–38 |
| Acento | Español latinoamericano **neutro**. Nada de rioplatense, ibérico ni mexicano marcado |
| Energía | De alguien que te guía por encima del hombro, no de comercial |

**Ajustes:** Stability media-baja (~0.40, preset *Natural*) · Similarity ~0.75 · Style bajo ·
Speaker boost on · Speed 1.0.

## El tono, contra `Registro`

Las tres reglas del tono de `Registro` valen igual acá: decir los botones tal cual (*Participa*,
*Acepto*, *Negocia ahora*, *Proponer*), no correr, y vender en las puntas. Lo que cambia es una
cuarta, y es la que define esta toma.

**Este reel habla de plata que sale de la billetera de alguien.** `Registro` no cobra nada; este
explica un débito automático, un compromiso con sanción y un cobro del 3.9%. Los tres bloques que
tocan eso —el 3, el 4 y el 7— van **planos, sin sonrisa**. No graves ni de advertencia: planos. Una
voz entusiasta sobre «el sistema debita el monto de tu Billetera» suena a que le están escondiendo
algo al que escucha, y es lo único que este reel no se puede permitir.

El bloque 4 es el más importante de la toma. Es el que evita una sanción.

Y el **bloque 8 es el único que vende**, así que es el único que sube: es SubasPass, y llega justo
después de siete bloques planos hablando de plata que sale. Ese contraste es todo su efecto — si la
toma lo lee con la misma energía que los anteriores, deja de leerse como una salida. Pero la segunda
mitad («con tu cuenta habilitada y sin deuda») vuelve a plano: es una condición, no un beneficio.

## Pronunciación — escríbelo así en el prompt, no como se escribe

| Se escribe | Se manda |
|---|---|
| VMC | `ve eme ce` |
| vmcsubastas.com | `ve eme ce subastas punto com` |
| SubasCoins | `subascoins` — una palabra, acento en *coins* |
| bid | `bid` — como en inglés, no `bíd` ni `bi de` |
| SubasPass | `subas pass` — dos golpes, acento en *pass* |
| >S< 30 | `treinta subascoins` — el símbolo no se lee |
| >S< 50 | no se lee: el monto vive en pantalla, no en la voz |

---

## La toma, para pegar de una

**Una sola toma corrida.** No la grabes beat por beat: los empalmes se notan y el reel se retimea
igual al final. Pega esto tal cual en ElevenLabs v3:

```
[warm, inviting] Para participar en una oferta de ve eme ce hay que consignar. Son dos taps, y el sistema debita solo. Te muestro los dos casos.

[clear, instructive] En el detalle de la oferta, con tu sesión iniciada, toca Participa.

[flat, matter-of-fact] Ahí ves el monto a consignar. Toca Acepto y el sistema lo debita de tu Billetera.

[serious, no smile] Y ojo: al aceptar te comprometes a conectarte a la sala y enviar por lo menos un bid válido.

[clear, instructive] En una oferta Negociable no hay botón de aceptar: toca Negocia ahora.

[steady, guiding] Al iniciar la negociación se debita la consignación, y ahí mismo digitas el monto que propones.

[flat, matter-of-fact] Para todo esto necesitas fondos. Los cargas desde tu Billetera, con subascoins o con una recarga.

[bright, offering] Y si vas a participar seguido, con subas pass consignas cero. Desde treinta subascoins al mes, con tu cuenta habilitada y sin deuda.

[warm, closing] Con eso ya puedes consignar y entrar a la sala. Todo está en ve eme ce subastas punto com.
```

Los saltos de línea dobles son las pausas. Son los cortes de escena: si la voz los come, la toma no
sirve y hay que regrabar con `...` al final de cada bloque.

### De dónde sale cada frase

Ninguna línea es de cosecha propia: todas salen de los Términos y Condiciones o del Centro de
Ayuda. La trazabilidad completa —incluido lo que está sólo en pantalla— está en
`GUION-CONSIGNAR.md` §Validación. Los cinco que conviene tener a mano al dirigir la toma:

- **«son dos taps»** es un conteo, no un adorno: el artículo dice «dale clic o tap a *Participa*» y
  después «haz clic o tap sobre *acepto*». Dos. Dilo como un dato tranquilizador, no como un claim
  de velocidad — el reel no puede decir cuánto demora, porque ninguna fuente lo dice.
- **«el sistema lo debita de tu Billetera»** es la frase del artículo («automáticamente el sistema
  debitará de tu Billetera el monto indicado»). Es el momento en que alguien se entera de que la
  plata sale sin pedir permiso otra vez: **plano y claro**, sin subir al final.
- **«por lo menos un bid válido»** es literal en las dos fuentes y en el pop-up del producto. Es la
  única línea del reel que evita una sanción: va **seria, sin sonrisa, y con un respiro antes**.
  Si esta línea suena simpática, la toma no sirve.
- **«con SubasPass consignas cero»** es el beneficio literal de las dos fuentes (T&C IV.9.b —
  «consignando 0 SubasCoins»; CA **[consignacion] Subaspass** — «con consignación 0»). El precio
  también es literal: «Mensual >S< 30 (30 días)» es la lista del artículo, y «desde» es exacto porque
  es el más barato de los cuatro planes. **Lo que no se dice**: nada sobre que salga más barato que
  consignar. Nadie lo compara en ninguna fuente.
- **«con tu cuenta habilitada y sin deuda»** no es una advertencia decorativa: es la condición que los
  T&C le ponen al beneficio entero (IV.9.b) y que el Centro de Ayuda se salta cuando dice «sin
  restricciones». Los Términos prevalecen. Va **plana**, pegada a la frase anterior, sin pausa
  dramática — es una condición, no una amenaza.

## Los tiempos — **estimados, no medidos**

Nadie ha grabado esto todavía. La tabla de abajo es aritmética, no una medición: el conteo de
palabras de cada bloque a **3.21 palabras/s** —el ritmo real de `vendesolo.mp3`, 150 palabras en
46.8 s de habla— más **0.73 s** de silencio entre bloques, que es la pausa promedio de esa misma
toma. Los cortes se pusieron 0.15 s después del final del habla.

| # | Beat (`GUION`) | Frames | Habla (est.) | Palabras | Emoción | Locución |
|---|---|---|---|---|---|---|
| 1 | `gancho` | 0–219 | 0.00–7.17 | 23 | cálida, invitando | Para participar en una oferta de VMC hay que consignar. Son dos taps, y el sistema debita solo. Te muestro los dos casos. |
| 2 | `participa` | 219–353 | 7.90–11.63 | 12 | clara, instructiva | En el detalle de la oferta, con tu sesión iniciada, toca Participa. |
| 3 | `acepto` | 353–525 | 12.36–17.35 | 16 | plana, de dato | Ahí ves el monto a consignar. Toca Acepto y el sistema lo debita de tu Billetera. |
| 4 | `bid` | 525–724 | 18.08–24.00 | 19 | seria, sin sonrisa | Y ojo: al aceptar te comprometes a conectarte a la sala y enviar por lo menos un bid válido. |
| 5 | `negocia` | 724–858 | 24.73–28.46 | 12 | clara, instructiva | En una oferta Negociable no hay botón de aceptar: toca Negocia ahora. |
| 6 | `propone` | 858–1030 | 29.19–34.18 | 16 | firme, guiando | Al iniciar la negociación se debita la consignación, y ahí mismo digitas el monto que propones. |
| 7 | `billetera` | 1030–1201 | 34.91–39.89 | 16 | plana, de dato | Para todo esto necesitas fondos. Los cargas desde tu Billetera, con SubasCoins o con una recarga. |
| 8 | `subaspass` | 1201–1429 | 40.62–47.48 | 22 | brillante, ofreciendo | Y si vas a participar seguido, con SubasPass consignas cero. Desde treinta SubasCoins al mes, con tu cuenta habilitada y sin deuda. |
| 9 | `cierre` | 1429–1577 | 48.21–52.57 | 14 | cálida, cerrando | Con eso ya puedes consignar y entrar a la sala. Todo está en vmcsubastas.com. |

**Total estimado: 52.6 s / 1577 frames.** Es una estimación con un error esperable de ±10%, y el
sesgo es hacia **más largo**: 150 palabras de texto instructivo se leen más lento que 150 de marca,
y el bloque 4 tiene un respiro pedido que la aritmética no cuenta.

Es el reel más largo del repo, empatado con `VendeSolo` (53 s). Si la toma se pasa de los 55 s, el
candidato a recortar es el bloque 6 —el modal de Negociable— antes que el 8: el 8 es lo único que
vende.

Los bloques 2 y 5 son los más cortos (3.7 s cada uno) y son **líneas de tránsito**: nombran un botón
y nada más. Si la toma los estira más allá de 5 s, la voz está poniendo énfasis donde no toca.

### Cuando llegue la toma — los cuatro pasos, en orden

1. Guarda el original en `tomas/consignar/voz/` y la copia que usa el reel en
   `remotion/public/voz/consignar.mp3`. Mismo nombre en las dos.
2. Mide la onda. **Con el detector de energía, no con una transcripción** — las marcas de palabra
   de un transcriptor no coinciden con la onda, y en `vender.mp3` cuatro cortes derivados de ellas
   cayeron encima de la voz:

   ```bash
   ffmpeg -i remotion/public/voz/consignar.mp3 -af silencedetect=noise=-35dB:d=0.15 -f null -
   ```

   El umbral es por toma: `vender.mp3` se mide a −30 dB y `vendesolo.mp3` a −35 dB. Ajústalo hasta
   que el número de huecos tenga sentido contra la puntuación del guion. **Este guion tiene ocho
   límites de bloque**, y dos trampas propias: los dos puntos del bloque 5 («de aceptar: toca
   Negocia ahora») y el respiro pedido del bloque 4, que va a aparecer como un hueco **dentro** del
   bloque y no es un corte.
3. Reescribe `GUION` en `remotion/src/reels/Consignar.tsx` y esta tabla. Van siempre juntos. Cada
   corte va **en el medio del silencio, sesgado ~0.2 s hacia adelante**, para que la escena entrante
   ya esté puesta cuando arranca la línea siguiente.
4. Descomenta el `<Audio>` en `ReelConsignarVideo` — hoy la composición es muda a propósito.

Y si la toma sale más larga, **manda la toma**: el reel dura lo que dura la voz.
