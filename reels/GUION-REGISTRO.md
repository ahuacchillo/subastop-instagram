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

Si cambias cualquiera de esos, este archivo queda desactualizado y hay que tocarlo a mano.

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

## Por qué el gancho no habla de subastas

El gancho abrió dos versiones con **«Conviértete en Cazador de Ofertas»**. Es copy del producto —está
en `login.png`, la pantalla de bienvenida llama así al usuario— y por eso parecía la apertura
gratis: vendedora y sin inventar nada.

El problema no era la exactitud, era el encuadre. «Cazador de Ofertas» es una palabra de
**comprador**, y VMC es más ancho que eso en los dos ejes: la oferta es En Vivo **y** Negociable
(T&C **IV.5** y **IV.6**), y el público es comprador **y** vendedor —tres de los cuatro reels de
este repo venden consignación—. El registro es el único sitio por donde pasan todos, así que
estrecharlo a cazar subastas tiraba media sala. «Compra o vende» mide lo mismo y no excluye a nadie.

La frase no se perdió: sigue en pantalla dos beats después, donde le toca — como el saludo del
producto, no como la tesis del reel.

---

## ACTO 1 — El gancho · 0.00 – 7.48 s

### Beat 1 · `gancho` · frames 0–229

Sin capturas. Es el único lugar donde el reel puede decir para qué son los cuarenta segundos que
siguen; una pantalla acá sería el paso 1 llegando temprano.

| | |
|---|---|
| **VOZ** | En VMC compras y vendes autos, y todo empieza en el mismo sitio: tu cuenta. Son cuatro pasos y es muy fácil y rápido. |
| **Logo** | *[logo VMC]* |
| **Titular** | Compra o vende:<br>todo empieza<br>con tu cuenta. |
| **Bajada** | Ofertas En Vivo y Negociables, visitas para ver el auto en físico, y vender el tuyo. |
| **Chip** | SON 4 PASOS |

El titular y la voz dicen lo mismo con otras palabras —«compras y vendes» / «Compra o vende»—, y es
la excepción de `REELS.md` §4: en el primer acto el titular va casi palabra por palabra a propósito.

Va en **tres líneas rotas a mano**. A tamaño 26 el cuadro aguanta ~16 caracteres, y el corte tiene
que caer después de los dos puntos: si «Compra o vende:» se parte, deja de leerse como una elección
y el gancho pierde justo lo que lo hace general.

La bajada es la lista de lo que esa cuenta abre, y las cuatro cosas están en las fuentes: los dos
tipos de oferta (T&C **IV.5** y **IV.6**), la visita física (CA **[visitas]**) y consignar el propio
vehículo (T&C **IV.4**). Ninguna necesita nada más que la cuenta.

El chip es la promesa de brevedad, y es lo único que sostiene la retención en el segundo tres.

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
| **Titular** | Acepta y sigue |
| **Bajada** | Es el último paso. Al terminarlo tu cuenta ya está creada. |
| **Toque** | sobre *Sigamos* |

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
| **VOZ** | Y listo, ya eres parte de VMC. Ahora entra, elige tu oferta y agenda tu visita para ver el auto en físico. |
| | *[logo VMC]* |
| **Chip** | VMCSUBASTAS.COM |
| **Botón** | Regístrate ahora |
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

Y el llamado es **agendar una visita**, no «a cazar ofertas», porque es lo único que una cuenta
recién creada puede hacer de verdad: ofertar necesita consignación, agendar una visita no necesita
más que estar registrado.

---

## Validación contra las fuentes oficiales

Contrastado con el skill `vmc-modelo-negocio` (sync de fuentes: 19 ago 2026). Cada línea del reel,
con su cita.

| Dónde | Afirmación | Fuente |
|---|---|---|
| Gancho, voz | «compras y vendes autos» | T&C **I** (participar en el Marketplace) y **IV.4** (consignación) |
| Gancho, voz | «es muy fácil y rápido» | CA **[registro]** — literal |
| Gancho, voz | «son cuatro pasos» | CA **[registro]** — Paso 1 a Paso 4 |
| Gancho, titular | «compra o vende» | T&C **I** (acceder y participar con Cuenta activa) y **IV.4** (consignar) |
| Gancho, bajada | «ofertas En Vivo y Negociables» | T&C **IV.5** y **IV.6** — son los dos nombres del producto |
| Gancho, bajada | «visitas para ver el auto en físico» | CA **[visitas]** — «solo debes estar registrado como usuario de nuestro servicio» |
| Gancho, bajada | «vender el tuyo» | T&C **IV.4** — consignación |
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
| Paso 4, bajada | «es el último paso» | CA **[registro]** — Paso 4 es el último del artículo |
| Paso 4, bajada | «tu cuenta ya está creada» | CA **[registro]** — el artículo termina en Sigamos, no hay paso 5 |
| Cierre, aviso | «14 días sin transacciones se da de baja sola» | T&C **IV.1.2.a** — literal |
| Cierre, aviso | «Úsala antes» | Editorial: es el imperativo de la cláusula de arriba, no un dato nuevo |
| Cierre, voz | «agenda tu visita» | CA **[visitas]** |

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
