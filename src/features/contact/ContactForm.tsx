import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdCheckCircle, MdError } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { useContactStore } from "../../stores/contactStore";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { FormState } from "../../stores/contactStore";

export default function ContactForm() {
  const { loading, status, sendEmail } = useContactStore();
  const { t } = useTranslation();

  const contactSchema = z.object({
    name: z.string().min(2, t("contact.validation.name", "Vui lòng nhập tên của bạn (ít nhất 2 ký tự)")),
    email: z.string().email(t("contact.validation.email", "Vui lòng nhập đúng định dạng email")),
    message: z.string().min(10, t("contact.validation.message", "Tin nhắn phải có ít nhất 10 ký tự")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(contactSchema),
  });

  /* INIT EMAILJS */
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const onSubmit = async (data: FormState) => {
    if (loading) return;
    await sendEmail(data);
    reset();
  };

  const FieldError = ({ message }: { message?: string }) => (
    <div className="min-h-[18px]">
      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-destructive text-xs font-mono"
          >
            <MdError className="shrink-0" size={13} />
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
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
            {...register("name")}
            className={`
              w-full px-5 py-4 bg-card/40 border
              text-foreground placeholder:text-foreground/30 font-mono focus:bg-card/60
              outline-none transition-all rounded-md
              ${errors.name ? "border-destructive focus:border-destructive" : "border-primary/20 focus:border-primary"}
            `}
          />
          <FieldError message={errors.name?.message} />
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">
            {t("contact.labels.form.email")}
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className={`
              w-full px-5 py-4 bg-card/40 border
              text-foreground placeholder:text-foreground/30 font-mono focus:bg-card/60
              outline-none transition-all rounded-md
              ${errors.email ? "border-destructive focus:border-destructive" : "border-primary/20 focus:border-primary"}
            `}
          />
          <FieldError message={errors.email?.message} />
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
          {...register("message")}
          className={`
            w-full px-5 py-4 bg-card/40 border
            text-foreground placeholder:text-foreground/30 font-mono focus:bg-card/60
            outline-none transition-all resize-none rounded-md
            ${errors.message ? "border-destructive focus:border-destructive" : "border-primary/20 focus:border-primary"}
          `}
        />
        <FieldError message={errors.message?.message} />
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
            rounded-md shadow-[0_10px_20px_rgba(var(--primary-rgb),0.15)]
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
