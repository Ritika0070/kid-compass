import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Accordion mechanics:
  - The rail (the column of 5 question rows) has a FIXED total height.
    That height never changes, whether nothing is open or row 1 or row 5
    is open — this is what keeps it from "crossing" the 5-box budget.
  - Each row is a flex child. Closed rows get flexGrow: 1, the open row
    gets flexGrow: OPEN_WEIGHT. Flexbox distributes the fixed rail height
    proportionally, so opening one row makes the *other four* shrink in
    sync to make room — no manual per-row height math needed.
  - Because all rows share the same fixed-height parent and redistribute
    together, this works identically for row 1 or row 5: there's no need
    to special-case "grow downward" vs "grow upward" — whichever rows are
    above/below the open one simply compress toward minHeight, so the
    open row visually expands into whatever direction has neighbors to
    take space from.
*/

const FAQS = [
  {
    q: "Is my child's data safe?",
    a: "Yes — we use end-to-end encryption and never sell or share your child's data. You're always in control and can delete it anytime.",
  },
  {
    q: "What age group is Chumbi Valley for?",
    a: "Chumbi Valley is designed for children roughly ages 4–12, with activities that naturally adapt as they grow.",
  },
  {
    q: "How does the AI understand my child?",
    a: "Our AI friend observes gameplay patterns — choices, pace, and interests — to build a picture of your child's strengths over time.",
  },
  {
    q: "Can multiple children use one account?",
    a: "Yes, you can add multiple child profiles under a single parent account, each with its own progress and insights.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. You can cancel your subscription anytime from your account settings — no questions asked.",
  },
];

const RAIL_HEIGHT_DESKTOP = 340; // fixed total, in px, for the whole rail
const RAIL_HEIGHT_MOBILE = 300;
const ROW_MIN_HEIGHT = 44; // floor so a closed/compressed row never crushes to nothing
const OPEN_WEIGHT = 6; // how much bigger the open row's share is vs a closed row's share (1)

const rowTransition = { duration: 0.45, ease: [0.33, 1, 0.68, 1] };
const iconTransition = { type: "spring", stiffness: 450, damping: 32 };

function FAQRow({ item, isOpen, onToggle, sizes }) {
  return (
    <div
      onClick={onToggle}
      className="relative cursor-pointer overflow-hidden flex-shrink-0"
      style={{
        flexGrow: isOpen ? OPEN_WEIGHT : 1,
        flexBasis: 0,
        minHeight: sizes.minHeight,
        backgroundColor: "#FAF4F3",
        borderRadius: isOpen ? sizes.openRadius : sizes.closedRadius,
        boxSizing: "border-box",
        padding: sizes.padding,
        transition: `flex-grow ${rowTransition.duration}s cubic-bezier(0.33,1,0.68,1), border-radius 0.3s ease`,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className="m-0"
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 700,
            fontSize: sizes.questionSize,
            color: "#101320",
          }}
        >
          {item.q}
        </p>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={iconTransition}
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: sizes.iconSize,
            height: sizes.iconSize,
            borderRadius: "50%",
            border: "2px solid #DDCBD5",
          }}
        >
          <svg width={sizes.plusSize} height={sizes.plusSize} viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke="#101320" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="m-0"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 500,
              fontSize: sizes.answerSize,
              lineHeight: 1.45,
              color: "#3A3A3A",
              marginTop: sizes.answerGap,
            }}
          >
            {item.a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  const desktopSizes = {
    minHeight: ROW_MIN_HEIGHT,
    closedRadius: "999px",
    openRadius: "22px",
    padding: "14px 28px",
    questionSize: "clamp(14px, 1.4vw, 20px)",
    answerSize: "clamp(12px, 1.05vw, 15px)",
    answerGap: "10px",
    iconSize: "34px",
    plusSize: "13",
  };

  const mobileSizes = {
    minHeight: 40,
    closedRadius: "999px",
    openRadius: "16px",
    padding: "12px 16px",
    questionSize: "13px",
    answerSize: "11.5px",
    answerGap: "8px",
    iconSize: "22px",
    plusSize: "9",
  };

  return (
    <>
      {/* ===========================
            Desktop / tablet
         =========================== */}
      <motion.div
        className="relative hidden md:flex mx-auto items-center gap-10"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
        style={{
          width: "90%",
          marginTop: "64px",
          backgroundColor: "#F0E7F3",
          border: "3px solid #E1DCEF",
          borderRadius: "25px",
          boxSizing: "border-box",
          padding: "24px 36px",
        }}
      >
        <div
          className="flex flex-col flex-shrink-0"
          style={{ width: "280px" }}
        >
          {/* Heading */}
          <div
             style={{ position: "relative", left: "5px" }}>
          
            <h2
              className="m-0"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 800,
                fontSize: "clamp(24px, 2.4vw, 35px)",
                lineHeight: 1.08,
                color: "#101320",
                textAlign: "center",
              }}
            >
              Frequently
              <br />
              Asked Questions
            </h2>
          </div>

          {/* Bunny */}
          <div style={{ position: "relative", top: "40px", left: "25px" }}>
            <img
              src="/bunny-thinking.png"
              alt="Bunny thinking"
              style={{
                width: "280px",   
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Right — question rail, fixed total height */}
        <div
          className="flex flex-col flex-1"
          style={{ height: `${RAIL_HEIGHT_DESKTOP}px`, gap: "12px" }}
        >
          {FAQS.map((item, i) => (
            <FAQRow
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
              sizes={desktopSizes}
            />
          ))}
        </div>
      </motion.div>

      {/* ===========================
            Mobile — stacked, bunny + heading on top, same fixed-rail
            accordion logic underneath at a smaller scale
         =========================== */}
      <motion.div
        className="flex md:hidden flex-col px-5 py-6 mx-auto"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        style={{
          marginTop: "32px",
          backgroundColor: "#F0E7F3",
          border: "3px solid #E1DCEF",
          borderRadius: "20px",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/bunny-thinking.png"
            alt="Bunny thinking"
            style={{ width: "72px", height: "auto", objectFit: "contain", flexShrink: 0 }}
          />
          <div>
            <h2
              className="m-0"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 800,
                fontSize: "19px",
                lineHeight: 1.1,
                color: "#101320",
                textAlign: "center",
              }}
            >
              Frequently Asked Questions
            </h2>
           
          </div>
        </div>

        <div
          className="flex flex-col mt-5"
          style={{ height: `${RAIL_HEIGHT_MOBILE}px`, gap: "8px" }}
        >
          {FAQS.map((item, i) => (
            <FAQRow
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
              sizes={mobileSizes}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}