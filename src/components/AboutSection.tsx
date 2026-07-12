"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register scroll trigger inside component context safely
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Animate title and intro paragraph
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Animate philosophy list cards
      gsap.from(".philosophy-item", {
        scrollTrigger: {
          trigger: ".philosophy-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const philosophyItems = [
    {
      num: "I",
      title: "Absolute Restraint",
      desc: "Remove the ornamental. Let contrast, form, and alignment carry the weight of the statement. Volume is achieved through silence.",
    },
    {
      num: "II",
      title: "First Principles",
      desc: "Build narrative and technological systems from baseline truths rather than industry imitation. Reconstruct rather than copy.",
    },
    {
      num: "III",
      title: "Structural Integrity",
      desc: "Operational frameworks must support aesthetic visions. A high-end brand is only as robust as its inventory logistics and database architecture.",
    },
    {
      num: "IV",
      title: "Cultural Relevance",
      desc: "Connect regional mastery with international design language. True luxury lies in heritage presented through modern geometry.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-white text-black py-24 md:py-36 px-6 md:px-12 border-b border-black/10 overflow-hidden"
      aria-label="About Vansh Barman"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <h2 className="reveal-text text-xs font-bold tracking-[0.25em] uppercase text-black/50 mb-6">
              01 // The Narrative
            </h2>
            <h3 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 leading-tight">
              Designing platforms, narratives, and luxury IP.
            </h3>
            
            {/* Grayscale Founder Portrait (Fades to color on hover) */}
            <div className="reveal-text mb-10 max-w-sm border border-black p-1 bg-white select-none">
              <img
                src="/vansh.jpg"
                alt="Vansh Barman - Screenwriter and Entrepreneur Portrait"
                className="w-full h-auto grayscale hover:grayscale-0 filter contrast-[1.10] hover:contrast-100 transition-all duration-500 ease-in-out cursor-pointer"
              />
            </div>
            <div className="reveal-text space-y-6 text-base md:text-lg font-light leading-relaxed text-black/80 max-w-2xl">
              <p>
                Vansh Barman is a screenwriter, founder, and systems architect. He builds long-term operational systems and multi-disciplinary IP franchises across film, fashion, fragrance, and technology.
              </p>
              <p>
                Working at the intersection of cinematic worldbuilding and digital infrastructure, Vansh develops cohesive cultural brands. By framing creative expressions through strict operational rules, he enables projects to scale sustainably without losing aesthetic focus.
              </p>
              <p>
                Based in India, he maintains his <a href="https://vanshbarman.com" className="underline hover:text-black transition-colors">Official Website</a> to catalog ongoing ventures. His creative portfolio and screenwriting entities are verified on <a href="https://www.wikidata.org/wiki/Q140521311" target="_blank" rel="noopener noreferrer" className="underline hover:text-black transition-colors">Wikidata</a>, with active updates shared on <a href="https://www.instagram.com/vanshbarmanofficial" target="_blank" rel="noopener noreferrer" className="underline hover:text-black transition-colors">Instagram</a> and <a href="https://x.com/vanshbarman13" target="_blank" rel="noopener noreferrer" className="underline hover:text-black transition-colors">X</a>.
              </p>
            </div>
          </div>

          {/* Philosophy Column */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <h2 className="reveal-text text-xs font-bold tracking-[0.25em] uppercase text-black/50 mb-6">
              02 // Working Philosophy
            </h2>
            
            <div className="philosophy-grid space-y-8">
              {philosophyItems.map((item, index) => (
                <div
                  key={index}
                  className="philosophy-item group border-t border-black/10 pt-6 flex gap-4 md:gap-6 transition-all duration-300"
                >
                  <span className="text-sm font-semibold tracking-wider text-black/30 font-mono">
                    {item.num}
                  </span>
                  <div>
                    <h4 className="text-lg font-medium tracking-tight mb-2 uppercase">
                      {item.title}
                    </h4>
                    <p className="text-sm font-light text-black/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
