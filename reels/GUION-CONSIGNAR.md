# Guión — ¡Consignar es necesario para participar!

Voz y pantalla del reel `Consignar` (`out/consignar.mp4`, ~52.6 s estimados, 270×480 @ 30 fps), beat
por beat.

**Un solo objetivo:** que alguien que ya tiene cuenta llegue a consignar sin sorpresas. Nada de cómo
se compite en la sala, cómo se envía un bid ni cómo se gana — cada una de esas es otro artículo del
Centro de Ayuda y, cuando toque, otro reel.

**Es el segundo tutorial**, y el primero que **hereda el formato** en vez de inventarlo: el corte, la
ventana de teléfono, el anillo de toque y la geometría de los pasos vienen de
`remotion/src/reels/tutorial.tsx`, que se extrajo de `Registro` justo para esto.

**Cada frase está contrastada contra las dos fuentes oficiales.** La trazabilidad completa está en
§Validación, al final. Si escribes una línea nueva, va con su cita o no va.

## Dónde vive cada cosa

Este documento es de **lectura**: sirve para revisar la copia y la locución de un vistazo. No es la
fuente de la verdad de nada.

| Qué | Fuente real |
|---|---|
| Frames de cada beat | `GUION` en `remotion/src/reels/Consignar.tsx` |
| Texto en pantalla | los componentes de `remotion/src/reels/Consignar.tsx` |
| El formato (cortes, ventana, anillo) | `remotion/src/reels/tutorial.tsx` |
| Las capturas | `remotion/public/reel/consignar/`, copiadas del Centro de Ayuda |
| Locución grabada | **no existe todavía** → `VOZ-CONSIGNAR.md` |
| Los hechos | T&C + Centro de Ayuda, vía el skill `vmc-modelo-negocio` |
| La versión 16:9 | la misma composición con `ancho`, en `ConsignarYT` → `out/yt-consignar.mp4` |

Si cambias cualquiera de esos, este archivo queda desactualizado y hay que tocarlo a mano.

**Este guión vale para las dos formas.** `Consignar` (1080×1920, Instagram) y `ConsignarYT` (1920×1080,
YouTube) son la misma composición: mismo copy, mismas capturas, mismos frames, misma voz. Sólo
cambia cómo se acomodan los beats — una columna contra dos —, y eso vive en `tutorial.tsx`, no
acá. Corregir una línea la corrige en las dos.

---

## De dónde salió, y qué se dejó afuera

El artículo fuente es **CA [consignacion] «¡Consignar es necesario para participar!»** (act. 18 ago
2026): tres preguntas y cinco capturas.

1. ¿Cómo y cuánto consignar? → detalle de la oferta, *Participa*, el monto, *Acepto*, débito
   automático y acceso a la sala. Más el recuadro de «al menos un bid válido o serás sancionado».
2. ¿Y en una oferta «Negociable»? → al iniciar la negociación el débito es automático.
3. ¿Cómo agrego valor a mi billetera? → SubasCoins o Recarga, y el fee de 3.9% con tarjeta.

El reel es esas tres preguntas, más **un beat de SubasPass** que sale del artículo hermano
(**CA [consignacion] Subaspass**) y de **T&C IV.9**. No es un anuncio pegado al final: SubasPass es
*la excepción a la premisa de este reel* —«la facultad de participar en todas las subastas del
ecosistema de Subastop consignando 0 SubasCoins» (T&C **IV.9.b**)—, así que el sitio donde se explica
qué es consignar es el sitio donde tiene sentido decir que hay un caso en que no consignas.

### El video viejo hacía otra cosa

El artículo enlaza hoy `youtu.be/BArqY0cM39I`, que en 34 s recorre **todo el camino hasta la sala**:
personaje con mascarilla, listado del home, corazón de favoritos, scroll, *Ver Detalle*, las pestañas
de información general y condiciones, *PARTICIPA*, el pop-up, *ACEPTO*, la pantalla amarilla de «Ya
eres participante», el recuadro de «Recuerda», los «5 min antes», la cuenta regresiva de 4:56,
*INGRESA A LA SALA EN VIVO* y la sala de espera.

