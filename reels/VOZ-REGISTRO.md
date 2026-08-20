# Locución — reel `Registro` · para ElevenLabs

Voz en off **femenina**, español latino neutro (Perú-friendly), para el tutorial de registro
(`Registro`, `out/registro.mp4`).

**No está grabada todavía.** Este documento es la orden de trabajo: se pega el bloque de abajo en
ElevenLabs, se descarga la toma a `remotion/public/voz/registro.mp3`, se mide, y **recién ahí** el
reel tiene sus frames de verdad. Mientras tanto la composición corre muda y su `GUION` es una
estimación — está marcada como tal en `remotion/src/reels/Registro.tsx`.

Un solo mensaje: **crear tu cuenta en VMC son cuatro pasos.** La voz no explica qué son las
SubasCoins, ni cómo se recarga la billetera, ni cómo se recupera una contraseña. Eso es otro
artículo del Centro de Ayuda y, cuando toque, otro reel.

---

## Casting

| Atributo | Qué buscar |
|---|---|
| Voz | **Jessica** (*Playful, Bright, Warm*), la misma de `vender.mp3` y `vendesolo.mp3` |
| Modelo | **Eleven v3** — es el que respeta las etiquetas de emoción |
| Género / edad | Femenino, 28–38 |
| Acento | Español latinoamericano **neutro**. Nada de rioplatense, ibérico ni mexicano marcado |
| Energía | De alguien que te guía por encima del hombro, no de comercial |

**Ajustes:** Stability media-baja (~0.40, preset *Natural*) · Similarity ~0.75 · Style bajo ·
Speaker boost on · Speed 1.0.

## El tono, contra los otros tres reels

Los tres reels de marca **venden**. Éste **enseña vendiendo**, y eso cambia tres cosas.

La primera: hay que decir el nombre de los botones tal cual están escritos en la pantalla —
*Ingresa*, *Regístrate*, *Quiero Recibir*, *Sigamos*. En un reel de marca esas palabras serían
jerga; acá son la instrucción entera. Si la voz dice "entra a tu cuenta" y el botón dice
"Ingresa", el reel falló.

La segunda: **no corre**. `VendeSolo` puede permitirse un remate rápido porque nadie va a rebobinar
para volver a oírlo. Éste sí se rebobina, y una toma apurada obliga a hacerlo. Si la toma sale bajo
los 40 s, está apurada.

La tercera: **la venta vive en las puntas, no en el medio**. El gancho y el cierre son los que
tienen que convertir; los cuatro pasos del medio convencen siendo claros, no siendo entusiastas.
Una toma que trata "completa tus datos" con la misma energía que "compras y vendes autos" suena a
comercial y deja de enseñar.

## Pronunciación — escríbelo así en el prompt, no como se escribe

| Se escribe | Se manda |
|---|---|
| VMC | `ve eme ce` |
| vmcsubastas.com | `ve eme ce subastas punto com` |
| DNI | `de ene i` — se deletrea |
| RUC | `ruc` — se dice como palabra, no se deletrea |
| Condiciones y Términos | tal cual, es el nombre del documento |

---

## La toma, para pegar de una

**Una sola toma corrida.** No la grabes beat por beat: los empalmes se notan y el reel se retimea
igual al final. Pega esto tal cual en ElevenLabs v3:

```
[warm, inviting] En ve eme ce compras y vendes autos, y todo empieza en el mismo sitio: tu cuenta. Son cuatro pasos y es muy fácil y rápido.

[clear, instructive] Entra a ve eme ce subastas punto com y toca Ingresa.

[bright] En la pantalla de bienvenida, toca Regístrate.

[steady, guiding] Completa tus datos: nombres, apellidos, de ene i, celular, correo y contraseña. Con los tuyos: la cuenta es personal e intransferible.

[matter-of-fact] ¿Necesitas factura? En Quiero Recibir elige Factura y agrega tu ruc. Si no, quedas como persona natural y recibes boleta.

[confident] Marca las casillas de Condiciones y Términos y de la política de privacidad, y toca Sigamos.

[warm, closing] Y listo, ya eres parte de ve eme ce. Ahora entra, elige tu oferta y agenda tu visita para ver el auto en físico.
```

Los saltos de línea dobles son las pausas. Son los cortes de escena: si la voz los come, la toma no
sirve y hay que regrabar con `...` al final de cada bloque.

### De dónde sale cada frase

Ninguna línea es de cosecha propia: todas salen de los Términos y Condiciones o del Centro de
Ayuda. La trazabilidad completa —incluido lo que está sólo en pantalla— está en
`GUION-REGISTRO.md` §Validación. Los dos que conviene tener a mano al dirigir la toma:

