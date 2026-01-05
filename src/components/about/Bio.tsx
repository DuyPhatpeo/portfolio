import React from "react";
import { aboutData } from "../../data/aboutData";

const Bio: React.FC = () => (
  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
    <div className="w-full text-center md:text-left">
      <h3 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-deep">
        {aboutData.name}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        {aboutData.bio}
      </p>
    </div>
  </div>
);

export default Bio;
