import React from "react";
import { AbsoluteFill } from "remotion";
import { sans, vy } from "../brand/vmc";
import { Bajada, Chip, DS, Fondo, Latido, Titular, useEntrada } from "./ui";
import { Captura, Escena, Pantalla, PasoEscena } from "./tutorial";
import { Logo } from "./Vender";
import Button from "@/concorde/components/Button";

// ═════════════════════════════════════════════════════════════════════════════
// Reel: cómo registrarte en VMC — 270×480, 47s.
//
// The first tutorial reel, and it works differently from the three brand ones.
// `Vender`, `Negociable` and `VendeSolo` sell a feeling and rebuild the product
// in Concorde components so the reel moves when the product moves. A tutorial
// has the opposite job: the viewer has to *recognise* the screen they are about
// to see, pixel for pixel, so this one plays the Centro de Ayuda's real
// screenshots inside a phone viewport and pushes in on the control being
// tapped. A redrawn button that is 90% right is worse than useless here — it
// sends someone hunting for a control that does not look like that.
//
// Four acts:
//   1. Hook. Four steps, and the account is the door to everything else.
//   2. Steps 1 and 2. Getting to the form: Ingresa, then Regístrate.
//   3. The form itself: personal data, the factura aside, the checkboxes.
//   4. Close. The URL and the CTA.
//
// Source of truth: `categorias/registro/registrarte-es-facil-y-rapido` in the
// CentroDeAyudaVMC repo (updated 2026-08-18). Every claim on screen comes from
// that article — including the ones the voice does not say. The old 2025 video
// also walked through buying SubaCoins and a payment gateway; that is the
// wallet top-up now, a separate article and a separate reel, and folding it in
// here is what made the old one nine screens long.
// ═════════════════════════════════════════════════════════════════════════════

export type ReelRegistro = {
  /** The address the voice reads and the close prints. */
  sitio: string;
  /** Path inside `public/` to the pre-blurred ambient background. See `Fondo`. */
  fondo: string;
};

export const REGISTRO: ReelRegistro = {
  sitio: "vmcsubastas.com",
  /*
   * The home page itself, blurred past legibility. It is the screen the reel
   * opens on, so the glass has the site behind it from the first frame. Rebake:
   *
   *   convert <CentroDeAyudaVMC>/public/images/articulos/registro-home-ingresar.png \
   *           -resize 320x -blur 0x22 -modulate 55,58 -quality 82 \
   *           public/reel/registro/fondo.jpg
   */
  fondo: "reel/registro/fondo.jpg",
};

/**
 * The beats: [first frame, length]. 30fps, 1282 = 42.73s.
 *
 * **Provisional — not measured.** The other three reels' GUION came off
 * `silencedetect` over a recorded take; this voiceover does not exist yet, so
 * these frames are an estimate: each block's word count at 3.21 words/s (the
 * rate of `vendesolo.mp3`, 150 words over 46.8s of speech) plus a 0.73s gap
 * between blocks (that take's average).
 *
 * The estimate, block by block:
 *
 *   gancho    0.00– 7.48  Vamos a crear tu cuenta en VMC. La necesitas para
 *                         competir en vivo o negociar directo con el vendedor.
 *                         Son cuatro pasos nada más.
 *   paso1     8.21–11.64  Entra a vmcsubastas.com y toca Ingresa.
 *   paso2    12.37–14.55  En la pantalla de bienvenida, toca Regístrate.
 *   paso3    15.28–21.83  Completa tus datos: nombres, apellidos, DNI, celular,
 *                         correo y contraseña. Con los tuyos: la cuenta es
 *                         personal e intransferible.
 *   factura  22.56–28.79  ¿Necesitas factura? En Quiero Recibir elige Factura y
 *                         agrega tu RUC. Si no, quedas como persona natural y
 *                         recibes boleta.
 *   paso4    29.52–34.51  Marca las casillas de Condiciones y Términos y de la
 *                         política de privacidad, y toca Sigamos.
 *   cierre   35.24–42.72  Y listo, ya eres parte de VMC. Ahora entra, elige tu
 *                         oferta y agenda tu visita para verlo en físico.
 *
 * **When the take comes back, these numbers get replaced, not adjusted.** The
 * reel re-times to the voice — if the recording lands at 51s the reel is 51s.
 * Measure it and rewrite both this object and the table in VOZ-REGISTRO.md:
 *
 *   ffmpeg -i public/voz/registro.mp3 -af silencedetect=noise=-35dB:d=0.15 -f null -
 *
 * The threshold is per-take: -30dB on `vender.mp3`, -35dB on `vendesolo.mp3`.
 * Push it until the number of gaps matches the punctuation of the script — the
 * gaps inside a line are its commas, not cuts.
 */
