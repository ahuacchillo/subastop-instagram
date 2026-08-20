# Guión — Cómo registrarte en VMC

Voz y pantalla del reel `Registro` (`out/registro.mp4`, ~42.7 s estimados, 270×480 @ 30 fps), beat
por beat.

**Un solo objetivo:** que alguien que nunca entró a VMC llegue con su cuenta creada. Nada de qué
son las SubasCoins, cómo se recarga la billetera ni cómo se participa en una subasta — cada una de
esas es otro artículo del Centro de Ayuda y, cuando toque, otro reel.

**Es el primer tutorial del repo**, y por eso rompe una regla que los tres reels de marca respetan:
las pantallas **no** se rebajan a componentes de Concorde, son las capturas reales del Centro de
Ayuda. El motivo está en §Por qué capturas, más abajo.

**Cada frase está contrastada contra las dos fuentes oficiales.** La trazabilidad completa está en
§Validación, al final. Si escribes una línea nueva, va con su cita o no va.

## Dónde vive cada cosa

Este documento es de **lectura**: sirve para revisar la copia y la locución de un vistazo. No es la
fuente de la verdad de nada.

| Qué | Fuente real |
|---|---|
| Frames de cada beat | `GUION` en `remotion/src/reels/Registro.tsx` |
| Texto en pantalla | los componentes de `remotion/src/reels/Registro.tsx` |
| Las capturas | `remotion/public/reel/registro/`, copiadas del Centro de Ayuda |
| Locución grabada | **no existe todavía** → `VOZ-REGISTRO.md` |
| Los hechos | T&C + Centro de Ayuda, vía el skill `vmc-modelo-negocio` |
| La versión 16:9 | la misma composición con `ancho`, en `RegistroYT` → `out/yt-registro.mp4` |

Si cambias cualquiera de esos, este archivo queda desactualizado y hay que tocarlo a mano.

**Este guión vale para las dos formas.** `Registro` (1080×1920, Instagram) y `RegistroYT` (1920×1080,
YouTube) son la misma composición: mismo copy, mismas capturas, mismos frames, misma voz. Sólo
cambia cómo se acomodan los beats — una columna contra dos —, y eso vive en `tutorial.tsx`, no
acá. Corregir una línea la corrige en las dos.

---

## De dónde salió, y qué se dejó afuera

El video anterior de registro (YouTube `DGFzz3IY_hg`, el que enlaza el artículo hoy) tiene once
pantallas y **ya no describe el producto**. Su recorrido era: Ingresa → Regístrate → nombres y
apellidos → condiciones → pop-up de beneficios → **comprar 60 SubaCoins** → **confirmar la
compra** → **pasarela de pago** → código único de usuario → resumen → outro.

De todo eso, el artículo actual (act. 18 ago 2026) deja **cuatro pasos**, y termina en las
casillas de Condiciones y Términos. La compra de monedas, la pasarela y el código de usuario se
fueron a la billetera, que tiene sus propios artículos (`billetera/la-recarga`,
`billetera/subascoins`). Meterlos acá era lo que hacía largo al video viejo: dos productos
distintos —crear la cuenta y cargarle plata— contados como si fueran uno.

Lo que sí se rescató del guion viejo: **los datos de Justo Subastín**, que ya están dentro de las
capturas, así que el personaje sobrevive sin dibujar nada.

Y lo que se probó y se descartó: **«cazar ofertas»**. En el video viejo era el remate; acá pasó dos
versiones en el gancho antes de salir del reel entero. Como remate es una promesa que la pantalla
siguiente rompe —al terminar el registro todavía no puedes ofertar, eso necesita consignación— y
como gancho reducía VMC a un solo lado del negocio. Ver §Por qué el gancho no habla de subastas.

## Por qué capturas y no Concorde

La regla de `REELS.md` §4 —*si el vendedor lo vería en la app, sale de Concorde*— existe para que
un reel de marca no envejezca cuando el producto se mueve. Un tutorial tiene el problema opuesto:
el espectador va a ir a buscar ese botón, y necesita **reconocerlo**. Un botón redibujado que está
90% bien manda a alguien a buscar un control que no se ve así.

