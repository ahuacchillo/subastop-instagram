import { AbsoluteFill, Img, staticFile } from "remotion";
import React from "react";
import {
  avatarFont,
  color,
  glassDenso,
  glassLigero,
  gradient,
  sans,
  shadow,
} from "../brand/vmc";
import type { Subasta } from "../subasta";

// ═════════════════════════════════════════════════════════════════════════════
// Slide de carrusel VMC Subastas — 1080×1080
//
// Un solo componente para todas las fotos del auto. Lo único que cambia entre
// la portada y las demás es el bloque de marca+modelo (`indice === 0`) y qué
// flechas se dibujan. Todo lo demás se repite idéntico: es lo que hace que el
// carrusel se lea como una sola pieza al deslizar.
//
// Las coordenadas son absolutas contra el frame de 1080×1080, tal cual el spec
// de Figma. Nada de flex a nivel de página: si Figma dice x 45 / y 845, aquí
// dice left 45 / top 845, y así se compara contra el diseño sin traducir nada.
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Borde degradado de 1.5px de cualquier superficie glass.
 *
 * Se dibuja como capa aparte con máscara `xor`: se pinta el degradado en toda
 * la caja y se le perfora el interior. Es la única forma de tener borde
 * degradado sobre un relleno translúcido sin que el degradado se vea por dentro.
 */
const BordeGlass: React.FC<{ radio: number | string }> = ({ radio }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      borderRadius: radio,
      padding: 1.5,
      background: gradient.borde,
      WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      pointerEvents: "none",
    }}
  />
);

/** El chevron de las flechas, recortado del SVG exportado (nodo 7340:30566). */
const Flecha: React.FC<{ hacia: "izq" | "der" }> = ({ hacia }) => (
  <div
    style={{
      position: "absolute",
      // La derecha en x 942.42; la izquierda es su espejo contra el frame.
      left: hacia === "der" ? 942.42 : 1080 - 942.42 - 92.386,
      top: 515.22,
      width: 92.386,
      height: 92.386,
      borderRadius: "50%",
      ...glassLigero,
    }}
  >
    <BordeGlass radio="50%" />
    {/* El viewBox recorta el círculo original, así el chevron cae centrado. */}
    <svg
      viewBox="24 16 92.386 92.386"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <path
        d={
          hacia === "der"
            ? "M59.5918 47.1344L80.122 62.5321L59.5918 77.9297"
            : "M80.7949 47.1344L60.2648 62.5321L80.7949 77.9297"
        }
        stroke="white"
        strokeWidth="5.13254"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  </div>
);

/** Pin de precio de la tarjeta de datos. */
const IconoPrecio: React.FC = () => (
  <svg width={46} height={66} viewBox="0 0 46 66" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M23 3C15.3 3 9 9.3 9 17c0 9 14 29 14 29s14-20 14-29c0-7.7-6.3-14-14-14z"
      stroke={color.naranja}
      strokeWidth="3.2"
      strokeLinejoin="round"
    />
    <text
      x="23"
      y="23"
      textAnchor="middle"
      fill={color.violeta}
      fontFamily={sans}
      fontWeight={800}
      fontSize="16"
    >
      $
    </text>
    <rect x="2" y="53" width="42" height="13" rx="6.5" fill={color.violeta} />
  </svg>
);

const Header: React.FC<{ tienda: string }> = ({ tienda }) => (
  <div
    style={{
      position: "absolute",
      left: 44.875,
      top: 49.02,
      width: 372,
      height: 104,
      borderRadius: 13.955,
      display: "flex",
      alignItems: "center",
      gap: 14,
      paddingLeft: 16.5,
      boxSizing: "border-box",
      ...glassLigero,
    }}
  >
    <BordeGlass radio={13.955} />
    <div
      style={{
        width: 67.307,
        height: 67.307,
        borderRadius: "50%",
        background: gradient.avatar,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: avatarFont,
        fontWeight: 700,
        // El spec da 65.44px, pero ese es el alto de la capa del texto, no el
        // cuerpo: con 65 la letra revienta el círculo. 42 es lo que se ve.
        fontSize: 42,
        letterSpacing: "0.5235px",
        color: color.white,
        lineHeight: 1,
        paddingBottom: 3,
      }}
    >
      {tienda.charAt(0).toUpperCase()}
    </div>
    <div style={{ fontFamily: sans, color: color.white, textShadow: shadow.textHeader }}>
      <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.2px" }}>
        Tienda oficial
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "0.224px" }}>
        {tienda}
      </div>
    </div>
  </div>
);

/**
 * Marca + modelo, anclados a la derecha en x 1009.56.
 *
 * Los dos bloques se solapan a propósito: el modelo arranca en y 42 y mide 94
 * de alto, y la marca arranca en y 94. Ese solape de ~42px es el diseño, no un
 * error de posición — separarlos rompe el remate visual.
 */
