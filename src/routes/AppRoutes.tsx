import { lazy, useState, useEffect } from "react";
import Loading from "../components/general/Loading";

const PortfolioPage = lazy(() => import("../pages/PortfolioPage"));

const AppRoutes = () => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(
    localStorage.getItem("app_loaded") === "true"
  );

  useEffect(() => {
    // Nếu đã load trước đó → bỏ qua loading
    if (loaded) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoaded(true);
          localStorage.setItem("app_loaded", "true"); // đánh dấu đã load
          return 100;
        }
        return prev + 1;
      });
    }, 100);
  }, [loaded]);

  if (!loaded) {
    return <Loading progress={progress} />;
  }

  return <PortfolioPage />;
};

export default AppRoutes;
