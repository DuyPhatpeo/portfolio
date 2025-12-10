import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

export const contactData = [
  {
    icon: MdEmail,
    label: "EMAIL",
    value: "phattranduy00@gmail.com",
    href: "mailto:phattranduy00@gmail.com",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: MdPhone,
    label: "PHONE",
    value: "+84 123 456 789",
    href: "tel:+84123456789",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: MdLocationOn,
    label: "LOCATION",
    value: "Nha Trang, Khánh Hoà, Việt Nam",
    href: "#",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: FaGithub,
    label: "GITHUB",
    value: "@DuyPhatpeo",
    href: "https://github.com/DuyPhatpeo",
    color: "from-slate-500 to-gray-500",
  },
] as const;
