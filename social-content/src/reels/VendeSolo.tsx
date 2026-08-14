import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
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
  Titular,
  Vidrio,
  useEntrada,
} from "./ui";
import { PilaPropuestas } from "./pantallas";
import { Logo, Toma } from "./Vender";
import BidMessage from "@/concorde/components/BidMessage";
import Button from "@/concorde/components/Button";
import OfferCard from "@/concorde/components/OfferCard";

// ═════════════════════════════════════════════════════════════════════════════
// Reel: your car sells itself — 270×480, 53s.
//
// Second pass at the same message as `Vender.tsx`, and it replaces it rather
// than complements it. The difference is where the weight sits: `Vender` sold
// the *method* (five numbered steps, mostly UI); this one sells the *feeling* —
// she publishes and then does nothing, and the reel spends its footage on her
// not working while the platform does.
//
// Four acts:
//   1. Hook and relief. She is fine; the pains get crossed out, not shown long.
//   2. Price and rules. Her number, and the whole economics in one card:
//      25 SubasCoins once, 0% commission, no subscription.
//   3. Exposure and delegated negotiation. Offers arrive; VMC works them.
//   4. Alert and handoff. Her price lands, she says yes, we connect the two.
//
// Everything the seller would actually see is a Concorde component — the
// listing (`OfferCard`), the offers (`BidProposal`, through `PilaPropuestas`),
// the message from the team (`BidMessage`), the CTA (`Button`). The reel never
// draws its own version of a product screen; the only pieces authored here are
// the ones the product has no component for.
// ═════════════════════════════════════════════════════════════════════════════

export type ReelVendeSolo = {
  marca: string;
  modelo: string;
  anio: string;
  kilometraje: string;
  /** What she wants to receive. Comma-formatted, without the "US$". */
  meta: string;
  /** One-time price of the listing, in SubasCoins. */
  coins: string;
  /** Path inside `public/` to the cover photo of the car she is pricing. */
  foto: string;
  /** Path inside `public/` to the pre-blurred ambient background. See `Fondo`. */
  fondo: string;
  /** Offers climbing toward `meta` without reaching it — that gap is the reel. */
  propuestas: string[];
};

export const VENDESOLO: ReelVendeSolo = {
  marca: "Suzuki",
  modelo: "Baleno",
  anio: "2020",
  kilometraje: "45,000",
  meta: "12,000",
  coins: "25",
  /*
   * A frame of `videos/auto.mp4`, not a listing photo, and that is deliberate:
   * the reel shows the car twice — as a photo in the card and as footage in
   * `Exposicion` — and a real lot photo put a white Baleno in one beat and a
   * silver hatchback in the other. One car, or the viewer is looking at two
   * sales. Rebake either file with:
   *
   *   ffmpeg -ss 0.6 -i public/videos/auto.mp4 -frames:v 1 \
   *          -vf "crop=720:460:0:330" -q:v 3 public/reel/vendesolo-auto.jpg
   *   convert public/reel/vendesolo-auto.jpg -resize 320x -blur 0x22 \
   *           -modulate 55,58 -quality 82 public/reel/vendesolo-auto-fondo.jpg
   */
  foto: "reel/vendesolo-auto.jpg",
  fondo: "reel/vendesolo-auto-fondo.jpg",
  propuestas: ["9,500", "10,400", "11,300"],
};

