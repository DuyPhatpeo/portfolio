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
      className="min-h-screen flex flex-col justify-center py-20 md:py-28 relative overflow-hidden bg-background border-t border-white/5"
    >
      {/* Background Cyber Dots Pattern Removed */}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header — split layout with decorative year */}
        <motion.div
          className="mb-8 sm:mb-12 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div>
            <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
              {t("activity.subtitle")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none">
              {t("activity.title")}
            </h2>
          </div>
          <p className="max-w-xs text-foreground/50 text-sm font-mono md:text-right border-l md:border-l-0 md:border-r border-primary/30 pl-4 md:pl-0 md:pr-4">
            {t("activity.description")}
          </p>
        </motion.div>

        {/* GitHub Activity Card & CTA Container */}
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
          <div className="w-full flex flex-col items-center">
            {/* Mobile swipe hint */}
            <span className="sm:hidden text-[10px] font-mono text-primary/70 tracking-widest uppercase mb-2 flex items-center gap-1.5">
              ← {t("common.scroll_hint", "Kéo ngang để xem")} →
            </span>

            <motion.div
              className="w-full flex justify-start sm:justify-center overflow-x-auto py-2 px-1"
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
          </div>

          {/* GitHub Profile CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full sm:w-auto"
          >
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-foreground/5 hover:bg-foreground hover:text-background border border-primary/20 hover:border-primary transition-all duration-300 shadow-md font-mono text-xs md:text-sm font-semibold tracking-wider uppercase text-foreground w-full sm:w-auto"
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

