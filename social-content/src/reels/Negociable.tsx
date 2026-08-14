import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { sans, vy } from "../brand/vmc";
import {
  Bajada,
  Chip,
  Coin,
  DS,
  Escena,
  Fondo,
  Latido,
  Paso,
  Tarjeta,
  TextoMarca,
  TextoModal,
  Titular,
  TituloModal,
  Vidrio,
  useConteo,
  useEntrada,
} from "./ui";
import {
  Galeria,
  Modal,
  Movil,
  PilaPropuestas,
  VistaPrevia,
} from "./pantallas";
import BidMessage from "@/concorde/components/BidMessage";
import Button from "@/concorde/components/Button";
import DetailCard from "@/concorde/components/DetailCard";

// ═════════════════════════════════════════════════════════════════════════════
// Reel: the Negociable format as the seller sees it — 270×480, 65.4s.
//
// Built to GUION-NEGOCIABLE.md, beat by beat: the frame ranges in `GUION` are
// the ones in that table, so the voiceover drops straight on top with no
// re-timing. Change a beat's length here and the doc has to change with it.
//
// Four movements:
//   1. The questions. Two pains asked straight at the seller, over someone
//      living them. No brand, no UI — the opening belongs to them, not to VMC.
//   2. The promise. One payment until it sells. That is the answer to both
//      questions, so it lands here and not buried as a later step.
//   3. How you publish. Form, photos, the payment.
//   4. How it sells. Showcase, offers, the team calling, the deal.
//
// The product's name lands in movement 4, not in the opening: "Oferta
// Negociable" means nothing to someone who has not been shown the mechanic
// yet.
//
// On-screen text is support, not subtitle. What repeats is what the seller
// actually objects to: the cost (>S< 25, once) and the commission (>S< 0).
// ═════════════════════════════════════════════════════════════════════════════

export type ReelNegociable = {
  placa: string;
  marca: string;
  modelo: string;
  anio: string;
  kilometraje: string;
  /** What the seller hopes to get. Comma-formatted, without the "US$". */
  expectativa: string;
  /** Path inside `public/` to the cover photo. */
  foto: string;
  /** The full-bleed car of the promise scene. */
  hero: string;
  /** `hero`, pre-blurred, as the reel's ambient background. See `Fondo` for how to bake it. */
  fondo: string;
  /** The four the seller picks for the listing. */
  fotos: string[];
  vendedor: string;
  /** SubasCoins it costs to activate the listing. */
  costo: string;
  /** The proposals that pile up, climbing towards the expectation. */
  propuestas: string[];
  /** The proposal that opens the modal. The last of `propuestas`. */
  oferta: string;
  dia: string;
  hora: string;
};

export const NEGOCIABLE: ReelNegociable = {
  placa: "BAW-302",
  marca: "Suzuki",
  modelo: "Baleno",
  anio: "2020",
  kilometraje: "45,000",
  expectativa: "12,000",
  foto: "reel/63008-suzuki-baleno-1.jpeg",
  hero: "reel/toyota-fortuner-1.png",
  fondo: "reel/toyota-fortuner-1-fondo.jpg",
  // Front, side, rear, interior — the four a listing actually sells with.
  // Detail crops (damage, door handles, the engine) are the ones the seller
  // leaves out, which is the point of the beat.
  fotos: [
    "reel/63008-suzuki-baleno-1.jpeg",
    "reel/63008-suzuki-baleno-5.jpeg",
    "reel/63008-suzuki-baleno-2.jpeg",
    "reel/63008-suzuki-baleno-11.jpeg",
  ],
  vendedor: "SubasCars",
  costo: "25",
  propuestas: ["9,500", "10,400", "10,900", "11,800"],
  oferta: "11,800",
  dia: "LUNES 04",
  hora: "11:11 pm",
};

/**
 * The beats of GUION-NEGOCIABLE.md: [first frame, length]. 30fps, 1963 = 65.4s.
 *
 * These are no longer the round numbers the script was written to: the
 * voiceover (`public/voz/negociable.mp3`) came back as one continuous take,
 * so the cuts sit on the pauses the voice actually leaves, measured off the
 * file. Re-record the voice and these have to be measured again.
 *
 * The short beat is deliberate: "¿Del regateo de siempre?" holds for 2.5s,
 * which is the rhythm of the line itself. Everything that has to be understood
 * — a screen, a figure, a mechanic — gets 4 seconds or more.
 */
