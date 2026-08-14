# Material original de los reels

Las tomas y las locuciones **tal como salieron del generador**, antes de parchear la marca de agua y
de quitarles el audio de sala. Van al repo —y el resto de `Materiales/` no— porque no se pueden
volver a pedir: aunque repitas el prompt exacto, sale otra toma.

```
vendesolo/video/sofa.mp4     →  social-content/public/videos/sofa.mp4
vendesolo/voz/vendesolo.mp3  →  social-content/public/voz/vendesolo.mp3
```

El nombre del original es el mismo que el del archivo que usa el reel, para que la correspondencia
se vea sin abrir nada. `anteriores/` es el material de `Negociable` y `Vender`.

**No dejes archivos de reel sueltos en la raíz de `Materiales/`**: de ahí es de donde
`nueva-subasta.sh` toma las fotos de un carrusel, y se las lleva.

Cómo se construyen estos videos: [`social-content/REELS.md`](../../social-content/REELS.md).
Los prompts de cada toma: `social-content/PROMPTS-<reel>.md`.
