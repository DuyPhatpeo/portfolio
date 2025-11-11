export default function HeroImage() {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
          <img
            src="/avt2.jpg"
            alt="Trần Duy Phát"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce shadow-md">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
