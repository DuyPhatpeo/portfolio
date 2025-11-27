import { lazy, useState, useEffect } from "react";
import Loading from "../components/general/Loading";

// Lazy load trang Portfolio
const PortfolioPage = lazy(() => import("../pages/PortfolioPage"));

const AppRoutes = () => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Giả lập loading 0 → 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoaded(true); // sau khi 100% mới render PortfolioPage
          return 100;
        }
        return prev + 1;
      });
    }, 100);
  }, []);

  if (!loaded) {
    // Khi chưa load xong, hiển thị Loading
    return <Loading progress={progress} />;
  }

  // Khi đã 100%, render PortfolioPage
  return <PortfolioPage />;
};

export default AppRoutes;
