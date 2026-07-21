import { motion } from "framer-motion";

const panelVariants = {
  initial: { opacity: 0, y: 18, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const DEFAULT_POINTS = [
  {
    title: "Not a career predictor",
    text: "Shows your child's current interests, not future outcomes.",
  },
  {
    title: "Not a diagnostic tool",
    text: "Does not assess mental health, learning, or development.",
  },
  {
    title: "A snapshot, not a verdict",
    text: "One session is limited. Interests can change as kids grow.",
  },
  {
    title: "Your data is protected",
    text: "Camera and mic are used only with consent and are never stored.",
  },
  {
    title: "AI assisted insights",
    text: "Meant to spark conversation, not serve as expert judgment.",
  },
];

export default function DisclaimerPanel({ onClose, points = DEFAULT_POINTS }) {
  return (
    <>
      <motion.div
      className="fixed inset-0 z-40 bg-black/25"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onClick={onClose}
    />

      {/* Desktop / tablet */}
      <div className="fixed inset-0 z-50 hidden items-center justify-center px-5 py-6 pointer-events-none md:flex">
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-title"
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto relative w-full max-w-3xl overflow-hidden border border-[#ded8c6] bg-[#fffdf3] shadow-2xl"
          style={{
            borderRadius: "28px",
            boxShadow: "0 24px 80px rgba(54, 35, 20, 0.22)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close disclaimer"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#ded8c6] bg-white text-xl font-bold text-[#41372f] transition hover:bg-[#f3efd9] active:scale-95"
          >
            X
          </button>

          <div className="px-6 pb-6 pt-7 sm:px-9 sm:pb-8 sm:pt-9">
            <p
              className="m-0 text-sm font-bold uppercase tracking-[0.16em] text-[#7b6a46]"
              style={{ fontFamily: "'Inria Sans', sans-serif" }}
            >
              Important note
            </p>

            <h1
              id="disclaimer-title"
              className="m-0 mt-2 pr-12 text-[#1f1f1f]"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: 1,
                fontWeight: 800,
              }}
            >
              Before you continue
            </h1>

            <p
              className="mb-4 mt-3 max-w-2xl text-[#6a6257]"
              style={{
                fontFamily: "'Inria Sans', sans-serif",
                fontSize: "16px",
                lineHeight: 1.2,
              }}
            >
              Kid Compass gives helpful guidance, but it should not replace parent judgment or expert advice.
            </p>

            <div className="space-y-2">
              {points.map((point, index) => (
                <div
                  key={point.title}
                  className="grid grid-cols-[32px_1fr] gap-3 rounded-2xl border border-[#ece5d2] bg-white px-4 py-2.5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef7d7] text-sm font-bold text-[#1f7a4d]">
                    {index + 1}
                  </div>

                  <div>
                    <h2
                      className="m-0 text-[#2b2b2b]"
                      style={{
                        fontFamily: "'Baloo 2', cursive",
                        fontSize: "19px",
                        lineHeight: 1,
                        fontWeight: 800,
                      }}
                    >
                      {point.title}
                    </h2>

                    <p
                      className="m-0 mt-1 text-[#5f584f]"
                      style={{
                        fontFamily: "'Inria Sans', sans-serif",
                        fontSize: "14px",
                        lineHeight: 1.1,
                      }}
                    >
                      {point.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 h-12 w-full rounded-2xl bg-[#1f7a4d] text-base font-bold text-white shadow-lg transition hover:bg-[#17643e] active:scale-[0.99]"
            >
              Got it
            </button>
          </div>
        </motion.section>
      </div>

      {/* Mobile — condensed spacing/type so all 5 points + button fit without scrolling */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-5 pointer-events-none md:hidden">
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-title-mobile"
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto relative w-full max-w-sm overflow-hidden border border-[#ded8c6] bg-[#fffdf3] shadow-2xl"
          style={{
            borderRadius: "22px",
            boxShadow: "0 18px 50px rgba(54, 35, 20, 0.2)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close disclaimer"
            className="absolute right-3 top- flex h-8 w-8 items-center justify-center rounded-full border border-[#ded8c6] bg-white text-base font-bold text-[#41372f] transition hover:bg-[#f3efd9] active:scale-95"
          >
            x
          </button>

          <div className="px-5 pb-5 pt-6">
            <p
              className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-[#7b6a46]"
              style={{ fontFamily: "'Inria Sans', sans-serif" }}
            >
              Important note
            </p>

            <h1
              id="disclaimer-title-mobile"
              className="m-0 mt-1 pr-10 text-[#1f1f1f]"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontSize: "26px",
                lineHeight: 1.05,
                fontWeight: 800,
              }}
            >
              Before you continue
            </h1>

            <p
              className="mb-3 mt-2 text-[#6a6257]"
              style={{
                fontFamily: "'Inria Sans', sans-serif",
                fontSize: "13px",
                lineHeight: 1.4,
              }}
            >
              Kid Compass gives helpful guidance, but it should not replace parent judgment or expert advice.
            </p>

            <div className="space-y-1.5">
              {points.map((point, index) => (
                <div
                  key={point.title}
                  className="grid grid-cols-[22px_1fr] items-start gap-2 rounded-xl border border-[#ece5d2] bg-white px-2.5 py-1.5"
                >
                  <div className="mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#eef7d7] text-[10px] font-bold text-[#1f7a4d]">
                    {index + 1}
                  </div>

                  <div>
                    <h2
                      className="m-0 text-[#2b2b2b]"
                      style={{
                        fontFamily: "'Baloo 2', cursive",
                        fontSize: "14px",
                        lineHeight: 1.1,
                        fontWeight: 800,
                      }}
                    >
                      {point.title}
                    </h2>

                    <p
                      className="m-0 text-[#5f584f]"
                      style={{
                        fontFamily: "'Inria Sans', sans-serif",
                        fontSize: "11px",
                        lineHeight: 1.25,
                      }}
                    >
                      {point.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 h-10 w-full rounded-2xl bg-[#1f7a4d] text-sm font-bold text-white shadow-lg transition hover:bg-[#17643e] active:scale-[0.99]"
            >
              Got it
            </button>
          </div>
        </motion.section>
      </div>
    </>
  );
}