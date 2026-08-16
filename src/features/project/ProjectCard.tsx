import { useEffect, useRef, useState } from"react";
import { useTranslation } from"react-i18next";
import type { Project } from"../../types/data";

interface ProjectCardProps {
 project: Project;
 index: number;
 onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
 const [isVisible, setIsVisible] = useState(false);
 const cardRef = useRef<HTMLDivElement>(null);
 const { t } = useTranslation();

 useEffect(() => {
 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 setIsVisible(true);
 observer.disconnect();
 }
 },
 { threshold: 0.1 },
 );

 if (cardRef.current) observer.observe(cardRef.current);
 return () => observer.disconnect();
 }, []);

 return (
 <div
 ref={cardRef}
 onClick={() => onSelect(project)}
 className={`
 group relative overflow-hidden cursor-pointer bg-card aspect-video
 transition-all duration-500
 ${isVisible ?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}
`}
 style={{ transitionDelay:`${index * 80}ms`}}
 >
 <img
 src={project.image}
 alt={t(`projects.items.${project.id}.title`)}
 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"/>

 <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
 <h3 className="font-sans font-black text-white uppercase tracking-tight leading-tight line-clamp-2 text-lg md:text-2xl">
 {t(`projects.items.${project.id}.title`)}
 </h3>
 </div>
 </div>
 );
}
