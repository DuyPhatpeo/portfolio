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

      // 1. Giant Watermark horizontal parallax on scroll
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { xPercent: 12, opacity: 0.02 },
          {
            xPercent: -12,
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
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-background pt-24 md:pt-32 pb-16 md:pb-24"
    >
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

      {/* Main Container */}
      <div className="relative max-w-7xl w-full mx-auto px-6 md:px-12 space-y-8 md:space-y-10 z-10">
        {/* Top: Title & Info */}
        <div className="space-y-3.5 text-left">
          {/* Section Category Tag */}
          <div className="contact-reveal-item flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-mono text-xs md:text-sm font-bold tracking-[0.35em] uppercase">
              {t("contact.tag", "LIÊN HỆ")}
            </span>
          </div>

          <span className="contact-reveal-item text-foreground/50 font-mono text-xs md:text-sm tracking-[0.25em] uppercase block">
            {t("contact.subtitle")}
          </span>

          <h2 className="contact-reveal-item text-3xl sm:text-5xl md:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-[1.08]">
            {t("contact.title")}
          </h2>

          <p className="contact-reveal-item max-w-2xl text-foreground/70 text-sm md:text-base font-mono leading-relaxed">
            {t("contact.description")}
          </p>

          {/* Direct Email Address with Copy Trigger */}
          <div className="contact-reveal-item pt-1 space-y-1.5">
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em] block">
              {t("contact.direct_email")}
            </span>
            <div
              className="flex items-center gap-3.5 group/email cursor-pointer w-fit"
              onClick={() => {
                navigator.clipboard.writeText("phattranduy00@gmail.com");
                import("react-toastify").then(({ toast }) => {
                  toast.success(t("contact.alerts.copied", "Email copied to clipboard!"));
                });
              }}
            >
              <div className="w-8 h-px bg-primary/40 group-hover/email:w-12 transition-all duration-500"></div>
              <div className="flex flex-col">
                <span className="text-primary font-mono text-sm md:text-base lg:text-lg tracking-wider hover:text-white transition-colors duration-300 font-semibold">
                  phattranduy00@gmail.com
                </span>
                <span className="text-[9px] font-mono text-foreground/30 uppercase tracking-widest mt-0.5 opacity-70 group-hover/email:opacity-100 transition-opacity">
                  (click to copy address)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          className="relative bg-primary text-primary-foreground rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 overflow-hidden w-full"
        >
          {/* Subtle decorative inner corner glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
