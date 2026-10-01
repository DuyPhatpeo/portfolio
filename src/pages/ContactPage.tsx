import React, { useEffect } from "react";
import Header from "@components/general/Header";
import Footer from "@components/general/Footer";
import ContactSection from "@features/contact/ContactSection";

import Particles from "@components/theme/Particles";
import { useNavigate } from "react-router-dom";

import PageHero from "@components/general/PageHero";
import { useTranslation } from "react-i18next";

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Liên hệ - Dino Péo";
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "contact") return;
    if (id === "projects") {
      navigate("/projects");
      return;
    }
    navigate(`/#${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground transition-colors duration-500">
      <Header scrollToSection={scrollToSection} />
      
      <div className="relative z-20 bg-background shadow-2xl min-h-screen flex flex-col justify-start">
        <Particles quantity={60} zIndex={1} />
        <div className="relative z-10 w-full">
          <PageHero title1={t("pageHero.contact_1", "GET IN")} title2={t("pageHero.contact_2", "TOUCH")} />
          <ContactSection />
        </div>
      </div>
      
      <div className="relative z-20 bg-background border-t border-primary/10 shadow-[0_-25px_60px_rgba(0,0,0,0.6)]">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
