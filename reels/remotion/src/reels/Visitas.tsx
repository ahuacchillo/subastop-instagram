import React from "react";
import { AbsoluteFill } from "remotion";
import { sans, vy } from "../brand/vmc";
import { Bajada, Chip, DS, Fondo, Latido, Titular, useEntrada } from "./ui";
import {
  Aviso,
  BeatAviso,
  Captura,
  Escena,
  FormatoTutorial,
  PasoEscena,
} from "./tutorial";
import { Logo } from "./Vender";
import Button from "@/concorde/components/Button";

// ═════════════════════════════════════════════════════════════════════════════
// Reel: cómo agendar una visita — 270×480, ~41.8s.
//
// Third tutorial. Format from `tutorial.tsx`, same as `Consignar`.
//
// Source article: Centro de Ayuda, [visitas] "Las visitas e inspecciones
// físicas". Six questions, three captures, and the reel is the flow plus the
// three rules nobody knows:
//
//   1. Hook. You can go see it before bidding, and it takes three steps.
//   2–4. The flow: pick the offer, open Visitas, choose date and time.
//   5. Where it is — and why the screen only shows you half of that.
//   6. The day of the visit: DNI, one person, eyes only.
//   7. Close.
//
// **The old video is the most out-of-date of the three.** Its closing warning is
// "llevar tu mascarilla, DNI y cumplir con el distanciamiento social" — the
// article now asks for a **DNI vigente** and the seller's own requirements, and
// says nothing about masks or distancing anywhere. It also walks the home list,
// the tabs and a "AGENDAR VISITA" button; the product's button reads **"Agenda
// tu visita"**. Following the old video would have printed a pandemic-era rule
// on screen as if it were current policy.
//
// What the old video never said, and this reel does: only one person gets in,
// inspections are visual only, 48 hours of notice, and the exact address does
// not exist on the screen — it arrives by email after you book. That last one is
// a support ticket waiting to happen and it is the single most useful line here.
// ═════════════════════════════════════════════════════════════════════════════

export type ReelVisitas = {
  /** The address the voice reads and the close prints. */
  sitio: string;
  /** Path inside `public/` to the pre-blurred ambient background. */
  fondo: string;
};

export const VISITAS: ReelVisitas = {
  sitio: "vmcsubastas.com",
  /*
   * The marketplace grid, blurred past legibility. Rebake:
   *
   *   convert <CentroDeAyudaVMC>/public/images/articulos/visitas-paso-1-marketplace.png \
   *           -resize 320x -blur 0x22 -modulate 55,58 -quality 82 \
   *           public/reel/visitas/fondo.jpg
   */
  fondo: "reel/visitas/fondo.jpg",
};

/**
 * The beats: [first frame, length]. 30fps, 1253 = 41.8s.
 *
 * **Provisional — not measured.** Same footing as the other two tutorials: the
 * take does not exist yet, so these are arithmetic. Each block's word count at
 * 3.21 words/s (the rate of `vendesolo.mp3`) plus a 0.73s gap between blocks,
 * and the cut placed 0.15s past the end of speech.
 *
 * The estimate, block by block:
 *
 *   gancho     0.00– 7.17  Antes de ofertar puedes ir a verlo en persona.
 *                          Agendar la visita son tres pasos, y lo único que
 *                          necesitas es estar registrado.
 *   oferta     7.90–11.32  Elige la oferta que te interesa y entra a Ver
 *                          detalle.
 *   visitas   12.05–16.10  Baja hasta la sección Visitas y ábrela. No todas las
 *                          ofertas la tienen.
 *   fechahora 16.83–23.37  Elige fecha y hora, y toca Agenda tu visita. Tiene
 *                          que ser con más de cuarenta y ocho horas de
 *                          anticipación.
 *   direccion 24.10–30.02  La ubicación está en Información general, pero solo
 *                          el distrito. La dirección exacta te llega por correo
 *                          al agendar.
 *   eldia     30.75–36.67  El día de la visita lleva tu DNI vigente. Entra una
 *                          sola persona, y la inspección es solo visual.
 *   cierre    37.40–41.76  Y listo. Vas, lo ves, y después decides si ofertas.
 *                          Todo está en vmcsubastas.com.
 *
 * When the take lands: measure with `silencedetect`, rewrite this and the table
 * in VOZ-VISITAS.md together, and uncomment the `<Audio>` at the bottom.
 */
