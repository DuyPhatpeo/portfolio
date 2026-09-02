import { useRef } from "react";
import { profileData } from "../../constants/profileData";
import { useTranslation } from "react-i18next";
import { gsap, useGSAP } from "../../lib/gsap";

const NAV_ITEMS = ["home", "about", "skills", "experience", "projects", "contact"];

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current || !logoRef.current) return;

      gsap.fromTo(
        logoRef.current,
        {
          scaleY: 0.1,
          opacity: 0.3,
          transformOrigin: "bottom center",
        },
        {
          scaleY: 1.3,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-primary/10 bg-background">
      <div className="w-full px-6 md:px-12 pt-8 md:pt-10 pb-4">
        {/* Top row: Navigation / Social */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between gap-8 md:gap-6">
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {NAV_ITEMS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm font-mono text-foreground/70 hover:text-primary transition-colors"
              >
                {t(`nav.${id}`)}
              </a>
            ))}
          </nav>

          <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {profileData.socialLinks.map((link, i) => (
              <span key={link.name} className="flex items-center gap-3">
                {i > 0 && <span className="text-foreground/20 text-xs">•</span>}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-foreground/70 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              </span>
            ))}
          </nav>
        </div>

        {/* Giant name - NAMMA Style Vertical Stretch */}
        <div className="pt-16 pb-10 md:pt-28 md:pb-16 text-center overflow-hidden flex justify-center items-end">
          <span
            ref={logoRef}
            className="inline-block origin-bottom will-change-transform text-[18vw] sm:text-[16vw] md:text-[13vw] leading-[0.85] font-sans font-black uppercase tracking-tighter text-foreground select-none"
          >
            {profileData.logo}
          </span>
        </div>

        {/* Bottom row: Contact / Email / Follow */}
        <div className="flex flex-col items-center text-center md:grid md:grid-cols-3 md:items-center md:text-left gap-6 pt-6 pb-6 md:pb-8 border-t border-primary/10">
          <div className="flex flex-col items-center md:items-start">
            <a
              href="#contact"
              className="text-sm font-mono text-foreground underline underline-offset-4 decoration-primary/40 hover:text-primary transition-colors"
            >
              {t("footer.contact_label")}
            </a>
            <p className="text-[10px] font-mono text-foreground/40 tracking-widest uppercase mt-2">
              © {year} {profileData.logo}. {t("footer.rights")}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <a
              href="mailto:phattranduy00@gmail.com"
              className="text-sm font-mono text-foreground underline underline-offset-4 decoration-primary/40 hover:text-primary transition-colors"
            >
              phattranduy00@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 md:justify-self-end md:pr-16">
            <span className="text-[10px] font-mono text-foreground/40 tracking-[0.2em] uppercase">
              {t("footer.follow")}
            </span>
            <div className="flex items-center gap-4">
              {profileData.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={`text-foreground/60 transition-colors ${link.hoverColor}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