/**
 * The beats: [first frame, length]. 30fps, 1590 = 53.00s.
 *
 * Measured, not chosen. `public/voz/vendesolo.mp3` came back as one continuous
 * 52.6s take, so the reel was re-timed to the voice rather than the other way
 * round. Every cut sits in the gap between two lines, biased ~0.2s early so the
 * incoming scene is already up when the next line starts.
 *
 * The take, with the gaps the cuts sit in:
 *
 *   gancho       0.00– 3.68  Publica en VMC, y observa cómo tu auto se vende solo.
 *   pains        4.39– 9.64  Sin llamadas de curiosos. Sin regateos. Sin perder
 *                            el tiempo agendando citas con desconocidos.
 *   expectativa 10.35–12.90  Tú solo defines cuánto quieres recibir por tu vehículo.
 *   reglas      13.45–22.39  Y con un pago único de 25 SubasCoins, tu publicación
 *                            queda activa hasta que se venda. Sin comisiones, sin
 *                            suscripciones, sin cobros ocultos.
 *   exposicion  23.07–28.67  Tu auto se expone ante miles de compradores
 *                            verificados, que empiezan a enviar sus ofertas.
 *   negociacion 29.57–35.01  De ahí en adelante, la negociación la tomamos
 *                            nosotros: vamos por el precio que buscas, o por la
 *                            mejor propuesta posible.
 *   alerta      35.87–39.67  Y en cuanto una oferta alcanza tu expectativa, te
 *                            avisamos al instante.
 *   vinculacion 40.47–45.92  Cuando das el sí, te conectamos directo con el
 *                            comprador para que coordinen el pago y la entrega.
 *   cierre      46.56–52.61  Así de simple: VMC hace el trabajo pesado, y tú te
 *                            quedas con el 100% de tu dinero.
 *
 * The gaps come from ffmpeg's `silencedetect`, not from a transcript — word
 * timestamps disagree with the waveform badly enough to drop cuts on top of
 * speech. Re-derive with:
 *
 *   ffmpeg -i public/voz/vendesolo.mp3 -af silencedetect=noise=-35dB:d=0.15 -f null -
 *
 * This take is hotter than `vender.mp3` (mean -18.8 dB, peak -0.9) and its gaps
 * do not floor as low, so the threshold is -35 dB here and -30 there. At -45 the
 * meter finds nothing at all.
 *
 * Not every gap it reports is a cut: five of them are the commas inside a line.
 * The block boundaries are the ones above, and they are mirrored in
 * VOZ-VENDESOLO.md. `pains` is one spoken block cut across two shots.
 */
const GUION = {
  gancho: [0, 119],
  painsA: [119, 89],
  painsB: [208, 89],
  expectativa: [297, 96],
  reglas: [393, 287],
  exposicion: [680, 190],
  negociacion: [870, 189],
  alerta: [1059, 140],
  // Two spoken blocks, one scene: `vinculacion` (40.47–45.92) and the close
  // (46.56–52.61) are held as a single frame that builds. See `Cierre`.
  cierre: [1199, 391],
} as const;

export const DURACION_VENDESOLO = GUION.cierre[0] + GUION.cierre[1];

// ── Act 1: the hook and the relief ───────────────────────────────────────────

/**
 * Opens on her doing nothing, which is the promise stated as an image before it
 * is stated as a sentence. No logo yet: the brand shows up in act 2, once it has
 * something to offer.
 *
 * `desde`/`hasta` are seconds *in the source file*, not reel frames — that is
 * what makes them checkable against ffprobe. The four new clips are 10s at 24
 * fps. Three of them (`sofa`, `cocina`, `espera`) came back clean and went into
 * `public/videos/` with a straight stream copy and `-an` to drop room tone; only
 * `auto.mp4` carried the generator's sparkle and needed the usual patch:
 *
 *   ffmpeg -i <original> -vf "delogo=x=560:y=1125:w=90:h=90" \
 *          -c:v libx264 -crf 18 -an public/videos/auto.mp4
 */
const Gancho: React.FC = () => (
  <Toma src="videos/sofa.mp4" desde={0.2} hasta={4.3} abajo>
    {/* Broken by hand: at this size the frame fits ~22 characters a line, and
        letting it wrap on its own orphans "observa" onto a line of its own. */}
    <Titular tam={21} retraso={6}>
      Publica en VMC
      <br />
      y observa cómo
      <br />
      tu auto se vende solo.
    </Titular>
  </Toma>
);

/**
 * A pain, struck through as it is named.
 *
 * The line draws left to right over ~0.4s, right after the text lands. Crossing
 * out is doing the argument's work here: the viewer never has to be told these
 * things go away, they watch them go.
 */
