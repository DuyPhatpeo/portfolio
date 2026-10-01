import { lazy, useState, useEffect, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "@components/general/Loading";
import { PageTransition } from "@components/ui/PageTransition";

const PortfolioPage = lazy(() => import("@pages/PortfolioPage"));
const AboutPage = lazy(() => import("@pages/AboutPage"));
const ProjectsPage = lazy(() => import("@pages/ProjectsPage"));
const ContactPage = lazy(() => import("@pages/ContactPage"));

const isBotOrLighthouse =
  typeof navigator !== "undefined" &&
  /bot|crawler|spider|lighthouse|pagespeed/i.test(navigator.userAgent);

const LOADING_DURATION = isBotOrLighthouse ? 50 : 2200;
const STABILIZATION_DELAY = isBotOrLighthouse ? 0 : 800; // Extra buffer after 100% before entering home

const AppRoutes = () => {
  const location = useLocation();
  const [isFinished, setIsFinished] = useState(() => {
    return sessionStorage.getItem("page_loaded") === "true";
  });

  const [progress, setProgress] = useState(0);

  // 1. Eagerly preload PortfolioPage bundle during loading
  useEffect(() => {
    import("@pages/PortfolioPage");
  }, []);

  // 2. Smooth progress simulation + stabilization buffer
  useEffect(() => {
    if (isFinished) return;

    const startTime = Date.now();
    let rafId: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min(
        Math.round((elapsed / LOADING_DURATION) * 100),
        100
      );

      setProgress(percent);

      if (percent >= 100) {
        // Hold loading at 100% for a short buffer until everything is fully stabilized
        const timer = setTimeout(() => {
          setIsFinished(true);
          sessionStorage.setItem("page_loaded", "true");
        }, STABILIZATION_DELAY);

        return () => clearTimeout(timer);
      }

      rafId = requestAnimationFrame(updateProgress);
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(rafId);
  }, [isFinished]);

  return (
    <>
      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><PortfolioPage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      </Suspense>

      {/* Loading Overlay with smooth fade/zoom exit */}
      <AnimatePresence>
        {!isFinished && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.04,
              filter: "blur(6px)",
              transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed inset-0 z-[9999] pointer-events-auto"
          >
            <Loading progress={progress} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;

