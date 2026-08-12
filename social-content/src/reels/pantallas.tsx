import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { sans, vy, vyGradient } from "../brand/vmc";
import { Boton, CerrarX, Tarjeta, TextoModal } from "./ui";

// ═════════════════════════════════════════════════════════════════════════════
// Pantallas del producto reconstruidas para el reel.
//
// Son las superficies que el usuario reconoce de la app: el formulario de
// publicación, la vista previa, la tarjeta de la oferta publicada y el modal.
// Todo lo que cambia entre escenas entra por props; el reel no dibuja cajas.
// ═════════════════════════════════════════════════════════════════════════════

const Subrayado: React.FC<{ ancho: number }> = ({ ancho }) => (
  <div
    style={{
      width: ancho,
      height: 1,
      background: "rgba(255,255,255,0.45)",
      marginTop: 4,
    }}
  />
);

const Contador: React.FC<{ icono: React.ReactNode; n: string; alRevés?: boolean }> = ({
  icono,
  n,
  alRevés = false,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 5,
      flexDirection: alRevés ? "row-reverse" : "row",
    }}
  >
    <span style={{ fontFamily: sans, fontWeight: 600, fontSize: 10, color: "#FFF" }}>
      {n}
    </span>
    <div
      style={{
        width: 19,
        height: 19,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icono}
    </div>
  </div>
);

const Ojo = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFF">
    <path d="M12 5C6 5 2 12 2 12s4 7 10 7 10-7 10-7-4-7-10-7zm0 11a4 4 0 110-8 4 4 0 010 8z" />
  </svg>
);

const Chat = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFF">
    <rect x="2" y="4" width="13" height="10" rx="2" />
    <rect x="9" y="10" width="13" height="10" rx="2" />
  </svg>
);

const Corazon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 20s-7-4.6-7-9.4A4.1 4.1 0 0112 8a4.1 4.1 0 017 2.6C19 15.4 12 20 12 20z"
      stroke={vy.violeta}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * La tarjeta de la oferta publicada: cuándo cierra, cuánta gente la está
 * mirando y el botón desde el que el comprador abre la negociación.
 */
export const TarjetaLive: React.FC<{
  dia: string;
  hora: string;
  vistas: string;
  favoritos: string;
  propuestas: string;
  boton: string;
  nota?: string;
  pulso?: boolean;
}> = ({
  dia,
  hora,
  vistas,
  favoritos,
  propuestas,
  boton,
  nota = "Aprovecha esta oportunidad y haz una propuesta al vendedor.",
  pulso = true,
}) => (
  <Tarjeta>
    <div
      style={{
        position: "relative",
        height: 92,
        background: vyGradient.header,
        padding: "12px 14px 0",
        boxSizing: "border-box",
        color: "#FFFFFF",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 9, opacity: 0.85 }}>
            Cierra
          </div>
          <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 13 }}>{dia}</div>
          <Subrayado ancho={52} />
        </div>
        <div style={{ textAlign: "right", paddingTop: 12 }}>
          <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 13 }}>{hora}</div>
          <Subrayado ancho={52} />
        </div>
      </div>

      {/* El corazón vive encima de la línea divisoria, no dentro de una columna. */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 26,
          transform: "translateX(-50%)",
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 2px 8px rgba(20,0,70,0.35)",
        }}
      >
        {Corazon}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Contador icono={Ojo} n={vistas} />
        <span style={{ fontFamily: sans, fontWeight: 600, fontSize: 10 }}>
          {favoritos}
        </span>
        <Contador icono={Chat} n={propuestas} alRevés />
      </div>
    </div>

    <div
      style={{
        height: 36,
        background: vyGradient.banner,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 16px",
        fontFamily: sans,
        fontWeight: 700,
        fontSize: 10,
        lineHeight: 1.2,
        color: "#FFFFFF",
      }}
    >
      ¡Aprende a negociar con Subastin!
    </div>

    <div
      style={{
        padding: "12px 16px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 9,
      }}
    >
      <TextoModal>{nota}</TextoModal>
      <Boton tono="teal" ancho={128} alto={27} pulso={pulso} retraso={6}>
        {boton}
      </Boton>
      <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 8.5, color: vy.tinta }}>
        Comisión &gt;S&lt; 0
      </div>
    </div>
  </Tarjeta>
);

/**
 * Shell del modal. El icono dice de qué habla la pantalla: monedas para plata
 * (publicar, proponer), billetera para una propuesta que llega, campana para
 * una notificación del sistema.
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

// ── Publicar ─────────────────────────────────────────────────────────────────

/**
 * Campo del formulario de publicación.
 *
 * `desde` es el frame en el que se "llena": antes muestra el placeholder gris,
 * después el valor. Encadenando `desde` campo a campo se ve a alguien
 * completando la ficha sin animar un cursor.
 */