const Titulo: React.FC<{ marca: string; modelo: string }> = ({ marca, modelo }) => (
  <>
    <div
      style={{
        position: "absolute",
        right: 1080 - 1009.56,
        top: 42,
        fontFamily: sans,
        fontWeight: 700,
        fontSize: 70,
        lineHeight: 1.34,
        color: color.inverse,
        textShadow: shadow.textNombre,
        whiteSpace: "nowrap",
      }}
    >
      {modelo}
    </div>
    <div
      style={{
        position: "absolute",
        right: 1080 - 1009.56,
        top: 94,
        fontFamily: sans,
        fontWeight: 800,
        fontSize: 116,
        letterSpacing: "-3px",
        lineHeight: 1.26,
        whiteSpace: "nowrap",
        // El degradado va sobre el texto, no detrás: bg-clip-text.
        backgroundImage: gradient.titulo,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        // Con text-shadow la sombra se recortaría junto con el relleno.
        filter: "drop-shadow(0px 3px 12px rgba(0,0,0,0.4))",
      }}
    >
      {marca}
    </div>
  </>
);

const Fecha: React.FC<{ fecha: string; hora: string }> = ({ fecha, hora }) => (
  <div
    style={{
      position: "absolute",
      left: 45,
      top: 778.25,
      width: 353,
      height: 51,
      borderRadius: 87.319,
      overflow: "hidden",
      background: gradient.fecha,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      fontFamily: sans,
      fontWeight: 500,
      fontSize: 25.682,
      letterSpacing: "0.2568px",
      lineHeight: 1.44,
      color: color.inverse,
    }}
  >
    <span>Subasta {fecha}</span>
    <span style={{ opacity: 0.85 }}>|</span>
    <span>{hora}</span>
  </div>
);

const TarjetaDatos: React.FC<{ s: Subasta }> = ({ s }) => (
  <div
    style={{
      position: "absolute",
      left: 45,
      top: 845,
      width: 466,
      height: 176,
      borderRadius: 11.826,
      boxSizing: "border-box",
      padding: "15px 23px 19px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      fontFamily: sans,
      color: color.white,
      textShadow: shadow.textCard,
      whiteSpace: "nowrap",
      // ponytail: line-height 1 en todo el bloque. Con el `normal` del navegador
      // las tres líneas grandes suman ~183px de caja dentro de una tarjeta de
      // 176: el `space-between` se queda sin aire y "Precio base" termina
      // pegado al borde de abajo. Con la caja ceñida al cuerpo la tarjeta
      // vuelve a tener los ~20px de respiro que pide el spec.
      lineHeight: 1,
      ...glassDenso,
    }}
  >
    <BordeGlass radio={11.826} />

    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span style={{ fontSize: 43.665, fontWeight: 700, letterSpacing: "-0.3493px" }}>
        {s.marca} {s.anio}
      </span>
      <div style={{ width: 1.5, height: 36.387, background: "rgba(255,255,255,0.65)" }} />
      <span style={{ fontSize: 18.403, fontWeight: 700, letterSpacing: "-0.1472px" }}>
        {s.modelo}
      </span>
    </div>

    {/*
      `space-between`: la transmisión queda pegada a la izquierda y el bloque de
      precio a la derecha, sin números mágicos. Así aguanta "Automática" o un
      precio de cinco cifras sin que haya que reajustar nada.
    */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 22.742, fontWeight: 600, letterSpacing: "0.1819px" }}>
        {s.transmision}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <IconoPrecio />
        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}
        >
          <span style={{ fontSize: 43.665, fontWeight: 700, letterSpacing: "-0.3493px" }}>
            {s.precioBase}
          </span>
          <span style={{ fontSize: 22.742, fontWeight: 600, letterSpacing: "-0.1819px" }}>
            Precio base
          </span>
        </div>
      </div>
    </div>
  </div>
);

export const AutoSlide: React.FC<{
  s: Subasta;
  /** 0-indexado. El 0 es la portada: la única que lleva marca y modelo. */
  indice: number;
}> = ({ s, indice }) => (
  <AbsoluteFill style={{ background: color.white, overflow: "hidden" }}>
    <Img
      src={staticFile(s.fotos[indice])}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />

    <Header tienda={s.tienda} />
    {indice === 0 && <Titulo marca={s.marca} modelo={s.modelo} />}

    {indice > 0 && <Flecha hacia="izq" />}
    {indice < s.fotos.length - 1 && <Flecha hacia="der" />}

    <Fecha fecha={s.fecha} hora={s.hora} />
    <TarjetaDatos s={s} />

    <Img
      src={staticFile("brand/vmc-logo.svg")}
      style={{
        position: "absolute",
        left: 855.29,
        top: 952.32,
        width: 179.51,
        height: 66.69,
      }}
    />
  </AbsoluteFill>
);
