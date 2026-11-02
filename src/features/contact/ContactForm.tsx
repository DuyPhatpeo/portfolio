"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdCheckCircle, MdError } from "react-icons/md";
import { HiArrowLongRight } from "react-icons/hi2";
import emailjs from "@emailjs/browser";
import { useContactStore } from "@stores/contactStore";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { FormState } from "@stores/contactStore";

export default function ContactForm() {
  const { loading, status, sendEmail } = useContactStore();
  const { t } = useTranslation();

  const contactSchema = z.object({
    fullName: z
      .string()
      .min(
        2,
        t("contact.validation.full_name", "Vui lòng nhập họ và tên của bạn")
      ),
    email: z
      .string()
      .email(
        t("contact.validation.email", "Vui lòng nhập đúng định dạng email")
      ),
    mobile: z
      .string()
      .regex(
        /^\d{10}$/,
        t("contact.validation.mobile", "Số điện thoại phải gồm đúng 10 chữ số")
      ),
    message: z
      .string()
      .min(
        10,
        t("contact.validation.message", "Tin nhắn phải có ít nhất 10 ký tự")
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      process.env.VITE_EMAILJS_PUBLIC_KEY ||
      "";
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const onSubmit = async (data: FormState) => {
    if (loading) return;
    await sendEmail(data);
    reset();
  };

  const FieldError = ({ message }: { message?: string }) => (
    <div className="min-h-[20px] mt-1">
      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 text-destructive text-sm"
          >
            <MdError className="shrink-0" size={15} />
            <span>{message}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  const fieldClass = (hasError?: boolean) => `
    w-full bg-background/55 border rounded-xl outline-none px-4.5 py-4 text-base sm:text-lg
    text-foreground placeholder:text-muted-foreground
    transition-colors
    ${
      hasError
        ? "border-destructive focus:border-destructive"
        : "border-border focus:border-primary"
    }
  `;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div className="mb-6 pb-4 border-b border-border flex items-center justify-between">
        <h3 className="text-2xl sm:text-3xl font-sans font-semibold text-foreground tracking-tight">
          {t("contact.transmission_log", "Biểu mẫu liên hệ")}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label
            htmlFor="contact-fullName"
            className="block text-base font-medium text-foreground/95 mb-2"
          >
            {t("contact.labels.form.full_name", "Họ và tên")}
          </label>
          <input
            id="contact-fullName"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            placeholder="Nguyễn Văn A"
            {...register("fullName")}
            className={fieldClass(!!errors.fullName)}
          />
          <FieldError message={errors.fullName?.message} />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-base font-medium text-foreground/95 mb-2"
          >
            {t("contact.labels.form.email", "Email")}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            placeholder="name@example.com"
            {...register("email")}
            className={fieldClass(!!errors.email)}
          />
          <FieldError message={errors.email?.message} />
        </div>

        {/* Mobile */}
        <div>
          <label
            htmlFor="contact-mobile"
            className="block text-base font-medium text-foreground/95 mb-2"
          >
            {t("contact.labels.form.mobile", "Số điện thoại (10 chữ số)")}
          </label>
          <input
            id="contact-mobile"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.mobile}
            placeholder="0901234567"
            {...register("mobile")}
            className={fieldClass(!!errors.mobile)}
          />
          <FieldError message={errors.mobile?.message} />
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="block text-base font-medium text-foreground/95 mb-2"
          >
            {t("contact.labels.form.message_label", "Nội dung tin nhắn")}
          </label>
          <textarea
            id="contact-message"
            rows={5}
            aria-invalid={!!errors.message}
            placeholder={t(
              "contact.labels.form.message",
              "Nhập tin nhắn của bạn tại đây..."
            )}
            {...register("message")}
            className={`${fieldClass(!!errors.message)} resize-y min-h-40`}
          />
          <FieldError message={errors.message?.message} />
        </div>
      </div>

      {/* Status + Submit Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-5 pt-2">
        <div className="min-h-[24px]">
          {status === "success" && (
            <p className="flex items-center gap-2 text-primary text-base font-medium">
              <MdCheckCircle className="size-5 shrink-0" />
              <span>{t("contact.alerts.success")}</span>
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center gap-2 text-destructive text-base font-medium">
              <MdError className="size-5 shrink-0" />
              <span>{t("contact.alerts.error")}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group inline-flex items-center justify-center gap-2.5 shrink-0 w-full sm:w-auto cursor-pointer min-h-13 px-9 py-4 rounded-full bg-primary text-primary-foreground font-medium text-base sm:text-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>
            {loading
              ? t("contact.labels.form.sending")
              : t("contact.labels.form.send")}
          </span>
          <HiArrowLongRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </form>
  );
}
