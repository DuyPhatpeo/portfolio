import type { Metadata } from "next";
import type { Locale } from "./i18n";

export const SITE_URL = "https://tranduyphat.vercel.app";

export type SeoPageKey = "home" | "about" | "projects" | "contact";

interface PageSeoData {
  title: string;
  description: string;
}

export const SEO_DATA: Record<
  Locale,
  Record<SeoPageKey, PageSeoData> & { keywords: string[] }
> = {
  vi: {
    keywords: [
      "Trần Duy Phát",
      "Dino Péo",
      "Frontend Developer",
      "Full-Stack Web Developer",
      "Kỹ sư phần mềm",
      "React Developer Vietnam",
      "TypeScript",
      "Next.js",
      "Laravel",
      "React Native",
      "Thiết kế website chuẩn SEO",
      "Lập trình web Nha Trang",
      "Portfolio Developer",
    ],
    home: {
      title: "Trần Duy Phát (Dino Péo) | Frontend Developer",
      description:
        "Portfolio chính thức của Trần Duy Phát (Dino Péo) — Lập trình viên Frontend & Full-Stack chuyên xây dựng website tốc độ cao, chuẩn SEO.",
    },
    about: {
      title: "Giới thiệu | Trần Duy Phát (Dino Péo)",
      description:
        "Kinh nghiệm làm việc, năng lực công nghệ và câu chuyện nghề nghiệp của Trần Duy Phát (Dino Péo).",
    },
    projects: {
      title: "Dự án | Trần Duy Phát (Dino Péo)",
      description:
        "Tổng hợp các dự án web app, e-commerce và sản phẩm nổi bật do Trần Duy Phát trực tiếp phát triển.",
    },
    contact: {
      title: "Liên hệ | Trần Duy Phát (Dino Péo)",
      description:
        "Kết nối trực tiếp với Trần Duy Phát (Dino Péo) cho cơ hội tuyển dụng hoặc hợp tác phát triển dự án.",
    },
  },
  en: {
    keywords: [
      "Tran Duy Phat",
      "Dino Peo",
      "Frontend Developer",
      "Full-Stack Web Developer",
      "Software Engineer",
      "React Developer Vietnam",
      "TypeScript",
      "Next.js",
      "Laravel",
      "React Native",
      "Web Performance",
      "Technical SEO",
      "Portfolio Developer",
    ],
    home: {
      title: "Tran Duy Phat (Dino Peo) | Frontend Developer",
      description:
        "Official portfolio of Tran Duy Phat (Dino Peo) — Frontend & Full-Stack Developer crafting fast, responsive, and SEO-ready web apps.",
    },
    about: {
      title: "About | Tran Duy Phat (Dino Peo)",
      description:
        "Engineering background, technical capabilities, and professional journey of Tran Duy Phat.",
    },
    projects: {
      title: "Projects | Tran Duy Phat (Dino Peo)",
      description:
        "Selected web applications, tools, and digital products designed and developed by Tran Duy Phat.",
    },
    contact: {
      title: "Contact | Tran Duy Phat (Dino Peo)",
      description:
        "Get in touch directly with Tran Duy Phat (Dino Peo) for engineering roles or project inquiries.",
    },
  },
};

export function getSeoMetadata(
  page: SeoPageKey = "home",
  lang: Locale = "vi",
  pathSegment: string = ""
): Metadata {
  const data = SEO_DATA[lang] ?? SEO_DATA.vi;
  const pageData = data[page] ?? data.home;
  const canonicalPath = pathSegment ? `/${lang}${pathSegment}` : `/${lang}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const ogLocale = lang === "en" ? "en_US" : "vi_VN";
  const alternateLocale = lang === "en" ? "vi_VN" : "en_US";

  return {
    metadataBase: new URL(SITE_URL),
    title: pageData.title,
    description: pageData.description,
    keywords: data.keywords,
    authors: [{ name: "Trần Duy Phát (Dino Péo)", url: SITE_URL }],
    creator: "Trần Duy Phát (Dino Péo)",
    publisher: "Trần Duy Phát (Dino Péo)",
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "vi-VN": `${SITE_URL}/vi${pathSegment}`,
        "en-US": `${SITE_URL}/en${pathSegment}`,
        "x-default": `${SITE_URL}/vi${pathSegment}`,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: [alternateLocale],
      url: canonicalUrl,
      siteName: "Trần Duy Phát (Dino Péo) Portfolio",
      title: pageData.title,
      description: pageData.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${pageData.title} — Portfolio Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.title,
      description: pageData.description,
      images: ["/og-image.png"],
      creator: "@DinoPeo",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/assets/icons/icon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/assets/icons/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/assets/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/assets/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        { url: "/assets/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/site.webmanifest",
  };
}

export function getStructuredData(lang: Locale = "vi") {
  const isEn = lang === "en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Trần Duy Phát",
        alternateName: "Dino Péo",
        url: SITE_URL,
        image: `${SITE_URL}/assets/profile/hero.png`,
        jobTitle: "Frontend & Full-Stack Developer",
        description: isEn
          ? "Frontend & Full-Stack Developer crafting fast, responsive, SEO-ready web and mobile applications."
          : "Lập trình viên Frontend & Full-Stack chuyên thiết kế, xây dựng website và ứng dụng di động tốc độ cao, chuẩn SEO.",
        worksFor: {
          "@type": "Organization",
          name: "Freelance / Software Engineering",
        },
        sameAs: [
          "https://github.com/DuyPhatpeo",
          "https://www.facebook.com/DinoPeo2810",
        ],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "GSAP",
          "Laravel",
          "Node.js",
          "Full-Stack Development",
          "Technical SEO",
          "Web Performance",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Trần Duy Phát (Dino Péo) — Developer Portfolio",
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
        inLanguage: ["vi-VN", "en-US"],
      },
    ],
  };
}