const GUION = {
  gancho: [0, 219],
  oferta: [219, 125],
  visitas: [344, 144],
  fechahora: [488, 218],
  direccion: [706, 199],
  eldia: [905, 200],
  cierre: [1105, 148],
} as const;

export const DURACION_VISITAS = GUION.cierre[0] + GUION.cierre[1];

// ── The product's screens ────────────────────────────────────────────────────

/**
 * Three captures for four beats: `agenda.png` appears twice with a different
 * `foco`, because the section it shows is two steps deep — opening Visitas, then
 * filling it in. Re-sync with:
 *
 *   cd <CentroDeAyudaVMC>/public/images/articulos
 *   cp visitas-paso-1-marketplace.png   <…>/visitas/marketplace.png
 *   cp visitas-paso-2-agenda-visita.png <…>/visitas/agenda.png
 *   cp visitas-paso-4-ubicacion.png     <…>/visitas/ubicacion.png
 */
const PANTALLAS: Record<string, Captura> = {
  marketplace: {
    archivo: "reel/visitas/marketplace.png",
    w: 484,
    h: 738,
    // The card the article's own cursor is on, bottom right of the grid.
    foco: [0.72, 0.78],
  },
  // Opening the section: the focus is the VISITAS header and its status dot.
  visitas: {
    archivo: "reel/visitas/agenda.png",
    w: 466,
    h: 793,
    foco: [0.5, 0.54],
  },
  // Same file, focused on "Seleccionar Hora" — not on the button below it. The
  // capture shows the form empty, so its "Agenda tu visita" is greyed out, and a
  // tap ring on a disabled control tells the viewer to press something that will
  // not respond. The last select is what you actually tap in this state.
  fechahora: {
    archivo: "reel/visitas/agenda.png",
    w: 466,
    h: 793,
    foco: [0.5, 0.835],
  },
  ubicacion: {
    archivo: "reel/visitas/ubicacion.png",
    w: 589,
    h: 776,
    foco: [0.5, 0.86],
  },
};

// ── Act 1 · the hook ─────────────────────────────────────────────────────────

/**
 * Titular says what the reel teaches, bajada says how cheap it is to qualify,
 * voz says why you would bother. Third reel running that split and it is the
 * one thing about the hook that no longer needs re-deciding.
 *
 * "Antes de ofertar" in the voice is not framing, it is the order the T&C
 * recommend: the user "ha sido orientado por VMC SUBASTAS a observar el activo
 * ya sea de manera virtual o presencial **antes de consignar**" (IV.4.d). So a
 * visit is the step before the one `Consignar` teaches, and saying so links the
 * two reels without either depending on the other.
 *
 * The bajada is the requirement, and it is the lowest bar in the whole product:
 * "solo debes estar **registrado** como usuario de nuestro servicio" (Centro de
 * Ayuda [visitas]). No consignación, no SubasCoins, no habilitación. Worth
 * stating plainly because everything else in VMC costs something.
 *
 * Nothing here names the goods — "verlo en persona", not "ver el auto". The T&C
 * define the visit over "los **bienes o activos**" (II.23), and cars are what
 * the marketplace sells most of, not its scope.
 */
