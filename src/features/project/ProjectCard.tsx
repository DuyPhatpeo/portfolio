import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiArrowLongRight } from "react-icons/hi2";
import type { Project } from "../../types/data";
import { gsap } from "../../lib/gsap";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
      overwrite: "auto",
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.35,
        x: (x / rect.width) * 100 - 50,
        y: (y / rect.height) * 100 - 50,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const enterFrom = ["translate-y-10", "-translate-x-10", "-translate-y-10", "translate-x-10"][index % 4];

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative overflow-hidden cursor-pointer bg-card aspect-video
        border border-transparent hover:border-primary/50
        transition-all duration-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]
        hover:!opacity-100 hover:!blur-none group-hover/list:opacity-50 group-hover/list:blur-[2px]
        will-change-transform
        ${isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${enterFrom}`}
      `}
      style={{
        transitionDelay: `${index * 80}ms`,
        transformStyle: "preserve-3d",
      }}
    >
      <img
        src={project.image}
        alt={t(`projects.items.${project.id}.title`)}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      {/* 3D Specular Glare Overlay */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none opacity-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_60%)] mix-blend-overlay transition-opacity duration-300"
      />

      {/* HUD corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        className="absolute bottom-0 left-0 right-0 p-3 md:p-6"
        style={{ transform: "translateZ(25px)" }}
      >
        <h3 className="font-sans font-black text-white uppercase tracking-tight leading-tight line-clamp-2 text-lg md:text-2xl">
          {t(`projects.items.${project.id}.title`)}
        </h3>
        <div className="flex items-center gap-1.5 text-primary font-mono text-[10px] uppercase tracking-widest max-h-0 opacity-0 group-hover:max-h-6 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 overflow-hidden">
          <span>{t("projects.modal.view_details")}</span>
          <HiArrowLongRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}
