import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { mono, sans, vy } from "../brand/vmc";
import {
  Bajada,
  Boton,
  BotonPlano,
  Chip,
  Coin,
  Escena,
  Fondo,
  Monto,
  Paso,
  Pestania,
  TextoMarca,
  TextoModal,
  Titular,
  TituloModal,
  Vidrio,
  useConteo,
  useEntrada,
} from "./ui";
import {
  BarraVistaPrevia,
  Formulario,
  Modal,
  PreviewAuto,
  TarjetaLive,
} from "./pantallas";

// ═════════════════════════════════════════════════════════════════════════════
// Reel: the Negociable format as the seller sees it — 260×411, 25s.
//
// "Publica, recibe ofertas y vende al mejor postor". The reel follows the app's
// real path screen by screen: fill the form, check the preview, pay 25
// SubasCoins, the offer goes up, the proposals arrive.
//
// The buyer is the one who negotiates, but the one who needs convincing is the
// seller. That is why what repeats on screen is the cost (>S< 25, once) and the
// commission (>S< 0, always).
//
// Scenes are pinned by frame in `GUION` rather than chained, so one can be
// lengthened without recomputing all the others by hand.
// ═════════════════════════════════════════════════════════════════════════════

export type ReelNegociable = {
  placa: string;
  marca: string;
  modelo: string;
  anio: string;
  kilometraje: string;
  /** What the seller hopes to get. Comma-formatted, without the "US$". */
  expectativa: string;
  /** Path inside `public/` to the cover photo. */
  foto: string;
  vendedor: string;
  /** SubasCoins it costs to activate the listing. */
  costo: string;
  /** The proposal arriving from the buyer. */
  oferta: string;
  dia: string;
  hora: string;
  expiraOferta: string;
  /** Negotiation rounds per offer. The system allows 5. */
  rondas: number;
};

export const NEGOCIABLE: ReelNegociable = {
  placa: "BAW-302",
  marca: "Suzuki",
  modelo: "Baleno",
  anio: "2020",
  kilometraje: "45,000",
  expectativa: "12,000",
  foto: "autos/63008-suzuki-baleno-1.jpeg",
  vendedor: "SubasCars",
  costo: "25",
  oferta: "11,800",
  dia: "LUNES 04",
  hora: "11:11 pm",
  expiraOferta: "72 horas",
  rondas: 5,
};

const GUION = {
  hook: [0, 105],
  publica: [105, 105],
  previa: [210, 90],
  confirma: [300, 90],
  activada: [390, 75],
  publicada: [465, 105],
  propuesta: [570, 105],
  cierre: [675, 90],
} as const;

export const DURACION_NEGOCIABLE = GUION.cierre[0] + GUION.cierre[1];

const PASOS = 5;

/** Step-scene frame: header on top, the product screen centred below. */
const EscenaPaso: React.FC<{
  paso: number;
  titulo: React.ReactNode;
  bajada?: React.ReactNode;
  children: React.ReactNode;
}> = ({ paso, titulo, bajada, children }) => (
  <AbsoluteFill
    style={{
      padding: "26px 18px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    }}
  >
    <Paso n={paso} de={PASOS} />
    <div style={{ height: 8 }} />
    <Titular>{titulo}</Titular>
    {bajada ? (
      <>
        <div style={{ height: 5 }} />
        <Bajada>{bajada}</Bajada>
      </>
    ) : null}
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={useEntrada(10)}>{children}</div>
    </div>
  </AbsoluteFill>
);

const Logo: React.FC<{ ancho?: number }> = ({ ancho = 118 }) => (
  <Img
    src={staticFile("brand/vmc-logo.svg")}
    style={{ width: ancho, height: (ancho * 67) / 180 }}
  />
);

// ── Scenes ───────────────────────────────────────────────────────────────────

/** A row of the hook's summary: label left, value right. */
const FilaFicha: React.FC<{
  etiqueta: string;
  valor: React.ReactNode;
  ultima?: boolean;
}> = ({ etiqueta, valor, ultima = false }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 14px",
      borderBottom: ultima ? "none" : "1px solid rgba(255,255,255,0.14)",
      fontFamily: sans,
      fontWeight: 600,
      fontSize: 9.5,
      color: "#FFFFFF",
    }}
  >
    <span>{etiqueta}</span>
    {valor}
  </div>
);

/**
 * Opening.
 *
 * The seller's objection is not "does it work?", it is "what will you charge
 * me?". So the hook is the full arithmetic before any explanation: 25
 * SubasCoins once, 0 commission, and the market sets the price.
 */
