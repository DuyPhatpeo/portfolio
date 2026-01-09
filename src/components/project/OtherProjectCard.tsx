// src/components/project/OtherProjectCard.tsx
import { FiExternalLink, FiGithub, FiFolder } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../../data/projectData";

interface OtherProjectCardProps {
  project: Project;
  index: number;
}

export default function OtherProjectCard({
  project,
  index,
}: OtherProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={cardRef}
      className={`
        group
        bg-white dark:bg-slate-800
        p-7 rounded-xl
        border border-transparent
        shadow-md
        flex flex-col h-full
        transition-all duration-300
        hover:border-primary/50 hover:shadow-lg
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <FiFolder
          size={40}
          strokeWidth={1.5}
          className="text-primary transition-colors"
        />

        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-1 rounded-md
                text-gray-600 dark:text-gray-400
                transition-all duration-200
                group-hover:text-primary
                hover:scale-110
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
                p-1 rounded-md
                text-gray-600 dark:text-gray-400
                transition-all duration-200
                group-hover:text-primary
                hover:scale-110
              "
            >
              <FiExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
        {project.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {project.description}
      </p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-4 mt-auto pt-6">
        {project.tags.map((tag, i) => (
          <span key={i} className="font-mono text-xs text-primary-mild">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