Además las capturas son las **mismas** que el artículo, copiadas del mismo archivo. Reel y artículo
muestran lo mismo por construcción, no por disciplina.

## Cómo se reparte la venta

El reel tiene que convertir sin dejar de enseñar, y el reparto no es el mismo para la voz que para
la pantalla.

**La voz vende en las puntas.** El gancho da la razón para quedarse y el cierre da la razón para
actuar; en los cuatro pasos del medio la voz sólo instruye, porque una voz entusiasta sobre
«completa tus datos» es un paso que alguien tiene que rebobinar.

**La pantalla vende en todos los beats.** Las bajadas se escribieron primero como notas de manual
—«es el mismo botón para entrar y para crear tu cuenta»— y leídas seguidas sonaban a pie de página:
correctas, verificables y sin una sola razón para seguir mirando. Ahora cada una nombra lo que la
persona gana o lo poco que le cuesta, y el dato que la sostiene va detrás, no delante. Es la mitad
que un espectador mudo lee, así que es la mitad que tiene que vender.

Y toda la venta se hace con material verificable: los dos tipos de oferta que existen (En Vivo y
Negociable), dos cosas que la cuenta habilita de verdad (agendar visitas, consignar tu vehículo) y
una fecha límite que es una cláusula (los 14 días). Nada de adjetivos.

## Por qué el gancho dice «crea tu cuenta» y nada más

Cuatro versiones. Las dos primeras fallaron por nombrar la cosa que se vende; la tercera, por no
nombrar de qué era el video.

**«Conviértete en Cazador de Ofertas»** lo estrechó por **público**. Es copy del producto —está en
`login.png`, la pantalla de bienvenida llama así al usuario— pero es una palabra de comprador, y
encuadraba el reel entero como una cacería de subastas. El público de VMC es comprador **y**
vendedor: tres de los cuatro reels de este repo venden consignación. El registro es el único sitio
por donde pasan todos.

**«Compra o vende autos»** lo estrechó por **categoría**, y ésa la contradice el contrato. Los T&C
no escriben «auto» en ninguna parte. La palabra es **activo** (**II.17**: «pueden ser nuevos o
seminuevos (usados), operativos o inoperativos y encontrarse bajo la condición siniestrado(s),
salvamento o chatarra»), el servicio se define sobre «procesos electrónicos de oferta y/o
negociación de **activos** de propiedad de terceros» (**I**), y «vehículos» aparece **una sola vez**
en todo el documento —en **III.b**, como recomendación de estilo para redactar publicaciones—. Que
hoy predominen los autos es la realidad comercial, no el alcance del servicio.

**«En Vivo o Negociable»** fue la tercera, y esquivar el sustantivo funcionó — pero se pasó de largo
en la otra dirección. Como titular, los nombres de las dos modalidades leen como **publicidad de los
formatos**: quien scrollea se entera de que VMC tiene dos y no se entera de que este reel es un
cómo-se-hace para registrarse, que es lo único que el gancho de un tutorial existe para decir. Un
gancho impecablemente citado que no dice de qué es el video es un gancho roto.

**La cuarta reparte los tres trabajos en vez de que se peleen el mismo lugar.** El titular dice qué
enseña el reel, la bajada dice qué tan ancha es la cuenta —comprar y vender, que es la anchura que
la segunda versión buscaba y erró— y las dos modalidades se mudan a la voz, donde son el **motivo**
y no el sujeto.

**«Activo» es la palabra correcta y es inusable acá:** es vocabulario de contrato. El gancho esquiva
el sustantivo en vez de inventarle un sinónimo simpático que las fuentes no tienen. Dos avisos para
el próximo que abra esto: **no le vuelvas a poner una categoría al titular** —«autos» afirma algo que
los T&C no dicen— y **tampoco le vuelvas a poner las modalidades**, que es de qué es el video lo que
tiene que decir.

---

## ACTO 1 — El gancho · 0.00 – 7.48 s

### Beat 1 · `gancho` · frames 0–229