**Nada de eso es consignación.** La sala, los bids y la cuenta regresiva son
**CA [oferta-en-vivo] «Es hora de participar»** —ahí están el bid, cuántos puede enviar, y que el
proceso cierra a los 12 s del último bid válido—, que es su propio artículo y su propio reel futuro.
Es la misma decisión que en `Registro`, donde la compra de SubasCoins se devolvió a los artículos de
billetera: dos temas contados como uno es lo que hacía largos a los videos viejos.

Lo que sí se rescató: **los dos taps**. En el video viejo el recorrido era tan largo que la parte que
importa —que consignar son dos toques— quedaba enterrada en el minuto medio. Acá es el titular.

## Cómo se reparte la venta

`Registro` tiene que convencer a alguien de crear una cuenta; acá el que mira **ya tiene cuenta y ya
quiere participar** — la pregunta no es «¿me conviene?» sino «¿qué me van a cobrar y qué estoy
firmando?».

Así que las puntas hacen menos trabajo de venta y más de orientación, y el cuerpo hace algo que
`Registro` no necesitaba: **avisar**. Cuatro de los nueve beats hablan de plata (el débito
automático, la sanción, el 3.9%, el precio del pase) y los tres primeros van planos. Un reel que
suena entusiasta explicando un débito automático suena a que está escondiendo algo, y es lo único que
este reel no se puede permitir.

**Toda la venta está en un solo beat, el 8**, y llega después de siete planos hablando de plata que
sale. Ese contraste es su efecto entero: SubasPass no se lee como oferta porque esté bien escrito, se
lee como salida porque el reel acaba de pasar cuarenta segundos explicando el problema que resuelve.
Repartir la venta por el cuerpo —un adjetivo acá, un beneficio allá— le quitaría exactamente eso.

---

## ACTO 1 — El gancho · 0.00 – 7.17 s

### Beat 1 · `gancho` · frames 0–219

Sin capturas.

| | |
|---|---|
| **VOZ** | Para participar en una oferta de VMC hay que consignar. Son dos taps, y el sistema debita solo. Te muestro los dos casos. |
| **Logo** | *[logo VMC]* |
| **Titular** | Consignar<br>son dos taps |
| **Bajada** | Es lo que te deja participar, y va igual en una oferta En Vivo que en una Negociable. |
| **Chip** | TE LO MUESTRO |

El titular dice **qué enseña el reel**, que es la lección que costó tres versiones en `Registro`.
Y «son dos taps» no es un adorno: es un conteo que sale del artículo —«dale clic o tap a
*Participa*», después «haz clic o tap sobre *acepto*»— y es la única promesa de brevedad que este
reel puede hacer, porque **ninguna fuente dice cuánto demora consignar**.

La bajada carga la anchura, y acá la anchura son las dos modalidades: consignar no es cosa de
En Vivo, también es la puerta de Negociable (T&C **II.25** — «la actividad que todo usuario debe
realizar para poder publicar y/o participar de una oferta»). Es la mitad que la gente da por
supuesta, y es el motivo de que existan los actos 2 y 4.

El chip es el mismo de `Registro`. Ya es la firma de la serie: la promesa del formato, y el único
elemento de los dos reels que habla en primera persona.

---

## ACTO 2 — En Vivo · 7.90 – 17.35 s

Las etiquetas de este acto y del 4 **nombran la modalidad, no el paso global**. Son dos flujos
paralelos de dos taps cada uno, así que numerarlos «PASO 1 / 2» y «PASO 2 / 2» dos veces imprime la
misma etiqueta dos veces y le dice al espectador que volvió al principio. Lo que ese beat tiene que
establecer es **en qué flujo está**.

### Beat 2 · `participa` · frames 219–353

Captura: `participa.png` — el detalle de una oferta En Vivo, con *Participa*, el Precio Base y la
comisión.

| | |
|---|---|
| **VOZ** | En el detalle de la oferta, con tu sesión iniciada, toca Participa. |
| **Etiqueta** | EN VIVO · 1 DE 2 |
| **Titular** | Toca Participa |
| **Bajada** | Está en el detalle de la oferta, y con tu sesión ya iniciada. |
| **Toque** | sobre *Participa* |

