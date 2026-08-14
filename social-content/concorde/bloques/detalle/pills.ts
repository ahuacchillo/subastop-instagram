/**
 * Condition pills del bloque Detalle según la variante de la oferta.
 * Módulo PLANO (sin "use client") para que desktop y mobile lo compartan.
 *   · live       → 4 condiciones, todas incluidas (filled)
 *   · negotiable → 3 condiciones: «Con Fee de Habilitación» (filled) +
 *                  «Sin…» no incluidas (outline)
 */

export type DetalleVariant = "live" | "negotiable";
export type DetallePill = { label: string; tone?: "filled" | "outline" };

export const DETALLE_PILLS: Record<DetalleVariant, DetallePill[]> = {
  live: [
    { label: "Con Precio Reserva" },
    { label: "Con Opción a Visitas" },
    { label: "Con Comisión" },
    { label: "Cuota mínima de 2 participantes" },
  ],
  negotiable: [
    { label: "Con Fee de Habilitación" },
    { label: "Sin Opción a Visitas", tone: "outline" },
    { label: "Sin Comisión", tone: "outline" },
  ],
};
