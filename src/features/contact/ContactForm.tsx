import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MdSend, MdCheckCircle, MdError } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { useContactStore } from "../../stores/contactStore";
import { useTranslation, Trans } from "react-i18next";

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
      whileInView={{ opacity: 1, y: 0 }}
      className="w-full space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NAME */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">
            {t("contact.labels.form.name")}
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            required
            className="
              w-full px-5 py-4 bg-card/40 border border-primary/20
              text-foreground placeholder:text-foreground/30 font-mono focus:border-primary focus:bg-card/60
              outline-none transition-all rounded-none
            "
          />
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">
            {t("contact.labels.form.email")}
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            required
            className="
              w-full px-5 py-4 bg-card/40 border border-primary/20
              text-foreground placeholder:text-foreground/30 font-mono focus:border-primary focus:bg-card/60
              outline-none transition-all rounded-none
            "
          />
        </div>
      </div>

      {/* MESSAGE */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">
          {t("contact.labels.form.message")}
        </label>
        <textarea
          rows={5}
          placeholder="Your message here..."
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          required
          className="
            w-full px-5 py-4 bg-card/40 border border-primary/20
            text-foreground placeholder:text-foreground/30 font-mono focus:border-primary focus:bg-card/60
            outline-none transition-all resize-none rounded-none
          "
        />
      </div>

      {/* BUTTON */}
      <div className="relative group">
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-5 bg-primary text-background font-black uppercase tracking-[0.3em] text-sm
            hover:bg-primary/90 transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            rounded-none shadow-[0_10px_20px_rgba(var(--primary-rgb),0.15)]
          "
        >
          {loading ? t("contact.labels.form.sending") : t("contact.labels.form.send")}
        </button>
        {/* Subtle accent line under button */}
        <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary/20"></div>
      </div>

      {/* STATUS */}
      <div className="flex justify-start pt-2">
        {status === "success" && (
          <p className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
            <MdCheckCircle /> {t("contact.alerts.success")}
          </p>
        )}
        {status === "error" && (
          <p className="flex items-center gap-2 text-destructive font-mono text-xs uppercase tracking-widest">
            <MdError /> {t("contact.alerts.error")}
          </p>
        )}
      </div>
    </motion.form>
  );
}
