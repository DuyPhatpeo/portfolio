import { useTranslation } from "react-i18next";
import { profileData } from "@constants/profileData";

export default function HeroAvatar() {
  const { t } = useTranslation();

  return (
    <div
      className="relative isolate min-w-0 w-[calc(100%_+_90px)] -ml-12 self-end pt-[35px] max-[1100px]:w-[calc(100%_+_50px)] max-[1100px]:-ml-[25px] max-[760px]:w-[min(560px,calc(100%_+_20px))] max-[760px]:ml-0 max-[760px]:mt-5 max-[760px]:justify-self-center max-[760px]:pt-[15px]"
      data-hero-avatar
    >
      {/* Neutral translucent planetary disc – keeps monochrome starlight visible */}
      <span
        className="absolute -z-2 w-[70%] aspect-square right-[2%] bottom-[6%] rounded-full bg-card border border-border max-[760px]:right-[-4%]"
        aria-hidden="true"
      />

      {/* Subtle monochrome celestial orbit ring */}
      <span
        className="absolute -z-1 w-[74%] aspect-square left-[4%] top-[2%] rounded-full border border-dashed border-foreground/20"
        aria-hidden="true"
      >
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-foreground/80" />
      </span>

      <img
        data-hero-portrait
        className="block relative w-full h-auto object-contain"
        src={profileData.heroImage}
        srcSet="/assets/profile/hero-600.webp 600w, /assets/profile/hero.webp 1200w"
        sizes="(max-width: 760px) 100vw, 55vw"
        alt={t("hero.banner.imageAlt", "Developer Hero")}
        width={1536}
        height={1024}
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
