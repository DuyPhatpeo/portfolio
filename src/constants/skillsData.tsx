import type { Skill } from "../types/data";
import { FramerMotionIcon, FirebaseIcon } from "../components/ui/SkillIcons";
import { TECH } from "./technologies";

export const skills: Skill[] = [
  // Tools / Editor
  {
    name: TECH.VSCODE,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    url: "https://code.visualstudio.com/",
  },

  // Core Frontend
  {
    name: TECH.HTML,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: TECH.CSS,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: TECH.JS,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: TECH.TS,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    url: "https://www.typescriptlang.org/",
  },

  // Frontend Frameworks & Animation
  {
    name: TECH.REACT,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    url: "https://react.dev/",
  },
  {
    name: TECH.NEXT_JS,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    invertDark: true,
    url: "https://nextjs.org/",
  },
  {
    name: TECH.FRAMER_MOTION,
    icon: FramerMotionIcon,
    url: "https://www.framer.com/motion/",
  },

  // State Management
  {
    name: TECH.ZUSTAND,
    logo: "https://raw.githubusercontent.com/pmndrs/zustand/main/examples/demo/public/logo192.png",
    url: "https://zustand-demo.pmnd.rs/",
  },

  // Styling
  {
    name: TECH.TAILWIND,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    url: "https://tailwindcss.com/",
  },
  {
    name: TECH.SASS,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    url: "https://sass-lang.com/",
  },
  {
    name: TECH.BOOTSTRAP,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    url: "https://getbootstrap.com/",
  },

  // Build tools / Package manager
  {
    name: TECH.VITE,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    url: "https://vitejs.dev/",
  },
  {
    name: TECH.NPM,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    url: "https://www.npmjs.com/",
  },

  // Backend
  {
    name: TECH.NODE_JS,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    url: "https://nodejs.org/",
  },
  {
    name: TECH.LARAVEL,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    url: "https://laravel.com/",
  },
  {
    name: TECH.DISCORD_JS,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discordjs/discordjs-original.svg",
    url: "https://discord.js.org/",
  },

  // Database
  {
    name: TECH.MYSQL,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    url: "https://www.mysql.com/",
  },
  {
    name: TECH.FIREBASE,
    icon: FirebaseIcon,
    url: "https://firebase.google.com/",
  },

  // Version control
  {
    name: TECH.GIT,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    url: "https://git-scm.com/",
  },
  {
    name: TECH.GITHUB,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    invertDark: true,
    url: "https://github.com/",
  },

  // Design
  {
    name: TECH.FIGMA,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    url: "https://www.figma.com/",
  },

  // Deployment
  {
    name: TECH.VERCEL,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    invertDark: true,
    url: "https://vercel.com/",
  },
];
