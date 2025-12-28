"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle,
  Star,
  Home as HomeIcon,
  Calculator,
  BrushCleaning,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(images.length / 2));
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(images.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(images.length / 2)) % Math.ceil(images.length / 2)
    );
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="min-h-screen relative"
        style={{
          backgroundImage: "url('/rodillo.jpeg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay SOLO del hero */}
        <div
          className="absolute inset-0 bg-[#1E3A5F]/85
      "
        ></div>
        {/* Header */}
        <header className="relative z-10 flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-teal-400 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-slate-800" />
            </div>
            <h1 className="text-white text-xl font-bold">Pintu Pro</h1>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
              <span className="text-sm">LM</span>
            </div>
            {/* <span className="text-sm">Lucas Manuel Echegaray</span> */}
          </div>
        </header>

        {/* Main */}
        <main className="relative z-10 flex flex-col items-center justify-center px-4 py-20">
          {/* Badge */}
          <div className="mb-8 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Tu espacio, listo para habitar</span>
          </div>

          {/* Title */}
          <h2 className="text-6xl font-bold text-white mb-6 text-center">
            Pintu Pro
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-white text-center max-w-3xl mb-12 leading-relaxed">
            Especialistas en Pintura y Limpieza Final de Obra. Agendá tu visita
            online y recibí tu presupuesto detallado EN EL ACTO
          </p>

          {/* Buttons */}
          <div className="flex gap-6 mb-16">
            <Link
              href="/presupuesto"
              className="bg-teal-400 hover:bg-teal-500 text-slate-800 font-semibold px-8 py-4 rounded-lg flex items-center gap-2 transition-all shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              Agendar Inpescción Técnica
            </Link>
          </div>

          {/* Features */}
          <div className="flex gap-8 text-white">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-400" />
              <span>Presupuesto sin compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-teal-400" />
              <span>Profesionales certificados</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span>Garantía de habitabilidad</span>
            </div>
          </div>
        </main>
      </section>

      {/* Galería Carrusel */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* <h3 className="text-4xl font-bold text-slate-800 text-center mb-4">
            Galería
          </h3> */}

          <h3 className="text-4xl font-bold text-slate-800 text-center mb-4">
            Nuestros Trabajos
          </h3>

          <div className="relative max-w-6xl mx-auto">
            {/* Carrusel */}
            <div className="relative overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {images.map((img, index) => (
                  <div key={index} className="min-w-[50%] px-2">
                    <img
                      src={img}
                      alt={`Galería ${index + 1}`}
                      className="w-full h-[400px] object-cover rounded-xl shadow-lg"
                    />
                  </div>
                ))}
              </div>

              {/* Botones de navegación */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6 text-slate-800" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6 text-slate-800" />
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-4 py-2 rounded-full">
                {Array.from({ length: Math.ceil(images.length / 2) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentSlide
                          ? "bg-teal-400 w-8"
                          : "bg-white/70 hover:bg-white"
                      }`}
                      aria-label={`Ir a par de imágenes ${index + 1}`}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-slate-800 text-center mb-4">
            Nuestros Servicios
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pintura Interior */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <BrushCleaning className="w-8 h-8 text-blue-700" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-3">
                Pintura Interior
              </h4>
              <p className="text-slate-600 mb-6">
                Paredes y techos interiores con acabado profesional
              </p>
            </div>

            {/* Pintura Exterior */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <HomeIcon className="w-8 h-8 text-slate-700" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-3">
                Pintura Exterior
              </h4>
              <p className="text-slate-600 mb-6">
                Fachadas y exteriores con pintura resistente a la intemperie
              </p>
            </div>

            {/* Limpieza Fina Post-Obra */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-teal-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-3">
                Limpieza Fina Post-Obra
              </h4>
              <p className="text-slate-600 mb-6">
                Limpieza profunda profesional para habitabilidad inmediata
              </p>
            </div>

            {/* Combo Mudanza */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-teal-400">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-3">
                Combo Mudanza
              </h4>
              <p className="text-slate-600 mb-6">
                Pintura completa + Limpieza final. La solución todo-en-uno. para
                dejar tu espacio listo para habitar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Pasos */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-slate-800 text-center mb-4">
            Nuestro Método de Presupuesto Instantáneo
          </h3>

          {/* Pasos superiores */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 mt-12">
            {/* Paso 1 */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto border-2 border-slate-200">
                  <Calculator className="w-10 h-10 text-slate-700" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">
                Agendás online tu visita técnica
              </h4>
            </div>

            {/* Paso 2 */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto border-2 border-slate-200">
                  <HomeIcon className="w-10 h-10 text-slate-700" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">
                Visitamos la obra y medimos m²
              </h4>
              <p className="text-slate-600">con nuestro simulador digital</p>
            </div>

            {/* Paso 3 */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto border-2 border-slate-200">
                  <CheckCircle className="w-10 h-10 text-slate-700" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">
                Recibís tu presupuesto formal en
              </h4>
              <p className="text-slate-600">PDF antes de que nos retiremos</p>
            </div>
          </div>

          {/* Características inferiores */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Presupuestos Precisos */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">
                Presupuestos Precisos
              </h4>
              <p className="text-slate-600 text-sm">
                Medición digital exacta y costos transparentes
              </p>
            </div>

            {/* Personal Capacitado */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">
                Personal Capacitado
              </h4>
              <p className="text-slate-600 text-sm">
                Profesionales certificados y experimentados
              </p>
            </div>

            {/* Garantía de Plazos */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">
                Garantía de Plazos
              </h4>
              <p className="text-slate-600 text-sm">
                Cumplimos con los tiempos acordados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-slate-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para transformar tu espacio?
          </h3>
          <p className="text-xl text-blue-100 mb-10">
            Obtén un presupuesto personalizado en menos de 2 minutos. Sin
            compromiso, sin complicaciones.
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/5492615650377?text=Hola!%20Quiero%20solicitar%20un%20presupuesto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-5 rounded-xl transition-all shadow-lg text-lg w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-6 h-6" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-teal-400 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-slate-800" />
            </div>
            <span className="text-white text-lg font-bold">
              Pintura & Brillo
            </span>
          </div>
          <p className="text-sm">
            © 2024 Pintura & Brillo. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
