"use client";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SITE_URL = "https://tranduyphat.vercel.app";

export type SeoPageKey = "home" | "about" | "projects" | "contact";

interface SeoHeadProps {
  page: SeoPageKey;
  path: "/" | "/about" | "/projects" | "/contact";
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

const SeoHead: React.FC<SeoHeadProps> = ({ page, path }) => {
  const { t, i18n } = useTranslation();

  const lang = i18n.language?.startsWith("en") ? "en" : "vi";
  const title = t(`seo.${page}.title`);
  const description = t(`seo.${page}.description`);
  const keywords = t("seo.keywords");
  const canonicalUrl = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const ogLocale = lang === "en" ? "en_US" : "vi_VN";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = title;

    upsertMeta("name", "title", title);
    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords);

    upsertCanonical(canonicalUrl);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:locale", ogLocale);

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:url", canonicalUrl);
  }, [lang, title, description, keywords, canonicalUrl, ogLocale]);

  return null;
};

export default SeoHead;

