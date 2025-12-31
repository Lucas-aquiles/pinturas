import HomeClient from "./HomeClient";

export const metadata = {
  title: "Pintu Pro | Pintura y Limpieza Final de Obra en Mendoza",
  description:
    "Especialistas en pintura interior, exterior y limpieza fina post-obra en Mendoza. Presupuesto inmediato y visita técnica sin compromiso.",
  keywords: [
    "pintura en Mendoza",
    "pintores profesionales",
    "limpieza final de obra",
    "pintura interior",
    "pintura exterior",
    "presupuesto pintura",
  ],
  openGraph: {
    title: "Pintu Pro | Pintura y Limpieza Profesional",
    description:
      "Pintura y limpieza final de obra con presupuesto inmediato en Mendoza.",
    url: "https://tudominio.com",
    siteName: "Pintu Pro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pintu Pro - Pintura Profesional",
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
            name: "Pintu Pro",
            description:
              "Pintura y limpieza final de obra con presupuesto inmediato",
            areaServed: "Mendoza, Argentina",
            telephone: "+54 9 261 565-0377",
            url: "https://tudominio.com",
          }),
        }}
      />
    </>
  );
}
