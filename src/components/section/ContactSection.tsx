import React from "react";
import contactData from "../../data/contactData";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 md:scroll-mt-24"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Contact
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mt-3">
          Reach me anytime — I don’t bite 😎
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {contactData.map(({ icon: Icon, label, value, href, color }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl border border-gray-200/20 dark:border-white/10 bg-white/40 dark:bg-gray-800/40 shadow-lg backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div
                className={`p-4 rounded-full bg-white dark:bg-gray-900 shadow-md ${color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400">
                {label}
              </p>
              <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                {value}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Footer text */}
      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-300">
          Always open for collaboration or just a friendly chat ✨
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
