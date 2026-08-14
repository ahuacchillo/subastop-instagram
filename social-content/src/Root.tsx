import { Composition } from "remotion";
import "./index.css";
import { POST, REEL } from "./brand/vmc";
import { AutoSlide } from "./posts/AutoSlide";
import { SUBASTA } from "./subasta";
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
 * One composition for the whole carousel: `indice` decides which slide it is.
 *
 * The data arrives through props, not through the bundle. That is what lets
 * `nueva-subasta.sh` render a different auction without touching any code:
 *
 *   npx remotion still Auto --props=datos.json --output=…/2.png
 *
 * The Studio previews slide 0 with whatever `subasta.ts` holds; to see the
 * others, change `indice` in the props panel.
 */
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Auto"
      component={AutoSlide}
      defaultProps={{ s: SUBASTA, indice: 0 }}
      durationInFrames={1}
      {...POST}
    />
    {/* Reels: authored at 260×411, delivered by `npm run reel` (--scale=4). */}
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
