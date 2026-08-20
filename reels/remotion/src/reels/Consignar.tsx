import React from "react";
import { AbsoluteFill } from "remotion";
import { sans, vy } from "../brand/vmc";
import { Bajada, Chip, DS, Fondo, Latido, Titular, useEntrada } from "./ui";
import { Captura, Escena, Pantalla, PasoEscena } from "./tutorial";
import { Logo } from "./Vender";
import Button from "@/concorde/components/Button";

// ═════════════════════════════════════════════════════════════════════════════
// Reel: consignar es necesario para participar — 270×480, ~45s.
//
// Second tutorial, and the first one to inherit the format instead of inventing
// it: the cut, the phone window, the tap ring and the per-step layout all come
// from `tutorial.tsx`, pulled out of `Registro` for exactly this.
//
// Source article: Centro de Ayuda, [consignacion] "¡Consignar es necesario para
// participar!" (act. 18 ago 2026). Three questions, five captures, and the reel
// follows them:
//
//   1. Hook. Consigning is two taps, and it happens in both kinds of offer.
//   2. En Vivo: the detail screen's Participa, the amount, Acepto.
//   3. The commitment that Acepto signs — one bid or a sanction. The reason the
//      article exists, and the reason this beat gets the orange notice.
//   4. Negociable: no Acepto at all, the debit rides on starting the negotiation.
//   5. The wallet, because none of the above works on an empty one.
//   6. Close.
//
// **Not in this reel, on purpose.** The old YouTube video (BArqY0cM39I, the one
// the article still links) runs the whole road to the live room: favourites,
// scrolling the home list, Ver Detalle, the tabs, the 5-minute countdown,
// "INGRESA A LA SALA EN VIVO", the waiting room. None of that is consignación —
// the room, the bids and the countdown are [oferta-en-vivo] "Es hora de
// participar", which is its own article and its own future reel. Same call as
// `Registro`, where the SubasCoins purchase went back to the billetera articles:
// two subjects told as one is what made the old videos long.
//
// **And one claim from the old video that is not here.** It compared currencies
// — "¡Con SubasCoins la consignación será menor!" against "Usando US$ la
// consignación es mayor". The Negociable modal does show two figures (>S< 60 ó
// US$ 180, and the SubasCoins one is lower), so the product behaves that way,
// but *neither source says it* and the T&C set 1 SubasCoin at a referential
// US$ 1.00 (IV.2.2.d), which argues the other way. A reel cannot assert what
// only a screenshot implies, so the screen shows the modal and the copy says
// nothing about it. Written up in GUION-CONSIGNAR.md §Lo que no tiene respaldo.
// ═════════════════════════════════════════════════════════════════════════════

export type ReelConsignar = {
  /** The address the voice reads and the close prints. */
  sitio: string;
  /** Path inside `public/` to the pre-blurred ambient background. */
  fondo: string;
};

export const CONSIGNAR: ReelConsignar = {
  sitio: "vmcsubastas.com",
  /*
   * The offer detail, blurred past legibility — the screen the reel spends most
   * of its time on, so the glass has it behind from frame one. Rebake:
   *
   *   convert <CentroDeAyudaVMC>/public/images/articulos/consignacion-paso-1-participa.png \
   *           -resize 320x -blur 0x22 -modulate 55,58 -quality 82 \
   *           public/reel/consignar/fondo.jpg
   */
  fondo: "reel/consignar/fondo.jpg",
};

