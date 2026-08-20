# Guión — ¿Cómo agendo una visita?

Voz y pantalla del reel `Visitas` (`out/visitas.mp4`, ~41.8 s estimados, 270×480 @ 30 fps), beat por
beat.

**Un solo objetivo:** que alguien que ya tiene cuenta agende una visita y llegue al almacén sin
sorpresas. Nada de consignar, ofertar ni qué pasa si ganas — cada una de esas es otro artículo del
Centro de Ayuda y su propio reel.

**Es el tercer tutorial**, y usa el formato compartido de `remotion/src/reels/tutorial.tsx` sin
agregarle nada: el corte, la ventana de teléfono, el anillo de toque y la geometría de los pasos ya
estaban resueltos. Es la primera vez que un reel nuevo no necesita tocar el formato.

**Cada frase está contrastada contra las dos fuentes oficiales.** La trazabilidad completa está en
§Validación, al final. Si escribes una línea nueva, va con su cita o no va.

## Dónde vive cada cosa

Este documento es de **lectura**: sirve para revisar la copia y la locución de un vistazo. No es la
fuente de la verdad de nada.

| Qué | Fuente real |
|---|---|
| Frames de cada beat | `GUION` en `remotion/src/reels/Visitas.tsx` |
| Texto en pantalla | los componentes de `remotion/src/reels/Visitas.tsx` |
| El formato (cortes, ventana, anillo) | `remotion/src/reels/tutorial.tsx` |
| Las capturas | `remotion/public/reel/visitas/`, copiadas del Centro de Ayuda |
| Locución grabada | **no existe todavía** → `VOZ-VISITAS.md` |
| Los hechos | T&C + Centro de Ayuda, vía el skill `vmc-modelo-negocio` |
| La versión 16:9 | la misma composición con `ancho`, en `VisitasYT` → `out/yt-visitas.mp4` |

Si cambias cualquiera de esos, este archivo queda desactualizado y hay que tocarlo a mano.

**Este guión vale para las dos formas.** `Visitas` (1080×1920, Instagram) y `VisitasYT` (1920×1080,
YouTube) son la misma composición: mismo copy, mismas capturas, mismos frames, misma voz. Sólo
cambia cómo se acomodan los beats — una columna contra dos —, y eso vive en `tutorial.tsx`, no
acá. Corregir una línea la corrige en las dos.

---

## De dónde salió, y qué se dejó afuera

El artículo fuente es **CA [visitas] «Las visitas e inspecciones físicas»**: seis preguntas y tres
capturas. El reel es el flujo de la primera pregunta más las reglas de las otras cinco.

### El video viejo es el más desactualizado de los tres

`¿Cómo agendo una visita?` cierra con un cuadro que dice **«llevar tu mascarilla, DNI y cumplir con
el distanciamiento social»**. El artículo actual pide **DNI vigente** y revisar los requisitos del
vendedor, y **no menciona mascarillas ni distanciamiento en ninguna parte**. Seguir el video habría
puesto en pantalla una regla de pandemia como si fuera política vigente.

Tampoco coincide el rótulo del botón: el video muestra **«AGENDAR VISITA»** y el producto dice
**«Agenda tu visita»**. Y el recorrido del video —listado, scroll por las pestañas de información
general y condiciones, la pantalla de confirmación con el detalle— es más largo que el artículo.

**Lo que el video nunca dijo, y este reel sí:**

1. Entra **una sola persona**, por aforo del almacén del vendedor.
2. La inspección es **solo visual**: cualquier revisión mecánica se deniega.
3. Hay que agendar con **más de 48 horas** de anticipación.
4. **La dirección exacta no está en la pantalla** — llega por correo después de agendar.
5. Si el vendedor pide documentos, se mandan **un día antes**.
6. VMC **solo coordina la agenda**; el vendedor puede reprogramar o cancelar por fuerza mayor.

La cuarta es la más útil de todo el reel: es un ticket de soporte esperando a pasar.

## Cómo se reparte la venta

**Es el tutorial amable de los tres.** `Consignar` explica un débito automático y va plano; éste
explica algo que **no cuesta nada** —basta estar registrado— y puede ser cálido de principio a fin.

Así que la venta no está en un beat aparte: está en la premisa. «Puedes ir a verlo antes de decidir,
gratis» es el argumento, y el reel lo prueba enseñando lo fácil que es. Lo único que hace falta cuidar
es que los tres datos que arruinan un plan —las 48 horas, la dirección por correo, una sola persona—
no se digan con la misma sonrisa que el resto: no son advertencias, son cosas que alguien necesita oír
bien la primera vez para no manejar hasta un almacén en vano.

