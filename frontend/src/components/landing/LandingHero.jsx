import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import LandingNav from "./LandingNav";

export default function LandingHero({ onLoginClick }) {
  // Hero image frame itself: 1441 x 743 — nav/login/headline stay confined
  // to (and get clipped by) this
  const cqw = (px) => `${(px / 1441) * 100}cqw`;
  const cqh = (px) => `${(px / 743) * 100}cqh`;

  // Outer frame runs down to the bottom of the AI-Powered Guidance card
  // (Y1062) so the feature cards + guidance card can straddle the hero's
  // bottom edge without getting clipped by the hero's own overflow:hidden
  // + rounded corners.
  const ocqw = (px) => `${(px / 1441) * 100}cqw`;
  const ocqh = (px) => `${(px / 1062) * 100}cqh`;

  // Scroll-linked parallax: as the hero scrolls up and out of view, the
  // headline drifts down and gets clipped by the hero's own
  // overflow:hidden — "sinks under the mask". Scrolling back up reverses
  // it smoothly (useSpring softens the raw scroll value in both directions).
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const headlineY = useSpring(rawHeadlineY, { stiffness: 120, damping: 22, mass: 0.4 });
 const rawImageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  const imageScale = useSpring(rawImageScale, {
    stiffness: 120,
    damping: 22,
    mass: 0.4,
  });

  // Shared spring for hover/tap scale — critically-damped enough that it
  // eases to rest instead of oscillating (avoids the "double bounce").
  const hoverTransition = { type: "spring", stiffness: 450, damping: 32 };

  return (
    <div
      className="relative w-full hidden md:block"
      style={{ aspectRatio: "1441 / 1062", containerType: "size" }}
    >
      {/* Hero image — clipped, rounded bottom corners only */}
      <section
        ref={heroRef}
        className="absolute top-0 left-0 w-full overflow-hidden"
        style={{ height: ocqh(743), borderRadius: "0 0 50px 50px", containerType: "size" }}
      >
        <motion.img
        src="/landscape-hero.png"
        alt="Bunny, cat and dog looking out over the valley"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          scale: imageScale,
          transformOrigin: "center center",
        }}
      />

        <LandingNav cqw={cqw} cqh={cqh} />

        {/* Login / Sign Up — black outline only by default, red shadow +
            lift appears on hover; on tap it presses toward the base with
            a smaller shadow before releasing back to hover state. */}
        <motion.button
          type="button"
          onClick={onLoginClick}
          className="absolute z-20 flex items-center justify-center"
          initial={{ x: "0cqw", y: "0cqh", boxShadow: "0cqw 0cqh 0 0 rgba(255,0,0,0)" }}
          whileHover={{
            x: `-${cqw(1.5)}`,
            y: `-${cqh(3)}`,
            boxShadow: `${cqw(3)} ${cqh(5)} 0 0 #FF0000`,
          }}
          whileTap={{
            x: "0cqw",
            y: "0cqh",
            boxShadow: `${cqw(1)} ${cqh(2)} 0 0 #FF0000`,
          }}
          transition={hoverTransition}
          style={{
            left: cqw(1223),
            top: cqh(36),
            width: cqw(170),
            height: cqh(36),
            boxSizing: "border-box",
            backgroundColor: "#FDFBEC",
            borderRadius: cqh(20),
            border: `${cqh(2)} solid #000000`,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          <span
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 800,
              fontSize: cqw(17),
              position: "relative",
              top: cqh(1),
              color: "#212020",
            }}
          >
            LOGIN / SIGN UP
          </span>
        </motion.button>

        {/* Headline — lives INSIDE the clipped hero now, so scrolling it
            down actually sinks it under the mask instead of just scrolling
            normally with the page. */}
        <motion.h1
          className="absolute z-10 m-0"
          style={{
            left: cqw(112),
            top: cqh(167),
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800,
            fontSize: cqw(64),
            lineHeight: 1,
            color: "#FFFFFF",
            textShadow: "0 2px 6px rgba(0,0,0,0.25)",
            whiteSpace: "nowrap",
            y: headlineY,
          }}
        >
          A happy mind
        </motion.h1>
        <motion.p
          className="absolute z-10 m-0"
          style={{
            left: cqw(112),
            top: cqh(235),
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800,
            fontSize: cqw(60),
            lineHeight: 1,
            color: "#d5f07e",
            textShadow: "0 2px 6px rgba(0,0,0,0.25)",
            whiteSpace: "nowrap",
            y: headlineY,
          }}
        >
          builds a bright future
        </motion.p>
      </section>

      {/* CTA button — no outline, no scale. White hard-shadow + lift
          up-and-right appears on hover/tap (mirrors the login button's
          shadow-reveal idea, just red→white and up-left→up-right). */}
      <motion.button
        type="button"
        className="absolute z-10 flex items-center justify-center"
        initial={{ x: "0cqw", y: "0cqh", boxShadow: "0cqw 0cqh 0 0 rgba(255,255,255,0)" }}
        whileHover={{
          x: `${ocqw(1.5)}`,
          y: `-${ocqh(3)}`,
          boxShadow: `-${ocqw(3)} ${ocqh(5)} 0 0 #FFFFFF`,
        }}
        whileTap={{
          x: "0cqw",
          y: "0cqh",
          boxShadow: `-${ocqw(1)} ${ocqh(2)} 0 0 #FFFFFF`,
        }}
        transition={hoverTransition}
        style={{
          left: ocqw(112),
          top: ocqh(504),
          width: ocqw(260),
          height: ocqh(55),
          boxSizing: "border-box",
          backgroundColor: "#A2D542",
          borderRadius: ocqh(30),
          transformOrigin: "center center",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <span
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800,
            fontSize: ocqw(18),
            position: "relative",
            top: cqh(1),
            color: "#FCFEFA",
            
          }}
        >
          START YOUR JOURNEY
        </span>
      </motion.button>

      {/* Safe / Private / Trusted badge */}
      <div
        className="absolute z-10 flex items-center"
        style={{ left: ocqw(115), top: ocqh(575), gap: ocqw(8) }}
      >
        <img src="/safe-icon.png" alt="" style={{ width: ocqw(18), height: ocqw(20) }} />
        <span
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800,
            fontSize: ocqw(14),
            color: "#FFFFFF",
            opacity: 0.9,
            whiteSpace: "nowrap",
          }}
        >
          Safe. Private. Trusted by Parents.
        </span>
      </div>

      {/* Feature cards — straddle the hero's bottom edge.
          Each card is now TWO nested motion.divs:
            outer  → position (absolute left/top/width/height) + one-time
                     scroll-in entrance (initial/whileInView). Never touches
                     scale, so it never competes with hover.
            inner  → fills the outer 100%, owns background/radius, and is
                     the ONLY element with whileHover/whileTap. Icon + text
                     are plain (non-motion) children of it, so they scale
                     as a single rigid unit with no independent animation
                     of their own — no lag, no stutter.
          transformOrigin/willChange/backfaceVisibility/font-smoothing on
          the inner div keep the scale GPU-composited and avoid the tiny
          text-reflow shimmer some browsers show on non-composited scale. */}

      {/* Card 1 — Play & Explore (card 79,669 407x178 · icon 90.84,699 144.8x99.76, -5deg) */}
      <motion.div
        className="absolute z-10"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, delay: 0, ease: [0.33, 1, 0.68, 1] }}
        style={{ left: ocqw(79), top: ocqh(669), width: ocqw(407), height: ocqh(178) }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.99 }}
          transition={hoverTransition}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#ECF3B2",
            borderRadius: "22px",
            cursor: "pointer",
            transformOrigin: "center center",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          <img
            src="/icon-gamepad.png"
            alt=""
            style={{
              position: "absolute",
              left: ocqw(12),
              top: ocqh(30),
              width: ocqw(160),
              height: ocqh(110),
              objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: ocqw(177),
              right: ocqw(20),
              top: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              className="m-0"
              style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: ocqw(26), color: "#212020" }}
            >
              Play & Explore
            </p>
            <p
              className="m-0"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 500,
                fontSize: ocqw(15),
                color: "#3A3A3A",
                lineHeight: 1.35,
                marginTop: ocqh(6),
              }}
            >
              Fun games and activities that helps us understand what you enjoy the most.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Card 2 — Go on Adventures (card 516,669 407x178 · icon 544,698 115.93x115) */}
      <motion.div
        className="absolute z-10"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.33, 1, 0.68, 1] }}
        style={{ left: ocqw(516), top: ocqh(669), width: ocqw(407), height: ocqh(178) }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.99 }}
          transition={hoverTransition}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#FDF0B4",
            borderRadius: "22px",
            cursor: "pointer",
            transformOrigin: "center center",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          <img
            src="/icon-backpack.png"
            alt=""
            style={{
              position: "absolute",
              left: ocqw(28),
              top: ocqh(29),
              width: ocqw(115.93),
              height: ocqh(115),
              objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: ocqw(164),
              right: ocqw(20),
              top: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              className="m-0"
              style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: ocqw(25), color: "#212020" }}
            >
              Go on Adventures
            </p>
            <p
              className="m-0"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 500,
                fontSize: ocqw(15),
                color: "#3A3A3A",
                lineHeight: 1.35,
                marginTop: ocqh(6),
              }}
            >
              Fun games and activities that helps us understand what you enjoy the most.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Card 3 — We Collect Insights (card 952,669 407x178 · icon 986,698 105.32x122) */}
      <motion.div
        className="absolute z-10"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, delay: 0.24, ease: [0.33, 1, 0.68, 1] }}
        style={{ left: ocqw(952), top: ocqh(669), width: ocqw(407), height: ocqh(178) }}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.99 }}
          transition={hoverTransition}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#F1DCFA",
            borderRadius: "22px",
            cursor: "pointer",
            transformOrigin: "center center",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          <img
            src="/icon-magnifier.png"
            alt=""
            style={{
              position: "absolute",
              left: ocqw(34),
              top: ocqh(29),
              width: ocqw(105.32),
              height: ocqh(122),
              objectFit: "contain",
              transform: "rotate(-5deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: ocqw(159),
              right: ocqw(20),
              top: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              className="m-0"
              style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: ocqw(24), color: "#212020" }}
            >
              We Collect Insights
            </p>
            <p
              className="m-0"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 500,
                fontSize: ocqw(15),
                color: "#3A3A3A",
                lineHeight: 1.35,
                marginTop: ocqh(6),
              }}
            >
              Fun games and activities that helps us understand what you enjoy the most.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Card 4 — AI-Powered Guidance (long card, desktop only, no mobile
          spec yet so it's simply not rendered there — same "hidden md:block"
          coming from the outer wrapper).
          Exact from the Figma panel: card 80,867 1280x195, radius 34,
          fill #E5F0F5 · icon slot #1 780,889 121x145, radius 11, fill #FFF ·
          "SEE YOUR INSIGHTS" button 466,1011 173x34, radius 20, fill #4760BC.
          Not read off a panel (estimated from the screenshot, nudge if off):
          bunny size/position, speech-bubble position, heading/paragraph
          position, and the gap between the 4 icon slots (assumed even,
          ~140px apart center-to-center from slot 1). Only slots 3 (plant)
          and 4 (robot) have art in the Figma file — 1 and 2 are blank
          there too, left empty here until those icons exist. */}
      <motion.div
        className="absolute z-10"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, delay: 0.36, ease: [0.33, 1, 0.68, 1] }}
        style={{
          left: ocqw(80),
          top: ocqh(867),
          width: ocqw(1280),
          height: ocqh(195),
          backgroundColor: "#E5F0F5",
          borderRadius: "34px",
        }}
      >
        {/* Bunny — estimated size/position */}
        <img
          src="/bunny-pointing.png"
          alt="Bunny mascot pointing at insights"
          style={{
            position: "absolute",
            left: ocqw(20),
            bottom: ocqh(-4), // Move down by 10 design units
            height: ocqh(247),
            width: "auto",
            objectFit: "contain",
          }}
        />

        {/* Speech bubble — estimated position */}
        <div
          className="absolute"
          style={{
            left: ocqw(190),
            top: ocqh(-5),
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
            }}
          >
            I've found some amazing insights for you!
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

        {/* Heading + paragraph — left edge matches the button below (exact
            X466 → relative 386); vertical position estimated */}
        <div style={{ position: "absolute", left: ocqw(386), top: ocqh(20), width: ocqw(280) }}>
          <p
            className="m-0"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 800,
              fontSize: ocqw(26),
              color: "#212020",
            }}
          >
            AI - Powered Guidance
          </p>
          <p
            className="m-0"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 500,
              fontSize: ocqw(16),
              color: "#3A3A3A",
              lineHeight: 1.35,
              marginTop: ocqh(7),
            }}
          >
            Our AI friend analyzes your jouney and helps you discover career fields and hobbies that match your interests.
          </p>
        </div>

        {/* SEE YOUR INSIGHTS button — exact: 466,1011 173x34, radius 20, #4760BC
            (relative left 386, top 144) */}
        <motion.button
          type="button"
          className="absolute flex items-center justify-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={hoverTransition}
          style={{
            left: ocqw(386),
            top: ocqh(144),
            width: ocqw(173),
            height: ocqh(34),
            boxSizing: "border-box",
            backgroundColor: "#4760BC",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 800,
              fontSize: ocqw(13),
              color: "#FFFFFF",
            }}
          >
            SEE YOUR INSIGHTS
          </span>
        </motion.button>

        {/* 4 icon slots — slot 1 exact: 780,889 121x145 (relative 700,22),
            radius 11, fill #FFF. Slots 2-4 spaced ~140px apart (estimated,
            not on a panel). Only plant (slot 3) and robot (slot 4) have
            art in Figma — 1 & 2 stay empty white rounded boxes. */}
        {[
          { icon: null },
          { icon: null },
          { icon: "/icon-plant.png" },
          { icon: "/icon-robot.png" },
        ].map((slot, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ocqw(700 + i * 140),
              top: ocqh(22),
              width: ocqw(121),
              height: ocqh(145),
              backgroundColor: "#FFFFFF",
              borderRadius: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {slot.icon && (
              <img
                src={slot.icon}
                alt=""
                style={{ width: "70%", height: "70%", objectFit: "contain" }}
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}