const Gancho: React.FC = () => (
  <AbsoluteFill
    style={{
      padding: "0 26px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 15,
    }}
  >
    <div style={useEntrada(2)}>
      <Logo ancho={128} />
    </div>
    <div style={{ textAlign: "center" }}>
      {/* Two lines, broken by hand at the conjunction: the frame holds ~16
          characters at this size and both halves land just under it. */}
      <Titular tam={26} retraso={14}>
        Agenda una visita
        <br />
        y velo en físico
      </Titular>
    </div>
    <div style={{ textAlign: "center", maxWidth: 210 }}>
      <Bajada retraso={30}>
        Lo único que necesitas es estar registrado. Ni consignar ni pagar nada.
      </Bajada>
    </div>
    <Chip retraso={46}>TE LO MUESTRO</Chip>
  </AbsoluteFill>
);

// ── Act 2 · the flow ─────────────────────────────────────────────────────────

/**
 * The bajada does not say "Ver detalle", even though that is the article's own
 * instruction ("entra a 'Ver detalle' de la oferta"). The capture is the
 * marketplace grid and there is no such button on it — the cards carry a name, a
 * year, a price and a heart. Printing a control name over a screen that does not
 * show it is the same failure as redrawing a button wrong: the viewer looks for
 * it, does not find it, and concludes they are lost.
 *
 * So the screen describes the tap the capture actually shows and the voice keeps
 * the article's wording, which is where it can be true without a screenshot to
 * contradict it.
 */
const Oferta: React.FC = () => (
  <PasoEscena
    de={3}
    n={1}
    titulo="Elige tu oferta"
    bajada={
      <>
        Toca la que te interesa
        <br />
        para abrir su ficha.
      </>
    }
    p={PANTALLAS.marketplace}
    dura={GUION.oferta[1]}
  />
);

/**
 * "No todas la tienen" is the article's own condition — "clic o tap ahí **si es
 * que la oferta cuenta con la opción a visitas disponibles**" — and it is the
 * line that stops somebody concluding the feature is broken when a particular
 * offer simply does not offer it. The capture shows that state as a green dot
 * next to the section title; the copy describes the rule rather than the dot,
 * because no source says what the colours mean.
 */
const Visitas: React.FC = () => (
  <PasoEscena
    de={3}
    n={2}
    titulo="Abre Visitas"
    bajada={
      <>
        Está abajo en la ficha. No todas
        <br />
        las ofertas la tienen.
      </>
    }
    p={PANTALLAS.visitas}
    dura={GUION.visitas[1]}
  />
);

/**
 * The 48-hour rule as the notice, because it is a constraint on exactly the
 * thing this beat asks you to do — pick a date — and because it is the one that
 * ruins a plan: "las visitas se deberán agendar con **más de 48 hrs. de
 * anticipación**, a menos que se indique lo contrario en el detalle de la
 * oferta" (Centro de Ayuda [visitas]).
 *
 * The escape clause travels with it. Dropping "salvo que el detalle diga otra
 * cosa" would make the reel stricter than the product, which is the same class
 * of error as making it looser.
 *
 * Orange: this is a hazard in the sense that matters — miss it and the visit
 * cannot happen before the offer closes.
 */
const FechaHora: React.FC = () => (
  <BeatAviso
    etiqueta={
      <Chip>
        PASO 3<span style={{ opacity: 0.5 }}> / 3</span>
      </Chip>
    }
    titulo="Fecha, hora y listo"
    bajada={
      <>
        El botón se activa cuando eliges
        <br />
        las dos.
      </>
    }
    p={PANTALLAS.fechahora}
    dura={GUION.fechahora[1]}
    aviso="Con más de 48 horas de anticipación, salvo que el detalle de la oferta diga otra cosa."
  />
);

// ── Act 3 · where it actually is ─────────────────────────────────────────────

/**
 * The most useful beat in the reel, and the one the old video does not contain.
 *
 * The screen gives you a district and a province and nothing else: "ahí verás el
 * **distrito y la provincia**. La **dirección exacta se te proporciona una vez
 * que agendas**: llega en el mail de confirmación" (Centro de Ayuda [visitas]).
 * The `agenda.png` capture says it too, in the section's own small print. So
 * somebody who books a visit and then looks for an address on the page will not
 * find one, and will assume something failed.
 *
 * Unnumbered, with a question chip: it is not a step, it is the answer to the
 * question the previous step creates.
 *
 * Violet, not orange: nothing goes wrong here. It is a rule about where to look.
 */
