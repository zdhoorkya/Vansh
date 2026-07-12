"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import VenturesScroller from "@/components/VenturesScroller";
import CreativeSection from "@/components/CreativeSection";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Check prefers reduced motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Hero animations
      const timeline = gsap.timeline();
      
      timeline.from(".hero-line-y", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.2,
      });

      timeline.from(
        ".hero-text-reveal",
        {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        },
        "-=0.8"
      );

      timeline.from(
        ".hero-cta-reveal",
        {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      
      <main className="w-full bg-white text-black overflow-hidden" ref={heroRef}>
        
        {/* Cinematic Hero Section */}
        <section
          id="home"
          className="relative w-full h-screen flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 bg-white border-b border-black/10 select-none"
          aria-label="Welcome"
        >
          {/* Subtle Grid Blueprint Aesthetics (1px black/5 lines) */}
          <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
            <div className="hero-line-y border-r border-black/[0.03] h-full w-full"></div>
            <div className="hero-line-y border-r border-black/[0.03] h-full w-full"></div>
            <div className="hero-line-y border-r border-black/[0.03] h-full w-full"></div>
            <div className="h-full w-full"></div>
          </div>

          {/* Top tagline element */}
          <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-between items-start pt-12 md:pt-16">
            <span className="hero-text-reveal text-xs font-mono font-bold tracking-[0.2em] uppercase text-black/40">
              Personal Repository // Vansh Barman
            </span>
            <span className="hero-text-reveal text-xs font-mono font-bold tracking-[0.2em] uppercase text-black/40 hidden sm:inline">
              Est. &copy; 2026
            </span>
          </div>

          {/* Main Hero Header */}
          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-center items-start flex-grow">
            <h1 className="hero-text-reveal text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold tracking-tighter uppercase leading-none mb-6">
              Vansh Barman
            </h1>
            <p className="hero-text-reveal text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl text-black/80">
              Founder. Writer. Building original intellectual property franchises across film, fashion, fragrance, and technology.
            </p>
          </div>

          {/* Bottom Down Scroll Link */}
          <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-between items-end">
            <span className="hero-text-reveal text-xs font-mono uppercase tracking-widest text-black/40">
              Scroll to explore
            </span>
            <a
              href="#about"
              onClick={scrollToAbout}
              className="hero-cta-reveal flex items-center justify-center border border-black hover:bg-black hover:text-white p-3 transition-all duration-300"
              aria-label="Scroll down to narrative"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>

        </section>

        {/* Content sections */}
        <AboutSection />
        <VenturesScroller />
        <CreativeSection />
        <FAQSection />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
