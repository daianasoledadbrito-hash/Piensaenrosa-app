import React, { useState, useMemo, useEffect } from "react";

/* ---------------------------------------------------------
   PIENSA EN ROSA — Panel de Administración (prototipo)
--------------------------------------------------------- */

const LOGO_SRC = "data:image/jpeg;base64,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";

const C = {
  bg: "#FBF3F0",
  card: "#FFFFFF",
  rosaClaro: "#F5D9DE",
  rosaEmpolvado: "#E8B9C3",
  rosaIntenso: "#C4506B",
  dorado: "#B08A54",
  texto: "#3F3835",
  textoSuave: "#8B7F7C",
  borde: "#F0DCE0",
  exito: "#CDE4C9",
  sidebarBg: "#241F1E",
  sidebarTextoSuave: "#B8ABA8",
  sidebarActivo: "#3A302E",
};

/* ---------------------------------------------------------
   CONEXIÓN A SUPABASE (base de datos real, compartida con la app de reservas)
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

const COLORES_CATEGORIA = {
  "Cejas": "#D07189",
  "Pestañas": "#9B7EBD",
  "Extensiones Línea Clásica y Volumen": "#7E9BBD",
  "Extensiones Tecnológicas": "#6FB6C2",
  "Micropigmentación": "#6FB6C2",
  "Tratamientos Faciales": "#7FBF9E",
  "Depilación": "#E0A25C",
  "Tratamientos Corporales": "#7FBF9E",
  "Gimnasia Pasiva (Electrodos)": "#E0C25C",
};

const ESTADOS_TURNO = {
  reservado: { label: "Reservado", color: "#5FA85C" },
  confirmado: { label: "Confirmado", color: "#4B87C4" },
  reprogramado: { label: "Reprogramado", color: "#D6A93B" },
  finalizado: { label: "Finalizado", color: "#A9A29F" },
  cancelado: { label: "Cancelado", color: "#C4504F" },
  noAsistio: { label: "No asistió", color: "#4A4340" },
};

function formatearPrecio(n) {
  if (n == null) return "Consultar";
  return "$" + n.toLocaleString("es-AR");
}

function claveFecha(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const MESES_CAP = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DIAS_SEMANA_DOM = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

function formatearFechaLarga(date) {
  return `${date.getDate()} de ${MESES_CAP[date.getMonth()]} de ${date.getFullYear()}`;
}

/* ---------------- Datos de ejemplo (en memoria) ---------------- */

const CLIENTAS_INICIALES = [
  { id: 1, nombre: "María López", celular: "11 2345 6789", estado: "habitual", visitas: 12, ultimaVisita: "28 Jun", proximoTurno: "08:15 · Hoy" },
  { id: 2, nombre: "Lucía Fernández", celular: "11 3456 7890", estado: "habitual", visitas: 7, ultimaVisita: "20 Jun", proximoTurno: "10:00 · Hoy" },
  { id: 3, nombre: "Daiana Brito", celular: "11 4567 8901", estado: "habitual", visitas: 30, ultimaVisita: "1 Jul", proximoTurno: "13:30 · Hoy" },
  { id: 4, nombre: "Camila Rojas", celular: "11 5678 9012", estado: "nueva", visitas: 1, ultimaVisita: "—", proximoTurno: "15:00 · Hoy" },
  { id: 5, nombre: "Valentina Gómez", celular: "11 6789 0123", estado: "habitual", visitas: 5, ultimaVisita: "15 Jun", proximoTurno: "18:30 · Hoy" },
  { id: 6, nombre: "Sofía Martínez", celular: "11 7890 1234", estado: "nueva", visitas: 1, ultimaVisita: "—", proximoTurno: "—" },
  { id: 7, nombre: "Rocío Sánchez", celular: "11 8901 2345", estado: "inactiva", visitas: 3, ultimaVisita: "12 Mar", proximoTurno: "—" },
];

const CATEGORIAS_INICIALES = [
  {
    nombre: "Cejas",
    servicios: [
      { id: "cej-1", nombre: "Perfilado de cejas", precio: 15000, activo: true },
      { id: "cej-2", nombre: "Bozo", precio: 8000, activo: true },
      { id: "cej-3", nombre: "Henna", precio: 18000, activo: true },
      { id: "cej-4", nombre: "Alisado / Laminado", precio: 15000, activo: true },
      { id: "cej-5", nombre: "Perfilado + Henna", precio: 28000, activo: true },
      { id: "cej-6", nombre: "Perfilado + Laminado", precio: 25000, activo: true },
      { id: "cej-7", nombre: "Perfilado + Laminado + Henna", precio: 38000, activo: true },
    ],
  },
  { nombre: "Pestañas", servicios: [{ id: "pes-1", nombre: "Lifting de pestañas (botox + color)", precio: 30000, activo: true }] },
  {
    nombre: "Extensiones Línea Clásica y Volumen",
    servicios: [
      { id: "ext-1", nombre: "Efecto Clásico", precio: 30000, activo: true },
      { id: "ext-2", nombre: "Volumen 2D y 3D", precio: 34000, activo: true },
      { id: "ext-3", nombre: "Volumen 4D, 5D y 6D", precio: 38000, activo: true },
      { id: "ext-4", nombre: "Volumen 7D, 8D, 9D y 10D", precio: 42000, activo: true },
      { id: "ext-5", nombre: "Mega Volumen", precio: 48000, activo: true },
      { id: "ext-6", nombre: "Remoción de extensiones", precio: 6000, activo: true },
    ],
  },
  {
    nombre: "Extensiones Tecnológicas",
    servicios: [
      { id: "tec-1", nombre: "Efecto Aurora", precio: 36000, activo: true },
      { id: "tec-2", nombre: "Efecto Hawaiano", precio: 36000, activo: true },
      { id: "tec-3", nombre: "Efecto Griego", precio: 38000, activo: true },
      { id: "tec-4", nombre: "Efecto Inglés", precio: 40000, activo: true },
    ],
  },
  {
    nombre: "Micropigmentación",
    servicios: [
      { id: "mic-1", nombre: "Microblading de cejas", precio: 90000, activo: true },
      { id: "mic-2", nombre: "Shading de cejas", precio: 120000, activo: true },
      { id: "mic-3", nombre: "Cejas Híbridas", precio: 130000, activo: true },
      { id: "mic-4", nombre: "Micropigmentación de labios", precio: 140000, activo: true },
      { id: "mic-5", nombre: "Delineado superior con diseño", precio: 130000, activo: true },
      { id: "mic-6", nombre: "Delineado superior simple", precio: 90000, activo: true },
      { id: "mic-7", nombre: "Delineado inferior", precio: 90000, activo: true },
    ],
  },
  {
    nombre: "Tratamientos Faciales",
    servicios: [
      { id: "fac-1", nombre: "Hidra Lips", precio: 30000, activo: true },
      { id: "fac-2", nombre: "Punta de Diamante", precio: 40000, activo: true },
      { id: "fac-3", nombre: "Dermapen", precio: 45000, activo: true },
      { id: "fac-4", nombre: "Limpieza de rostro con extracción", precio: 35000, activo: true },
    ],
  },
  { nombre: "Depilación", servicios: [{ id: "dep-1", nombre: "Depilación de rostro completo con cera", precio: 28000, activo: true }] },
  {
    nombre: "Tratamientos Corporales",
    servicios: [
      { id: "cor-1", nombre: "Belleza de piernas", precio: 50000, activo: true },
      { id: "cor-2", nombre: "Exfoliación de espalda", precio: 70000, activo: true },
    ],
  },
  {
    nombre: "Gimnasia Pasiva (Electrodos)",
    servicios: [
      { id: "ele-1", nombre: "Glúteos Up (1 / 4 / 8 sesiones)", precio: null, activo: true, paquetes: [20000, 70000, 135000] },
      { id: "ele-2", nombre: "Abdomen Firme (1 / 4 / 8 sesiones)", precio: null, activo: true, paquetes: [18000, 64000, 104000] },
      { id: "ele-3", nombre: "Brazos y Pecho (1 / 4 / 8 sesiones)", precio: null, activo: true, paquetes: [15000, 54000, 100000] },
      { id: "ele-4", nombre: "Piernas Firmes (1 / 4 / 8 sesiones)", precio: null, activo: true, paquetes: [20000, 70000, 135000] },
      { id: "ele-5", nombre: "Piernas y Glúteos (1 / 4 / 8 sesiones)", precio: null, activo: true, paquetes: [30000, 108000, 200000] },
      { id: "ele-6", nombre: "Full Body (1 / 4 / 8 sesiones)", precio: null, activo: true, paquetes: [45000, 160000, 300000] },
    ],
  },
];

const HORARIOS_DEFECTO = ["08:15", "10:00", "13:30", "15:00", "18:30"];

const HOY = new Date();
const CLAVE_HOY = claveFecha(HOY);
const TURNOS_POR_FECHA_INICIALES = {
  [CLAVE_HOY]: [
    { id: 1, hora: "08:15", clienteNombre: "María López", servicio: "Lifting de pestañas", categoria: "Pestañas", estado: "confirmado", recordatorio: { enviado: true, respuesta: "confirmado" } },
    { id: 2, hora: "10:00", clienteNombre: "Lucía Fernández", servicio: "Perfilado de cejas", categoria: "Cejas", estado: "reservado", recordatorio: { enviado: true, respuesta: null } },
    { id: 3, hora: "13:30", clienteNombre: "Daiana Brito", servicio: "Perfilado + Henna", categoria: "Cejas", estado: "reservado", recordatorio: { enviado: false, respuesta: null } },
    { id: 4, hora: "15:00", clienteNombre: "Camila Rojas", servicio: "Dermapen", categoria: "Tratamientos Faciales", estado: "reservado", recordatorio: { enviado: false, respuesta: null } },
    { id: 5, hora: "18:30", clienteNombre: "Valentina Gómez", servicio: "Volumen 2D y 3D", categoria: "Extensiones Línea Clásica y Volumen", estado: "reservado", recordatorio: { enviado: true, respuesta: "cancelado" } },
  ],
};

const MENSAJES_INICIALES = {
  bienvenida: "¡Hola! Gracias por reservar tu turno en Piensa en Rosa 🩷 Te esperamos con muchas ganas. Te dejamos nuestra dirección: [completar dirección del local].",
  confirmacion: "Hola, te recordamos tu turno en Piensa en Rosa. Por favor confirmá tu asistencia:",
  recordatorio: "¡Hola! Te recordamos tu turno en Piensa en Rosa mañana. Te esperamos sin maquillaje. Cualquier consulta, escribinos 🩷",
};

/* ---------------------------------------------------------
   COMPONENTES CHICOS
--------------------------------------------------------- */
function Tarjeta({ children, style }) {
  return <div style={{ background: C.card, borderRadius: 18, padding: 18, border: `1px solid ${C.borde}`, ...style }}>{children}</div>;
}

function Badge({ estado }) {
  const info = ESTADOS_TURNO[estado] || { label: estado, color: "#999" };
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: info.color + "22", color: info.color, whiteSpace: "nowrap" }}>
      {info.label}
    </span>
  );
}

