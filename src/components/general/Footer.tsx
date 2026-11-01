import { useRef } from "react";
import { profileData } from "@constants/profileData";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  const githubHref =
    profileData.socialLinks.find((l) => l.name.toLowerCase() === "github")
      ?.href || "https://github.com/DuyPhatpeo";

  const handleNavigate = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (id === "home") navigate("/");
    else if (id === "about") navigate("/about");
    else if (id === "projects") navigate("/projects");
    else if (id === "contact") navigate("/contact");
    else navigate(`/#${id}`);
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-20 overflow-hidden border-t border-border bg-card/90 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 pt-14 md:pt-20 pb-8 md:pb-12">
        {/* Editorial Oversized Brand Wordmark */}
        <div className="pt-4 pb-8 sm:pt-8 sm:pb-12 text-center overflow-hidden flex justify-center items-end">
          <motion.button
            onClick={() => {
              if (window.location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
                window.scrollTo(0, 0);
              }
            }}
            initial={{ y: 36, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block will-change-transform text-[14vw] sm:text-[13vw] md:text-[12vw] leading-[0.88] font-sans font-bold uppercase tracking-tight text-foreground cursor-pointer hover:text-primary transition-colors duration-300"
          >
            {profileData.logo}
          </motion.button>
        </div>

        {/* Bottom Metadata Row */}
        <div className="flex flex-col items-center text-center md:grid md:grid-cols-3 md:items-center md:text-left gap-6 pt-8 pb-4 border-t border-border">
          <div className="flex flex-col items-center md:items-start">
            <button
              onClick={(e) => handleNavigate(e, "contact")}
              className="text-base sm:text-lg font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-primary hover:text-primary transition-colors cursor-pointer"
            >
              {t("footer.contact_label")}
            </button>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 whitespace-nowrap">
              © {year}{" "}
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-medium underline underline-offset-4 decoration-border hover:decoration-primary hover:text-primary transition-colors"
              >
                Dino Péo (Trần Duy Phát)
              </a>
            </p>
          </div>

          <div className="flex flex-col items-center">
            <a
              href="mailto:phattranduy00@gmail.com"
              className="text-base sm:text-lg font-mono text-foreground underline underline-offset-4 decoration-border hover:decoration-primary hover:text-primary transition-colors"
            >
              phattranduy00@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2.5 md:justify-self-end">
            <span className="text-sm sm:text-base font-mono text-muted-foreground">
              {t("footer.follow")}
            </span>
            <div className="flex items-center gap-2">
              {profileData.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-10 h-10 rounded-full border border-border/80 bg-card/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <span aria-hidden="true">{link.icon}</span>
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
