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

    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    return () => {
      if (projectRef.current) {
        observer.unobserve(projectRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={projectRef}
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="grid md:grid-cols-12 gap-0 items-center">
        {!project.reverse ? (
          <>
            {/* Image Left */}
            <div className="md:col-span-7 relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-teal-400 mix-blend-multiply opacity-30 group-hover:opacity-0 transition-opacity duration-300 rounded"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded shadow-2xl w-full"
                />
              </div>
            </div>

            {/* Content Right */}
            <div className="md:col-span-5 md:-ml-20 mt-8 md:mt-0 relative z-10">
              <div className="md:text-right">
                <p className="text-teal-400 font-mono text-sm mb-2">
                  Featured Project
                </p>
                <h3 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100">
                  {project.title}
                </h3>

                <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-lg mb-5">
                  <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mb-5 md:justify-end">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs text-gray-600 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 md:justify-end">
                  {project.github && (
                    <a
                      href={project.github}
                      className="transition-colors text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400"
                    >
                      <FiGithub size={22} />
                    </a>
                  )}
                  <a
                    href={project.demo}
                    className="transition-colors text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400"
                  >
                    <FiExternalLink size={22} />
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Content Left */}
            <div className="md:col-span-5 md:-mr-20 mt-8 md:mt-0 relative z-10 md:order-1">
              <div className="md:text-left">
                <p className="text-teal-400 font-mono text-sm mb-2">
                  Featured Project
                </p>
                <h3 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100">
                  {project.title}
                </h3>

                <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-lg mb-5">
                  <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mb-5 md:justify-start">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs text-gray-600 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 md:justify-start">
                  {project.github && (
                    <a
                      href={project.github}
                      className="transition-colors text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400"
                    >
                      <FiGithub size={22} />
                    </a>
                  )}
                  <a
                    href={project.demo}
                    className="transition-colors text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400"
                  >
                    <FiExternalLink size={22} />
                  </a>
                </div>
              </div>
            </div>

            {/* Image Right */}
            <div className="md:col-span-7 relative md:order-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-teal-400 mix-blend-multiply opacity-30 group-hover:opacity-0 transition-opacity duration-300 rounded"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded shadow-2xl w-full"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
