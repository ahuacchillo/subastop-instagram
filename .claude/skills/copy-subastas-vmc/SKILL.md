---
name: copy-subastas-vmc
description: >
  Generador de copy de venta para publicaciones de vehículos en subasta de VMC
  (vmcsubastas.com), para Instagram y Canal de WhatsApp. Úsala CADA VEZ que Abraham
  diga algo como "hazme el copy de este carro", "copy para la subasta", "necesito el
  post de este vehículo", "el copy para VMC", "sácame el copy para IG y WhatsApp",
  "hazme el copy de esta camioneta", o cuando pegue la data de un vehículo (marca,
  modelo, año, km, vendedor, precio base, fecha/hora de subasta) con la intención de
  publicarla. La skill contiene las reglas de estilo aprendidas, la vocabulario
  prohibido, la estructura de ficha, y los patrones de titular por tipo de vehículo.
  Léela completa antes de redactar cualquier copy.
---

# Generador de Copy · Subastas VMC (Abraham)

Esta skill destila el aprendizaje de decenas de iteraciones reales de copy para
vehículos en subasta. Su objetivo es producir el copy correcto **a la primera** o en
muy pocas iteraciones, respetando reglas que ya se validaron por prueba y error.

## Cómo usar esta skill

1. Lee esta skill completa antes de redactar.
2. Recolecta la data del vehículo (ver §1). Si falta un dato **obligatorio**, pregúntalo; no lo inventes.
3. Elige el enfoque de titular según el tipo de vehículo (ver §4).
4. Redacta usando la estructura canónica (ver §3) respetando el léxico permitido/prohibido (ver §2).
5. Entrega **por defecto las dos versiones** (Instagram y WhatsApp), salvo que Abraham pida solo una.
6. Ofrece 1–3 variantes de titular solo si el caso lo pide o si Abraham no queda conforme; no satures con opciones cuando ya hay un patrón claro.

---

## 1. Data del vehículo

**Obligatorios** (si falta alguno, pregúntalo — NUNCA inventes):
- Marca y modelo (ej. Chevrolet Silverado)
- Año
- Vendedor (ej. Pandero, Autoplan, Maquisistema, Pacífico)
- Precio base en USD
- Fecha y hora de cierre de la subasta

**Opcionales** (úsalos si los da; si no, no los menciones):
- Kilometraje
- Transmisión (Automática / Mecánica)
- Tracción (4x2 / 4x4)
- Combustible (Gasolina / Diesel / Dual GLP)
- Condición/estado (ver §5 — tema delicado)

**Regla de oro:** Habla SOLO de los datos que Abraham te dio. No asumas estado,
demanda de mercado, ni características ("espacioso", "gran rendimiento") que no estén
en la ficha. Este fue el error más repetido en las iteraciones: inventar atributos.

---

## 2. Léxico: prohibido y permitido

### PROHIBIDO (no usar nunca)
- ❌ **"remate"** → es una **subasta**. Siempre "subasta".
- ❌ **"puja" / "pujar" / "postura" / "martillazo" / "mejor postor"** → jerga que VMC NO usa. Usar "participa", "participar", "ingresa a la subasta", "oferta".
- ❌ **"verificado por Pacífico"** u otra falsa validación. El vendedor se declara neutral: `🏢 Vendedor: [Nombre]`.
- ❌ **"a tu gusto"** (suena informal/vago).
- ❌ **"en VMC"** al final o intercalado → es redundante si ya se publica en el canal de VMC. Si hay que nombrar la plataforma, va integrada ("Ingresa a subasta...") y el cierre siempre remite a **vmcsubastas.com**.
- ❌ Decir o insinuar que el vehículo **se vende al precio base**. El precio base es el **punto de partida** de la subasta, no el precio final. Nunca "un [carro] a precio base de subasta".
- ❌ Etiquetas de público como **"talleres e inversionistas"** → preferir gatillos heurísticos generales.

### PERMITIDO / RECOMENDADO
- ✅ "subasta", "ingresa a subasta", "participa", "oferta"
- ✅ "Precio Base: US$ X" (como dato de arranque, nunca como precio de venta)
- ✅ "Vendedor: [Nombre]"
- ✅ CTA con verbo de acción hacia la web: "Mira las fotos completas y participa en vmcsubastas.com"
- ✅ Urgencia temporal real: "La subasta es HOY [fecha] a la(s) [hora]"

---

## 3. Estructura canónica del copy

```
[TITULAR con gancho heurístico] 🚗💨
[1–2 frases de cuerpo: valor del vehículo SOLO con datos reales]
⏰ La subasta es HOY [fecha] a la(s) [hora].   ← o al inicio si Abraham lo pide
Revisa la ficha técnica:
⚙️ Transmisión: [dato]
🚙 Tracción: [dato]
⛽ Combustible: [dato]
📏 Kilometraje: [dato] km
🏢 Vendedor: [dato]
💵 Precio Base: US$ [dato]
👉 Mira las fotos completas y participa en vmcsubastas.com
```

Reglas de la ficha:
- Incluye solo las líneas de datos que existan. Omite las que no te dieron.
- Emojis de ficha estables: ⚙️ transmisión, 🚙 tracción, ⛽ combustible, 📏 km, 🏢 vendedor, 💵 precio base, ⏰ hora/fecha.
- El cuerpo va **corto**: se lee en pocos segundos. Deja "vacío de información" (no describas el estado a fondo) para forzar el clic a las fotos en la web.

