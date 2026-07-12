import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vanshbarman.com"),
  title: {
    default: "Vansh Barman — Founder & Writer",
    template: "%s | Vansh Barman",
  },
  description: "Personal brand portfolio of Vansh Barman. Building original intellectual property, luxury consumer goods, and operations platforms across film, fashion, fragrance, and technology.",
  keywords: [
    "Vansh Barman",
    "Vansh Barman Writer",
    "Vansh Barman Projects",
    "Vansh Barman Business",
    "RAVEN FIRST PRINCIPLES",
    "Zdhoorkya",
    "Lexwrender",
    "Primpla",
    "Banarasi Sarees luxury",
    "fragrance design",
    "superhero movie lore",
    "systems architecture",
    "founder portfolio",
    "independent film writer",
    "luxury business owner"
  ],
  authors: [{ name: "Vansh Barman", url: "https://vanshbarman.com" }],
  creator: "Vansh Barman",
  publisher: "Vansh Barman",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vanshbarman.com",
    title: "Vansh Barman — Founder & Writer",
    description: "Building original intellectual property, luxury consumer goods, and operations platforms across film, fashion, fragrance, and technology.",
    siteName: "Vansh Barman",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vansh Barman — Founder & Writer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vansh Barman — Founder & Writer",
    description: "Building original intellectual property, luxury consumer goods, and operations platforms across film, fashion, fragrance, and technology.",
    images: ["/og-image.png"],
    creator: "@vanshbarman",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Person Data Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vansh Barman",
    "jobTitle": "Founder & Writer",
    "url": "https://vanshbarman.com",
    "sameAs": [
      "https://x.com/VanshBarman13",
      "https://www.instagram.com/vanshbarmanofficial"
    ],
    "knowsAbout": [
      "Film Production",
      "Grounded Sci-Fi",
      "Luxury Consumer Goods",
      "Banarasi Textiles",
      "Olfactory Product Design",
      "Software Systems Architecture"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