const Campo: React.FC<{
  etiqueta: string;
  placeholder: string;
  valor: string;
  desde: number;
  lista?: boolean;
}> = ({ etiqueta, placeholder, valor, desde, lista = false }) => {
  const f = useCurrentFrame();
  const lleno = f >= desde;
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 6.5,
          color: vy.tinta,
          marginBottom: 3,
        }}
      >
        {etiqueta} <span style={{ color: vy.naranja600 }}>*</span>
      </div>
      <div
        style={{
          height: 17,
          borderRadius: 5,
          border: `1px solid ${lleno ? vy.violeta : "rgba(132,96,229,0.35)"}`,
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 6px",
          fontFamily: sans,
          fontWeight: lleno ? 600 : 500,
          fontSize: 7,
          color: lleno ? vy.tinta : vy.gris,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <span>{lleno ? valor : placeholder}</span>
        {lista ? (
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke={vy.violeta}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        ) : null}
      </div>
    </div>
  );
};

/** La ficha que llena el vendedor. Es el paso más largo de la app y el más corto del reel. */
export const Formulario: React.FC<{
  placa: string;
  marca: string;
  modelo: string;
  anio: string;
  kilometraje: string;
  expectativa: string;
}> = ({ placa, marca, modelo, anio, kilometraje, expectativa }) => (
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
      Perfil del vehículo
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 9 }}>
        <Campo etiqueta="Placa" placeholder="ABC123" valor={placa} desde={6} />
        <Campo
          etiqueta="Marca"
          placeholder="Selecciona marca"
          valor={marca}
          desde={12}
          lista
        />
      </div>
      <div style={{ display: "flex", gap: 9 }}>
        <Campo
          etiqueta="Año"
          placeholder="Selecciona año"
          valor={anio}
          desde={18}
          lista
        />
        <Campo
          etiqueta="Modelo"
          placeholder="Selecciona modelo"
          valor={modelo}
          desde={24}
          lista
        />
      </div>
      <div style={{ display: "flex", gap: 9 }}>
        <Campo
          etiqueta="Kilometraje"
          placeholder="Ej: 45,000"
          valor={kilometraje}
          desde={30}
        />
        <Campo
          etiqueta="Expectativa (USD)"
          placeholder="Ej: 12000"
          valor={expectativa}
          desde={36}
        />
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "center", marginTop: 13 }}>
      <Boton ancho={92} alto={22} tam={9.5} retraso={42} pulso>
        Sigamos
      </Boton>
    </div>
  </Tarjeta>
);

/**
 * La barra de vista previa: el último paso antes de que la oferta salga en vivo.
 *
 * Es la única superficie de la app con botón naranja. Ese naranja es el que
 * cierra la publicación, y por eso el reel lo muestra solo aquí.
 */
export const BarraVistaPrevia: React.FC = () => (
  <div
    style={{
      width: 200,
      borderRadius: "11px 11px 0 0",
      background: vyGradient.header,
      padding: "10px 12px 12px",
      boxSizing: "border-box",
      color: "#FFFFFF",
      boxShadow: "0px 10px 30px rgba(20,0,70,0.45)",
    }}
  >
    <div
      style={{
        position: "relative",
        display: "inline-block",
        padding: "2px 8px 3px",
        borderRadius: 999,
        background: vyGradient.chipPaso,
        border: "1px solid rgba(255,255,255,0.45)",
        fontFamily: sans,
        fontWeight: 700,
        fontSize: 6.5,
        letterSpacing: 0.8,
      }}
    >
      ÚLTIMO PASO
    </div>
    <div
      style={{
        fontFamily: sans,
        fontWeight: 700,
        fontSize: 11.5,
        marginTop: 6,
      }}
    >
      Vista previa de tu Oferta
    </div>
    <div
      style={{
        fontFamily: sans,
        fontWeight: 500,
        fontSize: 7,
        color: "rgba(255,255,255,0.72)",
        marginTop: 2,
      }}
    >
      Revisa los datos antes de activar tu publicación.
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 9,
      }}
    >
      <span
        style={{
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 8,
          textDecoration: "underline",
        }}
      >
        Editar mi oferta
      </span>
      <Boton tono="naranja" ancho={86} alto={22} tam={9} retraso={8} pulso>
        ¡Publica ahora!
      </Boton>
    </div>
  </div>
);

/** La foto del auto con su franja teal, tal como se ve en la vista previa. */
export const PreviewAuto: React.FC<{
  foto: string;
  auto: string;
  vendedor: string;
}> = ({ foto, auto, vendedor }) => (
  <div
    style={{
      width: 200,
      borderRadius: "0 0 11px 11px",
      overflow: "hidden",
      boxShadow: "0px 10px 30px rgba(20,0,70,0.45)",
    }}
  >
    <div
      style={{
        background: vyGradient.banner,
        padding: "6px 10px 7px",
        color: "#FFFFFF",
        fontFamily: sans,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 10 }}>{auto}</div>
      <div style={{ fontWeight: 500, fontSize: 7, opacity: 0.85 }}>
        Vendedor: {vendedor}
      </div>
    </div>
    <Img
      src={staticFile(foto)}
      style={{ width: 200, height: 94, objectFit: "cover", display: "block" }}
    />
  </div>
);
