import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { profileData } from "../../constants/profileData";
import { gsap, useGSAP } from "../../lib/gsap";

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const { avatar } = profileData;
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cornerTopRef = useRef<HTMLDivElement>(null);
  const cornerBottomRef = useRef<HTMLDivElement>(null);

  const paragraphs = t("about.paragraphs", { returnObjects: true }) as string[];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // ScrollTrigger Parallax for avatar image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -40,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // ScrollTrigger floating motion for decorative HUD corners
      if (cornerTopRef.current && cornerBottomRef.current) {
        gsap.to(cornerTopRef.current, {
          x: -12,
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(cornerBottomRef.current, {
          x: 12,
          y: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  // 3D Tilt on Avatar Container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageWrapperRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(imageWrapperRef.current, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
      transformStyle: "preserve-3d",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!imageWrapperRef.current) return;
    gsap.to(imageWrapperRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center py-12 md:py-16 relative overflow-hidden bg-(--background-alt)"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* Left: Image Container with 3D Tilt and GSAP Parallax */}
          <div
            className="lg:col-span-5 relative group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              ref={imageWrapperRef}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl shadow-2xl transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.2)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                ref={imageRef}
                src={avatar}
                alt="About Dino Péo"
                loading="lazy"
                decoding="async"
                className="w-full h-[115%] object-cover object-top transition-transform duration-700 will-change-transform"
              />

              {/* Subtle HUD scanlines on image */}
              <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(var(--primary-rgb),0.03)_2px,rgba(var(--primary-rgb),0.03)_4px)] opacity-30"></div>
            </motion.div>

            {/* Decorative corner accents with GSAP parallax */}
            <div
              ref={cornerTopRef}
              className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-primary/40 pointer-events-none rounded-tl-[3rem] transition-colors group-hover:border-primary"
            ></div>
            <div
              ref={cornerBottomRef}
              className="absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 border-primary/40 pointer-events-none rounded-br-[3rem] transition-colors group-hover:border-primary"
            ></div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
                {t("about.subtitle")}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none mb-6">
                {t("about.title")}
              </h2>
              <div className="h-1.5 w-24 bg-primary/30 rounded-2xl"></div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              {paragraphs.map((text, index) => (
                <p key={index} className="text-foreground/90 text-base md:text-lg leading-relaxed font-mono text-justify">
                  {text}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
