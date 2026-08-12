// ─────────────────────────────────────────────────────────────────────────────
// Kit de marca VMC Subastas — VOYAGER Design System.
//
// Traducción literal del spec pixel-perfect del frame 51 (nodo 7340:30564).
// Todo número de este archivo salió de Figma. Si Figma cambia, cambia aquí:
// los componentes no llevan constantes propias.
// ─────────────────────────────────────────────────────────────────────────────

import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadRoboto } from "@remotion/google-fonts/Roboto";
import { loadFont as loadRobotoMono } from "@remotion/google-fonts/RobotoMono";

export const { fontFamily: sans } = loadJakarta("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

/** Solo para la letra del avatar del vendedor. */
export const { fontFamily: avatarFont } = loadRoboto("normal", {
  weights: ["700"],
  subsets: ["latin"],
});

/** Los montos del producto van en monoespaciada: "US$ 9,000" no baila al tipear. */
export const { fontFamily: mono } = loadRobotoMono("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});

export const color = {
  /** text/neutral-inverse — textos sobre foto. No es blanco puro. */
  inverse: "#FCFAFA",
  white: "#FFFFFF",
  naranja: "#ED8936",
  violeta: "#8460E5",
  violetaClaro: "#AE8EFF",
  indigo: "#5A35C2",
  indigoProfundo: "#2E0F70",
} as const;

export const shadow = {
  /** Elevación glass — todas las superficies la comparten. */
  glass: "0px 8px 24px rgba(0,0,0,0.1)",
  /** Borde de luz interior del glass. */
  glassInset: "inset 0px 1px 6px rgba(255,255,255,0.45)",
  /** TextW3C — texto dentro de tarjeta. */
  textCard: "0px 1px 3px rgba(0,0,0,0.25)",
  textHeader: "0px 1px 3px rgba(0,0,0,0.5)",
  /** Nombre de versión sobre foto (Glory). */
  textNombre: "0px 3px 12px rgba(0,0,0,0.8)",
  /** Título de marca sobre foto (DFSK). */
  textMarca: "0px 3px 12px rgba(0,0,0,0.4)",
} as const;

export const gradient = {
  /** VYPrimaryDefault2 aplicado al título de marca (bg-clip-text). */
  titulo:
    "linear-gradient(123.41deg, #FFFFFF 0%, #ED8936 22%, #8460E5 75%, #FFFFFF 100%)",
  /** Píldora de fecha de subasta. */
  fecha:
    "linear-gradient(149.88deg, #ED8936 0%, #ED8936 40%, #8460E5 100%)",
  /**
   * Borde de las superficies glass. El spec lo llama VYStrokes1 "blanco 1.5px",
   * pero los SVG exportados (flechas) traen este degradado y es lo que se ve en
   * el render: blanco arriba-izquierda, naranja, violeta, blanco.
   */
  borde:
    "linear-gradient(135deg, #FFFFFF 0%, #F4AC59 22%, #8460E5 74.5%, #FFFFFF 100%)",
  /** Superficie del avatar del vendedor. */
  avatar: "linear-gradient(149.88deg, #ED8936 0%, #8460E5 100%)",
  /**
   * `titulo` pero para el reel.
   *
   * El original vive sobre la foto del auto: su tramo violeta #8460E5 se lee
   * porque debajo hay chapa oscura. Sobre el fondo violeta del reel ese tramo
   * desaparece. Se sube el violeta a #AE8EFF y el naranja a #FF9639, y el eje
   * se endereza a 100° para que cada línea recorra el degradado completo.
   */
  tituloReel:
    "linear-gradient(100deg, #FFFFFF 0%, #FF9639 28%, #AE8EFF 72%, #FFFFFF 100%)",
} as const;

/**
 * Receta glass: los dos rellenos superpuestos del spec.
 *
 * El borde degradado NO va aquí — un tercer `background` con `border-box` se
 * vería a través de los rellenos, que son translúcidos, y teñiría la tarjeta
 * entera de naranja y violeta. Va aparte, en `<BordeGlass>`, recortado con
 * máscara.
 *
 * `tail` es lo único que cambia entre las dos variantes del sistema:
 *   - header y flechas → transparente (blur 5)
 *   - tarjeta de datos → gris #717171 al 50% (blur 20), más opaca para leerse
 *     encima de cualquier foto.
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

/** Glass ligero — header del vendedor y flechas de carrusel. */
export const glassLigero = glass(5, "rgba(255,255,255,0)");
/** Glass denso — tarjeta de datos del auto. */
export const glassDenso = glass(20, "rgba(113,113,113,0.5)");

/**
 * Glass de marca — el del reel.
 *
 * En el carrusel el glass va sobre la foto del auto y su cola es gris neutro:
 * tiene que leerse encima de cualquier color. En el reel el fondo siempre es el
 * violeta de VMC, así que la cola se tiñe de índigo y el relleno lleva un toque
 * de violeta claro. Misma receta del sistema, nuestros colores.
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
// VOYAGER — paleta y degradados de la app (los SVG del producto)
//
// El carrusel de arriba vive sobre la foto del auto: vidrio, blancos, sombras.
// El reel vive dentro de la app: sólidos violeta/teal y botones con borde
// degradado. Son dos familias del mismo sistema y por eso conviven en un solo
// archivo, pero no se mezclan: `gradient` es el mundo foto, `vy` es el mundo UI.
//
// Cada valor salió de los SVG exportados de Figma. Los ángulos CSS son la
// conversión del vector (x1,y1)→(x2,y2) de cada linearGradient: θ = atan2(dx,-dy).
// ═════════════════════════════════════════════════════════════════════════════

export const vy = {
  /** Fondo del header en vivo, de claro a casi negro. */
  violeta600: "#5F3ED8",
  indigo700: "#340091",
  indigo900: "#140046",
  /** Violeta de acción — botones, iconos, chips. */
  violeta: "#8460E5",
  violeta300: "#AE8EFF",
  violeta100: "#CFBAFF",
  /** Todo el texto de la app sobre blanco. Nunca negro. */
  tinta: "#3B1782",
  teal: "#00CCCC",
  teal300: "#4DDCDC",
  teal500: "#00AEB1",
  teal700: "#008688",
  tealClaro: "#00DAE0",
  naranja: "#FF9639",
  naranja600: "#EF852E",
  naranja900: "#BE3D00",
  /** Placeholder de input. */
  gris: "#D1D5DC",
} as const;

export const vyGradient = {
  /** Header del auto en vivo — también es el fondo de todo el reel. */
  header: "linear-gradient(157deg, #5F3ED8 0%, #340091 50%, #140046 100%)",
  /** Banner de Subastin bajo el header. */
  banner: "linear-gradient(90deg, #00DAE0 0%, #008688 100%)",
  /** Pantalla de espera "Procesando". */
  procesando: "linear-gradient(90deg, #00DAE0 0%, #008688 100%)",
  /** Botón teal — "Negocia ahora", "Ingresa a la sala". */
  botonTeal: "linear-gradient(136deg, #00AEB1 0%, #00AEB1 40%, #8460E5 100%)",
  botonTealBorde:
    "linear-gradient(138deg, #FFFFFF 0%, #4DDCDC 25%, #6445DF 75%, #FFFFFF 100%)",
  /** Botón violeta — "Proponer", "Enviar", "Aceptar", "Contraproponer". */
  botonVioleta: "linear-gradient(165deg, #8460E5 0%, #3B1782 100%)",
  botonVioletaBorde:
    "linear-gradient(145deg, #CFBAFF 0%, #FFFFFF 35%, #AE8EFF 65%, #CFBAFF 100%)",
  /** Botón naranja — el de publicar. Es el único naranja de la app, y por eso pesa. */
  botonNaranja: "linear-gradient(130deg, #ED8936 0%, #ED8936 40%, #8460E5 100%)",
  botonNaranjaBorde:
    "linear-gradient(132deg, #FFFFFF 0%, #FBC47D 25%, #AE8EFF 75%, #FFFFFF 100%)",
  /** Chip "ÚLTIMO PASO" sobre la barra de vista previa. */
  chipPaso: "linear-gradient(133deg, #8460E5 0%, #3B1782 100%)",
  chipPasoBorde:
    "linear-gradient(131deg, #8776FF 0%, #FFFFFF 38%, #532BC7 68%, #8776FF 100%)",
  /** Monto: el "US$" queda violeta a la izquierda y las cifras teal a la derecha. */
  monto: "linear-gradient(217deg, #00CCCC 0%, #00CCCC 40%, #AE8EFF 100%)",
  /** Aro de la X de cerrar. */
  cerrar: "linear-gradient(180deg, #FF9639 0%, #EF852E 40%, #BE3D00 100%)",
} as const;

/**
 * Reel vertical.
 *
 * 260×411 es el tamaño de diseño, no el de entrega: se renderiza con
 * `--scale=4` → 1040×1644, que es par y sube nítido a Instagram. Autorar en
 * unidades chicas mantiene los números iguales a los del Figma del producto.
 */
export const REEL = { width: 260, height: 411, fps: 30 } as const;
