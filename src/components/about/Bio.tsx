import React from "react";
import { aboutData } from "../../data/aboutData";

const Bio: React.FC = () => (
  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-12 mb-12">
    <div
      className="w-full relative bg-tech-bg/40 backdrop-blur-sm border border-tech-teal/20 p-6 md:p-8 shadow-[0_0_15px_rgba(68,187,164,0.05)]"
      style={{
        clipPath:
          "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
      }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-tech-teal"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-tech-teal"></div>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-8 bg-tech-teal"></div>
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-tech-light font-mono">
          PROFILE: <span className="text-tech-teal">{aboutData.name}</span>
        </h3>
      </div>

      <p className="text-tech-light/80 font-mono text-sm md:text-base leading-relaxed pl-4 border-l-2 border-tech-teal/30">
        {aboutData.bio}
      </p>
    </div>
  </div>
);

export default Bio;
