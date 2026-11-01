import {
  RiGithubFill,
  RiFacebookFill,
  RiLinkedinBoxFill,
  RiDiscordFill,
} from "react-icons/ri";
import type { ProfileData } from "../types/data";

export const profileData: ProfileData = {
  name: "Dino Péo",
  logo: "DINO PÉO",
  resume: "/assets/docs/TranDuyPhat_CV.pdf",
  avatar: "/assets/profile/avatar_3d.webp",
  heroImage: "/assets/profile/hero.webp",
  roles: [
    "Front-End Developer",
    "Web Developer",
    "Full-Stack Developer",
    "Software Engineer",
  ],
  heroDescription: "",

  socialLinks: [
    {
      name: "GitHub",
      href: "https://github.com/DuyPhatpeo",
      icon: <RiGithubFill size={20} />,
      glowColor: "rgba(255, 255, 255, 0.5)",
      hoverColor: "group-hover:text-white",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/DinoPeo2810",
      icon: <RiFacebookFill size={20} />,
      glowColor: "rgba(24, 119, 242, 0.5)",
      hoverColor: "group-hover:text-[#1877F2]",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/tranduyphat/?skipRedirect=true",
      icon: <RiLinkedinBoxFill size={20} />,
      glowColor: "rgba(10, 102, 194, 0.5)",
      hoverColor: "group-hover:text-[#0A66C2]",
    },
    {
      name: "Discord",
      href: "https://discord.gg/p3d7859xFF",
      icon: <RiDiscordFill size={20} />,
      glowColor: "rgba(88, 101, 242, 0.5)",
      hoverColor: "group-hover:text-[#5865F2]",
    },
  ],
};
