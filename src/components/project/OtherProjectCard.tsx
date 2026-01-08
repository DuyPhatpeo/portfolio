// src/components/project/OtherProjectCard.tsx
import { FiExternalLink, FiGithub, FiFolder } from "react-icons/fi";
import type { Project } from "../../data/projectData";
import { useEffect, useRef, useState } from "react";

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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-white dark:bg-slate-800 p-7 rounded shadow-md hover:-translate-y-2 transition-all duration-500 flex flex-col h-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-start mb-6">
        <FiFolder size={40} className="text-teal-400" strokeWidth={1.5} />
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              className="transition-colors text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            >
              <FiGithub size={20} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              className="transition-colors text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            >
              <FiExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3 hover:text-teal-400 transition-colors cursor-pointer text-gray-900 dark:text-gray-100">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed mb-auto text-gray-600 dark:text-gray-400">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-4 mt-6 pt-5">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="font-mono text-xs text-gray-600 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
