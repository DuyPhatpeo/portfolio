import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "../../lib/gsap";

export interface Skill {
  name: string;
  logo?: string;
  invertDark?: boolean;
  icon?: (props: { className?: string; style?: React.CSSProperties }) => React.ReactNode;
  url?: string;
}

interface SkillNodeProps {
  skill: Skill;
  className?: string;
}

const SkillNode: React.FC<SkillNodeProps> = ({
  skill,
  className = "",
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    gsap.to(nodeRef.current, {
      rotateX,
      rotateY,
      scale: 1.05,
      y: -3,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 600,
      transformStyle: "preserve-3d",
      boxShadow: "0 10px 25px -5px rgba(var(--primary-rgb), 0.25)",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!nodeRef.current) return;
    gsap.to(nodeRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
      boxShadow: "none",
      overwrite: "auto",
    });
  };

  return (
    <motion.div
      ref={nodeRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.4}
      dragTransition={{ bounceStiffness: 450, bounceDamping: 20 }}
      whileDrag={{ scale: 1.12, zIndex: 40, cursor: "grabbing" }}
      className={`
        relative flex items-center gap-4 px-6 py-3.5 select-none cursor-grab active:cursor-grabbing
        bg-muted rounded-2xl backdrop-blur-xl border border-border/40
        hover:border-primary/50 transition-colors duration-300 will-change-transform ${className}
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Icon Area */}
      <div
        className="relative w-8 h-8 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 pointer-events-none"
        style={{ transform: "translateZ(15px)" }}
      >
        {skill.logo ? (
          <img
            src={skill.logo}
            alt={skill.name}
            className={`w-full h-full object-contain opacity-90 ${skill.invertDark ? "dark:invert" : ""}`}
          />
        ) : (
          skill.icon?.({
            className: "w-full h-full text-primary/60",
            style: { color: undefined }
          })
        )}
      </div>

      {/* Text Area */}
      <span
        className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-foreground/90 pointer-events-none"
        style={{ transform: "translateZ(10px)" }}
      >
        {skill.name}
      </span>

      {/* Persistent subtle glow */}
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_10px_rgba(var(--primary-rgb),0.05)] pointer-events-none"></div>
    </motion.div>
  );
};

export default SkillNode;
