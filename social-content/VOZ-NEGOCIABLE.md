# Locución — Oferta Negociable (VMC) · para ElevenLabs

Voz en off **femenina**, español latino neutro (Perú-friendly), para el reel de 65.4 s
(`out/negociable-concorde.mp4`). La voz **no lee la pantalla**: la pantalla desarrolla, la voz
resume y empuja. ~155 palabras / 65.4 s ≈ 2.4 palabras por segundo — ritmo de conversación,
no de locutor de radio.

---

## Casting de la voz

| Atributo | Qué buscar |
|---|---|
| Género | Femenino |
| Edad percibida | 28–38 |
| Acento | Español latinoamericano **neutro**. Evitar rioplatense, español ibérico y mexicano marcado |
| Timbre | Cálido, medio-grave, cercano. Amiga que te da un dato bueno, no locutora de comercial |
| Energía | Sube a lo largo del reel: empatía → alivio → claridad → entusiasmo → invitación |

En la librería de ElevenLabs filtra por `Spanish (Latin America)` + `female` + `narration` o
`social media`, y descarta cualquiera que suene a lectura de noticiero.

## Ajustes sugeridos

- **Modelo:** Eleven v3 si quieres las etiquetas de emoción del bloque de abajo; Multilingual v2
  si prefieres una voz más estable y sin etiquetas (usa entonces el bloque limpio).
- **Stability:** media-baja (~0.40 / preset *Natural*). Muy alta mata la emoción; muy baja hace
  que cambie de tono entre líneas.
- **Similarity:** ~0.75. **Style:** bajo-medio. **Speaker boost:** on.
- **Speed:** 1.0. Si una línea se pasa del beat, **corta palabras, no aceleres la voz**.

## Cómo grabarlo

La toma en uso hoy (`public/voz/negociable.mp3`, Kate, Eleven v3) es **corrida**, no beat por
beat. Por eso el reel se retimó al audio y no al revés: los frames de la tabla salen de las
pausas que la voz deja de verdad, medidas sobre el archivo. Si se regraba, hay que volver a
medirlas y mover `GUION` en `src/reels/Negociable.tsx`.

Si en cambio generas **una toma por beat**, cada línea cae exacta en su escena y el silencio
entre beats lo pone el editor — ahí los tiempos de la tabla mandan sobre la voz.

## Pronunciación

- **VMC** → deletreado: "ve, eme, ce".
- **SubasCoins** → "súbas-cóins".
- **25** → escribe *veinticinco* en el texto para que no lea "dos cinco".
- **100%** → escribe *cien por ciento*.

---

## Guión por beat

| # | Entra | Sale | Dur. | Locución | Intención |
|---|---|---|---|---|---|
| 1 | 0.0 | 2.8 | 2.8 s | ¿Cansado de los chats de curiosos? | Cansancio compartido, casi resoplando |
| 2 | 2.8 | 5.3 | 2.5 s | ¿Del regateo de siempre? | Más seca, resignada. Es el segundo golpe |
| 3 | 5.3 | 11.1 | 5.8 s | Publica tu seminuevo en VMC. Un solo pago, hasta que lo vendas. | **El giro.** Sube la energía, sonrisa en la voz |
| 4 | 11.1 | 16.6 | 5.5 s | Publicar te toma minutos: placa, marca, año, y tu expectativa de venta. | Ligera, práctica. Que suene fácil |
| 5 | 16.6 | 21.8 | 5.2 s | Escoge tus mejores fotos. Mientras mejor lo muestres, más compradores se detienen. | Cómplice, como un consejo |
| 6 | 21.8 | 27.2 | 5.4 s | Y antes de activarla, la revisas completa, tal como la verá tu comprador. | Tranquilizadora: nada se publica sin que lo apruebes |
| 7 | 27.2 | 32.5 | 5.3 s | Y listo: pagas veinticinco SubasCoins, una sola vez, y queda activa hasta que lo vendas. | Buena noticia. Marcar *una sola vez* |
| 8 | 32.5 | 37.2 | 4.7 s | Sin comisiones, sin intermediarios. La venta es cien por ciento tuya. | Firme, casi desafiante. Es la promesa dura |
| 9 | 37.2 | 43.5 | 6.3 s | Desde ahí, tu auto se vende solo. Miles de compradores lo ven, y las ofertas llegan solas. | Entusiasmo contenido. Aquí se vende el producto |
| 10 | 43.5 | 49.5 | 6.0 s | Nadie te apura. Una propuesta, otra, y otra más, hasta que llegue la que calce. | Calma. El alivio de no tener presión |
| 11 | 49.5 | 56.8 | 7.3 s | Cuando llega una oferta que calza con tu expectativa, VMC te escribe. Tú decides: aceptas, o contrapropones. | Confianza. *Tú decides* va marcado |
| 12 | 56.8 | 61.4 | 4.6 s | Aceptas, te conectamos con tu comprador, y el trato se cierra entre ustedes. | Celebración corta. Es el "¡Vendido!" |
| 13 | 61.4 | 65.4 | 4.0 s | En VMC, tu auto se vende solo. Publícalo hoy. | Cierre cálido y directo. Invitación, no orden |

