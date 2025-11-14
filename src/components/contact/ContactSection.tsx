import React from "react";
import contactData from "../../data/contactData";
import ContactCard from "./ContactCard";
import SectionHeader from "../ui/SectionHeader";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 md:scroll-mt-24"
    >
      <SectionHeader title="Contact" />

      {/* Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {contactData.map((item, i) => (
          <ContactCard key={i} {...item} />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-300">
          Always open for collaboration or just a friendly chat ✨
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
