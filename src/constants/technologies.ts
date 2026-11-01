export const TECH = {
  // Core
  HTML: "HTML",
  CSS: "CSS",
  JS: "JavaScript",
  TS: "TypeScript",

  // Frontend Frameworks & Libraries
  REACT: "React",
  NEXT_JS: "Next.js",
  ASTRO: "Astro",
  REACT_NATIVE: "React Native",
  EXPO: "Expo",
  FRAMER_MOTION: "Framer Motion",
  ZUSTAND: "Zustand",
  AXIOS: "Axios",
  REACT_ROUTER: "React Router",

  // Styling
  TAILWIND: "Tailwind CSS",
  NATIVEWIND: "NativeWind",
  SASS: "Sass",
  BOOTSTRAP: "Bootstrap",

  // Tools & Build
  VITE: "Vite",
  NPM: "npm",
  GIT: "Git",
  GITHUB: "GitHub",
  VSCODE: "VS Code",
  FIGMA: "Figma",
  VERCEL: "Vercel",

  // Backend & DB
  NODE_JS: "Node.js",
  LARAVEL: "Laravel",
  PHP: "PHP",
  NESTJS: "NestJS",
  DISCORD_JS: "Discord.js",
  MYSQL: "MySQL",
  POSTGRESQL: "PostgreSQL",
  MONGODB: "MongoDB",
  FIREBASE: "Firebase",
} as const;

export type TechKey = keyof typeof TECH;
export type TechValue = (typeof TECH)[TechKey];

import React from "react";
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiAxios,
  SiReactrouter,
  SiTailwindcss,
  SiSass,
  SiBootstrap,
  SiVite,
  SiGit,
  SiGithub,
  SiFigma,
  SiVercel,
  SiLaravel,
  SiPhp,
  SiNestjs,
  SiMysql,
  SiPostgresql,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import {
  AstroIcon,
  CssNewIcon,
  DiscordJsIcon,
  ExpoIcon,
  FirebaseIcon,
  FramerMotionIcon,
  MongoDbIcon,
  NativeWindIcon,
  NextJsIcon,
  NodeJsIcon,
  NpmIcon,
} from "../components/ui/SkillIcons";

export const TECH_ICONS: Record<string, React.ElementType> = {
  [TECH.HTML]: SiHtml5,
  [TECH.CSS]: CssNewIcon,
  [TECH.JS]: SiJavascript,
  [TECH.TS]: SiTypescript,
  [TECH.REACT]: SiReact,
  [TECH.NEXT_JS]: NextJsIcon,
  [TECH.ASTRO]: AstroIcon,
  [TECH.REACT_NATIVE]: SiReact,
  [TECH.EXPO]: ExpoIcon,
  [TECH.FRAMER_MOTION]: FramerMotionIcon,
  [TECH.AXIOS]: SiAxios,
  [TECH.REACT_ROUTER]: SiReactrouter,
  [TECH.TAILWIND]: SiTailwindcss,
  [TECH.NATIVEWIND]: NativeWindIcon,
  [TECH.SASS]: SiSass,
  [TECH.BOOTSTRAP]: SiBootstrap,
  [TECH.VITE]: SiVite,
  [TECH.NPM]: NpmIcon,
  [TECH.GIT]: SiGit,
  [TECH.GITHUB]: SiGithub,
  [TECH.VSCODE]: VscVscode,
  [TECH.FIGMA]: SiFigma,
  [TECH.VERCEL]: SiVercel,
  [TECH.NODE_JS]: NodeJsIcon,
  [TECH.LARAVEL]: SiLaravel,
  [TECH.PHP]: SiPhp,
  [TECH.NESTJS]: SiNestjs,
  [TECH.DISCORD_JS]: DiscordJsIcon,
  [TECH.MYSQL]: SiMysql,
  [TECH.POSTGRESQL]: SiPostgresql,
  [TECH.MONGODB]: MongoDbIcon,
  [TECH.FIREBASE]: FirebaseIcon,
};