const Direccion: React.FC = () => (
  <BeatAviso
    etiqueta={<Chip>¿Y DÓNDE QUEDA?</Chip>}
    titulo="Distrito y provincia"
    bajada={
      <>
        En Información general, en el
        <br />
        campo Ubicación.
      </>
    }
    p={PANTALLAS.ubicacion}
    dura={GUION.direccion[1]}
    anillo={false}
    tono="regla"
    aviso="La dirección exacta no está en la página: te llega por correo cuando agendas."
  />
);

// ── Act 4 · the day of the visit ─────────────────────────────────────────────

/**
 * The only beat in any of the three tutorials with no screenshot in the body,
 * and it is not for lack of trying: **there is no screen for this**. All three
 * rules live in prose, in the article and in the Términos, and inventing a
 * mockup for them would be exactly the redraw the format exists to avoid.
 *
 * So it is a list, which is the honest shape for three unrelated rules:
 *
 *   DNI vigente — Centro de Ayuda [visitas]: "es necesario que lleves tu DNI
 *   vigente". "Vigente" is in the source and stays; an expired one is the
 *   version of this mistake that actually happens.
 *
 *   Una sola persona — Centro de Ayuda: "por temas de aforo del almacén del
 *   vendedor, solo puede ingresar 1 persona", the account holder, or the legal
 *   representative for a company account. T&C IV.3.1.a puts it as the seller's
 *   right to limit "la capacidad de aforo y/o de acompañantes", and VMC
 *   "coordinará únicamente la agenda del usuario titular de la cuenta".
 *
 *   Solo visual — Centro de Ayuda: "por temas de seguridad las inspecciones son
 *   sólo visuales". T&C II.23 is blunter: "cualquier manipulación y/o revisión
 *   mecánica **será denegada**". Somebody planning to bring a mechanic needs to
 *   know before they drive across Lima.
 *
 * The notice is the seller's own paperwork, which is the part with a deadline:
 * "en caso existan requisitos solicitados por el vendedor, se debe enviar la
 * documentación al correo indicado, por lo menos **un día anterior**".
 *
 * **Not here:** masks and social distancing. The old video closes on them and
 * the current article does not mention either, anywhere.
 */
const Regla: React.FC<{ retraso: number; que: string; detalle: string }> = ({
  retraso,
  que,
  detalle,
}) => (
  <div
    style={{
      ...useEntrada(retraso),
      alignSelf: "stretch",
      display: "flex",
      alignItems: "baseline",
      gap: 9,
      padding: "11px 13px",
      borderRadius: 13,
      background: "rgba(20,0,70,0.42)",
      border: "1px solid rgba(174,142,255,0.3)",
    }}
  >
    <span
      style={{
        fontFamily: sans,
        fontWeight: 800,
        fontSize: 11,
        color: vy.naranja,
        whiteSpace: "nowrap",
      }}
    >
      {que}
    </span>
    <span
      style={{
        fontFamily: sans,
        fontWeight: 600,
        fontSize: 9.5,
        lineHeight: 1.35,
        color: "#FFFFFF",
        opacity: 0.88,
      }}
    >
      {detalle}
    </span>
  </div>
);

