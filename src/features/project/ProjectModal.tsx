import { useEffect } from"react";
import { FiGithub, FiMonitor, FiX } from"react-icons/fi";
import { useTranslation } from"react-i18next";
import type { Project } from"../../types/data";
import { TECH_ICONS } from"../../constants/technologies";
import { skills } from"../../constants/skillsData";
import Dock, { type DockItemData } from"../../components/ui/Dock/Dock";

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
 className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm"
 onClick={onClose}
 >
 <div
 className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-card border border-primary/30 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] grid md:grid-cols-2 rounded-2xl"
 onClick={(e) => e.stopPropagation()}
 >
 <button
 onClick={onClose}
 aria-label="Close"
 className="absolute top-4 right-4 z-10 text-foreground/60 hover:text-primary transition-colors bg-black/30 p-2"
 >
 <FiX size={18} />
 </button>

 {/* LEFT: IMAGE */}
 <div className="relative aspect-video md:aspect-auto overflow-hidden rounded-2xl">
 <img
 src={project.image}
 alt={t(`projects.items.${project.id}.title`)}
 className="w-full h-full object-cover"
 />
 </div>

 {/* RIGHT: DETAILS */}
 <div className="p-5 sm:p-8 md:p-12 flex flex-col">
 <h3 className="text-2xl md:text-3xl font-sans font-black text-foreground uppercase tracking-tight mb-4">
 {t(`projects.items.${project.id}.title`)}
 </h3>

 <div className="mb-6">
 <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase block mb-3">
 {t("projects.modal.technologies")}
 </span>
 <Dock items={techItems} baseItemSize={50} magnification={70} />
 </div>

 <p className="text-sm md:text-base text-foreground/80 font-mono leading-relaxed mb-6 text-justify">
 {t(`projects.items.${project.id}.description`)}
 </p>

 <div className="flex gap-8 mt-auto">
 {project.github && (
 <a
 href={project.github}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-mono text-xs md:text-sm tracking-[0.2em] uppercase py-2"
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
 className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-mono text-xs md:text-sm tracking-[0.2em] uppercase py-2"
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
