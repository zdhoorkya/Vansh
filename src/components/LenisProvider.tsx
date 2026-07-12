"use client";

import { ReactLenis, LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Sync ScrollTrigger updates with Lenis scrolling
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      // Direct integration: Update ScrollTrigger when Lenis scrolls
      const handleScroll = () => {
        ScrollTrigger.update();
      };
      lenis.on("scroll", handleScroll);

      // Synchronize GSAP ticker frame rate with Lenis requestAnimationFrame
      const updateGsap = (time: number) => {
        lenis.raf(time * 1000);
      };
      
      gsap.ticker.add(updateGsap);
      
      // Prevent GSAP from dropping frames when tab is out of focus
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(updateGsap);
        lenis.off("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.2,
        lerp: 0.1,
        syncTouch: true,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
