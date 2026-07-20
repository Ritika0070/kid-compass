import { motion } from "framer-motion";

const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1];

const panelVariants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: EASE_OUT_CUBIC } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.18, ease: "easeIn" } },
};

// Each point now has an emoji, a short bold headline, and a lighter detail line,
// plus its own accent color so the panel doesn't read as one flat block of text.
const DEFAULT_POINTS = [
  {
    icon: "🔮",
    title: "Not a career predictor",
    text: "Shows your child's current interests, not future outcomes.",
    color: "#E4572E",
  },
  {
    icon: "🩺",
    title: "Not a diagnostic tool",
    text: "Doesn't assess mental health, learning, or development.",
    color: "#2A9D8F",
  },
  {
    icon: "📸",
    title: "A snapshot, not a verdict",
    text: "One session is limited — interests change as kids grow.",
    color: "#3D5A80",
  },
  {
    icon: "🔒",
    title: "Your data, protected",
    text: "Camera/mic used only with consent, never stored.",
    color: "#6A4C93",
  },
  {
    icon: "✨",
    title: "AI-generated insights",
    text: "Meant to spark conversation, not serve as expert judgment.",
    color: "#F2A541",
  },
];

export default function DisclaimerPanel({ onClose, points = DEFAULT_POINTS }) {
  const cqw = (px) => `${(px / 1920) * 100}cqw`;
  const cqh = (px) => `${(px / 1080) * 100}cqh`;

  return (
    <>
      {/* Full-screen invisible click-catcher — closes the panel on outside click */}
      <div className="fixed inset-0 z-40 hidden md:block" onClick={onClose} />

      {/* Same 1920x1080 canvas scaling pattern as every other scene */}
      <div
        className="absolute left-1/2 top-1/2 z-40 hidden md:block"
        style={{
          width: "min(120vw,213.333vh)",
          aspectRatio: "1920 / 1080",
          transform: "translate(-50%, -50%)",
          transformOrigin: "center center",
          containerType: "size",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <motion.div
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="absolute shadow-lg"
          style={{
            left: cqw(265),
            top: cqh(150),
            width: cqw(1390),
            height: cqh(780),
            border: `${cqw(8)} solid #723D46`,
            borderRadius: cqw(30),
            background: "#f5fbd18a",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxSizing: "border-box",
            pointerEvents: "auto",
          }}
        >
          {/* Close (X) */}
          <div
            onClick={onClose}
            className="absolute cursor-pointer"
            style={{
              right: cqw(40),
              top: cqh(35),
              width: "clamp(50px, 4vw, 80px)",
              aspectRatio: "1",
              pointerEvents: "auto",
              zIndex: 2,
            }}
          >
            <img
              src="/info-ring.png"
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
            />
            <span
              className="absolute inset-0 flex items-center justify-center"
              style={{
                fontFamily: "'Londrina Shadow', cursive",
                fontSize: "clamp(28px, 3vw, 50px)",
                lineHeight: 1,
                color: "#FF0000",
              }}
            >
              X
            </span>
          </div>

          {/* DISCLAIMER title */}
          <h2
            className="absolute text-center font-normal m-0"
            style={{
              fontFamily: "'Londrina Shadow', cursive",
              fontSize: cqw(80),
              left: 0,
              top: cqh(35),
              width: "100%",
              color: "#141414",
              textDecoration: "underline",
              textDecorationThickness: cqw(3),
              textUnderlineOffset: cqw(10),
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            DISCLAIMER
          </h2>

          {/* Point cards — icon bubble + bold colored title + detail line */}
          <div
            className="absolute"
            style={{
              left: cqw(120),
              top: cqh(180),
              width: cqw(1150),
              display: "flex",
              flexDirection: "column",
              gap: cqh(18),
              zIndex: 1,
            }}
          >
            {points.map((point, i) => (
              <div
                key={i}
                className="flex items-start"
                style={{
                  gap: cqw(25),
                  background: "rgba(255,255,255,0.55)",
                  borderRadius: cqw(16),
                  padding: `${cqh(10)} ${cqw(20)}`,
                  borderLeft: `${cqw(7)} solid ${point.color}`,
                }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: cqw(60),
                    height: cqw(60),
                    borderRadius: "50%",
                    background: point.color,
                    fontSize: cqw(26),
                  }}
                >
                  {point.icon}
                </div>
                <div>
                  <p
                    className="m-0"
                    style={{
                      fontFamily: "'Inria Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: cqw(34),
                      color: point.color,
                      lineHeight: 1.15,
                    }}
                  >
                    {point.title}
                  </p>
                  <p
                    className="m-0"
                    style={{
                      fontFamily: "'Inria Sans', sans-serif",
                      fontSize: cqw(25),
                      color: "#3A2E2E",
                      lineHeight: 1.2,
                      marginTop: cqh(2),
                    }}
                  >
                    {point.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}