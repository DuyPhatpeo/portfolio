"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@components/providers/LanguageProvider";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@components/ui/FadeUp";
import { useTranslation } from "react-i18next";
import SpecularButton from "@components/ui/SpecularButton";
import GlassSurface from "@components/ui/GlassSurface";

const ContactCTA: React.FC = () => {
  const router = useRouter();
  const { lang } = useLanguage();
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-28 bg-transparent border-t border-border/60 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <GlassSurface
          borderRadius={28}
          blur={18}
          opacity={0.88}
          className="p-8 sm:p-12 md:p-16 text-center border border-primary/20 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.4)] bg-card/70"
        >
          <FadeUp delay={0.08}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold tracking-normal leading-tight sm:leading-snug text-foreground mb-6 sm:mb-7">
              {t("cta.title", "Let's work together.")}
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl mb-10 max-w-[50ch] mx-auto leading-relaxed">
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
        </GlassSurface>
      </div>
    </section>
  );
};

export default ContactCTA;
