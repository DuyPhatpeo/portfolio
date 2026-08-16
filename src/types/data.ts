import React from "react";

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  glowColor: string;
  hoverColor: string;
}

export interface Achievement {
  icon: any;
  labelKey: string;
  color: string;
}

export interface PersonalInfoItem {
  icon: any;
  labelKey: string;
  valueKey: string;
  color: string;
}

export interface ProfileData {
  name: string;
  logo: string;
  resume: string;
  avatar: string;
  heroImage: string;
  roles: string[];
  heroDescription: string;
  socialLinks: SocialLink[];
  personalInfo: PersonalInfoItem[];
  achievements: Achievement[];
}

export interface Project {
  id: number;
  image: string;
  tags: string[];
  github: string;
  demo: string | null;
  featured: boolean;
  reverse?: boolean;
}

export type SkillCategory = "frontend" | "backend" | "database" | "tools" | "design";

export interface Skill {
  name: string;
  logo?: string;
  icon?: (props: { className?: string; style?: React.CSSProperties }) => React.ReactNode;
  invertDark?: boolean;
  url: string;
  category: SkillCategory;
}
