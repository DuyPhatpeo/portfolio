import React from "react";
import { FaRocket } from "react-icons/fa";

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <>
      {/* Thanh progress ở đầu trang */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="relative w-full h-3 bg-gray-200">
          {/* Thanh progress với gradient */}
          <div
            className="h-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />

          {/* Tên lửa di chuyển theo progress với nền */}
          <div
            className="absolute top-1/2 transition-all duration-300 ease-out"
            style={{
              left: `${progress}%`,
              transform: `translateX(-50%) translateY(-50%)`,
            }}
          >
            <div className="bg-white rounded-full p-2.5 shadow-lg border border-gray-200">
              <FaRocket
                className="text-2xl text-blue-600"
                style={{ transform: "rotate(45deg)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phần trăm ở góc phải dưới màn hình */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg border border-gray-200 w-[160px]">
          <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent text-center">
            {progress}
            <span className="text-3xl">%</span>
          </div>
          <div className="text-xs text-gray-500 text-center mt-1 font-medium">
            Loading...
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
