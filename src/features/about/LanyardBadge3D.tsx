"use client";

import React, { useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface LanyardBadge3DProps {
  avatarUrl: string;
  imageAlt: string;
  onLoad?: () => void;
}

export default function LanyardBadge3D({
  avatarUrl,
  imageAlt,
  onLoad,
}: LanyardBadge3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Snappy yet smooth spring physics for realistic weight
  const springConfig = { damping: 18, stiffness: 180, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center select-none py-2 cursor-grab active:cursor-grabbing"
      style={{ perspective: 1200 }}
    >
      {/* Outer physics wrapper: gentle organic pendulum floating when idle */}
      <motion.div
        animate={
          isHovered
            ? { y: 0, rotateZ: 0 }
            : {
                y: [0, -8, 0],
                rotateZ: [-0.8, 0.8, -0.8],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 4.5,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 1. Lanyard Strap descending lower down */}
        <div
          style={{ transform: "translateZ(35px)" }}
          className="relative flex flex-col items-center z-20 -mb-1"
        >
          {/* Lengthened Woven Fabric Lanyard Ribbon */}
          <div className="w-8 sm:w-9 h-24 sm:h-32 bg-neutral-900 border-x-2 border-primary flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_16px_rgba(45,212,168,0.35)]">
            <div className="absolute inset-y-0 left-1 w-px bg-white/10" />
            <div className="absolute inset-y-0 right-1 w-px bg-white/10" />
            <div className="absolute inset-y-0 w-0.5 bg-primary/60" />
            {/* Subtle woven cross-stitch pattern */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(45,212,168,0.12)_4px,rgba(45,212,168,0.12)_8px)]" />
          </div>

          {/* Matte Metallic Clasp Hardware */}
          <div className="w-8 h-3.5 rounded-xs bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-600 border border-neutral-400 z-20 -mt-0.5 shadow-sm" />

          {/* Metallic Swivel Carabiner Hook */}
          <div className="w-4 h-7 rounded-b-full border-2 border-neutral-300 bg-neutral-800 -mt-1 z-30 flex items-end justify-center pb-0.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-neutral-400" />
          </div>
        </div>

        {/* 2. Hanging 3D Frosted Acrylic Badge with full Green Rim & No Cutouts */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative flex flex-col items-center"
        >
          {/* Top Hanger Tab with Laser-cut Slot (Vibrant Green matching badge frame) */}
          <div
            style={{ transform: "translateZ(24px)" }}
            className="relative z-10 w-28 sm:w-32 h-6 sm:h-7 bg-primary/25 border-2 border-primary border-b-0 rounded-t-2xl backdrop-blur-2xl flex items-center justify-center gap-2.5 shadow-[0_-4px_16px_rgba(45,212,168,0.3)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-background border border-primary/50" />
            <span className="w-10 h-2.5 rounded-full bg-background border border-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-background border border-primary/50" />
          </div>

          {/* Main 3D Acrylic Badge Sleeve: Vibrant Green Rim (No black frame, no side cutouts) */}
          <div
            style={{
              transform: "translateZ(20px)",
              boxShadow:
                "0 32px 64px -14px rgba(0, 0, 0, 0.65), 0 0 45px rgba(45, 212, 168, 0.38), inset 0 1px 2px rgba(255, 255, 255, 0.45), inset 0 -1px 3px rgba(0, 0, 0, 0.3)",
            }}
            className="relative w-[280px] xs:w-[310px] sm:w-[340px] md:w-[360px] rounded-3xl bg-gradient-to-b from-primary/30 via-primary/15 to-primary/25 backdrop-blur-2xl border-2 border-primary p-2.5 sm:p-3 overflow-hidden group/badge"
          >
            {/* Dynamic Holographic Specular Glare shifting with cursor */}
            <motion.div
              style={{
                transform: "translateZ(30px)",
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)`,
              }}
              className="pointer-events-none absolute inset-0 rounded-3xl z-30 transition-opacity duration-300"
              aria-hidden="true"
            />

            {/* Subtle Diagonal Glass Sheen Reflection */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-75 z-25"
              aria-hidden="true"
            />

            {/* 100% Pure Photo Frame: Recessed in 3D space with primary inner border */}
            <div
              style={{ transform: "translateZ(10px)" }}
              className="relative w-full aspect-[3/3.8] rounded-2xl overflow-hidden bg-card/90 border border-primary/40 flex items-end justify-center shadow-inner"
            >
              <img
                src={avatarUrl}
                alt={imageAlt}
                className="relative z-10 w-full h-auto object-contain object-bottom block filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover/badge:scale-[1.02]"
                width={1536}
                height={1024}
                loading="eager"
                decoding="async"
                onLoad={onLoad}
              />
            </div>

            {/* Bottom Barcode & Developer Pass Tag (Floating in 3D) */}
            <div
              style={{ transform: "translateZ(26px)" }}
              className="pt-2 px-1 flex items-center justify-between text-primary font-mono text-[10px] relative z-20"
            >
              <span className="font-semibold tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                DEV // PASS 2026
              </span>
              <span className="tracking-widest opacity-80">||| | |||| | |||</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
