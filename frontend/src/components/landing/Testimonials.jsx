import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ===========================================================
//  Testimonials / "Trusted by Parents, Loved by Kids"
//  Pixel-mapped from Figma Component 11 (1342 x 289, radius 34,
//  fill #FAF3E1, stroke #F7ECD5 @3px inside).
//  Sits directly under <ForParents />.
// ===========================================================

const ocqw = (px) => `${((px / 1342) * 100).toFixed(3)}cqw`;
const ocqh = (px) => `${((px / 289) * 100).toFixed(3)}cqh`;

const hoverTransition = { type: "spring", stiffness: 450, damping: 32 };

// Card geometry — read off Figma: card1 X33, card2 X466 (gap 23), so
// card3 continues the same 433px stride → X899. All cards Y80, 410x188,
// radius 24, fill #FFFFFF.
const CARD_LEFT = [33, 466, 899];
const CARD_TOP = 80;
const CARD_WIDTH = 410;
const CARD_HEIGHT = 188;

// Everything INSIDE a card (avatar, stars, quote, author) is positioned
// relative to that card's own 410x188 box, and each card slot has its
// own containerType:"size" — so those children need cqw/cqh computed
// against 410/188, NOT against the outer 1342/289 component. Using ocqw
// for them was the bug: it rendered them at (410/1342) ≈ 30% scale.
const ccqw = (px) => `${((px / CARD_WIDTH) * 100).toFixed(3)}cqw`;
const ccqh = (px) => `${((px / CARD_HEIGHT) * 100).toFixed(3)}cqh`;

// Avatar / stars / quote / author — all read as offsets from a card's
// own top-left (card1 = X33,Y80), so they apply identically to any slot.
const AVATAR_OFFSET = { left: 19, top: 32, size: 124 };
const STAR_OFFSET = { left: 172, top: 18, size: 27, spacing: 26 };
const QUOTE_OFFSET = { left: 174, top: 54, width: 180 };
const AUTHOR_OFFSET = { left: 174, top: 146, width: 115 };

// 6 reviews, looping 3-at-a-time carousel.
const REVIEWS = [
  {
    name: "Priya",
    role: "Mother",
    avatar: "/avatars/Priya.png",
    quote: "This website helped my child open up and discover so much about themselves!",
  },
  {
    name: "Rahul",
    role: "Father",
    avatar: "/avatars/Rahul.png",
    quote: "The perfect blend of fun and learning. I love how it actually understands my child.",
  },
  {
    name: "Ananya",
    role: "Mother",
    avatar: "/avatars/Ananya.png",
    quote: "My kids look forward to their daily adventures in this website!",
  },
  {
    name: "Karan",
    role: "Father",
    avatar: "/avatars/Karan.png",
    quote: "It's rare to find something screen-time related I actually feel good about. This is it.",
  },
  {
    name: "Neha",
    role: "Mother",
    avatar: "/avatars/Neha.png",
    quote: "The insights genuinely surprised me — it picked up on strengths I hadn't even noticed.",
  },
  {
    name: "Aditya",
    role: "Father",
    avatar: "/avatars/Aditya.png",
    quote: "My son asks to 'go visit the bunnies' every evening. Best kind of nagging there is.",
  },
];

