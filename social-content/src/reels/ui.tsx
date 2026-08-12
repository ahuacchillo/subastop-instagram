import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { glassMarca, gradient, mono, sans, vy, vyGradient } from "../brand/vmc";

// ═════════════════════════════════════════════════════════════════════════════
// VMC Subastas reel framework — VOYAGER pieces at 260×411.
//
// Every VMC reel is built from the same parts: a brand background, chained
// scenes, and the product's real screens rebuilt in HTML. Rebuilt, not pasted
// in as images: that keeps the type crisp at any scale and lets amounts, dates
// and copy arrive through props.
//
// Sizing rule: authored in units of 260 width. A number here is the product
// Figma's number divided by ~1.6 (the system's modals are 320 and here they
// measure 200).
// ═════════════════════════════════════════════════════════════════════════════

// ── Time ─────────────────────────────────────────────────────────────────────

/** Fade in and out. 6 frames each side: you notice the cut, not the fade. */
const Fundido: React.FC<{ dura: number; children: React.ReactNode }> = ({
  dura,
  children,
}) => {
  const f = useCurrentFrame();
  const opacity = Math.min(
    interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(f, [dura - 6, dura], [1, 0], { extrapolateLeft: "clamp" }),
  );
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const Escena: React.FC<{
  de: number;
  dura: number;
  children: React.ReactNode;
}> = ({ de, dura, children }) => (
  <Sequence from={de} durationInFrames={dura}>
    <Fundido dura={dura}>{children}</Fundido>
  </Sequence>
);

/**
 * The standard entrance for any element: rises 14px and appears.
 *
 * Returned as a style rather than a component so delays can be chained inside
 * a scene without nesting wrappers.
 */
export const useEntrada = (retraso = 0): React.CSSProperties => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - retraso, fps, config: { damping: 200 } });
  return { opacity: s, transform: `translateY(${(1 - s) * 14}px)` };
};

