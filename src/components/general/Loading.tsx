import React from "react";

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <>
      {/* Thanh progress ở đầu trang */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="relative w-full h-3 bg-gray-200">
          {/* Thanh progress */}
          <div
            className="h-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Chỉ hiển thị phần trăm, không nền */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent text-center">
          {progress}
          <span className="text-3xl">%</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