La bajada repite la precondición porque el artículo es explícito con ella —«debes iniciar sesión,
ingresar al detalle de la oferta de tu interés y luego darle clic o tap a *Participa*»— y porque
*Participa* **no existe en ningún otro sitio**: no está en el listado del home ni en la tarjeta.
Alguien buscándolo en el listado es la falla que esta línea evita.

### Beat 3 · `acepto` · frames 353–525

Captura: `acepto.png` — el pop-up de consignación, con el monto, el compromiso y *Acepto*. Ventana
**más ancha que alta** (226×190, no 178): es un modal apaisado, y en una ventana de teléfono se
recorta de los lados o se achica hasta que su texto deja de leerse.

| | |
|---|---|
| **VOZ** | Ahí ves el monto a consignar. Toca Acepto y el sistema lo debita de tu Billetera. |
| **Etiqueta** | EN VIVO · 2 DE 2 |
| **Titular** | Toca Acepto |
| **Bajada** | El sistema debita el monto de tu Billetera y te da acceso a la sala. |
| **Toque** | sobre *Acepto* |

Acá la bajada **sí dice casi lo mismo que la voz**, y es deliberado en vez de descuidado: el débito
automático es lo único de consignar que sorprende a la gente, e Instagram se ve en silencio. La mitad
que un espectador mudo no se puede perder es que **la plata sale sola**.

---

## ACTO 3 — Qué firma ese Acepto · 18.08 – 24.00 s

### Beat 4 · `bid` · frames 525–724

Misma captura, enfocada en el **texto** del pop-up y no en el botón (`aceptoTexto` en `PANTALLAS`:
mismo archivo, `foco` distinto). **Sin toque:** no hay nada que tocar, el beat explica lo que ya se
tocó.

**No lleva número, a propósito.** No es un tercer paso, es el significado del segundo. Numerarlo le
diría a alguien que acaba de consignar que todavía le debe una acción a la plataforma, cuando lo que
debe es un bid, más tarde, en la sala.

| | |
|---|---|
| **VOZ** | Y ojo: al aceptar te comprometes a conectarte a la sala y enviar por lo menos un bid válido. |
| **Chip** | ¿QUÉ ESTÁS ACEPTANDO? |
| **Titular** | Un bid, mínimo |
| **Bajada** | El compromiso está escrito en el mismo pop-up que acabas de tocar. |
| **Aviso** | ⚠️ Si consignas y no envías ningún bid durante el proceso, serás sancionado. |

**Es el beat por el que existe el artículo, y las dos fuentes y el producto dicen lo mismo** —lo cual
es raro y vale decirlo—. El pop-up imprime el compromiso («aceptas conectarte a la sala "En vivo" y a
enviar por lo menos un bid válido durante el proceso en vivo»), el Centro de Ayuda lo repite con la
consecuencia («o serás sancionado») y los T&C lo ponen como responsabilidad asumida de antemano
(**IV.8.1.a** — «debe ingresar a la sala y enviar por lo menos un bid válido durante el proceso
"En Vivo"»).

El aviso es **naranja**, como el de la factura en `Registro` y a diferencia del del cierre: esto es
un peligro, no una fecha límite. Consignar sin saber esto es cómo alguien termina sancionado por
irse de una sala en la que pagó por entrar.

---

## ACTO 4 — Negociable · 24.73 – 34.18 s

### Beat 5 · `negocia` · frames 724–858

Captura: `negocia.png` — el detalle de una oferta Negociable, con *Negocia ahora*.

| | |
|---|---|
| **VOZ** | En una oferta Negociable no hay botón de aceptar: toca Negocia ahora. |
| **Etiqueta** | NEGOCIABLE · 1 DE 2 |
| **Titular** | Toca Negocia ahora |
| **Bajada** | Acá no hay botón de aceptar: la consignación sale al arrancar. |
| **Toque** | sobre *Negocia ahora* |