Sin capturas. Es el único lugar donde el reel puede decir para qué son los cuarenta segundos que
siguen; una pantalla acá sería el paso 1 llegando temprano.

| | |
|---|---|
| **VOZ** | Vamos a crear tu cuenta en VMC. La necesitas para competir en vivo o negociar directo con el vendedor. Son cuatro pasos nada más. |
| **Logo** | *[logo VMC]* |
| **Titular** | Crea tu cuenta<br>en 4 pasos |
| **Bajada** | La misma cuenta sirve para comprar y para vender. |
| **Chip** | TE LO MUESTRO |

Los tres elementos se reparten tres trabajos distintos, en vez de pelearse el mismo:

| Elemento | Su trabajo | Lo que dice |
|---|---|---|
| **Titular** | qué enseña el reel | Crea tu cuenta en 4 pasos |
| **Bajada** | qué tan ancha es la cuenta | sirve para comprar y para vender |
| **Voz** | por qué te hace falta | competir en vivo, o negociar directo |

Que «4 pasos» esté en pantalla mientras la voz dice «cuatro pasos» es la excepción de `REELS.md` §4:
en el primer acto el titular sigue a la voz a propósito.

El titular va en **dos líneas rotas a mano** —a tamaño 26 el cuadro aguanta ~16 caracteres— y
**sin punto final**. Eso último es tipográfico, no de estilo: con el tracking en −0.5 el par «s»+«.»
deja un hueco visible («en 4 pasos .») que se lee como error de tipeo en la tipografía más grande
del reel. Los cuatro titulares de los pasos tampoco llevan punto, así que de paso quedan iguales.

El chip es el único elemento que sostiene la retención en el segundo tres, y pasó por tres versiones
buscando el trabajo que le queda libre.

**SON 4 PASOS** era la promesa de brevedad, y salió porque la voz dice «son cuatro pasos» en ese
mismo segundo: el chip estaba repitiendo en pantalla lo que se oía, justo lo que `REELS.md` §4
prohíbe. **TEN TU DNI A MANO** era el requisito, y es un dato útil —la fricción real del paso 3 es
llegar al campo del DNI sin el DNI— pero abre el gancho con una tarea, y una tarea en el segundo
tres es un motivo para irse a buscar la billetera en vez de seguir mirando.

Ahora dice **TE LO MUESTRO**, que es la promesa del formato. Con este gancho el titular ya dice
**qué** son las dos ofertas y la bajada dice **por qué** hace falta la cuenta, así que lo único que
falta es que alguien prometa que el reel de verdad lo va a mostrar. Es también el único elemento del
reel que habla en primera persona, que es el tono que `VOZ-REGISTRO.md` le pide a la toma: alguien
que te guía por encima del hombro, no un comercial.

Y no necesita fuente, porque no afirma nada del producto: es el reel hablando de sí mismo. Lo del
DNI no se perdió como información —la voz lo enumera en el paso 3— sino como tarea previa.

---

## ACTO 2 — Llegar al formulario · 8.21 – 14.55 s

Desde acá y hasta el cierre, la bajada **no** repite la voz: dice lo que la voz no tuvo espacio de
decir, y siempre sale de una fuente.

### Beat 2 · `paso1` · frames 229–354

Captura: `home-ingresar.png` — la portada, con el botón Ingresa arriba a la derecha.

| | |
|---|---|
| **VOZ** | Entra a vmcsubastas.com y toca Ingresa. |
| **Chip** | PASO 1 / 4 |
| **Titular** | Toca Ingresa |
| **Bajada** | Un solo botón para todo: ahí creas tu cuenta y ahí vuelves a entrar. |
| **Toque** | sobre *Ingresa* |

La bajada quita la fricción de buscar un botón de "registro" que la portada no tiene, y es
verificable en las dos capturas que el propio reel muestra: Ingresa abre la bienvenida, y
Regístrate está ahí.

### Beat 3 · `paso2` · frames 354–442

Captura: `login.png` — «¡Bienvenido! Cazador de Ofertas», con Regístrate abajo.