/**
 * The beats: [first frame, length]. 30fps, 1350 = 45.0s.
 *
 * **Provisional — not measured.** Same footing as `Registro` was: there is no
 * take yet, so these are arithmetic. Each block's word count at 3.21 words/s
 * (the rate of `vendesolo.mp3`, 150 words over 46.8s of speech) plus a 0.73s gap
 * between blocks (that take's average), and the cut placed 0.15s past the end of
 * speech.
 *
 * The estimate, block by block:
 *
 *   gancho     0.00– 7.17  Para participar en una oferta de VMC hay que
 *                          consignar. Son dos taps, y el sistema debita solo.
 *                          Te muestro los dos casos.
 *   participa  7.90–11.63  En el detalle de la oferta, con tu sesión iniciada,
 *                          toca Participa.
 *   acepto    12.36–17.35  Ahí ves el monto a consignar. Toca Acepto y el
 *                          sistema lo debita de tu Billetera.
 *   bid       18.08–24.00  Y ojo: al aceptar te comprometes a conectarte a la
 *                          sala y enviar por lo menos un bid válido.
 *   negocia   24.73–28.46  En una oferta Negociable no hay botón de aceptar:
 *                          toca Negocia ahora.
 *   propone   29.19–34.18  Al iniciar la negociación se debita la consignación,
 *                          y ahí mismo digitas el monto que propones.
 *   billetera 34.91–39.89  Para todo esto necesitas fondos. Los cargas desde tu
 *                          Billetera, con SubasCoins o con una recarga.
 *   cierre    40.62–44.98  Con eso ya puedes consignar y entrar a la sala. Todo
 *                          está en vmcsubastas.com.
 *
 * When the take lands: measure with `silencedetect`, rewrite this and the table
 * in VOZ-CONSIGNAR.md together, and uncomment the `<Audio>` at the bottom.
 */
const GUION = {
  gancho: [0, 219],
  participa: [219, 134],
  acepto: [353, 172],
  bid: [525, 199],
  negocia: [724, 134],
  propone: [858, 172],
  billetera: [1030, 171],
  cierre: [1201, 149],
} as const;

export const DURACION_CONSIGNAR = GUION.cierre[0] + GUION.cierre[1];

// ── The product's screens ────────────────────────────────────────────────────

/**
 * The article's own five images, copied rather than re-captured, so the reel and
 * the article are provably showing the same product. Re-sync all five with:
 *
 *   cd <CentroDeAyudaVMC>/public/images/articulos
 *   cp consignacion-paso-1-participa.png            <…>/consignar/participa.png
 *   cp consignacion-paso-2-acepto.png               <…>/consignar/acepto.png
 *   cp consignacion-negociable-paso-1-negocia.png   <…>/consignar/negocia.png
 *   cp consignacion-negociable-paso-2-proponer.png  <…>/consignar/proponer.png
 *   cp consignacion-billetera-adquiere.png          <…>/consignar/billetera.png
 */
const PANTALLAS: Record<string, Captura> = {
  participa: {
    archivo: "reel/consignar/participa.png",
    w: 486,
    h: 681,
    foco: [0.5, 0.71],
  },
  // A modal, not a screen: 360×343 is wider than it is tall, so it gets a short
  // window (see `Acepto`) and the whole thing fits without a pan.
  acepto: {
    archivo: "reel/consignar/acepto.png",
    w: 360,
    h: 343,
    foco: [0.5, 0.84],
  },
  // The same file again, focused on the commitment text instead of the button.
  // `foco` is what the push-in walks toward, so the beat that explains the small
  // print needs the small print in the middle of the frame — not the button it
  // already told you to press.
  aceptoTexto: {
    archivo: "reel/consignar/acepto.png",
    w: 360,
    h: 343,
    foco: [0.5, 0.58],
  },
  negocia: {
    archivo: "reel/consignar/negocia.png",
    w: 512,
    h: 808,
    foco: [0.5, 0.86],
  },
  propone: {
    archivo: "reel/consignar/proponer.png",
    w: 498,
    h: 641,
    foco: [0.51, 0.83],
  },
  billetera: {
    archivo: "reel/consignar/billetera.png",
    w: 502,
    h: 704,
    foco: [0.5, 0.92],
  },
};

// ── Act 1 · the hook ─────────────────────────────────────────────────────────

