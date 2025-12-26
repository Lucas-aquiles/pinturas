import Link from "next/link";
import {
  Sparkles,
  CheckCircle,
  Star,
  Home as HomeIcon,
  Calculator,
} from "lucide-react";

export default function HomePage() {
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
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Header */}
        <header className="relative z-10 flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-teal-400 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-slate-800" />
            </div>
            <h1 className="text-white text-xl font-bold">Pintura & Brillo</h1>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
              <span className="text-sm">LM</span>
            </div>
            <span className="text-sm">Lucas Manuel Echegaray</span>
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
            Pintura & Brillo
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-white text-center max-w-3xl mb-12 leading-relaxed">
            Servicios profesionales de pintura y limpieza final de obra.
            Entregamos tu espacio impecable y listo para vivir.
          </p>

          {/* Buttons */}
          <div className="flex gap-6 mb-16">
            <Link
              href="/presupuesto"
              className="bg-teal-400 hover:bg-teal-500 text-slate-800 font-semibold px-8 py-4 rounded-lg flex items-center gap-2 transition-all shadow-lg"
            >
              <Calculator className="w-5 h-5" />
              Calculadora Express
            </Link>

            <button className="bg-white hover:bg-gray-100 text-blue-700 font-semibold px-8 py-4 rounded-lg transition-all shadow-lg">
              Ver mis proyectos
            </button>
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

      {/* Services Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-slate-800 text-center mb-4">
            Nuestros Servicios
          </h3>
          <p className="text-center text-slate-600 mb-16 text-lg">
            Selecciona los servicios que necesitas y obtén un presupuesto
            instantáneo
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pintura Interior */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-blue-700" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-3">
                Pintura Interior
              </h4>
              <p className="text-slate-600 mb-6">
                Paredes y techos interiores con acabado profesional. Incluye...
              </p>
              <div className="text-3xl font-bold text-blue-700">
                $12{" "}
                <span className="text-base font-normal text-slate-500">
                  /m²
                </span>
              </div>
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
                Fachadas y exteriores con pintura resistente a la intemperie....
              </p>
              <div className="text-3xl font-bold text-blue-700">
                $12.800{" "}
                <span className="text-base font-normal text-slate-500">
                  /m²
                </span>
              </div>
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
                Limpieza profunda profesional para habitabilidad inmediata....
              </p>
              <div className="text-3xl font-bold text-blue-700">
                $8{" "}
                <span className="text-base font-normal text-slate-500">
                  /m²
                </span>
              </div>
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
                Pintura completa + Limpieza final. La solución todo-en-uno
                para...
              </p>
              <div className="text-3xl font-bold text-blue-700">
                $15.190{" "}
                <span className="text-base font-normal text-slate-500">
                  /m²
                </span>
              </div>
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
          <Link
            href="/presupuesto"
            className="inline-flex items-center gap-3 bg-teal-400 hover:bg-teal-500 text-slate-800 font-semibold px-10 py-5 rounded-xl transition-all shadow-lg text-lg"
          >
            <Calculator className="w-6 h-6" />
            Solicitar Presupuesto Gratis
          </Link>
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