| | |
|---|---|
| **VOZ** | En la pantalla de bienvenida, toca Regístrate. |
| **Chip** | PASO 2 / 4 |
| **Titular** | Toca Regístrate |
| **Bajada** | Y si ya tienes cuenta, entras desde la misma pantalla. Nada que buscar. |
| **Toque** | sobre *Regístrate* |

Es el beat más corto del reel (2.9 s). La bajada es la cuarta pregunta del artículo —*el formulario
me impide registrarme*—, cuya causa más común es que la persona ya se registró y no se acuerda.
Desviarla acá cuesta una línea y ahorra un ticket.

---

## ACTO 3 — El formulario · 15.28 – 34.51 s

### Beat 4 · `paso3` · frames 442–660

Captura: `datos-personales.png` — Nombres, Apellidos, DNI, Celular, Correo. **Sin toque:** un
formulario se llena, no se presiona, y un anillo sobre un campo cualquiera mentiría.

| | |
|---|---|
| **VOZ** | Completa tus datos: nombres, apellidos, DNI, celular, correo y contraseña. Con los tuyos: la cuenta es personal e intransferible. |
| **Chip** | PASO 3 / 4 |
| **Titular** | Completa tus datos |
| **Bajada** | Son datos que ya sabes de memoria. Un correo y un celular por cuenta. |

La voz dice la **regla** y la pantalla dice el **esfuerzo**, y ninguna repite a la otra. La voz usa
la frase contractual («personal e intransferible», T&C II.6 y III.1.d) en vez de «no aceptamos
registros de terceros», que es la del artículo: dice lo mismo y es la que se puede citar.

La bajada abre desarmando el paso —son datos que cualquiera tiene en la cabeza— y recién después
pone la regla que hace fallar el formulario. Antes decía además «si ya los usó un familiar, no se
repiten», que es el caso concreto del artículo; se fue porque la regla sola evita el mismo error y
la línea de adelante hace el trabajo que un pie de página no hacía.

### Beat 5 · `factura` · frames 660–869

Captura: `factura-ruc.png` — la zona Quiero Recibir, con Boleta / Factura y el campo RUC. Ventana
corta (147 px, no 262): el recorte original mide 554×407 y la sección son tres controles de alto.

**No lleva número, a propósito.** Persona jurídica es un campo dentro del paso 3, no un quinto
paso; numerarlo le diría a quien sólo quiere boleta que todavía le deben dos pasos. El chip es una
pregunta para que el que no la necesita sepa que puede dejar de leer.

| | |
|---|---|
| **VOZ** | ¿Necesitas factura? En Quiero Recibir elige Factura y agrega tu RUC. Si no, quedas como persona natural y recibes boleta. |
| **Chip** | ¿NECESITAS FACTURA? |
| **Titular** | Elígelo en<br>Quiero Recibir. |
| **Toque** | sobre *Factura* |
| **Aviso** | ⚠️ Con Factura, los comprobantes salen a nombre de la razón social. Como persona natural, solo recibes boleta. |

El aviso es el recuadro naranja del artículo y es la única razón por la que este beat existe:
elegir Factura no es una preferencia, es la identidad tributaria de **todas** tus compras futuras.
Del formulario solo, eso no se deduce. Las dos mitades del aviso son ahora palabras del Centro de
Ayuda; la versión anterior cerraba con «con Boleta, a tu nombre», que es cierto y obvio pero no
está en ninguna fuente.

### Beat 6 · `paso4` · frames 869–1040

Captura: `condiciones-terminos.png` — el texto de las Condiciones, las tres casillas y Sigamos.

| | |
|---|---|
| **VOZ** | Marca las casillas de Condiciones y Términos y de la política de privacidad, y toca Sigamos. |
| **Chip** | PASO 4 / 4 |
| **Titular** | Toca Sigamos |
| **Bajada** | Es el último paso. Al terminarlo tu cuenta ya está creada. |
| **Toque** | sobre *Sigamos* |

El titular era **«Acepta y sigue»** y era el único de los cuatro que no nombraba su botón, cuando el
botón dice **Sigamos**. Es exactamente lo que `VOZ-REGISTRO.md` le exige a la voz —«si la voz dice
"entra a tu cuenta" y el botón dice "Ingresa", el reel falló»— y la pantalla se estaba eximiendo sola.

