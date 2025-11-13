import { Facebook, Youtube, Linkedin, Github, Code2 } from "lucide-react";

export const roles = ["Web Developer", "Front End", "UI Designer"];

export const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/DinoPeo2810",
    color: "hover:text-blue-600",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@dinopeo2810",
    color: "hover:text-red-500",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ph%C3%A1t-tr%E1%BA%A7n-2741542b2/",
    color: "hover:text-blue-500",
  },
  {
    icon: Github,
    href: "https://github.com/DuyPhatpeo",
    color: "hover:text-black",
  },
];

// Main info for Hero Section
export const heroInfo = {
  name: "Tran Duy Phat",
  avatar: "/avt2.jpg",
  greeting: "Hello! I am",
  description:
    "I create visually appealing and highly interactive web experiences, turning ideas into reality with modern technologies.",
  mainIcon: Code2,
};
