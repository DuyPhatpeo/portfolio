import { useRef } from "react";
import { profileData } from "@constants/profileData";
import { useTranslation } from "react-i18next";
import { gsap, useGSAP, ScrollTrigger } from "@lib/gsap";
import HeroAvatar from "./HeroAvatar";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  // Idiomatic GSAP + React setup per greensock/gsap-skills (gsap-react, gsap-timeline, gsap-scrolltrigger)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Entrance timeline for all screens when reduced motion is not requested
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { duration: 0.8, ease: "power3.out" },
        });

        tl.from("[data-hero-word]", {
          autoAlpha: 0,
          y: 32,
          stagger: 0.12,
          duration: 0.85,
        })
          .from(
            "[data-hero-pill]",
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.55,
              ease: "power2.out",
            },
            "<0.2"
          )
          .from("[data-hero-tagline]", { autoAlpha: 0, x: -18 }, "<0.12")
          .from(
            "[data-hero-avatar]",
            { autoAlpha: 0, scale: 0.94, y: 18, duration: 0.85 },
            "<0.1"
          );

        // Continuous gentle floating effect for 3D character
        gsap.to("[data-hero-portrait]", {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Continuous smooth rotation for celestial orbit ring
        gsap.to("[data-hero-orbit]", {
          rotation: 360,
          duration: 28,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });

        // Subtle ambient breathing for planetary disc
        gsap.to("[data-hero-disc]", {
          scale: 1.04,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Desktop scroll-linked parallax scrub (transforms only, clamped bounds)
      mm.add(
        "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to("[data-hero-heading]", {
            yPercent: -14,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "clamp(top top)",
              end: "clamp(bottom top)",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });

          gsap.to("[data-hero-portrait]", {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "clamp(top top)",
              end: "clamp(bottom top)",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });
        }
      );

      let active = true;
      void document.fonts.ready.then(() => {
        if (active) ScrollTrigger.refresh();
      });

      return () => {
        active = false;
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate overflow-hidden min-h-svh pt-[130px] pb-[56px] flex items-center justify-center bg-transparent text-foreground min-[1500px]:pt-[148px] max-[1100px]:min-h-[700px] max-[1100px]:pt-[120px] max-[760px]:min-h-0 max-[760px]:pt-[110px] max-[760px]:pb-8 motion-reduce:animate-none motion-reduce:transition-none motion-reduce:[&_*]:animate-none motion-reduce:[&_*]:transition-none"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid w-[min(1280px,calc(100%_-_96px))] grid-cols-[1.05fr_1fr] gap-0 items-center max-[1100px]:w-[calc(100%_-_64px)] max-[760px]:w-[calc(100%_-_40px)] max-[760px]:grid-cols-1 max-[760px]:gap-4 max-[380px]:w-[calc(100%_-_32px)]">
        <div
          className="relative z-2 min-w-0 py-6 flex flex-col justify-center items-start max-[760px]:pt-[12px] max-[760px]:pb-0"
          data-hero-copy
        >
          <h1
            id="hero-heading"
            data-hero-heading
            className="relative w-max max-w-full m-0 font-['Baloo_2','Space_Grotesk',sans-serif] font-bold [font-synthesis:none] text-[clamp(92px,12.2vw,168px)] leading-[0.82] tracking-[-0.03em] uppercase text-foreground will-change-transform max-[1100px]:text-[12vw] max-[760px]:text-[clamp(84px,21vw,140px)] max-[380px]:text-[23vw]"
          >
            <span className="sr-only">
              {t(
                "hero.seo_h1",
                `${profileData.name} (Trần Duy Phát) — Frontend & Full-Stack Web Developer`
              )}
            </span>
            <span
              data-hero-word
              className="block relative isolate w-max"
              aria-hidden="true"
            >
              <span
                data-hero-pill
                className="absolute -z-1 top-[4%] left-[-3%] w-[106%] h-[55%] rounded-[100px] bg-primary/25 -rotate-[2.5deg] shadow-[0_0_24px_rgba(var(--primary-rgb,45,212,191),0.25)] will-change-transform"
              />
              PORT
            </span>
            <span
              data-hero-word
              className="block relative isolate mt-[8px] ml-[clamp(32px,5vw,80px)] max-[760px]:mt-[6px]"
              aria-hidden="true"
            >
              FOLIO
            </span>
          </h1>

          <p
            data-hero-tagline
            className="mt-7 sm:mt-9 font-mono text-base sm:text-xl md:text-2xl text-foreground/85 flex items-center gap-3.5"
          >
            <span className="w-8 h-0.5 bg-primary/80 inline-block shadow-[0_0_8px_rgba(var(--primary-rgb,45,212,191),0.6)]" aria-hidden="true" />
            <span>
              {t("hero.tagline", "Trần Duy Phát")}
            </span>
          </p>
        </div>

        <HeroAvatar />
      </div>
    </section>
  );
}
