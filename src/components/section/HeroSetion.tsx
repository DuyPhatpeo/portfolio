import { useEffect, useState } from "react";
import { ArrowRight, Send, ChevronDown } from "lucide-react";
import { roles, socialLinks, heroInfo } from "../../data/heroData";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  const { name, avatar, description, mainIcon: CodeIcon } = heroInfo;

  // Typing effect
  useEffect(() => {
    const currentText = roles[currentRole];
    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
        setTypeSpeed(75);
      } else {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        setTypeSpeed(150);
      }

      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRole, typeSpeed]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl w-full">
        {/* Right Side - Avatar trên mobile */}
        <div className="flex justify-center md:justify-end mt-8 md:mt-0 order-1 md:order-2">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20 hover:scale-105 transition-transform duration-500">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 hover:opacity-60 transition-opacity duration-500" />
          </div>
        </div>

        {/* Left Side - Text */}
        <div className="text-center md:text-left space-y-6 md:space-y-8 order-2 md:order-1">
          <div className="text-primary font-bold text-lg md:text-xl">I am</div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-deep to-secondary">
            {name}
          </h1>

          <div className="flex items-center gap-3 justify-center md:justify-start mt-2">
            <div className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="font-mono">{displayedText}</span>
              <span className="animate-pulse text-primary font-bold text-3xl">
                |
              </span>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed mt-4">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
            <button
              onClick={() => scrollToSection("projects")}
              className="group relative px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center overflow-hidden bg-gradient-to-r from-primary to-primary-deep shadow-lg hover:shadow-primary/50"
            >
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="group px-8 py-4 rounded-2xl font-bold backdrop-blur-sm border transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center text-gray-700 dark:text-gray-200 bg-white/10 border-gray-200/20 dark:bg-gray-800/30 dark:border-white/10 hover:bg-white/20 dark:hover:bg-gray-700/30 hover:border-primary/30"
            >
              <Send className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>Contact</span>
            </button>
          </div>

          {/* Socials */}
          <div className="flex gap-3 justify-center md:justify-start mt-4">
            {socialLinks.map(({ icon: Icon, href, color }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-110 bg-white/10 border-gray-200/20 dark:bg-gray-800/30 dark:border-white/10 hover:bg-white/20 dark:hover:bg-gray-700/30 hover:border-primary/30 ${color}`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
                <Icon className="relative z-10 w-5 h-5 transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group"
        onClick={() => scrollToSection("about")}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
            Scroll
          </span>
          <div className="p-2 rounded-full backdrop-blur-sm border bg-white/10 border-gray-200/20 dark:bg-gray-800/30 dark:border-white/10 group-hover:border-primary/30">
            <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
}
