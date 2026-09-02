import React, { useEffect, useState } from "react";

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = (window.scrollY / totalHeight) * 100;
            setProgress(Math.min(100, Math.max(0, currentProgress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[120] h-[2.5px] bg-foreground/5 pointer-events-none">
      {/* Neon Progress Bar with glowing tip */}
      <div
        className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary transition-transform duration-75 ease-out relative"
        style={{
          width: `${progress}%`,
        }}
      >
        {/* Glowing Head Point */}
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary),0_0_16px_var(--primary)] opacity-90" />
      </div>
    </div>
  );
};

export default ScrollProgressBar;
