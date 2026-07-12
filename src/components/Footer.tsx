"use client";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-white text-black py-16 md:py-24 px-6 md:px-12 border-t border-black/10"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        {/* Brand/Signature */}
        <div className="space-y-4">
          <a
            href="#"
            onClick={scrollToTop}
            className="text-lg font-bold tracking-widest uppercase hover:bg-black hover:text-white px-2 py-1 transition-colors duration-200"
          >
            Vansh Barman
          </a>
          <p className="text-xs font-light text-black/50 max-w-xs leading-relaxed uppercase tracking-wider font-mono">
            Founder. Writer. Building systems and intellectual property franchises.
          </p>
        </div>

        {/* Links grid */}
        <div className="flex flex-wrap gap-12 md:gap-16">
          {/* Internal links */}
          <div className="space-y-4">
            <span className="block text-[10px] font-mono font-bold tracking-widest text-black/45 uppercase">
              System Nodes
            </span>
            <ul className="space-y-2 text-xs font-semibold tracking-wider uppercase">
              <li>
                <a href="/#about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/#ventures" className="hover:underline">
                  Ventures
                </a>
              </li>
              <li>
                <a href="/#creative" className="hover:underline">
                  Creative Sandbox
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:underline font-bold">
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Socials / External links */}
          <div className="space-y-4">
            <span className="block text-[10px] font-mono font-bold tracking-widest text-black/45 uppercase">
              External Channels
            </span>
            <ul className="space-y-2 text-xs font-semibold tracking-wider uppercase">
              <li>
                <a
                  href="https://twitter.com/VanshBarman13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:bg-black hover:text-white px-1"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/vanshbarmanofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:bg-black hover:text-white px-1"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Baseline credits */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-mono text-black/40 uppercase tracking-widest">
        <span>&copy; {currentYear} Vansh Barman. All Rights Reserved.</span>
        <span>
          Designed &amp; Architected from First Principles
        </span>
      </div>
    </footer>
  );
}
