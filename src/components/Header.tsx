"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md ${
        scrolled ? "border-b border-black py-3 md:py-4" : "border-b border-black/10 py-4 md:py-6"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="text-base md:text-xl font-bold tracking-widest uppercase hover:bg-black hover:text-white px-2 py-1 transition-colors duration-200"
          aria-label="Vansh Barman - Return to Top"
        >
          Vansh Barman
        </Link>

        {/* Navigation */}
        <nav role="navigation" aria-label="Main Navigation">
          <ul className="flex flex-wrap items-center justify-end gap-x-2 md:gap-x-4 gap-y-1 text-[10px] md:text-xs font-semibold tracking-wider uppercase">
            <li>
              <Link
                href="/#about"
                onClick={(e) => scrollToSection(e, "about")}
                className="hover:bg-black hover:text-white px-1.5 py-0.5 md:px-2 md:py-1 transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#ventures"
                onClick={(e) => scrollToSection(e, "ventures")}
                className="hover:bg-black hover:text-white px-1.5 py-0.5 md:px-2 md:py-1 transition-colors duration-200"
              >
                Ventures
              </Link>
            </li>
            <li>
              <Link
                href="/#creative"
                onClick={(e) => scrollToSection(e, "creative")}
                className="hover:bg-black hover:text-white px-1.5 py-0.5 md:px-2 md:py-1 transition-colors duration-200"
              >
                Creative
              </Link>
            </li>
            <li>
              <Link
                href="/#faq"
                onClick={(e) => scrollToSection(e, "faq")}
                className="hover:bg-black hover:text-white px-1.5 py-0.5 md:px-2 md:py-1 transition-colors duration-200"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className={`px-1.5 py-0.5 md:px-2 md:py-1 transition-colors duration-200 ${
                  pathname === "/gallery" ? "bg-black text-white" : "hover:bg-black hover:text-white"
                }`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="hover:bg-black hover:text-white px-1.5 py-0.5 md:px-2 md:py-1 transition-colors duration-200 border border-black"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