Todo el acto gira sobre la frase del artículo: «al iniciar una negociación, **el sistema debitará
automáticamente** el monto indicado a consignar». El débito viaja con el arranque de la negociación
— no hay una confirmación aparte que leer primero.

**Y ésa es la trampa que este acto desarma.** Alguien que aprendió a consignar en el acto 2 espera un
pop-up pidiéndole permiso, y en Negociable la plata ya salió cuando ve uno.

### Beat 6 · `propone` · frames 858–1030

Captura: `proponer.png` — el modal de negociación, con el monto a consignar, el campo de la propuesta
y *Proponer*.

| | |
|---|---|
| **VOZ** | Al iniciar la negociación se debita la consignación, y ahí mismo digitas el monto que propones. |
| **Etiqueta** | NEGOCIABLE · 2 DE 2 |
| **Titular** | Digita tu propuesta |
| **Bajada** | La consignación ya se debitó, y negocias directo con el vendedor. |
| **Toque** | sobre *Proponer* |

Es la única captura del reel que muestra una consignación en **dos monedas** (`>S< 60 ó US$ 180`).
Está en pantalla porque es la imagen del artículo y el beat es sobre este modal, pero **ninguna línea
de copy lee esos números**. El motivo está en §Lo que no tiene respaldo.

---

## ACTO 5 — La billetera · 34.91 – 39.89 s

### Beat 7 · `billetera` · frames 1030–1201

Captura: `billetera.png` — el perfil con el módulo Billetera y *Adquiere SubasCoins*.

**Sin número y con chip de contexto**, porque va al final del reel pero es lo primero en el tiempo
real de la persona: es un requisito previo, no un paso posterior.

| | |
|---|---|
| **VOZ** | Para todo esto necesitas fondos. Los cargas desde tu Billetera, con SubasCoins o con una recarga. |
| **Chip** | ANTES DE TODO ESTO |
| **Titular** | Carga tu Billetera |
| **Bajada** | Con SubasCoins o con una recarga. Sin fondos no puedes consignar. |
| **Toque** | sobre *Adquiere SubasCoins* |
| **Aviso** | ⚠️ Comprar SubasCoins con tarjeta cobra 3.9%. La recarga es la opción sin ese cobro. |

Existe porque todo lo anterior corre sobre plata que ya está en la Billetera: «es su responsabilidad
contar con los fondos necesarios en su Billetera para consignar» (T&C **IV.4.b**). Un tutorial que
termina sin decir de dónde sale la plata manda a alguien a un botón *Participa* que lo va a rechazar.

**El 3.9% es el número más útil del reel.** Las dos fuentes lo traen (T&C **IV.2.2.1.a** — «equivale
al 3.9% del valor de los SubasCoins adquiridos»; el mismo artículo del Centro de Ayuda) y es el único
lugar donde elegir entre los dos caminos para cargar plata cuesta dinero de verdad. La Recarga se
nombra como la vía sin el cobro porque **el artículo la nombra así**, no como recomendación nuestra.

---

## ACTO 6 — La excepción · 40.62 – 47.48 s

### Beat 8 · `subaspass` · frames 1201–1429

Captura: `subaspass.png` — **la misma pantalla de detalle del beat 2**, con el flujo entero
desaparecido: no hay *Participa*, no hay pop-up, el botón ya dice *Ingresa a la Sala* y la línea de
comisión está en `>S< 0`.

**No lleva número y el chip es una pregunta**, como el aparte de la factura en `Registro`: al que vino
a consignar una sola vez no le aplica, y tiene que poder dejar de leer en el chip.

| | |
|---|---|
| **VOZ** | Y si vas a participar seguido, con SubasPass consignas cero. Desde treinta SubasCoins al mes, con tu cuenta habilitada y sin deuda. |
| **Chip** | ¿PARTICIPAS SEGUIDO? |
| **Titular** | Consignación 0 |
| **Bajada** | Con SubasPass el paso de consignar no existe. Desde >S< 30 al mes. |
| **Toque** | sobre *Ingresa a la Sala* |
| **Aviso** | Sirve con la cuenta habilitada y sin deuda. Con deuda, el pase queda inaccesible. |

