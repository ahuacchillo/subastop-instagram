import { Composition } from "remotion";
import "./index.css";
import { REEL } from "./brand/vmc";
import {
  DURACION_NEGOCIABLE,
  NEGOCIABLE,
  ReelNegociableVideo,
} from "./reels/Negociable";
import { DURACION_VENDER, ReelVenderVideo, VENDER } from "./reels/Vender";
import {
  DURACION_VENDESOLO,
  ReelVendeSoloVideo,
  VENDESOLO,
} from "./reels/VendeSolo";
import { DURACION_REGISTRO, REGISTRO, ReelRegistroVideo } from "./reels/Registro";
import {
  CONSIGNAR,
  DURACION_CONSIGNAR,
  ReelConsignarVideo,
} from "./reels/Consignar";
import { DURACION_VISITAS, ReelVisitasVideo, VISITAS } from "./reels/Visitas";

/**
 * The three brand reels and the three tutorials. Authored at 270×480 and
 * delivered by `npm run reel:<nombre>` (--scale=4 → 1080×1920).

 * The tutorials share their format — cuts, phone window, tap ring, per-step
 * layout — through `reels/tutorial.tsx`. The brand reels do not use it.
 *
 * The auction carousel is a project of its own, in `carrusel/remotion/`.
 */
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Negociable"
      component={ReelNegociableVideo}
      defaultProps={{ d: NEGOCIABLE }}
      durationInFrames={DURACION_NEGOCIABLE}
      {...REEL}
    />
    {/*
      How selling works. Same 270×480 as Negociable, but silent: the voiceover
      for this script has not been recorded yet (see VOZ-VENDER.md).
    */}
    <Composition
      id="Vender"
      component={ReelVenderVideo}
      defaultProps={{ d: VENDER }}
      durationInFrames={DURACION_VENDER}
      {...REEL}
    />
    {/*
      Second pass at the same message: she publishes and the car sells itself.
      53s — re-timed to `public/voz/vendesolo.mp3`, which is why it is longer
      than `Vender` rather than shorter. Two of its ten beats still play footage
      borrowed from `Vender`; see PROMPTS-VENDESOLO.md for which and why.
    */}
    <Composition
      id="VendeSolo"
      component={ReelVendeSoloVideo}
      defaultProps={{ d: VENDESOLO }}
      durationInFrames={DURACION_VENDESOLO}
      {...REEL}
    />
    {/*
      The first tutorial, and the first one silent by choice rather than by
      accident: its GUION is an estimate off the word count, not a measurement
      of a take, because `public/voz/registro.mp3` does not exist yet. Read the
      note on GUION in Registro.tsx before trusting any of those frames.
    */}
    <Composition
      id="Registro"
      component={ReelRegistroVideo}
      defaultProps={{ d: REGISTRO }}
      durationInFrames={DURACION_REGISTRO}
      {...REEL}
    />
    {/*
      Second tutorial, and the first to inherit the format from `tutorial.tsx`
      instead of inventing it. Silent for the same reason as Registro: its take
      does not exist yet, so GUION is arithmetic off the word count. Read the
      note on GUION in Consignar.tsx before trusting a frame.
    */}
    <Composition
      id="Consignar"
      component={ReelConsignarVideo}
      defaultProps={{ d: CONSIGNAR }}
      durationInFrames={DURACION_CONSIGNAR}
      {...REEL}
    />
    <Composition
      id="Visitas"
      component={ReelVisitasVideo}
      defaultProps={{ d: VISITAS }}
      durationInFrames={DURACION_VISITAS}
      {...REEL}
    />
  </>
);
