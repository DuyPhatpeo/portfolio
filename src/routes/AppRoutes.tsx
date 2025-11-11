import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// ✅ Lazy load trang Home
const HomePage = lazy(() => import("../pages/HomPage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