**Es el único beat que vende, y se gana el lugar siendo la excepción** a la premisa del reel en vez de
un anuncio atornillado al final.

**La captura es la prueba, no la tabla de precios.** `subaspass-planes.png` existe —cuatro planes,
de `>S< 30` a `>S< 120`— pero es una tabla apaisada de cuatro columnas, y a cualquier ancho que entre
en un cuadro vertical sus números dejan de leerse. Y ésta es mejor de todos modos: es *la misma
pantalla* del beat 2 con todo lo que el reel acaba de enseñar borrado. Dos beats de este reel valen
más como antes-y-después que cualquier tabla.

### Lo que la copia no afirma

Esa pantalla rotula su línea en cero como **«Comisión >S< 0»**, y las dos fuentes describen SubasPass
anulando la **consignación** (T&C **IV.9.b**; CA **[consignacion] Subaspass** — «con consignación
0»). Son dos cosas distintas y nada de lo disponible dice cuál de las dos significa la pantalla, así
que la copia dice lo único en que todas las fuentes coinciden: **el paso de consignar no ocurre**. Es
la misma disciplina que con el descuento de SubasCoins.

El precio va en la voz y en la bajada, y es literal: «Mensual >S< 30 (30 días)» es la lista del
artículo, junto con Trimestral `>S< 50`, Semestral `>S< 80` y Anual `>S< 120`. «Desde» es exacto —es
el más barato de los cuatro—. Lo que **no** se dice es nada sobre que salga más barato que consignar:
nadie lo compara en ninguna fuente, aunque las cifras del propio reel inviten a hacer la cuenta.

### El aviso es la condición, y es donde las fuentes no coinciden

El Centro de Ayuda dice que el pase te deja participar «sin restricciones … sin que tu nivel de
riesgo limite tu participación». Los T&C le ponen condiciones al beneficio entero: «siempre que la
cuenta del Usuario se encuentre habilitada y libre de deuda y/o bloqueos por parte del vendedor»
(**IV.9.b**), y **IV.9.c** deja el beneficio «inaccesible» hasta que se regularice una deuda.

**Los Términos prevalecen**, así que la condición va en pantalla. Vender un pase sin ella es cómo
alguien lo compra y no lo puede usar.

Es **violeta y no naranja**: es una condición sobre un beneficio, no un peligro.

---

## CIERRE · 48.21 – 52.57 s

### Beat 9 · `cierre` · frames 1429–1577

| | |
|---|---|
| **VOZ** | Con eso ya puedes consignar y entrar a la sala. Todo está en vmcsubastas.com. |
| | *[logo VMC]* |
| **Chip** | VMCSUBASTAS.COM |
| **Botón** | El link está en la bio |
| **Aviso** | **OJO** · Si no cumples como participante, la consignación vuelve como SubasCoins. |

El aviso es la regla que vive en los Términos y **no está en el artículo**, el mismo trabajo que
hacen los 14 días en `Registro`: **T&C IV.2.1.e** — «De incumplir las responsabilidades asumidas como
participante, el monto consignado siempre será convertido a SubasCoins antes de ser liberado a su
Billetera».

Es la otra mitad del aviso naranja, y es la mitad que nadie espera. Faltar a la sala **no te quema la
consignación** —te la devuelven— pero te la devuelven en SubasCoins, que sólo se gastan dentro del
Marketplace (T&C **IV.2.2.a**: «no constituyen dinero electrónico, moneda, depósito bancario…»).
Alguien que cargó con una Recarga en US$ justamente para poder retirarla pierde exactamente eso por
no aparecer.

Es **violeta y no naranja**: es la consecuencia de una regla, no un peligro, y cerrar el reel en
color de alarma le desarma el CTA que tiene encima.

> **Depende de la publicación:** «el link está en la bio» es cierto sólo si la bio de la cuenta que
> publique el reel apunta a `vmcsubastas.com` el día que salga. Mismo aviso que en `Registro`.

---

## Validación contra las fuentes oficiales

Contrastado con el skill `vmc-modelo-negocio` (sync de fuentes: 19 ago 2026). Cada línea del reel,
con su cita.

