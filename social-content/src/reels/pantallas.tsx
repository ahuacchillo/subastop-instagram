import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { mono, sans, vy } from "../brand/vmc";
import { Boton, CerrarX, DS, Latido, Tarjeta, useEntrada } from "./ui";
import AuctionStatus from "@/concorde/components/AuctionStatus";
import CardViewer from "@/concorde/components/CardViewer";
import DetailCard from "@/concorde/components/DetailCard";
import ConditionPill from "@/concorde/components/ConditionPill";
import Accordion from "@/concorde/components/Accordion";
import Button from "@/concorde/components/Button";
import BidProposal from "@/concorde/components/BidProposal";
import { DETALLE_PILLS } from "@/concorde/bloques/detalle/pills";

// ═════════════════════════════════════════════════════════════════════════════
// The product's screens.
//
// Two kinds live here. The pages the seller scrolls — the listing form, the
// offer preview — are the Figma mobile exports played inside `Movil`, because
// rebuilding a whole page in HTML would drift the moment the product moves.
// The small surfaces the reel animates — the published card, the modal, the
// pile of proposals — are rebuilt, so amounts and dates arrive through props
// and the type stays crisp at any scale.
// ═════════════════════════════════════════════════════════════════════════════

/**
 * The modal shell. The icon says what the screen is about: coins for money
 * (publishing, proposing), wallet for an incoming proposal, bell for a system
 * notification.
 */
const ICONOS = {
  monedas: { archivo: "brand/icono-monedas.svg", w: 36, h: 38 },
  billetera: { archivo: "brand/icono-billetera.svg", w: 33, h: 38 },
  campana: { archivo: "brand/icono-campana.svg", w: 34, h: 29 },
} as const;

export const Modal: React.FC<{
  icono: keyof typeof ICONOS;
  children: React.ReactNode;
}> = ({ icono, children }) => {
  const i = ICONOS[icono];
  return (
    <Tarjeta
      estilo={{
        position: "relative",
        padding: "16px 14px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 9,
      }}
    >
      <CerrarX />
      <Img src={staticFile(i.archivo)} style={{ width: i.w, height: i.h }} />
      {children}
    </Tarjeta>
  );
};

// ── Publishing ───────────────────────────────────────────────────────────────

// ── Publishing ───────────────────────────────────────────────────────────────

/**
 * A real app page, scrolled.
 *
 * `frame` is the mobile export straight out of Figma: 420 wide and thousands
 * of pixels tall. Rebuilding those pages in HTML the way the modals are
 * rebuilt would take a day each and drift the moment the product moves, so the
 * whole page goes inside a viewport and slides instead. `de`/`a` are in the
 * SVG's own coordinate space, so the numbers match what Figma shows.
 */
export const Movil: React.FC<{
  frame: string;
  de: number;
  a: number;
  dura: number;
  ancho?: number;
  alto?: number;
}> = ({ frame, de, a, dura, ancho = 192, alto = 300 }) => {
  const f = useCurrentFrame();
  const escala = ancho / 420;
  const y = interpolate(f, [0, dura], [de, a], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "relative",
        width: ancho,
        height: alto,
        borderRadius: 14,
        overflow: "hidden",
        background: "#140046",
        boxShadow: "0px 12px 34px rgba(20,0,70,0.55)",
      }}
    >
      <Img
        src={staticFile(frame)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: ancho,
          transform: `translateY(${-y * escala}px)`,
        }}
      />
    </div>
  );
};


