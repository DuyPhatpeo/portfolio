import { useRef, useEffect } from "react";
import { profileData } from "@constants/profileData";
import { useTranslation } from "react-i18next";
import HeroAvatar from "./HeroAvatar";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (
      !window.matchMedia(
        "(min-width: 769px) and (prefers-reduced-motion: no-preference)"
      ).matches
    )
      return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      void import("@lib/gsap").then(({ gsap, ScrollTrigger }) => {
        if (disposed) return;
        const media = gsap.matchMedia();
        media.add(
          "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
          () => {
            gsap.from("[data-hero-copy], [data-hero-avatar]", {
              y: 20,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
            });
            gsap.to("#hero-heading", {
              yPercent: -14,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            });
            gsap.to("[data-hero-portrait]", {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            });
          },
          sectionRef
        );
        let mounted = true;
        void document.fonts.ready.then(() => {
          if (mounted) ScrollTrigger.refresh();
        });
        cleanup = () => {
          mounted = false;
          media.revert();
        };
      });
    }, 800);
    return () => {
      disposed = true;
      clearTimeout(timer);
      cleanup?.();
    };
  }, []);

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
            className="relative w-max max-w-full m-0 font-['Baloo_2','Space_Grotesk',sans-serif] font-bold [font-synthesis:none] text-[clamp(92px,12.2vw,168px)] leading-[0.82] tracking-[-0.03em] uppercase text-foreground max-[1100px]:text-[12vw] max-[760px]:text-[clamp(84px,21vw,140px)] max-[380px]:text-[23vw]"
          >
            <span className="sr-only">
              {t(
                "hero.seo_h1",
                `${profileData.name} (Trần Duy Phát) — Frontend & Full-Stack Web Developer`
              )}
            </span>
            <span
              className="block relative isolate w-max before:content-[''] before:absolute before:-z-1 before:top-[4%] before:left-[-3%] before:w-[106%] before:h-[55%] before:rounded-[100px] before:bg-primary/20 before:rotate-[-2.5deg]"
              aria-hidden="true"
            >
              PORT
            </span>
            <span
              className="block relative isolate mt-[8px] ml-[clamp(32px,5vw,80px)] max-[760px]:mt-[6px]"
              aria-hidden="true"
            >
              FOLIO
            </span>
          </h1>

          <p className="mt-7 sm:mt-9 font-mono text-base sm:text-xl md:text-2xl text-foreground/85 flex items-center gap-3.5">
            <span className="w-8 h-0.5 bg-primary/80 inline-block" aria-hidden="true" />
            <span>
              {t("hero.tagline", "Trần Duy Phát · Frontend & Full-Stack Developer")}
            </span>
          </p>
        </div>

        <HeroAvatar />
      </div>
    </section>
  );
}
