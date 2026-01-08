"use client";

import { useState } from "react";
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

  const [activeTab, setActiveTab] = useState<"calcular" | "ver" | "config">(
    "calcular"
  );
  const [editandoCostos, setEditandoCostos] = useState(false);

  const [servicios, setServicios] = useState<ServicioItem[]>([
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
  ]);

  const [datosCliente, setDatosCliente] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  const [observaciones, setObservaciones] = useState("");
  const [validezDias, setValidezDias] = useState(15);

  const actualizarCantidad = (id: number, cantidad: number) => {
    setServicios(
      servicios.map((servicio) => {
        if (servicio.id === id) {
          const nuevaCantidad = Math.max(0, cantidad);
          return {
            ...servicio,
            cantidad: nuevaCantidad,
            subtotal: servicio.costoUnitario * nuevaCantidad,
          };
        }
        return servicio;
      })
    );
  };

  const actualizarCostoUnitario = (id: number, costo: number) => {
    setServicios(
      servicios.map((servicio) => {
        if (servicio.id === id) {
          const nuevoCosto = Math.max(0, costo);
          return {
            ...servicio,
            costoUnitario: nuevoCosto,
            subtotal: nuevoCosto * servicio.cantidad,
          };
        }
        return servicio;
      })
    );
  };

  const calcularTotal = () =>
    servicios.reduce((total, servicio) => total + servicio.subtotal, 0);
  const calcularM2Totales = () =>
    servicios.reduce((total, servicio) => total + servicio.cantidad, 0);
  const serviciosSeleccionados = servicios.filter((s) => s.cantidad > 0);

  const cerrarSesion = () => {
    document.cookie = "admin-auth=; path=/; max-age=0";
    router.push("/");
  };

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
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition"
          >
            <RefreshCw className="w-3 h-4" />
            Reiniciar
          </button>

          <Link
            href="/"
            className="flex items-center px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition text-slate-800"
            title="Administración"
          >
            Volver
          </Link>

          <button
            onClick={cerrarSesion}
            className="flex items-center gap-2 px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <LogOut className="w-3 h-4" />
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs de Navegación */}
        <div className="print:hidden flex flex-wrap gap-2 mb-8 bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-full max-w-max sm:w-fit justify-center sm:justify-start">
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
          /* SECCIÓN DE CONFIGURACIÓN DE PRECIOS */
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-slate-700" />
                  <h3 className="font-bold text-slate-800">
                    Configuración de Precios Unitarios
                  </h3>
                </div>
                <p className="text-sm text-slate-500">
                  Actualiza los precios según la inflación semanal
                </p>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-100">
                        <th className="text-left pb-4 font-medium w-12">
                          Ítem
                        </th>
                        <th className="text-left pb-4 font-medium">
                          Descripción del Servicio
                        </th>
                        <th className="text-right pb-4 font-medium w-48">
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
                          <td className="py-4 font-medium text-slate-700 pr-4">
                            {s.nombre}
                          </td>
                          <td className="py-4">
                            <div className="relative max-w-xs ml-auto">
                              <span className="absolute left-3 top-3 text-slate-400 font-bold">
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
                                className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg text-right font-bold text-slate-800 focus:ring-2 focus:ring-slate-800 outline-none"
                                placeholder="0.00"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setActiveTab("calcular")}
                    className="px-6 py-3 bg-slate-800 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" /> Guardar y Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "calcular" ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Columna Izquierda: Imagen 1 y 2 combinadas */}
            <div className="lg:col-span-2 space-y-8">
              {/* SECCIÓN 1: Servicios de ObraListara */}
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-700" />
                    <h3 className="font-bold text-slate-800">
                      Servicios de Obra Lista
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("config")}
                    className="text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" /> Editar Precios
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-500 mb-6">
                    Ingrese las cantidades en metros cuadrados
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-100">
                          <th className="text-left pb-4 font-medium">Ítem</th>
                          <th className="text-left pb-4 font-medium">
                            Descripción del Trabajo
                          </th>
                          <th className="text-right pb-4 font-medium">
                            Costo Unitario
                          </th>
                          <th className="text-center pb-4 font-medium">
                            Cantidad (m²)
                          </th>
                          <th className="text-right pb-4 font-medium">
                            Subtotal
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
                            <td className="py-4 text-right text-slate-500">
                              {s.costoUnitario > 0 ? (
                                `$ ${s.costoUnitario.toLocaleString()}/m²`
                              ) : (
                                <span className="text-orange-500 text-xs">
                                  Sin precio
                                </span>
                              )}
                            </td>
                            <td className="py-4">
                              <input
                                type="number"
                                value={s.cantidad || ""}
                                onChange={(e) =>
                                  actualizarCantidad(
                                    s.id,
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                className="w-20 mx-auto block border border-slate-200 rounded-md p-1.5 text-center focus:ring-2 focus:ring-slate-800 outline-none"
                              />
                            </td>
                            <td className="py-4 text-right font-bold text-slate-800">
                              $ {s.subtotal.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* SECCIÓN 2: Datos del Cliente, Condiciones y Observaciones */}
              <div className="space-y-8">
                {/* Datos del Cliente */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                    <User className="w-5 h-5 text-slate-700" />
                    <h3 className="font-bold text-slate-800">
                      Datos del Cliente
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">
                        Nombre / Razón Social
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Nombre del cliente"
                          value={datosCliente.nombre}
                          onChange={(e) =>
                            setDatosCliente({
                              ...datosCliente,
                              nombre: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-800"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">
                        Dirección de la Obra
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Dirección completa"
                          value={datosCliente.direccion}
                          onChange={(e) =>
                            setDatosCliente({
                              ...datosCliente,
                              direccion: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-800"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">
                        Teléfono
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="+54 11 1234-5678"
                          value={datosCliente.telefono}
                          onChange={(e) =>
                            setDatosCliente({
                              ...datosCliente,
                              telefono: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-800"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          placeholder="cliente@email.com"
                          value={datosCliente.email}
                          onChange={(e) =>
                            setDatosCliente({
                              ...datosCliente,
                              email: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Condiciones de Trabajo */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
                    <FileText className="w-5 h-5 text-slate-700" />
                    <h3 className="font-bold text-slate-800">
                      Condiciones de Trabajo
                    </h3>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 space-y-2 border border-slate-100">
                    <p>
                      • Los precios incluyen materiales de primera calidad y
                      mano de obra especializada.
                    </p>
                    <p>
                      • La preparación incluye: lijado, enduido, sellador y mano
                      de fondo según corresponda.
                    </p>
                    <p>
                      • Los trabajos se realizarán en horario diurno de lunes a
                      viernes.
                    </p>
                    <p>
                      • El cliente deberá proporcionar acceso a agua y
                      electricidad.
                    </p>
                    <p>
                      • No incluye: andamios especiales o reparaciones
                      estructurales.
                    </p>
                    <p>
                      • Forma de pago: 50% al inicio de la obra, 50% a la
                      finalización.
                    </p>
                  </div>
                </section>

                {/* Observaciones y Validez */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-2">
                        <Info className="w-3 h-3" /> Observaciones Adicionales
                      </label>
                      <textarea
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        placeholder="Agregue observaciones específicas..."
                        className="w-full p-4 border border-slate-200 rounded-lg h-24 text-sm outline-none resize-none focus:ring-2 focus:ring-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                        Validez (días)
                      </label>
                      <input
                        type="number"
                        value={validezDias}
                        onChange={(e) =>
                          setValidezDias(parseInt(e.target.value) || 0)
                        }
                        className="w-full p-2 border border-slate-200 rounded-lg text-center font-bold text-slate-700 focus:ring-2 focus:ring-slate-800 outline-none"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Columna Derecha: Resumen Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
                  <div className="flex items-center gap-2 mb-6 opacity-60 text-sm">
                    <Calculator className="w-4 h-4" /> Resumen del Presupuesto
                  </div>
                  <div className="space-y-4 mb-8">
                    {serviciosSeleccionados.length > 0 ? (
                      serviciosSeleccionados.map((s) => (
                        <div
                          key={s.id}
                          className="flex justify-between text-sm border-b border-white/10 pb-2"
                        >
                          <span className="opacity-70 text-xs">{s.nombre}</span>
                          <span className="font-bold">
                            $ {s.subtotal.toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm opacity-60 text-center py-4">
                        No hay servicios seleccionados
                      </p>
                    )}
                  </div>
                  <div className="border-t border-white/20 pt-4 space-y-4">
                    <div className="flex justify-between text-xs opacity-60">
                      <span>Total m² a trabajar</span>
                      <span>{calcularM2Totales().toFixed(2)} m²</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-black tracking-tighter">
                        TOTAL
                      </span>
                      <span className="text-3xl font-black text-emerald-400">
                        $ {calcularTotal().toLocaleString()}
                      </span>
                    </div>
                    {calcularTotal() > 0 && (
                      <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-400/10 p-2 rounded-lg mt-4">
                        <CheckCircle className="w-3 h-3" /> Presupuesto
                        calculado correctamente
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("ver")}
                  className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors shadow-lg"
                >
                  <FileText className="w-5 h-5" /> Ver Presupuesto
                </button>
                <button className="w-full py-4 bg-white text-slate-800 border-2 border-slate-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                  <Save className="w-5 h-5" /> Guardar
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* SECCIÓN 3: Vista Previa del Presupuesto */
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-end gap-3 mb-6 no-print">
              <button
                onClick={() => window.print()}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg flex items-center gap-2 font-medium"
              >
                <Printer className="w-4 h-4" /> Imprimir / Guardar PDF
              </button>
              <button
                onClick={() => setActiveTab("calcular")}
                className="print:hidden px-6 py-2 border border-slate-200 bg-white rounded-lg font-medium"
              >
                Volver
              </button>
            </div>

            <div className="bg-white p-12 shadow-2xl border border-slate-200 rounded-xl min-h-250">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">
                    Presupuesto
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Servicios de Obra Lista para Obras Civiles
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    N° Presupuesto
                  </p>
                  <p className="text-lg font-black text-slate-800">
                    PRES-{Math.floor(Math.random() * 900000) + 100000}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Fecha:{" "}
                    {new Date().toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl mb-12 grid grid-cols-2 gap-8 border border-slate-100">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Datos del Cliente
                  </h4>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Cliente
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      {datosCliente.nombre || "Sin especificar"}
                    </p>
                  </div>
                  <div className="space-y-1 mt-4">
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Teléfono
                    </p>
                    <p className="text-sm text-slate-700">
                      {datosCliente.telefono || "-"}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 opacity-0">
                    .
                  </h4>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Dirección de la Obra
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      {datosCliente.direccion || "Sin especificar"}
                    </p>
                  </div>
                  <div className="space-y-1 mt-4">
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Email
                    </p>
                    <p className="text-sm text-slate-700">
                      {datosCliente.email || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">
                  Detalle de Servicios
                </h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="text-left py-3 font-medium">Ítem</th>
                      <th className="text-left py-3 font-medium">
                        Descripción
                      </th>
                      <th className="text-right py-3 font-medium">
                        Precio Unit.
                      </th>
                      <th className="text-center py-3 font-medium">Cantidad</th>
                      <th className="text-right py-3 font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {serviciosSeleccionados.map((s, i) => (
                      <tr key={s.id}>
                        <td className="py-4 text-slate-400">{i + 1}</td>
                        <td className="py-4 font-bold text-slate-800">
                          {s.nombre}
                        </td>
                        <td className="py-4 text-right text-slate-500">
                          $ {s.costoUnitario.toLocaleString()}/m²
                        </td>
                        <td className="py-4 text-center text-slate-700">
                          {s.cantidad} m²
                        </td>
                        <td className="py-4 text-right font-black text-slate-800">
                          $ {s.subtotal.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-slate-800">
                      <td
                        colSpan={4}
                        className="py-6 text-right font-black text-slate-800 text-lg uppercase"
                      >
                        Total
                      </td>
                      <td className="py-6 text-right font-black text-slate-800 text-xl">
                        $ {calcularTotal().toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mb-12">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Condiciones de Trabajo
                </h4>
                <div className="text-[11px] text-slate-500 space-y-2 leading-relaxed max-w-2xl">
                  <p>
                    • Los precios incluyen materiales de primera calidad y mano
                    de obra especializada.
                  </p>
                  <p>
                    • La preparación incluye: lijado, enduido, sellador y mano
                    de fondo según corresponda.
                  </p>
                  <p>
                    • Los trabajos se realizarán en horario diurno de lunes a
                    viernes.
                  </p>
                  <p>
                    • El cliente deberá proporcionar acceso a agua y
                    electricidad.
                  </p>
                  <p>
                    • No incluye: andamios especiales o reparaciones
                    estructurales.
                  </p>
                  <p>
                    • Forma de pago: 50% al inicio de la obra, 50% a la
                    finalización.
                  </p>
                </div>
              </div>

              {observaciones && (
                <div className="mb-12">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Observaciones Adicionales
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {observaciones}
                  </p>
                </div>
              )}

              <div className="mt-20 pt-12 border-t border-slate-100 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Validez del presupuesto
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    {validezDias} días (hasta el{" "}
                    {new Date(
                      Date.now() + validezDias * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    )
                  </p>
                </div>
                <div className="w-48 border-t border-slate-300 pt-2 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Firma y Aclaración
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
