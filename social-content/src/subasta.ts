// ─────────────────────────────────────────────────────────────────────────────
// La subasta que se está armando ahora mismo.
//
// Es lo ÚNICO que se edita para publicar un carrusel nuevo: se cambian los
// datos, se dejan las fotos en `public/autos/` y se renderiza. Ningún
// componente tiene texto quemado.
// ─────────────────────────────────────────────────────────────────────────────

export type Subasta = {
  /** Marca — es el título con degradado. Solo sale en la primera foto. */
  marca: string;
  /** Versión/modelo — sale encima de la marca, en blanco. */
  modelo: string;
  /** Año en formato corto de la tarjeta: 19' */
  anio: string;
  transmision: string;
  /** Ya formateado, con moneda: la tarjeta no calcula nada. */
  precioBase: string;
  fecha: string;
  hora: string;
  /** Tienda oficial que vende. La inicial va en el avatar. */
  tienda: string;
  /**
   * Rutas dentro de `public/`. El orden es el orden del carrusel.
   * La primera es la portada: es la única que lleva marca y modelo.
   */
  fotos: string[];
};

export const SUBASTA: Subasta = {
  marca: "Toyota",
  modelo: "Fortuner",
  anio: "25'",
  transmision: "Mecánica",
  precioBase: "US$ 34,999",
  fecha: "10/08",
  hora: "1:35 pm",
  tienda: "Maquisistema",
  fotos: ["autos/toyota1.png", "autos/toyota2.png", "autos/toyota3.png"],
};
