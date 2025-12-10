import ContactCard from "./ContactCard";
import { contactData } from "../../data/contactData";
import SectionHeader from "../ui/SectionHeader";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title="Get In Touch" />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Glass Form Component */}
          <ContactForm />

          {/* CONTACT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactData.map((c, i) => (
              <ContactCard key={i} {...c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
