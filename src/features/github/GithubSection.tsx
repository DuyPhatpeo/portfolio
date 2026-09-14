import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { RiGithubFill } from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";
import GitHubActivity from "@components/ui/GitHubActivity";
import { profileData } from "@constants/profileData";

const GithubSection: React.FC = () => {
  const { t } = useTranslation();

  // Extract GitHub profile info
  const githubLink =
    profileData.socialLinks.find((l) => l.name.toLowerCase() === "github")
      ?.href || "https://github.com/DuyPhatpeo";
  const username = "DuyPhatpeo";

  return (
    <section
      id="activity"
      className="min-h-screen flex flex-col justify-center py-20 md:py-28 relative overflow-hidden bg-(--background-alt) scroll-mt-24 md:scroll-mt-28"
    >
      {/* Top Cyber Divider separating Projects and GitHub */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-center pointer-events-none z-20">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute px-5 bg-(--background-alt) flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          <div className="w-2.5 h-2.5 rotate-45 border border-primary/70 bg-primary/20 shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        </div>
      </div>

      {/* Background Cyber Dots Pattern */}
      <div className="absolute inset-0 cyber-dots pointer-events-none opacity-[0.04]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
            {t("activity.subtitle")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none mb-6">
            {t("activity.title")}
          </h2>
          <p className="max-w-2xl text-foreground/90 text-base md:text-lg font-mono text-justify">
            {t("activity.description")}
          </p>
        </motion.div>

        {/* GitHub Activity Card & CTA Container */}
        <div className="flex flex-col items-center justify-center gap-8">
          <motion.div
            className="w-full flex justify-center overflow-x-auto py-2 px-1"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <GitHubActivity
              username={username}
              label={t("activity.top_contributions")}
              showMonths={true}
              months={12}
            />
          </motion.div>

          {/* GitHub Profile CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-foreground/5 hover:bg-foreground hover:text-background border border-primary/20 hover:border-primary transition-all duration-300 shadow-md font-mono text-xs md:text-sm font-semibold tracking-wider uppercase text-foreground"
            >
              <RiGithubFill className="size-5 text-primary group-hover:text-background transition-colors" />
              <span>{t("activity.view_github")}</span>
              <FiArrowUpRight className="size-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GithubSection;