const GUION = {
  gancho: [0, 229],
  paso1: [229, 125],
  paso2: [354, 88],
  paso3: [442, 218],
  factura: [660, 209],
  paso4: [869, 171],
  cierre: [1040, 242],
} as const;

export const DURACION_REGISTRO = GUION.cierre[0] + GUION.cierre[1];

// ── The product's screens ────────────────────────────────────────────────────

/**
 * The five screenshots, with their natural size and the control the beat is
 * about, in fractions of the image.
 *
 * They are copies of the Centro de Ayuda's article images, not new captures, so
 * the reel and the article are provably showing the same thing. Re-sync all
 * five with:
 *
 *   cp <CentroDeAyudaVMC>/public/images/articulos/registro-<x>.png \
 *      public/reel/registro/<x>.png
 *
 * `w`/`h` are here because `Pantalla` has to do the cover-and-pan arithmetic
 * itself and the browser will not tell it the natural size in time to render a
 * deterministic frame. If a screenshot is re-captured at another size, fix the
 * numbers here — `identify <archivo>` prints them.
 */
const PANTALLAS: Record<string, Captura> = {
  ingresar: {
    archivo: "reel/registro/home-ingresar.png",
    w: 544,
    h: 666,
    foco: [0.82, 0.06],
  },
  registrate: {
    archivo: "reel/registro/login.png",
    w: 423,
    h: 692,
    foco: [0.51, 0.88],
  },
  datos: {
    archivo: "reel/registro/datos-personales.png",
    w: 465,
    h: 805,
    foco: [0.5, 0.54],
  },
  factura: {
    archivo: "reel/registro/factura-ruc.png",
    w: 554,
    h: 407,
    foco: [0.43, 0.57],
  },
  condiciones: {
    archivo: "reel/registro/condiciones-terminos.png",
    w: 439,
    h: 707,
    foco: [0.5, 0.88],
  },
} as const;

// ── Act 1 · the hook ─────────────────────────────────────────────────────────

/**
 * No screenshot here, and that is the point of the beat.
 *
 * The reel is about to spend forty seconds inside the product, so the opening
 * frame is the one place it can say what the forty seconds are *for*. A phone
 * on screen at 0.5s would just be the first step arriving early.
 *
 * Third pass, and the two before it failed the same way: they named the goods.
 *
 * "Conviértete en Cazador de Ofertas" narrowed it by *audience* — the product's
 * own word for its user, but a buyer's word, and it framed the reel as a hunt for
 * auctions. "Compra o vende autos" then narrowed it by *category*, and that one
 * the contract contradicts outright: the T&C never write "auto". The word is
 * **activo** (II.17 — "nuevos o seminuevos, operativos o inoperativos … bajo la
 * condición siniestrado, salvamento o chatarra"), the service is defined over
 * "negociación de activos de propiedad de terceros" (I), and "vehículos" appears
 * exactly once in the whole document, as a style note about writing listings.
 * Cars are what the marketplace sells most of today; they are not its scope.
 *
 * So this hook does not name the goods at all. It names the pair of ways you get
 * them, which is the distinctive half anyway and is sourced twice over: Oferta
 * "En Vivo" (T&C II.26 — "compiten en tiempo real, enviando sus bids en sala")
 * and Oferta "Negociable" (T&C IV.6.1.b and Centro de Ayuda
 * [oferta-negociable] — "negociación directamente con el vendedor", and no
 * Precio Base). Naming them also hands the viewer the two words they are about
 * to meet on the site.
 *
 * And then the fourth pass had to undo half of that, because avoiding the noun
 * went too far: "En Vivo o Negociable" as the headline reads as an ad for the two
 * offer formats. Someone scrolling learns that VMC has two of them and never
 * learns that this reel is a how-to about signing up — which is the one thing the
 * hook of a tutorial exists to say.
 *
 * So the three jobs are split across the three elements instead of fought over:
 *
 *   Titular  what the reel teaches      Crea tu cuenta en 4 pasos
 *   Bajada   how wide the account is    sirve para comprar y para vender
 *   Voz      why you need one           competir En Vivo, o negociar directo
 *
 * The offer types moved to the voice, where they are the *reason* rather than the
 * subject. The bajada carries the width the second pass got wrong (T&C I to
 * participate, IV.4 to consign) without naming a category. And "4 pasos" on
 * screen while the voice says "cuatro pasos" is the documented §4 exception: in
 * the first act the titular tracks the voice on purpose.
 *
 * ponytail: "activo" is the correct word and unusable here — it is contract
 * vocabulary. Sidestepping the noun is right; making the hook *about* the
 * sidestep was not. Do not put a category back in the titular, and do not put
 * the offer types back either.
 */
