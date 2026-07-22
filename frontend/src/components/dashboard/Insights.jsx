import { useAuth } from "../../hooks/useAuth";
import {
  Lightbulb,
  Award,
  TrendingUp,
  MessagesSquare,
  LineChart,
  ShieldCheck,
  ListChecks,
  ArrowRight,
  UserCircle2,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";

function SummaryCard({ icon: Icon, tint, iconColor, label, value, helper }) {
  return (
    <div className="rounded-[28px] border border-[#EEF1EA] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
      <div
        className="flex h-11 w-11 items-center justify-center rounded-2xl"
        style={{ backgroundColor: tint, color: iconColor }}
      >
        <Icon size={20} strokeWidth={2.25} />
      </div>
      <p className="mt-4 text-sm font-bold text-[#8A93A1]">{label}</p>
      <p className="mt-1 text-2xl font-black text-[#101828]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#8A93A1]">{helper}</p>
    </div>
  );
}

function PrincipleRow({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#EEF1EA] bg-[#FAFBF7] p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#15803D]">
        <Icon size={16} strokeWidth={2.25} />
      </div>
      <div>
        <p className="text-sm font-black text-[#101828]">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[#8A93A1]">{text}</p>
      </div>
    </div>
  );
}

function NextStepRow({ icon: Icon, tint, iconColor, title, text, ctaLabel, onClick }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#EEF1EA] bg-white p-4">
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: tint, color: iconColor }}
        >
          <Icon size={18} strokeWidth={2.25} />
        </div>
        <div>
          <p className="text-sm font-black text-[#101828]">{title}</p>
          <p className="mt-1 text-sm leading-6 text-[#8A93A1]">{text}</p>
        </div>
      </div>

      {ctaLabel && (
        <button
          type="button"
          onClick={onClick}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#E5E7DF] bg-white px-4 py-2 text-sm font-bold text-[#15803D] transition hover:bg-[#EAF6EE]"
        >
          {ctaLabel}
          <ArrowRight size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

export default function Insights({ onNavigate }) {
  const { user } = useAuth();
  const childName = user?.name || "your child";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Intro */}
      <section className="flex flex-wrap items-center gap-4 rounded-[28px] border border-[#EEF1EA] bg-gradient-to-br from-[#F5F3FF] to-white p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#7C3AED] shadow-sm">
          <Lightbulb size={20} strokeWidth={2.25} />
        </div>
        <div>
          <p className="font-black text-[#101828]">Insights, built from real activity</p>
          <p className="mt-1 text-sm leading-6 text-[#5B6472]">
            This page turns completed assessments into simple, parent-friendly takeaways about{" "}
            {childName}. Nothing shown here is guessed — it only fills in once real sessions are
            completed.
          </p>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          icon={Award}
          tint="#FFF7ED"
          iconColor="#D97706"
          label="Top Strengths"
          value="Pending"
          helper="Domains with both high performance and high engagement will appear here."
        />
        <SummaryCard
          icon={TrendingUp}
          tint="#EFF6FF"
          iconColor="#2563EB"
          label="Growing Interests"
          value="Pending"
          helper="Areas showing rising engagement across sessions."
        />
        <SummaryCard
          icon={MessagesSquare}
          tint="#F5F3FF"
          iconColor="#7C3AED"
          label="Communication Style"
          value="Pending"
          helper="Generated after completing Talk with Buddy."
        />
      </section>

      {/* Trend chart placeholder */}
      <section className="rounded-[32px] border border-[#EEF1EA] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
              Interest Trend Over Time
            </h2>
            <p className="mt-1 text-sm text-[#8A93A1]">
              Shows how {childName}'s top domains shift across sessions.
            </p>
          </div>
          <span className="rounded-full bg-[#F4F6F0] px-3 py-1 text-xs font-black text-[#9CA3AF]">
            Needs 2+ sessions
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#DCE2D3] bg-[#FAFBF7] py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm">
            <LineChart size={20} strokeWidth={2.25} />
          </div>
          <p className="font-black text-[#101828]">No trend data yet</p>
          <p className="max-w-sm text-sm leading-6 text-[#8A93A1]">
            Once {childName} completes activities across a couple of sessions, this chart will
            plot how interests grow or shift over time.
          </p>
        </div>
      </section>

      {/* How insights are generated */}
      <section className="rounded-[32px] border border-[#EEF1EA] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
          How These Insights Are Generated
        </h2>
        <p className="mt-1 text-sm text-[#8A93A1]">A quick, honest explanation of what this page can and can't tell you.</p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <PrincipleRow
            icon={ClipboardCheck}
            title="Built from real activity"
            text="Every number here traces back to a completed game or activity — never estimated."
          />
          <PrincipleRow
            icon={Sparkles}
            title="Strength needs both signals"
            text="A domain counts as a strength only when performance and engagement are both high."
          />
          <PrincipleRow
            icon={ShieldCheck}
            title="Not a diagnostic tool"
            text="This is a snapshot of current curiosity, not a prediction of future ability or career."
          />
          <PrincipleRow
            icon={UserCircle2}
            title="You stay in control"
            text="Camera and mic data is never stored, and profile details can be edited any time."
          />
        </div>
      </section>

      {/* Next steps */}
      <section className="rounded-[32px] border border-[#EEF1EA] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Recommended Next Steps
        </h2>
        <p className="mt-1 text-sm text-[#8A93A1]">Do these to start unlocking real insights.</p>

        <div className="mt-5 space-y-3">
          <NextStepRow
            icon={UserCircle2}
            tint="#EFF6FF"
            iconColor="#2563EB"
            title="Complete the child profile"
            text="Age and interests help tailor activity difficulty and wording."
            ctaLabel="Go to Child Profiles"
            onClick={() => onNavigate?.("Child Profiles")}
          />
          <NextStepRow
            icon={ListChecks}
            tint="#FFF7ED"
            iconColor="#D97706"
            title="Start the first assessment"
            text="Each completed domain activity adds real data to this page."
            ctaLabel="Go to Assessments"
            onClick={() => onNavigate?.("Assessments")}
          />
          <NextStepRow
            icon={MessagesSquare}
            tint="#F5F3FF"
            iconColor="#7C3AED"
            title="Try Talk with Buddy"
            text="A short guided conversation that helps generate the Communication Style insight."
          />
        </div>
      </section>
    </div>
  );
}
