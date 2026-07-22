import { useAuth } from "../../hooks/useAuth";
import {
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
  CheckCircle2,
  Star,
  MessageCircle,
  CalendarClock,
  Sprout,
} from "lucide-react";

const domains = [
  { name: "Logical / Analytical", short: "Logic", interest: "Puzzles, patterns, numbers, strategy", color: "#2563EB", icon: Puzzle },
  { name: "Creative / Artistic", short: "Creative", interest: "Drawing, imagination, colors, design", color: "#7C3AED", icon: Palette },
  { name: "Verbal / Linguistic", short: "Verbal", interest: "Stories, reading, speaking, vocabulary", color: "#DC2626", icon: BookOpen },
  { name: "Spatial / Visual", short: "Spatial", interest: "Blocks, maps, shapes, visual planning", color: "#0891B2", icon: Boxes },
  { name: "Social / Interpersonal", short: "Social", interest: "Teamwork, friends, understanding people", color: "#16A34A", icon: Users },
  { name: "Bodily / Kinesthetic", short: "Movement", interest: "Sports, dance, movement, coordination", color: "#D97706", icon: Footprints },
  { name: "Music / Rhythm", short: "Music", interest: "Singing, instruments, beats, rhythm", color: "#DB2777", icon: Music2 },
  { name: "Nature / Animals", short: "Nature", interest: "Animals, plants, outdoor curiosity", color: "#4D7C0F", icon: Leaf },
  { name: "Technology / Machines", short: "Tech", interest: "Gadgets, robots, coding, machines", color: "#0F766E", icon: Cpu },
  { name: "Leadership / Organizing", short: "Lead", interest: "Planning, decisions, managing tasks", color: "#7C2D12", icon: Compass },
  { name: "Caregiving / Empathy", short: "Care", interest: "Kindness, emotions, helping behavior", color: "#EA580C", icon: HeartHandshake },
];

function MetricCard({ Icon, label, value, helper, tint, iconColor }) {
  return (
    <div className="rounded-3xl border border-[#EEF1EA] p-5 shadow-[0_6px_20px_rgba(15,23,42,0.03)]" style={{ backgroundColor: tint }}>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/70" style={{ color: iconColor }}>
          <Icon size={16} strokeWidth={2.25} />
        </div>
        <p className="text-sm font-bold text-[#5B6472]">{label}</p>
      </div>
      <p className="mt-3 text-3xl font-black tracking-tight text-[#101828]">{value}</p>
      <p className="mt-2 text-sm leading-5 text-[#5B6472]">{helper}</p>
    </div>
  );
}

function ProgressRing({ value }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#DCEFE1" strokeWidth="12" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#16A34A"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-[#101828]">{value}%</span>
        <span className="text-xs font-bold text-[#8A93A1]">done</span>
      </div>
    </div>
  );
}

