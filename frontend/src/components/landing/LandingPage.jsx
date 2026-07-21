import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import LandingHero from "./LandingHero";
import FeatureCard from "./FeatureCard";
import HowItWorks from "./HowItWorks";

const FEATURES = [
  {
    icon: "/icon-gamepad.png",
    title: "Play & Explore",
    description: "Fun games and activities that helps us understand what you enjoy the most.",
    bg: "#ECF3B2",
  },
  {
    icon: "/icon-backpack.png",
    title: "Go on Adventures",
    description: "Fun games and activities that helps us understand what you enjoy the most.",
    bg: "#FDF0B4",
  },
  {
    icon: "/icon-magnifier.png",
    title: "We Collect Insights",
    description: "Fun games and activities that helps us understand what you enjoy the most.",
    bg: "#F1DCFA",
  },
];

export default function LandingPage({ onLoginClick }) {
  // Mobile hero tagline: same idea as the desktop version in LandingHero —
  // fades out fast (first 15% of scroll) and back in on scroll-up.
  const mobileHeroRef = useRef(null);
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileHeroRef,
    offset: ["start start", "end start"],
  });
  const rawMobileParagraphOpacity = useTransform(mobileScrollYProgress, [0, 0.15], [1, 0]);
  const mobileParagraphOpacity = useSpring(rawMobileParagraphOpacity, {
    stiffness: 300,
    damping: 30,
    mass: 0.3,
  });

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#FCF8DD" }}>
      {/* ===========================
            Desktop / tablet — full pixel-mapped hero + headline + CTA +
            feature cards, all in LandingHero.jsx
         =========================== */}
      <LandingHero onLoginClick={onLoginClick} />

      {/* ===========================
            Mobile hero — nav dropped, Login/Sign Up centered at top,
            fixed height so the image just crops in from the sides
            instead of shrinking vertically
         =========================== */}
      <section
        ref={mobileHeroRef}
        className="relative w-full overflow-hidden block md:hidden"
        style={{ height: "380px", borderRadius: "0 0 30px 30px" }}
      >
        <img
          src="/landscape-hero.png"
          alt="Bunny, cat and dog looking out over the valley"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "70% center" }}
        />

        {/* Headline stays overlaid on the image on mobile, just smaller */}
        <div className="absolute z-10" style={{ left: "20px", top: "80px", maxWidth: "80%" }}>
          <h1
            className="m-0"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 800,
              fontSize: "26px",
              lineHeight: 1.05,
              color: "#FFFFFF",
              textShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          >
            A happy mind
          </h1>
          <p
            className="m-0"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 800,
              fontSize: "24px",
              lineHeight: 1.05,
              color: "#d5f07e",
              textShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          >
            builds a bright future
          </p>

          {/* Tagline — smaller font for mobile, same fast-fade-on-scroll
              behavior as the desktop version, driven by mobileScrollYProgress
              above. */}
          <motion.p
            className="m-0"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 500,
              fontSize: "10px",
              lineHeight: 1.35,
              color: "#FFFFFF",
              textShadow: "0 2px 6px rgba(0,0,0,0.2)",
              marginTop: "8px",
              maxWidth: "220px",
              opacity: mobileParagraphOpacity,
            }}
          >
            This is a safe and fun place where children play,
            <br />
            explore, and discover themselves.
            <br />
            Our AI friend helps understand their strengths,
            <br />
            interests and emotions.
          </motion.p>
        </div>

        {/* Login / Sign Up — black outline only by default. No hover on
            mobile; red shadow + lift only appears while actively pressed,
            then springs back flat on release. */}
        <div
          className="absolute z-20 left-1/2"
          style={{ top: "20px", transform: "translateX(-50%)" }}
        >
          <motion.button
            type="button"
            onClick={onLoginClick}
            className="flex items-center justify-center"
            initial={{ x: 0, y: 0, boxShadow: "0px 0px 0 0 rgba(255,0,0,0)" }}
            whileTap={{ x: -3, y: -5, boxShadow: "5px 9px 0 0 #FF0000" }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            style={{
              padding: "10px 22px",
              boxSizing: "border-box",
              backgroundColor: "#FDFBEC",
              borderRadius: "999px",
              border: "2px solid #000000",
            }}
          >
            <span
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 800,
                fontSize: "14px",
                color: "#212020",
              }}
            >
              LOGIN / SIGN UP
            </span>
          </motion.button>
        </div>
      </section>

      {/* ===========================
            Below-hero content — this is where the decorative background
            pattern lives. It's placed here in normal document flow (not
            as a page-level background), so it starts exactly where the
            visible hero ends on either breakpoint — the other hero is
            display:none and takes up no space, so this div naturally
            lands right after whichever one rendered. Anything added here
            later will sit on top of the pattern as you scroll.
         =========================== */}
      <div
        style={{
          backgroundImage: "url(/decorative-map-bg.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "auto",
          minHeight: "500px",
        }}
      >
        {/* Mobile CTA + safe badge — stacked below the hero, normal flow.
            No mobile Figma spec yet for this part, so sizing/spacing
            here is a placeholder default, not pixel-matched. */}
        <div className="flex md:hidden flex-col items-center text-center px-6 pt-4 pb-4">
          <motion.button
            type="button"
            className="flex items-center justify-center"
            initial={{ x: 0, y: 0, boxShadow: "0px 0px 0 0 rgba(255,255,255,0)" }}
            whileTap={{ x: 1.5, y: -3, boxShadow: "-3px 5px 0 0 #FFFFFF" }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            style={{
              width: "220px",
              height: "48px",
              boxSizing: "border-box",
              backgroundColor: "#A2D542",
              borderRadius: "20px",
            }}
          >
            <span
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 800,
                fontSize: "15px",
                color: "#FCFEFA",
              }}
            >
              START YOUR JOURNEY
            </span>
          </motion.button>

          <div className="flex items-center gap-2 mt-3">
            <img src="/safe-icon.png" alt="" style={{ width: "14px", height: "14px" }} />
            <span
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 800,
                fontSize: "12px",
                color: "#212020",
                opacity: 0.75,
              }}
            >
              Safe. Private. Trusted by Parents.
            </span>
          </div>
        </div>

        {/* Mobile feature cards — stacked full width, same scroll-reveal.
            Fixed 12px gap; card height is intrinsic (no minHeight) since
            FeatureCard now uses fixed px sizing, so it's the same at
            every mobile width instead of stretching. */}
        <div className="flex md:hidden flex-col gap-3 px-6 pb-10">
          {FEATURES.map((f, i) => (
            <div key={f.title}>
              <FeatureCard {...f} index={i} />
            </div>
          ))}
        </div>

        <div className="relative -mt-12">
        <HowItWorks />
      </div>
      </div>
    </div>
  );
}