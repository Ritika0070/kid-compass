import { useState } from "react";
import BackgroundDecor from "./BackgroundDecor";

/**
 * Pixel-accurate login screen, designed against a 1920×1080 canvas.
 *
 * The canvas width is computed as `min(100vw, 177.78vh)`, which locks the
 * true 1920:1080 ratio at all times, so cqw/cqh always scale identically
 * and nothing distorts.
 *
 * SETUP: copy these 2 files into your project's /public folder:
 *   bunny.png, info-ring.png
 * (background is a solid CSS color, so background.png is not needed)
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only for now — wire up real auth later
    console.log({ email, password });
  };

  // Convert a design px value (against 1920x1080) into container-query units
  const cqw = (px) => `${(px / 1920) * 100}cqw`;
  const cqh = (px) => `${(px / 1080) * 100}cqh`;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F9FBCA]">
      <BackgroundDecor />
      {/* ===========================
            Viewport Layer
         =========================== */}

      {/* Info Button */}
      <div
        className="absolute z-50"
        style={{
          top: "40px",
          right: "40px",
          width: "clamp(50px, 4vw, 80px)",
          aspectRatio: "1",
        }}
      >
        <img
          src="/info-ring.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
        />

        <span
          className="absolute inset-0 flex items-center justify-center text-gray-500"
          style={{
            fontFamily: "'Londrina Shadow', cursive",
            fontSize: "clamp(28px, 3vw, 50px)",
            lineHeight: 1,
          }}
        >
          i
        </span>
      </div>

      {/* ===========================
            1920x1080 Design Canvas
         =========================== */}

      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: "min(100vw,177.777vh)",
          aspectRatio: "1920 / 1080",
          transform: "translate(-50%, -50%) scale(1.20)",
          transformOrigin: "center center",
          containerType: "size",
          overflow: "visible",
        }}
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

          {/* Email — label X47 Y122, input follows with real vertical breathing room */}
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

          {/* Password — label X47 Y205, input pushed further down for clear separation */}
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

          {/* Submit — X170 Y319 W214 H48, drawn in pure CSS (no low-res image) */}
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
            className="absolute font-bold text-gray-800 underline underline-offset-2 hover:text-[#3A2A2E]"
            style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: cqw(25), left: cqw(447), top: cqh(398) }}
          >
            Sign Up
          </a>
        </form>
      </div>
    </div>
  );
}