/**
 * The hook says what the reel teaches. That is the whole lesson from
 * `Registro`, where three versions went to the bin for saying something else:
 * two of them narrowed the marketplace by naming the goods, and the third —
 * "En Vivo o Negociable" — was perfectly sourced and read as an ad for the two
 * offer formats, so nobody scrolling learned the video was a how-to.
 *
 * So: titular = what it teaches, bajada = how wide it is, voz = why you need it.
 *
 * "Son dos taps" is countable straight off the article, not a flourish: "dale
 * clic o tap a Participa", then "haz clic o tap sobre acepto". Two. It is also
 * the only honest brevity promise available here — the reel cannot say how long
 * consigning takes, because no source does.
 *
 * The bajada carries the width, which for this subject is the pair of offer
 * types: consignación is not an En Vivo thing, it gates Negociable too (T&C
 * II.25 — "la actividad que todo usuario debe realizar para poder publicar y/o
 * participar de una oferta"). That is the half a viewer gets wrong, and it is
 * why acts 2 and 3 exist.
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
      {/* Two lines, broken by hand: the frame holds ~16 characters at this size,
          and the break falls after "Consignar" so the verb stands alone. No full
          stop — at letterSpacing -0.5 the "s"+"." pair leaves a visible gap. */}
      <Titular tam={26} retraso={14}>
        Consignar
        <br />
        son dos taps
      </Titular>
    </div>
    <div style={{ textAlign: "center", maxWidth: 210 }}>
      <Bajada retraso={30}>
        Es lo que te deja participar, y va igual en una oferta En Vivo que en una
        Negociable.
      </Bajada>
    </div>
    {/* Same chip as `Registro`. It is the series signature now: the promise that
        the reel is about to show the thing, and the only element in either reel
        that speaks in the first person. */}
    <Chip retraso={46}>TE LO MUESTRO</Chip>
  </AbsoluteFill>
);

// ── Act 2 · En Vivo ──────────────────────────────────────────────────────────

/**
 * The bajada carries the precondition the voice has no room for. The article is
 * explicit about it — "debes iniciar sesión, ingresar al detalle de la oferta de
 * tu interés y luego darle clic o tap a Participa" — and it matters because
 * Participa does not exist anywhere else: not on the home list, not on the card.
 * Somebody hunting for it on the listing is the failure this line prevents.
 */
const Participa: React.FC = () => (
  <PasoEscena
    de={2}
    n={1}
    etiqueta="EN VIVO · 1 DE 2"
    titulo="Toca Participa"
    bajada={
      <>
        Está en el detalle de la oferta,
        <br />
        y con tu sesión ya iniciada.
      </>
    }
    p={PANTALLAS.participa}
    dura={GUION.participa[1]}
  />
);

/**
 * Short window (190, not 262): `acepto.png` is 360×343, wider than tall, and the
 * tall window would crop the amount off the top or blur the whole modal to fit.
 * At 190 the arithmetic lands on H exactly, so nothing pans and the amount, the
 * commitment text and the button are all in frame at once — which is the point,
 * because this is the screen where a viewer decides.
 *
 * The bajada says what happens *after* the tap, which the voice does say too —
 * and here that is deliberate rather than sloppy: the automatic debit is the one
 * thing about consigning that surprises people, and Instagram plays on mute. The
 * screen half a silent viewer cannot miss is that the money leaves by itself.
 */
const Acepto: React.FC = () => (
  <PasoEscena
    de={2}
    n={2}
    etiqueta="EN VIVO · 2 DE 2"
    titulo="Toca Acepto"
    bajada={
      <>
        El sistema debita el monto de tu
        <br />
        Billetera y te da acceso a la sala.
      </>
    }
    p={PANTALLAS.acepto}
    dura={GUION.acepto[1]}
    ancho={226}
    alto={190}
  />
);

// ── Act 3 · what Acepto signs ────────────────────────────────────────────────

/**
 * The beat the article exists for, and it is not numbered — same call as the
 * factura aside in `Registro`. It is not a third step; it is the meaning of the
 * second one. Numbering it would tell someone who just consigned that they still
 * owe the platform an action, when what they owe is a bid, later, in the room.
 *
 * Both halves are in both sources, which is rare and worth saying: the modal
 * itself prints the commitment ("aceptas conectarte a la sala 'En vivo' y a
 * enviar por lo menos un bid válido"), the Centro de Ayuda repeats it with the
 * consequence ("o serás sancionado") and the T&C put it on the participant as a
 * duty assumed in advance (IV.8.1.a — "debe ingresar a la sala y enviar por lo
 * menos un bid válido durante el proceso 'En Vivo'").
 *
 * Orange, like the factura notice and unlike the closing one: this is a hazard,
 * not a deadline. Consigning without knowing this is how somebody gets
 * sanctioned for walking away from a room they paid to enter.
 */
