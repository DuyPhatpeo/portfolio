import { useRef } from "react";
import { profileData } from "@constants/profileData";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NAV_ITEMS = ["home", "about", "projects", "contact"];

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  const handleNavigate = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (id === "home") navigate("/");
    else if (id === "about") navigate("/about");
    else if (id === "projects") navigate("/projects");
    else if (id === "contact") navigate("/contact");
    else navigate(`/#${id}`);
  };

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-primary/10 bg-background">
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 pt-16 md:pt-24 pb-8 md:pb-12">
        {/* Top row: Navigation / Social */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between gap-6 md:gap-6">
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {NAV_ITEMS.map((id) => (
              <a
                key={id}
                href={`/${id === "home" ? "" : id}`}
                onClick={(e) => handleNavigate(e, id)}
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
        <div className="pt-8 pb-6 sm:pt-12 sm:pb-10 md:pt-16 md:pb-12 text-center overflow-hidden flex justify-center items-end">
          <motion.button
            onClick={() => {
              if (window.location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
                window.scrollTo(0, 0);
              }
            }}
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="inline-block will-change-transform text-[15vw] sm:text-[14vw] md:text-[13vw] leading-[0.85] font-sans font-black uppercase tracking-tighter text-foreground cursor-pointer hover:text-primary transition-colors duration-500"
          >
            {profileData.logo}
          </motion.button>
        </div>

        {/* Bottom row: Contact / Email / Follow */}
        <div className="flex flex-col items-center text-center md:grid md:grid-cols-3 md:items-center md:text-left gap-5 sm:gap-6 pt-10 pb-10 md:pb-14 border-t border-primary/10">
          <div className="flex flex-col items-center md:items-start">
            <button
              onClick={(e) => handleNavigate(e, "contact")}
              className="text-sm font-mono text-foreground underline underline-offset-4 decoration-primary/40 hover:text-primary transition-colors cursor-pointer"
            >
              {t("footer.contact_label")}
            </button>
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

          <div className="flex flex-col items-center md:items-end gap-3 md:justify-self-end">
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
