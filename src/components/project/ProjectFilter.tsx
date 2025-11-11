export default function ProjectFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
            selected === cat
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow"
              : "bg-white text-gray-600 hover:bg-gray-100 border-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
