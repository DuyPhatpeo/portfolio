// src/components/project/FeaturedProject.tsx
import { FiExternalLink, FiGithub } from "react-icons/fi";
import type { Project } from "../../data/projectData";
import { useEffect, useRef, useState } from "react";

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
        className="relative w-full overflow-hidden border border-tech-teal/40 bg-tech-bg/50 shadow-[0_0_15px_rgba(68,187,164,0.1)] transition-all duration-300 md:group-hover:border-tech-teal md:group-hover:shadow-[0_0_20px_rgba(68,187,164,0.3)]"
        style={{
          clipPath:
            "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="
            w-full transition-transform duration-500
            md:group-hover:scale-[1.05]
            filter brightness-90 md:group-hover:brightness-110 md:group-hover:contrast-125
            mix-blend-luminosity md:group-hover:mix-blend-normal
          "
        />
        {/* Holographic Scanline effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tech-teal/10 to-transparent opacity-0 group-hover:opacity-100 animate-scanline pointer-events-none"></div>
      </div>

      {/* HUD Accents */}
      <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-2 border-l-2 border-tech-teal transition-all duration-300 group-hover:w-10 group-hover:h-10 z-10 pointer-events-none"></div>
      <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-2 border-r-2 border-tech-teal transition-all duration-300 group-hover:w-10 group-hover:h-10 z-10 pointer-events-none"></div>
    </div>
  );

  /* ---------- CONTENT ---------- */
  const ContentBlock = () => (
    <div
      className={`max-w-lg mx-auto ${project.reverse ? "text-center md:text-left" : "text-center md:text-right"}`}
    >
      <p className="text-tech-teal font-mono text-xs md:text-sm mb-2 tracking-[0.2em] uppercase flex items-center gap-2 justify-center md:justify-start">
        {project.reverse ? null : (
          <span className="hidden md:inline-block h-[1px] w-8 bg-tech-teal/50"></span>
        )}
        Featured_Log
        {project.reverse ? (
          <span className="hidden md:inline-block h-[1px] w-8 bg-tech-teal/50"></span>
        ) : null}
      </p>

      <h3 className="text-3xl lg:text-4xl font-black mb-4 text-tech-light uppercase tracking-tight drop-shadow-[0_0_8px_rgba(68,187,164,0.4)] hover:text-tech-teal transition-colors">
        {project.title}
      </h3>

      {/* DESCRIPTION - HUD Data Module */}
      <div
        className="bg-tech-bg/80 backdrop-blur-md border border-tech-teal/30 p-5 md:p-6 shadow-[0_0_15px_rgba(68,187,164,0.1)] mb-6 relative z-10"
        style={{
          clipPath:
            "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
        }}
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-tech-teal/50"></div>
        <p className="leading-relaxed text-sm md:text-base text-tech-light/80 font-mono">
          {project.description}
        </p>
      </div>

      {/* TAGS */}
      <div
        className={`flex flex-wrap gap-3 mb-6 font-mono text-xs uppercase tracking-widest text-tech-teal justify-center ${project.reverse ? "md:justify-start" : "md:justify-end"}`}
      >
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-tech-teal/10 px-2 py-1 border border-tech-teal/30"
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
              p-3 bg-tech-bg border border-tech-teal/50
              text-tech-light hover:text-tech-teal hover:border-tech-teal hover:shadow-[0_0_10px_rgba(68,187,164,0.5)]
              transition-all duration-300
            "
            style={{
              clipPath:
                "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
            }}
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
              p-3 bg-tech-bg border border-tech-teal/50
              text-tech-light hover:text-tech-teal hover:border-tech-teal hover:shadow-[0_0_10px_rgba(68,187,164,0.5)]
              transition-all duration-300 flex items-center justify-center gap-2
            "
            style={{
              clipPath:
                "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
            }}
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
      <div className="grid md:grid-cols-12 gap-8 md:gap-0 items-center">
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
            md:col-span-5 relative z-10
            ${project.reverse ? "md:-mr-20 md:order-1" : "md:-ml-20 md:order-2"}
          `}
        >
          <ContentBlock />
        </div>
      </div>
    </div>
  );
}
