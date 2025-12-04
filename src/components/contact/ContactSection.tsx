import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdEmail,
  MdLocationOn,
  MdPhone,
  MdSend,
  MdCheckCircle,
  MdError,
} from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import SectionHeader from "../ui/SectionHeader";

interface ContactData {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  color: string;
}

interface ContactFormState {
  name: string;
  email: string;
  message: string;
  status: "" | "success" | "error";
  msg: string;
  loading: boolean;
}

const contactData: ContactData[] = [
  {
    icon: MdEmail,
    label: "EMAIL",
    value: "phattranduy00@gmail.com",
    href: "mailto:phattranduy00@gmail.com",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: MdPhone,
    label: "PHONE",
    value: "+84 123 456 789",
    href: "tel:+84123456789",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: MdLocationOn,
    label: "LOCATION",
    value: "Nha Trang, Khánh Hoà, Việt Nam",
    href: "#",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: FaGithub,
    label: "GITHUB",
    value: "@DuyPhatpeo",
    href: "https://github.com/DuyPhatpeo",
    color: "from-slate-500 to-gray-500",
  },
];

const ContactCard = ({
  icon: Icon,
  label,
  value,
  href,
  color,
}: ContactData) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative block h-full"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div
      className="
        relative h-full p-8 rounded-2xl
        bg-white/60 dark:bg-slate-900/80 
        backdrop-blur-sm
        border-2 
        border-slate-300/70 dark:border-slate-700/50 
        hover:border-slate-400 dark:hover:border-slate-600
        transition-all duration-300 overflow-hidden flex flex-col
      "
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      <div className="relative space-y-5 flex-1 flex flex-col">
        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300 self-start`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-2">
            {label}
          </p>
          <p className="text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors break-all">
            {value}
          </p>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${color} group-hover:w-full transition-all duration-500`}
      />
    </div>
  </motion.a>
);

export default function ContactSection() {
  const [state, setState] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
    status: "",
    msg: "",
    loading: false,
  });

  const setField = (k: string, v: string) =>
    setState((s) => ({ ...s, [k]: v }));

  const sendMail = () => {
    const { name, email, message } = state;

    if (!name || !email || !message)
      return setState((s) => ({
        ...s,
        status: "error",
        msg: "Please fill in all fields",
      }));

    setState((s) => ({ ...s, loading: true, status: "", msg: "" }));

    try {
      const subject = `Portfolio Contact from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      window.location.href = `mailto:phattranduy00@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      setState({
        name: "",
        email: "",
        message: "",
        status: "success",
        msg: "Email client opened! Please send the email.",
        loading: false,
      });
    } catch {
      setState((s) => ({
        ...s,
        status: "error",
        msg: "Something went wrong, please try again.",
        loading: false,
      }));
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title="Get In Touch" />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />

            <div
              className="
                relative rounded-2xl p-8 md:p-10 shadow-xl
                bg-white/70 dark:bg-slate-900/80 
                backdrop-blur-sm
                border-2 border-slate-300 dark:border-slate-700/50
              "
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <MdSend className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="
                    text-2xl md:text-3xl font-bold 
                    bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-300 
                    bg-clip-text text-transparent
                  "
                >
                  Send Message
                </h3>
              </div>

              <div className="space-y-6">
                {/* NAME + EMAIL */}
                <div className="grid md:grid-cols-2 gap-6">
                  {["name", "email"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                        {field === "name" ? "Your Name" : "Email Address"}
                        <span className="text-pink-500 ml-1">*</span>
                      </label>
                      <input
                        name={field}
                        value={(state as any)[field]}
                        onChange={(e) => setField(field, e.target.value)}
                        placeholder={
                          field === "name" ? "John Doe" : "john@example.com"
                        }
                        className="
                          w-full px-5 py-3.5 rounded-xl 
                          bg-white/60 dark:bg-slate-950/50 
                          border-2 
                          border-slate-300 dark:border-slate-700 
                          focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                          text-slate-900 dark:text-white 
                          placeholder:text-gray-500 dark:placeholder:text-gray-400
                          outline-none transition-all duration-300
                        "
                      />
                    </div>
                  ))}
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    Your Message <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Tell me about your project..."
                    value={state.message}
                    onChange={(e) => setField("message", e.target.value)}
                    className="
                      w-full px-5 py-3.5 rounded-xl 
                      bg-white/60 dark:bg-slate-950/50 
                      border-2 
                      border-slate-300 dark:border-slate-700 
                      focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
                      text-slate-900 dark:text-white 
                      placeholder:text-gray-500 dark:placeholder:text-gray-400
                      outline-none transition-all duration-300 resize-none
                    "
                  />
                </div>

                {/* STATUS */}
                {state.msg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                      p-4 rounded-xl flex items-center gap-3 border-2
                      ${
                        state.status === "success"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                      }
                    `}
                  >
                    {state.status === "success" ? (
                      <MdCheckCircle className="w-5 h-5" />
                    ) : (
                      <MdError className="w-5 h-5" />
                    )}
                    <span className="text-sm font-medium">{state.msg}</span>
                  </motion.div>
                )}

                {/* SUBMIT */}
                <button
                  onClick={sendMail}
                  disabled={state.loading}
                  className="
                    w-full px-8 py-4 rounded-xl font-bold text-lg 
                    bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    transition-all duration-300 flex items-center justify-center gap-3 group
                  "
                >
                  {state.loading ? (
                    "Opening..."
                  ) : (
                    <>
                      <MdSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* CONTACT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactData.map((c, i) => (
              <ContactCard key={i} {...c} />
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium flex items-center justify-center gap-2">
            💬 Always open for collaboration ✨
          </p>
        </div>
      </div>
    </section>
  );
}
