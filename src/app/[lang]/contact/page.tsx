"use client";

import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "@stores/themeStore";
import SeoHead from "@components/general/SeoHead";
import ContactSection from "@features/contact/ContactSection";
import PageHero from "@components/general/PageHero";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const darkMode = useThemeStore((state) => state.darkMode);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground transition-colors duration-300">
      <SeoHead page="contact" path="/contact" />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
      />

      <main className="relative z-10 flex-1 min-h-screen flex flex-col justify-start">
        <div className="relative z-10 w-full">
          <PageHero
            title1={t("pageHero.contact_1", "Get in")}
            title2={t("pageHero.contact_2", "Touch")}
            indexLabel="03"
          />
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
