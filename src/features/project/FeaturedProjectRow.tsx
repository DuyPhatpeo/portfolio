import { useEffect, useRef, useState } from"react";
import { useTranslation } from"react-i18next";
import type { Project } from"../../types/data";
interface FeaturedProjectRowProps {
 project: Project;
 index: number;
 onSelect: (project: Project) => void;
}

export default function FeaturedProjectRow({ project, index, onSelect }: FeaturedProjectRowProps) {
 const [isVisible, setIsVisible] = useState(false);
 const rowRef = useRef<HTMLDivElement>(null);
 const { t } = useTranslation();
 const reverse = index % 2 === 1;

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

 if (rowRef.current) observer.observe(rowRef.current);
 return () => observer.disconnect();
 }, []);

 return (
 <div
 ref={rowRef}
 onClick={() => onSelect(project)}
 className={`
 group cursor-pointer flex flex-col-reverse ${reverse ?"md:flex-row-reverse":"md:flex-row"}
 items-center gap-6 md:gap-12 transition-all duration-700
 ${isVisible ?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}
`}
 >
 {/* IMAGE */}
 <div className="relative w-full md:w-3/5 aspect-video overflow-hidden rounded-2xl">
 <img
 src={project.image}
 alt={t(`projects.items.${project.id}.title`)}
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"/>
 <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-primary text-primary-foreground font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-1">
 {t("projects.badges.featured")}
 </span>
 </div>

  <div className="w-full md:w-2/5 text-left flex flex-row items-baseline gap-4">
  <p className="text-primary/40 font-mono text-4xl md:text-6xl font-black leading-none select-none">
  {String(index + 1).padStart(2,"0")}
  </p>
  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
  {t(`projects.items.${project.id}.title`)}
  </h3>
  </div>
  </div>
  );
}
