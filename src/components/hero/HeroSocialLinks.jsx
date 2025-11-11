import { socialLinks } from "@/data/hero";

export default function HeroSocialLinks() {
  return (
    <div className="flex gap-4 justify-center md:justify-start">
      {socialLinks.map(({ icon: Icon, href, color }, i) => (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-full bg-white shadow border border-gray-200 transition-all duration-300 hover:scale-110 text-black ${color}`}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
}
