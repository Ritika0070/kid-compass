import { useState } from "react";

export default function SignUpScene({ onLogin, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, password });
    onSubmit?.();
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onLogin?.();
  };

  const cqw = (px) => `${(px / 1920) * 100}cqw`;
  const cqh = (px) => `${(px / 1080) * 100}cqh`;

  return (
    <>
      {/* Desktop / tablet */}
      <div
        className="absolute left-1/2 top-1/2 hidden md:block"
        style={{
          width: "min(100vw,177.777vh)",
          aspectRatio: "1920 / 1080",
          transform: "translate(-50%, -50%) scale(1.20)",
          transformOrigin: "center center",
          containerType: "size",
          overflow: "visible",
        }}
      >
        {/* Sleepy bunny draped over the top edge of the card */}
        <img
          src="/bunny-sleepy.png"
          alt="Sleepy bunny mascot"
          className="hidden md:block absolute z-10 select-none pointer-events-none"
          style={{
            left: cqw(535),
            top: cqh(-5),
            width: "auto",
            height: cqh(650),
            objectFit: "contain",
          }}
        />

        {/* Sign Up card — same 560x458 size as Login card */}
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
          {/* SIGN UP! — X143 Y10 W266 H95, Londrina Shadow 80px (exact from Figma) */}
          <h1
            className="font-normal m-0"
            style={{
              position: "absolute",
              fontFamily: "'Londrina Shadow', cursive",
              fontSize: cqw(80),
              lineHeight: cqh(95),
              left: cqw(143),
              top: cqh(10),
              width: cqw(266),
              height: cqh(95),
              color: "#000000",
              letterSpacing: "0%",
              whiteSpace: "nowrap",
            }}
          >
            SIGN UP!
          </h1>

          {/* Name — label X45 Y105 (flush with title bottom), input X46 Y147 W468 H33 (exact) */}
          <label
            htmlFor="name"
            className="absolute text-gray-800"
            style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: cqw(30), left: cqw(45), top: cqh(103) }}
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="absolute rounded-full bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#A3D9A5] transition"
            style={{
              boxSizing: "border-box",
              left: cqw(46),
              top: cqh(147),
              width: cqw(468),
              height: cqh(33),
              padding: `0 ${cqw(20)}`,
              fontSize: cqw(16),
            }}
          />

          {/* Email — same 42px label→input gap, ~11px input→label gap as Name */}
          <label
            htmlFor="signup-email"
            className="absolute text-gray-800"
            style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: cqw(30), left: cqw(45), top: cqh(183) }}
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="absolute rounded-full bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#A3D9A5] transition"
            style={{
              boxSizing: "border-box",
              left: cqw(46),
              top: cqh(229),
              width: cqw(468),
              height: cqh(33),
              padding: `0 ${cqw(20)}`,
              fontSize: cqw(16),
            }}
          />

          {/* Password — same spacing pattern */}
          <label
            htmlFor="signup-password"
            className="absolute text-gray-800"
            style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: cqw(30), left: cqw(45), top: cqh(266) }}
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="absolute rounded-full bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#A3D9A5] transition"
            style={{
              boxSizing: "border-box",
              left: cqw(46),
              top: cqh(311),
              width: cqw(468),
              height: cqh(33),
              padding: `0 ${cqw(20)}`,
              fontSize: cqw(16),
            }}
          />

          {/* Submit — X168 Y372, same 214x48 size as Login, just lower */}
          <button
            type="submit"
            className="absolute flex items-center justify-center transition-transform duration-100 active:scale-95"
            style={{
              boxSizing: "border-box",
              left: cqw(168),
              top: cqh(372),
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

          {/* Already a User! / LOGIN — exact same position/font/size as Login's New Here!/Sign Up */}
          <p
            className="absolute text-gray-700 underline underline-offset-2 m-0"
            style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: cqw(15), left: cqw(430), top: cqh(379) }}
          >
            Already a User !
          </p>
          <a
            href="/login"
            onClick={handleLoginClick}
            className="absolute font-bold text-gray-800 underline underline-offset-2 hover:text-[#3A2A2E]"
            style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: cqw(22), left: cqw(448), top: cqh(403) }}
          >
            LOGIN
          </a>
        </form>
      </div>

      {/* Mobile layout (below md) */}
      <div className="flex md:hidden relative z-10 flex-col items-center justify-center w-full h-full px-6 py-8 gap-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-[#FAF9F0] shadow-lg box-border relative"
          style={{
            border: "6px solid #723D46",
            borderRadius: "20px",
            padding: "24px 20px",
            marginTop: "50px",
          }}
        >
        

          <h1
            className="text-center font-normal m-0 mb-4"
            style={{ fontFamily: "'Londrina Shadow', cursive", fontSize: "32px", color: "#000000" }}
          >
            SIGN UP!
          </h1>

          <label htmlFor="name-mobile" className="block text-gray-800 mb-1" style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "16px" }}>
            Name
          </label>
          <input
            id="name-mobile"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-full bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#A3D9A5] transition box-border mb-3"
            style={{ height: "44px", padding: "0 18px", fontSize: "16px" }}
          />

          <label htmlFor="email-mobile-su" className="block text-gray-800 mb-1" style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "16px" }}>
            Email
          </label>
          <input
            id="email-mobile-su"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#A3D9A5] transition box-border mb-3"
            style={{ height: "44px", padding: "0 18px", fontSize: "16px" }}
          />

          <label htmlFor="password-mobile-su" className="block text-gray-800 mb-1" style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "16px" }}>
            Password
          </label>
          <input
            id="password-mobile-su"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-full bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-[#A3D9A5] transition box-border mb-5"
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
            <span className="text-white" style={{ fontFamily: "'Londrina Solid', cursive", fontSize: "18px", lineHeight: 1, pointerEvents: "none" }}>
              Submit
            </span>
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-700 underline underline-offset-2 m-0" style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "14px" }}>
              Already a User !
            </p>
            <a
              href="/login"
              onClick={handleLoginClick}
              className="font-bold text-gray-800 underline underline-offset-2 hover:text-[#3A2A2E]"
              style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "16px" }}
            >
              LOGIN
            </a>
          </div>
        </form>
      </div>
    </>
  );
}