import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { profileData } from "@constants/profileData";

export default function HeroAvatar() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="developer-hero__visual"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="developer-hero__portrait-block" aria-hidden="true" />
      <span className="developer-hero__portrait-ring" aria-hidden="true" />
      <img
        className="developer-hero__scene"
        src={profileData.heroImage}
        alt={t("hero.banner.imageAlt", "Developer Hero")}
        width={1536}
        height={1024}
        fetchPriority="high"
        decoding="async"
      />
    </motion.div>
  );
}