«Acepta y toca Sigamos» lo arreglaba pero se parte en dos líneas, y eso baja la ventana de este paso
27 px respecto de los otros tres: le cuesta a la lista su forma. Así que el titular toma el patrón
**«Toca X»** de los pasos 1 y 2 —tres de cuatro pasos abriendo igual es una ventaja en un tutorial—
y «acepta» se queda en la voz, que tiene sitio para decir *cuáles* casillas. La pantalla las muestra
ya marcadas.

La bajada dice **qué pasa al terminar**, y es el único beat donde eso sirve de algo: es el que cierra
el registro, así que es el único que puede prometer que ya está.

Pasó por dos versiones antes de esta. La primera era «al marcarlas declaras haberlas leído», la
frase de los T&C (**I**) y la única línea del reel con peso legal en pantalla: correcta, y un freno
justo donde el reel necesita empujar. La segunda, «último paso, y el que te deja dentro», empujaba
pero no decía dentro de qué. La tercera dice la consecuencia sin figuras: **la cuenta queda creada**.
La voz sigue diciendo qué se marca.

---

## CIERRE · 35.24 – 42.72 s

### Beat 7 · `cierre` · frames 1040–1282

| | |
|---|---|
| **VOZ** | Y listo, ya eres parte de VMC. Ahora entra, elige tu oferta y agenda tu visita para verlo en físico. |
| | *[logo VMC]* |
| **Chip** | VMCSUBASTAS.COM |
| **Botón** | El link está en la bio |
| **Aviso** | **14 DÍAS** · Úsala antes: una cuenta sin transacciones se da de baja sola. |

El cierre hace dos trabajos distintos: cerrar la cuenta y hacer que se use. Los separa la regla de
los 14 días (T&C IV.1.2.a), que **no está en el Centro de Ayuda**: quien sólo lea el artículo nunca
se entera de que una cuenta recién creada puede desaparecer sola.

Por eso el aviso va **en pantalla y no en la voz**, y la voz dice otra cosa. Es la regla de §4
usada como está pensada, y además es el reparto correcto para Instagram, que se ve en silencio: la
fecha límite es la mitad que un espectador mudo no se puede perder, y «entra y agenda tu visita»
sólo funciona con sonido de todos modos.

El aviso es **violeta y no naranja** como el de la factura: es una fecha límite, no un peligro, y
cerrar el reel en color de alarma le desarma el CTA que tiene encima.

El botón decía **«Regístrate ahora»** y tenía dos problemas a la vez. Es un botón dibujado dentro de
un video: nadie lo puede tocar, así que un texto de acción ahí es una afordancia falsa. Y con
VMCSUBASTAS.COM justo encima, el cierre tenía **dos llamados compitiendo** y ninguno decía el gesto
real que hace un espectador de Instagram.

Ahora se reparten: el chip dice **dónde** (el sitio) y el botón dice **cómo** (el link de la bio).
Una píldora que dice «el link está en la bio» es el idioma del formato, no una afordancia falsa.

> **Depende de la publicación:** esto es cierto sólo si la bio de la cuenta que publique el reel
> apunta a `vmcsubastas.com` el día que salga. Si el reel va a un carrusel o a un post sin link en
> bio, el botón tiene que volver a decir el sitio.

Y el llamado es **agendar una visita**, no «a cazar ofertas», porque es lo único que una cuenta
recién creada puede hacer de verdad: ofertar necesita consignación, agendar una visita no necesita
más que estar registrado.

La voz dice **«verlo en físico»** y no «ver el auto en físico», por lo mismo que el gancho no nombra
el bien: los T&C hablan de visitar «los **bienes o activos**» (**II.23**), no autos. Son dos palabras
menos en el bloque más largo del reel, así que el cierre respira un poco más sobre el CTA — que es
donde conviene que respire.

---

## Cómo se ve — las tres decisiones que no son de copy

El detalle largo de cada una está en su comentario en `remotion/src/reels/Registro.tsx`. Resumen
para quien esté revisando el reel y se pregunte si algo es a propósito:

