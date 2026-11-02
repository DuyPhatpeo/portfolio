"use client";

import { useRef, useState } from "react";
import ContactForm from "./ContactForm";
import { useTranslation } from "react-i18next";
import { gsap, useGSAP } from "@lib/gsap";
import { profileData } from "@constants/profileData";
import { toast } from "react-toastify";
import { FiCheck, FiCopy, FiMapPin } from "react-icons/fi";

export default function ContactSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Scoped GSAP timeline + matchMedia reduced-motion support per greensock/gsap-skills
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (watermarkRef.current) {
          gsap.fromTo(
            watermarkRef.current,
            { xPercent: 8 },
            {
              xPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "clamp(top bottom)",
                end: "clamp(bottom top)",
                scrub: 1,
              },
            }
          );
        }

        const tl = gsap.timeline({
          defaults: { duration: 0.6, ease: "power3.out" },
          delay: 0.08,
        });

        tl.from(".contact-reveal-item", {
          autoAlpha: 0,
          y: 20,
          stagger: 0.08,
        }).from(
          "[data-contact-form]",
          {
            autoAlpha: 0,
            y: 24,
          },
          "<0.12"
        );
      });
    },
    { scope: sectionRef }
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("phattranduy00@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
    toast.success(t("contact.alerts.copied", "Email copied to clipboard!"));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-transparent py-12 sm:py-16 md:py-24"
    >
      {/* Subtle architectural watermark */}
      <div className="absolute inset-x-0 bottom-4 pointer-events-none overflow-hidden flex items-center">
        <div
          ref={watermarkRef}
          aria-hidden="true"
          className="whitespace-nowrap font-sans font-bold uppercase text-[15vw] md:text-[13vw] leading-none select-none will-change-transform text-foreground/[0.03] tracking-tight"
        >
          <span className="inline-block px-6">{t("contact.watermark")}</span>
          <span className="inline-block px-6">{t("contact.watermark")}</span>
        </div>
      </div>

      {/* Main 2-Column Editorial Container */}
      <div className="relative max-w-7xl w-full mx-auto px-5 sm:px-8 md:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="contact-reveal-item text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
              {t("contact.title")}
            </h2>

            <p className="contact-reveal-item max-w-[44ch] text-foreground/95 text-xl sm:text-2xl leading-relaxed">
              {t("contact.subtitle")}
            </p>

            <p className="contact-reveal-item max-w-[46ch] text-muted-foreground text-lg sm:text-xl leading-relaxed">
              {t("contact.description")}
            </p>

            {/* Copyable Direct Email */}
            <div className="contact-reveal-item pt-2 space-y-2.5">
              <span className="text-base font-mono text-muted-foreground block">
                {t("contact.direct_email")}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group inline-flex items-center gap-3.5 min-h-13 px-5 py-3.5 rounded-xl bg-card border border-border hover:border-primary/60 transition-colors cursor-pointer text-left"
              >
                <span className="font-mono text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors font-medium">
                  phattranduy00@gmail.com
                </span>
                <span className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                  {copied ? (
                    <FiCheck className="w-4.5 h-4.5 text-primary" />
                  ) : (
                    <FiCopy className="w-4.5 h-4.5" />
                  )}
                </span>
              </button>
            </div>

            {/* Location */}
            <div className="contact-reveal-item flex items-center gap-2.5 text-lg text-muted-foreground pt-1">
              <FiMapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{t("contact.values.location")}</span>
            </div>

            {/* Social Profiles */}
            <div className="contact-reveal-item flex items-center gap-2.5 pt-2">
              {profileData.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  aria-label={link.name}
                  className="w-11 h-11 rounded-full bg-card border border-border hover:border-primary/60 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Architectural Form Panel */}
          <div
            data-contact-form
            className="lg:col-span-7 bg-card text-card-foreground border border-border rounded-2xl p-6 sm:p-8 md:p-10 w-full"
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