const Tachado: React.FC<{ retraso: number; children: React.ReactNode }> = ({
  retraso,
  children,
}) => {
  const f = useCurrentFrame();
  const ancho = interpolate(f, [retraso + 7, retraso + 19], [0, 104], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        ...useEntrada(retraso),
        position: "relative",
        display: "inline-block",
      }}
    >
      <span
        style={{
          fontFamily: sans,
          fontWeight: 800,
          fontSize: 23,
          letterSpacing: -0.5,
          color: "#FFFFFF",
          textShadow: "0px 2px 10px rgba(0,0,0,0.45)",
        }}
      >
        {children}
      </span>
      <div
        style={{
          position: "absolute",
          left: -2,
          top: "54%",
          height: 2.5,
          width: `${ancho}%`,
          borderRadius: 2,
          background: vy.naranja,
          boxShadow: `0 0 8px ${vy.naranja}`,
        }}
      />
    </div>
  );
};

/**
 * The pains: one spoken line, two shots.
 *
 * The line names three things — calls, haggling, appointments — and a single
 * static shot under all three makes the last one arrive on a picture that has
 * been on screen for six seconds. Cutting at the halfway point buys the beat its
 * own rhythm: the phone she will not answer, then the wait that goes nowhere.
 *
 * Both run in the cold grade, the reel's only unhappy beat. It is applied here,
 * not baked into the clips, so the same footage stays usable warm.
 */
const PainsA: React.FC = () => (
  <Toma src="videos/cocina.mp4" desde={1.9} hasta={5.0} frio>
    <Tachado retraso={4}>Sin llamadas</Tachado>
    <Tachado retraso={34}>Sin regateos</Tachado>
  </Toma>
);

const PainsB: React.FC = () => (
  <Toma src="videos/espera.mp4" desde={0.3} hasta={3.4} frio>
    <Tachado retraso={2}>Sin citas con</Tachado>
    <Tachado retraso={24}>desconocidos</Tachado>
  </Toma>
);

// ── Act 2: the price and the rules ───────────────────────────────────────────

