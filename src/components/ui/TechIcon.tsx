import { skills } from "@constants/skillsData";
import { TECH_ICONS, TECH_BRAND_COLORS } from "@constants/technologies";

interface TechIconProps {
  name: string;
  className?: string;
  monochrome?: boolean;
}

const ALIASES: Record<string, string> = {
  reactjs: "React",
  react: "React",
  nextjs: "Next.js",
  "next.js": "Next.js",
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  html: "HTML",
  html5: "HTML",
  css: "CSS",
  css3: "CSS",
  tailwind: "Tailwind CSS",
  tailwindcss: "Tailwind CSS",
  laravel: "Laravel",
  php: "PHP",
  mysql: "MySQL",
  "c#": "C#",
  ".net": ".NET",
  "c# .net": ".NET",
  "c# / .net": ".NET",
  node: "Node.js",
  nodejs: "Node.js",
  "node.js": "Node.js",
};

export default function TechIcon({
  name,
  className = "w-4 h-4",
  monochrome = false,
}: TechIconProps) {
  const cleanName = (name || "").trim();
  const canonicalName = ALIASES[cleanName.toLowerCase()] || cleanName;

  const skill = skills.find(
    (s) =>
      s.name.toLowerCase() === canonicalName.toLowerCase() ||
      s.name.toLowerCase() === cleanName.toLowerCase()
  );
  const brandColor = monochrome ? undefined : TECH_BRAND_COLORS[canonicalName];

  const monoClass = monochrome ? "grayscale opacity-75" : "";

  if (skill?.logo) {
    return (
      <img
        src={skill.logo}
        alt={name}
        loading="lazy"
        className={`${className} ${monoClass} object-contain shrink-0 ${
          skill.invertDark ? "dark:invert" : ""
        }`}
      />
    );
  }

  if (skill?.icon) {
    const IconComp = skill.icon;
    return (
      <span
        className={`${className} ${monoClass} inline-flex items-center justify-center shrink-0`}
      >
        <IconComp
          className="w-full h-full object-contain"
          style={brandColor ? { color: brandColor } : undefined}
        />
      </span>
    );
  }

  const FallbackIcon =
    TECH_ICONS[canonicalName] || TECH_ICONS[cleanName];
  if (FallbackIcon) {
    return (
      <FallbackIcon
        className={`${className} ${monoClass} shrink-0`}
        style={brandColor ? { color: brandColor } : undefined}
      />
    );
  }

  return null;
}
