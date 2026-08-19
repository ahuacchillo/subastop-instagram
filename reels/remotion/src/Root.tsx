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

/**
 * The three brand reels. Authored at 270×480 and delivered by
 * `npm run reel:<nombre>` (--scale=4 → 1080×1920).
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
  </>
);
