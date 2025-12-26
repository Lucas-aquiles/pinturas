"use client";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Calculator, Home } from "lucide-react";

export default function Presupuesto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    tipoServicio: "pintura",
    metrosCuadrados: "",
    ambientes: "",
    descripcion: "",
  });

  const [presupuesto, setPresupuesto] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calcularPresupuesto = (e: React.FormEvent) => {
    e.preventDefault();

    const metros = parseFloat(formData.metrosCuadrados) || 0;
    const ambientes = parseInt(formData.ambientes) || 0;

    let precioBase = 0;

    if (formData.tipoServicio === "pintura") {
      precioBase = metros * 15 + ambientes * 3000;
    } else if (formData.tipoServicio === "limpieza") {
      precioBase = metros * 10 + ambientes * 2000;
    } else {
      precioBase = metros * 22 + ambientes * 4500;
    }

    setPresupuesto(precioBase);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-blue-800 to-slate-800">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-teal-400 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-slate-800" />
          </div>
          <h1 className="text-white text-xl font-bold">Pintura & Brillo</h1>
        </Link>
        <div className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-sm">LM</span>
          </div>
          <span className="text-sm">Lucas Manuel Echegaray</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al inicio</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-blue-700" />
            <h2 className="text-3xl font-bold text-slate-800">
              Calculadora Express
            </h2>
          </div>

          <p className="text-slate-600 mb-8">
            Completa los datos y obtén un presupuesto estimado al instante. Nos
            contactaremos contigo para confirmar los detalles.
          </p>

          <form onSubmit={calcularPresupuesto} className="space-y-6">
            {/* Datos personales */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+54 11 1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Av. Corrientes 1234, CABA"
                />
              </div>
            </div>

            {/* Detalles del servicio */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de servicio *
                </label>
                <select
                  name="tipoServicio"
                  value={formData.tipoServicio}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pintura">Pintura</option>
                  <option value="limpieza">Limpieza final de obra</option>
                  <option value="completo">Pintura + Limpieza</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Metros cuadrados *
                </label>
                <input
                  type="number"
                  name="metrosCuadrados"
                  value={formData.metrosCuadrados}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cantidad de ambientes *
                </label>
                <input
                  type="number"
                  name="ambientes"
                  value={formData.ambientes}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Descripción adicional (opcional)
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Cuéntanos más sobre tu proyecto..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calcular presupuesto
            </button>
          </form>

          {/* Resultado */}
          {presupuesto !== null && (
            <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border-2 border-teal-400">
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-6 h-6 text-teal-600" />
                <h3 className="text-2xl font-bold text-slate-800">
                  Presupuesto Estimado
                </h3>
              </div>
              <div className="text-5xl font-bold text-blue-700 mb-4">
                ${presupuesto.toLocaleString("es-AR")}
              </div>
              <p className="text-slate-600">
                Este es un presupuesto estimado. Nos contactaremos contigo para
                confirmar los detalles y darte un presupuesto final
                personalizado.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