const Hook: React.FC<{ d: ReelNegociable }> = ({ d }) => {
  const f = useCurrentFrame();
  const tipeando = f >= 44;
  const valor = useConteo(Number(d.expectativa.replace(/,/g, "")), 0, 44, 22);
  return (
    <AbsoluteFill
      style={{ padding: "34px 22px 26px", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo ancho={62} />
        <Chip punto>OFERTA NEGOCIABLE</Chip>
      </div>

      <div style={{ height: 26 }} />

      <Titular tam={29} retraso={5}>
        Publica tu auto.
        <br />
        Recibe ofertas.
      </Titular>
      {/* A single line, so the brand gradient runs whole and never dies midway. */}
      <div style={{ ...useEntrada(11), marginTop: 3 }}>
        <TextoMarca tam={20}>Vende al mejor postor.</TextoMarca>
      </div>

      <div style={{ height: 20 }} />

      <div style={useEntrada(17)}>
        <Vidrio estilo={{ overflow: "hidden" }}>
          <FilaFicha
            etiqueta="Publicar tu oferta"
            valor={<Coin n={d.costo} color={vy.teal300} />}
          />
          <FilaFicha
            etiqueta="Comisión al vender"
            valor={<Coin n="0" color={vy.teal300} />}
          />
          <FilaFicha
            etiqueta="Tu expectativa"
            ultima
            valor={
              <span
                style={{
                  fontFamily: mono,
                  fontWeight: 700,
                  fontSize: 14,
                  color: tipeando ? vy.teal300 : "rgba(255,255,255,0.35)",
                }}
              >
                US$ {tipeando ? valor : "0"}
              </span>
            }
          />
        </Vidrio>
      </div>

      <div style={{ flex: 1 }} />

      <Bajada retraso={24}>
        Un solo pago hasta que lo vendas.
        <br />
        Así se publica, paso por paso.
      </Bajada>
    </AbsoluteFill>
  );
};

const Publica: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <EscenaPaso
    paso={1}
    titulo={<>Completa la ficha</>}
    bajada={<>Placa, marca, año y tu expectativa de venta.</>}
  >
    <Formulario
      placa={d.placa}
      marca={d.marca}
      modelo={d.modelo}
      anio={d.anio}
      kilometraje={`${d.kilometraje} km`}
      expectativa={`US$ ${d.expectativa}`}
    />
  </EscenaPaso>
);

const VistaPrevia: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <EscenaPaso
    paso={2}
    titulo={<>Revisa cómo se verá</>}
    bajada={<>Lo mismo que va a ver el comprador.</>}
  >
    <div style={{ display: "flex", flexDirection: "column" }}>
      <BarraVistaPrevia />
      <PreviewAuto
        foto={d.foto}
        auto={`${d.marca} ${d.modelo} ${d.anio}`}
        vendedor={d.vendedor}
      />
    </div>
  </EscenaPaso>
);

const Confirma: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <EscenaPaso
    paso={3}
    titulo={<>Activa tu oferta</>}
    bajada={<>Un solo pago. No se cobra nada al vender.</>}
  >
    <Modal icono="monedas">
      <TituloModal>CONFIRMA TU PUBLICACIÓN</TituloModal>
      <TextoModal>
        Se usarán {d.costo} SubasCoins de tu cuenta para activar esta oferta.
      </TextoModal>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "2px 4px",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontFamily: sans,
            fontWeight: 500,
            fontSize: 9.5,
            color: vy.gris,
          }}
        >
          Costo de activación
        </span>
        <Coin n={d.costo} />
      </div>
      <Boton ancho={128} retraso={16} pulso>
        Confirmar
      </Boton>
      <BotonPlano ancho={128} retraso={20}>
        Cancelar
      </BotonPlano>
    </Modal>
  </EscenaPaso>
);

/** The system's acknowledgement. A short scene: the breath between paying and being up. */
const Activada: React.FC = () => {
  const f = useCurrentFrame();
  const cuenta = Math.max(0, 59 - Math.floor(f / 3));
  return (
    <AbsoluteFill
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div style={{ position: "absolute", top: 34 }}>
        <Chip punto>OFERTA ACTIVADA</Chip>
      </div>
      <Modal icono="campana">
        <TituloModal>PAY2OFFER ACTIVADO</TituloModal>
        <div
          style={{
            fontFamily: sans,
            fontWeight: 600,
            fontSize: 10,
            color: vy.violeta,
          }}
        >
          Tu Oferta fue creada exitosamente
        </div>
        <div
          style={{ fontFamily: sans, fontWeight: 500, fontSize: 8.5, color: vy.gris }}
        >
          Serás redirigido al inicio en{" "}
          <span style={{ color: vy.tinta, fontWeight: 700 }}>{cuenta}s</span>
        </div>
        <Boton ancho={128} retraso={10}>
          Ir al inicio ahora
        </Boton>
      </Modal>
    </AbsoluteFill>
  );
};

