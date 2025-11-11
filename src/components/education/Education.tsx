import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6">
              <GraduationCap className="w-8 h-8 text-indigo-500" />
              <h2 className="text-2xl font-bold text-gray-800">Học Vấn</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Đại học Nha Trang - Ngành Công Nghệ Thông Tin
            </p>
            <div className="mt-4 text-indigo-500 font-medium">2021 - 2025</div>
          </div>
        </div>
      </section>
    </>
  );
}
