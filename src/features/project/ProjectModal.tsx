import { useEffect } from"react";
import { FiGithub, FiMonitor, FiX } from"react-icons/fi";
import { useTranslation } from"react-i18next";
import type { Project } from"@/types/data";
import { TECH_ICONS } from"@constants/technologies";
import { skills } from"@constants/skillsData";
import Dock, { type DockItemData } from"@components/ui/Dock/Dock";

interface ProjectModalProps {
 project: Project;
 onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
 const { t } = useTranslation();

 const techItems: DockItemData[] = project.tags.map((tag) => {
 const skill = skills.find((s) => s.name === tag);
 if (skill) {
 return {
 label: tag,
 icon: skill.logo ? (
 <img
 src={skill.logo}
 alt={tag}
 className={`w-full h-full p-2.5 object-contain ${skill.invertDark ? "dark:invert" : ""}`}
 />
 ) : (
 skill.icon?.({ className:"w-full h-full p-2.5 text-primary"})
 ),
 };
 }
 const Icon = TECH_ICONS[tag];
 return {
 label: tag,
 icon: Icon ? <Icon className="w-full h-full p-2.5 text-primary"/> : <span className="text-xs">{tag[0]}</span>,
 };
 });

 useEffect(() => {
 const onKeyDown = (e: KeyboardEvent) => {
 if (e.key ==="Escape") onClose();
 };
 document.addEventListener("keydown", onKeyDown);
 document.body.style.overflow ="hidden";
 return () => {
 document.removeEventListener("keydown", onKeyDown);
 document.body.style.overflow ="";
 };
 }, [onClose]);

  return (
  <div
  className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm"
  onPointerDown={(e) => {
  if (e.target === e.currentTarget) {
  onClose();
  }
  }}
  >
   <div
   className="relative w-full max-w-4xl lg:max-w-5xl max-h-[92vh] bg-card border border-primary/30 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] flex flex-col rounded-2xl overflow-hidden"
   onClick={(e) => e.stopPropagation()}
   >
   {/* FIXED HEADER */}
   <div className="flex items-center justify-between p-3.5 sm:p-4 md:px-8 md:py-6 border-b border-white/10 bg-card/95 backdrop-blur-md z-20 shrink-0">
   <h3 className="text-lg sm:text-xl md:text-2xl font-sans font-black text-foreground uppercase tracking-tight truncate pr-4">
   {t(`projects.items.${project.id}.title`)}
   </h3>
   <button
   type="button"
   onClick={(e) => {
   e.stopPropagation();
   onClose();
   }}
   aria-label="Close"
   className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-foreground/70 hover:text-foreground transition-all shrink-0 cursor-pointer"
   >
   <FiX className="w-5 h-5 pointer-events-none" />
   </button>
   </div>

   {/* SCROLLABLE BODY */}
   <div className="w-full flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8 md:gap-10">
   
   {/* 1. TECHNOLOGIES */}
   <div className="flex flex-col items-center">
   <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase block mb-3 sm:mb-4 text-center">
   {t("projects.modal.technologies")}
   </span>
   <div className="max-w-full overflow-x-auto py-1">
   <Dock items={techItems} baseItemSize={42} magnification={62} />
   </div>
   </div>

   {/* 2. IMAGE */}
   <div className="relative w-full bg-black/40 border border-white/5 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2 sm:p-4">
     <img
       src={project.image}
       alt={t(`projects.items.${project.id}.title`)}
       className="w-full h-auto max-h-[45vh] sm:max-h-[55vh] md:max-h-[60vh] object-contain rounded-lg shadow-md"
     />
   </div>

   {/* 3. DESCRIPTION */}
   <div>
   <p className="text-xs sm:text-sm md:text-base text-foreground/80 font-mono leading-relaxed text-left sm:text-justify">
   {t(`projects.items.${project.id}.description`)}
   </p>
   </div>

   {/* 4. LINKS */}
   <div className="flex flex-wrap gap-4 sm:gap-8 pt-4 sm:pt-6 border-t border-white/10 mt-auto">
   {project.github && (
   <a
   href={project.github}
   target="_blank"
   rel="noopener noreferrer"
   className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-mono text-xs md:text-sm tracking-[0.2em] uppercase py-1.5 sm:py-2"
   >
   <FiGithub className="text-primary"/>
   <span>{t("common.links.source")}</span>
   </a>
   )}
   {project.demo && (
   <a
   href={project.demo}
   target="_blank"
   rel="noopener noreferrer"
   className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-mono text-xs md:text-sm tracking-[0.2em] uppercase py-1.5 sm:py-2"
   >
   <FiMonitor className="text-primary"/>
   <span>{t("common.links.live")}</span>
   </a>
   )}
   </div>

   </div>
   </div>
  </div>
 );
}
