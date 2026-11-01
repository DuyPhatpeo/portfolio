import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { skills } from "@constants/skillsData";
import type { Skill, SkillCategory } from "@/types/data";
import {
  FiLayers,
  FiCode,
  FiServer,
  FiDatabase,
  FiTool,
  FiSearch,
  FiArrowUpRight,
} from "react-icons/fi";

interface TierConfig {
  id: "all" | SkillCategory;
  tierNumber: string;
  badgeKey: string;
  titleKey: string;
  descKey: string;
  accentBadge: string;
  icon: React.ElementType;
  categories: SkillCategory[];
  gridCols: string;
}

const TIERS: TierConfig[] = [
  {
    id: "frontend",
    tierNumber: "01",
    badgeKey: "skills.architecture.tier_1_badge",
    titleKey: "skills.architecture.tier_1_title",
    descKey: "skills.architecture.tier_1_desc",
    accentBadge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    icon: FiCode,
    categories: ["frontend"],
    gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  },
  {
    id: "backend",
    tierNumber: "02",
    badgeKey: "skills.architecture.tier_2_badge",
    titleKey: "skills.architecture.tier_2_title",
    descKey: "skills.architecture.tier_2_desc",
    accentBadge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    icon: FiServer,
    categories: ["backend"],
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
  {
    id: "database",
    tierNumber: "03",
    badgeKey: "skills.architecture.tier_3_badge",
    titleKey: "skills.architecture.tier_3_title",
    descKey: "skills.architecture.tier_3_desc",
    accentBadge: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    icon: FiDatabase,
    categories: ["database"],
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
  {
    id: "tools",
    tierNumber: "04",
    badgeKey: "skills.architecture.tier_4_badge",
    titleKey: "skills.architecture.tier_4_title",
    descKey: "skills.architecture.tier_4_desc",
    accentBadge: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    icon: FiTool,
    categories: ["tools", "design"],
    gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
  },
];

interface SkillChipProps {
  skill: Skill;
}

const SkillChip: React.FC<SkillChipProps> = ({ skill }) => {
  const content = (
    <div className="group/chip relative flex items-center justify-between gap-2.5 p-2 sm:p-2.5 rounded-xl bg-background/60 hover:bg-background border border-border/70 hover:border-primary/50 transition-all duration-200 cursor-pointer">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-card/90 border border-border/70 flex items-center justify-center p-1.5 shrink-0 group-hover/chip:scale-105 transition-transform">
          {skill.logo ? (
            <img
              src={skill.logo}
              alt={skill.name}
              loading="lazy"
              className={`w-full h-full object-contain ${
                skill.invertDark ? "dark:invert" : ""
              }`}
            />
          ) : (
            skill.icon?.({
              className:
                "w-full h-full text-foreground group-hover/chip:text-primary transition-colors",
            })
          )}
        </div>
        <span className="font-sans text-xs sm:text-sm font-semibold text-foreground/90 group-hover/chip:text-primary transition-colors truncate">
          {skill.name}
        </span>
      </div>
      <FiArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover/chip:text-primary group-hover/chip:translate-x-0.5 group-hover/chip:-translate-y-0.5 transition-all shrink-0 opacity-0 group-hover/chip:opacity-100" />
    </div>
  );

  if (skill.url) {
    return (
      <a
        href={skill.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block min-w-0"
        title={skill.name}
      >
        {content}
      </a>
    );
  }

  return <div className="block min-w-0">{content}</div>;
};

const SkillsGrid: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"all" | SkillCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleTiers = useMemo(() => {
    return TIERS.filter((tier) => {
      if (activeTab === "all") return true;
      return tier.id === activeTab;
    });
  }, [activeTab]);

  const getTierSkills = (tier: TierConfig) => {
    return skills.filter((skill) => {
      const inTier = tier.categories.includes(skill.category);
      if (!inTier) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        skill.name.toLowerCase().includes(q) ||
        skill.category.toLowerCase().includes(q)
      );
    });
  };

  const totalFilteredCount = useMemo(() => {
    if (!searchQuery.trim()) return skills.length;
    const q = searchQuery.toLowerCase();
    return skills.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    ).length;
  }, [searchQuery]);

  const countsByTier = useMemo(() => {
    const counts: Record<string, number> = { all: skills.length };
    TIERS.forEach((tier) => {
      counts[tier.id] = skills.filter((s) =>
        tier.categories.includes(s.category)
      ).length;
    });
    return counts;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
      {/* Quick Architecture Navigation & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-border/70">
        {/* Tier Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none -mx-2 px-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer ${
              activeTab === "all"
                ? "bg-primary text-primary-foreground font-semibold shadow-[0_4px_16px_rgba(var(--primary-rgb,45,212,191),0.3)]"
                : "bg-card/75 hover:bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
          >
            <FiLayers
              className={`w-3.5 h-3.5 ${
                activeTab === "all" ? "text-primary-foreground" : "text-primary"
              }`}
            />
            <span>{t("skills.categories.all", "Tất cả các tầng")}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeTab === "all"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {countsByTier["all"]}
            </span>
          </button>

          {TIERS.map((tier) => {
            const Icon = tier.icon;
            const isActive = activeTab === tier.id;
            const count = countsByTier[tier.id] || 0;

            return (
              <button
                key={tier.id}
                onClick={() => setActiveTab(tier.id)}
                className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-[0_4px_16px_rgba(var(--primary-rgb,45,212,191),0.3)]"
                    : "bg-card/75 hover:bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? "text-primary-foreground" : "text-primary"
                  }`}
                />
                <span>{t(tier.titleKey)}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Search Box */}
        <div className="relative w-full md:w-64 shrink-0">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("skills.search_placeholder", "Tìm công nghệ...")}
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-card/75 border border-border/70 focus:border-primary focus:outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground transition-colors"
          />
        </div>
      </div>

      {/* Architectural Bento Stack */}
      <div className="space-y-6">
        {/* Tier 1: Client & Frontend (Full Width) */}
        {visibleTiers.some((t) => t.id === "frontend") && (
          <TierBlock
            tier={TIERS[0]}
            skills={getTierSkills(TIERS[0])}
            searchActive={Boolean(searchQuery.trim())}
          />
        )}

        {/* Tier 2 & Tier 3: Side-by-side Bento on Desktop */}
        {(visibleTiers.some((t) => t.id === "backend") ||
          visibleTiers.some((t) => t.id === "database")) && (
          <div
            className={`grid grid-cols-1 ${
              activeTab === "all" ? "lg:grid-cols-2" : ""
            } gap-6`}
          >
            {visibleTiers.some((t) => t.id === "backend") && (
              <TierBlock
                tier={TIERS[1]}
                skills={getTierSkills(TIERS[1])}
                searchActive={Boolean(searchQuery.trim())}
              />
            )}
            {visibleTiers.some((t) => t.id === "database") && (
              <TierBlock
                tier={TIERS[2]}
                skills={getTierSkills(TIERS[2])}
                searchActive={Boolean(searchQuery.trim())}
              />
            )}
          </div>
        )}

        {/* Tier 4: Workflow, DevOps & Design (Full Width) */}
        {visibleTiers.some((t) => t.id === "tools") && (
          <TierBlock
            tier={TIERS[3]}
            skills={getTierSkills(TIERS[3])}
            searchActive={Boolean(searchQuery.trim())}
          />
        )}
      </div>

      {/* Empty Search Result */}
      {totalFilteredCount === 0 && (
        <div className="text-center py-16 px-4 bg-card/40 rounded-2xl border border-border/60">
          <p className="text-muted-foreground text-base sm:text-lg mb-2">
            {t(
              "skills.empty_search",
              "Không tìm thấy công nghệ nào khớp với từ khóa."
            )}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
            }}
            className="text-xs font-mono text-primary underline underline-offset-4 cursor-pointer"
          >
            {t("skills.reset_filter", "Xóa bộ lọc & xem tất cả")}
          </button>
        </div>
      )}
    </div>
  );
};

