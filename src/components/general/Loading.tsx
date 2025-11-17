import React from "react";

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <>
      {/* Thanh progress ở đầu trang */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="relative w-full h-3 bg-gray-300">
          <div
            className="h-3 bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* % lớn ở góc phải dưới màn hình */}
      <div className="fixed bottom-4 right-4 z-50 text-5xl font-bold text-white drop-shadow-lg">
        {progress}%
      </div>
    </>
  );
};

export default Loading;