/** Scene frame for the UI beats: copy on top, the card centred below. */
const EscenaUI: React.FC<{
  titulo: React.ReactNode;
  bajada: React.ReactNode;
  children: React.ReactNode;
}> = ({ titulo, bajada, children }) => (
  <AbsoluteFill
    style={{
      padding: "30px 20px 30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    }}
  >
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
 * Not `useConteo`: a total spinning up from zero reads as a counter measuring
 * something, and this is a person deciding. Characters landing one at a time is
 * what makes the number hers. The beat is only 3.2s, so it starts early and is
 * done by frame 32.
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
 * The number is hers, and everything after this beat is about respecting it.
 *
 * The card carries the asset and the figure together — this thing, this much —
 * because an amount with nothing attached is just an amount, and the point is
 * that it is the price *of her car*.
 */
const Meta: React.FC<{ d: ReelVendeSolo }> = ({ d }) => {
  const tecleado = useTecleo(d.meta, 8);
  return (
    <EscenaUI
      titulo={<>Tú decides cuánto recibir</>}
      bajada={<>Pones el número que quieres por tu vehículo. Ese es el objetivo.</>}
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
          QUIERO RECIBIR
        </div>
        {/* `vacio` greys the figure until the first character lands, so the empty
          field reads as waiting for her rather than as a render that failed. */}
        <InputMonto
          valor={tecleado || "0"}
          vacio={tecleado.length < d.meta.length}
        />
      </Vidrio>
    </EscenaUI>
  );
};

/**
 * The product's own icons, not glyphs.
 *
 * Sized against the type they sit next to, not against their own source files:
 * the coin matches the height of the figure beside it and the tick matches the
 * line it marks, because an icon smaller than its label reads as a bullet point
 * rather than as part of the sentence. That costs a ~1.5× upscale at
 * `--scale=4` (84 px source drawn at 128, 36 at 56), which on flat two-colour
 * artwork is invisible and on a photo would not be. If they ever look soft,
 * re-export the PNGs bigger rather than shrinking them back down here.
 *
 * `ui.tsx` still exports a text `Coin` (`>S< 25`) and the sibling reels still
 * use it; this beat wants the real token, so it is swapped here rather than in
 * the shared component.
 */
const Icono: React.FC<{ src: string; tam: number }> = ({ src, tam }) => (
  <Img
    src={staticFile(src)}
    style={{ width: tam, height: tam, objectFit: "contain" }}
  />
);

/** A rule, with the tick that says it is in her favour. */
const Regla: React.FC<{ retraso: number; children: React.ReactNode }> = ({
  retraso,
  children,
}) => (
  <div
    style={{
      ...useEntrada(retraso),
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontFamily: sans,
      fontWeight: 600,
      fontSize: 10,
      color: "rgba(255,255,255,0.82)",
    }}
  >
    <Icono src="brand/check.png" tam={15} />
    {children}
  </div>
);

/**
 * The economics, whole, in one card.
 *
 * This is the beat that decides whether she trusts the offer, so nothing here is
 * implied: the price is a figure, the duration is a sentence, and the three
 * things that are *not* charged are named out loud. A viewer who has been burned
 * by a marketplace is looking for the catch — the card's job is to leave no room
 * for one.
 *
 * It is also the longest beat in the reel at 9.6s, which is a long time to hold
 * a card that has finished animating. So the card is built in the order the
 * voice builds it: the coin lands on "pago único de 25 SubasCoins" (frame ~10),
 * the duration on "queda activa hasta que se venda" (~100), and the three rules
 * arrive one per item of "sin comisiones, sin suscripciones, sin cobros
 * ocultos" (~180 on). Nothing on screen is ahead of the sentence.
 */
const Reglas: React.FC<{ d: ReelVendeSolo }> = ({ d }) => (
  <EscenaUI
    titulo={<>Un solo pago. Nada más.</>}
    bajada={<>Publicas una vez y tu aviso queda activo hasta que se venda.</>}
  >
    <Vidrio
      radio={18}
      estilo={{
        width: 216,
        padding: "16px 15px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Chip retraso={2}>PAGO ÚNICO</Chip>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <Icono src="brand/moneda.png" tam={34} />
        <span
          style={{
            fontFamily: sans,
            fontWeight: 800,
            fontSize: 30,
            letterSpacing: -0.5,
            color: vy.teal500,
          }}
        >
          {d.coins}
        </span>
      </div>
      <div
        style={{
          ...useEntrada(100),
          fontFamily: sans,
          fontWeight: 700,
          fontSize: 10,
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        Activo hasta que se venda
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
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 6,
        }}
      >
        <Regla retraso={178}>0% de comisión</Regla>
        <Regla retraso={196}>Sin suscripciones</Regla>
        <Regla retraso={214}>Sin cobros ocultos</Regla>
      </div>
    </Vidrio>
  </EscenaUI>
);

// ── Act 3: exposure and delegated negotiation ────────────────────────────────

/**
 * An offer arriving: it floats up beside the listing and fades out.
 *
 * Three of them overlapping is what "miles de compradores" looks like without
 * committing to a number the platform would have to defend. They start at frame
 * 96, which is where the voice reaches "que empiezan a enviar sus ofertas" —
 * before that the beat is still about exposure, not about offers.
 */
const Oferta: React.FC<{ monto: string; retraso: number; i: number }> = ({
  monto,
  retraso,
  i,
}) => {
  const f = useCurrentFrame();
  const t = f - retraso;
  const rango = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  return (
    <div
      style={{
        position: "absolute",
        // Each pill gets its own lane. Stacking them at one origin and relying
        // on the delay to separate them puts two of them 20px apart mid-scene,
        // which reads as one pill glitching rather than as two offers.
        left: 14 + i * 24,
        bottom: 58 + i * 32,
        transform: `translateY(${interpolate(t, [0, 46], [8, -26], rango)}px)`,
        opacity: interpolate(t, [0, 7, 34, 46], [0, 1, 1, 0], rango),
      }}
    >
      <Vidrio
        radio={999}
        estilo={{
          padding: "5px 11px",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: vy.teal500,
            boxShadow: `0 0 6px ${vy.teal500}`,
          }}
        />
        <span
          style={{
            fontFamily: sans,
            fontWeight: 700,
            fontSize: 8.5,
            color: "#FFFFFF",
          }}
        >
          Nueva oferta · US$ {monto}
        </span>
      </Vidrio>
    </div>
  );
};

/**
 * Out to market — the car, and the listing the buyers are actually looking at.
 *
 * The footage carries the beat and Concorde's `OfferCard` sits in the corner at
 * the size it really is: the tile a buyer scrolls past. On its own the walkaround
 * would only say the car is nice; the tile is what says it is *listed*, which is
 * the claim this beat is making. It is the product's own component, so the day
 * the marketplace tile changes, this shot changes with it.
 *
 * `interactive={false}` because a component that reacts to a hover nobody is
 * performing spends the whole beat looking like it is waiting for a click.
 */
const Exposicion: React.FC<{ d: ReelVendeSolo }> = ({ d }) => (
  <Toma src="videos/auto.mp4" desde={3.4} hasta={9.7}>
    <Titular tam={21} retraso={4}>
      Tu auto se expone
      <br />
      ante miles de compradores.
    </Titular>
    <div
      style={{
        ...useEntrada(20),
        position: "absolute",
        right: 18,
        bottom: 34,
      }}
    >
      <DS e={0.64}>
        <OfferCard
          variant="negotiable"
          size="short"
          name={`${d.marca} ${d.modelo}`}
          year={d.anio}
          imageSrc={staticFile(d.foto)}
          imageAlt={`${d.marca} ${d.modelo} ${d.anio}`}
          interactive={false}
          elevated
        />
      </DS>
    </div>
    {d.propuestas.map((monto, i) => (
      <Oferta key={monto} monto={monto} retraso={96 + i * 24} i={i} />
    ))}
  </Toma>
);

/**
 * A message from the VMC team. One direction only.
 *
 * The sibling reel uses these bubbles both ways, because there the seller has to
 * accept or counter. Here she already gave her number, so VMC reports and does
 * not ask — the moment a bubble came back from her side, the reel would be
 * saying she is still working the deal.
 */
const Burbuja: React.FC<{ children: React.ReactNode; retraso: number }> = ({
  children,
  retraso,
}) => (
  <div
    style={{
      ...useEntrada(retraso),
      alignSelf: "stretch",
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
    <DS e={0.72} estilo={{ width: 250 }}>
      <BidMessage side="received">{children}</BidMessage>
    </DS>
  </div>
);

/**
 * The proposals climb toward her expectation without reaching it. That gap is
 * the whole reason the platform exists in this story: if buyers arrived at her
 * number on their own, there would be nothing to delegate.
 *
 * The bubble lands underneath at frame 100, on "la negociación la tomamos
 * nosotros" — the offers arrive first, then the team steps in. Reversing the two
 * would make VMC answer a phone that has not rung.
 */
const Negociacion: React.FC<{ d: ReelVendeSolo }> = ({ d }) => (
  <EscenaUI
    titulo={<>Nosotros negociamos por ti</>}
    bajada={
      <>
        Trabajamos cada propuesta hasta llegar a tu precio o a la mejor oferta
        posible.
      </>
    }
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <PilaPropuestas expectativa={d.meta} propuestas={d.propuestas} />
      <Burbuja retraso={100}>
        Seguimos negociando. No cerramos por debajo de US$ {d.meta}.
      </Burbuja>
    </div>
  </EscenaUI>
);

// ── Act 4: the alert and the handoff ─────────────────────────────────────────

/**
 * The climax, and she did nothing to earn it — which is the point.
 *
 * The card sits over her reaction rather than replacing it: the notification is
 * the event, her face is the payoff, and cutting to a full-screen UI here would
 * trade the second for the first.
 *
 * Recycled footage: `alivio.mp4` is the couch shot `Vender` closes on, and the
 * window used here (4.6–9.3s) is the half that reel does not use for its hinge.
 */
const Alerta: React.FC<{ d: ReelVendeSolo }> = ({ d }) => (
  <Toma src="videos/alivio.mp4" desde={4.6} hasta={9.3} abajo>
    <Latido retraso={6}>
      <Vidrio
        radio={14}
        estilo={{
          width: 222,
          padding: "11px 13px 13px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Chip punto retraso={10}>
          TU PRECIO SE ALCANZÓ
        </Chip>
        <Monto valor={d.meta} tam={24} />
        <div
          style={{
            ...useEntrada(24),
            fontFamily: sans,
            fontWeight: 600,
            fontSize: 9.5,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Te avisamos al instante. Tú solo dices que sí.
        </div>
      </Vidrio>
    </Latido>
  </Toma>
);

// ── The close ────────────────────────────────────────────────────────────────

/**
 * The handoff and the close, in one frame.
 *
 * They used to be two scenes and there was nothing to cut between: neither one
 * has footage, both sit on the same background, and the cut only announced that
 * a new card was starting. Held as a single 13s frame, the beat builds instead
 * of restarting — the sentence about the buyer is already on screen when the
 * panel resolves under it, and the reel lands rather than changing slide.
 *
 * The panel occupies its space from frame 0 at opacity 0, so nothing reflows
 * when it arrives; `useEntrada` only touches opacity and transform. That is why
 * the top block sits high with room under it during the first six seconds — it
 * is holding the seat, not floating.
 *
 * The delays are the two spoken lines. The type answers "cuando das el sí, te
 * conectamos…" from frame 2; the logo comes in at 186, where the take reaches
 * "Así de simple". Nothing on screen is ahead of the voice.
 *
 * The last line — "VMC hace el trabajo pesado, y tú te quedas con el 100% de tu
 * dinero" — is spoken and deliberately not written. Printing a sentence the
 * voice is already saying makes the viewer read it and hear it at once, which is
 * slower than either alone, and it was the only thing forcing the endcard into a
 * glass panel to hold it together. Without it the close is a logo and a button:
 * two objects that need no container, over the background the reel has carried
 * from the first frame.
 */
const Cierre: React.FC = () => (
  <AbsoluteFill
    style={{
      padding: "34px 22px 30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
    }}
  >
    <div
      style={{
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
      }}
    >
      <Chip retraso={2}>CONEXIÓN DIRECTA</Chip>
      {/* 23, not 26: at 26 the second line is one character too wide for the
          frame and wraps, leaving "con tu" alone on a line of its own. */}
      <Titular tam={23} retraso={8}>
        Te conectamos
        <br />
        con tu comprador.
      </Titular>
      <Bajada retraso={20}>
        Coordinan el pago y la entrega
        <br />
        directamente entre ustedes.
      </Bajada>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div style={useEntrada(186)}>
        <Logo ancho={126} />
      </div>
      <Latido retraso={204}>
        <DS e={0.76}>
          <Button variant="primary">Quiero vender</Button>
        </DS>
      </Latido>
    </div>
  </AbsoluteFill>
);

// ── Composition ──────────────────────────────────────────────────────────────

/**
 * BidMessage keeps a bid on one line, because a bid is a number. The reel's
 * bubble is a sentence, so in here it wraps.
 */
const CSS_REEL = `.pbidmsg .pbidmsg__text { white-space: normal; }`;

export const ReelVendeSoloVideo: React.FC<{ d: ReelVendeSolo }> = ({ d }) => (
  <AbsoluteFill>
    <style dangerouslySetInnerHTML={{ __html: CSS_REEL }} />
    {/* One continuous take. `GUION` is measured against it — see the table there. */}
    <Audio src={staticFile("voz/vendesolo.mp3")} />
    <Fondo fondo={d.fondo} />
    <Escena de={GUION.gancho[0]} dura={GUION.gancho[1]}>
      <Gancho />
    </Escena>
    <Escena de={GUION.painsA[0]} dura={GUION.painsA[1]}>
      <PainsA />
    </Escena>
    <Escena de={GUION.painsB[0]} dura={GUION.painsB[1]}>
      <PainsB />
    </Escena>
    <Escena de={GUION.expectativa[0]} dura={GUION.expectativa[1]}>
      <Meta d={d} />
    </Escena>
    <Escena de={GUION.reglas[0]} dura={GUION.reglas[1]}>
      <Reglas d={d} />
    </Escena>
    <Escena de={GUION.exposicion[0]} dura={GUION.exposicion[1]}>
      <Exposicion d={d} />
    </Escena>
    <Escena de={GUION.negociacion[0]} dura={GUION.negociacion[1]}>
      <Negociacion d={d} />
    </Escena>
    <Escena de={GUION.alerta[0]} dura={GUION.alerta[1]}>
      <Alerta d={d} />
    </Escena>
    <Escena de={GUION.cierre[0]} dura={GUION.cierre[1]}>
      <Cierre />
    </Escena>
  </AbsoluteFill>
);
