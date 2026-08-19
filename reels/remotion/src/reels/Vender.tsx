import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import { sans, vy } from "../brand/vmc";
import {
  Bajada,
  Chip,
  DS,
  Escena,
  Fondo,
  InputMonto,
  Latido,
  Monto,
  Paso,
  TextoMarca,
  Titular,
  Vidrio,
  useConteo,
  useEntrada,
} from "./ui";
import { PilaPropuestas } from "./pantallas";
import BidMessage from "@/concorde/components/BidMessage";
import Button from "@/concorde/components/Button";
import DetailCard from "@/concorde/components/DetailCard";

// ═════════════════════════════════════════════════════════════════════════════
// Reel: how selling works at VMC — 270×480, 45s.
//
// One message, and only one: the seller names a price and VMC goes and gets it.
// The sibling reel (`Negociable.tsx`) explains how to publish; this one never
// mentions it. No form, no photo grid, no preview, no payment — a viewer who
// finishes this should be able to say what VMC *does for them*, not what it
// costs.
//
// Two acts:
//   1. The pains. Real footage of someone selling on her own, no brand, no UI,
//      no voice of the company. Show, don't tell.
//   2. The solution. Five steps, in her order: she sets the price, VMC goes to
//      market, VMC negotiates, VMC holds out for her number, VMC closes.
//
// The hinge between them is the whole reel: the same woman, warm light, and the
// one line that has to survive — NOSOTROS NOS ENCARGAMOS DE CONSEGUIR TU PRECIO.
//
// Silent by design. The voiceover for this script does not exist yet: see
// VOZ-VENDER.md. Which means the frames in `GUION` below are round numbers that
// the voice will have to fit, the opposite of Negociable, where the reel was
// re-timed to a take that already existed.
// ═════════════════════════════════════════════════════════════════════════════

export type ReelVender = {
  marca: string;
  modelo: string;
  /** What she asks for. Comma-formatted, without the "US$". */
  expectativa: string;
  /**
   * What VMC gets her. It equals `expectativa` — that is the entire point of
   * the reel, and closing below it would contradict the promise on screen.
   */
  cierre: string;
  anio: string;
  kilometraje: string;
  /** Path inside `public/` to the cover photo — the car she is naming a price for. */
  foto: string;
  /** Path inside `public/` to the pre-blurred ambient background. See `Fondo`. */
  fondo: string;
  /** The proposals that climb toward the expectation. */
  propuestas: string[];
  dia: string;
  hora: string;
};

export const VENDER: ReelVender = {
  marca: "Suzuki",
  modelo: "Baleno",
  expectativa: "12,000",
  cierre: "12,000",
  anio: "2020",
  kilometraje: "45,000",
  // The side profile, not the front 3/4 the sibling reel uses: in a 194×122 crop
  // the front shot fills with lot debris, and this beat is the one where the car
  // has to look worth the number she is typing.
  foto: "reel/63008-suzuki-baleno-5.jpeg",
  fondo: "reel/toyota-fortuner-1-fondo.jpg",
  propuestas: ["9,500", "10,400", "11,300"],
  dia: "LUNES 04",
  hora: "11:11 pm",
};

