import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./components/landing/LandingPage";
import AuthLayout from "./components/auth/AuthLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./components/dashboard/DashboardHome";

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  // The moment login succeeds, close the auth overlay in the background.
  // Without this, showAuth stays true forever, and logging out later
  // (isAuthenticated flips back to false) would re-show the Login screen
  // instead of the plain landing page, since showAuth was never reset.
  useEffect(() => {
    if (isAuthenticated) {
      setShowAuth(false);
    }
  }, [isAuthenticated]);

  if (loading) return null;

  if (isAuthenticated) {
    return (
      <DashboardLayout>
        <DashboardHome />
      </DashboardLayout>
    );
  }

  return (
    <>
      {/* Landing page stays mounted underneath at all times now — the auth
          flow no longer replaces it. Instead AuthLayout renders on top as
          a blurred overlay, so the landing page itself shows through
          behind the login card instead of a separate solid background. */}
      <LandingPage onLoginClick={() => setShowAuth(true)} />

      <AnimatePresence>
        {showAuth && <AuthLayout />}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;