const Tilde = (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 13l4.5 4.5L19 7"
      stroke="#FFFFFF"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Choosing the photos.
 *
 * Selection is driven by frame, not by state: each thumbnail lights up at
 * `12 + i * 14`, so the grid fills in as if someone were tapping it.
 */
export const Galeria: React.FC<{ fotos: string[] }> = ({ fotos }) => {
  const f = useCurrentFrame();
  return (
    <Tarjeta estilo={{ padding: "12px 12px 14px" }}>
      <div
        style={{
          fontFamily: sans,
          fontWeight: 700,
          fontSize: 10,
          color: vy.violeta,
          paddingBottom: 7,
          marginBottom: 9,
          borderBottom: "1px solid rgba(132,96,229,0.18)",
        }}
      >
        Elige las fotos de tu aviso
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        {fotos.map((foto, i) => {
          const elegida = f >= 12 + i * 14;
          return (
            <div
              key={foto}
              style={{
                position: "relative",
                borderRadius: 7,
                overflow: "hidden",
                border: `1.5px solid ${elegida ? vy.teal : "rgba(132,96,229,0.22)"}`,
                opacity: elegida ? 1 : 0.5,
              }}
            >
              <Img
                src={staticFile(foto)}
                style={{ width: "100%", height: 50, objectFit: "cover", display: "block" }}
              />
              {elegida ? (
                <div
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: vy.teal500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 1px 4px rgba(20,0,70,0.4)",
                  }}
                >
                  {Tilde}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
        <Boton ancho={92} alto={22} tam={9.5} retraso={62} pulso>
          Continuar
        </Boton>
      </div>
    </Tarjeta>
  );
};

// ── The offers ───────────────────────────────────────────────────────────────

const Propuesta: React.FC<{ monto: string; retraso: number }> = ({ monto, retraso }) => (
  <div style={useEntrada(retraso)}>
    {/* No caption: in the room it names who bid, and here nobody has a name yet. */}
    <DS e={0.74}>
      <BidProposal amount={`US$ ${monto}`} label="" />
    </DS>
  </div>
);

/**
 * The proposals piling up.
 *
 * Concorde's `BidProposal` is the card the auction room already shows a bid
 * on, glass and all, so the reel does not invent a second way to say "someone
 * offered you this". The expectation sits on top as the reference line and the
 * amounts climb towards it — the whole "siguen llegando hasta que una calce"
 * beat, with no promised timeline attached.
 */
export const PilaPropuestas: React.FC<{
  expectativa: string;
  propuestas: string[];
}> = ({ expectativa, propuestas }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 7,
        padding: "4px 12px 5px",
        borderRadius: 999,
        border: "1px solid rgba(174,142,255,0.45)",
        background: "rgba(20,0,70,0.45)",
      }}
    >
      <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 8.5, color: vy.violeta100 }}>
        Tu expectativa
      </span>
      <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 10, color: "#FFFFFF" }}>
        US$ {expectativa}
      </span>
    </div>
    {propuestas.map((monto, i) => (
      <Propuesta key={monto} monto={monto} retraso={8 + i * 24} />
    ))}
  </div>
);

// ── The offer preview ────────────────────────────────────────────────────────

/** Concorde's mobile width, and what it takes to fit the reel's 240. */
const ANCHO_MOVIL = 420;
const ESCALA = 240 / ANCHO_MOVIL;

/**
 * DetailCard and the pills ship at their desktop widths; the `detalle` block
 * widens them to the mobile column. Same two rules, copied from
 * `concorde/bloques/detalle/mobile/DetalleMobile.tsx`.
 */
const ANCHOS_MOVIL = `
.dt-detail-m.pdetail { width: 388px; max-width: 388px; min-height: 390px; }
.pcondpill.dt-pill-m { width: 100%; box-sizing: border-box; padding-left: 12px; padding-right: 12px; font-size: 13px; line-height: 15px; }
`;

/**
 * The offer preview — the seller's offer as the buyer will see it.
 *
 * Everything below the first card is the product itself: Concorde's `detalle`
 * block (AuctionStatus + CardViewer + DetailCard + condition pills), so the
 * reel moves the day the detail page moves. Only the "ÚLTIMO PASO" card is
 * ours — it belongs to the publishing flow, not to the public page, so the
 * design system has no component for it.
 *
 * Authored at Concorde's 420 and scaled to the reel's 240: every number below
 * is a product number, never a reel number.
 */