---

## ACTO 1 — El gancho · 0.00 – 7.17 s

### Beat 1 · `gancho` · frames 0–219

Sin capturas.

| | |
|---|---|
| **VOZ** | Antes de ofertar puedes ir a verlo en persona. Agendar la visita son tres pasos, y lo único que necesitas es estar registrado. |
| **Logo** | *[logo VMC]* |
| **Titular** | Agenda una visita<br>y velo en físico |
| **Bajada** | Lo único que necesitas es estar registrado. Ni consignar ni pagar nada. |
| **Chip** | TE LO MUESTRO |

El titular dice **qué enseña el reel** —tercer reel con ese reparto, y ya no hace falta volver a
decidirlo—. La bajada dice **qué tan barato es calificar**, y es la barra más baja de todo el
producto: «solo debes estar **registrado** como usuario de nuestro servicio» (CA **[visitas]**). Sin
consignación, sin SubasCoins, sin habilitación. Vale decirlo en seco porque todo lo demás en VMC
cuesta algo.

**«Antes de ofertar» no es un encuadre, es el orden que recomiendan los T&C**: el usuario «ha sido
orientado por VMC SUBASTAS a observar el activo ya sea de manera virtual o presencial **antes de
consignar**» (**IV.4.d**). Así que la visita es el paso anterior al que enseña `Consignar`, y decirlo
enlaza los dos reels sin que ninguno dependa del otro.

Y nada nombra el bien: **«verlo en físico»**, no «ver el auto». Los T&C definen la visita sobre «los
**bienes o activos**» (**II.23**). Es la misma regla que se aprendió a los golpes en `Registro`.

---

## ACTO 2 — El flujo · 7.90 – 23.37 s

### Beat 2 · `oferta` · frames 219–344

Captura: `marketplace.png` — la grilla de ofertas de un vendedor, con el cursor sobre una tarjeta.

| | |
|---|---|
| **VOZ** | Elige la oferta que te interesa y entra a Ver detalle. |
| **Etiqueta** | PASO 1 / 3 |
| **Titular** | Elige tu oferta |
| **Bajada** | Toca la que te interesa para abrir su ficha. |
| **Toque** | sobre la tarjeta |

**La bajada no dice «Ver detalle» aunque el artículo sí.** La captura es la grilla y ahí **no hay
ningún botón que diga eso**: las tarjetas llevan nombre, año, precio y un corazón. Poner el nombre de
un control sobre una pantalla que no lo muestra es la misma falla que redibujar un botón mal — el que
mira lo busca, no lo encuentra y concluye que se perdió. Así que la pantalla describe el toque que la
captura sí muestra, y la voz se queda con la instrucción del artículo, donde puede ser cierta sin una
captura que la contradiga.

### Beat 3 · `visitas` · frames 344–488

Captura: `agenda.png` — la ficha abierta en la sección **VISITAS**, con su punto verde de estado.

| | |
|---|---|
| **VOZ** | Baja hasta la sección Visitas y ábrela. No todas las ofertas la tienen. |
| **Etiqueta** | PASO 2 / 3 |
| **Titular** | Abre Visitas |
| **Bajada** | Está abajo en la ficha. No todas las ofertas la tienen. |
| **Toque** | sobre *VISITAS* |

«No todas la tienen» es la condición del propio artículo —«clic o tap ahí **si es que la oferta cuenta
con la opción a visitas disponibles**»— y es la línea que evita que alguien concluya que la función
está rota cuando una oferta puntual simplemente no la ofrece.

La captura muestra ese estado como un punto verde junto al título. **La copia describe la regla y no
el punto**, porque ninguna fuente dice qué significan los colores.

### Beat 4 · `fechahora` · frames 488–706

Misma captura, enfocada en los dos selects (`fechahora` en `PANTALLAS`: mismo archivo, `foco` más
abajo).

| | |
|---|---|
| **VOZ** | Elige fecha y hora, y toca Agenda tu visita. Tiene que ser con más de cuarenta y ocho horas de anticipación. |
| **Etiqueta** | PASO 3 / 3 |
| **Titular** | Fecha, hora y listo |
| **Bajada** | El botón se activa cuando eliges las dos. |
| **Toque** | sobre *Seleccionar Hora* |
| **Aviso** | ⚠️ Con más de 48 horas de anticipación, salvo que el detalle de la oferta diga otra cosa. |

**El anillo va sobre el select, no sobre el botón.** La captura muestra el formulario vacío, así que
su *Agenda tu visita* está gris: un anillo de toque sobre un control deshabilitado le dice al que mira
que presione algo que no va a responder.

