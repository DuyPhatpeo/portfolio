import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MdSend, MdCheckCircle, MdError } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { useContactStore } from "../../stores/contactStore";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { form, loading, status, setField, sendEmail } = useContactStore();
  const { t } = useTranslation();

  /* INIT EMAILJS */
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    await sendEmail();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        w-full space-y-6
        bg-tech-bg/60 backdrop-blur-md border border-tech-teal/30
        p-6 md:p-8 shadow-[0_0_20px_rgba(68,187,164,0.1)] relative overflow-hidden
      "
      style={{
        clipPath:
          "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
      }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-tech-teal/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-2">
        <div className="h-1 w-6 bg-tech-teal"></div>
        <h2 className="text-2xl md:text-3xl font-black text-tech-light uppercase tracking-[0.2em] font-mono">
          TRANSMISSION_LOG
        </h2>
      </div>

      <p className="text-xs md:text-sm font-mono text-tech-teal/80 uppercase tracking-widest border-l-2 border-tech-teal/50 pl-3 mb-6">
        &gt; {t("contact.subtitle")}
      </p>

      {/* NAME */}
      <input
        type="text"
        placeholder={t("contact.labels.form.name")}
        value={form.name}
        onChange={(e) => setField("name", e.target.value)}
        required
        className="
          w-full px-4 py-3 font-mono text-tech-light placeholder:text-tech-teal/50
          border border-tech-teal/30 bg-tech-bg/50
          focus:border-tech-teal focus:ring-0 focus:shadow-[0_0_15px_rgba(68,187,164,0.3)]
          outline-none transition-all
        "
        style={{
          clipPath:
            "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        }}
      />

      {/* EMAIL */}
      <input
        type="email"
        placeholder={t("contact.labels.form.email")}
        value={form.email}
        onChange={(e) => setField("email", e.target.value)}
        required
        className="
          w-full px-4 py-3 font-mono text-tech-light placeholder:text-tech-teal/50
          border border-tech-teal/30 bg-tech-bg/50
          focus:border-tech-teal focus:ring-0 focus:shadow-[0_0_15px_rgba(68,187,164,0.3)]
          outline-none transition-all
        "
        style={{
          clipPath:
            "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        }}
      />

      {/* MESSAGE */}
      <textarea
        rows={4}
        placeholder={t("contact.labels.form.message")}
        value={form.message}
        onChange={(e) => setField("message", e.target.value)}
        required
        className="
          w-full px-4 py-3 font-mono text-tech-light placeholder:text-tech-teal/50
          border border-tech-teal/30 bg-tech-bg/50
          focus:border-tech-teal focus:ring-0 focus:shadow-[0_0_15px_rgba(68,187,164,0.3)]
          outline-none transition-all resize-none
        "
        style={{
          clipPath:
            "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        }}
      />

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="
          group relative w-full flex items-center justify-center gap-3
          bg-tech-bg text-tech-teal font-bold uppercase tracking-widest
          py-4 border border-tech-teal
          transition-all duration-300
          hover:bg-tech-teal/10 hover:shadow-[0_0_20px_rgba(68,187,164,0.4)]
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        style={{
          clipPath:
            "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
        }}
      >
        {loading ? (
          t("contact.labels.form.sending")
        ) : (
          <>
            {t("contact.labels.form.send")}{" "}
            <MdSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>

      {/* STATUS */}
      {status === "success" && (
        <p className="flex items-center gap-2 text-green-600 text-sm">
          <MdCheckCircle /> {t("contact.alerts.success")}
        </p>
      )}

      {status === "error" && (
        <p className="flex items-center gap-2 text-red-600 text-sm">
          <MdError /> {t("contact.alerts.error")}
        </p>
      )}
    </motion.form>
  );
}
