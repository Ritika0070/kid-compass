import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./components/landing/LandingPage";
import AuthLayout from "./components/auth/AuthLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./components/dashboard/DashboardHome";
import ChildProfiles from "./components/dashboard/ChildProfiles";
import Assessments from "./components/dashboard/Assessments";
import Insights from "./components/dashboard/Insights";
import Settings from "./components/dashboard/Settings";

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [dashboardPage, setDashboardPage] = useState("Overview");

  useEffect(() => {
    if (isAuthenticated) setShowAuth(false);
  }, [isAuthenticated]);

  if (loading) return null;

  if (isAuthenticated) {
    let pageContent;

    if (dashboardPage === "Child Profiles") {
      pageContent = <ChildProfiles />;
    } else if (dashboardPage === "Assessments") {
      pageContent = <Assessments />;
    } else if (dashboardPage === "Insights") {
      pageContent = <Insights onNavigate={setDashboardPage} />;
    } else if (dashboardPage === "Settings") {
      pageContent = <Settings onNavigate={setDashboardPage} />;
    } else {
      pageContent = <DashboardHome />;
    }

    return (
      <DashboardLayout activePage={dashboardPage} onNavigate={setDashboardPage}>
        {pageContent}
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
