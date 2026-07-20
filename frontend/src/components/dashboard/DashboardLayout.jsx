import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const navItems = ["Overview", "Child Profiles", "Assessments", "Insights", "Settings"];

function LogoMark({ collapsed = false }) {
  return (
    <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1f7a4d] text-lg font-black text-white shadow-[0_10px_24px_rgba(31,122,77,0.22)]">
        <span className="tracking-tight">KC</span>
        <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#9bd35a]" />
      </div>

      {!collapsed && (
        <div className="min-w-0">
          <h1
            className="truncate text-[28px] font-extrabold leading-none text-[#1f7a4d]"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            Kid Compass
          </h1>
          <p className="mt-1 text-sm font-semibold text-[#6b7280]">Parent Dashboard</p>
        </div>
      )}
    </div>
  );
}

function Sidebar({ collapsed, onToggle, user, logout }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 hidden border-r border-[#e4e7df] bg-white px-5 py-6 shadow-[12px_0_40px_rgba(31,41,55,0.04)] transition-all duration-300 lg:block ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <LogoMark collapsed={collapsed} />

        {!collapsed && (
          <button
            type="button"
            onClick={onToggle}
            aria-label="Collapse sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e4e7df] bg-[#fbfcf8] text-xl font-black text-[#4b5563] transition hover:bg-[#eef7e8]"
          >
            ‹
          </button>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          onClick={onToggle}
          aria-label="Open sidebar"
          className="mx-auto mt-6 flex h-10 w-10 items-center justify-center rounded-xl border border-[#e4e7df] bg-[#fbfcf8] text-xl font-black text-[#4b5563] transition hover:bg-[#eef7e8]"
        >
          ›
        </button>
      )}

      <nav className="mt-10 space-y-2">
        {navItems.map((item, index) => (
          <button
            key={item}
            title={collapsed ? item : undefined}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
              index === 0
                ? "bg-[#eaf6df] text-[#1f7a4d] shadow-sm"
                : "text-[#58606c] hover:bg-[#f6f7f4] hover:text-[#111827]"
            } ${collapsed ? "justify-center px-0" : ""}`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                index === 0 ? "bg-white text-[#1f7a4d]" : "bg-[#f3f4ef] text-[#6b7280]"
              }`}
            >
              {item
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </span>

            {!collapsed && <span>{item}</span>}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-5 right-5">
        {!collapsed ? (
          <>
            <div className="rounded-2xl border border-[#e4e7df] bg-[#fafbf8] p-4">
              <p className="truncate text-sm font-extrabold text-[#263238]">
                {user?.name || "Parent"}
              </p>
              <p className="mt-1 truncate text-xs font-medium text-[#6b7280]">
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
          </>
        ) : (
          <button
            type="button"
            onClick={logout}
            title="Log out"
            className="flex h-11 w-full items-center justify-center rounded-xl border border-[#d8ddd1] bg-white text-xs font-black text-[#4b5563] transition hover:bg-[#f3f4ef]"
          >
            OUT
          </button>
        )}
      </div>
    </aside>
  );
}

export default function DashboardLayout({ children }) {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const collapsed = !sidebarOpen;

  return (
    <div className="min-h-screen bg-[#f6f7f4] text-[#1f2933]">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setSidebarOpen((value) => !value)}
        user={user}
        logout={logout}
      />

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-[#e4e7df] bg-white px-5 py-6 shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <LogoMark />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e4e7df] bg-[#fbfcf8] text-lg font-black text-[#4b5563]"
          >
            ×
          </button>
        </div>

        <nav className="mt-10 space-y-2">
          {navItems.map((item, index) => (
            <button
              key={item}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                index === 0
                  ? "bg-[#eaf6df] text-[#1f7a4d]"
                  : "text-[#58606c] hover:bg-[#f6f7f4]"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-5 right-5">
          <div className="rounded-2xl border border-[#e4e7df] bg-[#fafbf8] p-4">
            <p className="truncate text-sm font-extrabold text-[#263238]">{user?.name || "Parent"}</p>
            <p className="mt-1 truncate text-xs font-medium text-[#6b7280]">{user?.email || "Logged in"}</p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="mt-3 h-11 w-full rounded-xl border border-[#d8ddd1] bg-white text-sm font-bold text-[#4b5563]"
          >
            Log out
          </button>
        </div>
      </div>

      <main className={`transition-all duration-300 ${collapsed ? "lg:pl-24" : "lg:pl-72"}`}>
        <header className="sticky top-0 z-20 border-b border-[#e1e7da] bg-white/85 px-5 py-5 shadow-[0_8px_28px_rgba(31,41,55,0.05)] backdrop-blur-xl lg:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e4e7df] bg-white text-lg font-black text-[#4b5563] lg:hidden"
                >
                  ☰
                </button>

                <button
                  type="button"
                  onClick={() => setSidebarOpen((value) => !value)}
                  className="hidden h-9 items-center gap-2 rounded-xl border border-[#e4e7df] bg-white px-3 text-sm font-bold text-[#4b5563] transition hover:bg-[#f3f4ef] lg:flex"
                >
                  {collapsed ? "Open menu" : "Close menu"}
                </button>

                <span className="rounded-full bg-[#eaf6df] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#1f7a4d]">
                  Overview
                </span>

                <span className="rounded-full bg-[#f6f7f4] px-3 py-1 text-xs font-bold text-[#6b7280]">
                  Current interests, not career predictions
                </span>
              </div>

              <h2
                className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl"
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                Dashboard Overview
              </h2>

              <p className="mt-1 text-sm font-medium text-[#6b7280]">
                Track assessment progress, interest domains, and parent-ready insights.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-[#e4e7df] bg-[#fbfcf8] px-4 py-3 sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b7280]">
                Active Profile
              </p>
              <p className="mt-1 text-sm font-extrabold text-[#111827]">
                {user?.name || "Parent"}
              </p>
            </div>
          </div>
        </header>

        <div className="px-5 py-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
