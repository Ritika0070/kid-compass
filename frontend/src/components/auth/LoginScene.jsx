import { useState } from "react";
import { motion } from "framer-motion";

// Accelerating ease-in (for things sliding OUT) and a confident ease-out-cubic
// (for things sliding IN) — shared timing language across all scenes.
const EASE_IN_ACCEL = [0.55, 0.055, 0.675, 0.19];
const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1];

// Login only ever exits toward Sign Up, and only ever re-enters when coming
// BACK from Sign Up or Verify (both treated the same: slide in from the left).
const groupVariants = {
  initial: (direction) =>
    direction === "signup-login" || direction === "verify-login"
      ? { x: "-70vw" }
      : { x: 0 },
  animate: (direction) => ({
    x: 0,
    transition:
      direction === "signup-login" || direction === "verify-login"
        ? { duration: 0.45, ease: EASE_OUT_CUBIC }
        : { duration: 0 },
  }),
  exit: (direction) => ({
    x: direction === "login-signup" ? "70vw" : 0,
    transition: { duration: 0.4, ease: EASE_IN_ACCEL },
  }),
};

export default function LoginScene({ onSignUp, direction }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only for now — wire up real auth later
    console.log({ email, password });
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    onSignUp?.();
  };

  // Convert a design px value (against 1920x1080) into container-query units
  const cqw = (px) => `${(px / 1920) * 100}cqw`;
  const cqh = (px) => `${(px / 1080) * 100}cqh`;

  return (
    <>
      {/* ===========================
            1920x1080 Design Canvas — desktop/tablet (md and up)
         =========================== */}
      <div
        className="absolute left-1/2 top-1/2 hidden md:block"
        style={{
          width: "min(120vw,213.333vh)",
          aspectRatio: "1920 / 1080",
          transform: "translate(-50%, -50%)",
          transformOrigin: "center center",
          containerType: "size",
          overflow: "visible",
        }}
      >
        {/* Bunny + card move as one rigid unit */}
        <motion.div
          className="absolute inset-0"
          custom={direction}
          variants={groupVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Bunny mascot — width-only sizing preserves its native aspect ratio */}
          <img
            src="/bunny.png"
            alt="Bunny mascot"
            className="absolute z-10 select-none pointer-events-none"
            style={{
              left: cqw(150),
              top: cqh(30),
              width: "auto",
              height: cqh(800),
              objectFit: "contain",
            }}
          />

          {/* Login card — 560x458, 8px border in #723D46 */}
          <form
            onSubmit={handleSubmit}
            className="absolute z-0 bg-[#FAF9F0] shadow-lg"
            style={{
              left: cqw(680),
              top: cqh(351),
              width: cqw(560),
              height: cqh(458),
              border: `${cqw(8)} solid #723D46`,
              borderRadius: cqw(25),
              boxSizing: "border-box",
            }}
          >
            {/* LOGIN — exact Figma coords: X189 Y10 W175 H95 */}
            <h1
              className="absolute text-center font-normal m-0"
              style={{
                fontFamily: "'Londrina Shadow', cursive",
                fontSize: cqw(80),
                lineHeight: cqh(95),
                left: cqw(189),
                top: cqh(10),
                width: cqw(175),
                height: cqh(95),
                color: "#000000",
                letterSpacing: "0%",
              }}
            >
              LOGIN
            </h1>

            {/* Email */}
            <label
              htmlFor="email"
              className="absolute text-gray-800"
              style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: cqw(30), left: cqw(47), top: cqh(122) }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="absolute rounded-full bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#A3D9A5] transition"
              style={{
                boxSizing: "border-box",
                left: cqw(43),
                top: cqh(168),
                width: cqw(468),
                height: cqh(33),
                padding: `0 ${cqw(20)}`,
                fontSize: cqw(16),
              }}
            />

            {/* Password */}
            <label
              htmlFor="password"
              className="absolute text-gray-800"
              style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: cqw(30), left: cqw(47), top: cqh(205) }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="absolute rounded-full bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#A3D9A5] transition"
              style={{
                boxSizing: "border-box",
                left: cqw(43),
                top: cqh(251),
                width: cqw(468),
                height: cqh(33),
                padding: `0 ${cqw(20)}`,
                fontSize: cqw(16),
              }}
            />

            {/* Submit */}
            <button
              type="submit"
              className="absolute flex items-center justify-center transition-transform duration-100 active:scale-95"
              style={{
                boxSizing: "border-box",
                left: cqw(170),
                top: cqh(319),
                width: cqw(214),
                height: cqh(48),
                backgroundColor: "#65FF65",
                border: `${cqw(2.5)} solid #FFFFFF`,
                borderRadius: cqh(24),
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              <span
                className="text-white"
                style={{
                  fontFamily: "'Londrina Solid', cursive",
                  fontSize: cqw(30),
                  lineHeight: 1,
                  pointerEvents: "none",
                }}
              >
                Submit
              </span>
            </button>

            <p
              className="absolute text-gray-700 underline underline-offset-2 m-0"
              style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: cqw(18), left: cqw(446), top: cqh(373) }}
            >
              New Here !
            </p>
            <a
              href="/signup"
              onClick={handleSignUpClick}
              className="absolute font-bold text-gray-800 underline underline-offset-2 hover:text-[#3A2A2E]"
              style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: cqw(25), left: cqw(447), top: cqh(398) }}
            >
              Sign Up
            </a>
          </form>
        </motion.div>
      </div>

      {/* ===========================
            Mobile layout (below md)
         =========================== */}
      <div className="flex md:hidden relative z-10 flex-col items-center justify-center w-full h-full px-6 py-8 gap-4">
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-[#FAF9F0] shadow-lg box-border"
            style={{
              border: "6px solid #723D46",
              borderRadius: "20px",
              padding: "24px 20px",
            }}
          >
            <h1
              className="text-center font-normal m-0 mb-5"
              style={{ fontFamily: "'Londrina Shadow', cursive", fontSize: "36px", color: "#000000" }}
            >
              LOGIN
            </h1>

            <label
              htmlFor="email-mobile"
              className="block text-gray-800 mb-1"
              style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "16px" }}
            >
              Email
            </label>
            <input
              id="email-mobile"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#A3D9A5] transition box-border mb-4"
              style={{ height: "44px", padding: "0 18px", fontSize: "16px" }}
            />

            <label
              htmlFor="password-mobile"
              className="block text-gray-800 mb-1"
              style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "16px" }}
            >
              Password
            </label>
            <input
              id="password-mobile"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#A3D9A5] transition box-border mb-6"
              style={{ height: "44px", padding: "0 18px", fontSize: "16px" }}
            />

            <button
              type="submit"
              className="flex items-center justify-center mx-auto transition-transform duration-100 active:scale-95"
              style={{
                width: "70%",
                height: "48px",
                backgroundColor: "#65FF65",
                border: "2px solid #FFFFFF",
                borderRadius: "24px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              <span
                className="text-white"
                style={{ fontFamily: "'Londrina Solid', cursive", fontSize: "18px", lineHeight: 1, pointerEvents: "none" }}
              >
                Submit
              </span>
            </button>

            <div className="text-center mt-4">
              <p
                className="text-gray-700 underline underline-offset-2 m-0"
                style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "14px" }}
              >
                New Here !
              </p>
              <a
                href="/signup"
                onClick={handleSignUpClick}
                className="font-bold text-gray-800 underline underline-offset-2 hover:text-[#3A2A2E]"
                style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "16px" }}
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}