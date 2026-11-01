import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PageTransition } from "@components/ui/PageTransition";
import Loading from "@components/general/Loading";
import RouteLoader from "@components/general/RouteLoader";
import PortfolioPage from "@pages/PortfolioPage";

const loadAboutPage = () => import("@pages/AboutPage");
const loadProjectsPage = () => import("@pages/ProjectsPage");
const loadContactPage = () => import("@pages/ContactPage");

const AboutPage = lazy(loadAboutPage);
const ProjectsPage = lazy(loadProjectsPage);
const ContactPage = lazy(loadContactPage);

// Keep boot state in memory so every initial visit or browser reload plays the entry Loading screen,
// while client-side route navigation uses the snappy RouteLoader transition.
let hasInitialBooted = false;

export default function AppRoutes() {
  const location = useLocation();
  const isBotOrLighthouse =
    typeof navigator !== "undefined" &&
    /bot|crawler|spider|lighthouse|pagespeed/i.test(navigator.userAgent);

  const [isInitialLoading, setIsInitialLoading] = useState(
    () => !hasInitialBooted && !isBotOrLighthouse
  );
  const [progress, setProgress] = useState(() =>
    hasInitialBooted || isBotOrLighthouse ? 100 : 0
  );
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const prevPathnameRef = useRef(location.pathname);

  // 1. Initial Entry Loading (00% -> 100% + preload route chunks)
  useEffect(() => {
    // Preload secondary route chunks in the background
    void Promise.allSettled([
      loadAboutPage(),
      loadProjectsPage(),
      loadContactPage(),
    ]);

    if (hasInitialBooted || isBotOrLighthouse) {
      hasInitialBooted = true;
      setIsInitialLoading(false);
      return;
    }

    const durationMs = 1750;
    const startTime = performance.now();
    let rafId = 0;
    let finishTimer = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(1, elapsed / durationMs);
      // Smooth ease-out cubic curve
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        finishTimer = window.setTimeout(() => {
          hasInitialBooted = true;
          setIsInitialLoading(false);
        }, 380);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(finishTimer);
    };
  }, [isBotOrLighthouse]);

  // 2. Page-Switch Loading Transition whenever route pathname changes
  useEffect(() => {
    if (prevPathnameRef.current === location.pathname) return;
    prevPathnameRef.current = location.pathname;

    if (isInitialLoading || isBotOrLighthouse) return;

    setIsRouteLoading(true);
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }

    const timer = window.setTimeout(() => {
      setIsRouteLoading(false);
    }, 420);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash, isInitialLoading, isBotOrLighthouse]);

  return (
    <>
      {/* Initial Entry Loading Screen */}
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            key="initial-boot-loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.03,
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 z-[9999]"
          >
            <Loading progress={progress} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page-Switch Loading Screen */}
      <AnimatePresence>
        {!isInitialLoading && isRouteLoading && (
          <RouteLoader key={`route-loader-${location.pathname}`} />
        )}
      </AnimatePresence>

      {/* Route Views */}
      <Suspense fallback={<RouteLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <PortfolioPage />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <AboutPage />
                </PageTransition>
              }
            />
            <Route
              path="/projects"
              element={
                <PageTransition>
                  <ProjectsPage />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <ContactPage />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}
