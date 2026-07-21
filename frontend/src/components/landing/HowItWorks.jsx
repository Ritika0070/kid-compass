import { motion } from "framer-motion";

const STEPS = [
  {
    number: 1,
    title: "Play Games",
    description: "Your child plays fun and engaging games and activities.",
    image: "/bunny-playing.png",
    bg: "#F5F5C3",
    stroke: "#D6DE91",
    badgeBg: "#A1C711",
    imageHeight: 270,
    imageTop: 117,
    imageLeft: 50, // % from card's left edge — 50 = centered
  },
  {
    number: 2,
    title: "AI Learns<br/>About You",
    description: "Our AI friend analyzes your child's choices, strengths and interests.",
    image: "/bunny-learning.png",
    bg: "#FDF0BF",
    stroke: "#F9E3A7",
    badgeBg: "#ECB735",
    imageHeight: 320,
    imageTop: 100,
    imageLeft: 34,
  },
  {
  number: 3,
  title: "Discover Your Path",
  description: "We help your child discover different career paths that match their unique personality.",
  image: "/bunny-path.png",

  bg: "#F3E6ED",
  stroke: "#D7C4DB",
  badgeBg: "#A070B9",

  imageHeight: 330,
  imageTop: 60,
  imageLeft: 87,

  titleWidth: 180,
  descriptionWidth: 125,
  descriptionAlign: "left",
  descriptionLeft: 10,
},
];

// Card dimensions
const CARD_WIDTH = 272;      // 247 → 272 (about 10% wider)
const CARD_HEIGHT = 369;
const CARD_RADIUS = 32;

// Gap between cards
const CARD_GAP = 125;        // Change this to 80, 100, 120, 140...

export default function HowItWorks() {
  return (
    <section className="w-full px-4 md:px-8 py-14 md:py-24">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
        <h2
          className="m-0"
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800,
            fontSize: "clamp(30px, 5vw, 48px)",
            color: "#212020",
          }}
        >
          How It Works
        </h2>
        <p
          className="m-0"
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 500,
            fontSize: "16px",
            color: "#3A3A3A",
            marginTop: "4px",
            lineHeight: 1.4,
          }}
        >
          Our fun and smart process helps your child discover their
          <br /> passions and a path that's perfect for them.
        </p>
      </div>

      {/* Cards — stacks on mobile, 3-across from md up */}
      <div
        className="flex justify-center flex-nowrap mx-auto"
        style={{
          gap: `${CARD_GAP}px`,
        }}
      >
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            className="relative"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: i * 0.12, ease: [0.33, 1, 0.68, 1] }}
            style={{
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              backgroundColor: step.bg,
              borderRadius: `${CARD_RADIUS}px`,
              border: `2px solid ${step.stroke}`,
              boxSizing: "border-box",
              overflow: "visible", // lets each image spill outside without clipping
              flexShrink: 0,
            }}
          >
            {/* Numbered badge — 42x42, centered horizontally, top edge overlapping the card */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                top: "-21px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: step.badgeBg,
              }}
            >
              <span
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontWeight: 800,
                  fontSize: "18px",
                  color: "#FFFFFF",
                }}
              >
                {step.number}
              </span>
            </div>

            {/* Text block — normal flow, so description reflows below the
                title automatically no matter how many lines it wraps to */}
            <div
              style={{
                paddingTop: "42px",
                paddingLeft: "24px",
                paddingRight: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <p
              className="m-0"
              style={{
                width: `${step.titleWidth ?? 200}px`,
                textAlign: step.descriptionAlign ?? "center",

                fontFamily: "'Baloo 2', cursive",
                fontWeight: 800,
                fontSize: "24px",
                lineHeight: "25px",
                color: "#212020",
              }}
              dangerouslySetInnerHTML={{ __html: step.title }}
            />

              <p
              className="m-0"
              style={{
                marginTop: "12px",
                width: `${step.descriptionWidth ?? 165}px`,
                marginLeft: step.descriptionAlign === "left" ? `${step.descriptionLeft}px` : "auto",
                marginRight: step.descriptionAlign === "left" ? "auto" : "auto",
                textAlign: step.descriptionAlign ?? "center",

                fontFamily: "'Baloo 2', cursive",
                fontWeight: 500,
                fontSize: "15px",
                lineHeight: "20px",
                color: "#3A3A3A",
              }}
            >
              {step.description}
            </p>
            </div>

            {/* Image — absolutely positioned per-card, with independent
                height, vertical offset, and now horizontal offset too. */}
            <img
              src={step.image}
              alt=""
              style={{
                position: "absolute",
                top: `${step.imageTop}px`,
                left: `${step.imageLeft ?? 50}%`,
                transform: "translateX(-50%)",
                height: `${step.imageHeight}px`,
                width: "auto",
                maxWidth: "none",
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}