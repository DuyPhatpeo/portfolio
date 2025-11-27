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
  bio: "I'm a developer specializing in creating modern and optimized web experiences. I always explore new technologies and enjoy programming challenges.",
  avatar: "/avt2.jpg",

  personal: [
    { icon: FiCalendar, label: "Date of Birth", value: "28/10/2003" },
    { icon: FiMapPin, label: "From", value: "Vietnam" },
    { icon: FaGamepad, label: "Hobbies", value: "Gaming, Movies" },
    { icon: FiCoffee, label: "Favorites", value: "Coffee & Coding" },
  ],

  achievements: [
    { icon: FiAward, label: "5+ Projects", color: "text-yellow-500" },
    { icon: FiTarget, label: "100% Satisfaction", color: "text-green-500" },
    { icon: FiHeart, label: "Passion", color: "text-red-500" },
  ],

  quote: "Keep creating – Never fear challenges",
};
