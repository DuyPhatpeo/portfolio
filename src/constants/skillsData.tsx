import type { Skill } from "../types/data";
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
  ZustandIcon,
} from "../components/ui/SkillIcons";
import { TECH } from "./technologies";

export const skills: Skill[] = [
  // ===== Frontend =====
  {
    name: TECH.HTML,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    category: "frontend",
  },
  {
    name: TECH.CSS,
    icon: CssNewIcon,
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    category: "frontend",
  },
  {
    name: TECH.JS,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    category: "frontend",
  },
  {
    name: TECH.TS,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    url: "https://www.typescriptlang.org/",
    category: "frontend",
  },
  {
    name: TECH.REACT,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    url: "https://react.dev/",
    category: "frontend",
  },
  {
    name: TECH.NEXT_JS,
    icon: NextJsIcon,
    url: "https://nextjs.org/",
    category: "frontend",
  },
  {
    name: TECH.ASTRO,
    icon: AstroIcon,
    url: "https://astro.build/",
    category: "frontend",
  },
  {
    name: TECH.FRAMER_MOTION,
    icon: FramerMotionIcon,
    url: "https://motion.dev/",
    category: "frontend",
  },
  {
    name: TECH.ZUSTAND,
    icon: ZustandIcon,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg",
    url: "https://zustand-demo.pmnd.rs/",
    category: "frontend",
  },
  {
    name: TECH.TAILWIND,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    url: "https://tailwindcss.com/",
    category: "frontend",
  },
  {
    name: TECH.NATIVEWIND,
    icon: NativeWindIcon,
    url: "https://www.nativewind.dev/",
    category: "frontend",
  },
  {
    name: TECH.REACT_NATIVE,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    url: "https://reactnative.dev/",
    category: "frontend",
  },
  {
    name: TECH.EXPO,
    icon: ExpoIcon,
    url: "https://expo.dev/",
    category: "frontend",
  },
  {
    name: TECH.SASS,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
    url: "https://sass-lang.com/",
    category: "frontend",
  },
  {
    name: TECH.BOOTSTRAP,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    url: "https://getbootstrap.com/",
    category: "frontend",
  },

  // ===== Backend =====
  {
    name: TECH.NODE_JS,
    icon: NodeJsIcon,
    url: "https://nodejs.org/",
    category: "backend",
  },
  {
    name: TECH.PHP,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    url: "https://www.php.net/",
    category: "backend",
  },
  {
    name: TECH.LARAVEL,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    url: "https://laravel.com/",
    category: "backend",
  },
  {
    name: TECH.NESTJS,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
    url: "https://nestjs.com/",
    category: "backend",
  },
  {
    name: TECH.DISCORD_JS,
    icon: DiscordJsIcon,
    url: "https://discord.js.org/",
    category: "backend",
  },

  // ===== Database =====
  {
    name: TECH.POSTGRESQL,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    url: "https://www.postgresql.org/",
    category: "database",
  },
  {
    name: TECH.MYSQL,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    url: "https://www.mysql.com/",
    category: "database",
  },
  {
    name: TECH.MONGODB,
    icon: MongoDbIcon,
    url: "https://www.mongodb.com/",
    category: "database",
  },
  {
    name: TECH.FIREBASE,
    icon: FirebaseIcon,
    url: "https://firebase.google.com/",
    category: "database",
  },

  // ===== Tools & DevOps =====
  {
    name: TECH.VSCODE,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
    url: "https://code.visualstudio.com/",
    category: "tools",
  },
  {
    name: TECH.VITE,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    url: "https://vite.dev/",
    category: "tools",
  },
  {
    name: TECH.NPM,
    icon: NpmIcon,
    url: "https://www.npmjs.com/",
    category: "tools",
  },
  {
    name: TECH.GIT,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    url: "https://git-scm.com/",
    category: "tools",
  },
  {
    name: TECH.GITHUB,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    invertDark: true,
    url: "https://github.com/",
    category: "tools",
  },
  {
    name: TECH.VERCEL,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    invertDark: true,
    url: "https://vercel.com/",
    category: "tools",
  },

  // ===== Design =====
  {
    name: TECH.FIGMA,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    url: "https://www.figma.com/",
    category: "design",
  },
];
