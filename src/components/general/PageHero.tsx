import React, { useRef } from "react";
import { gsap, useGSAP } from "@lib/gsap";

interface PageHeroProps {
  title1: string;
  title2?: string;
  subtitle?: string;
  indexLabel?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title1, title2, subtitle }) => {
  const fullTitle = `${title1} ${title2 || ""}`.trim();
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(
          "[data-hero-title]",
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            clearProps: "transform,opacity",
          }
        );

        if (subtitle) {
          tl.fromTo(
            "[data-hero-subtitle]",
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              clearProps: "transform,opacity",
            },
            "-=0.45"
          );
        }
      });
    },
    { scope: heroRef, dependencies: [fullTitle, subtitle] }
  );

  return (
    <div ref={heroRef} className="relative w-full pt-24 pb-6 md:pt-32 md:pb-8 bg-transparent">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="border-b border-border pb-6 md:pb-8">
          <h1
            data-hero-title
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-foreground leading-[1.05]"
          >
            {fullTitle}
          </h1>

          {subtitle && (
            <p
              data-hero-subtitle
              className="mt-4 text-lg sm:text-xl text-muted-foreground leading-relaxed lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis"
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
