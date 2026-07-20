import { useState } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = ["Home", "About Us", "How It Works", "For Parents", "Blog"];

export default function LandingNav({ cqw, cqh }) {
  const [active, setActive] = useState("Home");

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
            onClick={() => setActive(item)}
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