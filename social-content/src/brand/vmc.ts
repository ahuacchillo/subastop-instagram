// ─────────────────────────────────────────────────────────────────────────────
// VMC Subastas brand kit — VOYAGER Design System.
//
// A literal transcription of the pixel-perfect spec for frame 51 (node
// 7340:30564). Every number here came out of Figma. When Figma changes, this
// changes: components carry no constants of their own.
// ─────────────────────────────────────────────────────────────────────────────

import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadRoboto } from "@remotion/google-fonts/Roboto";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";

export const { fontFamily: sans } = loadJakarta("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

/** Only for the letter inside the seller's avatar. */
export const { fontFamily: avatarFont } = loadRoboto("normal", {
  weights: ["700"],
  subsets: ["latin"],
});

/** Product amounts are monospaced so "US$ 9,000" does not jitter as it changes. */
export const { fontFamily: mono } = loadRobotoMono("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});

export const color = {
  /** text/neutral-inverse — type over photos. Not pure white. */
  inverse: "#FCFAFA",
  white: "#FFFFFF",
  naranja: "#ED8936",
  violeta: "#8460E5",
  violetaClaro: "#AE8EFF",
  indigo: "#5A35C2",
  indigoProfundo: "#2E0F70",
} as const;

export const shadow = {
  /** Glass elevation — every surface shares it. */
  glass: "0px 8px 24px rgba(0,0,0,0.1)",
  /** The glass's inner light edge. */
  glassInset: "inset 0px 1px 6px rgba(255,255,255,0.45)",
  /** TextW3C — type inside a card. */
  textCard: "0px 1px 3px rgba(0,0,0,0.25)",
  textHeader: "0px 1px 3px rgba(0,0,0,0.5)",
  /** Trim name over a photo (Glory). */
  textNombre: "0px 3px 12px rgba(0,0,0,0.8)",
  /** Make title over a photo (DFSK). */
  textMarca: "0px 3px 12px rgba(0,0,0,0.4)",
} as const;

export const gradient = {
  /** VYPrimaryDefault2 applied to the make title (bg-clip-text). */
  titulo:
    "linear-gradient(123.41deg, #FFFFFF 0%, #ED8936 22%, #8460E5 75%, #FFFFFF 100%)",
  /** The auction-date pill. */
  fecha:
    "linear-gradient(149.88deg, #ED8936 0%, #ED8936 40%, #8460E5 100%)",
  /**
   * The border on glass surfaces. The spec calls it VYStrokes1, "white 1.5px",
   * but the exported SVGs (the arrows) carry this gradient and that is what the
   * render shows: white top-left, orange, violet, white.
   */
  borde:
    "linear-gradient(135deg, #FFFFFF 0%, #F4AC59 22%, #8460E5 74.5%, #FFFFFF 100%)",
  /** The seller avatar's surface. */
  avatar: "linear-gradient(149.88deg, #ED8936 0%, #8460E5 100%)",
  /**
   * `titulo`, but for the reel.
   *
   * The original lives over the car photo: its #8460E5 violet stretch reads
   * because there is dark bodywork underneath. Over the reel's violet
   * background that stretch disappears. So the violet is lifted to #AE8EFF and
   * the orange to #FF9639, and the axis is straightened to 100° so every line
   * travels the whole gradient.
   */
  tituloReel:
    "linear-gradient(100deg, #FFFFFF 0%, #FF9639 28%, #AE8EFF 72%, #FFFFFF 100%)",
} as const;

/**
 * The glass recipe: the spec's two stacked fills.
 *
 * The gradient border does NOT belong here. A third `background` with
 * `border-box` would show through the fills, which are translucent, and tint
 * the whole card orange and violet. It goes separately, in `<BordeGlass>`,
 * clipped with a mask.
 *
 * `tail` is the only thing that differs between the system's two variants:
 *   - header and arrows → transparent (blur 5)
 *   - data card → #717171 grey at 50% (blur 20), more opaque so it reads on
 *     top of any photo.
 */
export const glass = (blur: number, tail: string) =>
  ({
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    background: [
      `linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 45%, ${tail} 100%)`,
      "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.03) 100%)",
    ].join(", "),
    boxShadow: `${shadow.glass}, ${shadow.glassInset}`,
  }) as const;

/** Light glass — the seller header and the carousel arrows. */
export const glassLigero = glass(5, "rgba(255,255,255,0)");
/** Dense glass — the car's data card. */
export const glassDenso = glass(20, "rgba(113,113,113,0.5)");

/**
 * Brand glass — the reel's.
 *
 * In the carousel the glass sits over the car photo and its tail is neutral
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

export const POST = { width: 1080, height: 1080, fps: 30 } as const;

// ═════════════════════════════════════════════════════════════════════════════
// VOYAGER — the app's palette and gradients (the product SVGs)
//
// The carousel above lives over the car photo: glass, whites, shadows. The
// reel lives inside the app: violet and teal solids, buttons with gradient
// borders. They are two families of one system, which is why they share a
// file, but they never mix: `gradient` is the photo world, `vy` is the UI one.
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
