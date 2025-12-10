import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdSend, MdCheckCircle, MdError } from "react-icons/md";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"" | "success" | "error">("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const ok = Math.random() > 0.3;

      if (ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }

      setLoading(false);

      // Auto-clear status
      setTimeout(() => setStatus(""), 3000);
    }, 1200);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="
        w-full space-y-4 
        bg-white/10 dark:bg-neutral-900/10
        backdrop-blur-xl
        p-6 rounded-2xl shadow-lg 
        border border-white/20 dark:border-neutral-700/20
      "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-3">
        Contact Form
      </h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
        You can reach me via email at{" "}
        <a
          href="mailto:phattranduy00@gmail.com"
          className="text-primary font-semibold hover:underline"
        >
          phattranduy00@gmail.com
        </a>{" "}
        or use the contact form below.
      </p>

      {/* NAME */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200 mb-1">
          Your Name
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="
            w-full px-4 py-3 rounded-xl
            bg-white/10 dark:bg-neutral-800/20
            backdrop-blur-sm border border-white/20 dark:border-neutral-700/20
            placeholder-neutral-500 dark:placeholder-neutral-400
            outline-none transition
            focus:border-primary focus:ring-2 focus:ring-primary/40
          "
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="your@example.com"
          value={form.email}
          onChange={handleChange}
          className="
            w-full px-4 py-3 rounded-xl
            bg-white/10 dark:bg-neutral-800/20
            backdrop-blur-sm border border-white/20 dark:border-neutral-700/20
            placeholder-neutral-500 dark:placeholder-neutral-400
            outline-none transition
            focus:border-primary focus:ring-2 focus:ring-primary/40
          "
        />
      </div>

      {/* MESSAGE */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200 mb-1">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Write your message..."
          value={form.message}
          onChange={handleChange}
          className="
            w-full px-4 py-3 rounded-xl
            bg-white/10 dark:bg-neutral-800/20
            backdrop-blur-sm border border-white/20 dark:border-neutral-700/20
            placeholder-neutral-500 dark:placeholder-neutral-400
            outline-none transition
            focus:border-primary focus:ring-2 focus:ring-primary/40
          "
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full flex items-center justify-center gap-2 
          bg-primary text-white py-3 rounded-xl 
          font-medium transition
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          >
            <MdSend size={18} />
          </motion.div>
        ) : (
          <>
            Send Message
            <MdSend size={18} />
          </>
        )}
      </button>

      {/* STATUS */}
      {status === "success" && (
        <p className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm mt-2">
          <MdCheckCircle size={18} /> Message sent successfully!
        </p>
      )}

      {status === "error" && (
        <motion.p
          className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2"
          animate={{ x: [-6, 6, -6, 0] }}
          transition={{ duration: 0.3 }}
        >
          <MdError size={18} /> Something went wrong. Please try again.
        </motion.p>
      )}
    </motion.form>
  );
}