| Dónde | Afirmación | Fuente |
|---|---|---|
| Gancho, voz | «para participar hay que consignar» | T&C **II.25** y **IV.4.a** · CA **[consignacion]** — título del artículo |
| Gancho, voz | «son dos taps» | CA **[consignacion]** — «tap a Participa» + «tap sobre acepto» |
| Gancho, voz | «el sistema debita solo» | CA **[consignacion]** — «automáticamente el sistema debitará de tu Billetera» |
| Gancho, bajada | «va igual en En Vivo que en Negociable» | T&C **II.25** — «para publicar y/o participar de una oferta» · CA, las dos preguntas |
| Gancho, chip | «te lo muestro» | No lleva fuente: no afirma nada del producto, es el reel hablando de sí mismo |
| Participa | «detalle de la oferta» · «sesión iniciada» · «toca Participa» | CA **[consignacion]** — literal |
| Acepto | «ves el monto a consignar» · «toca Acepto» | CA **[consignacion]** — literal · rótulo del botón en `acepto.png` |
| Acepto, bajada | «debita el monto de tu Billetera» | CA **[consignacion]** — literal |
| Acepto, bajada | «te da acceso a la sala» | CA **[consignacion]** — «tendrás el acceso al proceso en la sala» |
| Bid, voz | «conectarte a la sala y enviar por lo menos un bid válido» | Pop-up del producto en `acepto.png` (literal) · T&C **IV.8.1.a** |
| Bid, aviso | «serás sancionado» | CA **[consignacion]** — «o serás sancionado» · T&C **V** (medidas correctivas) |
| Bid, titular | «un bid, mínimo» | T&C **II.30** (qué es un bid válido) y **IV.8.1.a** («por lo menos un bid válido») |
| Negocia | «no hay botón de aceptar» · «toca Negocia ahora» | CA **[consignacion]** Q2 (no hay paso de aceptación) · rótulo en `negocia.png` |
| Negocia, bajada | «la consignación sale al arrancar» | CA **[consignacion]** — «al iniciar una negociación, el sistema debitará automáticamente» |
| Propone | «digita el monto que propones» | CA **[oferta-negociable]** — «podrás iniciar una negociación enviando libremente el monto que tú desees» · rótulo del campo en `proponer.png` |
| Propone, bajada | «negocias directo con el vendedor» | T&C **IV.6.1.b** · CA **[oferta-negociable]** — literal |
| Billetera, voz | «necesitas fondos» | T&C **IV.4.b** — «es su responsabilidad contar con los fondos necesarios» |
| Billetera, voz | «con SubasCoins o con una recarga» | CA **[consignacion]** Q3 — literal |
| Billetera, aviso | «con tarjeta cobra 3.9%» | T&C **IV.2.2.1.a** — «equivale al 3.9% del valor de los SubasCoins adquiridos» · CA, mismo artículo |
| Billetera, aviso | «la recarga es la opción sin ese cobro» | CA **[consignacion]** — «la Recarga es la opción sin este cobro» |
| SubasPass, titular | «consignación 0» | CA **[consignacion] Subaspass** — «con consignación 0» · T&C **IV.9.b** — «consignando 0 SubasCoins» |
| SubasPass, bajada | «el paso de consignar no existe» | T&C **IV.10.e** — «podrán participar sin necesidad de consignación» · la captura `subaspass.png` |
| SubasPass, bajada | «desde >S< 30 al mes» | CA **[consignacion] Subaspass** — «Mensual >S< 30 (30 días)», el más barato de los cuatro planes |
| SubasPass, voz | «si vas a participar seguido» | CA **[consignacion] Subaspass** — «en caso quieras participar de múltiples procesos … el SubasPass es tu mejor alternativa» |
| SubasPass, aviso | «cuenta habilitada y sin deuda» | T&C **IV.9.b** — literal (+ **IV.10.e**) |
| SubasPass, aviso | «con deuda, el pase queda inaccesible» | T&C **IV.9.c** — «el beneficio de SubasPass quedará inaccesible hasta que regularice su situación» |
| Cierre, aviso | «vuelve como SubasCoins» | T&C **IV.2.1.e** — literal |
| Cierre, botón | «el link está en la bio» | Editorial, y depende de la publicación — ver el aviso del Beat 8 |

