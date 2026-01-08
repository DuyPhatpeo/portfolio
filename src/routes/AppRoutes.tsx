import { lazy, useState, useEffect } from "react";
import Loading from "../components/general/Loading";

const PortfolioPage = lazy(() => import("../pages/PortfolioPage"));

const LOADING_DURATION = 2000; // 2s là hợp lý

const AppRoutes = () => {
  const [loaded, setLoaded] = useState(() => {
    return sessionStorage.getItem("page_loaded") === "true";
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loaded) return;

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
        setLoaded(true);
        sessionStorage.setItem("page_loaded", "true");
        return;
      }

      rafId = requestAnimationFrame(updateProgress);
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(rafId);
  }, [loaded]);

  if (!loaded) {
    return <Loading progress={progress} />;
  }

  return <PortfolioPage />;
};

export default AppRoutes;
