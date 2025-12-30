import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import ContactCard from "./ContactCard";
import { contactData } from "../../data/contactData";
import SectionHeader from "../ui/SectionHeader";
import ContactForm from "./ContactForm";

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
  return (
    <motion.section
      id="contact"
      className="py-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={itemVariants}>
          <SectionHeader title="Get In Touch" />
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