function Interruptor({ activo, onChange }) {
  return (
    <button onClick={onChange} style={{ width: 40, height: 22, borderRadius: 999, border: "none", cursor: "pointer", background: activo ? C.rosaIntenso : "#DDD3D1", position: "relative", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: 2, left: activo ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .15s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }} />
    </button>
  );
}

function Modal({ children, onClose, maxWidth = 400 }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60, padding: 16 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 22, maxWidth, width: "100%", maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

/* ---------------- Login ---------------- */
function Login({ onIngresar }) {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function ingresar() {
    if (!email.trim() || !clave.trim()) { setError("Ingresá tu usuario y contraseña."); return; }
    setError(""); setCargando(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: clave }),
      });
      const datos = await res.json();
      if (!res.ok) {
        setError("Usuario o contraseña incorrectos.");
        setCargando(false);
        return;
      }
      onIngresar(datos.access_token);
    } catch (e) {
      setError("No pudimos conectar. Revisá tu internet e intentá de nuevo.");
    }
    setCargando(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 360, background: C.card, borderRadius: 24, padding: 32, boxShadow: "0 10px 40px rgba(180,120,130,0.15)" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ width: 74, height: 74, borderRadius: "50%", border: `2px solid ${C.rosaIntenso}`, overflow: "hidden", margin: "0 auto 12px" }}>
            <img src={LOGO_SRC} alt="Piensa en Rosa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: C.texto, fontWeight: 600 }}>Piensa en Rosa</div>
          <div style={{ fontSize: 11, letterSpacing: 2, color: C.dorado, marginTop: 4, fontWeight: 700 }}>PANEL DE ADMINISTRACIÓN</div>
        </div>
        <label style={{ fontSize: 11, color: C.textoSuave, display: "block", marginBottom: 5, textTransform: "uppercase" }}>Usuario (email)</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ingresar()} placeholder="daiana@piensaenrosa.com" autoCapitalize="none"
          style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: `1px solid ${C.borde}`, marginBottom: 14, fontSize: 14, boxSizing: "border-box", background: "#FEFBFA" }} />
        <label style={{ fontSize: 11, color: C.textoSuave, display: "block", marginBottom: 5, textTransform: "uppercase" }}>Contraseña</label>
        <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ingresar()} placeholder="••••••••"
          style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: `1px solid ${C.borde}`, marginBottom: 18, fontSize: 14, boxSizing: "border-box", background: "#FEFBFA" }} />
        {error && <p style={{ color: "#9C4A55", fontSize: 12, marginBottom: 12 }}>{error}</p>}
        <button onClick={ingresar} disabled={cargando} style={{ width: "100%", padding: "13px 20px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontSize: 15, fontWeight: 600, cursor: cargando ? "default" : "pointer", opacity: cargando ? 0.7 : 1 }}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </div>
    </div>
  );
}

/* ---------------- Sidebar ---------------- */
const MENU = [
  { id: "dashboard", icono: "🏠", label: "Dashboard" },
  { id: "agenda", icono: "📅", label: "Agenda" },
  { id: "clientas", icono: "👩", label: "Clientas" },
  { id: "servicios", icono: "💆", label: "Servicios" },
  { id: "categorias", icono: "📂", label: "Categorías" },
  { id: "bloqueos", icono: "🚫", label: "Bloqueos" },
  { id: "archivos", icono: "📸", label: "Archivos" },
  { id: "observaciones", icono: "📝", label: "Observaciones" },
  { id: "recordatorios", icono: "🔔", label: "Recordatorios" },
  { id: "mensajes", icono: "💬", label: "Mensajes" },
  { id: "configuracion", icono: "⚙", label: "Configuración" },
];

function Sidebar({ activa, onCambiar, onSalir, abierta, onCerrarMovil }) {
  return (
    <div style={{ width: 230, background: C.sidebarBg, color: "#fff", flexShrink: 0, display: abierta ? "flex" : "none", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 20, overflowY: "auto" }}>
      <div style={{ padding: "26px 20px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #3A302E" }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", border: `1.5px solid ${C.dorado}`, overflow: "hidden", flexShrink: 0 }}>
          <img src={LOGO_SRC} alt="Piensa en Rosa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14 }}>Piensa en Rosa</div>
          <div style={{ fontSize: 9, letterSpacing: 1.5, color: C.dorado }}>AGENDA</div>
        </div>
      </div>
      <div style={{ padding: "12px 10px", flex: 1 }}>
        {MENU.map((item) => (
          <button key={item.id} onClick={() => { onCambiar(item.id); onCerrarMovil && onCerrarMovil(); }}
            style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", marginBottom: 2, background: activa === item.id ? C.sidebarActivo : "transparent", color: activa === item.id ? "#fff" : C.sidebarTextoSuave, fontSize: 13.5, cursor: "pointer" }}>
            <span>{item.icono}</span>{item.label}
          </button>
        ))}
      </div>
      <div style={{ padding: 14, borderTop: "1px solid #3A302E" }}>
        <button onClick={onSalir} style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", background: "transparent", color: C.sidebarTextoSuave, fontSize: 13.5, cursor: "pointer" }}>
          🚪 Cerrar sesión
        </button>
      </div>
    </div>
  );
}

/* ---------------- Dashboard ---------------- */
function Dashboard({ turnosHoy, clientas }) {
  const facturacionHoy = turnosHoy.reduce((acc) => acc + 30000, 0);
  const proximo = turnosHoy[0];
  const nuevasClientas = clientas.filter((c) => c.estado === "nueva").length;
  const tarjetas = [
    { label: "Turnos de hoy", valor: turnosHoy.length },
    { label: "Nuevas clientas (mes)", valor: nuevasClientas },
    { label: "Facturación estimada del día", valor: formatearPrecio(facturacionHoy) },
    { label: "Facturación estimada del mes", valor: formatearPrecio(1250000) },
    { label: "Recordatorios pendientes", valor: turnosHoy.filter((t) => !t.recordatorio?.enviado).length },
  ];
  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.texto, marginBottom: 4 }}>Dashboard</h1>
      <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 20 }}>Resumen del negocio de hoy.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 20 }}>
        {tarjetas.map((t) => (
          <Tarjeta key={t.label}>
            <div style={{ fontSize: 12, color: C.textoSuave, marginBottom: 8 }}>{t.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.rosaIntenso }}>{t.valor}</div>
          </Tarjeta>
        ))}
      </div>
      {proximo && (
        <Tarjeta style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: C.textoSuave, marginBottom: 10 }}>Próximo turno</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.texto }}>{proximo.clienteNombre}</div>
              <div style={{ fontSize: 13, color: C.textoSuave }}>{proximo.servicio}</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.dorado }}>{proximo.hora}</div>
          </div>
        </Tarjeta>
      )}
      <Tarjeta>
        <div style={{ fontSize: 12, color: C.textoSuave, marginBottom: 10 }}>Turnos de hoy</div>
        {turnosHoy.length === 0 && <div style={{ fontSize: 13, color: C.textoSuave }}>No hay turnos cargados para hoy.</div>}
        {turnosHoy.map((t) => (
          <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.borde}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORES_CATEGORIA[t.categoria] || C.rosaIntenso, display: "inline-block" }} />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: C.texto }}>{t.clienteNombre}</div>
                <div style={{ fontSize: 12, color: C.textoSuave }}>{t.servicio}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: C.texto, fontWeight: 600 }}>{t.hora}</div>
              <Badge estado={t.estado} />
            </div>
          </div>
        ))}
      </Tarjeta>
    </div>
  );
}

