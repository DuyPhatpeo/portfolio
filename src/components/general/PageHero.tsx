import React from "react";

interface PageHeroProps {
  title1: string;
  title2?: string;
  subtitle?: string;
  indexLabel?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title1, title2, subtitle }) => {
  const fullTitle = `${title1} ${title2 || ""}`.trim();

  return (
    <div className="relative w-full pt-24 pb-6 md:pt-32 md:pb-8 bg-transparent">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="border-b border-border pb-6 md:pb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-foreground leading-[1.05]">
            {fullTitle}
          </h1>

          {subtitle && (
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground leading-relaxed lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
