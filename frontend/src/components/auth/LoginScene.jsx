import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { authApi } from "../../services/api";

const cardVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction === "signup-login" ? -60 : 0,
    y: direction === "signup-login" ? 0 : 24,
    scale: 0.98,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: 60,
    scale: 0.98,
    transition: { duration: 0.25, ease: [0.55, 0.055, 0.675, 0.19] },
  },
};

const mobileCardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: { duration: 0.25, ease: [0.55, 0.055, 0.675, 0.19] },
  },
};

export default function LoginScene({ onSignUp, direction, notice, onClose, onInfoClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setSubmitting(true);
      const data = await authApi.login({ email, password });
      login(data.token, data.user);
    } catch (err) {
      setError(err.message || "Could not log in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    onSignUp?.();
  };

  return (
    <>
      {/* Desktop / tablet */}
      <div className="absolute inset-0 z-10 hidden items-center justify-center px-5 py-8 md:flex">
        <motion.div
          custom={direction}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative grid w-full max-w-5xl overflow-hidden bg-[#fffdf3] shadow-2xl md:grid-cols-[1fr_1.05fr]"
          style={{
            borderRadius: "28px",
            border: "1px solid rgba(114, 61, 70, 0.14)",
            boxShadow: "0 24px 80px rgba(54, 35, 20, 0.22)",
          }}
        >
          <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={onInfoClick}
              aria-label="Open disclaimer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ded8c6] bg-white/90 text-sm font-black text-[#5f584f] shadow-sm transition hover:bg-[#f3efd9] active:scale-95"
              style={{ fontFamily: "'Inria Sans', sans-serif" }}
            >
              i
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close login panel"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ded8c6] bg-white/90 text-lg font-black text-[#41372f] shadow-sm transition hover:bg-[#f3efd9] active:scale-95"
              style={{ fontFamily: "'Inria Sans', sans-serif" }}
            >
              ×
            </button>
          </div>

          <div className="relative hidden min-h-[560px] overflow-hidden bg-[#eef7c9] md:block">
            <img
              src="/decorative-map-bg.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-35"
            />
            <div className="absolute inset-x-10 top-10">
              <p
                className="m-0 text-sm font-bold uppercase tracking-[0.18em] text-[#6b5a35]"
                style={{ fontFamily: "'Inria Sans', sans-serif" }}
              >
                Kid Compass
              </p>
              <h2
                className="mt-4 max-w-sm text-[#263221]"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontSize: "42px",
                  lineHeight: 1,
                  fontWeight: 800,
                }}
              >
                Welcome back to your bright journey.
              </h2>
            </div>
            <img
              src="/bunny.png"
              alt="Bunny mascot"
              className="absolute bottom-[-30px] left-[-40px] h-[440px] select-none object-contain"
            />
          </div>

          <form onSubmit={handleSubmit} className="flex min-h-[560px] flex-col justify-center px-6 py-10 sm:px-12">
            <div className="mx-auto w-full max-w-md">
              <p
                className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[#7b6a46]"
                style={{ fontFamily: "'Inria Sans', sans-serif" }}
              >
                Login
              </p>

              <h1
                className="m-0 text-[#1f1f1f]"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontSize: "clamp(34px, 5vw, 52px)",
                  lineHeight: 1,
                  fontWeight: 800,
                }}
              >
                Welcome back
              </h1>

              <p
                className="mb-7 mt-3 text-[#6a6257]"
                style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "16px" }}
              >
                Log in to continue to your dashboard.
              </p>

              {notice && (
                <div className="mb-4 rounded-2xl border border-[#b7d96a] bg-[#f1ffd2] px-4 py-3 text-sm text-[#42591f]">
                  {notice}
                </div>
              )}

              {error && (
                <div className="mb-4 rounded-2xl border border-[#ffb3a8] bg-[#fff0ed] px-4 py-3 text-sm text-[#9b2d1f]">
                  {error}
                </div>
              )}

              <label className="mb-2 block text-sm font-bold text-[#2b2b2b]" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="mb-5 h-12 w-full rounded-2xl border border-[#ded8c6] bg-white px-4 text-base outline-none transition focus:border-[#8bbd3f] focus:ring-4 focus:ring-[#dff2b8]"
                required
              />

              <label className="mb-2 block text-sm font-bold text-[#2b2b2b]" htmlFor="password">
                Password
              </label>
              <div className="mb-6 flex h-12 w-full items-center rounded-2xl border border-[#ded8c6] bg-white focus-within:border-[#8bbd3f] focus-within:ring-4 focus-within:ring-[#dff2b8]">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-full min-w-0 flex-1 rounded-2xl bg-transparent px-4 text-base outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="mr-2 rounded-xl px-3 py-2 text-sm font-bold text-[#5d573e] hover:bg-[#f3efd9]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="h-12 w-full rounded-2xl bg-[#1f7a4d] text-base font-bold text-white shadow-lg transition hover:bg-[#17643e] active:scale-[0.99]"
              >
                {submitting ? "Logging in..." : "Log in"}
              </button>

              <div className="mt-6 text-center text-sm text-[#6a6257]">
                New here?{" "}
                <a href="/signup" onClick={handleSignUpClick} className="font-bold text-[#1f7a4d] underline underline-offset-4">
                  Create account
                </a>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Mobile — its own compact card, no image panel, no info icon, no scroll needed */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 py-6 md:hidden">
        <motion.div
          variants={mobileCardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full max-w-sm overflow-hidden bg-[#fffdf3] shadow-2xl"
          style={{
            borderRadius: "22px",
            border: "1px solid rgba(114, 61, 70, 0.14)",
            boxShadow: "0 18px 50px rgba(54, 35, 20, 0.2)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close login panel"
            className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#ded8c6] bg-white/90 text-lg font-black text-[#41372f] shadow-sm transition hover:bg-[#f3efd9] active:scale-95"
            style={{ fontFamily: "'Inria Sans', sans-serif" }}
          >
            ×
          </button>

          <form onSubmit={handleSubmit} className="flex flex-col px-6 pb-7 pt-11">
            <p
              className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#7b6a46]"
              style={{ fontFamily: "'Inria Sans', sans-serif" }}
            >
              Login
            </p>

            <h1
              className="m-0 text-[#1f1f1f]"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontSize: "32px",
                lineHeight: 1,
                fontWeight: 800,
              }}
            >
              Welcome back
            </h1>

            <p
              className="mb-4 mt-2 text-sm text-[#6a6257]"
              style={{ fontFamily: "'Inria Sans', sans-serif" }}
            >
              Log in to continue to your dashboard.
            </p>

            {notice && (
              <div className="mb-3 rounded-2xl border border-[#b7d96a] bg-[#f1ffd2] px-3 py-2 text-xs text-[#42591f]">
                {notice}
              </div>
            )}

            {error && (
              <div className="mb-3 rounded-2xl border border-[#ffb3a8] bg-[#fff0ed] px-3 py-2 text-xs text-[#9b2d1f]">
                {error}
              </div>
            )}

            <label className="mb-1 block text-xs font-bold text-[#2b2b2b]" htmlFor="email-mobile">
              Email
            </label>
            <input
              id="email-mobile"
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 h-11 w-full rounded-2xl border border-[#ded8c6] bg-white px-4 text-sm outline-none transition focus:border-[#8bbd3f] focus:ring-4 focus:ring-[#dff2b8]"
              required
            />

            <label className="mb-1 block text-xs font-bold text-[#2b2b2b]" htmlFor="password-mobile">
              Password
            </label>
            <div className="mb-4 flex h-11 w-full items-center rounded-2xl border border-[#ded8c6] bg-white focus-within:border-[#8bbd3f] focus-within:ring-4 focus-within:ring-[#dff2b8]">
              <input
                id="password-mobile"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                className="h-full min-w-0 flex-1 rounded-2xl bg-transparent px-4 text-sm outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="mr-1.5 shrink-0 rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#5d573e] hover:bg-[#f3efd9]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="h-11 w-full rounded-2xl bg-[#1f7a4d] text-sm font-bold text-white shadow-lg transition hover:bg-[#17643e] active:scale-[0.99]"
            >
              {submitting ? "Logging in..." : "Log in"}
            </button>

            <div className="mt-4 text-center text-xs text-[#6a6257]">
              New here?{" "}
              <a href="/signup" onClick={handleSignUpClick} className="font-bold text-[#1f7a4d] underline underline-offset-4">
                Create account
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}