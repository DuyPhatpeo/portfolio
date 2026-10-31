import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";

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
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;

          setVisible(scrollY > 240);

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] select-none"
        >
          <button
            ref={btnRef}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group relative flex items-center gap-2.5 pl-2 pr-4 h-11 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-md hover:border-primary/60 transition-colors duration-200 cursor-pointer overflow-hidden"
          >
            {/* Subtle progress fill */}
            <div
              className="absolute left-0 top-0 h-full bg-primary/12 transition-all duration-100 ease-out z-0"
              style={{ width: `${scrollPercent}%` }}
            />

            <div className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
              <HiArrowUp className="w-3.5 h-3.5" />
            </div>

            <span className="relative z-10 font-mono text-xs font-medium tabular-nums text-muted-foreground group-hover:text-foreground transition-colors min-w-[3ch] text-right">
              {scrollPercent}%
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
