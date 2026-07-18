import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import AuthLayout from "./components/auth/AuthLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./components/dashboard/DashboardHome";

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or a simple splash/spinner while localStorage is checked

  if (isAuthenticated) {
    return (
      <DashboardLayout>
        <DashboardHome />
      </DashboardLayout>
    );
  }

  return <AuthLayout />;
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;