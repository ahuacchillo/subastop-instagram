// ─────────────────────────────────────────────────────────────────────────────
// VMC Subastas brand kit — VOYAGER Design System.
//
// A literal transcription of the pixel-perfect spec for frame 51 (node
// 7340:30564). Every number here came out of Figma. When Figma changes, this
// changes: components carry no constants of their own.
//
// The reel's half of the kit. The carousel's lives in
// `carrusel/remotion/src/brand/vmc.ts` and holds the tokens the carousel needs.
// A few definitions are in both files by necessity — `sans`, `gradient.borde`,
// `shadow.glassInset`. Change one of those and change the other in the same
// commit, or the two products drift apart.
// ─────────────────────────────────────────────────────────────────────────────

import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";

export const { fontFamily: sans } = loadJakarta("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

/** Product amounts are monospaced so "US$ 9,000" does not jitter as it changes. */
export const { fontFamily: mono } = loadRobotoMono("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});

export const shadow = {
  /** The glass's inner light edge. */
  glassInset: "inset 0px 1px 6px rgba(255,255,255,0.45)",
} as const;

export const gradient = {
  /**
   * The border on glass surfaces. The spec calls it VYStrokes1, "white 1.5px",
   * but the exported SVGs (the arrows) carry this gradient and that is what the
   * render shows: white top-left, orange, violet, white.
   */
  borde:
    "linear-gradient(135deg, #FFFFFF 0%, #F4AC59 22%, #8460E5 74.5%, #FFFFFF 100%)",
  /**
   * The make title's gradient, retuned for the reel.
   *
   * The original — `gradient.titulo`, in the carousel's kit — lives over the
   * car photo: its #8460E5 violet stretch reads
   * because there is dark bodywork underneath. Over the reel's violet
   * background that stretch disappears. So the violet is lifted to #AE8EFF and
   * the orange to #FF9639, and the axis is straightened to 100° so every line
   * travels the whole gradient.
   */
  tituloReel:
    "linear-gradient(100deg, #FFFFFF 0%, #FF9639 28%, #AE8EFF 72%, #FFFFFF 100%)",
} as const;

/**
 * Brand glass — the reel's.
 *
 * In the carousel (`glassDenso`, in the carousel's kit) the glass sits over the
 * car photo and its tail is neutral
 * grey, because it has to read on top of any colour. In the reel the
 * background is always VMC violet, so the tail is tinted indigo and the fill
 * picks up a touch of light violet. The system's recipe, in our colours.
 */
export const glassMarca = {
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  background: [
    "linear-gradient(155deg, rgba(255,255,255,0.30) 0%, rgba(174,142,255,0.10) 45%, rgba(46,15,112,0.42) 100%)",
    "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)",
  ].join(", "),
  boxShadow: `0px 10px 30px rgba(20,0,70,0.45), ${shadow.glassInset}`,
} as const;

// ═════════════════════════════════════════════════════════════════════════════
// VOYAGER — the app's palette and gradients (the product SVGs)
//
// The carousel's half of the system lives over the car photo: glass, whites,
// shadows. The reel lives inside the app: violet and teal solids, buttons with
// gradient borders. Two families of one system, and they never mix: `gradient`
// is the photo world, `vy` is the UI one.
//
// Every value came out of the SVGs exported from Figma. The CSS angles are the
// conversion of each linearGradient's (x1,y1)→(x2,y2) vector:
// θ = atan2(dx,-dy).
// ═════════════════════════════════════════════════════════════════════════════

export const vy = {
  /** The live header's background, light through to near-black. */
  violeta600: "#5F3ED8",
  indigo700: "#340091",
  indigo900: "#140046",
  /** Action violet — buttons, icons, chips. */
  violeta: "#8460E5",
  violeta300: "#AE8EFF",
  violeta100: "#CFBAFF",
  /** All of the app's type on white. Never black. */
  tinta: "#3B1782",
  teal: "#00CCCC",
  teal300: "#4DDCDC",
  teal500: "#00AEB1",
  teal700: "#008688",
  tealClaro: "#00DAE0",
  naranja: "#FF9639",
  naranja600: "#EF852E",
  naranja900: "#BE3D00",
  /** Input placeholder. */
  gris: "#D1D5DC",
} as const;

export const vyGradient = {
  /** The live car header — also the background of the whole reel. */
  header: "linear-gradient(157deg, #5F3ED8 0%, #340091 50%, #140046 100%)",
  /** The Subastin banner under the header. */
  banner: "linear-gradient(90deg, #00DAE0 0%, #008688 100%)",
  /** The "Procesando" waiting screen. */
  procesando: "linear-gradient(90deg, #00DAE0 0%, #008688 100%)",
  /** Teal button — "Negocia ahora", "Ingresa a la sala". */
  botonTeal: "linear-gradient(136deg, #00AEB1 0%, #00AEB1 40%, #8460E5 100%)",
  botonTealBorde:
    "linear-gradient(138deg, #FFFFFF 0%, #4DDCDC 25%, #6445DF 75%, #FFFFFF 100%)",
  /** Violet button — "Proponer", "Enviar", "Aceptar", "Contraproponer". */
  botonVioleta: "linear-gradient(165deg, #8460E5 0%, #3B1782 100%)",
  botonVioletaBorde:
    "linear-gradient(145deg, #CFBAFF 0%, #FFFFFF 35%, #AE8EFF 65%, #CFBAFF 100%)",
  /** Orange button — the publish one. The app's only orange, which is why it carries weight. */
  botonNaranja: "linear-gradient(130deg, #ED8936 0%, #ED8936 40%, #8460E5 100%)",
  botonNaranjaBorde:
    "linear-gradient(132deg, #FFFFFF 0%, #FBC47D 25%, #AE8EFF 75%, #FFFFFF 100%)",
  /** The "ÚLTIMO PASO" chip above the preview bar. */
  chipPaso: "linear-gradient(133deg, #8460E5 0%, #3B1782 100%)",
  chipPasoBorde:
    "linear-gradient(131deg, #8776FF 0%, #FFFFFF 38%, #532BC7 68%, #8776FF 100%)",
  /** Amount: the "US$" stays violet on the left, the figures teal on the right. */
  monto: "linear-gradient(217deg, #00CCCC 0%, #00CCCC 40%, #AE8EFF 100%)",
  /** The close X's ring. */
  cerrar: "linear-gradient(180deg, #FF9639 0%, #EF852E 40%, #BE3D00 100%)",
  /**
   * The auction room's chat bubbles (BidChat).
   *
   * Incoming runs right to left across the bubble; the answer is the same
   * orange ramp as `cerrar`, top to bottom. Both carry white type and square
   * off the corner they point from: 16px everywhere, 4px on the tail side.
   */
  burbuja: "linear-gradient(270deg, #19004A 0%, #3B1782 50%, #2E0F70 100%)",
  burbujaMia: "linear-gradient(180deg, #FF9639 0%, #EF852E 40%, #BE3D00 100%)",
} as const;

/**
 * Vertical reel.
 *
 * 270×480 is the authoring size, not the delivery size: it renders with
 * `--scale=4` → 1080×1920, Instagram's full-screen 9:16. Authoring in small
 * units keeps the numbers identical to the product's Figma.
 */
export const REEL = { width: 270, height: 480, fps: 30 } as const;
