import HomeClient from "./HomeClient";

export const metadata = {
  title: "ObraLista | ObraListara y Limpieza Final de Obra en Mendoza",
  description:
    "Especialistas en ObraListara interior, exterior y limpieza fina post-obra en Mendoza. Presupuesto inmediato y visita técnica sin compromiso.",
  keywords: [
    "ObraListara en Mendoza",
    "pintores profesionales",
    "limpieza final de obra",
    "ObraLista interior",
    "ObraLista exterior",
    "presupuesto ObraLista",
  ],
  openGraph: {
    title: "obra lista | ObraListara y Limpieza Profesional",
    description:
      "ObraListara y limpieza final de obra con presupuesto inmediato en Mendoza.",
    url: "https://tudominio.com",
    siteName: "Obra Lista",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Obra Lista - ObraListara Profesional",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      {/* Contenido visible */}
      <HomeClient />

      {/* SEO Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "ObraLista ",
            description:
              "ObraListara y limpieza final de obra con presupuesto inmediato",
            areaServed: "Mendoza, Argentina",
            telephone: "+54 9 261 565-0377",
            url: "https://tudominio.com",
          }),
        }}
      />
    </>
  );
}