const GUION = {
  chats: [0, 83],
  regateo: [83, 76],
  promesa: [159, 173],
  ficha: [332, 166],
  fotos: [498, 156],
  previa: [654, 162],
  pago: [816, 158],
  sinLetra: [974, 142],
  vitrina: [1116, 189],
  siguen: [1305, 180],
  contacta: [1485, 218],
  conecta: [1703, 139],
  cierre: [1842, 121],
} as const;

export const DURACION_NEGOCIABLE = GUION.cierre[0] + GUION.cierre[1];

/**
 * Three steps, not four: registering and loading the photos are one step for
 * the seller even though they are two screens, so they share the "PASO 1"
 * chip. Then the preview, then the payment.
 */
const PASOS = 3;

/** Step-scene frame: header on top, the product screen centred below. */
const EscenaPaso: React.FC<{
  paso?: number;
  chip?: string;
  titulo: React.ReactNode;
  bajada?: React.ReactNode;
  children: React.ReactNode;
}> = ({ paso, chip, titulo, bajada, children }) => (
  <AbsoluteFill
    style={{
      padding: "30px 20px 30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    }}
  >
    {paso ? <Paso n={paso} de={PASOS} /> : <Chip punto>{chip}</Chip>}
    <div style={{ height: 8 }} />
    <Titular>{titulo}</Titular>
    {bajada ? (
      <>
        <div style={{ height: 5 }} />
        <Bajada>{bajada}</Bajada>
      </>
    ) : null}
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

const Logo: React.FC<{ ancho?: number }> = ({ ancho = 118 }) => (
  <Img
    src={staticFile("brand/vmc-logo.svg")}
    style={{ width: ancho, height: (ancho * 67) / 180 }}
  />
);

// ── Movement 1: the questions ────────────────────────────────────────────────

/**
 * A chat bubble — the auction room's own.
 *
 * This used to be a copy of BidChat's shapes and gradients. Now it is the
 * component itself: `sent` is the seller answering (orange), `received` is
 * whoever is writing to them (dark violet). The reel adds the entrance and,
 * when there is one, the author line above the bubble — BidMessage has no
 * slot for it because in the room the author is already on screen.
 */
const Burbuja: React.FC<{
  children: React.ReactNode;
  retraso: number;
  mia?: boolean;
  autor?: string;
  /** Zoom of the DS component. The chat scene runs bigger than the opening. */
  e?: number;
}> = ({ children, retraso, mia = false, autor, e = 0.68 }) => (
  <div
    style={{
      ...useEntrada(retraso),
      alignSelf: mia ? "flex-end" : "flex-start",
      display: "flex",
      flexDirection: "column",
      alignItems: mia ? "flex-end" : "flex-start",
      gap: 2,
    }}
  >
    {autor ? (
      <div
        style={{
          fontFamily: sans,
          fontWeight: 700,
          fontSize: 7.5,
          letterSpacing: 0.6,
          color: vy.violeta100,
        }}
      >
        {autor}
      </div>
    ) : null}
    {/* 253 pre-zoom is the 172 the bubble takes on screen at e=0.68. */}
    <DS e={e} estilo={{ width: 253, textAlign: mia ? "right" : "left" }}>
      <BidMessage side={mia ? "sent" : "received"}>{children}</BidMessage>
    </DS>
  </div>
);

/**
 * A pain, asked straight at the seller.
 *
 * No brand, no UI, no car: the first ten seconds belong to whoever is living
 * this. The person is bottom-anchored and the question sits above them, so the
 * three beats cut against a fixed frame and only the face and the words change.
 */
const Pregunta: React.FC<{
  persona: string;
  titulo: React.ReactNode;
  children?: React.ReactNode;
}> = ({ persona, titulo, children }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#0D0B14" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(90% 60% at 50% 22%, rgba(95,62,216,0.30) 0%, rgba(13,11,20,0) 70%)",
        }}
      />
      <Img
        src={staticFile(persona)}
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          // 268 keeps the cutout under its own resolution at scale 4; at 322 the
          // render was upsampling her face and it showed.
          height: 268,
          width: "auto",
          transform: `translateX(-50%) scale(${1 + f * 0.00025})`,
          transformOrigin: "bottom center",
          filter: "saturate(0.72) brightness(0.86) contrast(1.06)",
        }}
      />
      {/* The floor the cutout stands on, so it is not pasted onto flat black. */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(13,11,20,0) 55%, rgba(13,11,20,0.85) 88%, #0D0B14 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          padding: "40px 24px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Titular tam={26} retraso={3}>
          {titulo}
        </Titular>
        {children ? (
          <div
            style={{
              marginTop: 14,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {children}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Chats: React.FC = () => (
  <Pregunta
    persona="personas/chats.png"
    titulo={<>¿Cansado de los chats de curiosos?</>}
  >
    <Burbuja retraso={26}>¿Sigue disponible?</Burbuja>
    <Burbuja retraso={44}>¿Cuál es tu último precio?</Burbuja>
    <Burbuja retraso={62}>¿Me pasas más fotos?</Burbuja>
  </Pregunta>
);

const Regateo: React.FC = () => (
  <Pregunta persona="personas/chats.png" titulo={<>¿Del regateo de siempre?</>}>
    <Burbuja retraso={16}>Te doy 8 mil y me lo llevo hoy.</Burbuja>
    <Burbuja retraso={38} mia>
      No hay forma.
    </Burbuja>
  </Pregunta>
);

// ── Movement 2: the promise ──────────────────────────────────────────────────

/**
 * The answer, straight after the questions.
 *
 * This is the whole turn: the questions cut to the brand and the promise lands
 * entire — one payment, published until it sells. It carries the logo because
 * it is the first time the reel says VMC at all.
 *
 * The figure stays out of it: 25 SubasCoins belongs to the payment step, where
 * the seller is actually looking at the modal that charges it.
 */
const Promesa: React.FC<{ d: ReelNegociable }> = ({ d }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Img
        src={staticFile(d.hero)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.80) contrast(1.06)",
          transform: `scale(${1.05 + f * 0.0003})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(157deg, rgba(95,62,216,0.50) 0%, rgba(52,0,145,0.72) 50%, rgba(20,0,70,0.94) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          padding: "40px 24px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <div style={{ ...useEntrada(4), alignSelf: "flex-start" }}>
          <Logo ancho={104} />
        </div>
        <Titular tam={27} retraso={14}>
          Publica tu seminuevo
          <br />
          en VMC.
        </Titular>
        <div style={useEntrada(26)}>
          <TextoMarca tam={21}>¡Hasta que lo vendas!</TextoMarca>
        </div>
        {/* ponytail: no third text block here. The price belongs to step 3,
            where the modal already shows it — saying it twice is what made the
            beat unreadable. */}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Movement 3: how you publish ──────────────────────────────────────────────

const Ficha: React.FC = () => (
  <EscenaPaso
    paso={1}
    titulo={<>Publicar toma minutos</>}
    bajada={
      <>Placa, marca, año y la expectativa de venta que tienes en mente.</>
    }
  >
    <Movil frame="frames/publicar.svg" de={250} a={900} dura={140} />
  </EscenaPaso>
);

/**
 * Choosing the photos — still part of step one for the seller.
 *
 * The grid beats the DropZone here: four thumbnails lighting up one by one say
 * "pick your best ones", a single empty drop target says "do some work".
 */
const Fotos: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <EscenaPaso
    paso={1}
    titulo={<>Escoge tus mejores fotos</>}
    bajada={
      <>
        Frente, perfil, interior. Mientras mejor lo muestres, más compradores se
        detienen.
      </>
    }
  >
    <Galeria fotos={d.fotos} />
  </EscenaPaso>
);

/**
 * The preview — step two.
 *
 * Built to the VOYAGER spec rather than scrolled: this is the screen the
 * seller is buying, and a window onto a 5000px page only ever shows a slice.
 */
const Previa: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <EscenaPaso
    paso={2}
    titulo={<>Así te ve el comprador</>}
    bajada={
      <>
        Revisa que tus datos y tus fotos estén perfectos: es lo primero que ve
        tu comprador.
      </>
    }
  >
    <VistaPrevia
      foto={d.foto}
      auto={`${d.marca} ${d.modelo} ${d.anio}`}
      vendedor={d.vendedor}
      fotos={d.fotos}
      dia={d.dia}
      hora={d.hora}
      dura={140}
    />
  </EscenaPaso>
);

const Pago: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <EscenaPaso
    paso={3}
    titulo={<>¡Pago único!</>}
    bajada={
      <>
        Pagas {d.costo} SubasCoins una sola vez y tu publicación queda activa
        hasta que lo vendas.
      </>
    }
  >
    <Modal icono="monedas">
      <TituloModal>CONFIRMA TU PUBLICACIÓN</TituloModal>
      <TextoModal>
        Se usarán {d.costo} SubasCoins de tu cuenta para activar esta oferta.
      </TextoModal>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "2px 4px",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontFamily: sans,
            fontWeight: 500,
            fontSize: 9.5,
            color: vy.gris,
          }}
        >
          Costo de activación
        </span>
        <Coin n={d.costo} />
      </div>
      <Latido retraso={28}>
        <DS e={0.55}>
          <Button variant="primary">Confirmar</Button>
        </DS>
      </Latido>
      <div style={useEntrada(34)}>
        <DS e={0.55}>
          <Button variant="outline">Cancelar</Button>
        </DS>
      </div>
    </Modal>
  </EscenaPaso>
);

/** One line of the receipt, and its zero. */
const FilaCero: React.FC<{
  etiqueta: string;
  retraso: number;
  ultima?: boolean;
}> = ({ etiqueta, retraso, ultima = false }) => (
  <div
    style={{
      ...useEntrada(retraso),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 4px 11px",
      borderBottom: ultima ? "none" : "1px solid rgba(132,96,229,0.18)",
      fontFamily: sans,
      fontWeight: 600,
      fontSize: 10,
      color: vy.tinta,
    }}
  >
    <span>{etiqueta}</span>
    <Coin n="0" tam={13} />
  </div>
);

/**
 * What VMC does not charge.
 *
 * The earlier version struck the three lines out. It read as a mistake rather
 * than as a promise, so this is the same message as a receipt: every line the
 * seller braces for, each with a zero next to it. Three zeros stacked argue
 * better than three lines crossed out.
 */
const SinLetraChica: React.FC = () => (
  <EscenaPaso
    paso={3}
    titulo={<>Aquí no hay letra chica</>}
    bajada={
      <>
        Sin comisiones, sin intermediarios. Vendas por lo que vendas, la venta
        es 100% tuya.
      </>
    }
  >
    <Tarjeta estilo={{ padding: "6px 14px 10px" }}>
      <FilaCero etiqueta="Comisión por venta" retraso={6} />
      <FilaCero etiqueta="Suscripción mensual" retraso={22} />
      <FilaCero etiqueta="Cargos ocultos" retraso={38} ultima />
    </Tarjeta>
  </EscenaPaso>
);

/**
 * One side of the turning screen.
 *
 * Plain divs, not `AbsoluteFill`: that one sets `overflow: hidden`, which the
 * spec treats as a grouping property and quietly forces `transform-style: flat`
 * — the 3D collapses and both faces show through each other.
 */
const Cara: React.FC<{ children: React.ReactNode; atras?: boolean }> = ({
  children,
  atras = false,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
      transform: atras ? "rotateY(180deg)" : "rotateY(0deg)",
    }}
  >
    {children}
  </div>
);

/**
 * Step 3, both halves of it.
 *
 * Paying and "no fine print" are the same step, so the reel stops cutting
 * between them and turns the screen over instead: the receipt of zeros is the
 * back of the card the seller just paid with. The PASO 3 chip is on both
 * faces, which is what makes the turn read as one screen rather than two.
 */
const PasoTres: React.FC<{ d: ReelNegociable }> = ({ d }) => {
  const f = useCurrentFrame();
  const giro = interpolate(
    f,
    [GUION.pago[1] - 11, GUION.pago[1] + 11],
    [0, 180],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );
  return (
    <div style={{ position: "absolute", inset: 0, perspective: 900 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transform: `rotateY(${giro}deg)`,
        }}
      >
        <Cara>
          <Pago d={d} />
        </Cara>
        <Cara atras>
          <SinLetraChica />
        </Cara>
      </div>
    </div>
  );
};

// ── Movement 4: how it sells ─────────────────────────────────────────────────

/**
 * Published — and the first time the reel names the product.
 *
 * "Oferta Negociable" only means something once the seller has been shown the
 * mechanic, which is why the chip lands here and not in the opening.
 *
 * Careful with the copy: "en vivo" is a different VMC offer format, not this
 * one. Here the offer is published and left open to proposals — saying it
 * "goes live" would blur two separate products together.
 *
 * The counters climb during the scene. It is the only honest way to show
 * "empiezan a llegar ofertas" without inventing a number: you see the movement,
 * not the figure.
 */
const Vitrina: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <EscenaPaso
    chip="OFERTA NEGOCIABLE"
    titulo={
      <>
        En VMC tu auto
        <br />
        se vende solo
      </>
    }
    bajada={
      <>
        Miles de compradores verificados lo ven. Tú no persigues a nadie: las
        ofertas llegan solas.
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

const Siguen: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <EscenaPaso
    chip="LAS OFERTAS NO PARAN"
    titulo={<>Nadie te apura</>}
    bajada={
      <>
        Una propuesta, otra, y otra más, hasta que llegue la que calce con lo
        que pediste.
      </>
    }
  >
    <PilaPropuestas expectativa={d.expectativa} propuestas={d.propuestas} />
  </EscenaPaso>
);

/**
 * The decision.
 *
 * A person from the VMC team writes to the seller when a buyer lands near the
 * expectation, and the seller answers. It is a human contact shown as a chat —
 * not an in-app screen, because there is no such screen. The earlier version
 * invented one, which would have sent the seller looking for a button that
 * does not exist.
 *
 * Same bubbles as the opening: the chats that used to be the problem are now
 * the one message worth reading.
 */
const Contacta: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <EscenaPaso
    chip="TE CONTACTAMOS"
    titulo={<>Tú decides</>}
    bajada={
      <>
        Cuando llega una oferta que calza con tu expectativa, VMC te escribe.
        Aceptas o contrapropones.
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
      <Burbuja retraso={4} autor="EQUIPO VMC" e={0.78}>
        ¡Buenas noticias! Acaba de aparecer un comprador por tu {d.marca}{" "}
        {d.modelo}.
      </Burbuja>
      <Burbuja retraso={30} e={0.78}>
        Ofrece <b>US$ {d.oferta}</b> — calza con la expectativa que pusiste.
      </Burbuja>
      <Burbuja retraso={58} mia e={0.78}>
        Sí, la acepto.
      </Burbuja>
      <Burbuja retraso={84} autor="EQUIPO VMC" e={0.78}>
        Listo, te conecto con él ahora mismo.
      </Burbuja>
    </Vidrio>
  </EscenaPaso>
);

/**
 * The deal.
 *
 * The woman handing over the keys is the same one who opened the reel drowning
 * in messages. Closing on her face is the payoff: the seller who was stuck is
 * the seller who sold.
 */
const Conecta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Img
        src={staticFile("personas/llaves.png")}
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          // Landscape now — the handover reads across the frame, so it is sized
          // by width and allowed to bleed a little past both edges.
          width: 430,
          height: "auto",
          transform: `translateX(-50%) translateY(44px) scale(${1 + f * 0.0002})`,
          transformOrigin: "bottom center",
          filter: "drop-shadow(0px 12px 30px rgba(20,0,70,0.55))",
        }}
      />
      {/*
        Big enough that the frame cuts them at the waist, which reads as a
        portrait crop rather than an accident — at the earlier size the cut
        landed mid-thigh and looked like a mistake. The top wash keeps the
        glass card legible over their heads.
      */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(35,0,104,0.85) 0%, rgba(45,0,120,0.35) 32%, rgba(45,0,120,0) 48%)",
        }}
      />
      <AbsoluteFill
        style={{
          padding: "30px 20px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Chip punto>TRATO CERRADO</Chip>
        <div style={{ height: 10 }} />
        <div style={useEntrada(6)}>
          <Vidrio radio={16} estilo={{ padding: "13px 14px 15px" }}>
            <Titular retraso={8}>¡Vendido!</Titular>
            <div style={{ height: 4 }} />
            <Bajada retraso={14}>
              VMC te conecta con tu comprador y el trato se cierra entre
              ustedes: pago, transferencia y llaves. Recibes el monto completo.
            </Bajada>
          </Vidrio>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * The close.
 *
 * Headline up top, the ask at the bottom where a thumb already is. The two
 * figures ride as one line under the button instead of inside a glass box —
 * the box only added a frame around nothing and pushed the logo into a void.
 *
 * The hero comes back between them, drifting the same way it did in the
 * promise: the reel opens the pitch on that car and closes on it. It also
 * takes the empty middle the headline and the button were leaving.
 */
const Cierre: React.FC<{ d: ReelNegociable }> = ({ d }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Img
        src={staticFile(d.hero)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.72) contrast(1.06)",
          transform: `scale(${1.05 + f * 0.0003})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(163deg, rgba(52,0,145,0.80) 0%, rgba(30,0,96,0.66) 42%, rgba(14,0,52,0.95) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          padding: "40px 24px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Chip>VENDE HOY</Chip>
        <div style={{ height: 20 }} />
        {/* ponytail: "tu auto se vende solo" is the showcase beat's headline. Here
        the close only has to ask. */}
        <Titular tam={29} retraso={4}>
          Empieza a recibir
          <br />
          ofertas hoy.
        </Titular>

        <div style={{ flex: 1 }} />

        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              ...useEntrada(18),
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: sans,
              fontWeight: 600,
              fontSize: 10,
              color: "rgba(255,255,255,0.82)",
            }}
          >
            <span>
              Publicar <Coin n={d.costo} color={vy.teal300} tam={10} />
            </span>
            <span style={{ opacity: 0.35 }}>|</span>
            <span>
              Comisión <Coin n="0" color={vy.teal300} tam={10} />
            </span>
          </div>
          <Latido retraso={26}>
            <DS e={0.72}>
              <Button variant="primary">¡Publica ahora!</Button>
            </DS>
          </Latido>
          <div style={{ ...useEntrada(34), marginTop: 8 }}>
            <Logo ancho={122} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Composition ──────────────────────────────────────────────────────────────

/**
 * BidMessage keeps a bid on one line, because a bid is a number. The reel's
 * bubbles are sentences, so in here they wrap.
 */
const CSS_REEL = `.pbidmsg .pbidmsg__text { white-space: normal; }`;

export const ReelNegociableVideo: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <AbsoluteFill>
    <style dangerouslySetInnerHTML={{ __html: CSS_REEL }} />
    <Audio src={staticFile("voz/negociable.mp3")} />
    <Fondo fondo={d.fondo} />
    <Escena de={GUION.chats[0]} dura={GUION.chats[1]}>
      <Chats />
    </Escena>
    <Escena de={GUION.regateo[0]} dura={GUION.regateo[1]}>
      <Regateo />
    </Escena>
    <Escena de={GUION.promesa[0]} dura={GUION.promesa[1]}>
      <Promesa d={d} />
    </Escena>
    <Escena de={GUION.ficha[0]} dura={GUION.ficha[1]}>
      <Ficha />
    </Escena>
    <Escena de={GUION.fotos[0]} dura={GUION.fotos[1]}>
      <Fotos d={d} />
    </Escena>
    <Escena de={GUION.previa[0]} dura={GUION.previa[1]}>
      <Previa d={d} />
    </Escena>
    <Escena de={GUION.pago[0]} dura={GUION.pago[1] + GUION.sinLetra[1]}>
      <PasoTres d={d} />
    </Escena>
    <Escena de={GUION.vitrina[0]} dura={GUION.vitrina[1]}>
      <Vitrina d={d} />
    </Escena>
    <Escena de={GUION.siguen[0]} dura={GUION.siguen[1]}>
      <Siguen d={d} />
    </Escena>
    <Escena de={GUION.contacta[0]} dura={GUION.contacta[1]}>
      <Contacta d={d} />
    </Escena>
    <Escena de={GUION.conecta[0]} dura={GUION.conecta[1]}>
      <Conecta />
    </Escena>
    <Escena de={GUION.cierre[0]} dura={GUION.cierre[1]}>
      <Cierre d={d} />
    </Escena>
  </AbsoluteFill>
);