function DomainCard({ domain }) {
  const Icon = domain.icon;
  return (
    <div className="rounded-3xl border border-[#EEF1EA] bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
      <div className="flex items-start gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${domain.color}18`, color: domain.color }}
        >
          <Icon size={22} strokeWidth={2.1} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-black text-[#101828]">{domain.name}</h3>
            <span className="shrink-0 rounded-full bg-[#F4F6F0] px-2.5 py-1 text-xs font-black text-[#9CA3AF]">
              Not started
            </span>
          </div>
          <p className="mt-1 text-sm leading-5 text-[#8A93A1]">{domain.interest}</p>
          <div className="mt-3 h-2 rounded-full bg-[#F0F1EB]">
            <div className="h-2 w-0 rounded-full transition-all" style={{ backgroundColor: domain.color }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyStateBox({ Icon, title, text }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#DCE2D3] bg-[#FAFBF7] p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#16A34A] shadow-sm">
        <Icon size={20} strokeWidth={2.25} />
      </div>
      <p className="mt-3 font-black text-[#101828]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#8A93A1]">{text}</p>
    </div>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  const childName = user?.name || "Your child";

  const completedDomains = 0;
  const progress = Math.round((completedDomains / domains.length) * 100);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Hero */}
      <section className="overflow-hidden rounded-[32px] border border-[#EEF1EA] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
        <div className="grid gap-0 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="bg-gradient-to-br from-white to-[#F6FBF6] p-7 sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF6EE] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#15803D]">
              <Sprout size={14} strokeWidth={2.5} />
              Interest Snapshot
            </span>

            <h1
              className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-[#101828] sm:text-5xl"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              {childName}'s Interest Snapshot
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-[#8A93A1]">
              A live look at current progress across 11 domains. Head to{" "}
              <span className="font-bold text-[#15803D]">Insights</span> for the deeper,
              parent-friendly summary once activities are completed.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <MetricCard Icon={CheckCircle2} label="Domains Completed" value={`${completedDomains}/${domains.length}`} helper="Across all interest areas" tint="#EFF6FF" iconColor="#2563EB" />
              <MetricCard Icon={Star} label="Top Interest" value="Pending" helper="Available after assessments" tint="#FFF7ED" iconColor="#D97706" />
              <MetricCard Icon={MessageCircle} label="Confidence" value="Pending" helper="After Talk with Buddy" tint="#F5F3FF" iconColor="#7C3AED" />
            </div>
          </div>

          <div className="border-t border-[#EEF1EA] bg-gradient-to-br from-[#EAF6EE] to-[#FAFBF7] p-7 sm:p-8 xl:border-l xl:border-t-0">
            <p className="text-sm font-black uppercase tracking-wide text-[#15803D]">Assessment status</p>

            <div className="mt-7 flex items-center justify-between gap-5 xl:flex-col xl:items-start">
              <ProgressRing value={progress} />
              <div>
                <p className="text-2xl font-black text-[#101828]">Not started</p>
                <p className="mt-2 text-sm leading-6 text-[#8A93A1]">
                  Start the first activity to build this child's interest profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain chart */}
      <section className="rounded-[32px] border border-[#EEF1EA] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
              Domain Score Chart
            </h2>
            <p className="mt-1 text-sm text-[#8A93A1]">Current scores for each domain, right now.</p>
          </div>
          <span className="rounded-full bg-[#F4F6F0] px-3 py-1 text-xs font-black text-[#9CA3AF]">0 records</span>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="flex h-64 min-w-[820px] items-end gap-3 rounded-2xl bg-[#FAFBF7] px-4 pb-5 pt-5">
            {domains.map((domain) => {
              const Icon = domain.icon;
              return (
                <div key={domain.name} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                  <Icon size={16} strokeWidth={2.25} style={{ color: domain.color }} />
                  <div className="relative h-full w-full max-w-[34px] overflow-hidden rounded-t-2xl bg-[#EEF1EA]">
                    <div className="absolute bottom-0 h-1.5 w-full rounded-t-2xl" style={{ backgroundColor: domain.color }} />
                  </div>
                  <p className="truncate text-center text-xs font-black text-[#8A93A1]">{domain.short}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interest Domains grid */}
      <section className="rounded-[32px] border border-[#EEF1EA] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Interest Domains
        </h2>
        <p className="mt-1 text-sm text-[#8A93A1]">These are the 11 areas the assessment will explore.</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {domains.map((domain) => (
            <DomainCard key={domain.name} domain={domain} />
          ))}
        </div>
      </section>

      {/* Confidence + Sessions */}
      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[32px] border border-[#EEF1EA] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
          <h2 className="text-2xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
            Confidence Snapshot
          </h2>
          <p className="mt-1 text-sm text-[#8A93A1]">Separate from interest scores.</p>

          <div className="mt-6 rounded-2xl bg-[#EFF6FF] p-5">
            <p className="text-sm font-semibold text-[#5B6472]">Communication Style</p>
            <p className="mt-2 text-2xl font-black text-[#101828]">Pending</p>
            <p className="mt-2 text-sm leading-6 text-[#8A93A1]">
              Complete Talk with Buddy to generate this section.
            </p>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#EEF1EA] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
          <h2 className="text-2xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
            Recent Sessions
          </h2>
          <div className="mt-5">
            <EmptyStateBox
              Icon={CalendarClock}
              title="No sessions yet"
              text="Once activities are completed, real scores, strengths, and insights will appear here."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