- **Los cortes son cortes, no disolvencias.** `Escena` acá es propio del reel: sólo reproduce la cola
  de la escena que sale, sin fundido de entrada. El `Escena` compartido de `ui.tsx` es simétrico, y
  con dos beats que ponen chip y titular en la misma esquina dejaba los dos legibles a la vez —el
  render tenía «PASO 1 / 4 · Toca Ingresa» encima de «Compra o vende» a los 7.9 s. Los tres reels de
  marca siguen usando el compartido: están terminados.
- **Los bordes de la ventana van desenfocados.** El recorte siempre parte algo (`ingresar` pierde
  36 px por la izquierda, `factura` 22 px por la derecha) y una palabra cortada se lee como bug de
  render. Un inset shadow no servía: sobre el morado del home no se ve nada. Un desenfoque no tiene
  color propio y disuelve el tipo igual sobre blanco que sobre morado.
- **El anillo de toque rodea el control, no lo pisa.** Arrancaba en escala 0.55 y algunos frames lo
  agarraban dentro del botón, dibujado por encima de «Regístrate» y de «Factura» — la única palabra
  que el reel manda a buscar. Ahora el mínimo son 38 px y el punto sólido del centro se fue.

---

## Validación contra las fuentes oficiales

Contrastado con el skill `vmc-modelo-negocio` (sync de fuentes: 19 ago 2026). Cada línea del reel,
con su cita.

| Dónde | Afirmación | Fuente |
|---|---|---|
| Gancho, voz | «competir en vivo» | T&C **II.26** — «compiten en tiempo real, enviando sus bids en sala» |
| Gancho, voz | «negociar directo con el vendedor» | T&C **IV.6.1.b** y CA **[oferta-negociable]** — literal |
| Gancho, voz | «son cuatro pasos» | CA **[registro]** — Paso 1 a Paso 4 |
| Gancho, chip | «te lo muestro» | No lleva fuente: no afirma nada del producto, es el reel hablando de sí mismo |
| Gancho, titular | «crea tu cuenta en 4 pasos» | CA **[registro]** — Paso 1 a Paso 4 |
| Gancho, bajada | «sirve para comprar» | T&C **I** — «podrán acceder y participar … los que mantengan una Cuenta activa» |
| Gancho, bajada | «y para vender» | T&C **IV.4** (consignación) y **IV.11** (publicación) |
| Paso 1 | «Entra a vmcsubastas.com» · «toca Ingresa» | CA **[registro]** Paso 1 · rótulo del botón en `home-ingresar.png` |
| Paso 1, bajada | «un solo botón para todo»: crear cuenta y entrar | Las dos capturas del propio reel |
| Paso 2 | «pantalla de bienvenida» · «toca Regístrate» | CA **[registro]** Paso 2 |
| Paso 2, bajada | «entras desde la misma pantalla» | CA **[registro]** — «solo debes ir a Iniciar sesión» |
| Paso 3, voz | nombres, apellidos, DNI, celular, correo | T&C **IV.1.1.a.i** (lista literal) |
| Paso 3, voz | contraseña | T&C **II.6** («credenciales creadas durante el proceso de registro») y **III.1.d** |
| Paso 3, voz | «personal e intransferible» | T&C **II.6** y **III.1.d** (+ **IV.1.1.b**, declaración jurada, art. 438 CP) |
| Paso 3, bajada | «un correo y un celular por cuenta» | CA **[registro]** — «un familiar haya usado tu correo o número de celular» |
| Factura, voz | «Quiero Recibir» → «Factura» | CA **[registro]** — persona jurídica |
| Factura, voz | «agrega tu RUC» | T&C **IV.1.1.a.ii** (el RUC sólo figura en los T&C) |
| Factura, voz | «persona natural y recibes boleta» | CA **[registro]** — «si te registras como persona natural solo recibirás boleta» |
| Factura, aviso | «a nombre de la razón social» | CA **[registro]** — literal |
| Paso 4 | casillas de C&T y política de privacidad | CA **[registro]** Paso 4 |
| Paso 4, titular | «Toca Sigamos» | Rótulo del botón en `condiciones-terminos.png` |
| Paso 4, bajada | «es el último paso» | CA **[registro]** — Paso 4 es el último del artículo |
| Paso 4, bajada | «tu cuenta ya está creada» | CA **[registro]** — el artículo termina en Sigamos, no hay paso 5 |
| Cierre, aviso | «14 días sin transacciones se da de baja sola» | T&C **IV.1.2.a** — literal |
| Cierre, aviso | «Úsala antes» | Editorial: es el imperativo de la cláusula de arriba, no un dato nuevo |
| Cierre, voz | «agenda tu visita» | CA **[visitas]** |
| Cierre, botón | «el link está en la bio» | Editorial, y depende de la publicación — ver el aviso del Beat 7 |

