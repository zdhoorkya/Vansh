"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.from(".faq-entrance", {
        scrollTrigger: {
          trigger: "#faq",
          start: "top bottom",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: "Who is Vansh Barman?",
      answer: "Vansh Barman is a founder, writer, and systems architect who builds multi-disciplinary franchises and brands across film, fashion, fragrance, and technology. He designs cohesive creative IPs supported by strong digital and operational infrastructures.",
    },
    {
      question: "What is RAVEN: FIRST PRINCIPLES?",
      answer: "RAVEN: FIRST PRINCIPLES is an original superhero feature film franchise grounded in realistic sci-fi mythology. It focuses on physical and biological realities rather than traditional comic tropes, exploring the socio-political impact of enhanced capabilities and weaponized intellect.",
    },
    {
      question: "What is Zdhoorkya?",
      answer: "Zdhoorkya is a high-end luxury fashion brand that elevates traditional Indian textile craftsmanship, specifically Banarasi weaving, onto the global luxury stage. The brand translates ancient artisan methods into clean, structured, and modern silhouettes.",
    },
    {
      question: "What is Lexwrender?",
      answer: "Lexwrender is a premium fragrance house that creates conceptual scent profiles and coordinates architectural product presentations. Scent formulations are designed to trigger tactile and spatial memories, encased in custom-designed glass bottles.",
    },
    {
      question: "What is Primpla?",
      answer: "Primpla is Vansh Barman's proprietary operations management platform. It coordinates logistics, inventory channels, supply chains, creative schedules, and financial ledgers into a single, cohesive dashboard that runs behind his various creative ventures.",
    },
  ];

  // Generate FAQ JSON-LD Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      ref={containerRef}
      className="w-full bg-white text-black py-24 md:py-36 px-6 md:px-12 border-b border-black/10 overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      {/* Inject JSON-LD schema into head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col mb-16">
          <span className="faq-entrance text-xs font-bold tracking-[0.25em] uppercase text-black/50 mb-6">
            05 // Generative Engine Index
          </span>
          <h2 className="faq-entrance text-4xl md:text-5xl font-light tracking-tight uppercase leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="faq-entrance text-sm text-black/50 mt-2 font-mono uppercase tracking-wider">
            Optimized for human comprehension and search crawlers
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="faq-entrance">
                <div className="border border-black transition-all duration-300">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left p-6 md:p-8 flex justify-between items-center uppercase tracking-wider font-semibold text-xs md:text-sm hover:bg-black hover:text-white transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="text-lg font-mono">
                      {isOpen ? "[-]" : "[+]"}
                    </span>
                  </button>
                  
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[500px] border-t border-black" : "max-h-0"
                    }`}
                  >
                    <p className="p-6 md:p-8 text-sm md:text-base font-light leading-relaxed text-black/80 bg-black/[0.01]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
