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
  const ContentBlock = () => (
    <div className="max-w-lg mx-auto text-center">
      <p className="text-primary font-mono text-sm mb-2">Featured Project</p>

      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 hover:text-primary transition-colors">
        {project.title}
      </h3>

      {/* DESCRIPTION */}
      <div className="bg-white dark:bg-slate-800 p-5 md:p-6 rounded-xl shadow-lg mb-4">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          {project.description}
        </p>
      </div>

      {/* TAGS – CENTER */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {project.tags.map((tag, i) => (
          <span key={i} className="font-mono text-xs text-primary-mild">
            {tag}
          </span>
        ))}
      </div>

      {/* ICONS – CENTER */}
      <div className="flex justify-center gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              p-2 rounded-full
              text-gray-700 dark:text-gray-300
              hover:text-primary hover:bg-primary/10
              transition
            "
          >
            <FiGithub size={22} />
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="
              p-2 rounded-full
              text-gray-700 dark:text-gray-300
              hover:text-primary hover:bg-primary/10
              transition
            "
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
