import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";

/* ---------------------------------------------------------
   PIENSA EN ROSA — Prototipo de flujo de reserva (Clienta)
   Bienvenida → Datos → Día → Horario → Servicios → Confirmar → Éxito
--------------------------------------------------------- */

const LOGO_SRC = "data:image/jpeg;base64,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";

const COLORS = {
  bg: "#FBF3F0",
  card: "#FFFFFF",
  rosaClaro: "#F5D9DE",
  rosaEmpolvado: "#E8B9C3",
  rosaIntenso: "#C4506B",
  rosaIntensoHover: "#B03F5A",
  dorado: "#B08A54",
  textoOscuro: "#3F3835",
  textoSuave: "#8B7F7C",
  exito: "#CDE4C9",
  advertencia: "#FBEFD3",
  advertenciaBorde: "#E3C583",
  bordeSuave: "#F0DCE0",
  grisDeshabilitado: "#E8E2E0",
  error: "#F6D9DC",
  errorTexto: "#9C4A55",
};

/* ---------------------------------------------------------
   CONEXIÓN A SUPABASE (base de datos real)
--------------------------------------------------------- */
const SUPABASE_URL = "https://qyrfbmnixulrhsmykjcs.supabase.co";
const SUPABASE_KEY = "sb_publishable_oFiafKsvZZlk6xrr-4ITIw_bEipjgOd";

async function sb(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const texto = await res.text().catch(() => "");
    throw new Error(`Error de Supabase (${res.status}): ${texto}`);
  }
  const texto = await res.text();
  return texto ? JSON.parse(texto) : null;
}

/* ---------------------------------------------------------
   CATÁLOGO DE SERVICIOS
--------------------------------------------------------- */
const CATEGORIAS = [
  {
    nombre: "Cejas",
    servicios: [
      { id: "cej-1", nombre: "Perfilado de cejas", precio: 15000 },
      { id: "cej-2", nombre: "Bozo", precio: 8000 },
      { id: "cej-3", nombre: "Henna", precio: 18000 },
      { id: "cej-4", nombre: "Alisado / Laminado", precio: 15000 },
      { id: "cej-5", nombre: "Perfilado + Henna", precio: 28000 },
      { id: "cej-6", nombre: "Perfilado + Laminado", precio: 25000 },
      { id: "cej-7", nombre: "Perfilado + Laminado + Henna", precio: 38000 },
    ],
  },
  {
    nombre: "Pestañas",
    servicios: [
      { id: "pes-1", nombre: "Lifting de pestañas (botox + color)", precio: 30000 },
    ],
  },
  {
    nombre: "Extensiones Línea Clásica y Volumen",
    servicios: [
      { id: "ext-1", nombre: "Efecto Clásico", precio: 30000 },
      { id: "ext-2", nombre: "Volumen 2D y 3D", precio: 34000 },
      { id: "ext-3", nombre: "Volumen 4D, 5D y 6D", precio: 38000 },
      { id: "ext-4", nombre: "Volumen 7D, 8D, 9D y 10D", precio: 42000 },
      { id: "ext-5", nombre: "Mega Volumen", precio: 48000 },
      { id: "ext-6", nombre: "Remoción de extensiones", precio: 6000 },
    ],
  },
  {
    nombre: "Extensiones Tecnológicas",
    servicios: [
      { id: "tec-1", nombre: "Efecto Aurora", precio: 36000 },
      { id: "tec-2", nombre: "Efecto Hawaiano", precio: 36000 },
      { id: "tec-3", nombre: "Efecto Griego", precio: 38000 },
      { id: "tec-4", nombre: "Efecto Inglés", precio: 40000 },
    ],
  },
  {
    nombre: "Micropigmentación",
    servicios: [
      { id: "mic-1", nombre: "Microblading de cejas", precio: 90000 },
      { id: "mic-2", nombre: "Shading de cejas", precio: 120000 },
      { id: "mic-3", nombre: "Cejas Híbridas", precio: 130000 },
      { id: "mic-4", nombre: "Micropigmentación de labios", precio: 140000 },
      { id: "mic-5", nombre: "Delineado superior con diseño", precio: 130000 },
      { id: "mic-6", nombre: "Delineado superior simple", precio: 90000 },
      { id: "mic-7", nombre: "Delineado inferior", precio: 90000 },
    ],
  },
  {
    nombre: "Tratamientos Faciales",
    servicios: [
      { id: "fac-1", nombre: "Hidra Lips", precio: 30000 },
      { id: "fac-2", nombre: "Punta de Diamante", precio: 40000 },
      { id: "fac-3", nombre: "Dermapen", precio: 45000 },
      { id: "fac-4", nombre: "Limpieza de rostro con extracción", precio: 35000 },
    ],
  },
  {
    nombre: "Depilación",
    servicios: [
      { id: "dep-1", nombre: "Depilación de rostro completo con cera", precio: 28000 },
    ],
  },
  {
    nombre: "Tratamientos Corporales",
    servicios: [
      { id: "cor-1", nombre: "Belleza de piernas", precio: 50000 },
      { id: "cor-2", nombre: "Exfoliación de espalda", precio: 70000 },
    ],
  },
  {
    nombre: "Gimnasia Pasiva (Electrodos)",
    servicios: [
      {
        id: "ele-1", nombre: "Glúteos Up",
        paquetes: [{ s: 1, p: 20000 }, { s: 4, p: 70000 }, { s: 8, p: 135000 }],
      },
      {
        id: "ele-2", nombre: "Abdomen Firme",
        paquetes: [{ s: 1, p: 18000 }, { s: 4, p: 64000 }, { s: 8, p: 104000 }],
      },
      {
        id: "ele-3", nombre: "Brazos y Pecho",
        paquetes: [{ s: 1, p: 15000 }, { s: 4, p: 54000 }, { s: 8, p: 100000 }],
      },
      {
        id: "ele-4", nombre: "Piernas Firmes",
        paquetes: [{ s: 1, p: 20000 }, { s: 4, p: 70000 }, { s: 8, p: 135000 }],
      },
      {
        id: "ele-5", nombre: "Piernas y Glúteos",
        paquetes: [{ s: 1, p: 30000 }, { s: 4, p: 108000 }, { s: 8, p: 200000 }],
      },
      {
        id: "ele-6", nombre: "Full Body",
        paquetes: [{ s: 1, p: 45000 }, { s: 4, p: 160000 }, { s: 8, p: 300000 }],
      },
    ],
  },
];

