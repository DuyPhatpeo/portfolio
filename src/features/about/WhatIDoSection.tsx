import React from "react";
import { motion } from "framer-motion";
import { MonitorSmartphone, PenTool, Server, Rocket, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhatIDoSection: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("whatIDo.services.0.title", "Frontend Development"),
      description: t("whatIDo.services.0.description", "Building modern, interactive user interfaces."),
      icon: <MonitorSmartphone />,
      color: "bg-primary",
    },
    {
      title: t("whatIDo.services.1.title", "UI/UX Implementation"),
      description: t("whatIDo.services.1.description", "Smooth animations and pixel-perfect precision."),
      icon: <PenTool />,
      color: "bg-primary",
    },
    {
      title: t("whatIDo.services.2.title", "Backend Integration"),
      description: t("whatIDo.services.2.description", "Connecting interfaces with robust APIs."),
      icon: <Server />,
      color: "bg-primary",
    },
    {
      title: t("whatIDo.services.3.title", "Performance & SEO"),
      description: t("whatIDo.services.3.description", "Optimizing speed and accessibility."),
      icon: <Rocket />,
      color: "bg-primary",
    },
    {
      title: t("whatIDo.services.4.title", "Mobile Development"),
      description: t("whatIDo.services.4.description", "Building cross-platform native applications with React Native."),
      icon: <Smartphone />,
      color: "bg-primary",
    },
  ];

  return (
    <section className="pb-32 w-full bg-transparent relative overflow-hidden -mt-4">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full flex flex-col gap-16 md:gap-20">
        
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight py-2 leading-tight">
            {t("whatIDo.title", "What I Do")}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-transparent mt-6 rounded-full opacity-80" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {services.map((service, idx) => {
            let colSpan = "md:col-span-1";
            if (idx === 0 || idx === 3) colSpan = "md:col-span-2";
            if (idx === 4) colSpan = "md:col-span-3";
            
            return (
              <motion.div 
                key={idx}
                className={`flex flex-col p-8 md:p-10 rounded-[2rem] bg-card/40 border border-border/50 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 shadow-xl overflow-hidden relative group ${colSpan}`}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * (idx % 3) }}
              >
                {/* Background Blob */}
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-primary" />
                
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-primary shadow-lg shadow-primary/30 mb-16 md:mb-20 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300 z-10">
                  {React.cloneElement(service.icon, { className: "w-7 h-7 md:w-8 md:h-8 text-white" })}
                </div>
                
                <div className="mt-auto z-10">
                  <h3 className={`font-black mb-3 text-foreground ${idx === 4 ? 'text-3xl md:text-5xl' : (idx === 0 || idx === 3) ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                    {service.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed text-base md:text-lg max-w-3xl">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhatIDoSection;
