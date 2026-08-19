/**
 * DetalleMobile — Bloque de Concorde (Voyager DS)
 *
 * Página de detalle · mobile (420 de ancho). Estructura:
 *   · Header 420×64 (Button «Ingresa»)
 *   · AuctionStatus + CardViewer a TODO el ancho (carro + filmstrip)
 *   · Contenido a 16px de margen (388 de ancho):
 *       - DetailCard (388×390 — más ancho que en desktop, mismo alto)
 *       - ConditionPills (card 388×132)
 *       - Accordions (388×66 cada uno)
 */

"use client";

import { useState } from "react";
import type { JSX } from "react";
import AppHeader from "../../header/desktop/Header";
import AuctionStatus from "../../../components/AuctionStatus";
import CardViewer from "../../../components/CardViewer";
import DetailCard from "../../../components/DetailCard";
import ConditionPill from "../../../components/ConditionPill";
import Accordion from "../../../components/Accordion";
import CardTitle from "../../../components/CardTitle";
import OfferCard from "../../../components/OfferCard";
import Button, { CalendarIcon } from "../../../components/Button";
import SidebarMobile, { SidebarMenuButton } from "../../sidebar/mobile/SidebarMobile";
import { DETALLE_PILLS, type DetalleVariant } from "../pills";

import { DETALLE_MOBILE_WIDTH, DETALLE_MOBILE_HEIGHT } from "./dimensions";
export { DETALLE_MOBILE_WIDTH, DETALLE_MOBILE_HEIGHT } from "./dimensions";

const DETALLE_IMAGES = Array.from({ length: 8 }, function img() { return "/demo/bronco.jpg"; });

// Overrides puntuales: DetailCard a 388, pills que llenan su columna y las
// OfferCards short más grandes (170×210, imagen 152) para el grid de ofertas.
const MOBILE_STYLES = `
.dt-detail-m.pdetail { width: 388px; max-width: 388px; min-height: 390px; }
.pcondpill.dt-pill-m { width: 100%; box-sizing: border-box; padding-left: 12px; padding-right: 12px; font-size: 13px; line-height: 15px; }
.pcondpill.dt-pill-m.dt-pill-c { grid-column: 1 / -1; justify-self: center; width: 170px; }
.pcard--short.dt-card-lg { width: 170px; height: 210px; }
.pcard--short.dt-card-lg .pcard__img { height: 152px; }
`;

// Título del accordion VISITAS · dot verde + texto
const VISITAS_TITLE = (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2DBE64", flexShrink: 0 }} />
    VISITAS
  </span>
);

export interface DetalleMobileProps {
  /** Variante de la oferta — controla AuctionStatus/CardViewer/DetailCard y los pills. */
  variant?: DetalleVariant;
  className?: string;
  /** Alto del marco para previsualizaciones (px). En producción se omite. Ver `SidebarMobile`. */
  frameHeight?: number;
}

export default function DetalleMobile({ variant = "live", className = "", frameHeight }: DetalleMobileProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  const page = (
    <div
      className={className}
      data-block="detalle-mobile"
      style={{
        position: "relative",
        width: DETALLE_MOBILE_WIDTH,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--vmc-font-display, 'Plus Jakarta Sans', -apple-system, sans-serif)",
      }}
    >
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: MOBILE_STYLES }} />

      {/* Header 420×64 · hamburguesa + logo de la marca a la izquierda */}
      <AppHeader
        width={DETALLE_MOBILE_WIDTH}
        logo={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SidebarMenuButton onClick={() => setMenuOpen(true)} expanded={menuOpen} />
            <img src="/logo-preview.png" alt="VMC Subastas" style={{ height: 26, width: "auto", display: "block" }} />
          </div>
        }
      />

      {/* AuctionStatus + CardViewer · a todo el ancho (carro + filmstrip) */}
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <AuctionStatus variant={variant} />
        <CardViewer images={DETALLE_IMAGES} variant={variant} />
      </div>

      {/* Contenido a 16px de margen (388 de ancho) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        {/* DetailCard 388×390 */}
        <DetailCard variant={variant} className="dt-detail-m" />

        {/* ConditionPills · card 388×132 (cambian según variante) */}
        <div
          style={{
            width: 388,
            boxSizing: "border-box",
            padding: "12px 16px",
            background: "#ffffff",
            borderRadius: 8,
            boxShadow: "rgba(0,0,0,0.1) 0px 0px 16px 4px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 16,
            rowGap: 16,
          }}
        >
          {DETALLE_PILLS[variant].map(function renderPill(p, i, arr) {
            const lone = arr.length % 2 === 1 && i === arr.length - 1;
            return <ConditionPill key={i} className={`dt-pill-m${lone ? " dt-pill-c" : ""}`} variant={p.tone}>{p.label}</ConditionPill>;
          })}
        </div>

        {/* Accordions 388×66 */}
        <Accordion title="INFORMACIÓN GENERAL" />
        <Accordion title="CONDICIONES DE OFRECIMIENTO" />
        <Accordion title={VISITAS_TITLE}>
          <p style={{ margin: 0, fontSize: 12, lineHeight: "16px", color: "#191C1C", textAlign: "left" }}>
            Las visitas son previa cita y se te proporcionará la ubicación exacta después de que agendes tu visita.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
            <Button variant="secondary-sm" icon={<CalendarIcon />}>Agenda tu visita</Button>
          </div>
        </Accordion>

        {/* OFERTAS RELACIONADAS · card 388×524 con CardTitle + grid 2×2 de
            OfferCards short grandes (170×210, grid 356×436). */}
        <div
          style={{
            width: 388,
            height: 524,
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
              gridTemplateColumns: "170px 170px",
              gap: 16,
              justifyContent: "space-between",
              marginTop: 24,
            }}
          >
            <OfferCard size="short" className="dt-card-lg" variant="live" name="Audi Q3" year={2026} price="US$ 14,999" imageSrc="/demo/bronco.jpg" elevated />
            <OfferCard size="short" className="dt-card-lg" variant="live" name="Audi Q3" year={2026} price="US$ 14,999" imageSrc="/demo/bronco.jpg" elevated />
            <OfferCard size="short" className="dt-card-lg" variant="negotiable" name="Audi Q3" year={2026} imageSrc="/demo/bronco.jpg" elevated />
            <OfferCard size="short" className="dt-card-lg" variant="negotiable" name="Audi Q3" year={2026} imageSrc="/demo/bronco.jpg" elevated />
          </div>
        </div>

        {/* Secondary Banner · placeholder 387×230 */}
        <div
          data-slot="secondary-banner"
          style={{
            width: 387,
            height: 230,
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
          SECONDARY BANNER
        </div>
      </div>
    </div>
  );

  return (
    <SidebarMobile open={menuOpen} onOpenChange={setMenuOpen} frameHeight={frameHeight}>
      {page}
    </SidebarMobile>
  );
}