/**
 * Published.
 *
 * Careful with the copy: "en vivo" is a different VMC offer format, not this
 * one. Here the offer is published and left open to proposals — saying it
 * "goes live" would blur two separate products together.
 *
 * The counters climb during the scene. It is the only honest way to show
 * "recibe ofertas" without inventing a number: you see the movement, not the
 * figure.
 */
const Publicada: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <EscenaPaso
    paso={4}
    titulo={<>Tu auto se publica</>}
    bajada={<>Compradores verificados lo ven y te proponen.</>}
  >
    <TarjetaLive
      dia={d.dia}
      hora={d.hora}
      vistas={useConteo(214, 11, 14, 60)}
      favoritos={useConteo(38, 2, 14, 60)}
      propuestas={useConteo(7, 0, 20, 60)}
      boton="Negocia ahora"
    />
  </EscenaPaso>
);

const Propuesta: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <EscenaPaso
    paso={5}
    titulo={<>Llega la propuesta</>}
    bajada={<>Acepta, rechaza o contrapropón. Hasta {d.rondas} rondas.</>}
  >
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Pestania>Propuesta 1/{d.rondas}</Pestania>
      <Modal icono="billetera">
        <TituloModal>PROPUESTA RECIBIDA</TituloModal>
        <Monto valor={d.oferta} />
        <TextoModal>Expira en {d.expiraOferta}</TextoModal>
        <Boton ancho={128} retraso={14} pulso>
          Aceptar
        </Boton>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "2px 6px 0",
            boxSizing: "border-box",
            fontFamily: sans,
            fontWeight: 700,
            fontSize: 10,
            color: vy.tinta,
            textDecoration: "underline",
          }}
        >
          <span>Rechazar</span>
          <span>Contraproponer</span>
        </div>
      </Modal>
    </div>
  </EscenaPaso>
);

const Cierre: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <AbsoluteFill
    style={{ padding: "34px 22px 30px", display: "flex", flexDirection: "column" }}
  >
    <Chip>VENDE HOY</Chip>
    <div style={{ height: 18 }} />
    <Titular tam={29} retraso={4}>
      Un solo pago.
    </Titular>
    <div style={{ ...useEntrada(8), marginTop: 3 }}>
      <TextoMarca tam={20}>Vende al mejor postor.</TextoMarca>
    </div>

    <div style={{ height: 22 }} />

    <div style={useEntrada(14)}>
      <Vidrio
        estilo={{
          padding: "16px 16px 18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 11,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: sans,
            fontWeight: 600,
            fontSize: 9,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          <span>
            Publicar <Coin n={d.costo} color={vy.teal300} tam={9} />
          </span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>
            Comisión <Coin n="0" color={vy.teal300} tam={9} />
          </span>
        </div>
        <Boton tono="naranja" ancho={150} alto={30} retraso={20} pulso>
          ¡Publica ahora!
        </Boton>
      </Vidrio>
    </div>

    <div style={{ flex: 1 }} />

    <div style={{ ...useEntrada(26), alignSelf: "center" }}>
      <Logo ancho={112} />
    </div>
  </AbsoluteFill>
);

// ── Composition ──────────────────────────────────────────────────────────────

export const ReelNegociableVideo: React.FC<{ d: ReelNegociable }> = ({ d }) => (
  <AbsoluteFill>
    <Fondo />
    <Escena de={GUION.hook[0]} dura={GUION.hook[1]}>
      <Hook d={d} />
    </Escena>
    <Escena de={GUION.publica[0]} dura={GUION.publica[1]}>
      <Publica d={d} />
    </Escena>
    <Escena de={GUION.previa[0]} dura={GUION.previa[1]}>
      <VistaPrevia d={d} />
    </Escena>
    <Escena de={GUION.confirma[0]} dura={GUION.confirma[1]}>
      <Confirma d={d} />
    </Escena>
    <Escena de={GUION.activada[0]} dura={GUION.activada[1]}>
      <Activada />
    </Escena>
    <Escena de={GUION.publicada[0]} dura={GUION.publicada[1]}>
      <Publicada d={d} />
    </Escena>
    <Escena de={GUION.propuesta[0]} dura={GUION.propuesta[1]}>
      <Propuesta d={d} />
    </Escena>
    <Escena de={GUION.cierre[0]} dura={GUION.cierre[1]}>
      <Cierre d={d} />
    </Escena>
  </AbsoluteFill>
);
