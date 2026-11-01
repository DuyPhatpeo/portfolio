import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 240);
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
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] select-none"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-card/90 hover:bg-card backdrop-blur-xl border border-border/80 hover:border-primary/60 text-foreground hover:text-primary transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1 active:translate-y-0"
          >
            <HiArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