const Gancho: React.FC = () => (
  <AbsoluteFill
    style={{
      padding: "0 26px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 18,
    }}
  >
    <div style={useEntrada(2)}>
      <Logo ancho={128} />
    </div>
    <div style={{ textAlign: "center" }}>
      {/* Two lines, broken by hand: the frame holds ~16 characters at this size
          and the break has to fall before "en 4 pasos" so the number lands on a
          line of its own weight.

          No full stop, and that is typographic, not stylistic: at letterSpacing
          -0.5 the "s"+"." pair leaves a visible gap ("en 4 pasos ."), which reads
          as a typo in the largest type of the reel. The four step headlines carry
          no full stop either, so dropping it also makes them consistent. */}
      <Titular tam={26} retraso={14}>
        Crea tu cuenta
        <br />
        en 4 pasos
      </Titular>
    </div>
    <div style={{ textAlign: "center", maxWidth: 208 }}>
      <Bajada retraso={30}>
        La misma cuenta sirve para comprar y para vender.
      </Bajada>
    </div>
    {/* The brevity promise, and the only reason anyone stays past second three. */}
    <Chip retraso={46}>TE LO MUESTRO</Chip>
  </AbsoluteFill>
);

// ── Act 2 · getting to the form ──────────────────────────────────────────────

/**
 * The bajadas never repeat the voice — they add something the voice had no room
 * for, and every one of them is traceable to a source.
 *
 * This one used to claim the button lives in the header of every page and works
 * the same on desktop. Neither the T&C nor the Centro de Ayuda say that
 * anywhere; it was the only line in the reel with no source at all, and it is
 * gone. What replaced it is verifiable from the two captures the reel itself
 * shows: Ingresa opens the welcome screen, and Regístrate is on it. That also
 * happens to remove the friction of hunting for a register button that does not
 * exist on the home page.
 */
const Paso1: React.FC = () => (
  <PasoEscena
    de={4}
    n={1}
    titulo="Toca Ingresa"
    bajada={
      <>
        Un solo botón para todo: ahí creas
        <br />
        tu cuenta y ahí vuelves a entrar.
      </>
    }
    p={PANTALLAS.ingresar}
    dura={GUION.paso1[1]}
  />
);

/**
 * Same screen answers "¿y si ya tengo cuenta?" — the article's fourth question
 * is people who registered once and forgot. Sending them to Iniciar sesión here
 * costs one line and saves a support ticket.
 */
const Paso2: React.FC = () => (
  <PasoEscena
    de={4}
    n={2}
    titulo="Toca Regístrate"
    bajada={
      <>
        Y si ya tienes cuenta, entras desde
        <br />
        la misma pantalla. Nada que buscar.
      </>
    }
    p={PANTALLAS.registrate}
    dura={GUION.paso2[1]}
  />
);

// ── Act 3 · the form ─────────────────────────────────────────────────────────

