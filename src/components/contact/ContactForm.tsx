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
      setTimeout(() => setStatus(""), 3000);
    }, 1200);
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
      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        Contact Form
      </h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        You can reach me via email at{" "}
        <a
          href="mailto:phattranduy00@gmail.com"
          className="text-primary font-semibold hover:underline"
        >
          phattranduy00@gmail.com
        </a>{" "}
        or use the form below.
      </p>

      {/* INPUT */}
      {[
        {
          label: "Your Name",
          name: "name",
          type: "text",
          placeholder: "Your name",
        },
        {
          label: "Email Address",
          name: "email",
          type: "email",
          placeholder: "your@email.com",
        },
      ].map((item) => (
        <div key={item.name}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {item.label}
          </label>
          <input
            {...item}
            required
            value={(form as any)[item.name]}
            onChange={handleChange}
            className="
              w-full px-4 py-3 rounded-lg
              bg-gray-50 dark:bg-slate-700
              border border-gray-200 dark:border-slate-600
              placeholder-gray-400 dark:placeholder-gray-400
              outline-none transition
              focus:border-primary focus:ring-2 focus:ring-primary/30
            "
          />
        </div>
      ))}

      {/* MESSAGE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
            w-full px-4 py-3 rounded-lg
            bg-gray-50 dark:bg-slate-700
            border border-gray-200 dark:border-slate-600
            placeholder-gray-400 dark:placeholder-gray-400
            outline-none transition
            focus:border-primary focus:ring-2 focus:ring-primary/30
          "
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full flex items-center justify-center gap-2
          bg-primary text-white py-3 rounded-xl
          font-semibold transition
          hover:opacity-90
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          >
            <MdSend size={18} />
          </motion.span>
        ) : (
          <>
            Send Message <MdSend size={18} />
          </>
        )}
      </button>

      {/* STATUS */}
      {status === "success" && (
        <p className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
          <MdCheckCircle size={18} /> Message sent successfully!
        </p>
      )}

      {status === "error" && (
        <motion.p
          className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
          animate={{ x: [-6, 6, -6, 0] }}
          transition={{ duration: 0.3 }}
        >
          <MdError size={18} /> Something went wrong. Please try again.
        </motion.p>
      )}
    </motion.form>
  );
}
