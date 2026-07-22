import { useState } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = ["Home", "About Us", "How It Works", "For Parents", "Testimonials"];

// Maps nav labels to the section id they should scroll to.
// Add more entries here as the other sections get ids.
const SECTION_IDS = {
  "How It Works": "how-it-works",
  "For Parents": "for-parents",
  "Testimonials": "testimonials",
};

// easeInOutCubic — slow start, fast middle, slow gentle finish.
// This is what makes it feel "real smooth" instead of the abrupt
// stop native scrollIntoView({behavior:'smooth'}) gives you.
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY, duration = 1100) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(t);
    window.scrollTo(0, startY + distance * eased);
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function LandingNav({ cqw, cqh }) {
  const [active, setActive] = useState("Home");

  const handleClick = (item) => {
    setActive(item);

    const sectionId = SECTION_IDS[item];
    if (!sectionId) return; // no target yet for this item — just highlights

    const el = document.getElementById(sectionId);
    if (!el) return;

    // Offset so the section isn't flush against the very top edge
    // (tweak this if you have a fixed/sticky header height to account for).
    const NAV_OFFSET = 24;
    const targetY = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

    smoothScrollTo(targetY, 1100);
  };

  return (
    <nav
      className="absolute z-20 hidden md:flex items-center"
      style={{ left: cqw(300), top: cqh(36), gap: cqw(63), height: cqh(36) }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item === active;
        return (
          <button
            key={item}
            type="button"
            onClick={() => handleClick(item)}
            className="relative flex items-center justify-center"
            style={{ height: cqh(32) }}
          >
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0"
                style={{ backgroundColor: "#A2D542", borderRadius: 999 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span
              className="relative whitespace-nowrap"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 800,
                fontSize: cqw(17),
                color: "#FFFFFF",
                textShadow: "0 1px 2px rgba(0,0,0,0.18)",
                padding: `0 ${cqw(16)}`,
              }}
            >
              {item}
            </span>
          </button>
        );
      })}
    </nav>
  );
}