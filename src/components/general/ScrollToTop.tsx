import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";
import { gsap } from "../../lib/gsap";

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

          if (scrollY > 250) {
            setVisible(true);
          } else {
            setVisible(false);
          }

          if (totalHeight > 0) {
            const percent = Math.round((scrollY / totalHeight) * 100);
            setScrollPercent(Math.min(100, Math.max(0, percent)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (): void => {
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 0.85 },
        { scale: 1, duration: 0.5, ease: "elastic.out(1.2, 0.4)" }
      );
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG Circular Gauge Calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          drag
          dragConstraints={{ left: -100, right: 10, top: -200, bottom: 20 }}
          dragElastic={0.25}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
          whileDrag={{ scale: 1.15, cursor: "grabbing" }}
          className="fixed bottom-8 right-6 md:bottom-8 md:right-8 z-[90] select-none"
        >
          <button
            ref={btnRef}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="relative w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-primary/30 flex items-center justify-center text-primary shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] hover:border-primary transition-all duration-300 group cursor-pointer"
          >
            {/* SVG Circular Progress Track and Fill */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1">
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-foreground/10"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-primary transition-[stroke-dashoffset] duration-150 ease-out"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Arrow Icon */}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <HiArrowUp className="w-4 h-4 text-primary group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>

            {/* Hover Tooltip showing percentage */}
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-mono font-bold bg-black/90 text-primary border border-primary/40 px-1.5 py-0.5 rounded shadow-md pointer-events-none whitespace-nowrap">
              {scrollPercent}%
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
