"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import creativeData from "@/content/creative.json";

export default function CreativeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(creativeData[0]?.id || "");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.from(".creative-entrance", {
        scrollTrigger: {
          trigger: "#creative",
          start: "top 80%",
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

  const activeWork = creativeData.find((work) => work.id === activeTab);

  return (
    <section
      id="creative"
      ref={containerRef}
      className="w-full bg-white text-black py-24 md:py-36 px-6 md:px-12 border-b border-black/10 overflow-hidden"
      aria-label="Creative Work Showcase"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-16">
          <span className="creative-entrance text-xs font-bold tracking-[0.25em] uppercase text-black/50 mb-6">
            04 // Creative Sandbox
          </span>
          <h2 className="creative-entrance text-4xl md:text-5xl lg:text-6xl font-light tracking-tight uppercase leading-tight max-w-4xl">
            Concepts, scripts, &amp; original lore.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-black/10 pt-12">
          
          {/* Tab Selector Column */}
          <div className="creative-entrance lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-wider text-black/40 uppercase mb-6">
              Index of Excerpts
            </h3>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 border-b lg:border-b-0 border-black/10">
              {creativeData.map((work) => (
                <button
                  key={work.id}
                  onClick={() => setActiveTab(work.id)}
                  className={`text-left text-sm font-semibold tracking-wider uppercase px-4 py-3 border whitespace-nowrap transition-all duration-300 ${
                    activeTab === work.id
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black/10 hover:border-black"
                  }`}
                  aria-pressed={activeTab === work.id}
                >
                  {work.type} &mdash; {work.id.split("-")[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Reader Console Column */}
          <div className="creative-entrance lg:col-span-8">
            {activeWork && (
              <article className="border border-black p-6 md:p-12 min-h-[400px] flex flex-col justify-between transition-all duration-300">
                <div className="space-y-6">
                  {/* Meta Details */}
                  <div className="flex justify-between items-center border-b border-black/10 pb-4">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-black/50">
                      {activeWork.meta}
                    </span>
                    <span className="text-xs border border-black/15 font-mono px-2 py-0.5 uppercase bg-black/5">
                      {activeWork.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl md:text-2xl font-light uppercase tracking-tight">
                    {activeWork.title}
                  </h4>

                  {/* Content (Screenplay typewriter format or clean prose) */}
                  <div className="text-sm md:text-base font-mono leading-relaxed whitespace-pre-line text-black/80 max-w-2xl bg-black/[0.02] p-4 md:p-6 border-l-2 border-black/60 font-light select-text">
                    {activeWork.content}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-black/10 flex justify-between items-center text-xs font-mono text-black/40">
                  <span>Author: Vansh Barman</span>
                  <span>Copyright &copy; {new Date().getFullYear()}</span>
                </div>
              </article>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
