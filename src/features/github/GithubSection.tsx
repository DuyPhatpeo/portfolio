"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { RiGithubFill } from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";
import GitHubActivity from "@components/ui/GitHubActivity";
import { profileData } from "@constants/profileData";
import GlassSurface from "@components/ui/GlassSurface";

const GithubSection: React.FC = () => {
  const { t } = useTranslation();

  const githubLink =
    profileData.socialLinks.find((l) => l.name.toLowerCase() === "github")
      ?.href || "https://github.com/DuyPhatpeo";
  const username = "DuyPhatpeo";

  return (
    <section
      id="activity"
      className="py-20 md:py-28 relative overflow-hidden bg-card/55 border-t border-border/70"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Modern Section Header */}
        <motion.div
          className="mb-12 sm:mb-16 flex flex-col items-start gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
            {t("activity.title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mt-1">
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
              className="w-full flex justify-start sm:justify-center overflow-x-auto py-1"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <GlassSurface
                borderRadius={24}
                blur={16}
                opacity={0.85}
                className="p-4 sm:p-6 md:p-8 bg-card/75 border border-primary/20 shadow-xl max-w-full"
              >
                <GitHubActivity
                  username={username}
                  label={t("activity.top_contributions")}
                  showMonths={true}
                  months={12}
                />
              </GlassSurface>
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
