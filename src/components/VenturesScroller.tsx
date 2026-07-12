"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import venturesData from "@/content/ventures.json";

export default function VenturesScroller() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Check prefers reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const pinSection = pinSectionRef.current;
      const horizontalContainer = horizontalRef.current;
      if (!pinSection || !horizontalContainer) return;

      const mm = gsap.matchMedia();

      // Desktop animation: Pin section and translate horizontally
      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray(".venture-panel");
        
        const scrollTween = gsap.to(horizontalContainer, {
          x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: pinSection,
            pin: true,
            scrub: 1,
            start: "top top",
            // scroll distance is proportional to horizontal content width
            end: () => `+=${horizontalContainer.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        });

        // Entrance fade-in for details on panel active state
        panels.forEach((panel) => {
          const panelEl = panel as HTMLElement;
          gsap.fromTo(
            panelEl.querySelectorAll(".animate-panel-child"),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panelEl,
                containerAnimation: scrollTween,
                start: "left 80%",
                toggleActions: "play none none none",
              }
            }
          );
        });
      });

      // Mobile animation: Elegant vertical reveals instead of horizontal scrolling
      mm.add("(max-width: 1023px)", () => {
        const panels = gsap.utils.toArray(".mobile-panel");
        panels.forEach((panel) => {
          const panelEl = panel as HTMLElement;
          gsap.from(panelEl.querySelectorAll(".animate-mobile-child"), {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panelEl,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      });
    }, pinSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ventures"
      ref={pinSectionRef}
      className="relative w-full bg-black text-white border-b border-black/10 overflow-hidden"
      aria-label="Vansh Barman Ventures"
    >
      {/* Desktop Horizontal Scroll Layout (lg and up) */}
      <div className="hidden lg:block w-full">
        <div ref={horizontalRef} className="flex flex-nowrap h-screen w-max items-center">
          
          {/* Header Panel */}
          <div className="w-[100vw] h-screen flex flex-col justify-center px-12 md:px-24 flex-shrink-0 bg-white text-black border-r border-black/10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-black/50 block mb-6">
                03 // Portfolio
              </span>
              <h2 className="text-6xl md:text-7xl font-light tracking-tight uppercase leading-tight mb-8">
                Ventures &amp; <br /> Franchises
              </h2>
              <p className="text-lg md:text-xl font-light text-black/70 leading-relaxed">
                Building original intellectual property, high-end consumer goods, and digital operational platforms designed from first principles.
              </p>
              <div className="mt-12 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-black/40 animate-pulse">
                <span>Scroll Down to Pan</span>
                <svg className="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Ventures Panels */}
          {venturesData.map((venture, idx) => (
            <div
              key={venture.id}
              className="venture-panel w-[100vw] h-screen flex items-center px-12 md:px-24 flex-shrink-0 bg-white text-black border-r border-black/10"
            >
              <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                {/* Visual Placeholder / Large Index */}
                <div className="animate-panel-child md:col-span-4 flex justify-center items-center select-none">
                  <span className="text-[12rem] md:text-[16rem] font-extrabold tracking-tighter text-black/5 font-mono leading-none">
                    0{idx + 1}
                  </span>
                </div>

                {/* Venture details */}
                <div className="animate-panel-child md:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-semibold tracking-wider text-black/40 uppercase">
                      {venture.category} &mdash; {venture.role}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-light tracking-tight uppercase">
                      {venture.title}
                    </h3>
                  </div>
                  
                  <p className="text-xl font-medium text-black/90">
                    {venture.oneLiner}
                  </p>
                  
                  <p className="text-sm md:text-base font-light text-black/70 leading-relaxed max-w-xl">
                    {venture.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {venture.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs border border-black/20 font-mono tracking-wider px-3 py-1 bg-black/5 hover:bg-black hover:text-white transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Mobile Stack Layout (lg screen exclusion) */}
      <div className="block lg:hidden bg-white text-black py-20 px-6">
        <div className="max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-black/50 block mb-4">
            03 // Portfolio
          </span>
          <h2 className="text-4xl font-light tracking-tight uppercase leading-tight mb-6">
            Ventures &amp; Franchises
          </h2>
          <p className="text-base font-light text-black/70 leading-relaxed">
            Building original intellectual property, high-end consumer goods, and digital operational platforms designed from first principles.
          </p>
        </div>

        <div className="space-y-16">
          {venturesData.map((venture, idx) => (
            <div
              key={venture.id}
              className="mobile-panel border-t border-black/10 pt-12 space-y-6"
            >
              <div className="flex justify-between items-center animate-mobile-child">
                <span className="text-xs font-mono text-black/40 uppercase">
                  {venture.category}
                </span>
                <span className="text-lg font-mono font-bold text-black/30">
                  0{idx + 1}
                </span>
              </div>

              <div className="space-y-2 animate-mobile-child">
                <h3 className="text-3xl font-light uppercase tracking-tight">
                  {venture.title}
                </h3>
                <span className="inline-block text-xs font-mono bg-black/5 px-2 py-0.5 uppercase">
                  {venture.role}
                </span>
              </div>

              <p className="text-lg font-medium text-black/90 animate-mobile-child">
                {venture.oneLiner}
              </p>

              <p className="text-sm font-light text-black/70 leading-relaxed animate-mobile-child">
                {venture.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2 animate-mobile-child">
                {venture.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs border border-black/20 font-mono px-2 py-0.5 bg-black/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
