import { useEffect, useRef, useState } from"react";
import { useTranslation } from"react-i18next";
import { HiArrowLongRight } from"react-icons/hi2";
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

 const enterFrom = reverse ?"translate-x-10":"-translate-x-10";

 return (
 <div
 ref={rowRef}
 onClick={() => onSelect(project)}
 className={`
 group cursor-pointer flex flex-col-reverse ${reverse ?"md:flex-row-reverse":"md:flex-row"}
 items-center gap-6 md:gap-8 transition-all duration-300
 hover:!opacity-100 hover:!blur-none group-hover/list:opacity-50 group-hover/list:blur-[2px]
 ${isVisible ?"opacity-100 translate-x-0 translate-y-0":`opacity-0 translate-y-10 ${enterFrom}`}
`}
 >
 {/* IMAGE */}
 <div className="relative w-full md:w-3/5 aspect-video overflow-hidden rounded-2xl group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-shadow duration-500">
 <img
 src={project.image}
 alt={t(`projects.items.${project.id}.title`)}
 loading="lazy"
 decoding="async"
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-primary text-primary-foreground font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-1">
 {t("projects.badges.featured")}
 </span>

 {/* HUD corner accents */}
 <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
 </div>

  <div className="w-full md:w-2/5 text-left flex flex-row items-baseline gap-4">
  <p className="text-primary/40 font-mono text-4xl md:text-6xl font-black leading-none select-none group-hover:text-primary/70 transition-colors duration-500">
  {String(index + 1).padStart(2,"0")}
  </p>
  <div>
  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
  {t(`projects.items.${project.id}.title`)}
  </h3>
  <div className="flex items-center gap-1.5 text-primary font-mono text-xs uppercase tracking-widest max-h-0 opacity-0 group-hover:max-h-6 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 overflow-hidden">
  <span>{t("projects.modal.view_details")}</span>
  <HiArrowLongRight className="group-hover:translate-x-1 transition-transform duration-300" />
  </div>
  </div>
  </div>
  </div>
  );
}
