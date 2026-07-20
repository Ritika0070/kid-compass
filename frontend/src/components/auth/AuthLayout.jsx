import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthFlow from "./AuthFlow";
import DisclaimerPanel from "../shared/DisclaimerPanel";
import InfoButton from "../shared/InfoButton";

const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1];

// Same duration/easing as LoginScene's initial-mount fade (see
// groupVariants in LoginScene.jsx) so the blur and the card+bunny land
// together instead of drifting apart and reading as a stutter.
const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT_CUBIC } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: "easeIn" } },
};

export default function AuthLayout() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Lock page scroll while the auth overlay is open. Hiding the scrollbar
  // frees up its width, which reflows the page and shifts everything
  // right — so we measure the scrollbar's width first and add it back as
  // padding-right, keeping the content width (and position) identical.
  // Both overflow and padding are restored to whatever they were before.
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
    >
      {/* Live blur of whatever's behind (the landing page). This fades in
          on its OWN, as a sibling to the bunny+card — not nested inside
          another fading parent. That nesting (parent opacity fading AND
          child opacity fading at the same time) was the actual cause of
          the earlier stutter, since nested opacities multiply into a
          squared curve. As an independent sibling sharing the same
          duration/easing as the bunny+card, it now lands in sync. */}
      <motion.div
        className="absolute inset-0"
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          willChange: "opacity",
          transform: "translateZ(0)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          backgroundColor: "rgba(20, 20, 15, 0.15)",
          willChange: "opacity",
          transform: "translateZ(0)",
        }}
      />

      {!showDisclaimer && (
        <InfoButton onClick={() => setShowDisclaimer(true)} />
      )}

      <AuthFlow />

      <AnimatePresence>
        {showDisclaimer && <DisclaimerPanel onClose={() => setShowDisclaimer(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}