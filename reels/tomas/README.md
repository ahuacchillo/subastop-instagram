# Material original de los reels

Las tomas y las locuciones **tal como salieron del generador**, antes de parchear la marca de agua y
de quitarles el audio de sala. Van al repo —y las fotos de subasta de `carrusel/Materiales/` no—
porque no se pueden volver a pedir: aunque repitas el prompt exacto, sale otra toma.

```
vendesolo/video/sofa.mp4     →  ../remotion/public/videos/sofa.mp4
vendesolo/voz/vendesolo.mp3  →  ../remotion/public/voz/vendesolo.mp3
```

El nombre del original es el mismo que el del archivo que usa el reel, para que la correspondencia
se vea sin abrir nada. `anteriores/` es el material de `Negociable` y `Vender`.

El material de reel entra siempre por aquí, nunca por `carrusel/Materiales/`: de esa carpeta es de
donde `nueva-subasta.sh` toma las fotos sueltas de un carrusel, y se llevaría por delante lo que
encuentre.

Cómo se construyen estos videos: [`REELS.md`](../REELS.md).
Los prompts de cada toma: [`PROMPTS-VENDESOLO.md`](../PROMPTS-VENDESOLO.md).