- **«compras y vendes autos»** es el gancho entero y no es un adorno: el reel abrió dos versiones
  con «Cazador de Ofertas» —copy del producto, está en `login.png`— y salió porque es una palabra de
  comprador y VMC tiene los dos lados. Dilo como una **elección que se le ofrece a quien escucha**,
  no como una lista: un respiro chico entre «compras» y «vendes», y el peso en «tu cuenta».
  El motivo largo está en `GUION-REGISTRO.md` §Por qué el gancho no habla de subastas.
- **«la cuenta es personal e intransferible»** es la frase literal de los T&C (II.6 y III.1.d). Es
  la única línea del reel con peso contractual: va seria, sin sonrisa, y con un respiro antes.

## Los tiempos — **estimados, no medidos**

Nadie ha grabado esto todavía. La tabla de abajo es aritmética, no una medición: el conteo de
palabras de cada bloque a **3.21 palabras/s** —el ritmo real de `vendesolo.mp3`, 150 palabras en
46.8 s de habla— más **0.73 s** de silencio entre bloques, que es la pausa promedio de esa misma
toma.

| # | Beat (`GUION`) | Frames | Habla (est.) | Palabras | Emoción | Locución |
|---|---|---|---|---|---|---|
| 1 | `gancho` | 0–229 | 0.00–7.48 | 24 | cálida, invitando | En VMC compras y vendes autos, y todo empieza en el mismo sitio: tu cuenta. Son cuatro pasos y es muy fácil y rápido. |
| 2 | `paso1` | 229–354 | 8.21–11.64 | 11 | clara, instructiva | Entra a vmcsubastas.com y toca Ingresa. |
| 3 | `paso2` | 354–442 | 12.37–14.55 | 7 | brillante | En la pantalla de bienvenida, toca Regístrate. |
| 4 | `paso3` | 442–660 | 15.28–21.83 | 21 | firme, guiando | Completa tus datos: nombres, apellidos, DNI, celular, correo y contraseña. Con los tuyos: la cuenta es personal e intransferible. |
| 5 | `factura` | 660–869 | 22.56–28.79 | 20 | neutra, de dato | ¿Necesitas factura? En Quiero Recibir elige Factura y agrega tu RUC. Si no, quedas como persona natural y recibes boleta. |
| 6 | `paso4` | 869–1040 | 29.52–34.51 | 16 | segura | Marca las casillas de Condiciones y Términos y de la política de privacidad, y toca Sigamos. |
| 7 | `cierre` | 1040–1282 | 35.24–42.72 | 24 | cálida, cerrando | Y listo, ya eres parte de VMC. Ahora entra, elige tu oferta y agenda tu visita para ver el auto en físico. |

**Total estimado: 42.7 s / 1282 frames.** Es una estimación con un error esperable de ±10%: la
misma voz lee un texto instructivo más lento que uno de marca, así que lo más probable es que la
toma salga **más larga**, no más corta.

El bloque 3 son 2.2 s de habla, el más corto del reel. Si la toma lo estira más allá de 3.5 s, es
que la voz está poniendo énfasis donde no toca: es una línea de tránsito, no un beat.

### Cuando llegue la toma — los cuatro pasos, en orden

1. Guarda el original en `tomas/registro/voz/` y la copia que usa el reel en
   `remotion/public/voz/registro.mp3`. Mismo nombre en las dos.
2. Mide la onda. **Con el detector de energía, no con una transcripción** — las marcas de palabra
   de un transcriptor no coinciden con la onda, y en `vender.mp3` cuatro cortes derivados de ellas
   cayeron encima de la voz:

   ```bash
   ffmpeg -i remotion/public/voz/registro.mp3 -af silencedetect=noise=-35dB:d=0.15 -f null -
   ```

   El umbral es por toma: `vender.mp3` se mide a −30 dB y `vendesolo.mp3` a −35 dB. Ajústalo hasta
   que el número de huecos tenga sentido contra la puntuación del guion. **Este guion tiene seis
   límites de bloque y muchas comas internas** — sobre todo el bloque 4, que enumera seis campos.
   Todo hueco que caiga donde escribiste una coma es una coma, no un corte.
3. Reescribe `GUION` en `remotion/src/reels/Registro.tsx` y esta tabla. Van siempre juntos. Cada
   corte va **en el medio del silencio, sesgado ~0.2 s hacia adelante**, para que la escena
   entrante ya esté puesta cuando arranca la línea siguiente.
4. Descomenta el `<Audio>` en `ReelRegistroVideo` — hoy la composición es muda a propósito.

Y si la toma sale más larga, **manda la toma**: el reel dura lo que dura la voz.
