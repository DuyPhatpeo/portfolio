import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdCheckCircle, MdError } from "react-icons/md";
import { HiArrowLongRight } from "react-icons/hi2";
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
    firstName: z.string().min(2, t("contact.validation.first_name", "Vui lòng nhập họ của bạn")),
    lastName: z.string().min(2, t("contact.validation.last_name", "Vui lòng nhập tên của bạn")),
    email: z.string().email(t("contact.validation.email", "Vui lòng nhập đúng định dạng email")),
    mobile: z.string().regex(/^\d{10}$/, t("contact.validation.mobile", "Số điện thoại phải gồm đúng 10 chữ số")),
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

  const fieldClass = (hasError?: boolean) => `
    w-full bg-transparent border-b outline-none py-3 font-mono
    text-primary-foreground placeholder:text-primary-foreground/60
    transition-colors resize-none
    ${hasError ? "border-destructive focus:border-destructive" : "border-primary-foreground/30 focus:border-primary-foreground"}
  `;

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="w-full text-primary-foreground"
    >
      <span className="block text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-primary-foreground/70 mb-10">
        {t("contact.transmission_log")}
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
        {/* LEFT: FIRST NAME, LAST NAME, EMAIL, MOBILE */}
        <div className="space-y-8">
          <div>
            <input
              type="text"
              placeholder={t("contact.labels.form.first_name")}
              {...register("firstName")}
              className={fieldClass(!!errors.firstName)}
            />
            <FieldError message={errors.firstName?.message} />
          </div>

          <div>
            <input
              type="text"
              placeholder={t("contact.labels.form.last_name")}
              {...register("lastName")}
              className={fieldClass(!!errors.lastName)}
            />
            <FieldError message={errors.lastName?.message} />
          </div>

          <div>
            <input
              type="email"
              placeholder={t("contact.labels.form.email")}
              {...register("email")}
              className={fieldClass(!!errors.email)}
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div>
            <input
              type="tel"
              placeholder={t("contact.labels.form.mobile")}
              {...register("mobile")}
              className={fieldClass(!!errors.mobile)}
            />
            <FieldError message={errors.mobile?.message} />
          </div>
        </div>

        {/* RIGHT: MESSAGE */}
        <div className="flex flex-col h-full">
          <textarea
            placeholder={t("contact.labels.form.message")}
            {...register("message")}
            className={`${fieldClass(!!errors.message)} flex-1 min-h-40 md:min-h-full`}
          />
          <FieldError message={errors.message?.message} />
        </div>
      </div>

      {/* STATUS + BUTTON */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-8">
        <div>
          {status === "success" && (
            <p className="flex items-center gap-2 text-primary-foreground font-mono text-xs uppercase tracking-widest">
              <MdCheckCircle /> {t("contact.alerts.success")}
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center gap-2 text-destructive font-mono text-xs uppercase tracking-widest">
              <MdError /> {t("contact.alerts.error")}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            group flex items-center gap-3 shrink-0
            bg-primary-foreground text-primary font-black uppercase tracking-[0.2em] text-xs md:text-sm
            px-8 py-4 rounded-full hover:opacity-90 transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? t("contact.labels.form.sending") : t("contact.labels.form.send")}
          <HiArrowLongRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </motion.form>
  );
}
