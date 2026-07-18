import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BackgroundDecor from "../shared/BackgroundDecor";
import AuthFlow from "./AuthFlow";
import DisclaimerPanel from "../shared/DisclaimerPanel";
import InfoButton from "../shared/InfoButton";

export default function AuthLayout() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F9FBCA]">
      <BackgroundDecor />

      {!showDisclaimer && (
        <InfoButton onClick={() => setShowDisclaimer(true)} />
      )}

      <AuthFlow />

      <AnimatePresence>
        {showDisclaimer && <DisclaimerPanel onClose={() => setShowDisclaimer(false)} />}
      </AnimatePresence>
    </div>
  );
}