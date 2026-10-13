import { useTranslation } from "react-i18next";
import { profileData } from "@constants/profileData";

export default function HeroAvatar() {
  const { t } = useTranslation();

  return (
    <div
      className="relative isolate min-w-0 w-[calc(100%_+_90px)] -ml-12 self-end pt-[35px] max-[1100px]:w-[calc(100%_+_50px)] max-[1100px]:-ml-[25px] max-[760px]:w-[min(560px,calc(100%_+_20px))] max-[760px]:ml-0 max-[760px]:mt-5 max-[760px]:justify-self-center max-[760px]:pt-[15px]"
      data-hero-avatar
    >
      <span className="absolute -z-2 w-[72%] aspect-square right-0 bottom-[5%] rounded-full bg-primary opacity-[0.92] max-[760px]:right-[-5%]" aria-hidden="true" />
      <span className="absolute -z-1 w-[65%] aspect-square left-[6%] top-[2%] border border-foreground rounded-full opacity-45" aria-hidden="true" />
      <img
        data-hero-portrait
        className="block relative w-full h-auto object-contain"
        src={profileData.heroImage}
        alt={t("hero.banner.imageAlt", "Developer Hero")}
        width={1536}
        height={1024}
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
