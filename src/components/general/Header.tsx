"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { profileData } from "@/constants/profileData";
import { useThemeStore } from "@stores/themeStore";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@components/providers/LanguageProvider";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { gsap } from "@lib/gsap";

interface HeaderProps {
  scrollToSection?: (id: string) => void;
}

const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname() || `/${lang}`;

  const [isOpen, setIsOpen] = useState(false);
  const openRef = useRef(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // Staggered layers & panel refs
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  // Toggle button refs (from StaggeredMenu)
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>([
    "MENU",
    lang === "vi" ? "ĐÓNG" : "CLOSE",
  ]);

  // Bubble pills refs (from BubbleMenu)
  const bubblesRef = useRef<HTMLButtonElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);
  const busyRef = useRef(false);

  // Header scroll detection (auto-hide on scroll down, show on scroll up)
  useEffect(() => {
    let ticking = false;
    let lastDirection = "none";

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 30);

        if (currentScrollY <= 30) {
          setShowHeader(true);
          lastScrollY.current = currentScrollY;
        } else {
          const diff = currentScrollY - lastScrollY.current;
          const currentDirection = diff > 0 ? "down" : diff < 0 ? "up" : lastDirection;

          if (currentDirection !== lastDirection) {
            lastScrollY.current = currentScrollY;
            lastDirection = currentDirection;
          } else if (diff > 8) {
            setShowHeader(false);
            lastScrollY.current = currentScrollY;
          } else if (diff < -6) {
            setShowHeader(true);
            lastScrollY.current = currentScrollY;
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = useMemo(
    () => [
      { name: t("nav.home", "Home"), href: "home", path: `/${lang}`, rotation: -3 },
      { name: t("nav.about", "About"), href: "about", path: `/${lang}/about`, rotation: 2.5 },
      { name: t("nav.projects", "Projects"), href: "projects", path: `/${lang}/projects`, rotation: -2 },
      { name: t("nav.contact", "Contact"), href: "contact", path: `/${lang}/contact`, rotation: 3 },
    ],
    [t, lang]
  );

  // Initialize GSAP positions for StaggeredMenu layers
  useEffect(() => {
    const panel = panelRef.current;
    const preContainer = preLayersRef.current;
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    const icon = iconRef.current;
    const textInner = textInnerRef.current;

    if (!panel || !plusH || !plusV || !icon || !textInner) return;

    let preLayers: HTMLElement[] = [];
    if (preContainer) {
      preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer")) as HTMLElement[];
    }
    preLayerElsRef.current = preLayers;

    // Initially position panel and pre-layers off-screen to the right
    gsap.set([panel, ...preLayers], { xPercent: 100, opacity: 1 });
    if (preContainer) {
      gsap.set(preContainer, { xPercent: 0, opacity: 1 });
    }

    gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
    gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
    gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
    gsap.set(textInner, { yPercent: 0 });
  }, []);

  // Animate the icon (+ to ×)
  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    gsap.killTweensOf([icon, h, v]);
    if (opening) {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.45 }, 0)
        .to(v, { rotate: -45, duration: 0.45 }, 0);
    } else {
      gsap.timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.3 }, 0)
        .to(v, { rotate: 90, duration: 0.3 }, 0);
    }
  }, []);

  // Animate rolling text ("MENU" ↔ "CLOSE")
  const animateText = useCallback(
    (opening: boolean) => {
      const inner = textInnerRef.current;
      if (!inner) return;

      gsap.killTweensOf(inner);
      const closeLabel = lang === "vi" ? "ĐÓNG" : "CLOSE";
      const currentLabel = opening ? "MENU" : closeLabel;
      const targetLabel = opening ? closeLabel : "MENU";
      const cycles = 2;

      const seq: string[] = [currentLabel];
      let last = currentLabel;
      for (let i = 0; i < cycles; i++) {
        last = last === "MENU" ? closeLabel : "MENU";
        seq.push(last);
      }
      if (last !== targetLabel) seq.push(targetLabel);
      seq.push(targetLabel);

      setTextLines(seq);
      gsap.set(inner, { yPercent: 0 });

      const lineCount = seq.length;
      const finalShift = ((lineCount - 1) / lineCount) * 100;

      gsap.to(inner, {
        yPercent: -finalShift,
        duration: 0.4 + lineCount * 0.05,
        ease: "power4.out",
      });
    },
    [lang]
  );

  // Play opening Staggered prelayers & Bubble pill animations
  const playOpen = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!panel) return;

    busyRef.current = true;
    gsap.killTweensOf([panel, ...layers, ...bubbles, ...labels]);

    // Reset initial positions
    gsap.set(bubbles, { scale: 0, autoAlpha: 0, transformOrigin: "50% 50%" });
    gsap.set(labels, { y: 24, autoAlpha: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
      },
    });

    // Staggered prelayers entrance
    layers.forEach((layer, i) => {
      tl.fromTo(
        layer,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.45, ease: "power4.out" },
        i * 0.06
      );
    });

    const panelStartTime = layers.length ? (layers.length - 1) * 0.06 + 0.07 : 0;
    tl.fromTo(
      panel,
      { xPercent: 100 },
      { xPercent: 0, duration: 0.6, ease: "power4.out" },
      panelStartTime
    );

    // Staggered Bubble pills entrance
    const bubblesStartTime = panelStartTime + 0.2;
    bubbles.forEach((bubble, i) => {
      const delay = bubblesStartTime + i * 0.07;
      tl.to(
        bubble,
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
        },
        delay
      );
      if (labels[i]) {
        tl.to(
          labels[i],
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.45,
            ease: "power3.out",
          },
          delay + 0.08
        );
      }
    });
  }, []);

  // Play closing animation
  const playClose = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!panel) return;

    busyRef.current = true;
    gsap.killTweensOf([panel, ...layers, ...bubbles, ...labels]);

    // Animate bubble pills out fast
    gsap.to(labels, {
      y: 16,
      autoAlpha: 0,
      duration: 0.18,
      ease: "power3.in",
    });

    gsap.to(bubbles, {
      scale: 0.8,
      autoAlpha: 0,
      duration: 0.2,
      ease: "power3.in",
    });

    // Slide curtains and panel back to the right
    gsap.to([...layers, panel], {
      xPercent: 100,
      duration: 0.32,
      ease: "power3.in",
      stagger: 0.03,
      onComplete: () => {
        busyRef.current = false;
      },
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setIsOpen(target);

    if (target) {
      document.body.style.overflow = "hidden";
      playOpen();
    } else {
      document.body.style.overflow = "";
      playClose();
    }

    animateIcon(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateText]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setIsOpen(false);
      document.body.style.overflow = "";
      playClose();
      animateIcon(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateText]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // Dark mode toggle with radial wipe
  const handleToggleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    window.dispatchEvent(
      new CustomEvent("darkModeToggle", {
        detail: { x, y },
      })
    );

    toggleDarkMode();
  };

  const handleNavigate = (id: string) => {
    closeMenu();
    const targetPath = id === "home" ? `/${lang}` : `/${lang}/${id}`;

    if (pathname === targetPath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(targetPath);
    }
  };

  return (
    <>
      <style>{`
        /* Staggered Pre-layers */
        .header-prelayer {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 100%;
          transform: translateX(100%);
        }
        @media (min-width: 900px) {
          .bubble-pill-item {
            transform: rotate(var(--pill-rot, 0deg));
          }
          .bubble-pill-item:hover {
            transform: rotate(var(--pill-rot, 0deg)) scale(1.04);
            background: #d9ff3a !important;
            color: #11121c !important;
            box-shadow: 0 0 28px rgba(217, 255, 58, 0.4) !important;
          }
          .bubble-pill-item:hover .bubble-pill-num {
            color: #11121c !important;
            opacity: 0.9;
          }
          .bubble-pill-item:active {
            transform: rotate(var(--pill-rot, 0deg)) scale(0.97);
          }
        }
        @media (max-width: 899px) {
          .bubble-pill-item:hover {
            transform: scale(1.02);
            background: #d9ff3a !important;
            color: #11121c !important;
          }
          .bubble-pill-item:active {
            transform: scale(0.97);
          }
        }
        .header-social-item {
          transition: opacity 0.25s ease, color 0.25s ease;
        }
        .header-social-list:hover .header-social-item:not(:hover) {
          opacity: 0.35;
        }
      `}</style>

      {/* Floating Header Navigation (Bubble Menu Concept) */}
      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-[transform,opacity] duration-300 pointer-events-none ${
          showHeader || isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 flex items-center justify-between">
          {/* Left Bubble: Brand Logo Capsule */}
          <div className="bubble logo-bubble pointer-events-auto">
            <button
              onClick={() => handleNavigate("home")}
              aria-label="Homepage"
              className="group inline-flex items-center gap-2.5 sm:gap-3 h-11 sm:h-12 px-4 sm:px-5 rounded-full bg-card/85 backdrop-blur-xl border border-primary/25 shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(217,255,58,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden flex items-center justify-center bg-primary/20 border border-primary/40 shrink-0">
                <img
                  src="/assets/icons/logo.webp"
                  alt="Dino Péo"
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-foreground transition-colors group-hover:text-primary">
                {profileData.logo}
              </span>
            </button>
          </div>

          {/* Right Bubble: Controls Capsule (Theme Toggle + Staggered Menu Button) */}
          <div className="bubble controls-bubble pointer-events-auto flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={handleToggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-card/85 backdrop-blur-xl border border-primary/25 shadow-[0_4px_20px_rgba(0,0,0,0.35)] flex items-center justify-center text-foreground hover:text-primary transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_16px_rgba(217,255,58,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex items-center justify-center transition-transform duration-200">
                {darkMode ? (
                  <RiSunLine className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <RiMoonLine className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </span>
            </button>

            {/* Staggered Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="inline-flex items-center gap-2.5 h-11 sm:h-12 px-4 sm:px-5 rounded-full bg-card/85 backdrop-blur-xl border border-primary/25 shadow-[0_4px_20px_rgba(0,0,0,0.35)] text-foreground hover:text-primary transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(217,255,58,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Rolling Text (StaggeredMenu style) */}
              <span className="relative inline-block h-[1.1em] overflow-hidden whitespace-nowrap text-xs font-mono font-semibold uppercase tracking-wider text-current">
                <span ref={textInnerRef} className="flex flex-col leading-none">
                  {textLines.map((line, idx) => (
                    <span key={idx} className="block h-[1.1em] leading-none">
                      {line}
                    </span>
                  ))}
                </span>
              </span>

              {/* Animated Plus-Cross Icon (StaggeredMenu style) */}
              <span
                ref={iconRef}
                className="relative w-3.5 h-3.5 shrink-0 inline-flex items-center justify-center will-change-transform text-current"
                aria-hidden="true"
              >
                <span
                  ref={plusHRef}
                  className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
                />
                <span
                  ref={plusVRef}
                  className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Staggered Multi-Layer Curtain Prelayers (Staggered Menu Concept) */}
      <div
        ref={preLayersRef}
        className="fixed inset-0 pointer-events-none z-[250] overflow-hidden"
        aria-hidden="true"
      >
        <div className="header-prelayer bg-[#1a2300]" />
        <div className="header-prelayer bg-[#2c3d00]" />
        <div className="header-prelayer bg-[#161826]" />
      </div>

      {/* Main Staggered + Bubble Menu Overlay Panel */}
      <div
        ref={panelRef}
        id="bubble-staggered-panel"
        className={`fixed inset-0 z-[260] bg-[#11121c]/96 backdrop-blur-2xl text-neutral-100 flex flex-col justify-between overflow-y-auto select-none border-l border-primary/20 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Top Bar inside panel */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 flex items-center justify-between shrink-0">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 h-11 sm:h-12 px-4 sm:px-5 rounded-full bg-white/5 border border-primary/25 backdrop-blur-md">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden flex items-center justify-center bg-primary/20 border border-primary/40 shrink-0">
              <img
                src="/assets/icons/logo.webp"
                alt="Dino Péo"
                className="w-full h-full object-cover"
              />
            </span>
            <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-neutral-200">
              {profileData.logo}
            </span>
          </div>

          <button
            onClick={closeMenu}
            aria-label="Close navigation"
            className="inline-flex items-center gap-2.5 h-11 sm:h-12 px-4 sm:px-5 rounded-full bg-white/5 border border-primary/30 backdrop-blur-md text-primary font-mono text-xs uppercase font-semibold tracking-wider hover:bg-primary/20 hover:border-primary transition-all duration-200 cursor-pointer"
          >
            <span>{lang === "vi" ? "ĐÓNG" : "CLOSE"}</span>
            <span className="relative w-3.5 h-3.5 inline-flex items-center justify-center">
              <span className="absolute w-full h-[2px] bg-current rounded-full rotate-45" />
              <span className="absolute w-full h-[2px] bg-current rounded-full -rotate-45" />
            </span>
          </button>
        </div>

        {/* Center: Bubble Menu Pills Grid (Bubble Menu Concept) */}
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 flex-1 flex flex-col justify-center items-center">
          <p className="text-primary font-mono text-xs sm:text-sm tracking-[0.25em] uppercase mb-6 sm:mb-8 text-center opacity-80">
            {lang === "vi" ? "ĐIỀU HƯỚNG TRANG" : "NAVIGATION"}
          </p>

          <nav className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5 max-w-3xl">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.href}
                  ref={(el) => {
                    if (el) bubblesRef.current[index] = el;
                  }}
                  onClick={() => handleNavigate(item.href)}
                  style={
                    {
                      "--pill-rot": `${item.rotation}deg`,
                    } as React.CSSProperties
                  }
                  className={`bubble-pill-item group w-full rounded-full border px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between backdrop-blur-xl transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] cursor-pointer will-change-transform ${
                    isActive
                      ? "bg-primary/15 border-primary text-primary shadow-[0_0_20px_rgba(217,255,58,0.25)]"
                      : "bg-[#181926]/85 border-primary/20 text-neutral-100"
                  }`}
                >
                  <span
                    ref={(el) => {
                      if (el) labelRefs.current[index] = el;
                    }}
                    className="inline-flex items-center gap-3 sm:gap-4 will-change-transform"
                  >
                    {/* Active Route Emerald Indicator Dot */}
                    <span
                      className={`w-2 h-2 rounded-full bg-primary transition-all duration-300 ${
                        isActive
                          ? "opacity-100 scale-100 shadow-[0_0_8px_rgba(217,255,58,1)]"
                          : "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
                      }`}
                    />
                    <span className="text-xl sm:text-2xl md:text-3xl font-sans font-bold uppercase tracking-tight">
                      {toTitleCase(item.name)}
                    </span>
                  </span>

                  {/* Staggered Numbering (StaggeredMenu style) */}
                  <span className="bubble-pill-num font-mono text-xs sm:text-sm text-primary tracking-widest font-medium transition-colors">
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Staggered Socials & Contact Bar (Staggered Menu Concept) */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-4 border-t border-white/10 shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Socials List with Hover Isolation */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mr-1">
                Socials:
              </span>
              <ul className="header-social-list list-none m-0 p-0 flex items-center gap-2 sm:gap-3 flex-wrap">
                {profileData.socialLinks.map((social, idx) => (
                  <li key={idx} className="header-social-item">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 text-neutral-300 hover:text-primary text-xs font-mono transition-colors"
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Email Contact link */}
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
              <a
                href="mailto:phattranduy00@gmail.com"
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-primary transition-colors"
              >
                <FiMail className="w-3.5 h-3.5 text-primary" />
                <span>phattranduy00@gmail.com</span>
              </a>
              <span className="hidden md:inline text-neutral-600">•</span>
              <span className="hidden md:inline">© {new Date().getFullYear()} Dino Péo</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
