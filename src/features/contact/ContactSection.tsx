import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import ContactForm from "./ContactForm";
import { useTranslation } from "react-i18next";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const formVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="contact"
      className="min-h-screen flex items-center py-24 relative overflow-hidden bg-(--background-alt) transition-all duration-500"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Refined Cyber Mist Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,var(--primary)_0%,transparent_80%)] opacity-[0.06]" />

        {/* Cloudy Volumetric Layers */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[80%] h-[80%] bg-primary/20 blur-[160px] rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-[10%] right-[10%] w-[50%] h-[50%] bg-primary/10 blur-[100px] rounded-full opacity-30" />

        {/* Technological Texture */}
        <div className="absolute inset-0 cyber-lines opacity-[0.04]" />
        <div className="absolute inset-0 cyber-noise opacity-[0.05] mix-blend-overlay" />
      </div>

      {/* Decorative side borders */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.div variants={itemVariants} className="text-left space-y-4">
          <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block">
            {t("contact.subtitle")}
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-black text-foreground uppercase tracking-tight leading-none">
            {t("contact.title")}
          </h2>
          <p className="max-w-2xl text-foreground/50 text-sm md:text-base font-mono mb-6">
            {t("contact.description")}
          </p>
          
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-primary/40 uppercase tracking-[0.2em]">
              {t("contact.direct_email")}
            </span>
            <div className="flex items-center gap-4 group/email cursor-pointer" onClick={() => {
              navigator.clipboard.writeText("phattranduy00@gmail.com");
              import("react-toastify").then(({ toast }) => {
                toast.success(t("contact.alerts.copied", "Email copied to clipboard!"));
              });
            }}>
              <div className="w-8 h-px bg-primary/30 group-hover/email:w-12 transition-all duration-500"></div>
              <div className="flex flex-col">
                <span className="text-primary font-mono text-sm md:text-lg tracking-wider hover:text-white transition-colors duration-300">
                  phattranduy00@gmail.com
                </span>
                <span className="text-[9px] font-mono text-foreground/20 uppercase tracking-widest mt-1 opacity-0 group-hover/email:opacity-100 transition-opacity">
                  (click to copy address)
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            variants={formVariants}
            className="w-full max-w-3xl"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
