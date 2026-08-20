import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { vy } from "../brand/vmc";
import { Bajada, Chip, Paso, Titular, useEntrada } from "./ui";

// ══════════════════════════════════════════════════════════════════════════════
// The tutorial format.
//
// Everything in here was written for `Registro` and pulled out when `Consignar`
// needed the same four things. It is not `ui.tsx`: that module is shared with
// the three brand reels, which are finished, and every piece here exists
// *because* a tutorial behaves differently from a brand reel.
//
//   Escena     cuts instead of cross-dissolving
//   Pantalla   a real screenshot in a phone window, pushing in on one control
//   Toque      the ring that says where to press
//   PasoEscena the identical per-step layout that makes the beats read as a list
//
// The long "why" for each is on the piece itself. If you are adding a third
// tutorial, this is the file you import, and the reel keeps only its GUION, its
// captures and its beats.
// ══════════════════════════════════════════════════════════════════════════════

/**
 * One screenshot: where it lives, its natural size, and the control the beat is
 * about as a fraction of the image.
 *
 * `w`/`h` are here because `Pantalla` does the cover-and-pan arithmetic itself
 * and the browser will not report the natural size in time to render a
 * deterministic frame. Re-captured at another size? Fix the numbers —
 * `identify <archivo>` prints them — and then look at `foco` again, because it
 * is a fraction and a different crop moves it.
 */
export type Captura = {
  archivo: string;
  w: number;
  h: number;
  foco: readonly [number, number];
};

export const acotar = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/** Frames the outgoing beat keeps playing under the incoming one. */
export const COLA = 8;

/**
 * The cut, and it is this reel's own — `Escena` in `ui.tsx` is a symmetric
 * cross-dissolve shared with the three brand reels, and those are finished.
 *
 * The symmetric version does not work here. Both layers sit at ~50% through the
 * middle of a 12-frame dissolve, and in a tutorial both layers are a chip and a
 * headline in the same corner of the frame: at 7.9s the render showed
 * "PASO 1 / 4 · Toca Ingresa" legible on top of a still-legible
 * "Compra o vende: todo empieza con tu cuenta". Two headlines stacked, seven
 * times, at exactly the moment the viewer is looking for the next instruction.
 *
 * So the incoming scene gets no fade of its own — every element inside already
 * rises in through `useEntrada`, staggered 2 to 30 frames — and the wrapper only
 * plays the outgoing tail. The old beat is gone by the time the new headline is
 * readable, and nothing ever flashes bare background: the tail is still up while
 * the new chip is on its way in.
 *
 * ponytail: no fade-in here on purpose, not an omission. Adding one back
 * recreates the double-headline frame.
 */
export const Escena: React.FC<{
  de: number;
  dura: number;
  children: React.ReactNode;
}> = ({ de, dura, children }) => (
  <Sequence from={de} durationInFrames={dura + COLA}>
    <Salida dura={dura}>{children}</Salida>
  </Sequence>
);

