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
  avatar: "/avt2.jpg",

  personal: [
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
