import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const fullText = "DINO PÉO";

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <footer
      className="bg-tech-bg/50 border-t border-tech-teal/30 py-8 mt-auto w-full relative overflow-hidden"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tech-teal/50 to-transparent"></div>

      {/* HUD Corner Accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-tech-teal/60 opacity-50 m-2"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-[3px] border-r-[3px] border-tech-teal/60 opacity-50 m-2"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col items-center justify-center space-y-8">
          {/* System Status Line */}
          <div className="flex items-center space-x-4 opacity-70">
            <div className="h-[1px] w-12 bg-tech-teal"></div>
            <span className="font-mono text-tech-teal text-xs tracking-[0.2em] uppercase">
              End of Transmission
            </span>
            <div className="h-[1px] w-12 bg-tech-teal"></div>
          </div>

          {/* Maximalist Glowing Name */}
          <div className="flex w-full justify-center">
            <motion.h1
              className="
                flex w-full flex-wrap justify-center gap-x-2 md:gap-x-4 lg:gap-x-6
                font-black uppercase tracking-tighter text-tech-light
                drop-shadow-[0_0_20px_rgba(68,187,164,0.6)]
              "
              style={{
                fontSize: "clamp(4rem, 12vw, 10rem)",
              }}
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {fullText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={child}
                  className="inline-block hover:text-tech-teal transition-colors duration-300"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Copyright Area */}
          <div className="flex flex-col sm:flex-row items-center justify-center w-full border-t border-tech-teal/20 pt-6 mt-8 font-mono text-[10px] md:text-xs text-tech-light/60 tracking-widest uppercase">
            <div className="flex items-center space-x-3">
              <span>© {new Date().getFullYear()}</span>
              <span className="text-tech-teal font-bold">DINO PÉO</span>
              <span>{t("footer.rights")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
