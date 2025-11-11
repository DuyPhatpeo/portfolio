import contactData from "@/data/contact";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent leading-tight">
            Liên Hệ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hãy kết nối và trao đổi về những dự án thú vị
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {contactData.map(({ icon: Icon, label, value, href, color }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group p-6 bg-white rounded-2xl shadow border border-gray-200 hover:shadow-lg transition-all duration-500 hover:scale-105"
            >
              <div className="text-center">
                <Icon
                  className={`w-8 h-8 ${color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {label}
                </h3>
                <p className="text-gray-600 group-hover:text-cyan-500 transition-colors duration-300 break-words">
                  {value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