// Convierte cada categoría en una lista "plana" de opciones seleccionables
// (un servicio con paquetes se abre en una fila por cada cantidad de sesiones).
function aplanarCategoria(categoria) {
  const filas = [];
  categoria.servicios.forEach((serv) => {
    if (serv.paquetes) {
      serv.paquetes.forEach((pq) => {
        filas.push({
          key: `${serv.id}-${pq.s}`,
          nombre: `${serv.nombre} — ${pq.s} sesión${pq.s > 1 ? "es" : ""}`,
          precio: pq.p,
        });
      });
    } else if (serv.precio != null) {
      filas.push({ key: serv.id, nombre: serv.nombre, precio: serv.precio });
    }
  });
  return filas;
}

const CATEGORIAS_APLANADAS = CATEGORIAS.map((c) => ({
  nombre: c.nombre,
  opciones: aplanarCategoria(c),
}));

const HORARIOS_DEFECTO = ["08:15", "10:00", "13:30", "15:00", "18:30"];

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const MESES_CAP = MESES.map((m) => m[0].toUpperCase() + m.slice(1));
const DIAS_SEMANA_CORTOS = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];
const DIAS_SEMANA_LARGOS = [
  "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo",
];

function formatearPrecio(n) {
  return "$" + n.toLocaleString("es-AR");
}

function claveFecha(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/* ---------------------------------------------------------
   COMPONENTES BASE
--------------------------------------------------------- */
function Logo({ size = 90 }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `2px solid ${COLORS.rosaIntenso}`,
          overflow: "hidden",
          margin: "0 auto",
          background: "#FFFDFC",
        }}
      >
        <img
          src={LOGO_SRC}
          alt="Piensa en Rosa"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: "Georgia, serif",
          fontSize: 26,
          color: COLORS.textoOscuro,
          fontWeight: 500,
        }}
      >
        Piensa en Rosa
      </div>
      <div style={{ fontSize: 11, letterSpacing: 2, color: COLORS.dorado, marginTop: 4, fontWeight: 600 }}>
        BY DAIANA BRITO
      </div>
    </div>
  );
}

function BarraProgreso({ paso, total }) {
  if (paso < 1 || paso > total) return null;
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 18 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === paso ? 20 : 7,
            height: 7,
            borderRadius: 4,
            background: i + 1 <= paso ? COLORS.rosaIntenso : COLORS.grisDeshabilitado,
            transition: "all .25s ease",
          }}
        />
      ))}
    </div>
  );
}

function BotonPrincipal({ children, onClick, disabled, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "14px 20px",
        borderRadius: 999,
        border: "none",
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: 0.3,
        color: "#fff",
        background: disabled ? COLORS.grisDeshabilitado : COLORS.rosaIntenso,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 6px 16px rgba(196,80,107,0.32)",
        transition: "background .15s ease, transform .1s ease",
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.98)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      {children}
    </button>
  );
}

function BotonVolver({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Volver"
      style={{
        width: 38, height: 38, borderRadius: "50%",
        border: `1.5px solid ${COLORS.rosaEmpolvado}`,
        background: "#fff", color: COLORS.rosaIntenso,
        fontSize: 16, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 18,
      }}
    >
      ←
    </button>
  );
}

