import { motion } from "framer-motion";


const ocqw = (px) => `${((px / 1313) * 100).toFixed(3)}cqw`;
const ocqh = (px) => `${((px / 459) * 100).toFixed(3)}cqh`;

const hoverTransition = { type: "spring", stiffness: 450, damping: 32 };

const SLOT_WIDTH = 193;
const SLOT_HEIGHT = 324;
const SLOT_TOP = 29;
const SLOT_START_LEFT = 447;
const SLOT_GAP = 22;

const ICON_SIZE = 124; // px, read off Figma

const CARDS = [
  {
    icon: "/icon-progress-reports.png", // placeholder path — swap for your exported asset
    title: "Progress Reports",
    description: "Track your child's growth and development.",
  },
  {
    icon: "/icon-shield.png",
    title: "Safe & Private",
    description: "We protect your child's data with top security.",
  },
  {
    icon: "/icon-ai-insights.png",
    title: "AI-Powered Insights",
    description: "Get personalized insights about strengths and interests.",
  },
  {
    icon: "/icon-personalized-guidance.png",
    title: "Personalized Guidance",
    description: "Discover the best career paths for your child.",
  },
];

export default function ForParents({ onExploreClick }) {
  return (
    <>
      {/* ===========================
            Desktop / tablet — pixel-mapped from the Figma frame, same
            approach as LandingHero's AI-Powered Guidance card.
         =========================== */}
    
      <motion.div
        id="for-parents"
        className="relative hidden md:block mx-auto"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
        style={{
          width: "90%",
          aspectRatio: "1313 / 459",
          containerType: "size",
          backgroundColor: "#E0EDF2",
          borderRadius: "35px",
        }}
      >
        {/* Bunnies — estimated position (no panel coords for the image
            itself, only its own asset size 351.5x303). Bottom-anchored
            and bled slightly past the card edge, same idea as the bunny
            on the AI-Powered Guidance card. */}
        <img
          src="/parents-bunny.png"
          alt="Parent bunny with child"
          style={{
            position: "absolute",
            left: ocqw(0),
            bottom: ocqh(-4),
            height: ocqh(303),
            width: "auto",
            objectFit: "contain",
          }}
        />

        {/* Speech bubble — estimated position, same construction as the
            AI-Powered Guidance card's bubble. */}
        <div
          className="absolute"
          style={{
            left: ocqw(240),
            top: ocqh(190),
            width: ocqw(150),
            padding: `${ocqh(10)} ${ocqw(14)}`,
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <p
            className="m-0"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 600,
              fontSize: ocqw(12),
              lineHeight: 1.25,
              color: "#212020",
              textAlign: "center",
            }}
          >
            Let's discover <br /> your child's strengths together!
          </p>
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: ocqw(20),
              bottom: "-6px",
              width: "12px",
              height: "12px",
              backgroundColor: "#FFFFFF",
              transform: "rotate(45deg)",
            }}
          />
        </div>

        {/* Heading — Figma exact: (112, 45), Baloo 2 ExtraBold 40,
            letter-spacing -1%. */}
        <h2
          className="m-0 absolute"
          style={{
            left: ocqw(112),
            top: ocqh(30),
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800,
            fontSize: ocqw(40),
            letterSpacing: "-0.01em",
            color: "#212020",
            whiteSpace: "nowrap",
          }}
        >
          For Parents
        </h2>

        {/* Paragraph — Figma exact: (61, 87), width 308, Baloo 2 Medium
            18, line-height 20, letter-spacing -1%. */}
        <p
          className="m-0 absolute"
          style={{
            left: ocqw(61),
            top: ocqh(90),
            width: ocqw(308),
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 500,
            fontSize: ocqw(18),
            lineHeight: `${ocqh(20)}`,
            letterSpacing: "-0.01em",
            textAlign: "center",
            color: "#3A3A3A",
          }}
        >
          You are your child's biggest guide.
          <br />
          We give you the insights and tools
          <br />
          to support them every step of the way.
        </p>

        {/* 4 white slots — Figma exact positions/sizes, see constants
            above. */}
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            className="absolute flex flex-col items-center text-center"
            style={{
              left: ocqw(SLOT_START_LEFT + i * (SLOT_WIDTH + SLOT_GAP)),
              top: ocqh(SLOT_TOP),
              width: ocqw(SLOT_WIDTH),
              height: ocqh(SLOT_HEIGHT),
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              boxSizing: "border-box",
              padding: `${ocqh(28)} ${ocqw(18)}`,
            }}
          >
            {/* Icon — sized off ICON_SIZE only, NOT tied to the card's
                own width/height. display:block removes the default
                inline-image baseline gap that can make height changes
                look like they "aren't working." Bump ICON_SIZE above to
                resize every icon at once; edit per-card if you need one
                to differ. */}
            <img
              src={card.icon}
              alt=""
              style={{
                display: "block",
                width: ocqw(ICON_SIZE),
                height: ocqw(ICON_SIZE),
                objectFit: "contain",
                marginBottom: ocqh(18),
              }}
            />
            <p
              className="m-0"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 800,
                fontSize: ocqw(18),
                color: "#212020",
                lineHeight: 1.2,
              }}
            >
              {card.title}
            </p>
            <p
              className="m-0"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 500,
                fontSize: ocqw(13),
                color: "#3A3A3A",
                lineHeight: 1.35,
                marginTop: ocqh(8),
              }}
            >
              {card.description}
            </p>
          </div>
        ))}


        <motion.button
          type="button"
          onClick={onExploreClick}
          className="absolute flex items-center justify-center"
          initial={{ y: 0, boxShadow: "0px 0px 0 0 rgba(255,255,255,0)" }}
          whileHover={{
            y: `-${ocqh(5)}`,
            boxShadow: `0px ${ocqh(8)} 0 0 #7B4D8F`,
          }}
          whileTap={{
            y: 0,
            boxShadow: `0px ${ocqh(3)} 0 0 #7B4D8F`,
          }}
          transition={hoverTransition}
          style={{
            left: ocqw(614),
            top: ocqh(377),
            width: ocqw(360),
            height: ocqh(63),
            boxSizing: "border-box",
            backgroundColor: "#A070B9",
            border: `2px solid #82549A`,
            borderRadius: "30px",
            cursor: "pointer",
            gap: ocqw(10),
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          <span
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 700,
              fontSize: ocqw(21),
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
            }}
          >
            Explore Parent Dashboard
          </span>
          <svg
            width={ocqw(11)}
            height={ocqw(18)}
            viewBox="0 0 11 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1.5L9 9L1.5 16.5"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* ===========================
            Mobile — no Figma spec for this breakpoint, so this is a
            simplified stacked layout in the same style as the mobile
            feature cards elsewhere on the page: fixed px sizing (not
            cqw-scaled), single column, no absolute positioning.
         =========================== */}
      <motion.div
        className="flex md:hidden flex-col items-center text-center px-6 py-8"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        style={{ backgroundColor: "#E0EDF2", borderRadius: "24px" }}
      >
        <img
          src="/parents-bunny.png"
          alt="Parent bunny with child"
          style={{ height: "126px", width: "auto", objectFit: "contain", marginTop: "-8px" }}
        />

        <h2
          className="m-0"
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800,
            fontSize: "23px",
            color: "#212020",
            marginTop: "8px",
          }}
        >
          For Parents
        </h2>
        <p
          className="m-0"
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: 1.4,
            color: "#3A3A3A",
            marginTop: "8px",
            maxWidth: "290px",
          }}
        >
          You are your child's biggest guide. We give you the insights and
          tools to support them every step of the way.
        </p>

        <div className="grid grid-cols-2 gap-3 w-full mt-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center text-center"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: "16px 12px",
              }}
            >
              {/* Mobile icon — plain px, independent of the desktop
                  ICON_SIZE constant. Edit this width/height directly if
                  the mobile icons need a different size than desktop. */}
              <img
                src={card.icon}
                alt=""
                style={{
                  display: "block",
                  width: "56px",
                  height: "56px",
                  objectFit: "contain",
                  marginBottom: "7px",
                }}
              />
              <p
                className="m-0"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontWeight: 800,
                  fontSize: "12px",
                  color: "#212020",
                  lineHeight: 1.2,
                }}
              >
                {card.title}
              </p>
              <p
                className="m-0"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontWeight: 500,
                  fontSize: "10px",
                  color: "#3A3A3A",
                  lineHeight: 1.3,
                  marginTop: "4px",
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile CTA — kept as a simple tap-scale (no lift effect;
            there's no room for a peeking ledge at this size without it
            looking cramped). Change to the lift pattern above if you
            want parity with desktop. */}
        <motion.button
          type="button"
          onClick={onExploreClick}
          className="flex items-center justify-center"
          whileTap={{ scale: 0.97 }}
          transition={hoverTransition}
          style={{
            marginTop: "20px",
            padding: "14px 24px",
            gap: "8px",
            boxSizing: "border-box",
            backgroundColor: "#99C12F",
            border: "2px solid #B2D176",
            borderRadius: "999px",
          }}
        >
          <span
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 700,
              fontSize: "15px",
              color: "#FFFFFF",
            }}
          >
            Explore Parent Dashboard
          </span>
          <svg width="9" height="14" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.5 1.5L9 9L1.5 16.5"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </motion.div>
    </>
  );
}