/** A figure that counts up. Returns the string already comma-formatted. */
export const useConteo = (
  hasta: number,
  desde = 0,
  retraso = 0,
  dura = 20,
): string => {
  const f = useCurrentFrame();
  const v = interpolate(f, [retraso, retraso + dura], [desde, hasta], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.round(v).toLocaleString("en-US");
};

// ── Background ───────────────────────────────────────────────────────────────

/**
 * Brand background: the live header's gradient, with two breathing halos.
 *
 * The halos move on a slow sine against the absolute frame, so they never
 * restart per scene — that is what makes the reel read as one continuous take
 * even where the scenes cut.
 */
export const Fondo: React.FC = () => {
  const f = useCurrentFrame();
  const halo = (
    x: number,
    y: number,
    color: string,
    fase: number,
  ): React.CSSProperties => ({
    position: "absolute",
    left: x,
    top: y + Math.sin((f + fase) / 55) * 16,
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 68%)`,
    filter: "blur(6px)",
  });
  return (
    <AbsoluteFill style={{ background: vyGradient.header, overflow: "hidden" }}>
      <div style={halo(-110, -60, "rgba(0,204,204,0.28)", 0)} />
      <div style={halo(90, 240, "rgba(132,96,229,0.35)", 90)} />
    </AbsoluteFill>
  );
};

// ── Typography ───────────────────────────────────────────────────────────────

/**
 * A glass pill with a gradient border. This is the system's chip: it serves as
 * a step label, a brand stamp or a status, depending on what goes inside it.
 */
export const Chip: React.FC<{
  children: React.ReactNode;
  retraso?: number;
  punto?: boolean;
}> = ({ children, retraso = 0, punto = false }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        ...useEntrada(retraso),
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 11px",
        borderRadius: 999,
        fontFamily: sans,
        fontWeight: 700,
        fontSize: 8,
        letterSpacing: 1.4,
        color: "#FFFFFF",
        ...glassMarca,
      }}
    >
      <Borde radio={999} fondo={gradient.borde} ancho={1} />
      {punto ? (
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: vy.naranja,
            boxShadow: `0 0 6px ${vy.naranja}`,
            opacity: 0.55 + Math.sin(f / 6) * 0.45,
          }}
        />
      ) : null}
      {children}
    </div>
  );
};

/** Step label: "PASO 2 / 5". */
export const Paso: React.FC<{ n: number; de: number }> = ({ n, de }) => (
  <Chip>
    PASO {n}
    <span style={{ opacity: 0.5 }}>/ {de}</span>
  </Chip>
);

/**
 * Brand glass panel. Same gradient border as the carousel: white top-left,
 * orange, violet, white.
 */
export const Vidrio: React.FC<{
  children: React.ReactNode;
  radio?: number;
  estilo?: React.CSSProperties;
}> = ({ children, radio = 14, estilo }) => (
  <div
    style={{
      position: "relative",
      borderRadius: radio,
      ...glassMarca,
      ...estilo,
    }}
  >
    <Borde radio={radio} fondo={gradient.borde} />
    {children}
  </div>
);

/** Type in the brand gradient — the same one as the carousel title. */
export const TextoMarca: React.FC<{
  children: React.ReactNode;
  tam: number;
  peso?: number;
  espaciado?: number;
}> = ({ children, tam, peso = 800, espaciado = -0.5 }) => (
  <span
    style={{
      fontFamily: sans,
      fontWeight: peso,
      fontSize: tam,
      letterSpacing: espaciado,
      backgroundImage: gradient.tituloReel,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      filter: "drop-shadow(0px 2px 10px rgba(0,0,0,0.35))",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

export const Titular: React.FC<{
  children: React.ReactNode;
  retraso?: number;
  tam?: number;
}> = ({ children, retraso = 4, tam = 21 }) => (
  <div
    style={{
      ...useEntrada(retraso),
      fontFamily: sans,
      fontWeight: 800,
      fontSize: tam,
      lineHeight: 1.15,
      letterSpacing: -0.5,
      color: "#FFFFFF",
      textShadow: "0px 2px 10px rgba(0,0,0,0.35)",
    }}
  >
    {children}
  </div>
);

export const Bajada: React.FC<{
  children: React.ReactNode;
  retraso?: number;
}> = ({ children, retraso = 8 }) => (
  <div
    style={{
      ...useEntrada(retraso),
      fontFamily: sans,
      fontWeight: 500,
      fontSize: 10.5,
      lineHeight: 1.4,
      color: "rgba(255,255,255,0.78)",
    }}
  >
    {children}
  </div>
);

// ── VOYAGER pieces ───────────────────────────────────────────────────────────

/**
 * A 1.5px gradient border over a fill of its own.
 *
 * The same `xor` mask trick as the carousel: paint the gradient across the
 * whole box and punch out the inside. It is the only way to keep the border
 * from tinting the button's fill.
 */
const Borde: React.FC<{ radio: number | string; fondo: string; ancho?: number }> = ({
  radio,
  fondo,
  ancho = 1.5,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      borderRadius: radio,
      padding: ancho,
      background: fondo,
      WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      pointerEvents: "none",
    }}
  />
);

/** The product's white modal/card surface. */
export const Tarjeta: React.FC<{
  ancho?: number;
  children: React.ReactNode;
  estilo?: React.CSSProperties;
}> = ({ ancho = 200, children, estilo }) => (
  <div
    style={{
      width: ancho,
      borderRadius: 11,
      background: "#FFFFFF",
      boxShadow: "0px 10px 30px rgba(20,0,70,0.45)",
      overflow: "hidden",
      fontFamily: sans,
      color: vy.tinta,
      ...estilo,
    }}
  >
    {children}
  </div>
);

/**
 * The system button: gradient fill, gradient border, inner sheen and halo.
 *
 * `pulso` makes it beat — used on whichever button the reel is pointing at, so
 * the eye knows where the next action is going to happen.
 */
const TONOS = {
  violeta: {
    fondo: vyGradient.botonVioleta,
    borde: vyGradient.botonVioletaBorde,
    halo: "rgba(132,96,229,0.65)",
  },
  teal: {
    fondo: vyGradient.botonTeal,
    borde: vyGradient.botonTealBorde,
    halo: "rgba(0,204,204,0.55)",
  },
  naranja: {
    fondo: vyGradient.botonNaranja,
    borde: vyGradient.botonNaranjaBorde,
    halo: "rgba(237,137,54,0.65)",
  },
} as const;

export const Boton: React.FC<{
  children: React.ReactNode;
  tono?: keyof typeof TONOS;
  ancho?: number;
  alto?: number;
  pulso?: boolean;
  retraso?: number;
  tam?: number;
}> = ({
  children,
  tono = "violeta",
  ancho = 122,
  alto = 26,
  pulso = false,
  retraso = 0,
  tam = 11,
}) => {
  const f = useCurrentFrame();
  const t = TONOS[tono];
  const latido = pulso ? 1 + Math.sin(f / 7) * 0.022 : 1;
  const entrada = useEntrada(retraso);
  return (
    <div
      style={{
        ...entrada,
        transform: `${entrada.transform} scale(${latido})`,
        position: "relative",
        width: ancho,
        height: alto,
        borderRadius: 999,
        background: t.fondo,
        boxShadow: `0px 0px 14px ${t.halo}, 0px 3px 8px rgba(20,0,70,0.35)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: sans,
        fontWeight: 700,
        fontSize: tam,
        color: "#FFFFFF",
      }}
    >
      <Borde radio={999} ancho={2} fondo={t.borde} />
      {/* The spec's top sheen: white at 16%, dying by 55% of the height. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 55%)",
        }}
      />
      <span style={{ position: "relative" }}>{children}</span>
    </div>
  );
};

/** Secondary button: violet outline only. "Volver". */
export const BotonPlano: React.FC<{
  children: React.ReactNode;
  ancho?: number;
  retraso?: number;
}> = ({ children, ancho = 122, retraso = 0 }) => (
  <div
    style={{
      ...useEntrada(retraso),
      width: ancho,
      height: 26,
      borderRadius: 999,
      border: `1.2px solid ${vy.violeta}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: sans,
      fontWeight: 700,
      fontSize: 11,
      color: vy.tinta,
    }}
  >
    {children}
  </div>
);

/**
 * The SubasCoins symbol. In the app it always reads `>S< 25`, never "25 SC".
 */
export const Coin: React.FC<{ n: string; color?: string; tam?: number }> = ({
  n,
  color = vy.teal500,
  tam = 11,
}) => (
  <span style={{ fontFamily: sans, fontWeight: 700, fontSize: tam, color }}>
    &gt;S&lt; {n}
  </span>
);

/** The product's amount. Violet on the left, teal on the right. */
export const Monto: React.FC<{ valor: string; tam?: number }> = ({
  valor,
  tam = 21,
}) => (
  <div
    style={{
      fontFamily: mono,
      fontWeight: 700,
      fontSize: tam,
      letterSpacing: 0.5,
      backgroundImage: vyGradient.monto,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      whiteSpace: "nowrap",
    }}
  >
    US$ {valor}
  </div>
);

/** Amount field: gradient-bordered box, the figure grey until it is typed. */
export const InputMonto: React.FC<{ valor: string; vacio?: boolean }> = ({
  valor,
  vacio = false,
}) => (
  <div
    style={{
      position: "relative",
      width: 152,
      height: 38,
      borderRadius: 12,
      background: "#FFFFFF",
      boxShadow: "0px 2px 10px rgba(132,96,229,0.18)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    }}
  >
    <Borde radio={12} fondo={vyGradient.botonTealBorde} />
    <span
      style={{ fontFamily: sans, fontWeight: 800, fontSize: 17, color: vy.tinta }}
    >
      US$
    </span>
    <span
      style={{
        fontFamily: mono,
        fontWeight: 500,
        fontSize: 17,
        letterSpacing: 1,
        color: vacio ? vy.gris : vy.tinta,
      }}
    >
      {valor}
    </span>
  </div>
);

/** The modals' small-caps title: CONSIGNACIÓN, VENDEDOR OFRECE… */
export const TituloModal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontFamily: sans,
      fontWeight: 700,
      fontSize: 11.5,
      letterSpacing: 0.4,
      color: vy.tinta,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

export const TextoModal: React.FC<{
  children: React.ReactNode;
  tam?: number;
}> = ({ children, tam = 9 }) => (
  <div
    style={{
      fontFamily: sans,
      fontWeight: 500,
      fontSize: tam,
      lineHeight: 1.35,
      color: vy.tinta,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

/** The orange close X, top-right corner of the modal. */
export const CerrarX: React.FC = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    style={{ position: "absolute", top: 9, right: 9 }}
  >
    <defs>
      <linearGradient id="vy-x" x1="12" y1="0" x2="12" y2="24">
        <stop offset="0" stopColor={vy.naranja} />
        <stop offset="0.4" stopColor={vy.naranja600} />
        <stop offset="1" stopColor={vy.naranja900} />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" stroke="url(#vy-x)" strokeWidth="1.8" fill="none" />
    <path
      d="M7 7L17 17M17 7L7 17"
      stroke="url(#vy-x)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

/** The violet tab hanging over the modal: "Propuesta 1/5". */
export const Pestania: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      position: "relative",
      alignSelf: "center",
      padding: "3px 14px 4px",
      borderRadius: "0 0 12px 12px",
      background: vyGradient.botonVioleta,
      fontFamily: sans,
      fontWeight: 700,
      fontSize: 9,
      color: "#FFFFFF",
      marginBottom: -1,
      zIndex: 1,
    }}
  >
    {children}
  </div>
);
