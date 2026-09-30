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
          className="developer-hero__copy"
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
    </section>
  );
}