/* ---------------------------------------------------------
   AGENDA — calendario mensual + turnos manuales
--------------------------------------------------------- */
function Agenda({ turnosPorFecha, setTurnosPorFecha, horarios, horariosExtra, bloqueosDia, bloqueosHorario, clientas, categorias }) {
  const [mesVisto, setMesVisto] = useState(new Date(HOY.getFullYear(), HOY.getMonth(), 1));
  const [diaSeleccionado, setDiaSeleccionado] = useState(HOY);
  const [turnoAbierto, setTurnoAbierto] = useState(null);
  const [modalAgendar, setModalAgendar] = useState(null);

  const celdas = useMemo(() => {
    const year = mesVisto.getFullYear();
    const month = mesVisto.getMonth();
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    const offset = primerDia.getDay();
    const arr = [];
    for (let i = 0; i < offset; i++) arr.push(null);
    for (let d = 1; d <= ultimoDia.getDate(); d++) arr.push(new Date(year, month, d));
    return arr;
  }, [mesVisto]);

  const claveDiaSel = claveFecha(diaSeleccionado);
  const diaBloqueadoCompleto = bloqueosDia.find((b) => b.fecha === claveDiaSel);
  const turnosDelDia = turnosPorFecha[claveDiaSel] || [];

  const horariosDelDia = useMemo(() => {
    const extra = horariosExtra.filter((h) => h.fecha === claveDiaSel).map((h) => h.horario);
    return [...new Set([...horarios, ...extra])].sort();
  }, [horarios, horariosExtra, claveDiaSel]);

  function estadoHorario(hora) {
    const turno = turnosDelDia.find((t) => t.hora === hora);
    if (turno) return { tipo: "ocupado", turno };
    const bloqueado = bloqueosHorario.find((b) => b.fecha === claveDiaSel && b.horario === hora);
    if (bloqueado) return { tipo: "bloqueado", motivo: bloqueado.motivo };
    return { tipo: "libre" };
  }

  async function cambiarEstadoTurno(hora, nuevoEstado) {
    const turno = turnosDelDia.find((t) => t.hora === hora);
    setTurnosPorFecha((prev) => ({ ...prev, [claveDiaSel]: (prev[claveDiaSel] || []).map((t) => (t.hora === hora ? { ...t, estado: nuevoEstado } : t)) }));
    setTurnoAbierto(null);
    if (turno?.id) {
      try { await sb(`turnos?id=eq.${turno.id}`, { method: "PATCH", body: JSON.stringify({ estado: nuevoEstado }) }); } catch (e) { console.error(e); }
    }
  }

  async function cancelarTurno(hora) {
    const turno = turnosDelDia.find((t) => t.hora === hora);
    setTurnosPorFecha((prev) => ({ ...prev, [claveDiaSel]: (prev[claveDiaSel] || []).filter((t) => t.hora !== hora) }));
    setTurnoAbierto(null);
    if (turno?.id) {
      try { await sb(`turnos?id=eq.${turno.id}`, { method: "DELETE" }); } catch (e) { console.error(e); }
    }
  }

  async function agendarManualmente(hora, clienteNombre, clientaId, servicio, categoria, precio) {
    try {
      const creado = await sb("turnos", {
        method: "POST",
        body: JSON.stringify({
          clienta_id: clientaId,
          cliente_nombre: clienteNombre,
          fecha: claveDiaSel,
          hora,
          servicio_nombre: servicio,
          categoria_nombre: categoria,
          precio,
          estado: "confirmado",
        }),
      });
      setTurnosPorFecha((prev) => ({
        ...prev,
        [claveDiaSel]: [...(prev[claveDiaSel] || []), { id: creado[0].id, hora, clienteNombre, servicio, categoria, estado: "confirmado", recordatorio: { enviado: false, respuesta: null } }],
      }));
      setModalAgendar(null);
    } catch (e) {
      console.error(e);
      alert("No se pudo guardar el turno. Puede que ese horario ya esté ocupado.");
    }
  }

  const hoyClave = claveFecha(HOY);

  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.texto, marginBottom: 4 }}>Agenda</h1>
      <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 18 }}>Elegí un día para ver y gestionar sus horarios. Al agendar manualmente, ese horario queda bloqueado para las clientas.</p>

      <Tarjeta style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <button onClick={() => setMesVisto(new Date(mesVisto.getFullYear(), mesVisto.getMonth() - 1, 1))} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: C.textoSuave }}>‹</button>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.texto }}>{MESES_CAP[mesVisto.getMonth()]} {mesVisto.getFullYear()}</div>
          <button onClick={() => setMesVisto(new Date(mesVisto.getFullYear(), mesVisto.getMonth() + 1, 1))} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: C.textoSuave }}>›</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 6 }}>
          {DIAS_SEMANA_DOM.map((d) => <div key={d} style={{ textAlign: "center", fontSize: 10, color: C.textoSuave }}>{d}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
          {celdas.map((fecha, i) => {
            if (!fecha) return <div key={i} />;
            const clave = claveFecha(fecha);
            const seleccionado = clave === claveDiaSel;
            const esHoy = clave === hoyClave;
            const tieneTurnos = (turnosPorFecha[clave] || []).length > 0;
            const bloqueado = bloqueosDia.some((b) => b.fecha === clave);
            return (
              <button key={i} onClick={() => setDiaSeleccionado(fecha)}
                style={{ aspectRatio: "1", borderRadius: "50%", border: esHoy && !seleccionado ? `1.5px solid ${C.rosaIntenso}` : "none", fontSize: 12, cursor: "pointer", background: seleccionado ? C.rosaIntenso : "transparent", color: bloqueado ? "#C4504F" : seleccionado ? "#fff" : C.texto, fontWeight: seleccionado || esHoy ? 700 : 400, position: "relative" }}>
                {fecha.getDate()}
                {tieneTurnos && !seleccionado && <span style={{ position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: C.dorado }} />}
              </button>
            );
          })}
        </div>
      </Tarjeta>

      <div style={{ fontSize: 14, fontWeight: 700, color: C.texto, marginBottom: 12 }}>{formatearFechaLarga(diaSeleccionado)}</div>

      {diaBloqueadoCompleto ? (
        <Tarjeta style={{ textAlign: "center", color: "#C4504F", fontSize: 13.5 }}>
          🚫 Este día está bloqueado ({diaBloqueadoCompleto.motivo}). Los horarios no están disponibles para las clientas.
        </Tarjeta>
      ) : (
        <Tarjeta style={{ padding: 0 }}>
          {horariosDelDia.map((hora) => {
            const info = estadoHorario(hora);
            return (
              <div key={hora} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${C.borde}` }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.dorado, width: 60 }}>{hora}</div>
                {info.tipo === "ocupado" && (
                  <>
                    <button onClick={() => setTurnoAbierto(info.turno)} style={{ flex: 1, textAlign: "left", background: "none", border: "none", cursor: "pointer" }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: C.texto }}>{info.turno.clienteNombre}</div>
                      <div style={{ fontSize: 12, color: C.textoSuave }}>{info.turno.servicio}</div>
                    </button>
                    <Badge estado={info.turno.estado} />
                  </>
                )}
                {info.tipo === "bloqueado" && <div style={{ flex: 1, fontSize: 13, color: "#C4504F" }}>Bloqueado — {info.motivo}</div>}
                {info.tipo === "libre" && (
                  <>
                    <div style={{ flex: 1, fontSize: 13, color: C.textoSuave }}>Libre</div>
                    <button onClick={() => setModalAgendar(hora)} style={{ padding: "7px 14px", borderRadius: 999, border: `1px solid ${C.rosaIntenso}`, background: "#fff", color: C.rosaIntenso, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>+ Agendar</button>
                  </>
                )}
              </div>
            );
          })}
          {horariosDelDia.length === 0 && <div style={{ padding: 18, textAlign: "center", color: C.textoSuave, fontSize: 13 }}>No hay horarios configurados.</div>}
        </Tarjeta>
      )}

      {turnoAbierto && (
        <Modal onClose={() => setTurnoAbierto(null)}>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.texto, marginBottom: 4 }}>{turnoAbierto.clienteNombre}</div>
          <div style={{ fontSize: 13, color: C.textoSuave, marginBottom: 14 }}>{turnoAbierto.hora} hs · {turnoAbierto.servicio}</div>
          <div style={{ marginBottom: 14 }}><Badge estado={turnoAbierto.estado} /></div>
          <div style={{ fontSize: 12.5, color: C.textoSuave, marginBottom: 8 }}>Cambiar estado:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {Object.keys(ESTADOS_TURNO).map((key) => (
              <button key={key} onClick={() => cambiarEstadoTurno(turnoAbierto.hora, key)} style={{ padding: "6px 12px", borderRadius: 999, fontSize: 12, cursor: "pointer", border: `1px solid ${ESTADOS_TURNO[key].color}`, background: turnoAbierto.estado === key ? ESTADOS_TURNO[key].color : "#fff", color: turnoAbierto.estado === key ? "#fff" : ESTADOS_TURNO[key].color }}>
                {ESTADOS_TURNO[key].label}
              </button>
            ))}
          </div>
          <button onClick={() => cancelarTurno(turnoAbierto.hora)} style={{ width: "100%", padding: "12px", borderRadius: 999, border: `1px solid #C4504F`, background: "#fff", color: "#C4504F", fontSize: 13.5, fontWeight: 600, cursor: "pointer", marginBottom: 10 }}>Quitar turno (libera el horario)</button>
          <button onClick={() => setTurnoAbierto(null)} style={{ width: "100%", padding: "12px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cerrar</button>
        </Modal>
      )}

      {modalAgendar && <ModalAgendarManual hora={modalAgendar} clientas={clientas} categorias={categorias} onCancelar={() => setModalAgendar(null)} onConfirmar={agendarManualmente} />}
    </div>
  );
}

function ModalAgendarManual({ hora, clientas, categorias, onCancelar, onConfirmar }) {
  const [modo, setModo] = useState("existente");
  const [clienteId, setClienteId] = useState(clientas[0]?.id || "");
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [categoriaSel, setCategoriaSel] = useState(categorias[0]?.nombre || "");
  const categoriaActual = categorias.find((c) => c.nombre === categoriaSel);
  const [servicioId, setServicioId] = useState(categoriaActual?.servicios[0]?.id || "");

  function confirmar() {
    const clientaExistente = modo === "existente" ? clientas.find((c) => String(c.id) === String(clienteId)) : null;
    const nombre = modo === "existente" ? clientaExistente?.nombre : nombreNuevo.trim();
    if (!nombre) return;
    const cat = categorias.find((c) => c.nombre === categoriaSel);
    const serv = cat?.servicios.find((s) => s.id === servicioId);
    const precio = serv?.paquetes ? serv.paquetes[0] : (serv?.precio ?? null);
    onConfirmar(hora, nombre, clientaExistente?.id || null, serv?.nombre || "Sin especificar", categoriaSel, precio);
  }

  return (
    <Modal onClose={onCancelar}>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.texto, marginBottom: 4 }}>Agendar manualmente</div>
      <div style={{ fontSize: 13, color: C.textoSuave, marginBottom: 16 }}>Horario: {hora} hs</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setModo("existente")} style={{ flex: 1, padding: "8px", borderRadius: 10, border: `1px solid ${modo === "existente" ? C.rosaIntenso : C.borde}`, background: modo === "existente" ? C.rosaClaro : "#fff", fontSize: 12.5, cursor: "pointer" }}>Clienta existente</button>
        <button onClick={() => setModo("nueva")} style={{ flex: 1, padding: "8px", borderRadius: 10, border: `1px solid ${modo === "nueva" ? C.rosaIntenso : C.borde}`, background: modo === "nueva" ? C.rosaClaro : "#fff", fontSize: 12.5, cursor: "pointer" }}>Nueva clienta</button>
      </div>
      {modo === "existente" ? (
        <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 12, border: `1px solid ${C.borde}`, fontSize: 14, marginBottom: 14 }}>
          {clientas.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
      ) : (
        <input value={nombreNuevo} onChange={(e) => setNombreNuevo(e.target.value)} placeholder="Nombre y apellido" style={{ width: "100%", padding: "11px 12px", borderRadius: 12, border: `1px solid ${C.borde}`, fontSize: 14, marginBottom: 14, boxSizing: "border-box" }} />
      )}
      <label style={{ fontSize: 11, color: C.textoSuave, display: "block", marginBottom: 5, textTransform: "uppercase" }}>Categoría</label>
      <select value={categoriaSel} onChange={(e) => { setCategoriaSel(e.target.value); const cat = categorias.find((c) => c.nombre === e.target.value); setServicioId(cat?.servicios[0]?.id || ""); }} style={{ width: "100%", padding: "11px 12px", borderRadius: 12, border: `1px solid ${C.borde}`, fontSize: 14, marginBottom: 14 }}>
        {categorias.map((c) => <option key={c.nombre} value={c.nombre}>{c.nombre}</option>)}
      </select>
      <label style={{ fontSize: 11, color: C.textoSuave, display: "block", marginBottom: 5, textTransform: "uppercase" }}>Servicio</label>
      <select value={servicioId} onChange={(e) => setServicioId(e.target.value)} style={{ width: "100%", padding: "11px 12px", borderRadius: 12, border: `1px solid ${C.borde}`, fontSize: 14, marginBottom: 18 }}>
        {categoriaActual?.servicios.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
      </select>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onCancelar} style={{ flex: 1, padding: "12px", borderRadius: 999, border: `1px solid ${C.borde}`, background: "#fff", color: C.textoSuave, fontSize: 13.5, cursor: "pointer" }}>Cancelar</button>
        <button onClick={confirmar} style={{ flex: 1, padding: "12px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>Agendar</button>
      </div>
    </Modal>
  );
}

/* ---------------- Clientas ---------------- */
function Clientas({ clientas }) {
  const [busqueda, setBusqueda] = useState("");
  const [clientaAbierta, setClientaAbierta] = useState(null);
  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return clientas;
    return clientas.filter((c) => c.nombre.toLowerCase().includes(q) || c.celular.includes(q));
  }, [busqueda, clientas]);
  const coloresEstado = { habitual: "#4B87C4", nueva: "#5FA85C", inactiva: "#A9A29F", archivada: "#4A4340" };
  const etiquetaEstado = { habitual: "Habitual", nueva: "Nueva", inactiva: "Inactiva", archivada: "Archivada" };
  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.texto, marginBottom: 4 }}>Clientas</h1>
      <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 16 }}>{clientas.length} clientas registradas.</p>
      <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar por nombre o celular..." style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: `1px solid ${C.borde}`, marginBottom: 16, fontSize: 14, boxSizing: "border-box", background: "#fff" }} />
      <Tarjeta style={{ padding: 0 }}>
        {filtradas.map((c) => (
          <button key={c.id} onClick={() => setClientaAbierta(c)} style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${C.borde}`, background: "none", border: "none", cursor: "pointer" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.texto }}>{c.nombre}</div>
              <div style={{ fontSize: 12.5, color: C.textoSuave }}>{c.celular} · {c.visitas} visitas</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: (coloresEstado[c.estado] || "#999") + "22", color: coloresEstado[c.estado] || "#999" }}>{etiquetaEstado[c.estado] || c.estado}</span>
          </button>
        ))}
        {filtradas.length === 0 && <div style={{ padding: 20, textAlign: "center", color: C.textoSuave, fontSize: 13 }}>No encontramos clientas para "{busqueda}".</div>}
      </Tarjeta>
      {clientaAbierta && (
        <Modal onClose={() => setClientaAbierta(null)}>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.texto, marginBottom: 4 }}>{clientaAbierta.nombre}</div>
          <div style={{ fontSize: 13, color: C.textoSuave, marginBottom: 14 }}>{clientaAbierta.celular}</div>
          <div style={{ fontSize: 13, color: C.texto, lineHeight: 1.9, marginBottom: 16 }}>
            <div><strong>Visitas totales:</strong> {clientaAbierta.visitas}</div>
            <div><strong>Última visita:</strong> {clientaAbierta.ultimaVisita}</div>
            <div><strong>Próximo turno:</strong> {clientaAbierta.proximoTurno}</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <button style={{ flex: 1, padding: "10px", borderRadius: 999, border: `1px solid ${C.rosaIntenso}`, background: "#fff", color: C.rosaIntenso, fontSize: 13, cursor: "pointer" }}>💬 WhatsApp</button>
            <button style={{ flex: 1, padding: "10px", borderRadius: 999, border: `1px solid ${C.rosaIntenso}`, background: "#fff", color: C.rosaIntenso, fontSize: 13, cursor: "pointer" }}>📞 Llamar</button>
          </div>
          <button onClick={() => setClientaAbierta(null)} style={{ width: "100%", padding: "12px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
}

/* ---------------- Servicios ---------------- */
function Servicios({ categorias, setCategorias }) {
  const [nuevoNombre, setNuevoNombre] = useState({});
  const [nuevoPrecio, setNuevoPrecio] = useState({});
  async function toggleActivo(catNombre, servId) {
    const nuevoValor = !categorias.find((c) => c.nombre === catNombre)?.servicios.find((s) => s.id === servId)?.activo;
    setCategorias((prev) => prev.map((cat) => cat.nombre !== catNombre ? cat : { ...cat, servicios: cat.servicios.map((s) => (s.id === servId ? { ...s, activo: nuevoValor } : s)) }));
    try { await sb(`servicios?id=eq.${servId}`, { method: "PATCH", body: JSON.stringify({ activo: nuevoValor }) }); } catch (e) { console.error(e); }
  }
  function cambiarPrecio(catNombre, servId, nuevoPrecio) {
    setCategorias((prev) => prev.map((cat) => cat.nombre !== catNombre ? cat : { ...cat, servicios: cat.servicios.map((s) => (s.id === servId ? { ...s, precio: nuevoPrecio } : s)) }));
  }
  async function guardarPrecioDB(servId, precio) {
    try { await sb(`servicios?id=eq.${servId}`, { method: "PATCH", body: JSON.stringify({ precio }) }); } catch (e) { console.error(e); }
  }
  function cambiarNombre(catNombre, servId, nombre) {
    setCategorias((prev) => prev.map((cat) => cat.nombre !== catNombre ? cat : { ...cat, servicios: cat.servicios.map((s) => (s.id === servId ? { ...s, nombre } : s)) }));
  }
  async function guardarNombreDB(servId, nombre) {
    try { await sb(`servicios?id=eq.${servId}`, { method: "PATCH", body: JSON.stringify({ nombre }) }); } catch (e) { console.error(e); }
  }
  async function eliminarServicio(catNombre, servId) {
    setCategorias((prev) => prev.map((cat) => cat.nombre !== catNombre ? cat : { ...cat, servicios: cat.servicios.filter((s) => s.id !== servId) }));
    try { await sb(`servicios?id=eq.${servId}`, { method: "DELETE" }); } catch (e) { console.error(e); }
  }
  async function agregarServicio(catNombre) {
    const nombre = (nuevoNombre[catNombre] || "").trim();
    const precio = Number((nuevoPrecio[catNombre] || "0").replace(/\D/g, "")) || 0;
    if (!nombre) return;
    const cat = categorias.find((c) => c.nombre === catNombre);
    try {
      const creado = await sb("servicios", { method: "POST", body: JSON.stringify({ categoria_id: cat.id, nombre, precio, activo: true }) });
      setCategorias((prev) => prev.map((c) => c.nombre !== catNombre ? c : { ...c, servicios: [...c.servicios, { id: creado[0].id, nombre, precio, activo: true }] }));
    } catch (e) { console.error(e); }
    setNuevoNombre((prev) => ({ ...prev, [catNombre]: "" }));
    setNuevoPrecio((prev) => ({ ...prev, [catNombre]: "" }));
  }
  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.texto, marginBottom: 4 }}>Servicios</h1>
      <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 20 }}>Editá nombre, precio, activá/desactivá o agregá servicios nuevos. Se reflejan al instante en la página de reservas.</p>
      {categorias.map((cat) => (
        <Tarjeta key={cat.nombre} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.texto, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORES_CATEGORIA[cat.nombre] || C.rosaIntenso, display: "inline-block" }} />
            {cat.nombre}
          </div>
          {cat.servicios.map((s) => (
            <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.borde}`, gap: 8 }}>
              <input value={s.nombre} onChange={(e) => cambiarNombre(cat.nombre, s.id, e.target.value)} onBlur={(e) => guardarNombreDB(s.id, e.target.value)} style={{ flex: 1, minWidth: 0, padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.borde}`, fontSize: 13, color: C.texto, background: "#FEFBFA" }} />
              {s.paquetes ? (
                <span style={{ fontSize: 11.5, color: C.dorado, fontWeight: 600, whiteSpace: "nowrap" }}>{s.paquetes.map(formatearPrecio).join(" / ")}</span>
              ) : (
                <input value={s.precio} onChange={(e) => cambiarPrecio(cat.nombre, s.id, Number(e.target.value.replace(/\D/g, "")) || 0)} onBlur={(e) => guardarPrecioDB(s.id, Number(e.target.value.replace(/\D/g, "")) || 0)} style={{ width: 84, padding: "8px 8px", borderRadius: 8, border: `1px solid ${C.borde}`, fontSize: 12.5, color: C.dorado, fontWeight: 600, textAlign: "right" }} />
              )}
              <Interruptor activo={s.activo} onChange={() => toggleActivo(cat.nombre, s.id)} />
              <button onClick={() => eliminarServicio(cat.nombre, s.id)} title="Eliminar" style={{ background: "none", border: "none", color: "#C4504F", fontSize: 15, cursor: "pointer", padding: "0 2px" }}>×</button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            <input value={nuevoNombre[cat.nombre] || ""} onChange={(e) => setNuevoNombre((prev) => ({ ...prev, [cat.nombre]: e.target.value }))} placeholder="Nombre del nuevo servicio" style={{ flex: 1, minWidth: 140, padding: "9px 10px", borderRadius: 8, border: `1px solid ${C.borde}`, fontSize: 13 }} />
            <input value={nuevoPrecio[cat.nombre] || ""} onChange={(e) => setNuevoPrecio((prev) => ({ ...prev, [cat.nombre]: e.target.value }))} placeholder="Precio" style={{ width: 90, padding: "9px 10px", borderRadius: 8, border: `1px solid ${C.borde}`, fontSize: 13 }} />
            <button onClick={() => agregarServicio(cat.nombre)} style={{ padding: "9px 16px", borderRadius: 8, border: "none", background: C.rosaIntenso, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Agregar</button>
          </div>
        </Tarjeta>
      ))}
    </div>
  );
}

/* ---------------- Categorías ---------------- */
function Categorias({ categorias, setCategorias }) {
  const [nueva, setNueva] = useState("");
  async function agregar() {
    if (!nueva.trim()) return;
    try {
      const creada = await sb("categorias", { method: "POST", body: JSON.stringify({ nombre: nueva.trim(), orden: categorias.length + 1 }) });
      setCategorias((prev) => [...prev, { id: creada[0].id, nombre: nueva.trim(), servicios: [] }]);
    } catch (e) { console.error(e); }
    setNueva("");
  }
  async function eliminar(nombre) {
    const cat = categorias.find((c) => c.nombre === nombre);
    if (!cat || cat.servicios.length > 0) return;
    setCategorias((prev) => prev.filter((c) => c.nombre !== nombre));
    try { await sb(`categorias?id=eq.${cat.id}`, { method: "DELETE" }); } catch (e) { console.error(e); }
  }
  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.texto, marginBottom: 4 }}>Categorías</h1>
      <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 20 }}>Solo se pueden eliminar categorías sin servicios cargados.</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        <input value={nueva} onChange={(e) => setNueva(e.target.value)} placeholder="Nombre de la nueva categoría" style={{ flex: 1, padding: "12px 14px", borderRadius: 14, border: `1px solid ${C.borde}`, fontSize: 14, background: "#fff" }} />
        <button onClick={agregar} style={{ padding: "0 18px", borderRadius: 14, border: "none", background: C.rosaIntenso, color: "#fff", fontWeight: 600, cursor: "pointer" }}>Agregar</button>
      </div>
      <Tarjeta style={{ padding: 0 }}>
        {categorias.map((c) => (
          <div key={c.nombre} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${C.borde}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORES_CATEGORIA[c.nombre] || C.rosaIntenso, display: "inline-block" }} />
              <span style={{ fontSize: 14, color: C.texto }}>{c.nombre}</span>
              <span style={{ fontSize: 12, color: C.textoSuave }}>({c.servicios.length} servicios)</span>
            </div>
            <button onClick={() => eliminar(c.nombre)} disabled={c.servicios.length > 0} title={c.servicios.length > 0 ? "No se puede eliminar: tiene servicios cargados" : "Eliminar"} style={{ background: "none", border: "none", color: c.servicios.length > 0 ? "#D8CFCC" : "#C4504F", fontSize: 13, cursor: c.servicios.length > 0 ? "not-allowed" : "pointer" }}>Eliminar</button>
          </div>
        ))}
      </Tarjeta>
    </div>
  );
}

/* ---------------- Bloqueos ---------------- */
function Bloqueos({ horarios, setHorarios, bloqueosDia, setBloqueosDia, bloqueosHorario, setBloqueosHorario, horariosExtra, setHorariosExtra }) {
  const [vista, setVista] = useState("dia");
  const [fechaDia, setFechaDia] = useState("");
  const [motivoDia, setMotivoDia] = useState("");
  async function agregarBloqueoDia() {
    if (!fechaDia) return;
    const motivo = motivoDia || "Sin motivo especificado";
    try {
      const creado = await sb("bloqueos_dia", { method: "POST", body: JSON.stringify({ fecha: fechaDia, motivo }) });
      setBloqueosDia((prev) => [...prev, { id: creado[0].id, fecha: fechaDia, motivo }]);
    } catch (e) { console.error(e); }
    setFechaDia(""); setMotivoDia("");
  }
  const [fechaHorario, setFechaHorario] = useState("");
  const [horarioElegido, setHorarioElegido] = useState(horarios[0] || "");
  const [motivoHorario, setMotivoHorario] = useState("");
  async function agregarBloqueoHorario() {
    if (!fechaHorario || !horarioElegido) return;
    const motivo = motivoHorario || "Sin motivo especificado";
    try {
      const creado = await sb("bloqueos_horario", { method: "POST", body: JSON.stringify({ fecha: fechaHorario, hora: horarioElegido, motivo }) });
      setBloqueosHorario((prev) => [...prev, { id: creado[0].id, fecha: fechaHorario, horario: horarioElegido, motivo }]);
    } catch (e) { console.error(e); }
    setFechaHorario(""); setMotivoHorario("");
  }
  const [fechaExtra, setFechaExtra] = useState("");
  const [horaExtra, setHoraExtra] = useState("");
  async function agregarHorarioExtra() {
    if (!fechaExtra || !horaExtra) return;
    try {
      const creado = await sb("horarios_extra", { method: "POST", body: JSON.stringify({ fecha: fechaExtra, hora: horaExtra }) });
      setHorariosExtra((prev) => [...prev, { id: creado[0].id, fecha: fechaExtra, horario: horaExtra }]);
    } catch (e) { console.error(e); }
    setFechaExtra(""); setHoraExtra("");
  }
  const [horaNueva, setHoraNueva] = useState("");
  async function agregarHorarioGeneral() {
    if (!horaNueva.trim()) return;
    try {
      await sb("horarios_generales", { method: "POST", body: JSON.stringify({ hora: horaNueva.trim() }) });
      setHorarios((prev) => [...prev, horaNueva.trim()].sort());
    } catch (e) { console.error(e); }
    setHoraNueva("");
  }
  async function quitarHorarioGeneral(h) {
    setHorarios((prev) => prev.filter((x) => x !== h));
    try { await sb(`horarios_generales?hora=eq.${encodeURIComponent(h)}`, { method: "DELETE" }); } catch (e) { console.error(e); }
  }
  async function quitarBloqueoDia(id) {
    setBloqueosDia((prev) => prev.filter((x) => x.id !== id));
    try { await sb(`bloqueos_dia?id=eq.${id}`, { method: "DELETE" }); } catch (e) { console.error(e); }
  }
  async function quitarBloqueoHorario(id) {
    setBloqueosHorario((prev) => prev.filter((x) => x.id !== id));
    try { await sb(`bloqueos_horario?id=eq.${id}`, { method: "DELETE" }); } catch (e) { console.error(e); }
  }
  async function quitarHorarioExtra(id) {
    setHorariosExtra((prev) => prev.filter((x) => x.id !== id));
    try { await sb(`horarios_extra?id=eq.${id}`, { method: "DELETE" }); } catch (e) { console.error(e); }
  }

  const tabs = [{ id: "dia", label: "Bloquear día" }, { id: "horario", label: "Bloquear horario" }, { id: "extra", label: "Horario extra" }, { id: "trabajo", label: "Horarios de trabajo" }];

  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.texto, marginBottom: 4 }}>Bloqueos y horarios</h1>
      <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 18 }}>Bloqueá días u horarios puntuales, sumá horarios extra o editá los horarios generales de atención.</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setVista(t.id)} style={{ padding: "8px 14px", borderRadius: 999, fontSize: 12.5, cursor: "pointer", border: `1px solid ${vista === t.id ? C.rosaIntenso : C.borde}`, background: vista === t.id ? C.rosaIntenso : "#fff", color: vista === t.id ? "#fff" : C.texto, fontWeight: 600 }}>{t.label}</button>
        ))}
      </div>

      {vista === "dia" && (
        <>
          <Tarjeta style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
              <input type="date" value={fechaDia} onChange={(e) => setFechaDia(e.target.value)} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.borde}`, fontSize: 13 }} />
              <input value={motivoDia} onChange={(e) => setMotivoDia(e.target.value)} placeholder="Motivo (opcional)" style={{ flex: 1, minWidth: 160, padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.borde}`, fontSize: 13 }} />
            </div>
            <button onClick={agregarBloqueoDia} style={{ padding: "10px 18px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>Bloquear día completo</button>
          </Tarjeta>
          <Tarjeta style={{ padding: 0 }}>
            {bloqueosDia.length === 0 && <div style={{ padding: 18, color: C.textoSuave, fontSize: 13, textAlign: "center" }}>No hay días bloqueados.</div>}
            {bloqueosDia.map((b) => (
              <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${C.borde}` }}>
                <div><div style={{ fontSize: 14, fontWeight: 600, color: C.texto }}>{b.fecha}</div><div style={{ fontSize: 12.5, color: C.textoSuave }}>{b.motivo}</div></div>
                <button onClick={() => quitarBloqueoDia(b.id)} style={{ background: "none", border: "none", color: "#C4504F", fontSize: 13, cursor: "pointer" }}>Quitar</button>
              </div>
            ))}
          </Tarjeta>
        </>
      )}

      {vista === "horario" && (
        <>
          <Tarjeta style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
              <input type="date" value={fechaHorario} onChange={(e) => setFechaHorario(e.target.value)} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.borde}`, fontSize: 13 }} />
              <select value={horarioElegido} onChange={(e) => setHorarioElegido(e.target.value)} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.borde}`, fontSize: 13 }}>
                {horarios.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
              <input value={motivoHorario} onChange={(e) => setMotivoHorario(e.target.value)} placeholder="Motivo (opcional)" style={{ flex: 1, minWidth: 140, padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.borde}`, fontSize: 13 }} />
            </div>
            <button onClick={agregarBloqueoHorario} style={{ padding: "10px 18px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>Bloquear ese horario</button>
          </Tarjeta>
          <Tarjeta style={{ padding: 0 }}>
            {bloqueosHorario.length === 0 && <div style={{ padding: 18, color: C.textoSuave, fontSize: 13, textAlign: "center" }}>No hay horarios puntuales bloqueados.</div>}
            {bloqueosHorario.map((b) => (
              <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${C.borde}` }}>
                <div><div style={{ fontSize: 14, fontWeight: 600, color: C.texto }}>{b.fecha} · {b.horario} hs</div><div style={{ fontSize: 12.5, color: C.textoSuave }}>{b.motivo}</div></div>
                <button onClick={() => quitarBloqueoHorario(b.id)} style={{ background: "none", border: "none", color: "#C4504F", fontSize: 13, cursor: "pointer" }}>Quitar</button>
              </div>
            ))}
          </Tarjeta>
        </>
      )}

      {vista === "extra" && (
        <>
          <Tarjeta style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 12.5, color: C.textoSuave, marginTop: 0, marginBottom: 12 }}>Sumá un horario adicional disponible solo para un día puntual.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
              <input type="date" value={fechaExtra} onChange={(e) => setFechaExtra(e.target.value)} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.borde}`, fontSize: 13 }} />
              <input type="time" value={horaExtra} onChange={(e) => setHoraExtra(e.target.value)} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.borde}`, fontSize: 13 }} />
            </div>
            <button onClick={agregarHorarioExtra} style={{ padding: "10px 18px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>Agregar horario extra</button>
          </Tarjeta>
          <Tarjeta style={{ padding: 0 }}>
            {horariosExtra.length === 0 && <div style={{ padding: 18, color: C.textoSuave, fontSize: 13, textAlign: "center" }}>No agregaste horarios extra.</div>}
            {horariosExtra.map((h) => (
              <div key={h.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${C.borde}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.texto }}>{h.fecha} · {h.horario} hs</div>
                <button onClick={() => quitarHorarioExtra(h.id)} style={{ background: "none", border: "none", color: "#C4504F", fontSize: 13, cursor: "pointer" }}>Quitar</button>
              </div>
            ))}
          </Tarjeta>
        </>
      )}

      {vista === "trabajo" && (
        <>
          <Tarjeta style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 12.5, color: C.textoSuave, marginTop: 0, marginBottom: 12 }}>Horarios generales que se ofrecen todos los días hábiles.</p>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <input type="time" value={horaNueva} onChange={(e) => setHoraNueva(e.target.value)} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.borde}`, fontSize: 13 }} />
              <button onClick={agregarHorarioGeneral} style={{ padding: "10px 18px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>Agregar horario</button>
            </div>
          </Tarjeta>
          <Tarjeta style={{ padding: 0 }}>
            {horarios.map((h) => (
              <div key={h} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${C.borde}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.texto }}>{h} hs</div>
                <button onClick={() => quitarHorarioGeneral(h)} style={{ background: "none", border: "none", color: "#C4504F", fontSize: 13, cursor: "pointer" }}>Quitar</button>
              </div>
            ))}
          </Tarjeta>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   ARCHIVOS — fichas de clientas con historial y archivos
--------------------------------------------------------- */
function VisorArchivo({ archivo, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 80, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 10 }}>
        <a href={archivo.dataUrl} download={archivo.nombre} style={{ padding: "9px 16px", borderRadius: 999, background: "#fff", color: C.texto, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>⬇ Descargar</a>
        <button onClick={onClose} style={{ padding: "9px 16px", borderRadius: 999, background: "#fff", color: C.texto, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>✕ Cerrar</button>
      </div>
      {archivo.esImagen ? (
        <img src={archivo.dataUrl} alt={archivo.nombre} style={{ maxWidth: "92%", maxHeight: "80vh", borderRadius: 8, objectFit: "contain" }} />
      ) : (
        <div style={{ background: "#fff", borderRadius: 16, padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 46, marginBottom: 12 }}>📄</div>
          <div style={{ fontSize: 14, color: C.texto, fontWeight: 600 }}>{archivo.nombre}</div>
        </div>
      )}
    </div>
  );
}

function FormularioVisita({ onGuardar, onCancelar }) {
  const [servicio, setServicio] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [archivosNuevos, setArchivosNuevos] = useState([]);
  const [visor, setVisor] = useState(null);

  function manejarArchivos(e) {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const esImagen = file.type.startsWith("image/");
      const reader = new FileReader();
      reader.onload = () => setArchivosNuevos((prev) => [...prev, { nombre: file.name, dataUrl: reader.result, esImagen }]);
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }

  function quitarArchivo(i) { setArchivosNuevos((prev) => prev.filter((_, idx) => idx !== i)); }

  function guardarYLimpiar() {
    onGuardar({ servicio, observaciones, archivos: archivosNuevos });
    setServicio(""); setObservaciones(""); setArchivosNuevos([]);
  }

  return (
    <Tarjeta style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.texto, marginBottom: 12 }}>Nueva visita</div>
      <label style={{ fontSize: 11, color: C.textoSuave, display: "block", marginBottom: 5, textTransform: "uppercase" }}>Servicio realizado</label>
      <input value={servicio} onChange={(e) => setServicio(e.target.value)} placeholder="Ej: Perfilado de cejas + Henna" style={{ width: "100%", padding: "11px 12px", borderRadius: 12, border: `1px solid ${C.borde}`, fontSize: 14, marginBottom: 12, boxSizing: "border-box" }} />
      <label style={{ fontSize: 11, color: C.textoSuave, display: "block", marginBottom: 5, textTransform: "uppercase" }}>Observaciones</label>
      <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} placeholder="Notas sobre esta visita..." style={{ width: "100%", minHeight: 70, padding: 10, borderRadius: 12, border: `1px solid ${C.borde}`, fontSize: 13.5, marginBottom: 12, boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }} />
      <label style={{ display: "block", textAlign: "center", padding: "14px 12px", borderRadius: 14, border: `1.5px dashed ${C.rosaEmpolvado}`, cursor: "pointer", marginBottom: 12, fontSize: 13, color: C.rosaIntenso }}>
        📎 Cargar imágenes, PDF o cualquier archivo
        <input type="file" accept="image/*,application/pdf,*/*" multiple onChange={manejarArchivos} style={{ display: "none" }} />
      </label>
      {archivosNuevos.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {archivosNuevos.map((a, i) => (
            <div key={i} style={{ position: "relative" }}>
              <button onClick={() => setVisor(a)} style={{ width: 60, height: 60, borderRadius: 10, border: `1px solid ${C.borde}`, overflow: "hidden", cursor: "pointer", padding: 0, background: C.rosaClaro }}>
                {a.esImagen ? <img src={a.dataUrl} alt={a.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ fontSize: 20 }}>📄</div>}
              </button>
              <button onClick={() => quitarArchivo(i)} style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: "#C4504F", color: "#fff", border: "none", fontSize: 12, cursor: "pointer" }}>×</button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onCancelar} style={{ flex: 1, padding: "12px", borderRadius: 999, border: `1px solid ${C.borde}`, background: "#fff", color: C.textoSuave, fontSize: 13.5, cursor: "pointer" }}>Cancelar</button>
        <button onClick={guardarYLimpiar} disabled={!servicio.trim() && !observaciones.trim() && archivosNuevos.length === 0} style={{ flex: 1, padding: "12px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>Guardar</button>
      </div>
      {visor && <VisorArchivo archivo={visor} onClose={() => setVisor(null)} />}
    </Tarjeta>
  );
}

function Archivos({ fichas, setFichas }) {
  const [busqueda, setBusqueda] = useState("");
  const [fichaAbiertaId, setFichaAbiertaId] = useState(null);
  const [creandoNueva, setCreandoNueva] = useState(false);
  const [nombreNueva, setNombreNueva] = useState("");
  const [visor, setVisor] = useState(null);

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return fichas;
    return fichas.filter((f) => f.nombre.toLowerCase().includes(q));
  }, [busqueda, fichas]);

  function crearFicha() {
    if (!nombreNueva.trim()) return;
    const id = Date.now();
    setFichas((prev) => [{ id, nombre: nombreNueva.trim(), entradas: [] }, ...prev]);
    setNombreNueva("");
    setCreandoNueva(false);
    setFichaAbiertaId(id);
  }

  function agregarEntrada(fichaId, entrada) {
    setFichas((prev) => prev.map((f) => f.id !== fichaId ? f : { ...f, entradas: [{ id: Date.now(), fecha: new Date().toLocaleString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }), ...entrada }, ...f.entradas] }));
  }

  const fichaAbierta = fichas.find((f) => f.id === fichaAbiertaId);

  if (fichaAbierta) {
    return (
      <div>
        <button onClick={() => setFichaAbiertaId(null)} style={{ background: "none", border: "none", color: C.rosaIntenso, fontSize: 13, cursor: "pointer", marginBottom: 12, padding: 0 }}>← Volver a fichas</button>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: C.texto, marginBottom: 2 }}>{fichaAbierta.nombre}</h1>
        <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 20 }}>{fichaAbierta.entradas.length} visita(s) registrada(s).</p>
        <FormularioVisita onCancelar={() => {}} onGuardar={(entrada) => agregarEntrada(fichaAbierta.id, entrada)} />
        <div style={{ fontSize: 13.5, fontWeight: 700, color: C.texto, marginBottom: 10 }}>Historial de visitas</div>
        {fichaAbierta.entradas.length === 0 && <p style={{ fontSize: 13, color: C.textoSuave }}>Todavía no hay visitas registradas.</p>}
        {fichaAbierta.entradas.map((en) => (
          <Tarjeta key={en.id} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: C.dorado, fontWeight: 700, marginBottom: 6 }}>{en.fecha}</div>
            {en.servicio && <div style={{ fontSize: 13.5, fontWeight: 600, color: C.texto, marginBottom: 4 }}>{en.servicio}</div>}
            {en.observaciones && <div style={{ fontSize: 13, color: C.texto, marginBottom: 10, lineHeight: 1.5 }}>{en.observaciones}</div>}
            {en.archivos?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {en.archivos.map((a, i) => (
                  <button key={i} onClick={() => setVisor(a)} style={{ width: 60, height: 60, borderRadius: 10, border: `1px solid ${C.borde}`, overflow: "hidden", cursor: "pointer", padding: 0, background: C.rosaClaro }}>
                    {a.esImagen ? <img src={a.dataUrl} alt={a.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ fontSize: 20 }}>📄</div>}
                  </button>
                ))}
              </div>
            )}
          </Tarjeta>
        ))}
        {visor && <VisorArchivo archivo={visor} onClose={() => setVisor(null)} />}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.texto, margin: 0 }}>Archivos</h1>
        <button onClick={() => setCreandoNueva(true)} style={{ padding: "9px 16px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Crear ficha nueva</button>
      </div>
      <p style={{ color: C.textoSuave, fontSize: 13, margin: "8px 0 16px" }}>Fichas de clientas con historial de visitas, observaciones y archivos.</p>
      <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar ficha por nombre..." style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: `1px solid ${C.borde}`, marginBottom: 16, fontSize: 14, boxSizing: "border-box", background: "#fff" }} />
      <Tarjeta style={{ padding: 0 }}>
        {filtradas.length === 0 && <div style={{ padding: 20, textAlign: "center", color: C.textoSuave, fontSize: 13 }}>No hay fichas todavía.</div>}
        {filtradas.map((f) => (
          <button key={f.id} onClick={() => setFichaAbiertaId(f.id)} style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${C.borde}`, background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.texto }}>{f.nombre}</div>
            <span style={{ fontSize: 12, color: C.dorado, fontWeight: 600 }}>{f.entradas.length} visita(s)</span>
          </button>
        ))}
      </Tarjeta>
      {creandoNueva && (
        <Modal onClose={() => setCreandoNueva(false)}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.texto, marginBottom: 16 }}>Crear ficha nueva</div>
          <label style={{ fontSize: 11, color: C.textoSuave, display: "block", marginBottom: 5, textTransform: "uppercase" }}>Nombre y apellido</label>
          <input value={nombreNueva} onChange={(e) => setNombreNueva(e.target.value)} onKeyDown={(e) => e.key === "Enter" && crearFicha()} placeholder="Ej: María López" style={{ width: "100%", padding: "11px 12px", borderRadius: 12, border: `1px solid ${C.borde}`, fontSize: 14, marginBottom: 18, boxSizing: "border-box" }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setCreandoNueva(false)} style={{ flex: 1, padding: "12px", borderRadius: 999, border: `1px solid ${C.borde}`, background: "#fff", color: C.textoSuave, fontSize: 13.5, cursor: "pointer" }}>Cancelar</button>
            <button onClick={crearFicha} style={{ flex: 1, padding: "12px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>Crear</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ---------------- Observaciones (ficha de notas por clienta) ---------------- */
function Observaciones({ clientas, observaciones, setObservaciones }) {
  const [clienteAbierto, setClienteAbierto] = useState(null);
  const [nuevaNota, setNuevaNota] = useState("");
  const [nuevaFoto, setNuevaFoto] = useState(null);

  function manejarFoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setNuevaFoto(reader.result);
    reader.readAsDataURL(file);
  }

  function guardarAnotacion() {
    if (!nuevaNota.trim() && !nuevaFoto) return;
    const entrada = { id: Date.now(), fecha: new Date().toLocaleString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }), texto: nuevaNota.trim(), foto: nuevaFoto };
    setObservaciones((prev) => ({ ...prev, [clienteAbierto.id]: [entrada, ...(prev[clienteAbierto.id] || [])] }));
    setNuevaNota(""); setNuevaFoto(null);
  }

  if (!clienteAbierto) {
    return (
      <div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.texto, marginBottom: 4 }}>Observaciones</h1>
        <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 20 }}>Elegí una clienta para ver su historial de anotaciones privadas.</p>
        <Tarjeta style={{ padding: 0 }}>
          {clientas.map((c) => (
            <button key={c.id} onClick={() => setClienteAbierto(c)} style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${C.borde}`, background: "none", border: "none", cursor: "pointer" }}>
              <div><div style={{ fontSize: 14, fontWeight: 600, color: C.texto }}>{c.nombre}</div><div style={{ fontSize: 12.5, color: C.textoSuave }}>Última visita: {c.ultimaVisita}</div></div>
              <span style={{ fontSize: 12, color: C.dorado, fontWeight: 600 }}>{(observaciones[c.id] || []).length} anotación(es)</span>
            </button>
          ))}
        </Tarjeta>
      </div>
    );
  }

  const historial = observaciones[clienteAbierto.id] || [];
  return (
    <div>
      <button onClick={() => setClienteAbierto(null)} style={{ background: "none", border: "none", color: C.rosaIntenso, fontSize: 13, cursor: "pointer", marginBottom: 12, padding: 0 }}>← Volver a clientas</button>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: C.texto, marginBottom: 2 }}>{clienteAbierto.nombre}</h1>
      <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 20 }}>{clienteAbierto.celular}</p>
      <Tarjeta style={{ marginBottom: 20 }}>
        <textarea value={nuevaNota} onChange={(e) => setNuevaNota(e.target.value)} placeholder="Escribí tu observación..." style={{ width: "100%", minHeight: 70, padding: 10, borderRadius: 12, border: `1px solid ${C.borde}`, fontSize: 13.5, marginBottom: 12, boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <label style={{ fontSize: 12.5, padding: "8px 14px", borderRadius: 999, border: `1.5px dashed ${C.rosaEmpolvado}`, cursor: "pointer", color: C.rosaIntenso }}>
            📷 Adjuntar foto
            <input type="file" accept="image/*" onChange={manejarFoto} style={{ display: "none" }} />
          </label>
          {nuevaFoto && <img src={nuevaFoto} alt="preview" style={{ width: 42, height: 42, borderRadius: 8, objectFit: "cover" }} />}
        </div>
        <button onClick={guardarAnotacion} style={{ width: "100%", padding: "12px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Guardar anotación</button>
      </Tarjeta>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: C.texto, marginBottom: 10 }}>Historial</div>
      {historial.length === 0 && <p style={{ fontSize: 13, color: C.textoSuave }}>Todavía no hay anotaciones.</p>}
      {historial.map((h) => (
        <Tarjeta key={h.id} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: C.dorado, fontWeight: 700, marginBottom: 6 }}>{h.fecha}</div>
          {h.texto && <div style={{ fontSize: 13.5, color: C.texto, marginBottom: h.foto ? 10 : 0, lineHeight: 1.5 }}>{h.texto}</div>}
          {h.foto && <img src={h.foto} alt="seguimiento" style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 12 }} />}
        </Tarjeta>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   RECORDATORIOS — estado de envío y respuesta de la clienta
--------------------------------------------------------- */
function Recordatorios({ turnosPorFecha, setTurnosPorFecha }) {
  const en48hs = new Date(HOY.getFullYear(), HOY.getMonth(), HOY.getDate() + 2);
  const claveManana = claveFecha(en48hs);
  const turnosManana = turnosPorFecha[claveManana] || [];

  async function marcarEnviado(hora) {
    const turno = turnosManana.find((t) => t.hora === hora);
    setTurnosPorFecha((prev) => ({ ...prev, [claveManana]: (prev[claveManana] || []).map((t) => t.hora === hora ? { ...t, recordatorio: { ...t.recordatorio, enviado: true } } : t) }));
    if (turno?.id) {
      try { await sb(`turnos?id=eq.${turno.id}`, { method: "PATCH", body: JSON.stringify({ confirmacion_enviada: true }) }); } catch (e) { console.error(e); }
    }
  }

  const respuestaInfo = { confirmado: { label: "Confirmó el turno", color: "#5FA85C" }, cancelado: { label: "Canceló el turno", color: "#C4504F" } };

  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.texto, marginBottom: 4 }}>Recordatorios</h1>
      <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 20 }}>Turnos del {formatearFechaLarga(en48hs)} — a esta gente se le envía el mensaje de confirmación 48 hs antes, a las 10:00 hs. Acá ves si ya se envió y si la clienta confirmó o canceló.</p>
      <Tarjeta style={{ padding: 0 }}>
        {turnosManana.length === 0 && <div style={{ padding: 20, textAlign: "center", color: C.textoSuave, fontSize: 13 }}>No hay turnos agendados para esa fecha todavía.</div>}
        {turnosManana.map((t) => (
          <div key={t.id} style={{ padding: "14px 16px", borderBottom: `1px solid ${C.borde}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.texto }}>{t.hora} · {t.clienteNombre}</div>
              {t.recordatorio?.enviado ? (
                <span style={{ fontSize: 11, fontWeight: 700, color: "#5FA85C" }}>✓ Enviado</span>
              ) : (
                <button onClick={() => marcarEnviado(t.hora)} style={{ fontSize: 11.5, fontWeight: 600, color: C.rosaIntenso, background: "none", border: `1px solid ${C.rosaIntenso}`, borderRadius: 999, padding: "4px 10px", cursor: "pointer" }}>Marcar enviado</button>
              )}
            </div>
            <div style={{ fontSize: 12.5, color: C.textoSuave, marginBottom: t.recordatorio?.respuesta ? 6 : 0 }}>{t.servicio}</div>
            {t.recordatorio?.respuesta && <span style={{ fontSize: 11.5, fontWeight: 700, color: respuestaInfo[t.recordatorio.respuesta].color }}>● {respuestaInfo[t.recordatorio.respuesta].label}</span>}
            {t.recordatorio?.enviado && !t.recordatorio?.respuesta && <span style={{ fontSize: 11.5, color: C.textoSuave }}>Esperando respuesta de la clienta...</span>}
          </div>
        ))}
      </Tarjeta>
    </div>
  );
}

