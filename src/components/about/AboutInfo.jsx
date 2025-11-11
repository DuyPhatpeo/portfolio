export default function AboutInfo({ name, bio, personal }) {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">{bio}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {personal.map(({ icon: Icon, label, value }, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg shadow-sm hover:scale-105 hover:bg-white transition-transform duration-300"
          >
            <Icon className="w-5 h-5 text-cyan-500" />
            <div>
              <p className="text-gray-500 text-sm">{label}</p>
              <p className="text-gray-800 font-medium">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
