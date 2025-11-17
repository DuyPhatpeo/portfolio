import React, { useState, useEffect } from "react";
import { roles } from "../../data/heroData";

const TypingRoles: React.FC = () => {
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

  return (
    <div className="flex items-center gap-2 md:gap-3 justify-center md:justify-start mt-1 md:mt-2">
      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
        <span className="font-mono">{displayedText}</span>
        <span className="animate-pulse text-primary font-bold text-2xl sm:text-3xl">
          |
        </span>
      </div>
    </div>
  );
};

export default TypingRoles;
