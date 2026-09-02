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

          if (scrollY > 200) {
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
        { scale: 0.9, y: 3 },
        { scale: 1, y: 0, duration: 0.5, ease: "elastic.out(1.2, 0.4)" }
      );
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] select-none"
        >
          <button
            ref={btnRef}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-background/85 dark:bg-card/85 backdrop-blur-xl border border-primary/20 text-primary shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-primary hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* SVG Circular Progress Track & Indicator */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 44 44"
            >
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-primary/15 fill-none"
                strokeWidth="2.5"
              />
              <circle
                cx="22"
                cy="22"
                r="18"
                className="stroke-primary fill-none transition-[stroke-dashoffset] duration-150 ease-out"
                strokeWidth="2.5"
                strokeDasharray={113.1}
                strokeDashoffset={113.1 - (113.1 * scrollPercent) / 100}
                strokeLinecap="round"
              />
            </svg>

            {/* Hover ambient highlight */}
            <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Arrow Icon */}
            <HiArrowUp className="w-5 h-5 text-primary group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
