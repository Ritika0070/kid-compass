import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./components/landing/LandingPage";
import AuthLayout from "./components/auth/AuthLayout";
import MainMenu from "./components/mainmenu/MainMenu";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./components/dashboard/DashboardHome";
import ChildProfiles from "./components/dashboard/ChildProfiles";
import Assessments from "./components/dashboard/Assessments";
import Insights from "./components/dashboard/Insights";
import Settings from "./components/dashboard/Settings";

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  // "menu" = the new Main Menu / world screen shown right after login.
  // "dashboard" = the existing sidebar dashboard system, opened from the menu.
  // Restored from sessionStorage so a page refresh stays where the user was,
  // instead of always bouncing back to the menu.
  const [view, setView] = useState(
    () => sessionStorage.getItem("kc-view") || "menu"
  );
  const [dashboardPage, setDashboardPage] = useState(
    () => sessionStorage.getItem("kc-dashboardPage") || "Overview"
  );
  const hasHandledInitialAuth = useRef(false);

  useEffect(() => {
    if (loading) return; // wait for AuthContext to finish restoring the session

    if (!hasHandledInitialAuth.current) {
      // First run after the session-restore check finishes. If a token was
      // already present, this is a refresh (not a fresh login) — leave
      // view/dashboardPage exactly as restored from sessionStorage above,
      // just make sure any leftover auth modal is closed.
      hasHandledInitialAuth.current = true;
      if (isAuthenticated) setShowAuth(false);
      return;
    }

    // Any change to isAuthenticated AFTER the initial check is a real
    // login (or logout) action happening live in this session — that's
    // when we actually want to jump to the main menu.
    if (isAuthenticated) {
      setShowAuth(false);
      setView("menu");
      setDashboardPage("Overview");
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    sessionStorage.setItem("kc-view", view);
  }, [view]);

  useEffect(() => {
    sessionStorage.setItem("kc-dashboardPage", dashboardPage);
  }, [dashboardPage]);

  if (loading) return null;

  if (isAuthenticated) {
    if (view === "menu") {
      return (
        <MainMenu
          onOpenDashboard={(page) => {
            if (page) setDashboardPage(page);
            setView("dashboard");
          }}
        />
      );
    }

    let pageContent;

    if (dashboardPage === "Child Profiles") {
      pageContent = <ChildProfiles />;
    } else if (dashboardPage === "Assessments") {
      pageContent = <Assessments onNavigate={setDashboardPage} />;
    } else if (dashboardPage === "Insights") {
      pageContent = <Insights onNavigate={setDashboardPage} />;
    } else if (dashboardPage === "Settings") {
      pageContent = <Settings onNavigate={setDashboardPage} />;
    } else {
      pageContent = <DashboardHome />;
    }

    return (
      <DashboardLayout
        activePage={dashboardPage}
        onNavigate={setDashboardPage}
        onBackToMenu={() => setView("menu")}
      >
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