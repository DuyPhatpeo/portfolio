import React from "react";
import { motion } from "framer-motion";

const RouteLoader: React.FC = () => {
  return (
    <motion.div
      role="status"
      aria-label="Loading page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9990] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center select-none pointer-events-auto"
    >
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -6, opacity: 0 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-4"
      >
        {/* Solid single-color wordmark adapting automatically to dark/light mode */}
        <span className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-[0.06em] text-foreground">
          DINO PÉO
        </span>

        {/* Matching single-color progress sweep */}
        <div className="w-36 sm:w-48 h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full bg-foreground rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RouteLoader;
