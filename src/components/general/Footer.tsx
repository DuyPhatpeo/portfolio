import { motion } from "framer-motion";

const Footer = () => {
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
    <footer className="bg-transparent py-2 mt-auto w-full overflow-hidden">
      <div className="w-full px-4">
        <div className="relative flex flex-col items-center justify-center">
          {/* Copyright */}
          <div className="absolute top-0 right-4 z-10 flex items-center space-x-1 text-xs text-gray-400">
            <span>© 2025</span>
            <span className="font-semibold text-primary">DINO PÉO</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          {/* Gradient Animated Name */}
          <div className="mt-8 flex min-h-[10rem] w-full justify-center">
            <motion.h1
              className="
                flex w-full flex-wrap justify-center gap-x-2 md:gap-x-4 lg:gap-x-6
                font-black
                bg-gradient-to-r from-primary via-secondary to-primary
                bg-clip-text text-transparent
              "
              style={{
                fontSize: "clamp(4rem, 12vw, 10rem)",
                fontFamily: "Arial Black, sans-serif",
                letterSpacing: "0.05em",
                textShadow: "0 6px 12px rgba(0,0,0,0.25)",
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
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