El aviso son las 48 horas —«las visitas se deberán agendar con **más de 48 hrs. de anticipación**, a
menos que se indique lo contrario en el detalle de la oferta»— y va acá porque es una restricción
sobre exactamente lo que este beat pide hacer: elegir una fecha.

**La coletilla viaja con la regla.** Quitar «salvo que el detalle diga otra cosa» dejaría al reel más
estricto que el producto, que es el mismo error que dejarlo más flojo.

---

## ACTO 3 — Dónde queda de verdad · 24.10 – 30.02 s

### Beat 5 · `direccion` · frames 706–905

Captura: `ubicacion.png` — la sección Información general, con el campo **Ubicación: LIMA, LURIN**
recuadrado. **Sin toque:** no hay nada que tocar, es dónde mirar.

**No lleva número y el chip es una pregunta**: no es un paso, es la respuesta a la pregunta que crea
el paso anterior.

| | |
|---|---|
| **VOZ** | La ubicación está en Información general, pero solo el distrito. La dirección exacta te llega por correo al agendar. |
| **Chip** | ¿Y DÓNDE QUEDA? |
| **Titular** | Distrito y provincia |
| **Bajada** | En Información general, en el campo Ubicación. |
| **Aviso** | La dirección exacta no está en la página: te llega por correo cuando agendas. |

**Es el beat más útil del reel y el que el video viejo no tiene.** La pantalla te da un distrito y una
provincia y nada más: «ahí verás el **distrito y la provincia**. La **dirección exacta se te
proporciona una vez que agendas**: llega en el mail de confirmación a tu bandeja de correo
electrónico» (CA **[visitas]**). La propia captura de `agenda.png` lo dice también, en la letra chica
de la sección.

Sin esto, alguien agenda, vuelve a la página a buscar la dirección, no la encuentra y asume que algo
falló.

Es **violeta y no naranja**: acá no se rompe nada, es una regla sobre dónde mirar.

---

## ACTO 4 — El día de la visita · 30.75 – 36.67 s

### Beat 6 · `eldia` · frames 905–1105

**Sin captura, y es el único beat de los tres tutoriales que no tiene una.** No es por descuido:
**no existe una pantalla para esto**. Las tres reglas viven en prosa, en el artículo y en los
Términos, y dibujar una maqueta para ellas sería exactamente el redibujo que el formato existe para
evitar.

Así que es una lista, que es la forma honesta para tres reglas que no tienen relación entre sí.

| | |
|---|---|
| **VOZ** | El día de la visita lleva tu DNI vigente. Entra una sola persona, y la inspección es solo visual. |
| **Chip** | EL DÍA DE LA VISITA |
| **Titular** | Tres reglas |
| **Regla 1** | **DNI** — Vigente. Y revisa qué más pide el vendedor. |
| **Regla 2** | **1 PERSONA** — Entra el titular de la cuenta, sin acompañantes. |
| **Regla 3** | **SOLO MIRAR** — La inspección es visual: no se manipula ni se revisa el motor. |
| **Aviso** | ⚠️ Si el vendedor pide documentos, mándalos al correo indicado un día antes. |

**La primera decía «es el único documento que piden» y era falso.** El propio artículo manda a
«revisar las condiciones adicionales estipuladas por el vendedor en el detalle de la oferta», así que
afirmar que el DNI es todo dejaba al reel más flojo que la fuente. El DNI es lo que pide **VMC**; el
vendedor puede pedir más.

«Vigente» está en la fuente y se queda: un DNI vencido es la versión de este error que de verdad
pasa.

La segunda sale del aforo, no de una regla de VMC: «por temas de **aforo del almacén del vendedor**,
solo puede ingresar 1 persona», el titular de la cuenta o el representante legal si es cuenta de
empresa. Los T&C lo ponen como derecho del vendedor a limitar «la capacidad de aforo y/o de
acompañantes» (**IV.3.1.a**).

La tercera es más contundente en los T&C que en el artículo: el Centro de Ayuda dice «por temas de
seguridad las inspecciones son sólo visuales» y **II.23** dice que cualquier manipulación o revisión
mecánica **«será denegada»**. Quien pensaba llevar un mecánico necesita saberlo antes de cruzar Lima.

El aviso es el papeleo del vendedor, que es la parte con fecha límite: «se debe enviar la
documentación al correo indicado, por lo menos **un día anterior** del día de la visita».

---

## CIERRE · 37.40 – 41.76 s

### Beat 7 · `cierre` · frames 1105–1253

