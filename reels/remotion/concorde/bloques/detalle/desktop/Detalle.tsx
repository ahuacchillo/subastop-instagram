/**
 * Detalle — Bloque de Concorde (Voyager DS)
 *
 * Página de detalle. Por ahora es solo el lienzo base: un fondo blanco de
 * 799 × 1483. Iremos montando las secciones encima.
 */

import type { JSX } from "react";
import AuctionStatus from "../../../components/AuctionStatus";
import CardViewer from "../../../components/CardViewer";
import Accordion from "../../../components/Accordion";
import DetailCard from "../../../components/DetailCard";
import ConditionPill from "../../../components/ConditionPill";
import Button, { CalendarIcon } from "../../../components/Button";
import CardTitle from "../../../components/CardTitle";
import OfferCard from "../../../components/OfferCard";
import { DETALLE_PILLS, type DetalleVariant } from "../pills";

// Título del accordion VISITAS · dot verde + texto (CardTitle acepta nodos)
const VISITAS_TITLE = (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2DBE64", flexShrink: 0 }} />
    VISITAS
  </span>
);

// Cada ConditionPill mide 136×46 fijo (hug del Figma), no se estira. Padding
// lateral 10px y texto 12px/14px para que las etiquetas largas (p.ej. «Cuota
// mínima de 2 participantes») entren en ese ancho. `.pcondpill.dt-pill` gana en
// especificidad al `.pcondpill` base.
const DETALLE_PILL_STYLES = `
.pcondpill.dt-pill { width: 136px; box-sizing: border-box; padding-left: 10px; padding-right: 10px; font-size: 12px; line-height: 14px; }
/* Pill solitaria en fila impar (3 pills) → centrada */
.pcondpill.dt-pill.dt-pill-c { grid-column: 1 / -1; justify-self: center; }
`;

const DETALLE_IMAGES = Array.from({ length: 8 }, function img() { return "/demo/bronco.jpg"; });

export interface DetalleProps {
  /** Variante de la oferta — controla AuctionStatus/CardViewer/DetailCard y los pills. */
  variant?: DetalleVariant;
  className?: string;
}

import { DETALLE_WIDTH, DETALLE_HEIGHT } from "./dimensions";
export { DETALLE_WIDTH, DETALLE_HEIGHT } from "./dimensions";

export default function Detalle({ variant = "live", className = "" }: DetalleProps): JSX.Element {
  return (
    <div
      className={className}
      data-block="detalle"
      style={{
        position: "relative",
        width: DETALLE_WIDTH,
        height: DETALLE_HEIGHT,
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Fila de 2 columnas alineadas por arriba (top 16). El AuctionStatus (header
          del carro) va DENTRO de la columna izquierda, pegado al CardViewer, así su
          top coincide con el del DetailCard de la derecha (ambas columnas empiezan
          a la misma altura). */}
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: DETALLE_PILL_STYLES }} />
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* Columna izquierda */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 443 }}>
          {/* AuctionStatus pegado encima del CardViewer (sin gap) */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <AuctionStatus variant={variant} />
            <CardViewer images={DETALLE_IMAGES} variant={variant} />
          </div>
          <Accordion title="INFORMACIÓN GENERAL" />
          <Accordion title="CONDICIONES DE OFRECIMIENTO" />
        </div>

        {/* Columna derecha */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 311 }}>
          <DetailCard variant={variant} />

          {/* Card de fondo (311×132) con las ConditionPills (cambian según variante) */}
          <div
            style={{
              width: 311,
              boxSizing: "border-box",
              padding: 12,
              background: "#ffffff",
              borderRadius: 8,
              boxShadow: "rgba(0,0,0,0.1) 0px 0px 16px 4px",
              display: "grid",
              gridTemplateColumns: "136px 136px",
              justifyContent: "space-between",
              rowGap: 16,
            }}
          >
            {DETALLE_PILLS[variant].map(function renderPill(p, i, arr) {
              const lone = arr.length % 2 === 1 && i === arr.length - 1;
              return <ConditionPill key={i} className={`dt-pill${lone ? " dt-pill-c" : ""}`} variant={p.tone}>{p.label}</ConditionPill>;
            })}
          </div>

          {/* Subascoins Banner · placeholder 311 × 112 */}
          <div
            data-slot="subascoins-banner"
            style={{
              width: 311,
              height: 112,
              boxSizing: "border-box",
              borderRadius: 8,
              background: "#E9EAEC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: "0.08em",
              color: "#9AA1AC",
            }}
          >
            SUBASCOINS BANNER
          </div>

          {/* Accordion VISITAS (abierto) · texto + Button «Agenda tu visita» (secondary-sm) */}
          <Accordion title={VISITAS_TITLE} defaultOpen>
            <p style={{ margin: 0, fontSize: 12, lineHeight: "16px", color: "#191C1C", textAlign: "left" }}>
              Las visitas son previa cita y se te proporcionará la ubicación exacta después de que agendes tu visita.
            </p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
              <Button variant="secondary-sm" icon={<CalendarIcon />}>Agenda tu visita</Button>
            </div>
          </Accordion>

          {/* OFERTAS RELACIONADAS · card 311×436 con CardTitle (200×32) + grid 2×2
              de OfferCards short (el grid ocupa 279×348). */}
          <div
            style={{
              width: 311,
              boxSizing: "border-box",
              background: "#ffffff",
              borderRadius: 8,
              boxShadow: "rgba(0,0,0,0.1) 0px 0px 16px 4px",
              padding: 16,
            }}
          >
            <CardTitle title="OFERTAS RELACIONADAS" subtitle="" titleSize={14} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "134px 134px",
                justifyContent: "space-between",
                rowGap: 8,
                marginTop: 24,
              }}
            >
              <OfferCard size="short" variant="live" name="Audi Q3" year={2026} price="US$ 14,999" imageSrc="/demo/bronco.jpg" elevated />
              <OfferCard size="short" variant="live" name="Audi Q3" year={2026} price="US$ 14,999" imageSrc="/demo/bronco.jpg" elevated />
              <OfferCard size="short" variant="negotiable" name="Audi Q3" year={2026} imageSrc="/demo/bronco.jpg" elevated />
              <OfferCard size="short" variant="negotiable" name="Audi Q3" year={2026} imageSrc="/demo/bronco.jpg" elevated />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Banner 766 × 100 · a 16px del bottom, centrado horizontalmente */}
      <div
        data-slot="secondary-banner"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 16,
          transform: "translateX(-50%)",
          width: 766,
          height: 100,
          borderRadius: 8,
          background: "#E9EAEC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontSize: 12,
          letterSpacing: "0.08em",
          color: "#9AA1AC",
        }}
      >
        SECONDARY BANNER
      </div>
    </div>
  );
}
