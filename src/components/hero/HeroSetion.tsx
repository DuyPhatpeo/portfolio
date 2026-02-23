import { heroInfo } from "../../data/heroData";
import HeroAvatar from "./HeroAvatar";
import TypingRoles from "./TypingRoles";
import HeroButtons from "./HeroButtons";
import SocialLinks from "./SocialLinks";
import ScrollIndicator from "./ScrollIndicator";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { name, description } = heroInfo;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center md:pt-24 scroll-mt-20 md:scroll-mt-24 px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative">
          {/* Main Terminal Window (Right Content) */}
          <div
            className="lg:col-span-7 flex flex-col justify-center space-y-4 md:space-y-6 bg-tech-bg/60 backdrop-blur-md border border-tech-teal/30 p-8 shadow-[0_0_20px_rgba(68,187,164,0.1)] relative"
            style={{
              clipPath:
                "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
            }}
          >
            {/* HUD Corner Decor */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-tech-teal opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-tech-teal opacity-50"></div>

            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-tech-teal"></div>
              <div className="text-tech-light font-bold text-sm md:text-md uppercase tracking-[0.3em] font-mono">
                System Initialized
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-tech-light drop-shadow-[0_0_15px_rgba(68,187,164,0.6)]">
              {name}
            </h1>

            <div className="pl-4 border-l-2 border-tech-teal/50">
              <TypingRoles />
            </div>

            <p
              className="text-sm md:text-base text-tech-teal font-mono max-w-xl leading-relaxed mt-3 opacity-90 uppercase tracking-widest bg-tech-teal/5 p-4 border border-tech-teal/20"
              style={{
                clipPath:
                  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
              }}
            >
              {description}
            </p>

            <HeroButtons scrollToSection={scrollToSection} />
            <SocialLinks />
          </div>

          {/* Avatar Panel (Left Content, but moved to right col for visual weight balance if desired, originally left side. We'll put it right side on desktop for standard HUD look or keep it left based on original code structure) */}
          {/* Originally: left was avatar. Now: col-span-5 right side */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative order-first lg:order-last mb-8 lg:mb-0">
            {/* Decorative Data Nodes */}
            <div className="hidden lg:flex flex-col gap-2 absolute left-0 top-1/4 -translate-x-full pr-8">
              <div className="h-1 w-8 bg-tech-teal/40"></div>
              <div className="h-1 w-12 bg-tech-teal/60"></div>
              <div className="h-1 w-6 bg-tech-teal/80"></div>
            </div>

            <HeroAvatar />
          </div>
        </div>
      </div>

      <ScrollIndicator scrollToSection={scrollToSection} />
    </section>
  );
}
