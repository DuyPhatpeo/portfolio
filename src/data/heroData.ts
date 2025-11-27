import {
  FiFacebook,
  FiYoutube,
  FiLinkedin,
  FiGithub,
  FiCode,
} from "react-icons/fi";

export const roles = ["Web Developer", "Front-End Developer"];

export const socialLinks = [
  {
    icon: FiFacebook,
    href: "https://www.facebook.com/DinoPeo2810",
    color: "hover:text-blue-600",
  },
  {
    icon: FiYoutube,
    href: "https://www.youtube.com/@dinopeo2810",
    color: "hover:text-red-500",
  },
  {
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/ph%C3%A1t-tr%E1%BA%A7n-2741542b2/",
    color: "hover:text-blue-500",
  },
  {
    icon: FiGithub,
    href: "https://github.com/DuyPhatpeo",
    color: "hover:text-black",
  },
];

// Main info for Hero Section
export const heroInfo = {
  name: "Trần Duy Phát",
  avatar: "/avt2.jpg",
  description:
    "I create visually appealing and highly interactive web experiences, turning ideas into reality with modern technologies.",
  mainIcon: FiCode,
};
