import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@lib/gsap";
import { profileData } from "@constants/profileData";
import HeroAvatar from "./HeroAvatar";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero-copy], [data-hero-avatar]", {
        y: 24, duration: 0.8, stagger: 0.12, ease: "power3.out",
      });
      gsap.from("[data-scroll-hint]", { autoAlpha: 0, duration: 0.6, delay: 0.8 });
      gsap.to("[data-scroll-dot]", {
        y: 16, autoAlpha: 0, duration: 0.8, repeat: -1, yoyo: true, ease: "power1.inOut",
      });
      gsap.to("#hero-heading", {
        yPercent: -18, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, start: "top top", end: "bottom top",
          scrub: 0.7, invalidateOnRefresh: true,
        },
      });
      gsap.to("[data-hero-portrait]", {
        yPercent: 12, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, start: "top top", end: "bottom top",
          scrub: 0.7, invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    let mounted = true;
    void document.fonts.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });
    return () => { mounted = false; media.revert(); };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="home" onLoad={() => ScrollTrigger.refresh()} className="relative isolate overflow-hidden min-h-svh pt-[145px] pb-[65px] flex items-center justify-center bg-transparent text-foreground font-[Inter,Arial,sans-serif] min-[1500px]:pt-[160px] max-[1100px]:min-h-[740px] max-[1100px]:pt-[130px] max-[760px]:min-h-0 max-[760px]:pt-[120px] max-[760px]:pb-0 motion-reduce:animate-none motion-reduce:transition-none motion-reduce:[&_*]:animate-none motion-reduce:[&_*]:transition-none" aria-labelledby="hero-heading">
      <div className="mx-auto grid w-[min(1280px,calc(100%_-_96px))] grid-cols-[1.05fr_1fr] gap-0 items-center max-[1100px]:w-[calc(100%_-_64px)] max-[760px]:w-[calc(100%_-_40px)] max-[760px]:grid-cols-1 max-[760px]:gap-3 max-[380px]:w-[calc(100%_-_32px)]">
        <div
          className="relative z-2 min-w-0 py-6 flex flex-col justify-center items-start max-[760px]:pt-[15px] max-[760px]:pb-0"
          data-hero-copy
        >
          <h1 id="hero-heading" className="relative w-max max-w-full m-0 font-['Baloo_2','Arial_Rounded_MT_Bold',Impact,sans-serif] font-normal [font-synthesis:none] text-[clamp(100px,12.8vw,178px)] leading-[0.79] tracking-[-0.035em] uppercase text-foreground max-[1100px]:text-[12.4vw] max-[760px]:text-[clamp(100px,22vw,150px)] max-[380px]:text-[25vw]" aria-label={`${profileData.name} — Portfolio`}>
            <span className="block relative isolate w-max before:content-[''] before:absolute before:-z-1 before:top-[3%] before:left-[-3%] before:w-[108%] before:h-[57%] before:rounded-[100px] before:bg-primary/24 before:rotate-[-3deg]" aria-hidden="true">PORT</span>
            <span className="block relative isolate mt-[9px] ml-[clamp(35px,5.5vw,85px)] max-[760px]:mt-[7px]" aria-hidden="true">FOLIO</span>
          </h1>
        </div>

        <HeroAvatar />
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        data-scroll-hint
      >
        <button
          onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
          }}
          className="group flex flex-col items-center gap-3 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-foreground">
            Khám phá
          </span>
          <div className="w-6 h-10 border border-foreground/30 rounded-full flex justify-center pt-1.5 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
            <div
              className="w-1 h-2 bg-primary rounded-full"
              data-scroll-dot
            />
          </div>
        </button>
      </div>
    </section>
  );
}
