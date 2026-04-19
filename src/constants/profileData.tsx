import {
  RiGithubFill,
  RiFacebookFill,
  RiLinkedinBoxFill
} from "react-icons/ri";
import {
  FiHeart,
  FiAward,
  FiTarget,
  FiCoffee,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import { FaGamepad } from "react-icons/fa";
import type { ProfileData } from "../types/data";

export const profileData: ProfileData = {
  name: "DINO PÉO",
  logo: "DINO PÉO",
  resume: "/assets/docs/TranDuyPhat_CV.pdf",
  avatar: "/assets/profile/avatar.png",
  heroImage: "/assets/profile/avatar.png",
  roles: ["Web Developer", "Front-End Developer"],
  heroDescription: "I create visually appealing and highly interactive web experiences, turning ideas into reality with modern technologies.",

  socialLinks: [
    {
      name: "GitHub",
      href: "https://github.com/DuyPhatpeo",
      icon: <RiGithubFill size={20} />,
      glowColor: "rgba(255, 255, 255, 0.5)",
      hoverColor: "group-hover:text-white"
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/DinoPeo2810",
      icon: <RiFacebookFill size={20} />,
      glowColor: "rgba(24, 119, 242, 0.5)",
      hoverColor: "group-hover:text-[#1877F2]"
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/tranduyphat/?skipRedirect=true",
      icon: <RiLinkedinBoxFill size={20} />,
      glowColor: "rgba(10, 102, 194, 0.5)",
      hoverColor: "group-hover:text-[#0A66C2]"
    },
  ],

  personalInfo: [
    {
      icon: FiCalendar,
      labelKey: "about.personal.dobLabel",
      valueKey: "about.personal.dobValue",
      color: "from-pink-500 to-pink-400 text-pink-500",
    },
    {
      icon: FiMapPin,
      labelKey: "about.personal.fromLabel",
      valueKey: "about.personal.fromValue",
      color: "from-emerald-500 to-emerald-400 text-emerald-500",
    },
    {
      icon: FaGamepad,
      labelKey: "about.personal.hobbiesLabel",
      valueKey: "about.personal.hobbiesValue",
      color: "from-indigo-500 to-indigo-400 text-indigo-500",
    },
    {
      icon: FiCoffee,
      labelKey: "about.personal.favoritesLabel",
      valueKey: "about.personal.favoritesValue",
      color: "from-amber-500 to-amber-400 text-amber-500",
    },
  ],

  achievements: [
    {
      icon: FiAward,
      labelKey: "about.achievements.projectsLabel",
      color: "text-yellow-500",
    },
    {
      icon: FiTarget,
      labelKey: "about.achievements.satisfactionLabel",
      color: "text-green-500",
    },
    {
      icon: FiHeart,
      labelKey: "about.achievements.passionLabel",
      color: "text-red-500",
    },
  ],
};
