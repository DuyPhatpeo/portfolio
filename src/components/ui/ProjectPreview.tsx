import { useRef, useState } from "react";
import { gsap, useGSAP } from "@lib/gsap";

interface ProjectPreviewProps {
  image: string;
  previewImage?: string;
  alt: string;
  className?: string;
}

export default function ProjectPreview({ image, previewImage, alt, className }: ProjectPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP((_context, contextSafe) => {
    const viewport = viewportRef.current;
    const picture = imageRef.current;
    const card = viewport?.parentElement;
    if (!viewport || !picture || !card || !previewImage || !contextSafe) return;

    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      let hovering = false;
      const start = contextSafe(() => {
        hovering = true;
        setShowPreview(true);
        const distance = Math.max(0, picture.offsetHeight - viewport.clientHeight);
        gsap.to(picture, {
          y: -distance, duration: Math.max(6, Math.min(18, distance / 65)),
          ease: "none", overwrite: true,
        });
      });
      const reset = contextSafe(() => {
        hovering = false;
        gsap.to(picture, { y: 0, duration: 0.65, ease: "power2.out", overwrite: true });
      });
      card.addEventListener("pointerenter", start);
      card.addEventListener("pointerleave", reset);
      const update = () => { if (hovering) start(); };
      picture.addEventListener("load", update);
      const observer = new ResizeObserver(update);
      observer.observe(viewport);
      return () => {
        card.removeEventListener("pointerenter", start);
        card.removeEventListener("pointerleave", reset);
        picture.removeEventListener("load", update);
        observer.disconnect();
        gsap.killTweensOf(picture);
        gsap.set(picture, { clearProps: "transform" });
      };
    });
    return () => media.revert();
  }, { scope: viewportRef, dependencies: [image, previewImage], revertOnUpdate: true });

  return (
    <div ref={viewportRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <img
        ref={imageRef}
        src={showPreview && previewImage ? previewImage : image}
        alt={alt}
        width={1000}
        height={625}
        loading="lazy"
        decoding="async"
        onError={(event) => {
          if (event.currentTarget.getAttribute("src") === image) return;
          event.currentTarget.src = image;
          event.currentTarget.className = "block w-full h-full object-cover";
        }}
        className={showPreview && previewImage ? "block w-full h-auto max-w-none" : (className || "block w-full h-full object-cover")}
      />
    </div>
  );
}
