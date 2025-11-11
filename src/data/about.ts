import {
  User,
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
  bio: "Là một developer, tôi chuyên tạo ra những trải nghiệm web hiện đại và tối ưu. Luôn học hỏi công nghệ mới và thích thú với những thách thức trong lập trình.",
  avatar: "/avt2.jpg",
  personal: [
    { icon: Calendar, label: "Sinh ngày", value: "28/10/2003" },
    { icon: MapPin, label: "Đến từ", value: "Nha Trang" },
    { icon: Gamepad2, label: "Sở thích", value: "Gaming, Phim" },
    { icon: Coffee, label: "Yêu thích", value: "Coffee & Code" },
  ],
  achievements: [
    { icon: Trophy, label: "5+ Dự Án", color: "text-yellow-500" },
    { icon: Target, label: "100% Hài Lòng", color: "text-green-500" },
    { icon: Heart, label: "Đam Mê", color: "text-red-500" },
  ],
  quote: "Không ngừng sáng tạo - Không ngại thử thách",
};
