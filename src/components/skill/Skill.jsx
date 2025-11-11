import { skills } from "@/data/skills";
import SkillCard from "./SkillCard";

export default function Skill() {
  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent leading-tight">
            Kỹ Năng Chuyên Môn
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những công nghệ và kỹ năng tôi thành thạo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <SkillCard key={i} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
