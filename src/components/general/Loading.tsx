import React from "react";

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <>
      {/* Thanh progress ở đầu trang với tên lửa */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="relative w-full h-3 bg-gray-300">
          <div
            className="h-3 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />

          {/* Tên lửa di chuyển theo progress */}
          <div
            className="absolute top-1/2 transition-all duration-300 ease-out"
            style={{
              left: `${progress}%`,
              transform: `translateX(-50%) translateY(-50%) rotate(45deg)`,
            }}
          >
            <span className="text-3xl drop-shadow-lg">🚀</span>
          </div>
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