const ElDia: React.FC = () => (
  <BeatAviso
    etiqueta={<Chip>EL DÍA DE LA VISITA</Chip>}
    titulo="Tres reglas"
    dura={GUION.eldia[1]}
    avisoRetraso={46}
    aviso="Si el vendedor pide documentos, mándalos al correo indicado un día antes."
    extra={
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          gap: 9,
        }}
      >
        <Regla
          retraso={12}
          que="DNI"
          // Not "el único documento que piden": the article also asks you to
          // check "las condiciones adicionales estipuladas por el vendedor en el
          // detalle de la oferta", so claiming the DNI is all of it makes the
          // reel looser than the source. The DNI is what *VMC* asks for.
          detalle="Vigente. Y revisa qué más pide el vendedor."
        />
        <Regla
          retraso={22}
          que="1 PERSONA"
          detalle="Entra el titular de la cuenta, sin acompañantes."
        />
        <Regla
          retraso={32}
          que="SOLO MIRAR"
          detalle="La inspección es visual: no se manipula ni se revisa el motor."
        />
      </div>
    }
  />
);

// ── Act 5 · the close ────────────────────────────────────────────────────────

/**
 * The closing notice is the Términos-only rule, the job the 14 days do in
 * `Registro` and the SubasCoins conversion does in `Consignar`: **T&C IV.3.1.a**
 * — the user "debe respetar el derecho del vendedor … de reprogramar y/o
 * cancelar visitas previamente programadas por casos de fuerza mayor", and "VMC
 * Subastas únicamente coordina la agenda" (also II.23).
 *
 * Nobody who only reads the article learns that a booked visit is not a
 * guarantee, or that the counterparty is the seller and not VMC. It changes who
 * you call when you arrive and the gate is shut.
 *
 * The CTA is "lo ves, y después decides" because that is what a visit is for and
 * it is the honest next step: after a visit you still need to consign to bid
 * (T&C IV.4.a), so promising a bid here would be a promise the next screen
 * breaks.
 */
const Cierre: React.FC<{ d: ReelVisitas }> = ({ d }) => (
  <AbsoluteFill
    style={{
      padding: "0 26px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 17,
    }}
  >
    <div style={useEntrada(4)}>
      <Logo ancho={136} />
    </div>
    <Chip retraso={18}>{d.sitio.toUpperCase()}</Chip>
    <Latido retraso={34}>
      <DS e={0.78}>
        <Button variant="primary">El link está en la bio</Button>
      </DS>
    </Latido>
    <Aviso tono="regla" rotulo="OJO" retraso={80}>
      VMC solo coordina la agenda. El vendedor puede reprogramar por fuerza
      mayor.
    </Aviso>
  </AbsoluteFill>
);

// ── Composition ──────────────────────────────────────────────────────────────

/**
 * Silent, like the other two tutorials. `public/voz/visitas.mp3` has not been
 * recorded — the block to paste into ElevenLabs is in VOZ-VISITAS.md. When it
 * lands, add the `<Audio>` here and re-measure GUION.
 */
export const ReelVisitasVideo: React.FC<{
  d: ReelVisitas;
  /** 480×270 for YouTube instead of 270×480 for Instagram. */
  ancho?: boolean;
}> = ({ d, ancho = false }) => (
  <FormatoTutorial ancho={ancho}>
    <AbsoluteFill>
    <Fondo fondo={d.fondo} />
    <Escena de={GUION.gancho[0]} dura={GUION.gancho[1]}>
      <Gancho />
    </Escena>
    <Escena de={GUION.oferta[0]} dura={GUION.oferta[1]}>
      <Oferta />
    </Escena>
    <Escena de={GUION.visitas[0]} dura={GUION.visitas[1]}>
      <Visitas />
    </Escena>
    <Escena de={GUION.fechahora[0]} dura={GUION.fechahora[1]}>
      <FechaHora />
    </Escena>
    <Escena de={GUION.direccion[0]} dura={GUION.direccion[1]}>
      <Direccion />
    </Escena>
    <Escena de={GUION.eldia[0]} dura={GUION.eldia[1]}>
      <ElDia />
    </Escena>
    <Escena de={GUION.cierre[0]} dura={GUION.cierre[1]}>
      <Cierre d={d} />
    </Escena>
    </AbsoluteFill>
  </FormatoTutorial>
);
