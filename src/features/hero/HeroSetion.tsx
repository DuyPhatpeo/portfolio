import { motion, useReducedMotion } from "framer-motion";
import { profileData } from "@constants/profileData";
import HeroAvatar from "./HeroAvatar";
import "./hero-banner.css";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="developer-hero" aria-labelledby="hero-heading">
      <div className="developer-hero__inner">
        <motion.div
          className="developer-hero__copy flex flex-col justify-center items-start"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 id="hero-heading" className="developer-hero__heading" aria-label={`${profileData.name} — Portfolio`}>
            <span className="developer-hero__title-line developer-hero__title-line--marked" aria-hidden="true">PORT</span>
            <span className="developer-hero__title-line developer-hero__title-line--offset" aria-hidden="true">FOLIO</span>
          </h1>
        </motion.div>

        <HeroAvatar />
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <button 
          onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex flex-col items-center gap-3 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-foreground">
            Khám phá
          </span>
          <div className="w-6 h-10 border border-foreground/30 rounded-full flex justify-center pt-1.5 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
            <motion.div 
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
