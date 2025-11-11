import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// ✅ Lazy load trang Home
const PorfolioPage = lazy(() => import("../pages/PorfolioPage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <Routes>
        <Route path="/" element={<PorfolioPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