### Diferencias Instagram vs WhatsApp
- **Instagram:** puede llevar hashtags (`#KiaSeltos`, `#subasta`). La fecha/hora suele ir después del cuerpo.
- **WhatsApp (Canal):** sin hashtags. Negritas con un asterisco `*texto*`. La fecha/hora **preferentemente al inicio** en formato alerta (`⏰ ¡HOY [fecha] A LA(S) [hora]! 🚨`). CTA con el link inmediatamente después de la instrucción: `📲 Mira las fotos completas y participa aquí: 👉 vmcsubastas.com`

---

## 4. Patrones de titular por tipo de vehículo

El titular es lo que más falla. Elige la palanca heurística según el activo:

**A. Vehículo económico / de alto ahorro (Dual GLP, precio bajo):**
Enfoque en oportunidad + ahorro.
> 🔥 ¡Una de las SUV más buscadas y económicas del mercado! [Modelo] en subasta

**B. Vehículo casi sin uso (kilometraje muy bajo, ej. <100 km):**
El kilometraje ES el gancho. "Prácticamente listo para estrenar".
> 🚨 ¡Solo [X] km de recorrido! Un [Modelo] prácticamente listo para estrenar

**C. Vehículo imponente / aspiracional (pick-up grande, alta gama, "carraso"):**
El activo se vende solo. Enfoque en estatus/deseo, NO en el kilometraje.
> 🔥 ¡La camioneta que todos quieren tener! [Modelo] en subasta

**D. Aversión a la pérdida (fórmula versátil, sirve casi siempre):**
> ¿Te vas a perder esta oportunidad? ¡Este [Modelo] puede ser tuyo!

**E. Alerta de urgencia por cierre HOY (WhatsApp):**
> ⏰ ¡HOY [fecha] A LA(S) [hora]! 🚨 [titular del vehículo]

Reglas de titular:
- No repitas el mismo patrón en posts consecutivos (evita el "plantillazo"). Rota entre A–E.
- No uses etiquetas de público. Usa gatillos generales (aversión a la pérdida, estatus, ahorro, escasez temporal).
- Evita redundancias: si dices "pick-up" no repitas "camioneta" y "4x4" en la misma línea. La tracción "4x4" vive en la ficha, no en el titular.

---

## 5. Condición / estado del vehículo (TEMA DELICADO)

El estado es el punto donde más se metió la pata. Reglas estrictas:

- Usa **exactamente** la etiqueta que Abraham indique. Distingue bien:
  - **Siniestrado** (tuvo choque). Se puede especificar la zona del daño **solo si él la da** (ej. "choque posterior", "choque con tercero"). Un daño posterior sugiere motor/frente sanos → se puede enmarcar como oportunidad de reparación de bajo costo, pero SIN prometer nada que no esté en la data.
  - **Recuperado** (por financiera, ley de garantía mobiliaria). NO es siniestrado. No mencionar choque.
  - **Seminuevo** (estado declarado tal cual). No agregar "impecable", "sin choque", "mecánica intacta" u otros calificativos que Abraham no haya dado.
- **NUNCA cambies la etiqueta ni mezcles conceptos.** Si él dice "seminuevo", habla solo de seminuevo; nada de siniestros ni recuperaciones.
- Si Abraham no menciona el estado, **no lo inventes ni lo insinúes**. Omítelo.
- Cuando corrija el estado, actualiza y no vuelvas a introducir el concepto viejo en iteraciones siguientes.

---

## 6. Ajuste de tono (calibración típica de Abraham)

Feedback recurrente y cómo responder:
- "necesito más FOMO / más heurística" → refuerza el titular con aversión a la pérdida o escasez temporal ("se define HOY", "en unas horas"), no con más adjetivos en el cuerpo.
- "muy corto, hazlo más extenso" → añade 1–2 frases de racionalización de valor con datos reales; nunca relleno inventado.
- "muy largo / pon solo lo necesario" → recorta el cuerpo, deja la ficha y el CTA. El objetivo es generar el clic, no contarlo todo.
- "muy igual al anterior" → cambia el patrón de titular (§4) manteniendo la estructura.
- "el titular es lo que falla" → ofrece 2–3 titulares con palancas distintas y deja que elija.

## 7. Antes de entregar, verifica
- [ ] ¿Usé "subasta" y evité "remate", "puja", "postura", "martillazo"?
- [ ] ¿El vendedor está como `🏢 Vendedor: [Nombre]` sin falsas validaciones?
- [ ] ¿El precio base se presenta como punto de partida, no como precio de venta?
- [ ] ¿Solo mencioné datos que Abraham dio (sin inventar estado/atributos)?
- [ ] ¿El estado coincide exactamente con la etiqueta indicada?
- [ ] ¿El CTA remite a vmcsubastas.com con verbo de acción?
- [ ] ¿Entregué versión Instagram y versión WhatsApp (salvo que pidiera una)?
- [ ] ¿La fecha/hora es correcta y el año de referencia es el actual (2026)?

## 8. Continuidad (opcional)
Si Abraham quiere, guarda cada copy final en `historial/` con nombre
`AAAA-MM-DD_marca-modelo.md` para no repetir titulares y mantener consistencia de marca.
