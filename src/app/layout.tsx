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
    default: "Vansh Barman — Screenwriter & Entrepreneur",
    template: "%s | Vansh Barman",
  },
  description: "Indian screenwriter and entrepreneur developing original science fiction, action and drama projects across film, fashion, fragrance, and technology.",
  keywords: [
    "Vansh Barman",
    "Vansh Barman Screenwriter",
    "Vansh Barman Projects",
    "Vansh Barman Business",
    "Vansh Barman Entrepreneur",
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
    canonical: "https://vanshbarman.com",
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
    type: "profile",
    locale: "en_US",
    url: "https://vanshbarman.com",
    title: "Vansh Barman — Screenwriter & Entrepreneur",
    description: "Indian screenwriter and entrepreneur developing original science fiction, action and drama projects.",
    siteName: "Vansh Barman",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vansh Barman — Screenwriter & Entrepreneur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vansh Barman — Screenwriter & Entrepreneur",
    description: "Indian screenwriter and entrepreneur developing original science fiction, action and drama projects.",
    images: ["/og-image.png"],
    creator: "@vanshbarman13",
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
    "givenName": "Vansh",
    "familyName": "Barman",
    "url": "https://vanshbarman.com",
    "image": "https://vanshbarman.com/vansh.jpg",
    "jobTitle": "Screenwriter",
    "description": "Indian screenwriter and entrepreneur developing original science fiction, action and drama projects.",
    "nationality": {
      "@type": "Country",
      "name": "India"
    },
    "knowsAbout": [
      "Screenwriting",
      "Filmmaking",
      "Storytelling",
      "Entrepreneurship",
      "Worldbuilding"
    ],
    "sameAs": [
      "https://www.wikidata.org/wiki/Q140521311",
      "https://www.instagram.com/vanshbarmanofficial",
      "https://x.com/vanshbarman13"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" as="image" href="/vansh.jpg" />
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
