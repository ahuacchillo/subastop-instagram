# Guión — Cómo funciona vender en VMC

> Las rutas de este documento (`src/`, `public/`, `out/`) son relativas a `reels/remotion/`.

Voz y pantalla del reel `Vender` (`out/vender.mp4`, 42.2 s, 270×480 @ 30 fps), beat por beat.

**Un solo objetivo:** explicar cómo funciona vender en VMC. Nada de cómo publicar, cuánto
cuesta ni qué es una Oferta Negociable — eso es el reel `Negociable`.

## Dónde vive cada cosa

Este documento es de **lectura**: sirve para revisar la copia y la locución de un vistazo. No
es la fuente de la verdad de nada.

| Qué | Fuente real |
|---|---|
| Frames de cada beat | `GUION` en `src/reels/Vender.tsx` |
| Texto en pantalla | los componentes de `src/reels/Vender.tsx` |
| Locución grabada | `public/voz/vender.mp3` |
| Cómo se midieron los cortes | `VOZ-VENDER.md` |

Si cambias cualquiera de esos, este archivo queda desactualizado y hay que tocarlo a mano.

---

## ACTO 1 — Los pains · 0.00 – 9.72 s

Metraje real, sin marca, sin UI. Los primeros diez segundos son de ella. La voz y la pantalla
van **palabra por palabra**: aquí el texto es lo único que acompaña a la voz y cualquier
desajuste se nota.

### Beat 1 · `calleA` · frames 0–100

Toma: ella junto al auto, el comprador husmeando el capó. Sonrisa cortés que se apaga.

| | |
|---|---|
| **VOZ** | Vender tu auto por tu cuenta es un montón de trabajo. |
| **PANTALLA** | Vender tu auto<br>por tu cuenta es un<br>montón de trabajo. |

### Beat 2 · `tramites` · frames 100–204

Toma: oficina, papeles, ella con la cabeza apoyada en la mano.

| | |
|---|---|
| **VOZ** | Explicas, esperas, repites, |
| **PANTALLA** | Explicas.<br>Esperas.<br>Repites. |

### Beat 3 · `calleB` · frames 204–305

Toma: el plantón sobre el capó, resuelve en primer plano de ella desinflada.

| | |
|---|---|
| **VOZ** | y al final siempre te terminan bajando el precio. |
| **PANTALLA** | Y al final, siempre<br>te terminan bajando<br>el precio. |

---

## BISAGRA · 10.52 – 14.62 s

### Beat 4 · `bisagra` · frames 305–451

Toma: ella en el sofá, luz cálida. Se cae el filtro frío del acto 1.

**Primera vez en todo el reel que aparece la marca.** La marca se gana el derecho a hablar
recién cuando tiene algo que ofrecer.

| | |
|---|---|
| **VOZ** | En VMC, no. Nosotros nos encargamos de conseguir el precio que quieres. |
| **PANTALLA** | *[logo VMC]*<br>**NOSOTROS NOS**<br>**ENCARGAMOS DE**<br>**CONSEGUIR TU PRECIO** |

Es la frase que el reel existe para entregar. Va aquí y no en el cierre porque todo lo que
sigue es su demostración: los cinco pasos son esta misma frase desarmada.

---

## ACTO 2 — Los cinco pasos · 15.40 – 35.74 s

A partir de aquí la bajada **no** repite la voz: dice algo que la voz no dice. Es apoyo, no
subtítulo.

### Beat 5 · `paso1` · frames 451–605

| | |
|---|---|
| **VOZ** | Tú nos dices cuánto vale tu auto para ti, y ese número se vuelve nuestro objetivo. |
| **Chip** | PASO 1 / 5 |
| **Titular** | Tú pones el precio |
| **Bajada** | Nos dices cuánto quieres por tu auto. Ese número es el objetivo. |
| **Ficha** | *[foto del auto]*<br>Suzuki Baleno · 2020 · 45,000 km<br>LO QUIERO VENDER EN → `US$ 12,000` |

El monto se **teclea** dígito a dígito, en gris, y pasa a tinta al completarse. Un contador
subiendo desde cero leería como una medición; esto lee como alguien decidiendo.

### Beat 6 · `paso2` · frames 605–721