Las dos fuentes **se complementan** en casi todo lo que toca este reel: el Centro de Ayuda da el paso
a paso y los dos números (3.9%, el débito automático) y los T&C dan el marco contractual — qué es una
consignación, de quién es la responsabilidad de tener fondos, qué se asume como participante y en qué
moneda vuelve la plata si no se cumple.

**Difieren en un punto, y es de SubasPass.** El Centro de Ayuda dice que el pase deja participar «sin
restricciones … sin que tu nivel de riesgo limite tu participación»; los T&C condicionan el beneficio
entero a que la cuenta esté «habilitada y libre de deuda y/o bloqueos por parte del vendedor»
(**IV.9.b**) y lo declaran «inaccesible» mientras haya deuda (**IV.9.c**). **Los Términos
prevalecen**, así que el reel dice la condición. Vale corregir el artículo: «sin restricciones» es
más de lo que el contrato promete.

**Y hay una contradicción interna en los propios T&C**, menor pero real: el glosario (**II.24**)
define SubasPass como «suscripción **anual**», y **IV.9.d** enumera cuatro vigencias —mensual,
trimestral, semestral y anual—, que es lo que el Centro de Ayuda y la pantalla de planes muestran. El
reel sigue **IV.9.d**, que es la cláusula específica y coincide con el producto.

### Lo que no tiene respaldo, y por eso no está en el reel

- **«Con SubasCoins la consignación será menor.»** Es el claim central del video viejo, y es el que
  más cuesta dejar afuera porque **el producto se comporta así**: el modal de Negociable dice
  `>S< 60 ó US$ 180`, y 60 es menos que 180. Pero **ninguna de las dos fuentes lo dice**, y los T&C
  fijan el SubasCoin en un valor referencial de US$ 1.00 (**IV.2.2.d**), que argumenta lo contrario.
  Encima el producto no es consistente entre pantallas: el modal de En Vivo muestra **un solo monto**
  (`>S< 50`). Un reel no puede afirmar lo que sólo una captura insinúa, así que la captura se muestra
  y la copia no dice nada. **Vale preguntarlo:** si el descuento por consignar en SubasCoins es real,
  es un beneficio fuerte y el artículo debería decirlo; y si no lo es, los dos modales deberían
  mostrar lo mismo.
- **Cuánto demora consignar.** Ninguna fuente lo dice. El reel cuenta taps, no minutos.
- **Que la consignación se devuelva, y cuándo.** `[consignacion] Cuándo la devuelven` es otro
  artículo. El reel sólo dice **en qué moneda** vuelve si no cumples (T&C IV.2.1.e), que es lo que
  nadie espera; el cuándo no lo toca.
- **Los límites por Riesgo Usuario.** T&C **IV.4.c** limita consignar en ofertas «financiable» a
  usuarios de Riesgo Muy Bajo a Regular, y **IV.4.e** deja al vendedor restringir por riesgo sin
  avisar. Es cierto y está citado, pero es una excepción y meterla haría dudar al 90% al que no le
  aplica. Vive en `[riesgo-usuario]`.
- **La pantalla amarilla de «Ya eres participante».** Sale en el video viejo y no está en ninguna de
  las capturas del artículo. No se dibuja de nuevo.
- **Que SubasPass salga más barato que consignar.** Las cifras invitan a la cuenta —un plan Mensual
  cuesta `>S< 30` y la consignación del propio ejemplo del artículo es `>S< 50`— pero **nadie las
  compara en ninguna fuente**, y una consignación no tiene monto fijo: cambia por oferta. El reel
  pone el precio y no hace la resta. Si la comparación se quiere afirmar, hay que sostenerla con un
  rango real de consignaciones, no con un ejemplo.
- **Que SubasPass anule la comisión.** La captura rotula su línea en cero como «Comisión >S< 0», pero
  las dos fuentes hablan de la **consignación**. Nada dice cuál de las dos significa esa pantalla, así
  que la copia dice sólo lo que todas las fuentes sostienen: el paso de consignar no ocurre. **Vale
  preguntarlo**, porque si además anula la comisión de 7.5% el pase vale muchísimo más de lo que el
  artículo cuenta.