---

## Bloque para pegar — Eleven v3 (con etiquetas)

Genera beat por beat. Las etiquetas entre corchetes son instrucciones de actuación: no se leen.

```
[tired] ¿Cansado de los chats de curiosos?
```
```
[sighs] ¿Del regateo de siempre?
```
```
[excited] Publica tu seminuevo en VMC. Un solo pago, hasta que lo vendas.
```
```
[cheerful] Publicar te toma minutos: placa, marca, año, y tu expectativa de venta.
```
```
[warm] Escoge tus mejores fotos. Mientras mejor lo muestres, más compradores se detienen.
```
```
[reassuring] Y antes de activarla, la revisas completa, tal como la verá tu comprador.
```
```
[excited] Y listo: pagas veinticinco SubasCoins, una sola vez, y queda activa hasta que lo vendas.
```
```
[confident] Sin comisiones, sin intermediarios. La venta es cien por ciento tuya.
```
```
[excited] Desde ahí, tu auto se vende solo. Miles de compradores lo ven, y las ofertas llegan solas.
```
```
[calm] Nadie te apura. Una propuesta, otra, y otra más, hasta que llegue la que calce.
```
```
[confident] Cuando llega una oferta que calza con tu expectativa, VMC te escribe. Tú decides: aceptas, o contrapropones.
```
```
[happy] Aceptas, te conectamos con tu comprador, y el trato se cierra entre ustedes.
```
```
[warm] En VMC, tu auto se vende solo. Publícalo hoy.
```

## Bloque limpio — Multilingual v2 (sin etiquetas)

La emoción aquí la carga la puntuación: los puntos suspensivos abren aire y las comas marcan
el énfasis. Mismo orden, un beat por generación.

```
¿Cansado de los chats de curiosos?
¿Del regateo de siempre?
Publica tu seminuevo en VMC. Un solo pago... hasta que lo vendas.
Publicar te toma minutos: placa, marca, año, y tu expectativa de venta.
Escoge tus mejores fotos. Mientras mejor lo muestres, más compradores se detienen.
Y antes de activarla, la revisas completa, tal como la verá tu comprador.
Y listo: pagas veinticinco SubasCoins, una sola vez, y queda activa hasta que lo vendas.
Sin comisiones, sin intermediarios. La venta es cien por ciento tuya.
Desde ahí, tu auto se vende solo. Miles de compradores lo ven... y las ofertas llegan solas.
Nadie te apura. Una propuesta, otra, y otra más, hasta que llegue la que calce.
Cuando llega una oferta que calza con tu expectativa, VMC te escribe. Tú decides: aceptas, o contrapropones.
Aceptas, te conectamos con tu comprador, y el trato se cierra entre ustedes.
En VMC, tu auto se vende solo. Publícalo hoy.
```

---

**Si cambian los tiempos del reel**, esta tabla se cae: los beats viven en `GUION` dentro de
`src/reels/Negociable.tsx` y están espejados en `GUION-NEGOCIABLE.md`.
