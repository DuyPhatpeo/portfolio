import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@components/ui/PageTransition";
import PortfolioPage from "@pages/PortfolioPage";
const AboutPage = lazy(() => import("@pages/AboutPage"));
const ProjectsPage = lazy(() => import("@pages/ProjectsPage"));
const ContactPage = lazy(() => import("@pages/ContactPage"));
export default function AppRoutes() {
  const location = useLocation();
  return <Suspense fallback={<div role="status" className="min-h-screen grid place-items-center">Đang tải…</div>}>
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><PortfolioPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  </Suspense>;
}
