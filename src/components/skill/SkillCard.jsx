export default function SkillCard({ skill }) {
  return (
    <div className="group p-6 bg-white rounded-2xl shadow border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Render icon từ className */}
          <i className={`${skill.icon} text-3xl`}></i>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors duration-300">
            {skill.name}
          </h3>
        </div>
        <span className="px-3 py-0.5 text-sm rounded-lg bg-cyan-100 text-cyan-600 font-medium">
          {skill.tag}
        </span>
      </div>
    </div>
  );
}
