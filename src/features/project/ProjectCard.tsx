import { useEffect, useRef, useState } from"react";
import { useTranslation } from"react-i18next";
import { HiArrowLongRight } from"react-icons/hi2";
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

 const enterFrom = ["translate-y-10", "-translate-x-10", "-translate-y-10", "translate-x-10"][index % 4];

 return (
 <div
 ref={cardRef}
 onClick={() => onSelect(project)}
 className={`
 group relative overflow-hidden cursor-pointer bg-card aspect-video
 border border-transparent hover:border-primary/50
 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
 hover:!opacity-100 hover:!blur-none group-hover/list:opacity-50 group-hover/list:blur-[2px]
 ${isVisible ?"opacity-100 translate-x-0 translate-y-0":`opacity-0 ${enterFrom}`}
`}
 style={{ transitionDelay:`${index * 80}ms`}}
 >
 <img
 src={project.image}
 alt={t(`projects.items.${project.id}.title`)}
 className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"/>

 {/* HUD corner accents */}
 <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
 <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>

 <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
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
