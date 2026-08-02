import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { saveResult } from "../../utils/results";
import {
  Brain,
  CheckCircle2,
  XCircle,
  Trophy,
  ThumbsUp,
  Heart,
  ArrowLeft,
  RotateCcw,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const LEVEL_META = {
  Easy: { color: "#16A34A", tint: "#EAF6EE", label: "Level 1 · Easy" },
  Medium: { color: "#D97706", tint: "#FFF7ED", label: "Level 2 · Medium" },
  Hard: { color: "#E11D48", tint: "#FFF1F2", label: "Level 3 · Hard" },
};

const RAW_QUESTIONS = {
  Easy: [
    { prompt: "🍎🍌🍎🍌❓", helper: "What comes next?", options: ["🍎", "🍌", "🍇", "🍊"], answer: "🍎" },
    { prompt: "🔵🔵��🔵🔵🟢❓", helper: "What comes next?", options: ["🟢", "🔵", "🟡", "🟣"], answer: "🔵" },
    { prompt: "⭐🌙⭐🌙⭐❓", helper: "What comes next?", options: ["⭐", "🌙", "☀️", "✨"], answer: "🌙" },
    { prompt: "🐶🐱🐶🐱🐶❓", helper: "What comes next?", options: ["🐶", "🐱", "🐭", "🐰"], answer: "🐱" },
    { prompt: "🟥🟨🟥🟨🟥❓", helper: "What comes next?", options: ["🟥", "🟨", "🟩", "🟦"], answer: "🟨" },
  ],
  Medium: [
    { prompt: "2, 4, 6, 8, ❓", helper: "What number comes next?", options: ["9", "10", "11", "12"], answer: "10" },
    { prompt: "5, 10, 15, 20, ❓", helper: "What number comes next?", options: ["22", "24", "25", "30"], answer: "25" },
    { prompt: "3, 6, 9, 12, ❓", helper: "What number comes next?", options: ["13", "14", "15", "16"], answer: "15" },
    { prompt: "20, 18, 16, 14, ❓", helper: "What number comes next?", options: ["10", "11", "12", "13"], answer: "12" },
    { prompt: "2, 4, 6, 7", helper: "Which number doesn't belong?", options: ["2", "4", "6", "7"], answer: "7" },
  ],
  Hard: [
    { prompt: "2, 3, 5, 8, 12, ❓", helper: "What number comes next?", options: ["16", "17", "18", "19"], answer: "17" },
    { prompt: "3, 6, 12, 24, ❓", helper: "What number comes next?", options: ["36", "44", "48", "54"], answer: "48" },
    { prompt: "1, 4, 9, 16, 25, ❓", helper: "What number comes next?", options: ["30", "32", "34", "36"], answer: "36" },
    { prompt: "A triangle has 3 sides. A square has ❓", helper: "How many sides?", options: ["3", "4", "5", "6"], answer: "4" },
    { prompt: "All Bloops are Razzies. All Razzies are Lazzies.", helper: "Are all Bloops definitely Lazzies?", options: ["Yes", "No", "Cannot say", "Only sometimes"], answer: "Yes" },
  ],
};

const ALL_QUESTIONS = [
  ...RAW_QUESTIONS.Easy.map((q) => ({ ...q, level: "Easy" })),
  ...RAW_QUESTIONS.Medium.map((q) => ({ ...q, level: "Medium" })),
  ...RAW_QUESTIONS.Hard.map((q) => ({ ...q, level: "Hard" })),
];

const QUESTIONS_PER_LEVEL = 5;
const TOTAL_ROUNDS = ALL_QUESTIONS.length;

export default function LogicalGame({ onExit }) {
  const { user } = useAuth();

  const [stage, setStage] = useState("intro"); // intro | playing | levelComplete | result
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [levelScores, setLevelScores] = useState({ Easy: 0, Medium: 0, Hard: 0 });
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null

  const current = ALL_QUESTIONS[round];
  const roundInLevel = round % QUESTIONS_PER_LEVEL;
  const isLastInLevel = roundInLevel === QUESTIONS_PER_LEVEL - 1;
  const isLastRound = round === TOTAL_ROUNDS - 1;

  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => {
      const justCorrect = feedback === "correct";

      if (isLastInLevel) {
        if (isLastRound) {
          const finalScore = score + (justCorrect ? 1 : 0);
          const finalLevelScores = {
            ...levelScores,
            [current.level]: levelScores[current.level] + (justCorrect ? 1 : 0),
          };
          saveResult(user?.email, "Logical / Analytical", {
            score: finalScore,
            total: TOTAL_ROUNDS,
            levels: finalLevelScores,
          });
          setLevelScores(finalLevelScores);
          setStage("result");
        } else {
          setLevelScores((prev) => ({
            ...prev,
            [current.level]: prev[current.level] + (justCorrect ? 1 : 0),
          }));
          setStage("levelComplete");
        }
      } else {
        setRound((r) => r + 1);
        setSelected(null);
        setFeedback(null);
      }
    }, 1100);

    return () => clearTimeout(timer);
  }, [feedback]);

  const choose = (option) => {
    if (feedback) return;
    setSelected(option);
    const isCorrect = option === current.answer;
    if (isCorrect) setScore((s) => s + 1);
    setFeedback(isCorrect ? "correct" : "wrong");
  };

  const continueToNextLevel = () => {
    setRound((r) => r + 1);
    setSelected(null);
    setFeedback(null);
    setStage("playing");
  };

  const restart = () => {
    setStage("intro");
    setRound(0);
    setScore(0);
    setLevelScores({ Easy: 0, Medium: 0, Hard: 0 });
    setSelected(null);
    setFeedback(null);
  };

  if (stage === "intro") {
    return (
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={onExit}
          className="mb-4 flex items-center gap-1.5 text-sm font-bold text-[#5B6472] transition hover:text-[#101828]"
        >
          <ArrowLeft size={16} strokeWidth={2.25} />
          Back to Assessments
        </button>

        <div className="rounded-[32px] border border-[#EEF1EA] bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white shadow-[0_10px_24px_rgba(37,99,235,0.35)]">
            <Brain size={28} strokeWidth={2.25} />
          </div>

          <h1 className="mt-5 text-3xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
            Logical Detective
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#8A93A1]">
            Spot the pattern, pick what comes next. No reading required!
          </p>

          <div className="mt-5 flex items-center justify-center gap-2">
            {["Easy", "Medium", "Hard"].map((level, i) => (
              <div key={level} className="flex items-center gap-2">
                <span
                  className="rounded-full px-3 py-1.5 text-sm font-black"
                  style={{ backgroundColor: LEVEL_META[level].tint, color: LEVEL_META[level].color }}
                >
                  {level}
                </span>
                {i < 2 && <ArrowRight size={14} strokeWidth={2.5} className="text-[#D1D5CD]" />}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs font-semibold text-[#9CA3AF]">
            3 levels &middot; 5 rounds each &middot; {TOTAL_ROUNDS} rounds total
          </p>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setStage("playing")}
            className="mt-7 h-14 w-full rounded-2xl bg-[#123524] text-lg font-black text-white transition hover:bg-[#16A34A]"
          >
            Start Challenge
          </motion.button>
        </div>
      </div>
    );
  }

  if (stage === "levelComplete") {
    const finishedLevel = current.level;
    const nextLevel = ALL_QUESTIONS[round + 1].level;
    const finishedScore = levelScores[finishedLevel];

    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[32px] border border-[#EEF1EA] bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: LEVEL_META[finishedLevel].tint, color: LEVEL_META[finishedLevel].color }}
          >
            <Sparkles size={28} strokeWidth={2.25} />
          </div>

          <h2 className="mt-5 text-2xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
            {finishedLevel} level complete!
          </h2>
          <p className="mt-2 text-4xl font-black text-[#101828]">
            {finishedScore}<span className="text-xl text-[#9CA3AF]">/{QUESTIONS_PER_LEVEL}</span>
          </p>

          <p className="mt-4 text-sm font-bold text-[#8A93A1]">Get ready for</p>
          <span
            className="mt-2 inline-block rounded-full px-4 py-1.5 text-sm font-black"
            style={{ backgroundColor: LEVEL_META[nextLevel].tint, color: LEVEL_META[nextLevel].color }}
          >
            {nextLevel} level
          </span>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={continueToNextLevel}
            className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#123524] text-lg font-black text-white transition hover:bg-[#16A34A]"
          >
            Continue
            <ArrowRight size={20} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    );
  }

  if (stage === "result") {
    const tier =
      score >= TOTAL_ROUNDS - 2
        ? { icon: Trophy, color: "#D97706", tint: "#FFF7ED", title: "Amazing! True Logical Detective!" }
        : score >= Math.ceil(TOTAL_ROUNDS / 2)
        ? { icon: ThumbsUp, color: "#2563EB", tint: "#EFF6FF", title: "Nice work! Keep practicing." }
        : { icon: Heart, color: "#E11D48", tint: "#FFF1F2", title: "Good try! Practice makes perfect." };

    const Icon = tier.icon;

    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[32px] border border-[#EEF1EA] bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <div
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: tier.tint, color: tier.color }}
          >
            <Icon size={32} strokeWidth={2.25} />
          </div>

          <h2 className="mt-5 text-2xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
            {tier.title}
          </h2>

          <p className="mt-3 text-5xl font-black text-[#101828]">
            {score}<span className="text-2xl text-[#9CA3AF]">/{TOTAL_ROUNDS}</span>
          </p>
          <p className="mt-1 text-sm font-bold text-[#8A93A1]">Logical / Analytical</p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {["Easy", "Medium", "Hard"].map((level) => (
              <div key={level} className="rounded-2xl p-3" style={{ backgroundColor: LEVEL_META[level].tint }}>
                <p className="text-xs font-black" style={{ color: LEVEL_META[level].color }}>{level}</p>
                <p className="mt-1 text-lg font-black text-[#101828]">{levelScores[level]}/{QUESTIONS_PER_LEVEL}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={restart}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#E5E7DF] bg-white px-6 text-sm font-bold text-[#4B5563] transition hover:bg-[#F7F8F5]"
            >
              <RotateCcw size={16} strokeWidth={2.25} />
              Play again
            </button>
            <button
              type="button"
              onClick={onExit}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#123524] px-6 text-sm font-bold text-white transition hover:bg-[#16A34A]"
            >
              Back to Assessments
            </button>
          </div>
        </div>
      </div>
    );
  }

  const level = LEVEL_META[current.level];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-1.5 text-sm font-bold text-[#5B6472] transition hover:text-[#101828]"
        >
          <ArrowLeft size={16} strokeWidth={2.25} />
          Exit
        </button>
        <span
          className="rounded-full px-3 py-1 text-xs font-black"
          style={{ backgroundColor: level.tint, color: level.color }}
        >
          {level.label}
        </span>
      </div>

      <div className="mb-5 flex gap-2">
        {Array.from({ length: QUESTIONS_PER_LEVEL }).map((_, i) => (
          <div
            key={i}
            className="h-2 flex-1 rounded-full transition"
            style={{ backgroundColor: i <= roundInLevel ? level.color : "#EEF1EA" }}
          />
        ))}
      </div>

      <div className="rounded-[32px] border border-[#EEF1EA] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#9CA3AF]">
          Round {roundInLevel + 1} of {QUESTIONS_PER_LEVEL}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={round}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <p className="mt-4 text-center text-3xl font-black tracking-wide text-[#101828] sm:text-4xl">
              {current.prompt}
            </p>
            <p className="mt-2 text-center text-sm font-semibold text-[#8A93A1]">{current.helper}</p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {current.options.map((option) => {
                const isSelected = selected === option;
                const isAnswer = option === current.answer;
                const showCorrect = feedback && isAnswer;
                const showWrong = feedback && isSelected && !isAnswer;

                return (
                  <motion.button
                    key={option}
                    type="button"
                    whileTap={{ scale: feedback ? 1 : 0.95 }}
                    animate={showWrong ? { x: [0, -6, 6, -6, 0] } : { x: 0 }}
                    onClick={() => choose(option)}
                    disabled={!!feedback}
                    className={`relative flex h-20 items-center justify-center rounded-2xl border-2 text-2xl font-black transition ${
                      showCorrect
                        ? "border-[#16A34A] bg-[#EAF6EE] text-[#101828]"
                        : showWrong
                        ? "border-[#E11D48] bg-[#FFF1F2] text-[#101828]"
                        : "border-[#EEF1EA] bg-[#FAFBF7] text-[#101828] hover:border-[#16A34A]/40"
                    }`}
                  >
                    {option}
                    {showCorrect && (
                      <CheckCircle2 size={20} strokeWidth={2.5} className="absolute right-2 top-2 text-[#16A34A]" />
                    )}
                    {showWrong && (
                      <XCircle size={20} strokeWidth={2.5} className="absolute right-2 top-2 text-[#E11D48]" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
