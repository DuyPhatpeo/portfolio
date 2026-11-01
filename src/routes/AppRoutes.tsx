import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { PageTransition } from "@components/ui/PageTransition";
import Loading from "@components/general/Loading";
import PortfolioPage from "@pages/PortfolioPage";

const loadAboutPage = () => import("@pages/AboutPage");
const loadProjectsPage = () => import("@pages/ProjectsPage");
const loadContactPage = () => import("@pages/ContactPage");

const AboutPage = lazy(loadAboutPage);
const ProjectsPage = lazy(loadProjectsPage);
const ContactPage = lazy(loadContactPage);

// On-demand chunk prefetcher invoked only on menu open/hover so initial load stays lean
export function prefetchRoutes(target?: "about" | "projects" | "contact") {
  if (target === "about") {
    void loadAboutPage();
    return;
  }
  if (target === "projects") {
    void loadProjectsPage();
    return;
  }
  if (target === "contact") {
    void loadContactPage();
    return;
  }
  void Promise.allSettled([
    loadAboutPage(),
    loadProjectsPage(),
    loadContactPage(),
  ]);
}

let hasInitialBooted = false;

export default function AppRoutes() {
  const location = useLocation();
  const [isInitialLoading, setIsInitialLoading] = useState(
    () => !hasInitialBooted
  );
  const [isExitingLoader, setIsExitingLoader] = useState(false);
  const [progress, setProgress] = useState(() => (hasInitialBooted ? 100 : 0));
  const prevPathnameRef = useRef(location.pathname);

  // Ultra-snappy initial entry loader (~0.42s) without blocking network or main thread
  useEffect(() => {
    if (hasInitialBooted) {
      setIsInitialLoading(false);
      return;
    }

    const durationMs = 360;
    const startTime = performance.now();
    let rafId = 0;
    let exitTimer = 0;
    let unmountTimer = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        exitTimer = window.setTimeout(() => {
          setIsExitingLoader(true);
          unmountTimer = window.setTimeout(() => {
            hasInitialBooted = true;
            setIsInitialLoading(false);
          }, 150);
        }, 40);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  // Reset scroll position instantly on client-side page switches (unless jumping to a hash)
  useEffect(() => {
    if (prevPathnameRef.current === location.pathname) return;
    prevPathnameRef.current = location.pathname;

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      {isInitialLoading && (
        <Loading progress={progress} exiting={isExitingLoader} />
      )}

      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <PageTransition key={location.pathname}>
                <PortfolioPage />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition key={location.pathname}>
                <AboutPage />
              </PageTransition>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransition key={location.pathname}>
                <ProjectsPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition key={location.pathname}>
                <ContactPage />
              </PageTransition>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}