/**
 * "Un correo y un celular por cuenta" is the article's second failure mode,
 * quoted almost word for word. The screen no longer spells out the relative who
 * already used your email — the rule alone stops the same mistake, and the line
 * in front of it ("datos que ya sabes de memoria") is doing the selling that a
 * step-three footnote was not. The voice carries the rule behind it — personal
 * and non-transferable (T&C II.6 and III.1.d) and the data is given as a sworn
 * statement (T&C IV.1.1.b) — and the screen carries the consequence.
 *
 * The voice used to say "no aceptamos registros de terceros", which is the
 * article's own wording. It says "la cuenta es personal e intransferible"
 * instead: same rule, and it is the phrase that actually appears in the T&C.
 */
const Paso3: React.FC = () => (
  <PasoEscena
    de={4}
    n={3}
    titulo="Completa tus datos"
    bajada={
      <>
        Son datos que ya sabes de memoria.
        <br />
        Un correo y un celular por cuenta.
      </>
    }
    p={PANTALLAS.datos}
    dura={GUION.paso3[1]}
    anillo={false}
  />
);

/**
 * The aside, and it is deliberately not numbered.
 *
 * Persona jurídica is a field inside step 3, not a fifth step, and numbering it
 * would tell a buyer who only wants a boleta that the reel still owes them two
 * more steps. The chip changes colour of meaning instead: "¿NECESITAS FACTURA?"
 * is a question, so the 60% of viewers it does not apply to know they can stop
 * reading.
 *
 * Short screen (147, not 262): the source capture is 554×407 and the section is
 * three controls tall. Forcing it into the tall window would crop the RUC field
 * off the bottom or scale the whole thing to a blur.
 */
const Factura: React.FC = () => (
  <AbsoluteFill
    style={{
      padding: "34px 22px 26px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 15,
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
      <Chip retraso={2}>¿NECESITAS FACTURA?</Chip>
      <Titular tam={23} retraso={6}>
        Elígelo en
        <br />
        Quiero Recibir.
      </Titular>
    </div>
    <Pantalla p={PANTALLAS.factura} dura={GUION.factura[1]} alto={147} retraso={16} />
    {/*
      The warning the article puts in an orange box, and the only reason this
      beat exists: choosing Factura is not a preference, it is the tax identity
      of every purchase you will ever make here. Nobody discovers that from the
      form itself.

      Both halves are now the Centro de Ayuda's own words ("los comprobantes se
      emitirán a nombre de la razón social", "si te registras como persona
      natural solo recibirás boleta"). The old second half said the boleta comes
      out in your name, which is true and obvious but is nowhere in either
      source — and a line nobody can point to is a line that gets argued about.
    */}
    <div
      style={{
        ...useEntrada(96),
        alignSelf: "stretch",
        display: "flex",
        gap: 8,
        padding: "9px 11px",
        borderRadius: 10,
        background: "rgba(190,61,0,0.28)",
        border: "1px solid rgba(255,150,57,0.55)",
      }}
    >
      <span style={{ fontSize: 11, lineHeight: 1.25 }}>⚠️</span>
      <span
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 9.5,
          lineHeight: 1.35,
          color: "#FFFFFF",
        }}
      >
        Con Factura, los comprobantes salen a nombre de la razón social. Como
        persona natural, solo recibes boleta.
      </span>
    </div>
  </AbsoluteFill>
);

/**
 * "Acepta y sigue" was the only headline of the four that did not name its
 * button, and the button says **Sigamos** — the exact thing VOZ-REGISTRO.md
 * demands of the voice ("si la voz dice 'entra a tu cuenta' y el botón dice
 * 'Ingresa', el reel falló") and the screen was quietly exempting itself from.
 *
 * "Acepta y toca Sigamos" fixes that and wraps to two lines, which pushes this
 * step's window 27px below the other three and costs the list its shape. So the
 * headline keeps the "Toca X" pattern of steps 1 and 2 instead — three of four
 * steps opening the same way is a feature in a tutorial — and "acepta" goes to
 * the voice, which has the room to say *which* boxes. The screen shows them
 * already ticked.
 */
