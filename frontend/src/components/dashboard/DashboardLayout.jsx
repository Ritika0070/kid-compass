import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Compass,
  Home,
  Users,
  ClipboardList,
  Lightbulb,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: Home },
  { label: "Child Profiles", icon: Users },
  { label: "Assessments", icon: ClipboardList },
  { label: "Insights", icon: Lightbulb },
  { label: "Settings", icon: Settings },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#16A34A] to-[#15803D] text-white shadow-[0_6px_14px_rgba(22,163,74,0.35)]">
        <Compass size={22} strokeWidth={2.25} />
      </div>
      <div>
        <h1
          className="text-xl font-black leading-none text-[#14532D]"
          style={{ fontFamily: "'Baloo 2', cursive" }}
        >
          Kids Compass
        </h1>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
          Interest Map
        </p>
      </div>
    </div>
  );
}

function Sidebar({ user, logout, activePage, onNavigate, onClose }) {
  return (
    <aside className="flex h-full flex-col bg-white px-6 py-7">
      <Logo />

      <nav className="mt-10 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                onNavigate?.(item.label);
                onClose?.();
              }}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                isActive
                  ? "bg-[#EAF6EE] text-[#15803D]"
                  : "text-[#6B7280] hover:bg-[#F7F8F5] hover:text-[#1F2937]"
              }`}
            >
              <Icon size={18} strokeWidth={2.25} className={isActive ? "text-[#15803D]" : "text-[#9CA3AF]"} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-3 rounded-2xl border border-[#EEF1EA] bg-[#FAFBF8] p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCEFE1] text-sm font-black text-[#15803D]">
            {(user?.name || "P").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-[#111827]">{user?.name || "Parent"}</p>
            <p className="truncate text-xs font-medium text-[#9CA3AF]">{user?.email || "Logged in"}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-[#E5E7DF] bg-white text-sm font-bold text-[#4B5563] transition hover:bg-[#F7F8F5]"
        >
          <LogOut size={16} strokeWidth={2.25} />
          Log out
        </button>
      </div>
    </aside>
  );
}

export default function DashboardLayout({ children, activePage = "Overview", onNavigate }) {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3FAF3] to-[#FAFAF6] text-[#1F2933]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-[#EEF1EA] shadow-[8px_0_30px_rgba(15,23,42,0.03)] transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          user={user}
          logout={logout}
          activePage={activePage}
          onNavigate={onNavigate}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      <main className={`transition-all duration-300 ${sidebarOpen ? "lg:pl-72" : "lg:pl-0"}`}>
        <header className="sticky top-0 z-20 border-b border-[#EEF1EA] bg-white/90 px-5 py-5 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSidebarOpen((v) => !v)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7DF] bg-white text-[#4B5563] transition hover:bg-[#F7F8F5]"
                  aria-label="Toggle sidebar"
                >
                  <Menu size={18} strokeWidth={2.25} />
                </button>

                <span className="rounded-full bg-[#EAF6EE] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#15803D]">
                  {activePage}
                </span>
              </div>

              <h2
                className="text-3xl font-black tracking-tight text-[#111827] sm:text-4xl"
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                {activePage}
              </h2>
              <p className="mt-1 text-sm font-semibold text-[#8A93A1]">
                Manage profiles, assessments, and parent-ready insights.
              </p>
            </div>

            <div className="hidden items-center gap-3 rounded-2xl border border-[#EEF1EA] bg-gradient-to-br from-[#EAF6EE] to-white px-4 py-3 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCEFE1] text-sm font-black text-[#15803D]">
                {(user?.name || "P").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">Active Profile</p>
                <p className="text-sm font-black text-[#111827]">{user?.name || "Parent"}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-5 py-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
