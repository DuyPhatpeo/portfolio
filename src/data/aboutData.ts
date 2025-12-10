import {
  FiHeart,
  FiAward,
  FiTarget,
  FiCoffee,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import { FaGamepad } from "react-icons/fa";

export const aboutData = {
  name: "Trần Duy Phát (Dino Péo)",
  bio: "I'm a developer specializing in creating modern and optimized web experiences.",
  avatar: "/avt2.jpg",

  personal: [
    {
      icon: FiCalendar,
      label: "Date of Birth",
      value: "28/10/2003",
      color: "from-pink-500 to-pink-400 text-pink-500",
    },
    {
      icon: FiMapPin,
      label: "From",
      value: "Vietnam",
      color: "from-emerald-500 to-emerald-400 text-emerald-500",
    },
    {
      icon: FaGamepad,
      label: "Hobbies",
      value: "Gaming, Movies",
      color: "from-indigo-500 to-indigo-400 text-indigo-500",
    },
    {
      icon: FiCoffee,
      label: "Favorites",
      value: "Coffee & Coding",
      color: "from-amber-500 to-amber-400 text-amber-500",
    },
  ],

  achievements: [
    { icon: FiAward, label: "5+ Projects", color: "text-yellow-500" },
    { icon: FiTarget, label: "100% Satisfaction", color: "text-green-500" },
    { icon: FiHeart, label: "Passion", color: "text-red-500" },
  ],

  quote: "Keep creating – Never fear challenges",
};