const Bid: React.FC = () => (
  <AbsoluteFill
    style={{
      padding: "26px 22px 22px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 13,
    }}
  >
    <div
      style={{
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 7,
      }}
    >
      {/* A question, not a step label, so the viewer knows this is the same
          screen being explained rather than a new thing to do. */}
      <Chip retraso={2}>¿QUÉ ESTÁS ACEPTANDO?</Chip>
      <Titular tam={23} retraso={5}>
        Un bid, mínimo
      </Titular>
      <Bajada retraso={9}>
        El compromiso está escrito en el
        <br />
        mismo pop-up que acabas de tocar.
      </Bajada>
    </div>
    <Pantalla
      p={PANTALLAS.aceptoTexto}
      dura={GUION.bid[1]}
      ancho={226}
      alto={190}
      anillo={false}
      retraso={5}
    />
    <div
      style={{
        ...useEntrada(60),
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        padding: "9px 12px",
        borderRadius: 13,
        background: "rgba(70,26,0,0.5)",
        border: `1px solid ${vy.naranja}66`,
      }}
    >
      <span style={{ fontSize: 12, lineHeight: 1 }}>⚠️</span>
      <span
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 9.5,
          lineHeight: 1.35,
          color: "#FFFFFF",
        }}
      >
        Si consignas y no envías ningún bid durante el proceso, serás sancionado.
      </span>
    </div>
  </AbsoluteFill>
);

// ── Act 4 · Negociable ───────────────────────────────────────────────────────

/**
 * No ring on the amount and no Acepto to press, because a Negociable offer has
 * neither. The article's wording is what the whole act turns on: "al iniciar una
 * negociación, el sistema debitará automáticamente el monto indicado a
 * consignar". The debit rides on starting the negotiation — there is no separate
 * confirmation to read first.
 *
 * That is the trap this act exists to defuse. Somebody who learned consigning
 * from act 2 expects a pop-up asking permission, and in Negociable the money is
 * already gone by the time they see one.
 */
const Negocia: React.FC = () => (
  <PasoEscena
    de={2}
    n={1}
    etiqueta="NEGOCIABLE · 1 DE 2"
    titulo="Toca Negocia ahora"
    bajada={
      <>
        Acá no hay botón de aceptar: la
        <br />
        consignación sale al arrancar.
      </>
    }
    p={PANTALLAS.negocia}
    dura={GUION.negocia[1]}
  />
);

/**
 * `proponer.png` is the only capture in the reel that shows a consignación
 * figure in two currencies (>S< 60 ó US$ 180). It is on screen because it is the
 * article's own image and the beat is about this modal — but nothing in the copy
 * reads those numbers out, because neither source explains them and the T&C's
 * 1:1 referential value (IV.2.2.d) points the other way. See the header note.
 */
const Propone: React.FC = () => (
  <PasoEscena
    de={2}
    n={2}
    etiqueta="NEGOCIABLE · 2 DE 2"
    titulo="Digita tu propuesta"
    bajada={
      <>
        La consignación ya se debitó, y
        <br />
        negocias directo con el vendedor.
      </>
    }
    p={PANTALLAS.propone}
    dura={GUION.propone[1]}
    alto={235}
  />
);

// ── Act 5 · the wallet ───────────────────────────────────────────────────────

/**
 * Everything above runs on money already sitting in the Billetera — "es su
 * responsabilidad contar con los fondos necesarios en su Billetera para
 * consignar" (T&C IV.4.b). A tutorial that stops before saying where the money
 * comes from sends someone to a Participa button that will refuse them.
 *
 * The notice is the 3.9% and it is the most useful number in the reel: both
 * sources carry it (T&C IV.2.2.1.a — "equivale al 3.9% del valor de los
 * SubasCoins adquiridos"; Centro de Ayuda, same article) and it is the only
 * place where the choice between the two funding routes costs real money. The
 * Recarga is named as the route without the charge because the article names it
 * that way, not as a recommendation of ours.
 */
