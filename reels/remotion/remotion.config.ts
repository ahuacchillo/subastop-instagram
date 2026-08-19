/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import path from "path";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// Vulkan instead of the default SwiftShader, which rasterises on the CPU. These
// reels are backdrop-filter blur from end to end and that is exactly what a
// software rasteriser is slowest at: measured on this machine, 120 frames of
// `VendeSolo` went from 30.8 s to 17.3 s, and a beat with footage from 24.9 s to
// 15.8 s. It also covers `remotion still`, which is how frames get checked.
//
// It is not pixel-identical: ~24% of the pixels move by ±1 in the violet
// gradient's dither. Text and card edges do not move at all, and H.264
// quantises harder than that. Verified frame by frame before switching.
//
// A machine without Vulkan (a Mac, a container with no /dev/dri) needs this
// line commented out — see REELS.md §3, Paso 9.
Config.setChromiumOpenGlRenderer("vulkan");
// `@/...` is what the Concorde CLI writes into the components it installs.
// The bundler does not read tsconfig paths, so the alias lives here too.
Config.overrideBundlerConfig((c) => {
  const conf = enableTailwind(c);
  return {
    ...conf,
    resolve: {
      ...conf.resolve,
      alias: { ...conf.resolve?.alias, "@": path.resolve(process.cwd()) },
    },
  };
});