interface TierBlockProps {
  tier: TierConfig;
  skills: Skill[];
  searchActive: boolean;
}

const TierBlock: React.FC<TierBlockProps> = ({
  tier,
  skills,
  searchActive,
}) => {
  const { t } = useTranslation();
  const Icon = tier.icon;

  if (searchActive && skills.length === 0) {
    return null;
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-2xl sm:rounded-3xl bg-card/65 backdrop-blur-md border border-border/80 hover:border-border transition-all duration-300 p-5 sm:p-7 md:p-8 flex flex-col justify-between"
    >
      {/* Tier Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
          <div className="inline-flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border ${tier.accentBadge}`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{t(tier.badgeKey)}</span>
            </span>
          </div>

          <span className="font-mono text-xs text-muted-foreground bg-muted/80 px-2.5 py-1 rounded-full border border-border/50">
            {skills.length} {t("skills.count_label", "công nghệ")}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-sans font-bold text-foreground tracking-tight">
          {t(tier.titleKey)}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-1 max-w-3xl">
          {t(tier.descKey)}
        </p>
      </div>

      {/* Skills Grid for this Tier */}
      <div className={`grid ${tier.gridCols} gap-2.5 sm:gap-3`}>
        <AnimatePresence mode="popLayout">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.2 }}
            >
              <SkillChip skill={skill} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SkillsGrid;
