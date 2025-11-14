import React from "react";

interface SectionHeaderProps {
  title: string;
  center?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  center = true,
}) => {
  return (
    <div className={`${center ? "text-center" : ""} mb-16`}>
      <h2 className="text-4xl md:text-5xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
