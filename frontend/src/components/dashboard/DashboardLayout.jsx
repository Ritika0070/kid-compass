import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const navItems = ["Overview", "Child Profiles", "Assessments", "Insights", "Settings"];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#123524]">
        <div className="absolute h-8 w-8 rounded-full border-2 border-[#dff5d1]" />
        <div className="absolute h-5 w-2 rotate-45 rounded-full bg-[#9bd35a]" />
        <div className="absolute h-5 w-2 -rotate-[135deg] rounded-full bg-white" />
        <div className="absolute h-2 w-2 rounded-full bg-[#123524]" />
      </div>

      <div>
        <h1
          className="text-2xl font-black leading-none text-[#123524]"
          style={{ fontFamily: "'Baloo 2', cursive" }}
        >
          Kids Compass
        </h1>
        <p className="mt-1 text-sm font-semibold text-[#667085]">Interest Map</p>
      </div>
    </div>
  );
}

function Sidebar({ user, logout, activePage, onNavigate, onClose }) {
  return (
    <aside className="flex h-full flex-col bg-white px-6 py-7">
      <Logo />

      <nav className="mt-10 space-y-2">
        {navItems.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              onNavigate?.(item);
              onClose?.();
            }}
            className={`w-full rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
              activePage === item
                ? "bg-[#e8f5dc] text-[#1f7a4d]"
                : "text-[#5f6673] hover:bg-[#f5f7f2] hover:text-[#111827]"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="rounded-2xl border border-[#e4e7df] bg-[#fafbf8] p-4">
          <p className="truncate text-sm font-black text-[#111827]">{user?.name || "Parent"}</p>
          <p className="mt-1 truncate text-xs font-medium text-[#667085]">
            {user?.email || "Logged in"}
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="mt-3 h-11 w-full rounded-xl border border-[#d8ddd1] bg-white text-sm font-bold text-[#4b5563] transition hover:bg-[#f3f4ef]"
        >
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
    <div className="min-h-screen bg-[#f7f8f4] text-[#1f2933]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-[#e2e7da] shadow-xl transition-transform duration-300 ${
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
        <header className="sticky top-0 z-20 border-b border-[#123524] bg-[#123524] px-5 py-5 shadow-[0_10px_30px_rgba(18,53,36,0.18)] lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSidebarOpen((value) => !value)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                  aria-label="Toggle sidebar"
                >
                  <span className="flex flex-col gap-1">
                    <span className="block h-0.5 w-5 rounded-full bg-current" />
                    <span className="block h-0.5 w-5 rounded-full bg-current" />
                    <span className="block h-0.5 w-5 rounded-full bg-current" />
                  </span>
                </button>

                <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#dff5d1]">
                  {activePage}
                </span>
              </div>

              <h2
                className="text-3xl font-black tracking-tight text-white sm:text-4xl"
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                {activePage}
              </h2>

              <p className="mt-1 text-sm font-semibold text-[#c8dac2]">
                Manage profiles, assessments, and parent-ready insights.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#c8dac2]">
                Active Profile
              </p>
              <p className="mt-1 text-sm font-black text-white">{user?.name || "Parent"}</p>
            </div>
          </div>
        </header>

        <div className="px-5 py-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