- **Los planes de SubasPass, en pantalla.** `subaspass-planes.png` es una tabla apaisada de cuatro
  columnas y sus números no se leen a ningún ancho que entre en un cuadro vertical. Los cuatro precios
  están en el artículo y en la voz; la tabla no se muestra.

---

## Lo que falta para darlo por terminado

1. **La voz.** No está grabada. El bloque para ElevenLabs está en `VOZ-CONSIGNAR.md`; la composición
   corre muda hasta entonces.
2. **Los frames.** Los de este documento y los de `GUION` son una **estimación** por conteo de
   palabras, no una medición. Cuando llegue la toma se miden con `silencedetect` y se reemplazan los
   dos, en el mismo commit.
3. **Preguntar por el descuento en SubasCoins** — ver §Lo que no tiene respaldo. Es la decisión de
   contenido más valiosa que quedó abierta: si es real, es material para su propio reel.
4. **Decidir si reemplaza al video de YouTube.** El artículo enlaza hoy `BArqY0cM39I`, que recorre un
   flujo más largo que el artículo y termina en la sala en vivo. Este reel es vertical y cubre menos,
   así que no es un reemplazo directo — pero el video viejo muestra pantallas que ya no están en el
   artículo.
5. **El artículo de SubasPass promete más que el contrato.** Ver §Validación: «sin restricciones»
   contra la condición de cuenta habilitada y sin deuda de T&C IV.9.b. Hay que alinear el artículo en
   `CentroDeAyudaVMC`.
6. **Los T&C se contradicen sobre la vigencia del pase.** El glosario II.24 dice «anual», IV.9.d
   enumera cuatro planes. El reel sigue IV.9.d; el glosario habría que corregirlo.
7. **`Registro` sigue con `de={4}`, que ya no usa.** Al pasar a `PasoEscena` la etiqueta explícita,
   `Registro` mantiene `n`/`de` y `Consignar` usa `etiqueta`. Las dos vías funcionan y conviven a
   propósito, pero si aparece un tercer tutorial que tampoco numere, `n`/`de` sobra y se borra.

## Qué cambia con otro contenido

Casi nada llega por props: `CONSIGNAR` sólo lleva `sitio` y `fondo`. Es a propósito — un tutorial de
consignación no se re-parametriza, se reescribe cuando el producto cambia.

Lo que sí hay que resincronizar cuando las pantallas se muevan son las seis capturas:

```bash
cd <CentroDeAyudaVMC>/public/images/articulos
cp consignacion-paso-1-participa.png            <Instagram>/reels/remotion/public/reel/consignar/participa.png
cp consignacion-paso-2-acepto.png               <Instagram>/reels/remotion/public/reel/consignar/acepto.png
cp consignacion-negociable-paso-1-negocia.png   <Instagram>/reels/remotion/public/reel/consignar/negocia.png
cp consignacion-negociable-paso-2-proponer.png  <Instagram>/reels/remotion/public/reel/consignar/proponer.png
cp consignacion-billetera-adquiere.png          <Instagram>/reels/remotion/public/reel/consignar/billetera.png
cp subaspass-paso-2-ingresa-sala.png            <Instagram>/reels/remotion/public/reel/consignar/subaspass.png
```

La sexta —`subaspass.png`— viene del artículo hermano, no del principal. Si el detalle de la oferta
cambia hay que resincronizar **`participa.png` y `subaspass.png` juntas**: todo el beat 8 funciona
porque son la misma pantalla con y sin pase, y si una se actualiza sin la otra el antes-y-después
deja de ser cierto.

Y si alguna cambia de tamaño, corregir `w`/`h` en `PANTALLAS` (`identify` los imprime) y volver a
mirar el `foco`: son fracciones de la imagen, así que un recorte distinto los mueve. Ojo con
`acepto`, que tiene **dos** entradas —`acepto` y `aceptoTexto`— apuntando al mismo archivo con foco
distinto: hay que corregir las dos.
