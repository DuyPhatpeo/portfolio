import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import ContactCard from "./ContactCard";
import { contactData } from "../../constants/contactData";
import SectionHeader from "../../components/ui/SectionHeader";
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
      className="py-24 relative overflow-hidden bg-background border-t border-primary/10 transition-all duration-500"
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

      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={itemVariants}>
          <SectionHeader title={t("contact.title")} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={formVariants}>
            <ContactForm />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {contactData.map((c, i) => (
              <motion.div key={i} variants={itemVariants}>
                <ContactCard {...c} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
