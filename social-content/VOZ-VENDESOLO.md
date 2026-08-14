# Locución — reel `VendeSolo` · para ElevenLabs

Voz en off **femenina**, español latino neutro (Perú-friendly), para el reel de 53 s
(`VendeSolo`, `out/vendesolo.mp4`).

**Ya está grabada.** La toma en uso es `public/voz/vendesolo.mp3` — Jessica (*Playful, Bright,
Warm*), Eleven v3, **una sola toma corrida** de 52.6 s. Como vino corrida y no beat por beat, el
reel se retimó al audio, no al revés: los frames de `GUION` en `src/reels/VendeSolo.tsx` salen de
las pausas medidas sobre el archivo, y el reel pasó de 42 s (presupuesto escrito) a **53 s**
(medida real). Manda lo grabado.

Un solo mensaje: **ella publica y el auto se vende solo.** La voz nunca explica cómo se sube una
foto ni qué es una Oferta Negociable — eso es el reel `Negociable`.

---

## Casting

| Atributo | Qué buscar |
|---|---|
| Voz | **Jessica** (*Playful, Bright, Warm*), la misma de `voz/vender.mp3` |
| Modelo | **Eleven v3** — es el que respeta las etiquetas de emoción |
| Género / edad | Femenino, 28–38 |
| Acento | Español latinoamericano **neutro**. Nada de rioplatense, ibérico ni mexicano marcado |
| Energía | Cómplice y ligera, no de comercial gritado |

**Ajustes:** Stability media-baja (~0.40, preset *Natural*) · Similarity ~0.75 · Style bajo ·
Speaker boost on · Speed 1.0.

## El tono, contra los otros dos reels

`Vender` es **firme** ("nosotros nos hacemos cargo"). `Negociable` es **entusiasta** ("qué fácil").
Éste es **ligero**: el argumento es que ella no hace nada. Si la toma sale esforzada, contradice el
guion. La frase `tu auto se vende solo` tiene que sonar casi divertida, no solemne.

## Pronunciación — escríbelo así en el prompt, no como se escribe

| Se escribe | Se manda |
|---|---|
| VMC | `ve eme ce` |
| 25 SubasCoins | `veinticinco Subas Coins` |
| 100% | `cien por ciento` |
| 0% comisiones | *no va en la voz* — vive en pantalla |

---

## La toma, para pegar de una

**Una sola toma corrida.** No la grabes beat por beat: los empalmes se notan y el reel se retimea
igual al final. Pega esto tal cual en ElevenLabs v3:

```
[warm, smiling] Publica en ve eme ce, y observa cómo tu auto se vende solo.

[dry, matter-of-fact] Sin llamadas de curiosos. Sin regateos. Sin perder el tiempo agendando citas con desconocidos.

[confident] Tú solo defines cuánto quieres recibir por tu vehículo.

[reassuring] Y con un pago único de veinticinco Subas Coins, tu publicación queda activa hasta que se venda. Sin comisiones, sin suscripciones, sin cobros ocultos.

[bright, energetic] Tu auto se expone ante miles de compradores verificados, que empiezan a enviar sus ofertas.

[calm, confident] De ahí en adelante, la negociación la tomamos nosotros: vamos por el precio que buscas, o por la mejor propuesta posible.

[excited] Y en cuanto una oferta alcanza tu expectativa, te avisamos al instante.

[warm] Cuando das el sí, te conectamos directo con el comprador para que coordinen el pago y la entrega entre ustedes.

[proud, closing] Así de simple: ve eme ce hace el trabajo pesado, y tú te quedas con el cien por ciento de tu dinero.
```

Los saltos de línea dobles son las pausas. Son los cortes de escena: si la voz los come, la toma no
sirve y hay que regrabar con `...` al final de cada bloque.

## Lo que está grabado hoy

Medido sobre `public/voz/vendesolo.mp3`. «Habla» son los segundos en que suena cada línea; el corte
de escena va en el silencio siguiente. Los frames son los de `GUION`.

