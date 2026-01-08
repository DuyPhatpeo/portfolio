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
      className={`bg-white dark:bg-slate-800 p-7 rounded-xl shadow-md flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-start mb-6">
        <FiFolder size={40} strokeWidth={1.5} className="text-primary" />

        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              <FiGithub size={20} />
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              <FiExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* ---------- TITLE ---------- */}
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 hover:text-primary transition-colors">
        {project.title}
      </h3>

      {/* ---------- DESCRIPTION ---------- */}
      <p className="text-sm leading-relaxed mb-auto text-gray-600 dark:text-gray-400">
        {project.description}
      </p>

      {/* ---------- TAGS ---------- */}
      <div className="flex flex-wrap gap-4 mt-6 pt-5">
        {project.tags.map((tag, i) => (
          <span key={i} className="font-mono text-xs text-primary-mild">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
