import BackgroundDecor from "../BackgroundDecor";
import AuthFlow from "./AuthFlow";

export default function AuthLayout() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F9FBCA]">
      <BackgroundDecor />

      {/* Info Button — lives here permanently, outside any scene, never animates */}
      <div
        className="absolute z-50 hidden md:block"
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

      <AuthFlow />
    </div>
  );
}