const Billetera: React.FC = () => (
  <AbsoluteFill
    style={{
      padding: "26px 22px 22px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
    }}
  >
    <div
      style={{
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 7,
      }}
    >
      <Chip retraso={2}>ANTES DE TODO ESTO</Chip>
      <Titular tam={23} retraso={5}>
        Carga tu Billetera
      </Titular>
      <Bajada retraso={9}>
        Con SubasCoins o con una recarga.
        <br />
        Sin fondos no puedes consignar.
      </Bajada>
    </div>
    <Pantalla
      p={PANTALLAS.billetera}
      dura={GUION.billetera[1]}
      alto={205}
      retraso={5}
    />
    <div
      style={{
        ...useEntrada(58),
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        padding: "9px 12px",
        borderRadius: 13,
        background: "rgba(70,26,0,0.5)",
        border: `1px solid ${vy.naranja}66`,
      }}
    >
      <span style={{ fontSize: 12, lineHeight: 1 }}>⚠️</span>
      <span
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 9.5,
          lineHeight: 1.35,
          color: "#FFFFFF",
        }}
      >
        Comprar SubasCoins con tarjeta cobra 3.9%. La recarga es la opción sin
        ese cobro.
      </span>
    </div>
  </AbsoluteFill>
);

// ── Act 6 · the close ────────────────────────────────────────────────────────

/**
 * The closing notice is the rule that lives in the Términos and nowhere in the
 * article, the same job the 14-day rule does in `Registro`: **T&C IV.2.1.e** —
 * "De incumplir las responsabilidades asumidas como participante, el monto
 * consignado siempre será convertido a SubasCoins antes de ser liberado a su
 * Billetera."
 *
 * It is the other half of the orange notice and it is the half nobody expects.
 * Skipping the room does not burn the consignación — you get it back — but you
 * get it back as SubasCoins, which only spend inside the Marketplace (T&C
 * IV.2.2.a: "no constituyen dinero electrónico, moneda, depósito bancario …").
 * Somebody who funded with a US$ Recarga specifically to keep it withdrawable
 * loses exactly that by not showing up.
 *
 * Violet, not orange: it is a consequence of a rule, and closing the reel on an
 * alarm colour undoes the CTA above it.
 */
const Cierre: React.FC<{ d: ReelConsignar }> = ({ d }) => (
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
    <div
      style={{
        ...useEntrada(80),
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "8px 13px",
        borderRadius: 13,
        background: "rgba(20,0,70,0.5)",
        border: "1px solid rgba(174,142,255,0.5)",
      }}
    >
      <span
        style={{
          fontFamily: sans,
          fontWeight: 700,
          fontSize: 9,
          letterSpacing: 0.6,
          color: vy.violeta100,
          whiteSpace: "nowrap",
        }}
      >
        OJO
      </span>
      <span
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 9,
          lineHeight: 1.35,
          color: "#FFFFFF",
        }}
      >
        Si no cumples como participante, la consignación vuelve como SubasCoins.
      </span>
    </div>
  </AbsoluteFill>
);

// ── Composition ──────────────────────────────────────────────────────────────

/**
 * Silent, like `Registro`. `public/voz/consignar.mp3` has not been recorded —
 * the block to paste into ElevenLabs is in VOZ-CONSIGNAR.md. When it lands, add
 * the `<Audio>` here and re-measure GUION.
 */
export const ReelConsignarVideo: React.FC<{ d: ReelConsignar }> = ({ d }) => (
  <AbsoluteFill>
    <Fondo fondo={d.fondo} />
    <Escena de={GUION.gancho[0]} dura={GUION.gancho[1]}>
      <Gancho />
    </Escena>
    <Escena de={GUION.participa[0]} dura={GUION.participa[1]}>
      <Participa />
    </Escena>
    <Escena de={GUION.acepto[0]} dura={GUION.acepto[1]}>
      <Acepto />
    </Escena>
    <Escena de={GUION.bid[0]} dura={GUION.bid[1]}>
      <Bid />
    </Escena>
    <Escena de={GUION.negocia[0]} dura={GUION.negocia[1]}>
      <Negocia />
    </Escena>
    <Escena de={GUION.propone[0]} dura={GUION.propone[1]}>
      <Propone />
    </Escena>
    <Escena de={GUION.billetera[0]} dura={GUION.billetera[1]}>
      <Billetera />
    </Escena>
    <Escena de={GUION.cierre[0]} dura={GUION.cierre[1]}>
      <Cierre d={d} />
    </Escena>
  </AbsoluteFill>
);