const Paso4: React.FC = () => (
  <PasoEscena
    de={4}
    n={4}
    titulo="Toca Sigamos"
    bajada={
      <>
        Es el último paso. Al terminarlo
        <br />
        tu cuenta ya está creada.
      </>
    }
    p={PANTALLAS.condiciones}
    dura={GUION.paso4[1]}
  />
);

// ── Act 4 · the close ────────────────────────────────────────────────────────

/**
 * The close has to do two jobs the rest of the reel does not: land the account
 * and get it used. They are not the same job, and the 14-day rule is why.
 *
 * **T&C IV.1.2.a**: "En caso transcurran 14 días desde la creación de una
 * cuenta sin haber realizado alguna actividad transaccional, ésta será dada de
 * baja de manera automática." A registration tutorial that ends on "listo, ya
 * tienes cuenta" is teaching someone to create an account that can quietly
 * disappear on them. The rule is in the Términos and nowhere in the Centro de
 * Ayuda, so nobody who only reads the help article will ever meet it.
 *
 * It goes on screen, not in the voice, and the voice says something else — the
 * §4 rule against printing what is being spoken, used the way it is meant to be
 * used. It also happens to be the right split for Instagram, which is watched
 * on mute: the deadline is the half a silent viewer must not miss, and "entra y
 * agenda tu visita" is the half that only works with sound anyway.
 *
 * The visit is the call to action rather than "a cazar ofertas" because it is
 * the only thing a fresh account can actually do. Bidding needs consignación
 * (Centro de Ayuda, [consignacion] Consignar es necesario para participar);
 * booking a visit needs nothing but being registered ([visitas]). Sending
 * someone to bid the minute they register is a promise the next screen breaks.
 */
const Cierre: React.FC<{ d: ReelRegistro }> = ({ d }) => (
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
    {/*
      Violet and not the factura beat's orange: this is a deadline, not a
      hazard, and closing the reel on an alarm colour undoes the CTA sitting
      right above it. Frame 84 is where the take reaches "ahora entra" — the
      deadline arrives with the instruction to act on it, not before.

      "Úsala antes" is the only editorial half of the notice; the rest is T&C
      IV.1.2.a in its own words. A deadline stated flat reads as fine print, and
      fine print under a CTA gets skipped.
    */}
    <div
      style={{
        ...useEntrada(84),
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
          // Or the flex row folds it to "14 / DÍAS" against the sentence.
          whiteSpace: "nowrap",
        }}
      >
        14 DÍAS
      </span>
      <span
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 9,
          color: "rgba(255,255,255,0.82)",
        }}
      >
        Úsala antes: una cuenta sin transacciones se da de baja sola.
      </span>
    </div>
  </AbsoluteFill>
);

// ── Composition ──────────────────────────────────────────────────────────────

/**
 * Silent, like `Vender` was before its take existed. `public/voz/registro.mp3`
 * has not been recorded — the script to paste into ElevenLabs is in
 * VOZ-REGISTRO.md. When it lands, add the `<Audio>` here and re-measure GUION.
 */
export const ReelRegistroVideo: React.FC<{ d: ReelRegistro }> = ({ d }) => (
  <AbsoluteFill>
    <Fondo fondo={d.fondo} />
    <Escena de={GUION.gancho[0]} dura={GUION.gancho[1]}>
      <Gancho />
    </Escena>
    <Escena de={GUION.paso1[0]} dura={GUION.paso1[1]}>
      <Paso1 />
    </Escena>
    <Escena de={GUION.paso2[0]} dura={GUION.paso2[1]}>
      <Paso2 />
    </Escena>
    <Escena de={GUION.paso3[0]} dura={GUION.paso3[1]}>
      <Paso3 />
    </Escena>
    <Escena de={GUION.factura[0]} dura={GUION.factura[1]}>
      <Factura />
    </Escena>
    <Escena de={GUION.paso4[0]} dura={GUION.paso4[1]}>
      <Paso4 />
    </Escena>
    <Escena de={GUION.cierre[0]} dura={GUION.cierre[1]}>
      <Cierre d={d} />
    </Escena>
  </AbsoluteFill>
);
