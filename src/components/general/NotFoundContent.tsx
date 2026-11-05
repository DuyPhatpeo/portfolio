"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/components/providers/LanguageProvider";
import FuzzyText from "@/components/ui/FuzzyText";
import { FiHome } from "react-icons/fi";

export default function NotFoundContent() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      router.push(`/${lang || "vi"}`);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router, lang]);

  return (
    <main className="relative w-full min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-20 pb-12 sm:pt-24 sm:pb-16 text-center overflow-hidden">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 sm:gap-7 my-auto">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono font-medium tracking-wide uppercase shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span>{t("not_found.badge", "Lỗi 404 • Tín hiệu thất lạc")}</span>
        </div>

        {/* Interactive React Bits FuzzyText */}
        <div className="relative py-2 flex items-center justify-center">
          <FuzzyText
            fontSize="clamp(6.5rem, 20vw, 13rem)"
            fontWeight={900}
            fontFamily="Space Grotesk, system-ui, sans-serif"
            color="var(--primary, #d9ff3a)"
            enableHover={true}
            baseIntensity={0.22}
            hoverIntensity={0.65}
            fuzzRange={36}
            colorSplit={0.35}
            glitchMode={true}
            glitchInterval={2600}
            glitchDuration={220}
            clickEffect={true}
            className="mx-auto select-none"
          >
            404
          </FuzzyText>
        </div>

        {/* Headline & Description */}
        <div className="flex flex-col gap-3 max-w-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-foreground tracking-tight">
            {t("not_found.title", "Trang này không tồn tại")}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t(
              "not_found.description",
              "Đường dẫn bạn vừa truy cập có thể đã bị gỡ bỏ, đổi tên hoặc vũ trụ tạm thời chưa định tuyến được."
            )}
          </p>
        </div>

        {/* Action Gateway - Single button with live countdown */}
        <div className="pt-2">
          <Link
            href={`/${lang || "vi"}`}
            className="inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-primary text-primary-foreground font-mono text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md group"
          >
            <FiHome className="text-base group-hover:-translate-y-0.5 transition-transform" />
            <span>{t("not_found.back_home", "Về trang chủ")}</span>
            <span className="inline-flex items-center justify-center min-w-[26px] h-5 px-1.5 rounded-full bg-primary-foreground/15 text-xs font-bold font-mono">
              {countdown}s
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