export const Salida: React.FC<{ dura: number; children: React.ReactNode }> = ({
  dura,
  children,
}) => {
  const f = useCurrentFrame();
  const sale = interpolate(f, [dura, dura + COLA], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  // Pushing back as it leaves, so the exit has a direction instead of just
  // thinning out. Half of what the shared dissolve used: the incoming scene is
  // not scaling toward it any more, so the movement has nothing to match.
  return (
    <AbsoluteFill
      style={{ opacity: sale, transform: `scale(${1 - (1 - sale) * 0.02})` }}
    >
      {children}
    </AbsoluteFill>
  );
};

/**
 * The tap: a dot with a ring breathing out of it.
 *
 * It exists because three of the five screenshots carry the article's own
 * cursor arrow and two do not, and a tutorial where the pointer appears and
 * disappears reads as sloppy. The ring is the reel's pointer and it is on every
 * step, so the arrow underneath it becomes a detail instead of the signal.
 *
 * Two waves half a cycle apart, so there is always one on screen: a single ring
 * spends part of every cycle invisible, and the eye loses the target in the gap.
 */
export const Toque: React.FC<{ x: number; y: number; retraso?: number }> = ({
  x,
  y,
  retraso = 20,
}) => {
  const f = useCurrentFrame() - retraso;
  const onda = (fase: number) => {
    const t = ((f / 34 + fase) % 1 + 1) % 1;
    return {
      position: "absolute" as const,
      left: x,
      top: y,
      width: 26,
      height: 26,
      marginLeft: -13,
      marginTop: -13,
      borderRadius: "50%",
      border: `1.6px solid ${vy.naranja}`,
      // Starts at 1.45, not 0.55. The ring cycles continuously, so a small
      // floor means some frames catch it *inside* the control: the render had
      // it drawn straight through "Regístrate" and "Factura" — the one word the
      // voice is telling you to look for. From 38px up it always reads as a halo
      // around the control instead of a target on top of it.
      transform: `scale(${1.45 + t * 1.7})`,
      opacity: f < 0 ? 0 : (1 - t) * 0.85,
    };
  };
  return (
    <>
      <div style={onda(0)} />
      <div style={onda(0.5)} />
    </>
  );
};

/**
 * A real screen, in a phone-shaped window, closing in on one control.
 *
 * The window covers (never letterboxes) and pans so that `foco` walks toward
 * the centre as the push-in grows. Starting wide and ending tight is the whole
 * point: the first second says *which screen this is*, the last says *where to
 * press*. Both halves matter and a static crop only gives you one.
 *
 * The clamp is what keeps it honest — the pan stops at the edge of the image
 * rather than sliding empty background in, so a control that lives in a corner
 * (Ingresa, top right) simply stays in its corner instead of being dragged to
 * a centre it never occupies on the real site.
 */
export const Pantalla: React.FC<{
  p: Captura;
  dura: number;
  ancho?: number;
  alto?: number;
  retraso?: number;
  /** Off where there is nothing to tap — a form is filled, not pressed. */
  anillo?: boolean;
}> = ({ p, dura, ancho = 178, alto = 262, retraso = 12, anillo = true }) => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, dura], [1, 1.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
  const escala = Math.max(ancho / p.w, alto / p.h) * zoom;
  const W = p.w * escala;
  const H = p.h * escala;
  const x = acotar(ancho / 2 - p.foco[0] * W, ancho - W, 0);
  const y = acotar(alto / 2 - p.foco[1] * H, alto - H, 0);
  return (
    <div
      style={{
        ...useEntrada(retraso),
        position: "relative",
        width: ancho,
        height: alto,
        borderRadius: 13,
        overflow: "hidden",
        background: "#FFFFFF",
        border: "1px solid rgba(255,255,255,0.28)",
        boxShadow: "0px 14px 38px rgba(20,0,70,0.6)",
      }}
    >
      <Img
        src={staticFile(p.archivo)}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: W,
          height: H,
          // Tailwind's preflight ships `img { max-width: 100% }`, which caps the
          // image at the window's width and quietly undoes the whole zoom — the
          // crop stays put and a white gutter grows on the right instead.
          maxWidth: "none",
        }}
      />
      {anillo ? (
        <Toque x={p.foco[0] * W + x} y={p.foco[1] * H + y} retraso={retraso + 14} />
      ) : null}
      {/*
        The crop always slices something, because the window covers and the
        image is wider than it: `ingresar` loses 36px off the left (mid-word
        through "¿Tienes deuda?") and `factura` loses 22px off the right ("Ingr",
        and the RUC value). Sliced words read as a broken render, not as a zoom.

        A tried-and-discarded inset shadow is why these are blur strips instead.
        A shadow only darkens, so it disappears over `ingresar`'s purple hero and
        the sliced words stayed sliced. A blur has no colour of its own: the last
        22px of type dissolve into an unreadable band on white and on purple
        alike, which is what "continues past the edge" looks like. The mask fades
        the blur inward so the band has no hard inner boundary of its own.

        Horizontal only, and not because the vertical axis is clean — `registrate`
        loses the top half of "¡Bienvenido!". It is that a strip across the purple
        header would read as exactly the artifact it is there to explain, and the
        vertical cuts land on decoration, not on the control. If a re-capture ever
        makes a vertical cut land on type, the same strip works rotated.
      */}
      {([-1, 1] as const).map((lado) => (
        <div
          key={lado}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            [lado < 0 ? "left" : "right"]: 0,
            width: 22,
            pointerEvents: "none",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            background: `linear-gradient(to ${lado < 0 ? "right" : "left"}, rgba(20,0,70,0.3), rgba(20,0,70,0))`,
            maskImage: `linear-gradient(to ${lado < 0 ? "right" : "left"}, #000, transparent)`,
            WebkitMaskImage: `linear-gradient(to ${lado < 0 ? "right" : "left"}, #000, transparent)`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * The layout every step shares: label, headline, one line of support, screen.
 *
 * Identical geometry across the four steps on purpose. A tutorial is a list,
 * and a list whose items move around the frame stops reading as a list — the
 * viewer re-finds the text on every cut instead of just reading the next one.
 */
export const PasoEscena: React.FC<{
  n: number;
  /** How many steps the reel has in total — the "/ 4" of "PASO 2 / 4". */
  de: number;
  /**
   * Replaces the "PASO n / de" chip when a straight count would lie.
   *
   * `Registro` is one flow of four steps, so the count is the truth. `Consignar`
   * is two flows of two — En Vivo and Negociable — and numbering both 1/2 and
   * 2/2 prints the same label twice and tells the viewer they are back at the
   * start. There the label names the modality instead, because *which flow you
   * are in* is the thing that beat has to establish.
   */
  etiqueta?: React.ReactNode;
  titulo: string;
  bajada: React.ReactNode;
  p: Captura;
  dura: number;
  /**
   * Wider than the default 178 for a capture that is a modal rather than a
   * screen. A phone-shaped window is the wrong frame for a landscape pop-up: it
   * either crops the sides or scales the whole thing down until the body text
   * stops being readable, and in a tutorial the body text of a confirmation
   * dialog is frequently the entire point of the beat.
   */
  ancho?: number;
  alto?: number;
  anillo?: boolean;
}> = ({
  n,
  de,
  etiqueta,
  titulo,
  bajada,
  p,
  dura,
  ancho,
  alto = 262,
  anillo = true,
}) => (
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
      {etiqueta ? <Chip>{etiqueta}</Chip> : <Paso n={n} de={de} />}
      <Titular tam={23} retraso={5}>
        {titulo}
      </Titular>
      <Bajada retraso={9}>{bajada}</Bajada>
    </div>
    {/*
      Pulled in from 12 to 5. With the old cross-dissolve the window could take
      its time, because the previous beat was still holding the frame. It is not
      any more — `Escena` here only plays an outgoing tail — so a late window
      left ~8 frames of almost-empty screen right after every cut. It is the
      biggest mass in the beat: it has to arrive with the headline, not after it.
    */}
    <Pantalla
      p={p}
      dura={dura}
      ancho={ancho}
      alto={alto}
      anillo={anillo}
      retraso={5}
    />
  </AbsoluteFill>
);

