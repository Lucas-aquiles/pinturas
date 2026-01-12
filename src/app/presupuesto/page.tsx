"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  FileText,
  Save,
  RefreshCw,
  User,
  MapPin,
  Phone,
  Mail,
  Info,
  CheckCircle,
  Printer,
  Settings,
  LogOut,
  Edit2,
  DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ServicioItem {
  id: number;
  nombre: string;
  costoUnitario: number;
  cantidad: number;
  subtotal: number;
}

export default function Presupuesto() {
  const router = useRouter();

  // Estados principales
  const [activeTab, setActiveTab] = useState<"calcular" | "ver" | "config">(
    "calcular"
  );
  const [isLoaded, setIsLoaded] = useState(false); // Para evitar errores de hidratación

  // Lista base de servicios
  const serviciosBase: ServicioItem[] = [
    {
      id: 1,
      nombre:
        "Preparación de paredes interiores (Enduido completo y lijado técnico)",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 2,
      nombre: "Pintura de Paredes Interiores (Látex Satinado/Mate Premium)",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 3,
      nombre: "Pintura de Cielorrasos (Látex Antihongo)",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 4,
      nombre: "Tratamiento de juntas en construcción en seco (Durlock)",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 5,
      nombre: "Pintura de Zócalos (Metros lineales)",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 6,
      nombre: "Lacado/Esmaltado de puertas y marcos (Unidad)",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 7,
      nombre: "Barnizado/Cetol en cielorrasos de madera y vigas",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 8,
      nombre: "Esmaltado de herrería fina (Barandas y rejas,etc)",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 9,
      nombre: "Hidrolavado profundo de fachadas y muros externos",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 10,
      nombre: "Tratamiento de grietas y fisuras con sellador elastomérico",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 11,
      nombre: "Aplicación de Revestimiento Plástico (Tipo Tarquini/Revear)",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 12,
      nombre: "Pintura Impermeabilizante de muros exteriores",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 13,
      nombre: "Tratamiento de Decks de madera (Protectores/Aceites)",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 14,
      nombre: "Armado de andamiaje y trabajos en doble altura",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 15,
      nombre: "Limpieza fina de obra y entrega de unidad",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
    {
      id: 16,
      nombre: "Otros trabajos",
      costoUnitario: 0,
      cantidad: 0,
      subtotal: 0,
    },
  ];

  const [servicios, setServicios] = useState<ServicioItem[]>(serviciosBase);
  const [datosCliente, setDatosCliente] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
  });
  const [observaciones, setObservaciones] = useState("");
  const [validezDias, setValidezDias] = useState(15);

  // 1. CARGAR PRECIOS DESDE LOCAL STORAGE AL INICIAR
  useEffect(() => {
    const preciosGuardados = localStorage.getItem("preciosServicios");
    if (preciosGuardados) {
      try {
        setServicios(JSON.parse(preciosGuardados));
      } catch (e) {
        console.error("Error al cargar precios", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. FUNCIÓN PARA GUARDAR PRECIOS EN LOCAL STORAGE
  const guardarPreciosEnStorage = (datosALog: ServicioItem[]) => {
    localStorage.setItem("preciosServicios", JSON.stringify(datosALog));
  };

  const guardarYContinuar = () => {
    guardarPreciosEnStorage(servicios);
    setActiveTab("calcular");
    alert("¡Precios guardados correctamente!");
  };

  // Lógica de actualización
  const actualizarCantidad = (id: number, cantidad: number) => {
    const nuevosServicios = servicios.map((s) => {
      if (s.id === id) {
        const nCant = Math.max(0, cantidad);
        return { ...s, cantidad: nCant, subtotal: s.costoUnitario * nCant };
      }
      return s;
    });
    setServicios(nuevosServicios);
  };

  const actualizarCostoUnitario = (id: number, costo: number) => {
    const nuevosServicios = servicios.map((s) => {
      if (s.id === id) {
        const nCosto = Math.max(0, costo);
        return { ...s, costoUnitario: nCosto, subtotal: nCosto * s.cantidad };
      }
      return s;
    });
    setServicios(nuevosServicios);
  };

  const calcularTotal = () => servicios.reduce((t, s) => t + s.subtotal, 0);
  const calcularM2Totales = () => servicios.reduce((t, s) => t + s.cantidad, 0);
  const serviciosSeleccionados = servicios.filter((s) => s.cantidad > 0);

  const cerrarSesion = () => {
    document.cookie = "admin-auth=; path=/; max-age=0";
    router.push("/");
  };

  if (!isLoaded)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando simulador...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="print:hidden flex flex-wrap items-center justify-between gap-4 px-8 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 p-2 rounded-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-slate-800 text-xl font-bold">
              Simulador de Costos
            </h1>
            <p className="text-xs text-slate-500">
              Servicios de Obra Lista para Obras Civiles
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-end w-full sm:w-auto">
          <button
            onClick={() => {
              if (confirm("¿Reiniciar todos los campos?"))
                window.location.reload();
            }}
            className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition"
          >
            <RefreshCw className="w-3 h-4" /> Reiniciar
          </button>
          <Link
            href="/"
            className="flex items-center px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition text-slate-800"
          >
            Volver
          </Link>
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-2 px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm"
          >
            <LogOut className="w-3 h-4" /> Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="print:hidden flex flex-wrap gap-2 mb-8 bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-fit">
          <button
            onClick={() => setActiveTab("calcular")}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
              activeTab === "calcular"
                ? "bg-slate-800 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Calculator className="w-4 h-4" /> Calcular
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
              activeTab === "config"
                ? "bg-slate-800 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Settings className="w-4 h-4" /> Configurar Precios
          </button>
          <button
            onClick={() => setActiveTab("ver")}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
              activeTab === "ver"
                ? "bg-slate-800 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FileText className="w-4 h-4" /> Ver Presupuesto
          </button>
        </div>

        {activeTab === "config" ? (
          /* SECCIÓN DE CONFIGURACIÓN */
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-800">
                    Configuración de Precios Unitarios
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="text-left pb-4 w-12">Ítem</th>
                      <th className="text-left pb-4">Descripción</th>
                      <th className="text-right pb-4 w-48">
                        Costo Unitario ($/m²)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {servicios.map((s, i) => (
                      <tr key={s.id}>
                        <td className="py-4">
                          <span className="bg-slate-800 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </span>
                        </td>
                        <td className="py-4 font-medium text-slate-700">
                          {s.nombre}
                        </td>
                        <td className="py-4">
                          <div className="relative max-w-xs ml-auto">
                            <span className="absolute left-3 top-2.5 text-slate-400 font-bold">
                              $
                            </span>
                            <input
                              type="number"
                              value={s.costoUnitario || ""}
                              onChange={(e) =>
                                actualizarCostoUnitario(
                                  s.id,
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg text-right font-bold focus:ring-2 focus:ring-slate-800 outline-none"
                              placeholder="0.00"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={guardarYContinuar}
                    className="px-6 py-3 bg-slate-800 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-slate-700"
                  >
                    <CheckCircle className="w-5 h-5" /> Guardar y Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "calcular" ? (
          /* SECCIÓN DE CÁLCULO */
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="w-5 h-5" /> Servicios de Obra Lista
                  </h3>
                  <button
                    onClick={() => setActiveTab("config")}
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" /> Editar Precios
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-100 text-left">
                        <th className="pb-4">Ítem</th>
                        <th className="pb-4">Descripción</th>
                        <th className="pb-4 text-right">Costo Unit.</th>
                        <th className="pb-4 text-center">Cant. (m²)</th>
                        <th className="pb-4 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {servicios.map((s, i) => (
                        <tr key={s.id}>
                          <td className="py-4">
                            <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">
                              {i + 1}
                            </span>
                          </td>
                          <td className="py-4 font-medium text-slate-700">
                            {s.nombre}
                          </td>
                          <td className="py-4 text-right text-slate-500">
                            ${s.costoUnitario.toLocaleString()}
                          </td>
                          <td className="py-4 text-center">
                            <input
                              type="number"
                              value={s.cantidad || ""}
                              onChange={(e) =>
                                actualizarCantidad(
                                  s.id,
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-16 border border-slate-200 rounded p-1 text-center"
                            />
                          </td>
                          <td className="py-4 text-right font-bold text-slate-800">
                            ${s.subtotal.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Datos del Cliente */}
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5" /> Datos del Cliente
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={datosCliente.nombre}
                    onChange={(e) =>
                      setDatosCliente({
                        ...datosCliente,
                        nombre: e.target.value,
                      })
                    }
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={datosCliente.direccion}
                    onChange={(e) =>
                      setDatosCliente({
                        ...datosCliente,
                        direccion: e.target.value,
                      })
                    }
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Teléfono"
                    value={datosCliente.telefono}
                    onChange={(e) =>
                      setDatosCliente({
                        ...datosCliente,
                        telefono: e.target.value,
                      })
                    }
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={datosCliente.email}
                    onChange={(e) =>
                      setDatosCliente({
                        ...datosCliente,
                        email: e.target.value,
                      })
                    }
                    className="p-2 border rounded-lg"
                  />
                </div>
              </section>
            </div>

            {/* Sidebar Resumen */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
                  <h4 className="text-sm opacity-60 mb-4">Resumen</h4>
                  <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                    {serviciosSeleccionados.map((s) => (
                      <div
                        key={s.id}
                        className="flex justify-between text-xs border-b border-white/10 pb-2"
                      >
                        <span className="opacity-70">
                          {s.nombre.substring(0, 30)}...
                        </span>
                        <span className="font-bold">
                          ${s.subtotal.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-end">
                      <span className="text-xl font-black">TOTAL</span>
                      <span className="text-2xl font-black text-emerald-400">
                        ${calcularTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("ver")}
                  className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" /> Ver Presupuesto
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* VISTA DE IMPRESIÓN */
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-end gap-3 mb-6 no-print">
              <button
                onClick={() => window.print()}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Imprimir / PDF
              </button>
              <button
                onClick={() => setActiveTab("calcular")}
                className="px-6 py-2 border border-slate-200 bg-white rounded-lg"
              >
                Volver
              </button>
            </div>
            <div className="bg-white p-12 shadow-2xl border border-slate-200 rounded-xl">
              <div className="flex justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black uppercase">Presupuesto</h2>
                  <p className="text-slate-500">
                    Obra Lista - Servicios Profesionales
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-bold">
                    N° PRES-{(Math.random() * 100000).toFixed(0)}
                  </p>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 mb-8 bg-slate-50 p-4 rounded-lg">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Cliente
                  </p>
                  <p className="font-bold">{datosCliente.nombre || "---"}</p>
                  <p className="text-sm">{datosCliente.telefono}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Obra en:
                  </p>
                  <p className="font-bold">{datosCliente.direccion || "---"}</p>
                  <p className="text-sm">{datosCliente.email}</p>
                </div>
              </div>
              <table className="w-full text-sm mb-8">
                <thead className="border-b-2 border-slate-800">
                  <tr className="text-left">
                    <th className="py-2">Servicio</th>
                    <th className="text-right">Precio Unit.</th>
                    <th className="text-center">Cant.</th>
                    <th className="text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {serviciosSeleccionados.map((s) => (
                    <tr key={s.id}>
                      <td className="py-3">{s.nombre}</td>
                      <td className="text-right">
                        ${s.costoUnitario.toLocaleString()}
                      </td>
                      <td className="text-center">{s.cantidad}</td>
                      <td className="text-right font-bold">
                        ${s.subtotal.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end">
                <div className="w-64 bg-slate-900 text-white p-4 rounded-lg text-right">
                  <p className="text-xs opacity-60">Total Final</p>
                  <p className="text-2xl font-black">
                    ${calcularTotal().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
