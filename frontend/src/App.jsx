import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./components/landing/LandingPage";
import AuthLayout from "./components/auth/AuthLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./components/dashboard/DashboardHome";
import ChildProfiles from "./components/dashboard/ChildProfiles";

// TEMP: flip to false to restore the normal landing → login → dashboard
// flow. While true, the app skips straight to the dashboard so it's faster
// to iterate on dashboard UI without logging in every time.
const SKIP_AUTH_FOR_DEV = true;

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [dashboardPage, setDashboardPage] = useState("Overview");

  useEffect(() => {
    if (isAuthenticated) setShowAuth(false);
  }, [isAuthenticated]);

  if (loading) return null;

  if (SKIP_AUTH_FOR_DEV || isAuthenticated) {
    return (
      <DashboardLayout activePage={dashboardPage} onNavigate={setDashboardPage}>
        {dashboardPage === "Child Profiles" ? <ChildProfiles /> : <DashboardHome />}
      </DashboardLayout>
    );
  }

  return (
    <>
      <LandingPage onLoginClick={() => setShowAuth(true)} />
      <AnimatePresence>
        {showAuth && <AuthLayout onClose={() => setShowAuth(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}