| | |
|---|---|
| **VOZ** | Y listo. Vas, lo ves, y después decides si ofertas. Todo está en vmcsubastas.com. |
| | *[logo VMC]* |
| **Chip** | VMCSUBASTAS.COM |
| **Botón** | El link está en la bio |
| **Aviso** | **OJO** · VMC solo coordina la agenda. El vendedor puede reprogramar por fuerza mayor. |

El aviso es la regla que vive en los Términos y **no está en el artículo**, el mismo trabajo que
hacen los 14 días en `Registro` y la conversión a SubasCoins en `Consignar`: **T&C IV.3.1.a** — el
usuario «debe respetar el derecho del vendedor … de reprogramar y/o cancelar visitas previamente
programadas por casos de fuerza mayor», y «VMC Subastas **únicamente coordina la agenda**» (también
**II.23**).

Quien sólo lea el artículo no se entera de que una visita agendada no es una garantía, ni de que la
contraparte es el vendedor y no VMC. Cambia a quién llamas cuando llegas y el portón está cerrado.

El llamado es **«lo ves, y después decides»** porque es para lo que sirve una visita y es el paso
siguiente honesto: después de visitar todavía hay que consignar para ofertar (T&C **IV.4.a**), así
que prometer una oferta acá sería una promesa que la pantalla siguiente rompe.

> **Depende de la publicación:** «el link está en la bio» es cierto sólo si la bio de la cuenta que
> publique el reel apunta a `vmcsubastas.com` el día que salga. Mismo aviso que en los otros dos.

---

## Validación contra las fuentes oficiales

Contrastado con el skill `vmc-modelo-negocio` (sync de fuentes: 19 ago 2026). Cada línea del reel,
con su cita.

| Dónde | Afirmación | Fuente |
|---|---|---|
| Gancho, voz | «antes de ofertar puedes ir a verlo» | T&C **IV.4.d** — «orientado … a observar el activo … antes de consignar» |
| Gancho, voz | «son tres pasos» | CA **[visitas]** — Ver detalle → sección Visitas → fecha y hora |
| Gancho, titular | «agenda una visita y velo en físico» | T&C **II.23** — «la capacidad de visitar, bajo previa cita, los bienes o activos» |
| Gancho, bajada | «lo único que necesitas es estar registrado» | CA **[visitas]** — «solo debes estar registrado como usuario de nuestro servicio» |
| Gancho, bajada | «ni consignar ni pagar nada» | CA **[visitas]** — no exige nada más · contraste con T&C **IV.4.a** (participar sí exige consignar) |
| Gancho, chip | «te lo muestro» | No lleva fuente: no afirma nada del producto, es el reel hablando de sí mismo |
| Oferta, voz | «entra a Ver detalle» | CA **[visitas]** — «entra a "Ver detalle" de la oferta» |
| Oferta, bajada | «toca la que te interesa» | La captura `marketplace.png` — es el gesto que muestra |
| Visitas | «baja hasta la sección Visitas» | CA **[visitas]** — «baja hasta la sección "Visitas"» |
| Visitas, bajada | «no todas las ofertas la tienen» | CA **[visitas]** — «si es que la oferta cuenta con la opción a visitas disponibles» |
| Fecha y hora | «elige fecha y hora» · «Agenda tu visita» | CA **[visitas]** — literal · rótulo del botón en `agenda.png` |
| Fecha y hora, aviso | «más de 48 horas de anticipación» | CA **[visitas]** — literal |
| Fecha y hora, aviso | «salvo que el detalle diga otra cosa» | CA **[visitas]** — «a menos que se indique lo contrario en el detalle de la oferta» |
| Dirección, titular | «distrito y provincia» | CA **[visitas]** — «ahí verás el distrito y la provincia» |
| Dirección, bajada | «en Información general, campo Ubicación» | CA **[visitas]** — literal · el recuadro de `ubicacion.png` |
| Dirección, aviso | «te llega por correo cuando agendas» | CA **[visitas]** — «llega en el mail de confirmación» · la letra chica de `agenda.png` |
| El día, regla 1 | «DNI vigente» | CA **[visitas]** — «es necesario que lleves tu DNI vigente» |
| El día, regla 1 | «revisa qué más pide el vendedor» | CA **[visitas]** — «revisar las condiciones adicionales estipuladas por el vendedor» |
| El día, regla 2 | «entra una sola persona», el titular | CA **[visitas]** — «solo puede ingresar 1 persona» · T&C **IV.3.1.a** (aforo y acompañantes) |
| El día, regla 3 | «la inspección es visual» | CA **[visitas]** — «las inspecciones son sólo visuales» · T&C **II.23** — «será denegada» |
| El día, aviso | «documentos, un día antes» | CA **[visitas]** — «por lo menos un día anterior del día de la visita» |
| Cierre, voz | «después decides si ofertas» | T&C **IV.4.a** — ofertar exige consignar, así que la visita no obliga a nada |
| Cierre, aviso | «VMC solo coordina la agenda» | T&C **II.23** y **IV.3.1.a** — literal |
| Cierre, aviso | «puede reprogramar por fuerza mayor» | T&C **IV.3.1.a** — literal |
| Cierre, botón | «el link está en la bio» | Editorial, y depende de la publicación — ver el aviso del Beat 7 |

