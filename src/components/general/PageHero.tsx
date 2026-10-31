import React from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  title1: string;
  title2?: string;
  indexLabel?: string;
  subtitle?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
  title1,
  title2,
  indexLabel,
  subtitle,
}) => {
  const fullTitle = `${title1} ${title2 || ""}`.trim();

  return (
    <div className="relative w-full pt-28 pb-10 md:pt-36 md:pb-14 bg-transparent">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="border-b border-border pb-8 md:pb-10">
          <div className="flex items-baseline justify-between gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-foreground leading-[1.05]"
            >
              {fullTitle}
            </motion.h1>

            {indexLabel && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                aria-hidden="true"
                className="hidden sm:inline-block font-mono text-base md:text-xl text-muted-foreground select-none shrink-0"
              >
                /{indexLabel}
              </motion.span>
            )}
          </div>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-[54ch] text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
