import React from "react";

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <>
      {/* Progress bar trên cùng */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div
          className="
            h-2
            transition-all duration-300 ease-out
            bg-gradient-to-r
            from-primary/60
            via-primary
            to-primary/90
            shadow-[0_0_12px_theme(colors.primary/40)]
          "
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* % góc phải dưới */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <div
          className="
            text-5xl font-bold leading-none
            bg-gradient-to-r
            from-primary
            to-primary/80
            bg-clip-text text-transparent
          "
        >
          {progress}
          <span className="ml-1 text-3xl">%</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