/* ---------------------------------------------------------
   MENSAJES — bienvenida, confirmación (con simulador) y recordatorio
--------------------------------------------------------- */
function Mensajes({ mensajes, setMensajes, turnosPorFecha, setTurnosPorFecha }) {
  const [seccionAbierta, setSeccionAbierta] = useState(null);
  const [texto, setTexto] = useState("");
  const [guardado, setGuardado] = useState(false);

  const en48hs = new Date(HOY.getFullYear(), HOY.getMonth(), HOY.getDate() + 2);
  const claveManana = claveFecha(en48hs);
  const turnosManana = turnosPorFecha[claveManana] || [];
  const [turnoSimulado, setTurnoSimulado] = useState(turnosManana[0]?.hora || "");

  function abrir(id) { setSeccionAbierta(id); setTexto(mensajes[id]); setGuardado(false); }
  async function guardar() {
    setMensajes((prev) => ({ ...prev, [seccionAbierta]: texto }));
    setGuardado(true); setTimeout(() => setGuardado(false), 1500);
    try { await sb(`mensajes_config?id=eq.${seccionAbierta}`, { method: "PATCH", body: JSON.stringify({ texto }) }); } catch (e) { console.error(e); }
  }

  async function simularRespuesta(respuesta) {
    if (!turnoSimulado) return;
    const turno = turnosManana.find((t) => t.hora === turnoSimulado);
    setTurnosPorFecha((prev) => ({ ...prev, [claveManana]: (prev[claveManana] || []).map((t) => t.hora === turnoSimulado ? { ...t, recordatorio: { enviado: true, respuesta } } : t) }));
    if (turno?.id) {
      try { await sb(`turnos?id=eq.${turno.id}`, { method: "PATCH", body: JSON.stringify({ confirmacion_enviada: true, confirmacion_respuesta: respuesta }) }); } catch (e) { console.error(e); }
    }
  }

  const tarjetas = [
    { id: "bienvenida", icono: "🩷", titulo: "Mensaje de bienvenida", desc: "Se envía automáticamente al número que la clienta registró cuando marca \"Soy nueva\" al reservar su primer turno. Usalo para darle la bienvenida y contarle la dirección del local." },
    { id: "confirmacion", icono: "✅", titulo: "Mensaje de confirmación", desc: "Se envía por WhatsApp al número que la clienta registró, 48 hs antes del turno a las 10:00 hs, con dos botones para que confirme o cancele. Su respuesta queda registrada en Recordatorios." },
    { id: "recordatorio", icono: "🔔", titulo: "Recordatorio", desc: "Se envía a todas las clientas 24 hs antes del turno, como último aviso." },
  ];

  if (seccionAbierta) {
    const info = tarjetas.find((t) => t.id === seccionAbierta);
    return (
      <div>
        <button onClick={() => setSeccionAbierta(null)} style={{ background: "none", border: "none", color: C.rosaIntenso, fontSize: 13, cursor: "pointer", marginBottom: 12, padding: 0 }}>← Volver a mensajes</button>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: C.texto, marginBottom: 4 }}>{info.icono} {info.titulo}</h1>
        <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 18 }}>{info.desc}</p>
        <Tarjeta style={{ marginBottom: 20 }}>
          <textarea value={texto} onChange={(e) => setTexto(e.target.value)} style={{ width: "100%", minHeight: 110, padding: 12, borderRadius: 12, border: `1px solid ${C.borde}`, fontSize: 14, boxSizing: "border-box", fontFamily: "inherit", resize: "vertical", marginBottom: 14 }} />
          {seccionAbierta === "confirmacion" && (
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <div style={{ flex: 1, padding: "10px", borderRadius: 999, background: "#5FA85C22", color: "#5FA85C", textAlign: "center", fontSize: 13, fontWeight: 600 }}>✅ Confirmar</div>
              <div style={{ flex: 1, padding: "10px", borderRadius: 999, background: "#C4504F22", color: "#C4504F", textAlign: "center", fontSize: 13, fontWeight: 600 }}>❌ Cancelar</div>
            </div>
          )}
          <button onClick={guardar} style={{ width: "100%", padding: "13px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{guardado ? "Guardado ✓" : "Guardar mensaje"}</button>
        </Tarjeta>
        {seccionAbierta === "confirmacion" && (
          <Tarjeta>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.texto, marginBottom: 4 }}>Simular respuesta de la clienta</div>
            <p style={{ fontSize: 12, color: C.textoSuave, marginBottom: 12 }}>Para probar el sistema: elegí un turno de mañana y simulá qué pasa cuando la clienta toca "Confirmar" o "Cancelar" en el WhatsApp real. El resultado queda registrado en Recordatorios.</p>
            {turnosManana.length === 0 ? (
              <p style={{ fontSize: 12.5, color: C.textoSuave }}>No hay turnos agendados para mañana todavía.</p>
            ) : (
              <>
                <select value={turnoSimulado} onChange={(e) => setTurnoSimulado(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: `1px solid ${C.borde}`, fontSize: 13.5, marginBottom: 12 }}>
                  {turnosManana.map((t) => <option key={t.hora} value={t.hora}>{t.hora} · {t.clienteNombre}</option>)}
                </select>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => simularRespuesta("confirmado")} style={{ flex: 1, padding: "10px", borderRadius: 999, border: "1px solid #5FA85C", background: "#fff", color: "#5FA85C", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Simular: Confirmar</button>
                  <button onClick={() => simularRespuesta("cancelado")} style={{ flex: 1, padding: "10px", borderRadius: 999, border: "1px solid #C4504F", background: "#fff", color: "#C4504F", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Simular: Cancelar</button>
                </div>
              </>
            )}
          </Tarjeta>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.texto, marginBottom: 4 }}>Mensajes</h1>
      <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 20 }}>Editá los mensajes automáticos que reciben las clientas.</p>
      {tarjetas.map((t) => (
        <button key={t.id} onClick={() => abrir(t.id)} style={{ width: "100%", textAlign: "left", display: "block", background: "none", border: "none", cursor: "pointer", marginBottom: 12 }}>
          <Tarjeta>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.texto, marginBottom: 4 }}>{t.icono} {t.titulo}</div>
            <div style={{ fontSize: 12.5, color: C.textoSuave }}>{t.desc}</div>
          </Tarjeta>
        </button>
      ))}
    </div>
  );
}

