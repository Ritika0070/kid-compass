import { useState } from "react";
import { motion } from "framer-motion";
import { authApi } from "../../services/api";

const cardVariants = {
  initial: {
    opacity: 0,
    x: 60,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -60,
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

export default function SignUpScene({ onLogin, onSubmit, onClose, onInfoClick }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    try {
      setSubmitting(true);
      await authApi.signup({ name, email, password });
      onSubmit?.();
    } catch (err) {
      setError(err.message || "Could not create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onLogin?.();
  };

  return (
    <>
      {/* Desktop / tablet */}
      <div className="absolute inset-0 z-10 hidden items-center justify-center px-5 py-8 md:flex">
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative grid w-full max-w-5xl overflow-hidden bg-[#fffdf3] shadow-2xl md:grid-cols-[1.05fr_1fr]"
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

          <form onSubmit={handleSubmit} className="flex min-h-[560px] flex-col justify-center px-6 py-6 sm:px-12">
            <div className="mx-auto w-full max-w-md">
              <p
                className="mb-2 ml-1.5 text-sm font-bold uppercase tracking-[0.16em] text-[#7b6a46]"
                style={{ fontFamily: "'Inria Sans', sans-serif" }}
              >
                Sign up
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
                Create your account
              </h1>

              <p
                className="mb-4 mt-3 text-[#6a6257]"
                style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "16px" }}
              >
                Start your Kid Compass journey in a few seconds.
              </p>

              {error && (
                <div className="mb-4 rounded-2xl border border-[#ffb3a8] bg-[#fff0ed] px-4 py-3 text-sm text-[#9b2d1f]">
                  {error}
                </div>
              )}

              <label className="mb-2 block text-sm font-bold text-[#2b2b2b]" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                className="mb-3 h-12 w-full rounded-2xl border border-[#ded8c6] bg-white px-4 text-base outline-none transition focus:border-[#8bbd3f] focus:ring-4 focus:ring-[#dff2b8]"
                required
              />

              <label className="mb-2 block text-sm font-bold text-[#2b2b2b]" htmlFor="signup-email">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3 h-12 w-full rounded-2xl border border-[#ded8c6] bg-white px-4 text-base outline-none transition focus:border-[#8bbd3f] focus:ring-4 focus:ring-[#dff2b8]"
                required
              />

              <label className="mb-2 block text-sm font-bold text-[#2b2b2b]" htmlFor="signup-password">
                Password
              </label>
              <div className="mb-4 flex h-12 w-full items-center rounded-2xl border border-[#ded8c6] bg-white focus-within:border-[#8bbd3f] focus-within:ring-4 focus-within:ring-[#dff2b8]">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Minimum 6 characters"
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
                {submitting ? "Creating account..." : "Create account"}
              </button>

              <div className="mt-4 text-center text-sm text-[#6a6257]">
                Already have an account?{" "}
                <a href="/login" onClick={handleLoginClick} className="font-bold text-[#1f7a4d] underline underline-offset-4">
                  Log in
                </a>
              </div>
            </div>
          </form>

          <div className="relative hidden min-h-[560px] overflow-hidden bg-[#f8e9ff] md:block">
            <img
              src="/decorative-map-bg.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-x-10 top-10">
              <p
                className="m-0 text-sm font-bold uppercase tracking-[0.18em] text-[#6f5177]"
                style={{ fontFamily: "'Inria Sans', sans-serif" }}
              >
                Safe and playful
              </p>
              <h2
                className="mt-4 max-w-sm text-[#2d2630]"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontSize: "42px",
                  lineHeight: 1,
                  fontWeight: 800,
                }}
              >
                Build a colorful learning profile.
              </h2>
            </div>
            <img
              src="/sign_up.png"
              alt="Bunny mascot"
              className="absolute bottom-[-35px] right-[-20px] h-[450px] select-none object-contain"
            />
          </div>
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
            aria-label="Close sign up panel"
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
              Sign up
            </p>

            <h1
              className="m-0 text-[#1f1f1f]"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontSize: "30px",
                lineHeight: 1,
                fontWeight: 800,
              }}
            >
              Create your account
            </h1>

            <p
              className="mb-4 mt-2 text-sm text-[#6a6257]"
              style={{ fontFamily: "'Inria Sans', sans-serif" }}
            >
              Start your Kid Compass journey in a few seconds.
            </p>

            {error && (
              <div className="mb-3 rounded-2xl border border-[#ffb3a8] bg-[#fff0ed] px-3 py-2 text-xs text-[#9b2d1f]">
                {error}
              </div>
            )}

            <label className="mb-1 block text-xs font-bold text-[#2b2b2b]" htmlFor="name-mobile">
              Name
            </label>
            <input
              id="name-mobile"
              type="text"
              value={name}
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              className="mb-3 h-11 w-full rounded-2xl border border-[#ded8c6] bg-white px-4 text-sm outline-none transition focus:border-[#8bbd3f] focus:ring-4 focus:ring-[#dff2b8]"
              required
            />

            <label className="mb-1 block text-xs font-bold text-[#2b2b2b]" htmlFor="signup-email-mobile">
              Email
            </label>
            <input
              id="signup-email-mobile"
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 h-11 w-full rounded-2xl border border-[#ded8c6] bg-white px-4 text-sm outline-none transition focus:border-[#8bbd3f] focus:ring-4 focus:ring-[#dff2b8]"
              required
            />

            <label className="mb-1 block text-xs font-bold text-[#2b2b2b]" htmlFor="signup-password-mobile">
              Password
            </label>
            <div className="mb-4 flex h-11 w-full items-center rounded-2xl border border-[#ded8c6] bg-white focus-within:border-[#8bbd3f] focus-within:ring-4 focus-within:ring-[#dff2b8]">
              <input
                id="signup-password-mobile"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Minimum 6 characters"
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
              {submitting ? "Creating account..." : "Create account"}
            </button>

            <div className="mt-4 text-center text-xs text-[#6a6257]">
              Already have an account?{" "}
              <a href="/login" onClick={handleLoginClick} className="font-bold text-[#1f7a4d] underline underline-offset-4">
                Log in
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}