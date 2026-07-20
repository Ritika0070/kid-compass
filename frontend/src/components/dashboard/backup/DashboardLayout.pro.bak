import BackgroundDecor from "../shared/BackgroundDecor";
import { useAuth } from "../../hooks/useAuth";

export default function DashboardLayout({ children }) {
  const { logout } = useAuth();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F9FBCA]">
      <BackgroundDecor />

      <button
        onClick={logout}
        className="absolute top-8 right-8 z-50 px-5 py-2 rounded-full text-white transition-transform active:scale-95"
        style={{
          backgroundColor: "#723D46",
          fontFamily: "'Inria Sans', sans-serif",
          fontSize: "16px",
        }}
      >
        Logout
      </button>

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}