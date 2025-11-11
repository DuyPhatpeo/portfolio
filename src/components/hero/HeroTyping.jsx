import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { roles } from "@/data/hero";

export default function HeroTyping() {
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
    <div className="h-16 mb-8">
      <div className="text-xl md:text-2xl font-medium text-gray-700 flex items-center justify-center md:justify-start gap-2">
        <Zap className="w-6 h-6 text-yellow-500" />
        <span className="min-w-0 flex items-center">
          <span className="font-mono">{displayedText}</span>
          <span className="ml-1 animate-pulse text-cyan-500 font-bold">|</span>
        </span>
      </div>
    </div>
  );
}
