import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";
import { gsap } from "@lib/gsap";

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
            className="group relative flex items-center gap-2 pl-2 pr-4 h-12 rounded-full bg-card/90 backdrop-blur-xl border border-border/50 shadow-2xl hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Progress Background Fill */}
            <div 
              className="absolute left-0 top-0 h-full bg-primary/20 transition-all duration-100 ease-out z-0"
              style={{ width: `${scrollPercent}%` }}
            />
            
            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-background/50 border border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
              <HiArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
            
            <span className="relative z-10 font-mono text-sm font-bold text-foreground/70 group-hover:text-foreground transition-colors min-w-[3ch] text-right">
              {scrollPercent}%
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