function Campo({ label, value, onChange, placeholder, type = "text", inputMode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 11, letterSpacing: 0.5, color: COLORS.textoSuave, display: "block", marginBottom: 5, textTransform: "uppercase" }}>
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 14,
          border: `1px solid ${COLORS.bordeSuave}`,
          background: "#FEFBFA",
          fontSize: 14,
          color: COLORS.textoOscuro,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

/* ---------------- Calendario ---------------- */
function Calendario({ fechaSeleccionada, onSeleccionar }) {
  const hoy = new Date();
  const [mesVisto, setMesVisto] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1));

  const dias = useMemo(() => {
    const year = mesVisto.getFullYear();
    const month = mesVisto.getMonth();
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    const offset = (primerDia.getDay() + 6) % 7; // Lunes = 0
    const celdas = [];
    for (let i = 0; i < offset; i++) celdas.push(null);
    for (let d = 1; d <= ultimoDia.getDate(); d++) celdas.push(new Date(year, month, d));
    return celdas;
  }, [mesVisto]);

  const esFinDeSemana = (fecha) => fecha.getDay() === 0 || fecha.getDay() === 6;
  const esPasado = (fecha) => {
    const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    return fecha < hoySinHora;
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button
          onClick={() => setMesVisto(new Date(mesVisto.getFullYear(), mesVisto.getMonth() - 1, 1))}
          style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer", color: COLORS.textoSuave }}
        >
          ‹
        </button>
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textoOscuro }}>
          {MESES_CAP[mesVisto.getMonth()]} {mesVisto.getFullYear()}
        </div>
        <button
          onClick={() => setMesVisto(new Date(mesVisto.getFullYear(), mesVisto.getMonth() + 1, 1))}
          style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer", color: COLORS.textoSuave }}
        >
          ›
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 6 }}>
        {DIAS_SEMANA_CORTOS.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 10, color: COLORS.textoSuave }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
        {dias.map((fecha, i) => {
          if (!fecha) return <div key={i} />;
          const deshabilitado = esFinDeSemana(fecha) || esPasado(fecha);
          const seleccionado =
            fechaSeleccionada && fecha.toDateString() === fechaSeleccionada.toDateString();
          return (
            <button
              key={i}
              disabled={deshabilitado}
              onClick={() => onSeleccionar(fecha)}
              style={{
                aspectRatio: "1",
                borderRadius: "50%",
                border: "none",
                fontSize: 12,
                cursor: deshabilitado ? "not-allowed" : "pointer",
                background: seleccionado ? COLORS.rosaIntenso : "transparent",
                color: deshabilitado ? "#D8D0CD" : seleccionado ? "#fff" : COLORS.textoOscuro,
                fontWeight: seleccionado ? 700 : 400,
              }}
            >
              {fecha.getDate()}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 11, color: COLORS.textoSuave }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.rosaEmpolvado, display: "inline-block" }} />
          Día disponible
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D8D0CD", display: "inline-block" }} />
          No disponible
        </div>
      </div>
    </div>
  );
}

/* ---------------- Fila de servicio (checkbox cuadrado) ---------------- */
function FilaServicio({ opcion, seleccionado, onToggle }) {
  return (
    <button
      onClick={() => onToggle(opcion)}
      style={{
        width: "100%",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "13px 14px", borderRadius: 14, textAlign: "left", marginBottom: 8,
        background: "#FEFBFA",
        border: `1.5px solid ${seleccionado ? COLORS.rosaIntenso : COLORS.bordeSuave}`,
        cursor: "pointer",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 18, height: 18, borderRadius: 5, flexShrink: 0,
            border: `1.5px solid ${seleccionado ? COLORS.rosaIntenso : "#D8CFCC"}`,
            background: seleccionado ? COLORS.rosaIntenso : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11,
          }}
        >
          {seleccionado ? "✓" : ""}
        </span>
        <span style={{ fontSize: 13.5, color: COLORS.textoOscuro }}>{opcion.nombre}</span>
      </span>
      <span style={{ fontSize: 13.5, color: COLORS.dorado, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 8 }}>
        {formatearPrecio(opcion.precio)}
      </span>
    </button>
  );
}

