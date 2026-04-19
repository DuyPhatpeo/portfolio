import { FiExternalLink, FiGithub } from "react-icons/fi";
import type { Project } from "../../types/data";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface FeaturedProjectProps {
  project: Project;
  index: number;
}

export default function FeaturedProject({
  project,
  index,
}: FeaturedProjectProps) {
  const [isVisible, setIsVisible] = useState(false);
  const projectRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (projectRef.current) observer.observe(projectRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------- IMAGE ---------- */
  const ImageBlock = (
    <div className="relative group">
      <div
        className="relative w-full overflow-hidden border border-primary/40 bg-card/50 shadow-[0_0_15px_rgba(0,255,136,0.1)] transition-all duration-300 cyber-chamfer"
      >
        <img
          src={project.image}
          alt={t(`projects.items.${project.id}.title`)}
          className="
            w-full transition-transform duration-500
            md:group-hover:scale-[1.05]
          "
        />
      </div>

      {/* HUD Accents */}
      <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-2 border-l-2 border-primary transition-all duration-300 z-10 pointer-events-none"></div>
      <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-2 border-r-2 border-primary transition-all duration-300 z-10 pointer-events-none"></div>
    </div>
  );

  /* ---------- CONTENT ---------- */
  const ContentBlock = () => (
    <div
      className={`max-w-lg mx-auto ${project.reverse ? "text-center md:text-left" : "text-center md:text-right"}`}
    >
      <p className="text-primary font-mono text-xs md:text-sm mb-2 tracking-[0.2em] uppercase flex items-center gap-2 justify-center md:justify-start">
        {project.reverse ? null : (
          <span className="hidden md:inline-block h-px w-8 bg-primary/50"></span>
        )}
        {t("projects.badges.featured")}
        {project.reverse ? (
          <span className="hidden md:inline-block h-px w-8 bg-primary/50"></span>
        ) : null}
      </p>

      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-black mb-4 text-foreground uppercase tracking-tight drop-shadow-[0_0_8px_var(--primary)] hover:text-primary transition-colors">
        {t(`projects.items.${project.id}.title`)}
      </h3>

      {/* DESCRIPTION - HUD Data Module */}
      <div
        className="bg-card/80 backdrop-blur-md border border-primary/30 p-5 md:p-6 shadow-[0_0_15px_var(--primary)] mb-6 relative z-10 cyber-chamfer"
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/50"></div>
        <p className="leading-relaxed text-sm md:text-base text-foreground/80 font-mono">
          {t(`projects.items.${project.id}.description`)}
        </p>
      </div>

      {/* TAGS */}
      <div
        className={`flex flex-wrap gap-3 mb-6 font-mono text-xs uppercase tracking-widest text-primary justify-center ${project.reverse ? "md:justify-start" : "md:justify-end"}`}
      >
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-primary/10 px-2 py-1 border border-primary/30"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ICONS */}
      <div
        className={`flex gap-4 justify-center ${project.reverse ? "md:justify-start" : "md:justify-end"}`}
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              p-3 bg-card border border-primary/50
              text-foreground hover:text-primary hover:border-primary hover:cyber-glow
              transition-all duration-300 cyber-chamfer
            "
          >
            <FiGithub size={20} />
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="
              p-3 bg-card border border-primary/50
              text-foreground hover:text-primary hover:border-primary hover:cyber-glow
              transition-all duration-300 flex items-center justify-center gap-2 cyber-chamfer
            "
          >
            <FiExternalLink size={20} />
          </a>
        )}
      </div>
    </div>
  );

  /* ---------- LAYOUT ---------- */
  return (
    <div
      ref={projectRef}
      className={`
        relative transition-all duration-700
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="grid md:grid-cols-12 gap-12 md:gap-0 items-center">
        {/* IMAGE – trên mobile */}
        <div
          className={`
            md:col-span-7
            ${project.reverse ? "md:order-2" : "md:order-1"}
          `}
        >
          {ImageBlock}
        </div>

        {/* CONTENT – dưới mobile */}
        <div
          className={`
            md:col-span-5 relative z-10 mt-4 md:mt-0
            ${project.reverse ? "md:-mr-6 md:order-1" : "md:-ml-6 md:order-2"}
          `}
        >
          <ContentBlock />
        </div>
      </div>
    </div>
  );
}