export const VistaPrevia: React.FC<{
  foto: string;
  auto: string;
  vendedor: string;
  fotos: string[];
  dia: string;
  hora: string;
  dura: number;
  alto?: number;
}> = ({ foto, auto, vendedor, fotos, dia, hora, dura, alto = 296 }) => {
  const f = useCurrentFrame();
  // Scrolls like the form does. Holding still would say "this is the whole
  // screen"; drifting says "there is more offer below", which is the truth.
  const y = interpolate(f, [10, dura], [0, 820], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
  const imgs = [foto, ...fotos.filter((n) => n !== foto)].map((n) => staticFile(n));
  return (
    <div style={{ width: 240, height: alto, overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: ANCHOS_MOVIL }} />
      {/* ponytail: CardViewer draws a plain <img>, which Remotion does not wait
          for. These hidden <Img> make it wait, so no frame renders with a hole
          where the car should be. */}
      {imgs.map((src) => (
        <Img key={src} src={src} style={{ display: "none" }} />
      ))}
      <div
        style={{
          width: ANCHO_MOVIL,
          transform: `scale(${ESCALA}) translateY(${-y}px)`,
          transformOrigin: "top left",
          filter: "drop-shadow(0px 21px 52px rgba(20,0,70,0.5))",
          ["--vmc-font-display" as string]: sans,
        } as React.CSSProperties}
      >
        {/* ÚLTIMO PASO — the publishing flow's own card */}
        <div
          style={{
            margin: "0 16px 14px",
            background: "#FFFFFF",
            borderRadius: 8,
            padding: "16px 16px 19px",
            boxSizing: "border-box",
            boxShadow: "rgba(0,0,0,0.1) 0px 0px 16px 4px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "4px 12px 5px",
              borderRadius: 999,
              border: "1px solid #FFBC83",
              background:
                "linear-gradient(140deg, #FF9639 0%, #EF852E 40%, #BE3D00 100%)",
              boxShadow: "0px 2px 5px rgba(239,133,46,0.45)",
              fontFamily: sans,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: 1,
              color: "#FFFFFF",
            }}
          >
            ÚLTIMO PASO
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              paddingBottom: 9,
              marginTop: 12,
              borderBottom: "1px solid #E1E3E2",
            }}
          >
            <span
              style={{
                fontFamily: sans,
                fontWeight: 600,
                fontSize: 17,
                backgroundImage:
                  "linear-gradient(174deg, #5F3ED8 0%, #340091 45%, #140046 91%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Vista previa de tu Oferta
            </span>
            <span
              style={{ fontFamily: sans, fontWeight: 600, fontSize: 13, color: "#3B1782" }}
            >
              Editar mi oferta
            </span>
          </div>
          <div
            style={{
              fontFamily: sans,
              fontWeight: 400,
              fontSize: 13,
              lineHeight: 1.45,
              color: "#3B1782",
              margin: "12px 0 16px",
            }}
          >
            Revisa los datos antes de activar tu publicación en VMC Subastas.
          </div>
          {/* Concorde's own primary button; the reel only lends it the heartbeat. */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Latido retraso={14}>
              <Button variant="primary">¡Publica ahora!</Button>
            </Latido>
          </div>
        </div>

        {/* From here down it is the real detail page */}
        <AuctionStatus
          variant="negotiable"
          title={auto}
          subtitle={`Vendedor: ${vendedor}`}
        />
        <CardViewer variant="negotiable" images={imgs} imageAlt={auto} />

        <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
          <DetailCard
            className="dt-detail-m"
            variant="negotiable"
            day={dia}
            time={hora}
            title={auto}
          />
          <div
            style={{
              width: 388,
              boxSizing: "border-box",
              padding: "12px 16px",
              background: "#FFFFFF",
              borderRadius: 8,
              boxShadow: "rgba(0,0,0,0.1) 0px 0px 16px 4px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {DETALLE_PILLS.negotiable.map((p) => (
              <ConditionPill key={p.label} className="dt-pill-m" variant={p.tone}>
                {p.label}
              </ConditionPill>
            ))}
          </div>
          <Accordion title="INFORMACIÓN GENERAL" />
          <Accordion title="CONDICIONES DE OFRECIMIENTO" />
        </div>
      </div>
    </div>
  );
};
