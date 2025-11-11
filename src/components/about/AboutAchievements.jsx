export default function AboutAchievements({ achievements }) {
  return (
    <div className="flex flex-wrap gap-4 pt-6">
      {achievements.map(({ icon: Icon, label, color }, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-sm hover:scale-105 hover:bg-white transition-transform duration-300"
        >
          <Icon className={`w-5 h-5 ${color}`} />
          <span className="text-gray-700 font-medium">{label}</span>
        </div>
      ))}
    </div>
  );
}
