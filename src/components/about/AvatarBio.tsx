import React from "react";
import { aboutData } from "../../data/aboutData";

const AvatarBio: React.FC = () => (
  <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
    <img
      src={aboutData.avatar}
      alt={aboutData.name}
      className="w-48 h-48 rounded-full object-cover ring-4 ring-primary/30 shadow-2xl"
    />
    <div className="text-center md:text-left flex-1">
      <h3 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text leading-snug text-transparent bg-gradient-to-r from-primary to-primary-deep">
        {aboutData.name}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-lg">
        {aboutData.bio}
      </p>
    </div>
  </div>
);

export default AvatarBio;
