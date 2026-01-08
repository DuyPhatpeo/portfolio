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
      { threshold: 0.15 }
    );

    if (projectRef.current) observer.observe(projectRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------- IMAGE ---------- */
  const ImageBlock = (
    <div className="relative group">
      <img
        src={project.image}
        alt={project.title}
        className="
          w-full rounded-xl shadow-2xl
          transition-transform duration-300
          md:group-hover:scale-[1.02]
          md:group-hover:ring-2 md:group-hover:ring-primary/40
        "
      />
    </div>
  );

  /* ---------- CONTENT ---------- */
  const ContentBlock = (align: "left" | "right") => (
    <div
      className={`
        text-center
        md:${align === "right" ? "text-right" : "text-left"}
      `}
    >
      <p className="text-primary font-mono text-sm mb-2">Featured Project</p>

      <h3 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100 hover:text-primary transition-colors">
        {project.title}
      </h3>

      <div className="bg-white dark:bg-slate-800 p-5 md:p-6 rounded-xl shadow-lg mb-5">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          {project.description}
        </p>
      </div>

      <div
        className={`
          flex flex-wrap gap-3 mb-5 justify-center
          md:${align === "right" ? "justify-end" : "justify-start"}
        `}
      >
        {project.tags.map((tag, i) => (
          <span key={i} className="font-mono text-xs text-primary-mild">
            {tag}
          </span>
        ))}
      </div>

      <div
        className={`
          flex gap-4 justify-center
          md:${align === "right" ? "justify-end" : "justify-start"}
        `}
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
          >
            <FiGithub size={22} />
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
          >
            <FiExternalLink size={22} />
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
        {/* IMAGE – luôn ở trên mobile */}
        <div
          className={`
            md:col-span-7
            ${project.reverse ? "md:order-2" : "md:order-1"}
          `}
        >
          {ImageBlock}
        </div>

        {/* CONTENT – luôn ở dưới mobile */}
        <div
          className={`
            md:col-span-5 relative z-10
            ${project.reverse ? "md:-mr-20 md:order-1" : "md:-ml-20 md:order-2"}
          `}
        >
          {ContentBlock(project.reverse ? "left" : "right")}
        </div>
      </div>
    </div>
  );
}
