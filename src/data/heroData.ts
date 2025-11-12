import { Facebook, Youtube, Linkedin, Github, Code2 } from "lucide-react";

export const roles = ["Lập Trình Website", "Thiết Kế UI"];

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

// Thông tin chính của Hero Section
export const heroInfo = {
  name: "Trần Duy Phát",
  avatar: "/avt2.jpg",
  greeting: "Xin chào! Tôi là",
  description:
    "Tôi tạo ra những trải nghiệm web đẹp mắt và tương tác cao, biến ý tưởng thành hiện thực với công nghệ hiện đại.",
  mainIcon: Code2,
};
