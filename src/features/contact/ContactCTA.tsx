import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@components/ui/FadeUp";
import { useTranslation } from "react-i18next";

const ContactCTA: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-24 sm:py-32 bg-transparent border-t border-white/5 relative z-10">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <FadeUp delay={0.1}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-foreground mb-6">
            {t("cta.title", "Let's work together.")}
          </h2>
          <p className="text-foreground/60 text-lg mb-10 font-mono max-w-xl mx-auto">
            {t("cta.description", "Have a project or idea in mind? I'm always open to discuss.")}
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <button
            onClick={() => { navigate("/contact"); window.scrollTo(0,0); }}
            className="group inline-flex items-center gap-4 pb-2 border-b-2 border-primary text-primary hover:text-foreground hover:border-foreground transition-colors duration-300 font-mono uppercase tracking-widest text-sm font-bold cursor-pointer"
          >
            {t("cta.button", "GET IN TOUCH")}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </FadeUp>
      </div>
    </section>
  );
};
export default ContactCTA;

