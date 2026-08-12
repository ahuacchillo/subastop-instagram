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

/**
 * Una sola composición para todo el carrusel: `indice` decide qué slide es.
 *
 * Los datos entran por props, no por el bundle. Eso es lo que le permite a
 * `nueva-subasta.sh` renderizar una subasta distinta sin tocar el código:
 *
 *   npx remotion still Auto --props=datos.json --output=…/2.png
 *
 * En el Studio se previsualiza el slide 0 con lo que haya en `subasta.ts`; para
 * ver los otros se cambia `indice` en el panel de props.
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
    {/* Reels: 260×411 de diseño; se entregan con `npm run reel` (--scale=4). */}
    <Composition
      id="Negociable"
      component={ReelNegociableVideo}
      defaultProps={{ d: NEGOCIABLE }}
      durationInFrames={DURACION_NEGOCIABLE}
      {...REEL}
    />
  </>
);
