import { User } from "lucide-react";
import { aboutData } from "@/data/about";
import AboutAvatar from "./AboutAvatar";
import AboutInfo from "./AboutInfo";
import AboutAchievements from "./AboutAchievements";
import AboutQuote from "./AboutQuote";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center bg-gradient-to-b from-white to-gray-50 py-20 relative overflow-hidden"
    >
      {/* Shapes nền */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-48 h-48 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-ping top-1/3 left-1/4"></div>
        <div className="absolute w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse bottom-0 right-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent animate-fade-in leading-tight">
            Giới Thiệu
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Khám phá câu chuyện và hành trình phát triển của tôi
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AboutAvatar avatar={aboutData.avatar} />

          <div>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-8 h-8 text-cyan-500" />
              <h3 className="text-2xl font-bold text-gray-800">
                {aboutData.name}
              </h3>
            </div>

            <AboutInfo
              name={aboutData.name}
              bio={aboutData.bio}
              personal={aboutData.personal}
            />

            <AboutAchievements achievements={aboutData.achievements} />

            <AboutQuote quote={aboutData.quote} />
          </div>
        </div>
      </div>
    </section>
  );
}
