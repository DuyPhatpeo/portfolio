import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import HeroAvatar from "./HeroAvatar";
import TypingRoles from "./TypingRoles";
import HeroButtons from "./HeroButtons";
import SocialLinks from "./SocialLinks";
import ScrollIndicator from "./ScrollIndicator";
import { useTranslation } from "react-i18next";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative h-dvh overflow-hidden flex items-center justify-center pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-28 md:pb-32 scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-16 items-center relative">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center space-y-2 sm:space-y-4 md:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            {/* Greeting */}
            <motion.span
              variants={itemVariants}
              className="text-primary font-mono text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase block ml-1"
            >
              {t("hero.greeting")}
            </motion.span>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              data-text={t("hero.title")}
              className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:text-[90px] xl:text-[110px] font-sans font-black uppercase leading-[1.05] tracking-tight text-foreground cyber-glitch-auto"
            >
              {t("hero.title")}
            </motion.h1>

            {/* Typing roles */}
            <motion.div variants={itemVariants} className="pl-4 border-l-2 border-primary/50">
              <TypingRoles />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-0 w-fit"
            >
              <HeroButtons />
              <SocialLinks scrollToSection={scrollToSection} />
            </motion.div>
          </motion.div>

          {/* Avatar Panel */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative order-first lg:order-last mb-2 sm:mb-4 lg:mb-0">
            <HeroAvatar />
          </div>
        </div>
      </div>

      <ScrollIndicator scrollToSection={scrollToSection} />
    </section>
  );
}
