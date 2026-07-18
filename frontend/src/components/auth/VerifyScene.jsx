import { useState } from "react";
import OTPInput from "./OTPInput";

export default function VerifyScene({ onLogin, onSubmit }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ code });
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
        {/* Left bunny */}
        <img
          src="/bunny-verify-left.png"
          alt="Bunny mascot cheering"
          className="absolute z-10 select-none pointer-events-none"
          style={{ left: cqw(150), top: cqh(30), width: "auto", height: cqh(800), objectFit: "contain" }}
        />

        {/* Right bunny */}
        <img
          src="/bunny-verify-right.png"
          alt="Bunny mascot giving thumbs up"
          className="absolute z-10 select-none pointer-events-none"
          style={{ left: cqw(1330), top: cqh(30), width: "auto", height: cqh(800), objectFit: "contain" }}
        />

        {/* Verify card — same 560x458 size/position as Login and Sign Up */}
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
          {/* VERIFY! */}
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
              whiteSpace: "nowrap",
            }}
          >
            VERIFY!
          </h1>

          {/* Subtitle */}
          <p
            className="absolute text-gray-800 m-0"
            style={{
              fontFamily: "'Inria Sans', sans-serif",
              fontSize: cqw(30),
              left: cqw(58),
              top: cqh(125),
              width: cqw(443),
              height: cqh(36),
            }}
          >
            A 6 digit code is sent to your Email
          </p>

          {/* Code label + OTP boxes, one flex row */}
          <div
            className="absolute flex items-center"
            style={{ left: cqw(40), top: cqh(194), height: cqh(48), gap: cqw(10) }}
          >
            <span
              className="text-gray-800 whitespace-nowrap"
              style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: cqw(30) }}
            >
              Code –
            </span>
            <OTPInput
              length={6}
              value={code}
              onChange={setCode}
              gap={cqw(10)}
              boxStyle={{
                width: cqw(47),
                height: cqh(48),
                borderRadius: cqw(15),
                fontSize: cqw(20),
                fontFamily: "'Inria Sans', sans-serif",
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="absolute flex items-center justify-center transition-transform duration-100 active:scale-95"
            style={{
              boxSizing: "border-box",
              left: cqw(173),
              top: cqh(287),
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
              style={{ fontFamily: "'Londrina Solid', cursive", fontSize: cqw(30), lineHeight: 1, pointerEvents: "none" }}
            >
              Submit
            </span>
          </button>

          {/* Already a User! / LOGIN */}
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
          className="w-full max-w-sm bg-[#FAF9F0] shadow-lg box-border"
          style={{ border: "6px solid #723D46", borderRadius: "20px", padding: "24px 20px" }}
        >
          <h1
            className="text-center font-normal m-0 mb-3"
            style={{ fontFamily: "'Londrina Shadow', cursive", fontSize: "32px", color: "#000000" }}
          >
            VERIFY!
          </h1>

          <p
            className="text-center text-gray-800 m-0 mb-5"
            style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "14px" }}
          >
            A 6 digit code is sent to your Email
          </p>

          <div className="flex items-center justify-center w-full mb-6" style={{ gap: "clamp(4px, 1.5vw, 8px)" }}>
            <span
              className="text-gray-800 whitespace-nowrap"
              style={{ fontFamily: "'Inria Sans', sans-serif", fontSize: "clamp(12px, 3.5vw, 16px)" }}
            >
              Code –
            </span>
            <OTPInput
              length={6}
              value={code}
              onChange={setCode}
              gap="clamp(4px, 1.5vw, 8px)"
              boxStyle={{
                width: "clamp(26px, 8vw, 36px)",
                height: "clamp(30px, 9vw, 40px)",
                borderRadius: "clamp(8px, 3vw, 12px)",
                fontSize: "clamp(13px, 3.5vw, 16px)",
                fontFamily: "'Inria Sans', sans-serif",
              }}
            />
          </div>

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