| | |
|---|---|
| **VOZ** | Lo sacamos al mercado, lo ponemos en nuestro marketplace |
| **Chip** | PASO 2 / 5 |
| **Titular** | Salimos al mercado |
| **Bajada** | Lo ponemos en nuestro marketplace, frente a miles de compradores verificados. |
| **UI** | Tarjeta de oferta con los contadores subiendo: vistas, likes, participantes |

Los contadores suben durante la escena. Es la única forma honesta de decir "lo ven miles" sin
comprometerse con una cifra: se lee el movimiento, no el número.

### Beat 7 · `paso3` · frames 721–861

| | |
|---|---|
| **VOZ** | y cuando empiezan a llegar las propuestas, la negociación la manejamos nosotros. |
| **Chip** | PASO 3 / 5 |
| **Titular** | Nosotros negociamos |
| **Bajada** | Empiezan a llegar propuestas. La negociación la manejamos nosotros, no tú. |
| **UI** | Tu expectativa `US$ 12,000`<br>`US$ 9,500` → `US$ 10,400` → `US$ 11,300` |

Las propuestas suben hacia su expectativa **sin alcanzarla**. Ese hueco es el planteo del
paso 4: si llegaran solas a su número, VMC no tendría nada que hacer.

### Beat 8 · `paso4` · frames 861–975

| | |
|---|---|
| **VOZ** | No cerramos por menos, vamos por el número que pusiste. |
| **Chip** | PASO 4 / 5 |
| **Titular** | Vamos por tu precio |
| **Bajada** | No cerramos por menos. Trabajamos cada oferta hasta llegar al número que pusiste. |
| **Chat** | *EQUIPO VMC* — Tenemos un comprador interesado en tu Suzuki Baleno. Estamos negociando.<br>*EQUIPO VMC* — Subió a **US$ 11,300**. Seguimos: tu precio es US$ 12,000.<br>*EQUIPO VMC* — Aceptó. Llegamos a **US$ 12,000**. |

Las burbujas van en **una sola dirección**. En el reel `Negociable` el chat va y viene porque
ahí ella acepta o contrapropone; aquí ya dio su número, así que VMC informa y no pide permiso.
Una burbuja de vuelta diría que ella todavía está trabajando el trato.

### Beat 9 · `paso5` · frames 975–1081

| | |
|---|---|
| **VOZ** | Y en el momento justo en que se cumple, cerramos. |
| **Chip** | PASO 5 / 5 |
| **Titular** | Cerramos |
| **Bajada** | En el momento en que se cumple tu precio, cerramos la negociación y te conectamos con tu comprador. |
| **UI** | *PRECIO CONSEGUIDO*<br>`US$ 12,000`<br>Exactamente lo que pediste. |

El cierre iguala a la expectativa. Es el argumento entero: una tarjeta que dijera "conseguimos
US$ 11,800 de los 12,000 que pediste" sería una frase honesta y un reel muerto.

---

## CIERRE · 36.38 – 41.44 s

### Beat 10 · `cierre` · frames 1081–1265

Toma: ella en el sofá otra vez. El reel abre con ella trabajando y cierra con ella sin trabajar.

| | |
|---|---|
| **VOZ** | Así de simple: tú pones el precio, nosotros lo conseguimos. VMC. |
| **Chip** | VENDE CON VMC |
| **Titular** | Tú pones el precio.<br>Nosotros lo conseguimos. |
| **Botón** | Quiero vender |
| | *[logo VMC]* |

El titular es la frase clave comprimida a sus dos mitades — la de ella y la nuestra. Es lo
único que el espectador tiene que recordar.

---

## Qué cambia con otro auto

Llega por props (`VENDER` en `src/reels/Vender.tsx`), así que se cambia sin tocar copia:

- `marca`, `modelo`, `anio`, `kilometraje`, `foto`
- `expectativa` y `cierre` — **los dos tienen que ser el mismo número**
- `propuestas` — las tres suben hacia la expectativa sin llegar
- `dia`, `hora` — el cierre de la oferta en la tarjeta del paso 2

Todo el resto del texto está fijo en el código. Y la locución nombra el precio pero no el auto,
así que cambiar de vehículo **no** obliga a regrabar la voz — cambiar el monto sí.
