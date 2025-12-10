import { lazy, useState, useEffect } from "react";
import Loading from "../components/general/Loading";

const PortfolioPage = lazy(() => import("../pages/PortfolioPage"));

const AppRoutes = () => {
  // Kiểm tra xem đã load trong phiên hiện tại chưa
  const [loaded, setLoaded] = useState(() => {
    return sessionStorage.getItem("page_loaded") === "true";
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Nếu đã load trong phiên hiện tại → bỏ qua loading
    if (loaded) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoaded(true);

          // Đánh dấu đã load cho phiên này
          sessionStorage.setItem("page_loaded", "true");

          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [loaded]);

  if (!loaded) {
    return <Loading progress={progress} />;
  }

  return <PortfolioPage />;
};

export default AppRoutes;