| # | Beat (`GUION`) | Frames | Habla | Emoción | Locución tal como quedó |
|---|---|---|---|---|---|
| 1 | `gancho` | 0–119 | 0.00–3.68 | cálida, sonriendo | Publica en VMC, y observa cómo tu auto se vende solo. |
| 2 | `painsA` + `painsB` | 119–297 | 4.39–9.64 | seca, enumerando | Sin llamadas de curiosos. Sin regateos. Sin perder el tiempo agendando citas con desconocidos. |
| 3 | `expectativa` | 297–393 | 10.35–12.90 | segura | Tú solo defines cuánto quieres recibir por tu vehículo. |
| 4 | `reglas` | 393–680 | 13.45–22.39 | tranquilizadora | Y con un pago único de 25 SubasCoins, tu publicación queda activa hasta que se venda. Sin comisiones, sin suscripciones, sin cobros ocultos. |
| 5 | `exposicion` | 680–870 | 23.07–28.67 | brillante, sube | Tu auto se expone ante miles de compradores verificados, que empiezan a enviar sus ofertas. |
| 6 | `negociacion` | 870–1059 | 29.57–35.01 | calmada, segura | De ahí en adelante, la negociación la tomamos nosotros: vamos por el precio que buscas, o por la mejor propuesta posible. |
| 7 | `alerta` | 1059–1199 | 35.87–39.67 | emocionada | Y en cuanto una oferta alcanza tu expectativa, te avisamos al instante. |
| 8 | `cierre` | 1199–1590 | 40.47–45.92 | cálida, bajando | Cuando das el sí, te conectamos directo con el comprador para que coordinen el pago y la entrega. |
| 9 | ↑ mismo | ↑ | 46.56–52.61 | orgullosa, remate | Así de simple: VMC hace el trabajo pesado, y tú te quedas con el 100% de tu dinero. |

**Los bloques 8 y 9 son una sola escena.** No hay corte entre ellos: ninguno tiene metraje y los dos
van sobre el mismo fondo, así que el corte sólo anunciaba que empezaba otra tarjeta. El frame se
sostiene 13 s y se va construyendo — el texto del comprador entra en el frame 2, el panel del cierre
en el 186, que es donde la toma llega a «Así de simple».

**El bloque 2 es una sola línea hablada partida en dos tomas** (`painsA` cocina, `painsB` calle). El
corte cae a mitad de la frase, no en un silencio: es un corte de imagen sobre voz continua, a
propósito, para que "citas con desconocidos" no llegue sobre una imagen que lleva seis segundos
puesta.

### Cómo se midieron los cortes

Con el detector de energía, **no** con la transcripción. Las marcas de palabra de un transcriptor no
coinciden con la onda: en `vender.mp3` cuatro cortes derivados de ellas cayeron encima de la voz.

```bash
ffmpeg -i public/voz/vendesolo.mp3 -af silencedetect=noise=-35dB:d=0.15 -f null -
```

Ojo con el umbral: esta toma es **más caliente** que `vender.mp3` (mean −18.8 dB, pico −0.9) y sus
silencios no bajan tanto. A −45 dB el medidor no encuentra nada; a −35 dB salen 18 huecos, de los
cuales **sólo 8 son límites de bloque hablado** — los otros diez son las comas dentro de una línea.
Los límites son los de la tabla de arriba.

Y límite de bloque no es lo mismo que corte de escena: de esos 8, **siete se cortan** y el de 8|9 se
deja pasar (esa es la escena fusionada). Al revés también pasa: el corte `painsA`/`painsB` cae a
mitad de frase, donde no hay ningún silencio.

Cada corte va **en el medio del silencio, sesgado ~0.2 s hacia adelante**, para que la escena
entrante ya esté arriba cuando arranca la línea siguiente.

### Si se vuelve a grabar

1. Reemplaza `public/voz/vendesolo.mp3`.
2. Vuelve a medir con el comando de arriba y actualiza `GUION` en `VendeSolo.tsx`.
3. Corrige los frames de esta tabla.
4. Si la toma sale más larga o más corta, manda la toma: se retimea el reel, no la voz.
