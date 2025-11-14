import React from "react";
import { aboutData } from "../../data/aboutData";

const Quote: React.FC = () => (
  <div className="mt-12 text-center">
    <p className="text-xl md:text-2xl italic font-medium text-gray-700 dark:text-gray-300">
      {aboutData.quote}
    </p>
  </div>
);

export default Quote;
