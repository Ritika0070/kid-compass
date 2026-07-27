import { useState } from "react";
import {
  ClipboardList,
  Puzzle,
  Palette,
  BookOpen,
  Boxes,
  Users,
  Footprints,
  Music2,
  Leaf,
  Cpu,
  Compass,
  HeartHandshake,
  Play,
} from "lucide-react";
import LogicalGame from "../games/LogicalGame";

const domains = [
  { name: "Logical / Analytical", color: "#2563EB", icon: Puzzle, playable: true },
  { name: "Creative / Artistic", color: "#7C3AED", icon: Palette, playable: false },
  { name: "Verbal / Linguistic", color: "#DC2626", icon: BookOpen, playable: false },
  { name: "Spatial / Visual", color: "#0891B2", icon: Boxes, playable: false },
  { name: "Social / Interpersonal", color: "#16A34A", icon: Users, playable: false },
  { name: "Bodily / Kinesthetic", color: "#D97706", icon: Footprints, playable: false },
  { name: "Music / Rhythm", color: "#DB2777", icon: Music2, playable: false },
  { name: "Nature / Animals", color: "#4D7C0F", icon: Leaf, playable: false },
  { name: "Technology / Machines", color: "#0F766E", icon: Cpu, playable: false },
  { name: "Leadership / Organizing", color: "#7C2D12", icon: Compass, playable: false },
  { name: "Caregiving / Empathy", color: "#EA580C", icon: HeartHandshake, playable: false },
];

export default function Assessments() {
  const [activeGame, setActiveGame] = useState(null);

  if (activeGame === "Logical / Analytical") {
    return <LogicalGame onExit={() => setActiveGame(null)} />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="flex flex-wrap items-center gap-4 rounded-[28px] border border-[#EEF1EA] bg-gradient-to-br from-[#FFF7ED] to-white p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#D97706] shadow-sm">
          <ClipboardList size={20} strokeWidth={2.25} />
        </div>
        <div>
          <p className="font-black text-[#101828]">Short, playful activities — not a test</p>
          <p className="mt-1 text-sm leading-6 text-[#5B6472]">
            Each assessment is a 3-5 minute mini-activity for one domain. There's no pass or fail —
            only what your child enjoys and how confidently they engage.
          </p>
        </div>
      </section>

      <section className="rounded-[32px] border border-[#EEF1EA] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Available Assessments
        </h2>
        <p className="mt-1 text-sm text-[#8A93A1]">More domains unlock here soon — start with Logical/Analytical today.</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <button
                key={domain.name}
                type="button"
                disabled={!domain.playable}
                onClick={() => domain.playable && setActiveGame(domain.name)}
                className={`flex items-center gap-3 rounded-3xl border p-5 text-left shadow-[0_6px_18px_rgba(15,23,42,0.03)] transition ${
                  domain.playable
                    ? "border-[#EEF1EA] bg-white hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                    : "border-[#EEF1EA] bg-white opacity-90"
                }`}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${domain.color}18`, color: domain.color }}
                >
                  <Icon size={22} strokeWidth={2.1} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-[#101828]">{domain.name}</p>
                  {domain.playable ? (
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#EAF6EE] px-2.5 py-1 text-xs font-black text-[#15803D]">
                      <Play size={11} strokeWidth={2.5} />
                      Play now
                    </span>
                  ) : (
                    <span className="mt-1 inline-block rounded-full bg-[#F4F6F0] px-2.5 py-1 text-xs font-black text-[#9CA3AF]">
                      Coming soon
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