Las dos fuentes **se complementan** y no se contradicen en nada de lo que toca este reel: los T&C
dan la regla contractual (cuenta activa obligatoria, qué datos, intransferibilidad, RUC, los 14
días) y el Centro de Ayuda da el paso a paso y la parte de comprobantes que los T&C no tocan.

### Lo que no tiene respaldo, y por eso no está en el reel

- **La tercera casilla del formulario** (promociones y publicidad) sale marcada en la captura, pero
  ni los T&C ni el Centro de Ayuda dicen si es obligatoria. El reel no la nombra.
- **Que el registro sea gratis.** Nadie lo dice en ninguna fuente. No se afirma.
- **Cuánto demora registrarse.** El artículo dice «fácil y rápido» y hasta ahí llega el reel: nada
  de «en dos minutos».
- **El C.U.U.** se asigna en el registro (T&C II.7) y el video viejo lo mostraba, pero no es un
  paso del registro y el artículo actual no lo menciona. Vive en `[billetera] la recarga`.

---

## Lo que falta para darlo por terminado

1. **La voz.** No está grabada. El bloque para ElevenLabs está en `VOZ-REGISTRO.md`; la composición
   corre muda hasta entonces.
2. **Los frames.** Los de este documento y los de `GUION` son una **estimación** por conteo de
   palabras, no una medición. Cuando llegue la toma se miden con `silencedetect` y se reemplazan
   los dos, en el mismo commit.
3. **El artículo se contradice con su propia captura.** El texto del Paso 1 dice «haz clic en el
   botón **Ingresar**» y la imagen que lo acompaña muestra un botón que dice **Ingresa**. El reel
   sigue la captura, que es lo que el usuario ve. Hay que alinear el artículo en el repo
   `CentroDeAyudaVMC`.
4. **El scraper del skill se salta los `div[role="alert"]`.** «No permitimos registros de terceros»
   está en el `.astro` del Centro de Ayuda y **no** en `reference/centro-de-ayuda.md`; el otro
   «¡ATENCIÓN:» (persona jurídica), que no lleva `role`, sí sobrevivió. Revisar `scripts/refresh.py`
   del skill `vmc-modelo-negocio`.
5. **Decidir si reemplaza al video de YouTube.** El artículo enlaza hoy `DGFzz3IY_hg`, que describe
   un flujo que ya no existe. Este reel es vertical y el de YouTube es horizontal, así que no es un
   reemplazo directo — pero mientras el viejo siga enlazado, el artículo se contradice a sí mismo.

## Qué cambia con otro contenido

Casi nada llega por props: `REGISTRO` en `remotion/src/reels/Registro.tsx` sólo lleva `sitio` y
`fondo`. Es a propósito — un tutorial de registro no se re-parametriza, se reescribe cuando el
producto cambia.

Lo que sí hay que resincronizar cuando el registro se mueva son las cinco capturas:

```bash
cd <CentroDeAyudaVMC>/public/images/articulos
for f in home-ingresar login datos-personales condiciones-terminos factura-ruc; do
  cp "registro-$f.png" "<Instagram>/reels/remotion/public/reel/registro/$f.png"
done
```

Y si alguna cambia de tamaño, corregir `w`/`h` en `PANTALLAS` (`identify` los imprime) y volver a
mirar el `foco`: son fracciones de la imagen, así que un recorte distinto los mueve.
