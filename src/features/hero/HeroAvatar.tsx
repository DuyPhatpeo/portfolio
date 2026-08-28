import React, { useRef } from "react";
import { profileData } from "../../constants/profileData";
import { gsap, useGSAP } from "../../lib/gsap";

const HeroAvatar: React.FC = () => {
  const { heroImage, name } = profileData;
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!imageRef.current || !containerRef.current) return;

      // Initial entrance
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, x: 50 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power3.out" }
      );

      // Smooth floating animation
      gsap.to(imageRef.current, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Mouse interactive tilt/parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 25;
        const yPos = (clientY / innerHeight - 0.5) * 25;

        gsap.to(imageRef.current, {
          x: xPos,
          rotationY: xPos * 0.4,
          rotationX: -yPos * 0.4,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
          x: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex justify-center lg:justify-end [perspective:1000px]">
      <div className="relative w-full max-w-[160px] xs:max-w-[200px] sm:max-w-[280px] md:max-w-[500px] lg:max-w-[600px] group">
        <div className="relative z-10 will-change-transform">
          <img
            ref={imageRef}
            src={heroImage}
            alt={name}
            width="500"
            height="500"
            fetchPriority="high"
            decoding="async"
            className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(var(--primary-rgb),0.25)] select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroAvatar;

