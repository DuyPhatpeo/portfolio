import { useRef } from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import { useTranslation } from "react-i18next";
import { gsap, useGSAP } from "../../lib/gsap";

export default function ContactSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Giant Watermark "LIÊN HỆ" horizontal parallax on scroll
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { xPercent: 15, opacity: 0.02 },
          {
            xPercent: -15,
            opacity: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Staggered reveal for contact header text elements
      const revealItems = sectionRef.current.querySelectorAll(".contact-reveal-item");
      if (revealItems.length > 0) {
        gsap.fromTo(
          revealItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden">
      {/* Giant watermark with GSAP ScrollTrigger horizontal glide */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center">
        <div
          ref={watermarkRef}
          aria-hidden
          className="whitespace-nowrap font-sans font-black uppercase text-[22vw] md:text-[15vw] leading-none select-none will-change-transform text-foreground/5 dark:text-foreground/5 tracking-tighter"
        >
          <span className="inline-block px-4">{t("contact.watermark")}</span>
          <span className="inline-block px-4 text-transparent [-webkit-text-stroke:1.5px_rgba(var(--primary-rgb),0.15)]">
            {t("contact.watermark")}
          </span>
        </div>
      </div>

      {/* Header content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-14 md:pb-20">
        <div className="relative text-left space-y-4">
          <span className="contact-reveal-item text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block">
            {t("contact.subtitle")}
          </span>
          <h2 className="contact-reveal-item text-4xl md:text-6xl lg:text-7xl font-sans font-black text-foreground uppercase tracking-tight leading-none">
            {t("contact.title")}
          </h2>
          <p className="contact-reveal-item max-w-2xl text-foreground/50 text-sm md:text-base font-mono mb-6 text-justify">
            {t("contact.description")}
          </p>

          <div className="contact-reveal-item space-y-3">
            <span className="text-[10px] font-mono text-primary/40 uppercase tracking-[0.2em]">
              {t("contact.direct_email")}
            </span>
            <div
              className="flex items-center gap-4 group/email cursor-pointer w-fit"
              onClick={() => {
                navigator.clipboard.writeText("phattranduy00@gmail.com");
                import("react-toastify").then(({ toast }) => {
                  toast.success(t("contact.alerts.copied", "Email copied to clipboard!"));
                });
              }}
            >
              <div className="w-8 h-px bg-primary/30 group-hover/email:w-12 transition-all duration-500"></div>
              <div className="flex flex-col">
                <span className="text-primary font-mono text-sm md:text-lg tracking-wider hover:text-white transition-colors duration-300">
                  phattranduy00@gmail.com
                </span>
                <span className="text-[9px] font-mono text-foreground/20 uppercase tracking-widest mt-1 opacity-60 md:opacity-0 md:group-hover/email:opacity-100 transition-opacity">
                  (click to copy address)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative bg-primary ml-[8%] sm:ml-[16%] md:ml-[20%] lg:ml-[24%]"
      >
        <div className="px-6 sm:px-10 md:px-16 py-16 md:py-24">
          <ContactForm />
        </div>
      </motion.div>
    </section>
  );
}
