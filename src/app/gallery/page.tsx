import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getUploadedImages } from "@/app/admin-upload/actions";

export const metadata: Metadata = {
  title: "Creative Gallery",
  description: "Exquisite visual IP archives, product concepts, and photography logs curated by Vansh Barman. Grayscale cinematic exhibition.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Creative Gallery | Vansh Barman",
    description: "Visual IP archives, product concepts, and photography logs curated by Vansh Barman.",
    url: "https://vanshbarman.com/gallery",
    type: "website",
  },
};

export default async function GalleryPage() {
  const images = await getUploadedImages();

  // JSON-LD Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://vanshbarman.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Gallery",
        "item": "https://vanshbarman.com/gallery"
      }
    ]
  };

  return (
    <>
      {/* Inject Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="w-full min-h-screen bg-white text-black pt-36 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Typography */}
          <div className="border-b border-black/10 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-black/50 block mb-4">
                Exhibition Archive
              </span>
              <h1 className="text-5xl md:text-6xl font-light uppercase tracking-tight">
                Visual Gallery
              </h1>
            </div>
            <p className="text-sm font-light text-black/60 max-w-xs leading-relaxed uppercase tracking-wider font-mono">
              Concept logs, photography, &amp; aesthetic blueprints. Desaturated catalog.
            </p>
          </div>

          {/* Grid exhibition */}
          {images.length === 0 ? (
            <div className="w-full py-32 border border-dashed border-black/25 flex flex-col justify-center items-center text-center font-mono uppercase">
              <span className="text-xs text-black/40 mb-2">No files registered</span>
              <a
                href="/admin-upload"
                className="text-xs font-semibold underline hover:bg-black hover:text-white px-2 py-1 transition-colors duration-200"
              >
                Upload Assets
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {images.map((filename, index) => {
                // Generate a clean typographic index and date from timestamps in file name if possible
                const cleanIndex = String(index + 1).padStart(2, "0");
                
                return (
                  <article
                    key={filename}
                    className="group border border-black p-2 bg-white flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    {/* Image display with absolute desaturation */}
                    <div className="relative overflow-hidden aspect-[4/5] bg-black/5 border border-black/10 select-none">
                      <img
                        src={`/uploads/${filename}`}
                        alt={`Vansh Barman Visual Concept #${cleanIndex}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                    </div>

                    {/* Meta descriptions */}
                    <div className="pt-4 pb-2 px-2 flex justify-between items-center text-xs font-mono">
                      <div className="flex flex-col">
                        <span className="font-bold uppercase tracking-wider text-black/80 truncate max-w-[180px]">
                          {filename.split("_")[0]}
                        </span>
                        <span className="text-[10px] text-black/45 mt-0.5">
                          Format: {filename.split(".").pop()?.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-black/20 font-mono">
                        {cleanIndex}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
