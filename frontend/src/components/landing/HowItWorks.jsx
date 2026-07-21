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
    imageLeft: 50,
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
    imageHeight: 320,
    imageTop: 70,
    imageLeft: 85,
    titleWidth: 180,
    descriptionWidth: 125,
    descriptionAlign: "left",
    descriptionLeft: 10,
  },
];

// Native design was built at a 272x369 card. Every internal offset below is
// expressed as a % of the CARD'S OWN WIDTH ("cqw" = container query width
// units), computed as (originalPx / 272) * 100. Because the card's
// aspect-ratio is locked to 272/369, scaling the width by any factor s also
// scales the height by s automatically — so a value expressed as %-of-width
// scales identically to how it would if you'd scaled the original px value
// by s directly. That reproduces the hand-tuned 1440px design pixel-for-
// pixel at any card size, with zero JS and zero transform tricks.
const cqw = (px) => `${((px / 272) * 100).toFixed(2)}cqw`;

// Card width itself scales with viewport, same pattern as the heading above
// (clamp(30px, 5vw, 48px)): 272px at a 1440px viewport = 18.9vw.
const CARD_WIDTH_EXPR = "clamp(190px, 18.9vw, 460px)";
const CARD_ASPECT_RATIO = "272 / 369";
const CARD_GAP_EXPR = "clamp(20px, 8vw, 125px)";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full px-4 md:px-8 py-14 md:py-24">
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

      {/* Stacks on mobile (flex-col), row on md+. Gap scales with viewport
          via clamp() instead of a fixed 125px that only made sense at 1440. */}
      <div
        className="flex flex-col md:flex-row items-center md:items-stretch justify-center mx-auto"
        style={{ gap: CARD_GAP_EXPR, maxWidth: "1400px" }}
      >
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            // This div is the "container" that cqw units below resolve
            // against — it's the ONLY place width is ever set in px/vw.
            style={{
              containerType: "inline-size",
              width: CARD_WIDTH_EXPR,
              aspectRatio: CARD_ASPECT_RATIO,
              flexShrink: 0,
            }}
          >
            {/* motion.div: animation ONLY, exactly like FeatureCard.
                No transform/scale set here, so nothing conflicts with
                Framer Motion's own transform management. */}
            <motion.div
              className="relative w-full h-full"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.33, 1, 0.68, 1] }}
              style={{
                backgroundColor: step.bg,
                borderRadius: cqw(32),
                border: `${cqw(2)} solid ${step.stroke}`,
                boxSizing: "border-box",
                overflow: "visible",
              }}
            >
              {/* Badge */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  top: cqw(-21),
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: cqw(42),
                  height: cqw(42),
                  borderRadius: "50%",
                  backgroundColor: step.badgeBg,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Baloo 2', cursive",
                    fontWeight: 800,
                    fontSize: cqw(18),
                    color: "#FFFFFF",
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Text block */}
              <div
                style={{
                  paddingTop: cqw(42),
                  paddingLeft: cqw(24),
                  paddingRight: cqw(24),
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
                    width: cqw(step.titleWidth ?? 200),
                    textAlign: step.descriptionAlign ?? "center",
                    fontFamily: "'Baloo 2', cursive",
                    fontWeight: 800,
                    fontSize: cqw(24),
                    lineHeight: cqw(25),
                    color: "#212020",
                  }}
                  dangerouslySetInnerHTML={{ __html: step.title }}
                />

                <p
                  className="m-0"
                  style={{
                    marginTop: cqw(12),
                    width: cqw(step.descriptionWidth ?? 165),
                    marginLeft:
                      step.descriptionAlign === "left" ? cqw(step.descriptionLeft ?? 0) : "auto",
                    marginRight: "auto",
                    textAlign: step.descriptionAlign ?? "center",
                    fontFamily: "'Baloo 2', cursive",
                    fontWeight: 500,
                    fontSize: cqw(15),
                    lineHeight: cqw(20),
                    color: "#3A3A3A",
                  }}
                >
                  {step.description}
                </p>
              </div>

              {/* Image */}
              <img
                src={step.image}
                alt=""
                style={{
                  position: "absolute",
                  top: cqw(step.imageTop),
                  left: `${step.imageLeft ?? 50}%`, // already a % of card width, unchanged
                  transform: "translateX(-50%)",
                  height: cqw(step.imageHeight),
                  width: "auto",
                  maxWidth: "none",
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}