import { skills } from "@constants/skillsData";
import { TECH_ICONS, TECH_BRAND_COLORS } from "@constants/technologies";

interface TechIconProps {
  name: string;
  className?: string;
}

export default function TechIcon({ name, className = "w-4 h-4" }: TechIconProps) {
  const skill = skills.find((s) => s.name === name);
  const brandColor = TECH_BRAND_COLORS[name];

  if (skill?.logo) {
    return (
      <img
        src={skill.logo}
        alt={name}
        loading="lazy"
        className={`${className} object-contain shrink-0 ${
          skill.invertDark ? "dark:invert" : ""
        }`}
      />
    );
  }

  if (skill?.icon) {
    const IconComp = skill.icon;
    return (
      <span className={`${className} inline-flex items-center justify-center shrink-0`}>
        <IconComp
          className="w-full h-full object-contain"
          style={brandColor ? { color: brandColor } : undefined}
        />
      </span>
    );
  }

  const FallbackIcon = TECH_ICONS[name];
  if (FallbackIcon) {
    return (
      <FallbackIcon
        className={`${className} shrink-0`}
        style={brandColor ? { color: brandColor } : undefined}
      />
    );
  }

  return null;
}