/* ---------------- Categoría desplegable ---------------- */
function CategoriaAcordeon({ categoria, seleccionados, onToggle }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <div style={{ marginBottom: 10 }}>
      <button
        onClick={() => setAbierta(!abierta)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "13px 14px", borderRadius: 14, cursor: "pointer",
          background: abierta ? COLORS.rosaClaro : "#fff",
          border: `1.5px solid ${abierta ? COLORS.rosaIntenso : COLORS.bordeSuave}`,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: COLORS.textoOscuro }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.rosaIntenso, display: "inline-block" }} />
          {categoria.nombre}
        </span>
        <span style={{ fontSize: 12.5, color: COLORS.textoSuave, display: "flex", alignItems: "center", gap: 6 }}>
          {categoria.opciones.length}
          <span style={{ fontSize: 11 }}>{abierta ? "▲" : "▼"}</span>
        </span>
      </button>
      {abierta && (
        <div style={{ marginTop: 8 }}>
          {categoria.opciones.map((op) => (
            <FilaServicio
              key={op.key}
              opcion={op}
              seleccionado={!!seleccionados[op.key]}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   APP PRINCIPAL
--------------------------------------------------------- */
export default function PiensaEnRosaReserva() {
  const [paso, setPaso] = useState(0); // 0 bienvenida, 1-5 flujo, 6 éxito
  const TOTAL_PASOS = 5;

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [tipoClienta, setTipoClienta] = useState("");
  const [fecha, setFecha] = useState(null);
  const [horario, setHorario] = useState(null);
  const [seleccionados, setSeleccionados] = useState({}); // key -> {nombre, precio}
  const [busqueda, setBusqueda] = useState("");
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);
  const [errorDatos, setErrorDatos] = useState("");
  const [errorGuardado, setErrorGuardado] = useState("");
  const [enviando, setEnviando] = useState(false);

  // --- Instalar como app (PWA) ---
  const [promptInstalacion, setPromptInstalacion] = useState(null);
  const [mostrarInstruccionesIOS, setMostrarInstruccionesIOS] = useState(false);

  useEffect(() => {
    function alListo(e) {
      e.preventDefault();
      setPromptInstalacion(e);
    }
    window.addEventListener("beforeinstallprompt", alListo);
    return () => window.removeEventListener("beforeinstallprompt", alListo);
  }, []);

  async function instalarApp() {
    if (promptInstalacion) {
      promptInstalacion.prompt();
      await promptInstalacion.userChoice;
      setPromptInstalacion(null);
    } else {
      // iOS Safari (y otros navegadores que no soportan instalación automática)
      setMostrarInstruccionesIOS(true);
    }
  }

  // --- WhatsApp del negocio (para "Consultar sobre mi turno") ---
  const [whatsappNegocio, setWhatsappNegocio] = useState("");
  useEffect(() => {
    async function cargarConfig() {
      try {
        const config = await sb("configuracion?select=whatsapp&id=eq.1");
        if (config[0]?.whatsapp) setWhatsappNegocio(config[0].whatsapp);
      } catch (e) {
        console.error(e);
      }
    }
    cargarConfig();
  }, []);

  function consultarPorWhatsapp() {
    const numero = (whatsappNegocio || "").replace(/\D/g, "");
    if (!numero) {
      alert("No pudimos encontrar el WhatsApp del salón. Probá de nuevo más tarde.");
      return;
    }
    const mensaje = `Hola! Quería consultar sobre mi turno del ${fechaTexto || ""} a las ${horario || ""} hs (a nombre de ${nombre} ${apellido}).`;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, "_blank");
  }

  // Catálogo real (categorías + servicios) traído de Supabase.
  // Arranca con el catálogo estático como respaldo por si tarda la conexión.
  const [catalogo, setCatalogo] = useState(CATEGORIAS_APLANADAS);

  useEffect(() => {
    async function cargarCatalogo() {
      try {
        const categorias = await sb("categorias?select=id,nombre,orden&order=orden.asc");
        const servicios = await sb("servicios?select=id,nombre,precio,categoria_id,activo,orden&activo=eq.true&order=orden.asc");
        const paquetes = await sb("servicio_paquetes?select=id,servicio_id,sesiones,precio&order=sesiones.asc");
        const nuevoCatalogo = categorias.map((cat) => {
          const opciones = [];
          servicios.filter((s) => s.categoria_id === cat.id).forEach((serv) => {
            const susPaquetes = paquetes.filter((p) => p.servicio_id === serv.id);
            if (susPaquetes.length > 0) {
              susPaquetes.forEach((pq) => {
                opciones.push({
                  key: `${serv.id}-${pq.sesiones}`,
                  nombre: `${serv.nombre} — ${pq.sesiones} sesión${pq.sesiones > 1 ? "es" : ""}`,
                  precio: pq.precio,
                });
              });
            } else if (serv.precio != null) {
              opciones.push({ key: serv.id, nombre: serv.nombre, precio: serv.precio });
            }
          });
          return { nombre: cat.nombre, opciones };
        });
        setCatalogo(nuevoCatalogo);
      } catch (e) {
        console.error("No se pudo cargar el catálogo desde Supabase, se usa el catálogo local:", e);
      }
    }
    cargarCatalogo();
  }, []);

  // Disponibilidad real de horarios para el día elegido.
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const [diaBloqueadoMotivo, setDiaBloqueadoMotivo] = useState(null);
  const [errorHorarios, setErrorHorarios] = useState("");

  useEffect(() => {
    if (!fecha) return;
    async function cargarDisponibilidad() {
      setCargandoHorarios(true);
      setErrorHorarios("");
      setDiaBloqueadoMotivo(null);
      setHorario(null);
      try {
        const clave = claveFecha(fecha);
        const [dias, generales, extra, bloqueosHora, turnosDelDia] = await Promise.all([
          sb(`bloqueos_dia?select=motivo&fecha=eq.${clave}`),
          sb(`horarios_generales?select=hora&order=hora.asc`),
          sb(`horarios_extra?select=hora&fecha=eq.${clave}`),
          sb(`bloqueos_horario?select=hora&fecha=eq.${clave}`),
          sb(`turnos?select=hora,estado&fecha=eq.${clave}`),
        ]);
        if (dias.length > 0) {
          setDiaBloqueadoMotivo(dias[0].motivo || "Sin motivo especificado");
          setHorariosDisponibles([]);
          return;
        }
        const todasLasHoras = [...new Set([...generales.map((h) => h.hora), ...extra.map((h) => h.hora)])].sort();
        const horasBloqueadas = new Set(bloqueosHora.map((b) => b.hora));
        const horasOcupadas = new Set(turnosDelDia.filter((t) => t.estado !== "cancelado").map((t) => t.hora));
        setHorariosDisponibles(todasLasHoras.filter((h) => !horasBloqueadas.has(h) && !horasOcupadas.has(h)));
      } catch (e) {
        console.error(e);
        setErrorHorarios("No pudimos cargar los horarios disponibles: " + e.message);
        setHorariosDisponibles(HORARIOS_DEFECTO);
      } finally {
        setCargandoHorarios(false);
      }
    }
    cargarDisponibilidad();
  }, [fecha]);

  const listaSeleccionados = Object.entries(seleccionados).map(([key, v]) => ({ key, ...v }));
  const total = listaSeleccionados.reduce((acc, s) => acc + s.precio, 0);

  function toggleOpcion(opcion) {
    setSeleccionados((prev) => {
      const copia = { ...prev };
      if (copia[opcion.key]) delete copia[opcion.key];
      else copia[opcion.key] = { nombre: opcion.nombre, precio: opcion.precio };
      return copia;
    });
  }

  function validarDatos() {
    if (!nombre.trim() || !apellido.trim() || !celular.trim() || !tipoClienta) {
      setErrorDatos("Completá todos los campos para continuar.");
      return false;
    }
    if (!/^[0-9+()\-\s]{6,}$/.test(celular.trim())) {
      setErrorDatos("Ingresá un número de celular válido.");
      return false;
    }
    setErrorDatos("");
    return true;
  }

  const categoriasFiltradas = useMemo(() => {
    if (!busqueda.trim()) return null;
    const q = busqueda.trim().toLowerCase();
    const filas = [];
    catalogo.forEach((cat) => {
      cat.opciones.forEach((op) => {
        if (op.nombre.toLowerCase().includes(q)) filas.push(op);
      });
    });
    return filas;
  }, [busqueda, catalogo]);

  async function confirmarTurno() {
    setEnviando(true);
    setErrorGuardado("");
    try {
      const clave = claveFecha(fecha);
      const nombreCompleto = `${nombre.trim()} ${apellido.trim()}`;
      const celularLimpio = celular.trim();

      // 1) Buscar si la clienta ya existe por celular; si no, crearla.
      const existentes = await sb(`clientas?select=id&celular=eq.${encodeURIComponent(celularLimpio)}`);
      let clientaId;
      if (existentes.length > 0) {
        clientaId = existentes[0].id;
      } else {
        const nuevaClienta = await sb("clientas", {
          method: "POST",
          body: JSON.stringify({
            nombre: nombreCompleto,
            celular: celularLimpio,
            estado: tipoClienta === "nueva" ? "nueva" : "habitual",
          }),
        });
        clientaId = nuevaClienta[0].id;
      }

      // 2) Crear el turno con todos los servicios elegidos combinados en una sola reserva.
      const servicioNombre = listaSeleccionados.map((s) => s.nombre).join(", ");
      await sb("turnos", {
        method: "POST",
        body: JSON.stringify({
          clienta_id: clientaId,
          cliente_nombre: nombreCompleto,
          fecha: clave,
          hora: horario,
          servicio_nombre: servicioNombre,
          precio: total,
          estado: "reservado",
        }),
      });

      setEnviando(false);
      setPaso(6);
    } catch (e) {
      console.error(e);
      setEnviando(false);
      if (String(e.message).includes("23505")) {
        setErrorGuardado("Ese horario ya fue reservado por otra clienta. Volvé al paso anterior y elegí otro horario.");
      } else {
        setErrorGuardado("No pudimos guardar tu turno: " + e.message);
      }
    }
  }

  function reiniciar() {
    setPaso(0);
    setNombre(""); setApellido(""); setCelular(""); setTipoClienta("");
    setFecha(null); setHorario(null); setSeleccionados({});
    setBusqueda(""); setAceptaPoliticas(false); setErrorDatos(""); setErrorGuardado(false);
  }

  const fechaTexto = fecha
    ? `${DIAS_SEMANA_LARGOS[(fecha.getDay() + 6) % 7]}, ${fecha.getDate()} de ${MESES_CAP[fecha.getMonth()]}`
    : "";

  return (
    <>
    <Head>
      <title>Piensa en Rosa</title>
    </Head>
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        display: "flex",
        justifyContent: "center",
        padding: "24px 12px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: COLORS.card,
          borderRadius: 28,
          boxShadow: "0 10px 40px rgba(180,120,130,0.15)",
          padding: "28px 22px",
          boxSizing: "border-box",
        }}
      >
        <BarraProgreso paso={paso} total={TOTAL_PASOS} />

        {/* BIENVENIDA */}
        {paso === 0 && (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", minHeight: 480 }}>
            <div style={{ marginTop: 24 }}>
              <Logo size={110} />
            </div>
            <p style={{ fontSize: 14, color: COLORS.textoSuave, marginTop: 26 }}>
              Reservá tu turno en simples pasos
            </p>
            <div style={{ flex: 1 }} />
            <BotonPrincipal onClick={() => setPaso(1)}>Reservar turno</BotonPrincipal>
            <button
              style={{
                marginTop: 16, background: "none", border: "none", cursor: "pointer",
                fontSize: 12.5, color: COLORS.textoSuave, textDecoration: "underline",
              }}
            >
              Acceso administrador
            </button>
          </div>
        )}

        {/* PASO 1 — DATOS PERSONALES */}
        {paso === 1 && (
          <div>
            <BotonVolver onClick={() => setPaso(0)} />
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 21, color: COLORS.textoOscuro, marginTop: 0, marginBottom: 20 }}>
              Contanos quién sos
            </h2>
            <Campo label="Nombre" value={nombre} onChange={setNombre} placeholder="Tu nombre" />
            <Campo label="Apellido" value={apellido} onChange={setApellido} placeholder="Tu apellido" />
            <Campo
              label="Teléfono / WhatsApp"
              value={celular}
              onChange={setCelular}
              placeholder="11 1234 5678"
              type="tel"
              inputMode="numeric"
            />
            <div style={{ marginTop: 16, marginBottom: 20 }}>
              {[
                { valor: "habitual", texto: "Ya soy clienta" },
                { valor: "nueva", texto: "Soy nueva" },
              ].map((op) => (
                <button
                  key={op.valor}
                  onClick={() => setTipoClienta(op.valor)}
                  style={{
                    width: "100%", textAlign: "left", padding: "12px 14px", marginBottom: 8,
                    borderRadius: 14, border: `1.5px solid ${tipoClienta === op.valor ? COLORS.rosaIntenso : COLORS.bordeSuave}`,
                    background: tipoClienta === op.valor ? COLORS.rosaClaro : "#FEFBFA",
                    color: COLORS.textoOscuro, fontSize: 14, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 16, height: 16, borderRadius: "50%",
                      border: `1.5px solid ${tipoClienta === op.valor ? COLORS.rosaIntenso : "#D8CFCC"}`,
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {tipoClienta === op.valor && (
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.rosaIntenso, display: "block" }} />
                    )}
                  </span>
                  {op.texto}
                </button>
              ))}
            </div>
            {errorDatos && <p style={{ color: COLORS.errorTexto, fontSize: 12, marginBottom: 10 }}>{errorDatos}</p>}
            <BotonPrincipal onClick={() => validarDatos() && setPaso(2)}>Siguiente</BotonPrincipal>
          </div>
        )}

        {/* PASO 2 — DÍA */}
        {paso === 2 && (
          <div>
            <BotonVolver onClick={() => setPaso(1)} />
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 21, color: COLORS.textoOscuro, marginTop: 0, marginBottom: 20 }}>
              Elegí el día de tu turno
            </h2>
            <Calendario fechaSeleccionada={fecha} onSeleccionar={setFecha} />
            <div style={{ marginTop: 20 }}>
              <BotonPrincipal disabled={!fecha} onClick={() => setPaso(3)}>Siguiente</BotonPrincipal>
            </div>
          </div>
        )}

        {/* PASO 3 — HORARIO */}
        {paso === 3 && (
          <div>
            <BotonVolver onClick={() => setPaso(2)} />
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 21, color: COLORS.textoOscuro, marginTop: 0, marginBottom: 8 }}>
              Elegí un horario
            </h2>
            <p style={{ fontSize: 12.5, color: COLORS.textoSuave, marginBottom: 14 }}>
              {fechaTexto && `Horarios disponibles para el ${fechaTexto}`}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {cargandoHorarios && (
                <p style={{ fontSize: 13, color: COLORS.textoSuave, textAlign: "center" }}>Buscando horarios disponibles...</p>
              )}
              {!cargandoHorarios && diaBloqueadoMotivo && (
                <p style={{ fontSize: 13, color: COLORS.errorTexto, textAlign: "center" }}>
                  Ese día no está disponible ({diaBloqueadoMotivo}). Elegí otra fecha.
                </p>
              )}
              {!cargandoHorarios && !diaBloqueadoMotivo && errorHorarios && (
                <p style={{ fontSize: 12.5, color: COLORS.errorTexto, textAlign: "center" }}>{errorHorarios}</p>
              )}
              {!cargandoHorarios && !diaBloqueadoMotivo && horariosDisponibles.length === 0 && !errorHorarios && (
                <p style={{ fontSize: 13, color: COLORS.textoSuave, textAlign: "center" }}>
                  No quedan horarios libres para ese día. Elegí otra fecha.
                </p>
              )}
              {!cargandoHorarios && horariosDisponibles.map((h) => (
                <button
                  key={h}
                  onClick={() => setHorario(h)}
                  style={{
                    padding: "13px 16px", borderRadius: 14, textAlign: "center", fontSize: 14, fontWeight: 600,
                    border: `1.5px solid ${horario === h ? COLORS.rosaIntenso : COLORS.bordeSuave}`,
                    background: horario === h ? COLORS.rosaIntenso : "#FEFBFA",
                    color: horario === h ? "#fff" : COLORS.textoOscuro,
                    cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
                  }}
                >
                  {h} hs {horario === h && "✓"}
                </button>
              ))}
            </div>
            <BotonPrincipal disabled={!horario} onClick={() => setPaso(4)}>Siguiente</BotonPrincipal>
          </div>
        )}

        {/* PASO 4 — SERVICIOS */}
        {paso === 4 && (
          <div>
            <BotonVolver onClick={() => setPaso(3)} />
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 21, color: COLORS.textoOscuro, marginTop: 0, marginBottom: 16 }}>
              Elegí el/los servicio/s
            </h2>
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar servicio..."
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 14,
                border: `1px solid ${COLORS.bordeSuave}`, background: "#FEFBFA",
                fontSize: 14, color: COLORS.textoOscuro, outline: "none",
                boxSizing: "border-box", marginBottom: 14,
              }}
            />
            <div style={{ maxHeight: 380, overflowY: "auto", marginBottom: 14, paddingRight: 2 }}>
              {categoriasFiltradas ? (
                categoriasFiltradas.length > 0 ? (
                  categoriasFiltradas.map((op) => (
                    <FilaServicio
                      key={op.key}
                      opcion={op}
                      seleccionado={!!seleccionados[op.key]}
                      onToggle={toggleOpcion}
                    />
                  ))
                ) : (
                  <p style={{ fontSize: 13, color: COLORS.textoSuave, textAlign: "center", marginTop: 20 }}>
                    No encontramos servicios para "{busqueda}".
                  </p>
                )
              ) : (
                catalogo.map((cat) => (
                  <CategoriaAcordeon
                    key={cat.nombre}
                    categoria={cat}
                    seleccionados={seleccionados}
                    onToggle={toggleOpcion}
                  />
                ))
              )}
            </div>
            <div
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 14px", background: COLORS.rosaClaro, borderRadius: 14, marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 13, color: COLORS.textoOscuro }}>{listaSeleccionados.length} servicio(s)</span>
              <span style={{ fontSize: 17, fontWeight: 700, color: COLORS.rosaIntenso }}>{formatearPrecio(total)}</span>
            </div>
            <BotonPrincipal disabled={listaSeleccionados.length === 0} onClick={() => setPaso(5)}>
              Siguiente
            </BotonPrincipal>
          </div>
        )}

        {/* PASO 5 — CONFIRMAR TURNO (resumen + advertencia + políticas) */}
        {paso === 5 && (
          <div>
            <BotonVolver onClick={() => setPaso(4)} />
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 21, color: COLORS.textoOscuro, marginTop: 0, marginBottom: 16 }}>
              Confirmá tu turno
            </h2>

            {errorGuardado && (
              <div
                style={{
                  background: COLORS.error, color: COLORS.errorTexto, borderRadius: 14,
                  padding: "12px 14px", fontSize: 12.5, textAlign: "center", marginBottom: 14, lineHeight: 1.5,
                }}
              >
                {errorGuardado}
              </div>
            )}

            <div style={{ background: "#FEFBFA", border: `1px solid ${COLORS.bordeSuave}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.textoOscuro, marginBottom: 4 }}>
                {nombre} {apellido}
              </div>
              <div style={{ fontSize: 13, color: COLORS.textoSuave, marginBottom: 2 }}>{celular}</div>
              <div style={{ fontSize: 13, color: COLORS.textoSuave, marginBottom: 12 }}>
                {fechaTexto} · {horario} Hs
              </div>
              <div style={{ borderTop: `1px solid ${COLORS.bordeSuave}`, paddingTop: 10 }}>
                {listaSeleccionados.map((s) => (
                  <div key={s.key} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: COLORS.textoOscuro }}>{s.nombre}</span>
                    <span style={{ color: COLORS.dorado, fontWeight: 700 }}>{formatearPrecio(s.precio)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${COLORS.bordeSuave}`, marginTop: 6, paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.rosaIntenso }}>Total</span>
                <span style={{ fontSize: 17, fontWeight: 700, color: COLORS.rosaIntenso }}>{formatearPrecio(total)}</span>
              </div>
            </div>

            <div
              style={{
                background: COLORS.advertencia, border: `1px solid ${COLORS.advertenciaBorde}`,
                borderRadius: 16, padding: 16, marginBottom: 16, fontSize: 12.5, color: COLORS.textoOscuro, lineHeight: 1.6,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>
                Es muy importante asistir en horario
              </div>
              <p style={{ margin: "0 0 8px" }}>
                Hay una tolerancia de <strong>10 minutos</strong>. Pasado ese tiempo se cobra un
                recargo por demora de <strong>$3.000</strong>. Se espera hasta <strong>20 minutos</strong> pasado
                el horario elegido.
              </p>
              <p style={{ margin: 0 }}>
                La ausencia al turno tiene una multa de <strong>$15.000</strong>, a enviar por
                Mercado Pago al alias <strong>piensaenrosa</strong> a nombre de <strong>Daiana Brito</strong>. De
                no abonarse, no se otorgarán nuevos turnos.
              </p>
            </div>

            <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: COLORS.textoSuave, marginBottom: 18, cursor: "pointer" }}>
              <input type="checkbox" checked={aceptaPoliticas} onChange={(e) => setAceptaPoliticas(e.target.checked)} style={{ marginTop: 2 }} />
              He leído y acepto las políticas de reserva.
            </label>

            <BotonPrincipal disabled={!aceptaPoliticas || enviando} onClick={confirmarTurno}>
              {enviando ? "Confirmando..." : "Confirmar turno"}
            </BotonPrincipal>
          </div>
        )}

        {/* ÉXITO */}
        {paso === 6 && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 60, height: 60, borderRadius: "50%", background: COLORS.exito,
                display: "flex", alignItems: "center", justifyContent: "center", margin: "10px auto 16px",
                fontSize: 26, color: "#5A8A54",
              }}
            >
              ✓
            </div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 19, color: COLORS.textoOscuro, marginBottom: 4 }}>
              ¡Gracias!
            </h2>
            <p style={{ fontSize: 13, color: COLORS.textoSuave, marginBottom: 18 }}>
              Tu turno fue reservado con éxito.
            </p>
            <div style={{ textAlign: "left", background: "#FEFBFA", borderRadius: 14, padding: 14, fontSize: 13, marginBottom: 16 }}>
              <div><strong>Fecha:</strong> {fechaTexto}</div>
              <div><strong>Horario:</strong> {horario} hs</div>
              <div style={{ marginTop: 6 }}><strong>Servicios:</strong></div>
              <ul style={{ margin: "4px 0 0 18px", padding: 0 }}>
                {listaSeleccionados.map((s) => <li key={s.key}>{s.nombre}</li>)}
              </ul>
              <div style={{ marginTop: 8, color: COLORS.dorado, fontWeight: 700 }}>Total: {formatearPrecio(total)}</div>
            </div>
            <BotonPrincipal style={{ marginBottom: 10 }} onClick={instalarApp}>🩷 Agregar Piensa en Rosa a mi pantalla de inicio</BotonPrincipal>
            {mostrarInstruccionesIOS && (
              <div style={{ textAlign: "left", background: COLORS.advertencia, border: `1px solid ${COLORS.advertenciaBorde}`, borderRadius: 14, padding: 14, fontSize: 12.5, marginBottom: 12, lineHeight: 1.6 }}>
                Para agregarla a tu pantalla de inicio: tocá el botón <strong>Compartir</strong> (el cuadradito con la flecha hacia arriba) de tu navegador, y elegí <strong>"Agregar a pantalla de inicio"</strong>.
                <button onClick={() => setMostrarInstruccionesIOS(false)} style={{ display: "block", marginTop: 8, background: "none", border: "none", color: COLORS.rosaIntenso, fontSize: 12, cursor: "pointer", textDecoration: "underline", padding: 0 }}>Entendido</button>
              </div>
            )}
            <button
              onClick={consultarPorWhatsapp}
              style={{
                width: "100%", padding: "13px 20px", borderRadius: 999, border: `1.5px solid ${COLORS.rosaIntenso}`,
                background: "#fff", color: COLORS.rosaIntenso, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 16,
              }}
            >
              💬 Consultar sobre mi turno
            </button>
            <button
              onClick={reiniciar}
              style={{ background: "none", border: "none", color: COLORS.textoSuave, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}
            >
              Simular una nueva reserva
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
