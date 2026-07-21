import { useAuth } from "../../hooks/useAuth";

const domains = [
  { name: "Logical / Analytical", short: "Logic", interest: "Puzzles, patterns, numbers, strategy", color: "#2563eb" },
  { name: "Creative / Artistic", short: "Creative", interest: "Drawing, imagination, colors, design", color: "#7c3aed" },
  { name: "Verbal / Linguistic", short: "Verbal", interest: "Stories, reading, speaking, vocabulary", color: "#dc2626" },
  { name: "Spatial / Visual", short: "Spatial", interest: "Blocks, maps, shapes, visual planning", color: "#0891b2" },
  { name: "Social / Interpersonal", short: "Social", interest: "Teamwork, friends, understanding people", color: "#16a34a" },
  { name: "Bodily / Kinesthetic", short: "Movement", interest: "Sports, dance, movement, coordination", color: "#d97706" },
  { name: "Music / Rhythm", short: "Music", interest: "Singing, instruments, beats, rhythm", color: "#db2777" },
  { name: "Nature / Animals", short: "Nature", interest: "Animals, plants, outdoor curiosity", color: "#4d7c0f" },
  { name: "Technology / Machines", short: "Tech", interest: "Gadgets, robots, coding, machines", color: "#0f766e" },
  { name: "Leadership / Organizing", short: "Lead", interest: "Planning, decisions, managing tasks", color: "#7c2d12" },
  { name: "Caregiving / Empathy", short: "Care", interest: "Kindness, emotions, helping behavior", color: "#ea580c" },
];

function MetricCard({ label, value, helper }) {
  return (
    <div className="rounded-[22px] border border-[#e4e7df] bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)]">
      <p className="text-sm font-semibold text-[#667085]">{label}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-[#101828]">{value}</p>
      <p className="mt-2 text-sm leading-5 text-[#667085]">{helper}</p>
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
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e8ece2" strokeWidth="12" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#1f7a4d"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-[#101828]">{value}%</span>
        <span className="text-xs font-bold text-[#667085]">done</span>
      </div>
    </div>
  );
}

function DomainBars() {
  return (
    <div className="overflow-x-auto">
      <div className="flex h-72 min-w-[820px] items-end gap-3 rounded-2xl bg-[#fafbf7] px-4 pb-5 pt-5">
        {domains.map((domain) => (
          <div key={domain.name} className="flex h-full min-w-0 flex-1 flex-col justify-end">
            <div className="flex flex-1 items-end justify-center">
              <div className="relative h-full w-full max-w-[38px] overflow-hidden rounded-t-2xl bg-[#e8ece2]">
                <div
                  className="absolute bottom-0 h-1.5 w-full rounded-t-2xl"
                  style={{ backgroundColor: domain.color }}
                />
              </div>
            </div>
            <p className="mt-3 truncate text-center text-xs font-black text-[#667085]">
              {domain.short}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DomainGrid() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {domains.map((domain) => (
        <div
          key={domain.name}
          className="rounded-2xl border border-[#edf0e8] bg-white p-4 shadow-[0_6px_18px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.07)]"
        >
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 h-10 w-10 shrink-0 rounded-2xl"
              style={{ backgroundColor: `${domain.color}18` }}
            >
              <div
                className="m-auto mt-[9px] h-[22px] w-[22px] rounded-full"
                style={{ backgroundColor: domain.color }}
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-black text-[#101828]">{domain.name}</h3>
                <span className="rounded-full bg-[#f4f6f0] px-2.5 py-1 text-xs font-black text-[#667085]">
                  --
                </span>
              </div>
              <p className="mt-1 text-sm leading-5 text-[#667085]">{domain.interest}</p>
              <div className="mt-3 h-2 rounded-full bg-[#e8ece2]">
                <div className="h-2 w-0 rounded-full" style={{ backgroundColor: domain.color }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyStateBox() {
  return (
    <div className="rounded-2xl border border-dashed border-[#d7ddcf] bg-[#fafbf7] p-6">
      <p className="font-black text-[#101828]">No sessions yet</p>
      <p className="mt-2 text-sm leading-6 text-[#667085]">
        Once activities are completed, real scores, strengths, and insights will appear here.
      </p>
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
      <section className="overflow-hidden rounded-[28px] border border-[#dfe6d7] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div className="grid gap-0 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="p-7 sm:p-8">

            <h1
              className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-[#101828] sm:text-5xl"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              {childName}'s Interest Snapshot
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-[#667085]">
              A clean view of current curiosity across 11 domains. The dashboard stays empty until
              real activities are completed, so parents never see fake scores.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <MetricCard label="Domains Completed" value={`${completedDomains}/${domains.length}`} helper="Across all interest areas" />
              <MetricCard label="Top Interest" value="Pending" helper="Available after assessments" />
              <MetricCard label="Confidence" value="Pending" helper="After Talk with Buddy" />
            </div>
          </div>

          <div className="border-t border-[#e4e7df] bg-[#eef7e8] p-7 sm:p-8 xl:border-l xl:border-t-0">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1f7a4d]">
              Assessment status
            </p>

            <div className="mt-7 flex items-center justify-between gap-5 xl:flex-col xl:items-start">
              <ProgressRing value={progress} />

              <div>
                <p className="text-2xl font-black text-[#101828]">Not started</p>
                <p className="mt-2 text-sm leading-6 text-[#667085]">
                  Start the first activity to build this child's interest profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-[#e4e7df] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#101828]">Domain Score Chart</h2>
              <p className="mt-1 text-sm text-[#667085]">
                Scores will appear here after each domain activity.
              </p>
            </div>
            <span className="rounded-full bg-[#f4f6f0] px-3 py-1 text-xs font-black text-[#667085]">
              0 records
            </span>
          </div>

          <div className="mt-6">
            <DomainBars />
          </div>
        </div>

        <div className="rounded-[28px] border border-[#e4e7df] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-black text-[#101828]">Parent Insight</h2>
          <p className="mt-3 text-base font-semibold leading-7 text-[#344054]">
            No insight is available yet. Once {childName} completes activities, this section will
            summarize current interests in simple parent-friendly language.
          </p>

          <div className="mt-6 rounded-2xl bg-[#fafbf7] p-5">
            <p className="text-sm font-black text-[#101828]">Scoring rule</p>
            <p className="mt-2 text-sm leading-6 text-[#667085]">
              A domain should count as a strength only when performance and engagement are both high.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-[#e4e7df] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#101828]">Interest Domains</h2>
            <p className="mt-1 text-sm text-[#667085]">
              These are the 11 areas the assessment will explore.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <DomainGrid />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[28px] border border-[#e4e7df] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-black text-[#101828]">Confidence Snapshot</h2>
          <p className="mt-1 text-sm text-[#667085]">Separate from interest scores.</p>

          <div className="mt-6 rounded-2xl bg-[#fafbf7] p-5">
            <p className="text-sm font-semibold text-[#667085]">Communication Style</p>
            <p className="mt-2 text-2xl font-black text-[#101828]">Pending</p>
            <p className="mt-2 text-sm leading-6 text-[#667085]">
              Complete Talk with Buddy to generate this section.
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#e4e7df] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.05)]">
          <h2 className="text-2xl font-black text-[#101828]">Recent Sessions</h2>
          <div className="mt-5">
            <EmptyStateBox />
          </div>
        </div>
      </section>
    </div>
  );
}
