import { profileData } from "../../constants/profileData";

const HeroAvatar: React.FC = () => {
  const { heroImage, name } = profileData;

  return (
    <div className="flex justify-center md:justify-start mt-20 md:mt-0">
      <div className="relative w-80 sm:w-96 md:w-[450px] lg:w-[550px] h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] group">
        {/* Glow behind image */}
        <div className="absolute inset-4 bg-primary opacity-20 blur-2xl animate-pulse"></div>
        {/* Geometric container */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden border-2 border-primary cyber-glow bg-card/50 backdrop-blur-sm cyber-chamfer"
        >
          <img
            src={heroImage}
            alt={name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            style={{
              objectPosition: "center 20%",
            }}
          />
          {/* Holographic overlay scanlines */}
          <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,255,136,0.05)_2px,rgba(0,255,136,0.05)_4px)] opacity-30"></div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-secondary"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-secondary"></div>
      </div>
    </div>
  );
};

export default HeroAvatar;
