import { 
  RiGithubFill, 
  RiFacebookFill, 
  RiLinkedinBoxFill 
} from "react-icons/ri";

export const SOCIAL_LINKS = [
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
];

export const PROFILE_ASSETS = {
  name: "DINO PÉO",
  logo: "DINO PÉO",
  resume: "/Tran_Duy_Phat_CV_Software_Engineer.pdf",
  avatar: "/avt2.jpg", // From aboutData
  heroImage: "/hero.jpg", // From heroData
};
