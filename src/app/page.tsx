import HomeClient from "./HomeClient";

export const metadata = {
  title: "ObraLista | ObraLista y Limpieza Final de Obra en Mendoza",
  description:
    "Especialistas en Obra Lista interior, exterior y limpieza fina post-obra en Mendoza. Presupuesto inmediato y visita técnica sin compromiso.",
  keywords: [
    "ObraLista en Mendoza",
    "pintores profesionales",
    "limpieza final de obra",
    "ObraLista interior",
    "ObraLista exterior",
    "presupuesto ObraLista",
  ],
  openGraph: {
    title: "obra lista | ObraLista y Limpieza Profesional",
    description:
      "ObraLista y limpieza final de obra con presupuesto inmediato en Mendoza.",
    url: "https://obralista.com.ar/",
    siteName: "Obra Lista",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Obra Lista - ObraLista Profesional",
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
            description: "ObraLista y limpieza final de obra con presupuesto ",
            areaServed: "Mendoza, Argentina",
            telephone: "+54 9 261 565-0377",
            url: "https://obralista.com.ar/",
          }),
        }}
      />
    </>
  );
}