function Configuracion({ tokenSesion }) {
  const [config, setConfig] = useState({ nombre: "Piensa en Rosa", whatsapp: "", aliasMP: "piensaenrosa", titular: "Daiana Brito", montoDemora: 3000, montoAusentismo: 15000, costoDesmaquillado: 2000 });
  const [guardado, setGuardado] = useState(false);
  const [cargando, setCargando] = useState(true);

  const [claveNueva, setClaveNueva] = useState("");
  const [claveNuevaRepetida, setClaveNuevaRepetida] = useState("");
  const [mensajeCuenta, setMensajeCuenta] = useState("");
  const [guardandoCuenta, setGuardandoCuenta] = useState(false);

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await sb("configuracion?select=*&id=eq.1");
        if (datos[0]) {
          setConfig({
            nombre: datos[0].nombre ?? "Piensa en Rosa",
            whatsapp: datos[0].whatsapp ?? "",
            aliasMP: datos[0].alias_mp ?? "",
            titular: datos[0].titular ?? "",
            montoDemora: datos[0].monto_demora ?? 3000,
            montoAusentismo: datos[0].monto_ausentismo ?? 15000,
            costoDesmaquillado: datos[0].costo_desmaquillado ?? 2000,
          });
        }
      } catch (e) { console.error(e); }
      setCargando(false);
    }
    cargar();
  }, []);

  async function guardar() {
    setGuardado(true); setTimeout(() => setGuardado(false), 1800);
    try {
      await sb("configuracion?id=eq.1", {
        method: "PATCH",
        body: JSON.stringify({
          nombre: config.nombre,
          whatsapp: config.whatsapp,
          alias_mp: config.aliasMP,
          titular: config.titular,
          monto_demora: Number(config.montoDemora) || 0,
          monto_ausentismo: Number(config.montoAusentismo) || 0,
          costo_desmaquillado: Number(config.costoDesmaquillado) || 0,
        }),
      });
    } catch (e) { console.error(e); }
  }

  async function cambiarClave() {
    setMensajeCuenta("");
    if (claveNueva.length < 6) { setMensajeCuenta("La contraseña nueva debe tener al menos 6 caracteres."); return; }
    if (claveNueva !== claveNuevaRepetida) { setMensajeCuenta("Las dos contraseñas no coinciden."); return; }
    setGuardandoCuenta(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        method: "PUT",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${tokenSesion}`, "Content-Type": "application/json" },
        body: JSON.stringify({ password: claveNueva }),
      });
      if (!res.ok) throw new Error("No se pudo actualizar");
      setMensajeCuenta("Contraseña actualizada ✓");
      setClaveNueva(""); setClaveNuevaRepetida("");
    } catch (e) {
      setMensajeCuenta("No pudimos cambiar la contraseña. Probá de nuevo.");
    }
    setGuardandoCuenta(false);
  }

  function campo(label, key) {
    return (
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 11, color: C.textoSuave, display: "block", marginBottom: 5, textTransform: "uppercase" }}>{label}</label>
        <input value={config[key]} onChange={(e) => setConfig((prev) => ({ ...prev, [key]: e.target.value }))} style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: `1px solid ${C.borde}`, fontSize: 14, boxSizing: "border-box", background: "#fff" }} />
      </div>
    );
  }
  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.texto, marginBottom: 4 }}>Configuración</h1>
      <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 20 }}>Estos datos se usan en los mensajes y textos que ven las clientas. El WhatsApp de contacto es el que se usa cuando una clienta toca "Consultar sobre mi turno".</p>
      <Tarjeta style={{ marginBottom: 18 }}>
        {campo("Nombre del negocio", "nombre")}
        {campo("WhatsApp de contacto (ej: 5491123456789)", "whatsapp")}
        {campo("Alias de Mercado Pago", "aliasMP")}
        {campo("Titular de la cuenta", "titular")}
        {campo("Monto por demora ($)", "montoDemora")}
        {campo("Monto por ausentismo ($)", "montoAusentismo")}
        {campo("Costo por desmaquillado ($)", "costoDesmaquillado")}
        <button onClick={guardar} style={{ width: "100%", padding: "13px", borderRadius: 999, border: "none", background: C.rosaIntenso, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 6 }}>
          {guardado ? "Guardado ✓" : "Guardar cambios"}
        </button>
      </Tarjeta>

      <div style={{ fontSize: 15, fontWeight: 700, color: C.texto, marginBottom: 4 }}>🔒 Cuenta</div>
      <p style={{ color: C.textoSuave, fontSize: 13, marginBottom: 14 }}>Cambiá tu contraseña de acceso al panel cuando quieras.</p>
      <Tarjeta>
        <label style={{ fontSize: 11, color: C.textoSuave, display: "block", marginBottom: 5, textTransform: "uppercase" }}>Contraseña nueva</label>
        <input type="password" value={claveNueva} onChange={(e) => setClaveNueva(e.target.value)} placeholder="Mínimo 6 caracteres" style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: `1px solid ${C.borde}`, marginBottom: 14, fontSize: 14, boxSizing: "border-box", background: "#fff" }} />
        <label style={{ fontSize: 11, color: C.textoSuave, display: "block", marginBottom: 5, textTransform: "uppercase" }}>Repetir contraseña nueva</label>
        <input type="password" value={claveNuevaRepetida} onChange={(e) => setClaveNuevaRepetida(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: `1px solid ${C.borde}`, marginBottom: 14, fontSize: 14, boxSizing: "border-box", background: "#fff" }} />
        {mensajeCuenta && <p style={{ fontSize: 12.5, color: mensajeCuenta.includes("✓") ? "#5FA85C" : "#9C4A55", marginBottom: 12 }}>{mensajeCuenta}</p>}
        <button onClick={cambiarClave} disabled={guardandoCuenta} style={{ width: "100%", padding: "13px", borderRadius: 999, border: `1px solid ${C.rosaIntenso}`, background: "#fff", color: C.rosaIntenso, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          {guardandoCuenta ? "Guardando..." : "Cambiar contraseña"}
        </button>
      </Tarjeta>
    </div>
  );
}

/* ---------------------------------------------------------
   APP PRINCIPAL
--------------------------------------------------------- */
export default function PanelAdministracion() {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [tokenSesion, setTokenSesion] = useState(null);
  const [seccion, setSeccion] = useState("dashboard");
  const [sidebarAbierta, setSidebarAbierta] = useState(true);

  const [clientas, setClientas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [horarios, setHorarios] = useState(HORARIOS_DEFECTO);
  const [bloqueosDia, setBloqueosDia] = useState([]);
  const [bloqueosHorario, setBloqueosHorario] = useState([]);
  const [horariosExtra, setHorariosExtra] = useState([]);
  const [turnosPorFecha, setTurnosPorFecha] = useState({});
  const [fichas, setFichas] = useState([]);
  const [observaciones, setObservaciones] = useState({});
  const [mensajes, setMensajes] = useState(MENSAJES_INICIALES);
  const [cargandoDatos, setCargandoDatos] = useState(false);

  useEffect(() => {
    if (!sesionIniciada) return;
    async function cargarTodo() {
      setCargandoDatos(true);
      try {
        const [clientasDB, categoriasDB, serviciosDB, paquetesDB, horariosDB, extraDB, bDiaDB, bHoraDB, turnosDB, mensajesDB] = await Promise.all([
          sb("clientas?select=id,nombre,celular,estado&order=nombre.asc"),
          sb("categorias?select=id,nombre,orden&order=orden.asc"),
          sb("servicios?select=id,nombre,precio,activo,categoria_id,orden&order=orden.asc"),
          sb("servicio_paquetes?select=id,servicio_id,sesiones,precio&order=sesiones.asc"),
          sb("horarios_generales?select=hora&order=hora.asc"),
          sb("horarios_extra?select=id,fecha,hora"),
          sb("bloqueos_dia?select=id,fecha,motivo"),
          sb("bloqueos_horario?select=id,fecha,hora,motivo"),
          sb("turnos?select=id,clienta_id,cliente_nombre,fecha,hora,servicio_nombre,categoria_nombre,precio,estado,recordatorio_enviado,recordatorio_respuesta,confirmacion_enviada,confirmacion_respuesta"),
          sb("mensajes_config?select=id,texto"),
        ]);

        setClientas(clientasDB.map((c) => ({ id: c.id, nombre: c.nombre, celular: c.celular, estado: c.estado, visitas: 0, ultimaVisita: "—", proximoTurno: "—" })));

        setCategorias(categoriasDB.map((cat) => ({
          id: cat.id,
          nombre: cat.nombre,
          servicios: serviciosDB.filter((s) => s.categoria_id === cat.id).map((s) => {
            const paquetes = paquetesDB.filter((p) => p.servicio_id === s.id);
            return { id: s.id, nombre: s.nombre, precio: s.precio, activo: s.activo, paquetes: paquetes.length > 0 ? paquetes.map((p) => p.precio) : undefined };
          }),
        })));

        setHorarios(horariosDB.map((h) => h.hora));
        setHorariosExtra(extraDB.map((h) => ({ id: h.id, fecha: h.fecha, horario: h.hora })));
        setBloqueosDia(bDiaDB.map((b) => ({ id: b.id, fecha: b.fecha, motivo: b.motivo })));
        setBloqueosHorario(bHoraDB.map((b) => ({ id: b.id, fecha: b.fecha, horario: b.hora, motivo: b.motivo })));

        const agrupado = {};
        turnosDB.forEach((t) => {
          if (!agrupado[t.fecha]) agrupado[t.fecha] = [];
          agrupado[t.fecha].push({
            id: t.id,
            clientaId: t.clienta_id,
            hora: t.hora,
            clienteNombre: t.cliente_nombre,
            servicio: t.servicio_nombre,
            categoria: t.categoria_nombre,
            estado: t.estado,
            recordatorio: { enviado: t.confirmacion_enviada, respuesta: t.confirmacion_respuesta },
          });
        });
        Object.keys(agrupado).forEach((f) => agrupado[f].sort((a, b) => a.hora.localeCompare(b.hora)));
        setTurnosPorFecha(agrupado);

        const mens = { ...MENSAJES_INICIALES };
        mensajesDB.forEach((m) => { mens[m.id] = m.texto; });
        setMensajes(mens);
      } catch (e) {
        console.error("Error cargando datos de Supabase:", e);
      } finally {
        setCargandoDatos(false);
      }
    }
    cargarTodo();
  }, [sesionIniciada]);

  if (!sesionIniciada) return <Login onIngresar={(token) => { setTokenSesion(token); setSesionIniciada(true); }} />;

  const titulo = MENU.find((m) => m.id === seccion)?.label || "";
  const turnosHoy = turnosPorFecha[CLAVE_HOY] || [];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <Sidebar activa={seccion} onCambiar={setSeccion} onSalir={() => { setSesionIniciada(false); setTokenSesion(null); }} abierta={sidebarAbierta} onCerrarMovil={() => setSidebarAbierta(false)} />
      <div style={{ marginLeft: sidebarAbierta ? 230 : 0, transition: "margin-left .2s ease" }}>
        <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.borde}`, background: "#fff", display: "flex", alignItems: "center", gap: 14, position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={() => setSidebarAbierta(!sidebarAbierta)} style={{ background: "none", border: `1px solid ${C.borde}`, borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 15 }}>☰</button>
          <div style={{ fontSize: 13, color: C.textoSuave }}>Piensa en Rosa / <strong style={{ color: C.texto }}>{titulo}</strong></div>
          {cargandoDatos && <div style={{ fontSize: 11.5, color: C.rosaIntenso, marginLeft: "auto" }}>Sincronizando...</div>}
        </div>
        <div style={{ padding: 24, maxWidth: 900 }}>
          {seccion === "dashboard" && <Dashboard turnosHoy={turnosHoy} clientas={clientas} />}
          {seccion === "agenda" && (
            <Agenda turnosPorFecha={turnosPorFecha} setTurnosPorFecha={setTurnosPorFecha} horarios={horarios} horariosExtra={horariosExtra} bloqueosDia={bloqueosDia} bloqueosHorario={bloqueosHorario} clientas={clientas} categorias={categorias} />
          )}
          {seccion === "clientas" && <Clientas clientas={clientas} />}
          {seccion === "servicios" && <Servicios categorias={categorias} setCategorias={setCategorias} />}
          {seccion === "categorias" && <Categorias categorias={categorias} setCategorias={setCategorias} />}
          {seccion === "bloqueos" && (
            <Bloqueos horarios={horarios} setHorarios={setHorarios} bloqueosDia={bloqueosDia} setBloqueosDia={setBloqueosDia} bloqueosHorario={bloqueosHorario} setBloqueosHorario={setBloqueosHorario} horariosExtra={horariosExtra} setHorariosExtra={setHorariosExtra} />
          )}
          {seccion === "archivos" && <Archivos fichas={fichas} setFichas={setFichas} />}
          {seccion === "observaciones" && <Observaciones clientas={clientas} observaciones={observaciones} setObservaciones={setObservaciones} />}
          {seccion === "recordatorios" && <Recordatorios turnosPorFecha={turnosPorFecha} setTurnosPorFecha={setTurnosPorFecha} />}
          {seccion === "mensajes" && <Mensajes mensajes={mensajes} setMensajes={setMensajes} turnosPorFecha={turnosPorFecha} setTurnosPorFecha={setTurnosPorFecha} />}
          {seccion === "configuracion" && <Configuracion tokenSesion={tokenSesion} />}
        </div>
      </div>
    </div>
  );
}
