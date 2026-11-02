"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@components/providers/LanguageProvider";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@components/ui/FadeUp";
import { useTranslation } from "react-i18next";
import SpecularButton from "@components/ui/SpecularButton";

const ContactCTA: React.FC = () => {
  const router = useRouter();
  const { lang } = useLanguage();
  const { t } = useTranslation();

  return (
    <section className="py-24 sm:py-28 bg-transparent border-t border-border/60 relative z-10">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <FadeUp delay={0.08}>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold tracking-normal leading-tight sm:leading-snug text-foreground mb-7 sm:mb-8">
            {t("cta.title", "Let's work together.")}
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl mb-10 max-w-[54ch] mx-auto leading-relaxed">
            {t(
              "cta.description",
              "Have a project or idea in mind? I'm always open to discuss."
            )}
          </p>
        </FadeUp>
        <FadeUp delay={0.16}>
          <SpecularButton
            variant="primary"
            size="lg"
            onClick={() => router.push(`/${lang}/contact`)}
            className="group"
          >
            <span>{t("cta.button", "Get in Touch")}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </SpecularButton>
        </FadeUp>
      </div>
    </section>
  );
};

export default ContactCTA;