/**
 * The beats: [first frame, length]. 30fps, 1265 = 42.17s.
 *
 * These are measured, not chosen. `public/voz/vender.mp3` came back as one
 * continuous take, so the reel was re-timed to the voice rather than the other
 * way round: every cut sits in the gap between two lines, biased ~0.3s early so
 * the incoming scene is already up when the next line starts.
 *
 * The gaps the cuts sit in, off the recording:
 *
 *   1 calleA    0.00– 2.94  Vender tu auto por tu cuenta es un montón de trabajo.
 *   2 tramites  4.28– 6.06  Explicas, esperas, repites,
 *   3 calleB    6.48– 9.72  y al final siempre te terminan bajando el precio.
 *   4 bisagra  10.52–14.62  En VMC, no. Nosotros nos encargamos de conseguir el
 *                           precio que quieres.
 *   5 paso1    15.40–19.66  Tú nos dices cuánto vale tu auto para ti y ese
 *                           número se vuelve nuestro objetivo.
 *   6 paso2    20.54–23.54  Lo sacamos al mercado, lo ponemos en nuestro
 *                           marketplace
 *   7 paso3    24.14–28.08  y cuando empiezan a llegar las propuestas, la
 *                           negociación la manejamos nosotros.
 *   8 paso4    28.66–32.26  No cerramos por menos, vamos por el número que
 *                           pusiste.
 *   9 paso5    32.82–35.74  Y en el momento justo en que se cumple, cerramos.
 *  10 cierre   36.38–41.44  Así de simple: tú pones el precio, nosotros lo
 *                           conseguimos. VMC.
 *
 * The cuts sit at the midpoint of each gap, and the gaps come from ffmpeg's
 * `silencedetect`, not from the transcript. Word timestamps disagree with the
 * waveform in places — the transcript puts "y" at 6.48s, inside a stretch the
 * meter reads as silent — and four cuts derived from the transcript landed on
 * top of speech. The meter is the authority; re-derive with:
 *
 *   ffmpeg -i public/voz/vender.mp3 -af silencedetect=noise=-30dB:d=0.20 -f null -
 *
 * Speech in this take runs -17 to -20 dB and the gaps floor at -62 dB, so a cut
 * is verifiably clean when a 0.24s window around it measures below about -50.
 *
 * Re-record the voice and all of this has to be measured again. The frames are
 * mirrored in VOZ-VENDER.md.
 */
const GUION = {
  calleA: [0, 100],
  tramites: [100, 104],
  calleB: [204, 101],
  bisagra: [305, 146],
  paso1: [451, 154],
  paso2: [605, 116],
  paso3: [721, 140],
  paso4: [861, 114],
  paso5: [975, 106],
  cierre: [1081, 184],
} as const;

export const DURACION_VENDER = GUION.cierre[0] + GUION.cierre[1];

/** Five steps, and the chip counts them so the viewer knows where the list ends. */
const PASOS = 5;

// Exported for `VendeSolo.tsx`, which reuses this reel's footage frame and logo.
export const Logo: React.FC<{ ancho?: number }> = ({ ancho = 118 }) => (
  <Img
    src={staticFile("brand/vmc-logo.svg")}
    style={{ width: ancho, height: (ancho * 67) / 180 }}
  />
);

// ── Footage ──────────────────────────────────────────────────────────────────

/**
 * The clips in `public/videos/` are not the ones in `../../tomas/`.
 *
 * Every original carries a generator watermark — a four-point sparkle at roughly
 * 84% across, 90% down. Cropping it out cost the buyer his place in the frame,
 * so it is patched at the source instead and the reel plays the patched files:
 *
 *   ffmpeg -i <original> -vf "delogo=x=855:y=1675:w=125:h=125" \
 *          -c:v libx264 -crf 18 -an <public/videos/…>   # 1080×1920 clips
 *   …delogo=x=560:y=1125:w=85:h=85                      # alivio.mp4, 720×1280
 *
 * `-an` on purpose: this reel is silent, and the source audio is a room tone
 * that would fight the voiceover once it exists.
 */

/**
 * A full-bleed scene of real footage.
 *
 * `frio` is the grade of act one: desaturated, darkened, with a violet wash on
 * top — the same treatment `Pregunta` gives the cutouts in the sibling reel. The
 * hinge and the close run without it, because the warmth of that couch shot is
 * half of what those beats are saying and filtering it kills the turn.
 *
 * `desde`/`hasta` are seconds *in the source file*, not reel frames. Keeping
 * them in the clip's own units is what makes them checkable against ffprobe.
 */
