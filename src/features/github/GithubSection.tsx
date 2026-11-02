"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { RiGithubFill } from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";
import GitHubActivity from "@components/ui/GitHubActivity";
import { profileData } from "@constants/profileData";

const GithubSection: React.FC = () => {
  const { t } = useTranslation();

  const githubLink =
    profileData.socialLinks.find((l) => l.name.toLowerCase() === "github")
      ?.href || "https://github.com/DuyPhatpeo";
  const username = "DuyPhatpeo";

  return (
    <section
      id="activity"
      className="py-20 md:py-28 relative overflow-hidden bg-transparent border-t border-border/70"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Modern Centered Command-Center Section Header */}
        <motion.div
          className="mb-12 sm:mb-16 flex flex-col items-center text-center max-w-2xl mx-auto gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/60 border border-border/70 font-mono text-xs text-primary font-medium tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>ACTIVITY & COMMITS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
            {t("activity.title")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
            {t("activity.description")}
          </p>
        </motion.div>

        {/* GitHub Activity Panel & Profile Link */}
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
          <div className="w-full flex flex-col items-center">
            <span className="sm:hidden text-xs font-mono text-muted-foreground mb-2 flex items-center gap-1.5">
              ← {t("common.scroll_hint", "Vuốt ngang để xem")} →
            </span>

            <motion.div
              className="w-full flex justify-center items-center overflow-x-auto py-1"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <GitHubActivity
                username={username}
                label={t("activity.top_contributions")}
                showMonths={true}
                months={12}
                className="mx-auto shadow-2xl border-primary/25"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            viewport={{ once: true }}
            className="w-full sm:w-auto flex justify-center"
          >
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 py-3 rounded-full bg-card border border-border hover:border-primary/60 text-foreground hover:text-primary transition-colors duration-200 font-medium text-base w-full sm:w-auto"
            >
              <RiGithubFill className="size-5 text-primary transition-colors" />
              <span>{t("activity.view_github")}</span>
              <FiArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GithubSection;
