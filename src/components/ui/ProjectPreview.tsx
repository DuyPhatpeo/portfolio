"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@lib/gsap";

interface ProjectPreviewProps {
  image: string;
  previewImage?: string;
  alt: string;
  className?: string;
}

export default function ProjectPreview({
  image,
  previewImage,
  alt,
  className,
}: ProjectPreviewProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Normalize image paths to always start with a leading slash if relative
  const rawSrc = previewImage || image;
  const src =
    rawSrc.startsWith("http") || rawSrc.startsWith("/") ? rawSrc : `/${rawSrc}`;
  const fallbackSrc =
    image.startsWith("http") || image.startsWith("/") ? image : `/${image}`;

  useGSAP(
    (_context, contextSafe) => {
      const viewport = viewportRef.current;
      const picture = imageRef.current;
      if (!viewport || !picture || !contextSafe) return;

      const card =
        viewport.closest<HTMLElement>(
          "[data-project-card], [data-featured-row], article"
        ) || viewport.parentElement;
      if (!card) return;

      const media = gsap.matchMedia();
      media.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          let hovering = false;
          let scrollTween: gsap.core.Tween | null = null;

          const getDistance = () => {
            return Math.max(0, picture.offsetHeight - viewport.clientHeight);
          };

          const animateScroll = contextSafe(() => {
            if (!hovering) return;
            const distance = getDistance();

            scrollTween?.kill();

            if (distance > 20) {
              // Full-length webpage preview: smooth continuous scroll from top to bottom
              const currentY =
                (gsap.getProperty(picture, "y") as number) || 0;
              const remaining = Math.abs(-distance - currentY);
              const duration = gsap.utils.clamp(2.5, 9, remaining / 240);

              scrollTween = gsap.to(picture, {
                y: -distance,
                scale: 1,
                duration,
                ease: "linear",
                overwrite: "auto",
              });
            } else {
              // Standard aspect screenshot: subtle zoom and top-to-bottom scroll reveal
              const targetY = -Math.round(viewport.clientHeight * 0.14);
              scrollTween = gsap.to(picture, {
                y: targetY,
                scale: 1.14,
                transformOrigin: "top center",
                duration: 2.5,
                ease: "power1.out",
                overwrite: "auto",
              });
            }
          });

          const start = contextSafe(() => {
            hovering = true;
            animateScroll();
          });

          const reset = contextSafe(() => {
            hovering = false;
            scrollTween?.kill();
            gsap.to(picture, {
              y: 0,
              scale: 1,
              transformOrigin: "top center",
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          card.addEventListener("pointerenter", start);
          card.addEventListener("pointerleave", reset);
          picture.addEventListener("load", () => {
            if (hovering) animateScroll();
          });

          const observer = new ResizeObserver(() => {
            if (hovering) animateScroll();
          });
          observer.observe(viewport);
          observer.observe(picture);

          return () => {
            card.removeEventListener("pointerenter", start);
            card.removeEventListener("pointerleave", reset);
            observer.disconnect();
            scrollTween?.kill();
          };
        }
      );
    },
    {
      scope: viewportRef,
      dependencies: [src],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      ref={viewportRef}
      className="absolute inset-0 overflow-hidden pointer-events-none bg-background/50"
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        decoding="async"
        onError={(event) => {
          if (event.currentTarget.getAttribute("src") === fallbackSrc) return;
          event.currentTarget.src = fallbackSrc;
        }}
        className={
          className ||
          "block w-full h-auto min-h-full object-cover object-top will-change-transform select-none"
        }
      />
    </div>
  );
}
