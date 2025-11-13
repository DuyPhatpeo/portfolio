import {
  Heart,
  Trophy,
  Target,
  Coffee,
  Gamepad2,
  MapPin,
  Calendar,
} from "lucide-react";

export const aboutData = {
  name: "Trần Duy Phát (Dino Péo)",
  bio: "I'm a developer specializing in creating modern and optimized web experiences. I always explore new technologies and enjoy programming challenges.",
  avatar: "/avt2.jpg",
  personal: [
    { icon: Calendar, label: "Date of Birth", value: "28/10/2003" },
    { icon: MapPin, label: "From", value: "Vietnam" },
    { icon: Gamepad2, label: "Hobbies", value: "Gaming, Movies" },
    { icon: Coffee, label: "Favorites", value: "Coffee & Coding" },
  ],
  achievements: [
    { icon: Trophy, label: "5+ Projects", color: "text-yellow-500" },
    { icon: Target, label: "100% Satisfaction", color: "text-green-500" },
    { icon: Heart, label: "Passion", color: "text-red-500" },
  ],
  quote: "Keep creating – Never fear challenges",
};