// unit: fn(px) => css length string. Pass ccqw for the desktop card
// context, or a plain px-wrapper for mobile (no container-query ancestor
// there). size/gap let mobile use smaller absolute numbers.
function Stars({ unit = ccqw, size = STAR_OFFSET.size, gap = STAR_OFFSET.spacing }) {
  return (
    <div style={{ position: "relative", height: unit(size), width: unit(gap * 4 + size) }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="#F2C251"
          style={{
            position: "absolute",
            left: unit(gap * i),
            top: 0,
            width: unit(size),
            height: unit(size),
          }}
        >
          <path d="M12 1.5l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.27l-6.18 3.23L7 13.63l-5-4.87 6.91-1L12 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCardContent({ review }) {
  return (
    <>
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: ccqw(AVATAR_OFFSET.left),
          top: ccqh(AVATAR_OFFSET.top),
          width: ccqw(AVATAR_OFFSET.size),
          height: ccqw(AVATAR_OFFSET.size),
          borderRadius: "50%",
        }}
      >
       <img
        src={review.avatar}
        alt={review.name}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      </div>

      <div
        className="absolute"
        style={{ left: ccqw(STAR_OFFSET.left), top: ccqh(STAR_OFFSET.top) }}
      >
        <Stars unit={ccqw} />
      </div>

      <p
        className="m-0 absolute"
        style={{
          left: ccqw(QUOTE_OFFSET.left),
          top: ccqh(QUOTE_OFFSET.top),
          width: ccqw(QUOTE_OFFSET.width),
          fontFamily: "'Baloo 2', cursive",
          fontWeight: 500,
          fontSize: ccqw(13),
          lineHeight: 1.35,
          color: "#3A3A3A",
        }}
      >
        "{review.quote}"
      </p>

      <p
        className="m-0 absolute"
        style={{
          left: ccqw(AUTHOR_OFFSET.left),
          top: ccqh(AUTHOR_OFFSET.top),
          width: ccqw(AUTHOR_OFFSET.width),
          fontFamily: "'Baloo 2', cursive",
          fontWeight: 700,
          fontSize: ccqw(13),
          color: "#96C015",
          whiteSpace: "nowrap",
        }}
      >
        – {review.name}, {review.role}
      </p>
    </>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = REVIEWS.length;
  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  };

  const visible = [0, 1, 2].map((offset) => REVIEWS[(index + offset) % total]);

  return (
    <>
      {/* ===========================
            Desktop / tablet — pixel-mapped from Figma, same construction
            as ForParents.
         =========================== */}
      <div
        id="testimonials"
        className="relative hidden md:block mx-auto mt-10"
        style={{
          width: "90%",
          aspectRatio: "1342 / 289",
          containerType: "size",
          backgroundColor: "#FAF3E1",
          border: "3px solid #F7ECD5",
          boxSizing: "border-box",
          borderRadius: "34px",
        }}
      >
        {/* Heading — Figma exact: (450, 20), width 442, Baloo 2 Bold 30 */}
        <h2
          className="m-0 absolute text-center"
          style={{
            left: ocqw(450),
            top: ocqh(20),
            width: ocqw(442),
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 700,
            fontSize: ocqw(30),
            letterSpacing: "-0.01em",
            color: "#212020",
            whiteSpace: "nowrap",
          }}
        >
          Trusted by Parents, Loved by Kids
        </h2>

        {/* Prev / Next arrows — Figma exact: prev (1201,21) 44x44 outline,
            next (1256,21) 44x44 fill #96C015 */}
        <motion.button
          type="button"
          aria-label="Previous reviews"
          onClick={prev}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={hoverTransition}
          className="absolute flex items-center justify-center"
          style={{
            left: ocqw(1201),
            top: ocqh(21),
            width: ocqw(44),
            height: ocqw(44),
            borderRadius: "50%",
            backgroundColor: "#FAF3E1",
            border: "2px solid #E3D9BE",
            cursor: "pointer",
          }}
        >
          <svg width={ocqw(11)} height={ocqw(18)} viewBox="0 0 11 18" fill="none"style={{
    transform: "translateX(-1.5px)", // left
  }}>
            <path
              d="M9.5 1.5L2 9L9.5 16.5"
              stroke="#B7AD91"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        <motion.button
          type="button"
          aria-label="Next reviews"
          onClick={next}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={hoverTransition}
          className="absolute flex items-center justify-center"
          style={{
            left: ocqw(1256),
            top: ocqh(21),
            width: ocqw(44),
            height: ocqw(44),
            borderRadius: "50%",
            backgroundColor: "#96C015",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg width={ocqw(11)} height={ocqw(18)} viewBox="0 0 11 18" fill="none"style={{
    transform: "translateX(1px)", // left
  }}>
            <path
              d="M1.5 1.5L9 9L1.5 16.5"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        {/* 3 visible review card slots — fixed positions, content inside
            each slot crossfades/slides on next/prev, looping through all
            6 reviews. */}
        {visible.map((review, slot) => (
          <div
            key={slot}
            className="absolute overflow-hidden"
            style={{
              left: ocqw(CARD_LEFT[slot]),
              top: ocqh(CARD_TOP),
              width: ocqw(CARD_WIDTH),
              height: ocqh(CARD_HEIGHT),
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              containerType: "size",
            }}
          >
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={review.name + review.role}
                custom={direction}
                initial={{ x: direction * 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -direction * 40, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
                <ReviewCardContent review={review} />
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* ===========================
            Mobile — no Figma spec at this breakpoint. One card visible
            at a time, same loop + arrows, simplified fixed-px layout in
            the same style as the other mobile sections on this page.
         =========================== */}
      <div
        className="flex md:hidden flex-col items-center mt-6 mx-4"
        style={{
          backgroundColor: "#FAF3E1",
          border: "3px solid #F7ECD5",
          borderRadius: "24px",
          padding: "20px 16px 22px",
        }}
      >
        <h2
          className="m-0 text-center"
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 700,
            fontSize: "18px",
            color: "#212020",
          }}
        >
          Trusted by Parents, Loved by Kids
        </h2>

        <div
          className="relative overflow-hidden mt-4 w-full"
          style={{ height: "180px" }}
        >
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={REVIEWS[index].name + REVIEWS[index].role}
              custom={direction}
              initial={{ x: direction * 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 60, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0 flex flex-col"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "18px",
                padding: "16px",
                boxSizing: "border-box",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                  }}
                >
                <img
                  src={REVIEWS[index].avatar}
                  alt={REVIEWS[index].name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
                <div style={{ width: "84px" }}>
                  <Stars />
                </div>
              </div>

              <p
                className="m-0"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontWeight: 500,
                  fontSize: "13px",
                  lineHeight: 1.4,
                  color: "#3A3A3A",
                  marginTop: "10px",
                }}
              >
                "{REVIEWS[index].quote}"
              </p>

              <p
                className="m-0"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#96C015",
                  marginTop: "auto",
                }}
              >
                – {REVIEWS[index].name}, {REVIEWS[index].role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <motion.button
            type="button"
            aria-label="Previous review"
            onClick={prev}
            whileTap={{ scale: 0.9 }}
            transition={hoverTransition}
            className="flex items-center justify-center"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#FAF3E1",
              border: "2px solid #E3D9BE",
            }}
          >
            <svg width="9" height="14" viewBox="0 0 11 18" fill="none">
              <path
                d="M9.5 1.5L2 9L9.5 16.5"
                stroke="#B7AD91"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          <motion.button
            type="button"
            aria-label="Next review"
            onClick={next}
            whileTap={{ scale: 0.9 }}
            transition={hoverTransition}
            className="flex items-center justify-center"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#96C015",
              border: "none",
            }}
          >
            <svg width="9" height="14" viewBox="0 0 11 18" fill="none">
              <path
                d="M1.5 1.5L9 9L1.5 16.5"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </>
  );
}