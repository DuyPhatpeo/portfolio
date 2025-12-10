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
    value: "0866 482 834",
    href: "tel:0866482834",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: MdLocationOn,
    label: "LOCATION",
    value: "Nha Trang, Khánh Hoà, Việt Nam",
    href: "https://www.google.com/maps?q=Nha+Trang+Khanh+Hoa+Viet+Nam",
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
