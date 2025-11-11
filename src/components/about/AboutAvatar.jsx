export default function AboutAvatar({ avatar }) {
  return (
    <div className="relative flex justify-center group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-300/20 to-blue-300/20 rounded-3xl blur-2xl group-hover:blur-3xl transition duration-500"></div>
      <img
        src={avatar}
        alt="About Me"
        className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
}
