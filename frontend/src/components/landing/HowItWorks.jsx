import { useLayoutEffect, useRef, useState, useCallback } from "react";
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
    imageHeight: 290,
    imageTop: 118,
    imageLeft: 50,
    offset: {
      laptop: { x: -35, y: 0 },
      wide: { x: -150, y: 0 },
    },
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
    offset: {
      laptop: { x: 0, y: 0 },
      wide: { x: 0, y: 0 },
    },
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
    imageLeft: 83,
    titleWidth: 180,
    descriptionWidth: 125,
    descriptionAlign: "left",
    descriptionLeft: 10,
    offset: {
      laptop: { x: 0, y: 0 },
      wide: { x: 100, y: 0 },
    },
  },
];

const cqw = (px) => `${((px / 272) * 100).toFixed(2)}cqw`;

const CARD_WIDTH_MIN = 180;
const CARD_WIDTH_MAX = 460;
const CARD_WIDTH_VW = 18.9;
const CARD_WIDTH_EXPR = `clamp(${CARD_WIDTH_MIN}px, ${CARD_WIDTH_VW}vw, ${CARD_WIDTH_MAX}px)`;
const CARD_ASPECT_RATIO = "272 / 369";
const CARD_GAP_EXPR = "clamp(20px, 8vw, 125px)";
const LAPTOP_MIN = 768;
const WIDE_MIN = 1920;

// Card entrance timing — shared constants so a connector's own entrance
// can reuse the EXACT same duration/stagger/ease as the card it's
// attached to, instead of drifting out of sync.
const CARD_DURATION = 0.55;
const CARD_STAGGER = 0.3;
const CARD_EASE = [0.33, 1, 0.68, 1];
const CONNECTOR_START_DELAY = 0.5;

const cardScale = (px) =>
  `clamp(${((px * CARD_WIDTH_MIN) / 272).toFixed(1)}px, ${((px * CARD_WIDTH_VW) / 272).toFixed(3)}vw, ${((px * CARD_WIDTH_MAX) / 272).toFixed(1)}px)`;


const vector = [
  {
    src: "/vector/loop-pre-card1.svg", // Vector 6 — decorative loop to the left of card 1
    anchor: { cardIndex: 0, side: "left" },
    syncCardIndex: 0,
    nativeWidth: 120,
    gapOffset: -0.4,
    yRatio: 0.5,
  },
  {
    src: "/vector/connector-1-2.svg", // Component 9 — between card 1 and card 2
    nativeWidth: 180,
    anchor: { cardIndex: 0, side: "right" },
    syncCardIndex: 1,
    gapOffset: 0.59,
    yRatio: 0.25,
  },
  {
    src: "/vector/connector-2-3.svg", // Vector 9 — between card 2 and card 3
    nativeWidth: 220,
    anchor: { cardIndex: 1, side: "right" },
    syncCardIndex: 2,
    gapOffset: 0.7,
    yRatio: 0.6,
  },
];

export default function HowItWorks() {
  const rowRef = useRef(null);
  const cardRefs = useRef([]);
  const [connectorPos, setConnectorPos] = useState([]);

  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const rowRect = row.getBoundingClientRect();

    const cardRects = cardRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        left: r.left - rowRect.left,
        right: r.right - rowRect.left,
        top: r.top - rowRect.top,
        height: r.height,
      };
    });

    let gapPx = 0;
    if (cardRects[0] && cardRects[1]) {
      gapPx = cardRects[1].left - cardRects[0].right;
    }

    const positions = vector.map((c) => {
      const rect = cardRects[c.anchor.cardIndex];
      if (!rect) return null;
      const edgeX = c.anchor.side === "left" ? rect.left : rect.right;
      return {
        left: edgeX + c.gapOffset * gapPx,
        top: rect.top + c.yRatio * rect.height,
      };
    });

    setConnectorPos(positions);
  }, []);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(measure);

    const ro = new ResizeObserver(() => measure());
    if (rowRef.current) ro.observe(rowRef.current);

    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <section id="how-it-works" className="w-full px-4 md:px-8 py-14 md:py-24">
      <style>{`
        ${STEPS.map((s) => `
          @media (min-width: ${LAPTOP_MIN}px) {
            .how-card-${s.number} {
              transform: translate(${s.offset?.laptop?.x ?? 0}px, ${s.offset?.laptop?.y ?? 0}px);
            }
          }
          @media (min-width: ${WIDE_MIN}px) {
            .how-card-${s.number} {
              transform: translate(${s.offset?.wide?.x ?? 0}px, ${s.offset?.wide?.y ?? 0}px);
            }
          }
        `).join("\n")}
      `}</style>

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

      <div
        ref={rowRef}
        className="relative flex flex-col md:flex-row items-center md:items-stretch justify-center mx-auto"
        style={{ gap: CARD_GAP_EXPR, width: "fit-content", maxWidth: "1650px" }}
      >
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`how-card-${step.number}`}
            style={{
              containerType: "inline-size",
              width: CARD_WIDTH_EXPR,
              aspectRatio: CARD_ASPECT_RATIO,
              flexShrink: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            <motion.div
              className="relative w-full h-full"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: CARD_DURATION, delay: i * CARD_STAGGER, ease: CARD_EASE }}
              onAnimationComplete={measure}
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
                  left: `${step.imageLeft ?? 50}%`,
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

     
        <div className="absolute inset-0 hidden lg:block pointer-events-none" style={{ zIndex: 2 }}>
          {vector.map((c, i) => {
            const pos = connectorPos[i];
            if (!pos) return null;
            return (
              <motion.img
                key={i}
                src={c.src}
                alt=""
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                duration: CARD_DURATION,
                delay: CONNECTOR_START_DELAY + i * CARD_STAGGER,
                ease: CARD_EASE,
              }}
                style={{
                  position: "absolute",
                  left: pos.left,
                  top: pos.top,
                  translateX: "-50%",
                  translateY: "-50%",
                  width: cardScale(c.nativeWidth),
                  height: "auto",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}