export const Toma: React.FC<{
  src: string;
  desde: number;
  hasta: number;
  frio?: boolean;
  abajo?: boolean;
  children: React.ReactNode;
}> = ({ src, desde, hasta, frio = false, abajo = false, children }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#0D0B14", overflow: "hidden" }}>
      <Video
        src={staticFile(src)}
        trimBefore={Math.round(desde * fps)}
        trimAfter={Math.round(hasta * fps)}
        muted
        // A prop, not a style: `@remotion/media` draws to a canvas and has to
        // do the fit itself. In `style` it is silently ignored.
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          filter: frio
            ? "saturate(0.62) brightness(0.80) contrast(1.10)"
            : "saturate(1.06) brightness(1.02) contrast(1.02)",
        }}
      />
      {frio ? (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(20,0,70,0.34) 0%, rgba(13,11,20,0.30) 100%)",
          }}
        />
      ) : null}
      {/* The ground the type sits on. Text-side only, so the face stays clean. */}
      <AbsoluteFill
        style={{
          background: abajo
            ? "linear-gradient(0deg, rgba(13,11,20,0.92) 4%, rgba(13,11,20,0.62) 30%, rgba(13,11,20,0) 58%)"
            : "linear-gradient(180deg, rgba(13,11,20,0.88) 0%, rgba(13,11,20,0.45) 26%, rgba(13,11,20,0) 52%)",
        }}
      />
      <AbsoluteFill
        style={{
          padding: abajo ? "0 24px 44px" : "42px 24px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: abajo ? "flex-end" : "flex-start",
          gap: 12,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Act 1: the pains ─────────────────────────────────────────────────────────

/**
 * Three shots of doing it alone. No logo, no product, no UI — the first fourteen
 * seconds belong to her, and a brand mark in here would turn a feeling into an
 * ad before the viewer has agreed with anything.
 *
 * The lines get shorter as the act goes: a sentence, then three words, then the
 * punchline. The footage is already doing the work; the type only has to name it.
 *
 * These three follow the recorded take word for word. Elsewhere the type is
 * support and may say its own thing, but here it is the only thing on screen
 * next to the voice, and hearing "un montón de trabajo" over a card that reads
 * "un trabajo" is the kind of mismatch a viewer notices without knowing why.
 */
const Calle: React.FC = () => (
  <Toma src="videos/calle.mp4" desde={0} hasta={3.73} frio>
    <Titular tam={25} retraso={6}>
      Vender tu auto
      <br />
      por tu cuenta es un
      <br />
      montón de trabajo.
    </Titular>
  </Toma>
);

// Windows picked off the footage, not off round numbers. `tramites` opens on
// the head-on-hand stare (source 2–4s) and ends on her scrolling the phone,
// which is the beat "Repetir" is naming.
const Tramites: React.FC = () => (
  <Toma src="videos/tramites.mp4" desde={2.2} hasta={6.07} frio>
    <Titular tam={25} retraso={4}>
      Explicas.
      <br />
      Esperas.
      <br />
      Repites.
    </Titular>
  </Toma>
);

// Runs to the last frame of the clip on purpose: the wide standoff over the
// hood resolves into the close-up of her face going flat, and that deflation is
// what "te quieren bajar el precio" is paying off. Ending a beat early throws
// the payoff away.
const Regateo: React.FC = () => (
  <Toma src="videos/calle.mp4" desde={5.1} hasta={8.87} frio>
    <Titular tam={24} retraso={4}>
      Y al final, siempre
      <br />
      te terminan bajando
      <br />
      el precio.
    </Titular>
  </Toma>
);

// ── The hinge ────────────────────────────────────────────────────────────────

/**
 * The turn, and the line the whole reel exists to deliver.
 *
 * It lands here rather than at the close because everything after it is the
 * proof: the five steps are just this sentence taken apart. The logo appears for
 * the first time in the reel on this beat — the brand earns the right to speak
 * once it has something to offer.
 *
 * `TextoMarca` hard-codes `white-space: nowrap`, so each line is its own
 * element — a `<br/>` inside one would render as a single line running off the
 * frame. Which is also why the phrase breaks in three and not two: at a size
 * that carries this beat, "NOSOTROS NOS ENCARGAMOS" does not fit across 270px.
 * The break lands so the payoff, "CONSEGUIR TU PRECIO", gets a line to itself.
 */
const Linea: React.FC<{
  retraso: number;
  junta?: boolean;
  children: string;
}> = ({ retraso, junta = false, children }) => (
  <div style={{ ...useEntrada(retraso), marginTop: junta ? -6 : 0 }}>
    <TextoMarca tam={18}>{children}</TextoMarca>
  </div>
);

const Bisagra: React.FC = () => (
  <Toma src="videos/alivio.mp4" desde={0} hasta={5.3} abajo>
    <div style={useEntrada(4)}>
      <Logo ancho={100} />
    </div>
    <Linea retraso={14}>NOSOTROS NOS</Linea>
    <Linea retraso={21} junta>
      ENCARGAMOS DE
    </Linea>
    <Linea retraso={28} junta>
      CONSEGUIR TU PRECIO
    </Linea>
  </Toma>
);

// ── Act 2: the five steps ────────────────────────────────────────────────────

/** Step frame: the chip and the copy on top, the screen centred below. */
const EscenaPaso: React.FC<{
  paso: number;
  titulo: React.ReactNode;
  bajada: React.ReactNode;
  children: React.ReactNode;
}> = ({ paso, titulo, bajada, children }) => (
  <AbsoluteFill
    style={{
      padding: "30px 20px 30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    }}
  >
    <Paso n={paso} de={PASOS} />
    <div style={{ height: 8 }} />
    <Titular>{titulo}</Titular>
    <div style={{ height: 5 }} />
    <Bajada>{bajada}</Bajada>
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={useEntrada(10)}>{children}</div>
    </div>
  </AbsoluteFill>
);

/**
 * A figure typed in, digit by digit.
 *
 * `useConteo` is the wrong tool here: a total spinning up from zero reads as a
 * counter measuring something, and this is a person deciding. Characters landing
 * one at a time is what makes it hers. Six characters at 4 frames each is 0.8s —
 * fast enough to be over before the eye leaves the field.
 */
const useTecleo = (texto: string, retraso: number, cada = 4): string => {
  const f = useCurrentFrame();
  const n = Math.floor((f - retraso) / cada);
  return texto.slice(0, Math.max(0, Math.min(texto.length, n)));
};

/** A line of the car's spec, under its photo. */
const Dato: React.FC<{ children: React.ReactNode; fuerte?: boolean }> = ({
  children,
  fuerte = false,
}) => (
  <span
    style={{
      fontFamily: sans,
      fontWeight: fuerte ? 800 : 500,
      fontSize: fuerte ? 12 : 9,
      color: fuerte ? "#FFFFFF" : "rgba(255,255,255,0.62)",
    }}
  >
    {children}
  </span>
);

/**
 * Step 1 — the number is hers.
 *
 * The first cut of this scene was `InputMonto` alone in the middle of the frame:
 * a 152px box floating in 480px of violet, next to nothing. The field is the
 * product's real control and it stays, but on its own it carries no weight — and
 * an amount with nothing attached is just a number, when the whole point is that
 * it is the price *of her car*.
 *
 * So the card holds both: the asset on top, her figure under it, one rule
 * between them. That is the seller's actual mental model — this thing, this
 * much — and it fills the frame with the argument instead of with padding.
 *
 * It is the only moment in this reel that touches the publishing flow, and it
 * survives the cut because here it is not a form: it is the mandate.
 */
const Precio: React.FC<{ d: ReelVender }> = ({ d }) => {
  const tecleado = useTecleo(d.expectativa, 8);
  return (
    <EscenaPaso
      paso={1}
      titulo={<>Tú pones el precio</>}
      bajada={
        <>Nos dices cuánto quieres por tu auto. Ese número es el objetivo.</>
      }
    >
      <Vidrio
        radio={16}
        estilo={{
          width: 218,
          padding: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 9,
        }}
      >
        <Img
          src={staticFile(d.foto)}
          style={{
            width: 194,
            height: 122,
            objectFit: "cover",
            borderRadius: 10,
            boxShadow: "0px 4px 14px rgba(20,0,70,0.45)",
          }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            padding: "0 3px",
          }}
        >
          <Dato fuerte>
            {d.marca} {d.modelo}
          </Dato>
          <Dato>
            {d.anio} · {d.kilometraje} km
          </Dato>
        </div>
        <div
          style={{
            width: "100%",
            height: 1,
            background:
              "linear-gradient(90deg, rgba(174,142,255,0) 0%, rgba(174,142,255,0.42) 50%, rgba(174,142,255,0) 100%)",
          }}
        />
        <div
          style={{
            fontFamily: sans,
            fontWeight: 700,
            fontSize: 7.5,
            letterSpacing: 1.3,
            color: vy.violeta100,
          }}
        >
          LO QUIERO VENDER EN
        </div>
        {/* `vacio` greys the figure until the first character lands, so the empty
          field reads as waiting for her rather than as a render that failed. */}
        <InputMonto
          valor={tecleado || "0"}
          vacio={tecleado.length < d.expectativa.length}
        />
      </Vidrio>
    </EscenaPaso>
  );
};

/**
 * Step 2 — out to market.
 *
 * The counters climb during the scene. It is the only honest way to show "lo ven
 * miles" without committing to a figure: you read the movement, not the number.
 */
const Mercado: React.FC<{ d: ReelVender }> = ({ d }) => (
  <EscenaPaso
    paso={2}
    titulo={<>Salimos al mercado</>}
    bajada={
      <>
        Lo ponemos en nuestro marketplace, frente a miles de compradores
        verificados.
      </>
    }
  >
    <DS e={0.75}>
      <DetailCard
        variant="negotiable"
        day={d.dia}
        time={d.hora}
        views={useConteo(214, 11, 14, 85)}
        likes={useConteo(38, 2, 14, 85)}
        participants={useConteo(7, 0, 22, 85)}
      />
    </DS>
  </EscenaPaso>
);

/**
 * Step 3 — the negotiation starts, and it is not hers.
 *
 * The proposals climb toward her expectation without reaching it. That gap is
 * the setup for step 4: if they arrived at her number on their own, VMC would
 * have nothing to do.
 */
const Negociacion: React.FC<{ d: ReelVender }> = ({ d }) => (
  <EscenaPaso
    paso={3}
    titulo={<>Nosotros negociamos</>}
    bajada={
      <>
        Empiezan a llegar propuestas. La negociación la manejamos nosotros, no
        tú.
      </>
    }
  >
    <PilaPropuestas expectativa={d.expectativa} propuestas={d.propuestas} />
  </EscenaPaso>
);

/**
 * A message from the VMC team. One direction only.
 *
 * The sibling reel uses these bubbles both ways, because there the seller has to
 * accept or counter. Here she already gave her number, so VMC reports and does
 * not ask — and the moment a bubble came back from her side, the reel would be
 * saying she is still working the deal.
 */
const Burbuja: React.FC<{ children: React.ReactNode; retraso: number }> = ({
  children,
  retraso,
}) => (
  <div
    style={{
      ...useEntrada(retraso),
      alignSelf: "flex-start",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <div
      style={{
        fontFamily: sans,
        fontWeight: 700,
        fontSize: 7.5,
        letterSpacing: 0.6,
        color: vy.violeta100,
      }}
    >
      EQUIPO VMC
    </div>
    <DS e={0.78} estilo={{ width: 253 }}>
      <BidMessage side="received">{children}</BidMessage>
    </DS>
  </div>
);

const Insistimos: React.FC<{ d: ReelVender }> = ({ d }) => (
  <EscenaPaso
    paso={4}
    titulo={<>Vamos por tu precio</>}
    bajada={
      <>
        No cerramos por menos. Trabajamos cada oferta hasta llegar al número que
        pusiste.
      </>
    }
  >
    <Vidrio
      radio={18}
      estilo={{
        width: 244,
        padding: "15px 13px 17px",
        display: "flex",
        flexDirection: "column",
        gap: 11,
      }}
    >
      <Burbuja retraso={4}>
        Tenemos un comprador interesado en tu {d.marca} {d.modelo}. Estamos
        negociando.
      </Burbuja>
      <Burbuja retraso={34}>
        Subió a <b>US$ 11,300</b>. Seguimos: tu precio es US$ {d.expectativa}.
      </Burbuja>
      <Burbuja retraso={64}>
        Aceptó. Llegamos a <b>US$ {d.cierre}</b>.
      </Burbuja>
    </Vidrio>
  </EscenaPaso>
);

/**
 * Step 5 — the close.
 *
 * The figure is `cierre`, which is `expectativa`. Showing the two as one number
 * is the argument; a card that said "conseguimos US$ 11,800 de los 12,000 que
 * pediste" would be an honest sentence and a dead reel.
 */
const Cerramos: React.FC<{ d: ReelVender }> = ({ d }) => (
  <EscenaPaso
    paso={5}
    titulo={<>Cerramos</>}
    bajada={
      <>
        En el momento en que se cumple tu precio, cerramos la negociación y te
        conectamos con tu comprador.
      </>
    }
  >
    <Vidrio
      radio={18}
      estilo={{
        width: 214,
        padding: "16px 14px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 9,
      }}
    >
      <Chip punto retraso={2}>
        PRECIO CONSEGUIDO
      </Chip>
      <Monto valor={d.cierre} tam={26} />
      <div
        style={{
          ...useEntrada(20),
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 9.5,
          textAlign: "center",
          color: "rgba(255,255,255,0.72)",
        }}
      >
        Exactamente lo que pediste.
      </div>
    </Vidrio>
  </EscenaPaso>
);

// ── The close ────────────────────────────────────────────────────────────────

/**
 * Back to the couch, and the ask.
 *
 * The reel opens on her working and closes on her not working. The headline is
 * the key phrase compressed to its two halves — hers and ours — which is the
 * only thing the viewer has to remember.
 */
const Cierre: React.FC = () => (
  // Runs to the last frame of the clip. `alivio.mp4` is 10s and the hinge and
  // the close together want 11.8 of it, so the two windows overlap by ~1.8s —
  // invisible at 26 seconds apart, and the alternative was cutting the close
  // short of the voice.
  <Toma src="videos/alivio.mp4" desde={3.47} hasta={10} abajo>
    <Chip retraso={2}>VENDE CON VMC</Chip>
    <Titular tam={24} retraso={6}>
      Tú pones el precio.
      <br />
      Nosotros lo conseguimos.
    </Titular>
    <div style={{ height: 2 }} />
    <Latido retraso={22}>
      <DS e={0.72}>
        <Button variant="primary">Quiero vender</Button>
      </DS>
    </Latido>
    <div style={{ ...useEntrada(30), alignSelf: "center", marginTop: 6 }}>
      <Logo ancho={110} />
    </div>
  </Toma>
);

// ── Composition ──────────────────────────────────────────────────────────────

/**
 * BidMessage keeps a bid on one line, because a bid is a number. The reel's
 * bubbles are sentences, so in here they wrap.
 */
const CSS_REEL = `.pbidmsg .pbidmsg__text { white-space: normal; }`;

export const ReelVenderVideo: React.FC<{ d: ReelVender }> = ({ d }) => (
  <AbsoluteFill>
    <style dangerouslySetInnerHTML={{ __html: CSS_REEL }} />
    {/* One continuous take. `GUION` is measured against it — see the table there. */}
    <Audio src={staticFile("voz/vender.mp3")} />
    <Fondo fondo={d.fondo} />
    <Escena de={GUION.calleA[0]} dura={GUION.calleA[1]}>
      <Calle />
    </Escena>
    <Escena de={GUION.tramites[0]} dura={GUION.tramites[1]}>
      <Tramites />
    </Escena>
    <Escena de={GUION.calleB[0]} dura={GUION.calleB[1]}>
      <Regateo />
    </Escena>
    <Escena de={GUION.bisagra[0]} dura={GUION.bisagra[1]}>
      <Bisagra />
    </Escena>
    <Escena de={GUION.paso1[0]} dura={GUION.paso1[1]}>
      <Precio d={d} />
    </Escena>
    <Escena de={GUION.paso2[0]} dura={GUION.paso2[1]}>
      <Mercado d={d} />
    </Escena>
    <Escena de={GUION.paso3[0]} dura={GUION.paso3[1]}>
      <Negociacion d={d} />
    </Escena>
    <Escena de={GUION.paso4[0]} dura={GUION.paso4[1]}>
      <Insistimos d={d} />
    </Escena>
    <Escena de={GUION.paso5[0]} dura={GUION.paso5[1]}>
      <Cerramos d={d} />
    </Escena>
    <Escena de={GUION.cierre[0]} dura={GUION.cierre[1]}>
      <Cierre />
    </Escena>
  </AbsoluteFill>
);
