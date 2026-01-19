import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MdSend, MdCheckCircle, MdError } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { useContactStore } from "../../stores/contactStore";

export default function ContactForm() {
  const { form, loading, status, setField, sendEmail } = useContactStore();

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
        w-full space-y-5
        bg-white dark:bg-slate-800
        p-6 md:p-8 rounded-xl shadow-lg
      "
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        Contact
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        Feel free to reach out. I’ll get back to you as soon as possible.
      </p>

      {/* NAME */}
      <input
        type="text"
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setField("name", e.target.value)}
        required
        className="
          w-full px-4 py-3 rounded-lg
          border border-gray-300 dark:border-slate-600
          bg-gray-50 dark:bg-slate-700
          focus:border-primary focus:ring-2 focus:ring-primary/30
          outline-none transition
        "
      />

      {/* EMAIL */}
      <input
        type="email"
        placeholder="your@email.com"
        value={form.email}
        onChange={(e) => setField("email", e.target.value)}
        required
        className="
          w-full px-4 py-3 rounded-lg
          border border-gray-300 dark:border-slate-600
          bg-gray-50 dark:bg-slate-700
          focus:border-primary focus:ring-2 focus:ring-primary/30
          outline-none transition
        "
      />

      {/* MESSAGE */}
      <textarea
        rows={4}
        placeholder="Write your message..."
        value={form.message}
        onChange={(e) => setField("message", e.target.value)}
        required
        className="
          w-full px-4 py-3 rounded-lg
          border border-gray-300 dark:border-slate-600
          bg-gray-50 dark:bg-slate-700
          focus:border-primary focus:ring-2 focus:ring-primary/30
          outline-none transition
        "
      />

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full flex items-center justify-center gap-2
          bg-primary text-white
          py-3 rounded-xl font-semibold
          transition
          hover:opacity-90
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            Send Message <MdSend />
          </>
        )}
      </button>

      {/* STATUS */}
      {status === "success" && (
        <p className="flex items-center gap-2 text-green-600 text-sm">
          <MdCheckCircle /> Message sent successfully!
        </p>
      )}

      {status === "error" && (
        <p className="flex items-center gap-2 text-red-600 text-sm">
          <MdError /> Something went wrong. Please try again.
        </p>
      )}
    </motion.form>
  );
}
