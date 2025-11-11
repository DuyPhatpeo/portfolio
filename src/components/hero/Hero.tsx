import { Sparkles, ArrowRight, Send, ChevronDown } from "lucide-react";
import HeroTyping from "./HeroTyping";
import HeroSocialLinks from "./HeroSocialLinks";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-cyan-50"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-center md:text-left mt-12 md:mt-0">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-6">
            <Sparkles className="w-6 h-6 text-cyan-500 animate-pulse" />
            <span className="text-cyan-500 font-medium tracking-wider uppercase">
              Xin chào! Tôi là
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Trần Duy Phát
            </span>
          </h1>

          {/* Typing Effect */}
          <HeroTyping />

          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Tôi tạo ra những trải nghiệm web đẹp mắt và tương tác cao, biến ý
            tưởng thành hiện thực với công nghệ hiện đại.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
            <a
              href="#projects"
              className="group px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/40 flex items-center gap-2 justify-center"
            >
              Xem Dự Án
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-gray-300 rounded-full font-medium transition-all duration-300 hover:bg-gray-100 hover:scale-105 flex items-center gap-2 justify-center text-gray-700"
            >
              <Send className="w-4 h-4" />
              Liên Hệ
            </a>
          </div>

          {/* Social Links */}
          <HeroSocialLinks />
        </div>

        {/* Profile Image */}
        <HeroImage />
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <ChevronDown className="w-8 h-8 text-gray-400 hover:text-cyan-500 transition-colors duration-300" />
      </div>
    </section>
  );
}
