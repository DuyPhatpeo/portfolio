import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Send, ChevronDown } from "lucide-react";
import { roles, socialLinks, heroInfo } from "../../data/heroData";

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

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

  const { name, avatar, greeting, description, mainIcon: CodeIcon } = heroInfo;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 pt-25"
    >
      {/* Background effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <div className="text-center md:text-left space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-105 bg-white/5 border-white/10">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-primary font-bold tracking-wide uppercase text-sm">
              {greeting}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-deep to-secondary">
              {name}
            </span>
          </h1>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <CodeIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="font-mono">{displayedText}</span>
              <span className="animate-pulse text-primary font-bold text-3xl">
                |
              </span>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              className="group relative px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center overflow-hidden bg-gradient-to-r from-primary to-primary-deep shadow-lg hover:shadow-primary/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-deep to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Xem Dự Án</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="group px-8 py-4 rounded-2xl font-bold backdrop-blur-sm border transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center text-gray-700 dark:text-gray-200 bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/30"
            >
              <Send className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>Liên Hệ</span>
            </a>
          </div>

          <div className="flex gap-3 justify-center md:justify-start">
            {socialLinks.map(({ icon: Icon, href, color }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-110 bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/30 ${color}`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
                <Icon className="relative z-10 w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side - Avatar */}
        <div className="flex justify-center md:justify-end">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 shadow-2xl transition-transform duration-500 group-hover:scale-105 border-primary/30 shadow-primary/20">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="absolute -top-4 -right-4 p-3 bg-success rounded-full flex items-center justify-center shadow-lg animate-bounce border-4 border-white dark:border-gray-900">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group"
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
            Scroll
          </span>
          <div className="p-2 rounded-full backdrop-blur-sm border bg-white/5 border-white/10 group-hover:border-primary/30 transition-all">
            <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
}