Las dos fuentes **se complementan** y no se contradicen en nada de lo que toca este reel: el Centro de
Ayuda da el paso a paso y las cinco reglas prácticas, y los T&C dan el marco — qué es una visita, de
quién es el aforo, que la revisión mecánica se deniega y que VMC sólo coordina.

Donde **sí se refuerzan** vale notarlo: la inspección visual es «por temas de seguridad» en el
artículo y «será denegada» en **II.23**. El reel usa la del artículo en la voz y la contundencia de
los T&C en pantalla.

### Lo que no tiene respaldo, y por eso no está en el reel

- **Mascarilla y distanciamiento social.** El video viejo cierra con eso y **el artículo actual no lo
  menciona en ninguna parte**. Es una regla de pandemia; ponerla hoy sería inventar política vigente.
- **Qué significan los colores del estado de Visitas.** La captura muestra un punto verde junto a
  «VISITAS» y es razonable suponer que verde = disponible, pero ninguna fuente lo dice. El reel
  describe la regla («no todas las ofertas la tienen») y no el punto.
- **La pantalla de confirmación.** El video viejo la muestra con el detalle de la visita agendada
  —ubicación, dirección, fecha y hora— y **no hay captura de ella en el artículo**. No se dibuja de
  nuevo, y además el reel dice que la dirección llega por correo, que es lo que el artículo sí
  sostiene.
- **Cuánto demora agendar, o si se puede cancelar.** Ninguna fuente lo dice. El reel cuenta pasos, no
  minutos, y no promete cancelación.
- **Visitas virtuales.** Los T&C las nombran («de manera virtual o presencial», **IV.4.d**) pero el
  artículo de visitas es todo presencial y no hay pantalla para la virtual. Queda afuera.

---

## Lo que falta para darlo por terminado

1. **La voz.** No está grabada. El bloque para ElevenLabs está en `VOZ-VISITAS.md`; la composición
   corre muda hasta entonces.
2. **Los frames.** Los de este documento y los de `GUION` son una **estimación** por conteo de
   palabras, no una medición. Cuando llegue la toma se miden con `silencedetect` y se reemplazan los
   dos, en el mismo commit.
3. **El artículo de visitas enlaza un video con una regla de pandemia.** `¿Cómo agendo una visita?`
   cierra pidiendo mascarilla y distanciamiento social, y el artículo que lo enlaza ya no lo pide.
   Mientras convivan, el artículo se contradice a sí mismo — y es el caso más urgente de los tres,
   porque no es información vieja sino una instrucción equivocada.
4. **Falta la captura del paso 3.** Las imágenes del artículo van `paso-1`, `paso-2` y `paso-4`: no
   hay `paso-3`. El reel se las arregla usando `paso-2` dos veces con foco distinto, pero conviene
   saber si falta una captura en `CentroDeAyudaVMC`.

## Qué cambia con otro contenido

Casi nada llega por props: `VISITAS` sólo lleva `sitio` y `fondo`. Es a propósito — un tutorial de
visitas no se re-parametriza, se reescribe cuando el producto cambia.

Lo que sí hay que resincronizar cuando las pantallas se muevan son las tres capturas:

```bash
cd <CentroDeAyudaVMC>/public/images/articulos
cp visitas-paso-1-marketplace.png    <Instagram>/reels/remotion/public/reel/visitas/marketplace.png
cp visitas-paso-2-agenda-visita.png  <Instagram>/reels/remotion/public/reel/visitas/agenda.png
cp visitas-paso-4-ubicacion.png      <Instagram>/reels/remotion/public/reel/visitas/ubicacion.png
```

Y si alguna cambia de tamaño, corregir `w`/`h` en `PANTALLAS` (`identify` los imprime) y volver a
mirar el `foco`: son fracciones de la imagen, así que un recorte distinto los mueve. Ojo con
`agenda.png`, que tiene **dos** entradas —`visitas` y `fechahora`— apuntando al mismo archivo con
foco distinto: hay que corregir las dos.
