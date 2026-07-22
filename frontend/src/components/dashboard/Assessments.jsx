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
} from "lucide-react";

const domains = [
  { name: "Logical / Analytical", color: "#2563EB", icon: Puzzle },
  { name: "Creative / Artistic", color: "#7C3AED", icon: Palette },
  { name: "Verbal / Linguistic", color: "#DC2626", icon: BookOpen },
  { name: "Spatial / Visual", color: "#0891B2", icon: Boxes },
  { name: "Social / Interpersonal", color: "#16A34A", icon: Users },
  { name: "Bodily / Kinesthetic", color: "#D97706", icon: Footprints },
  { name: "Music / Rhythm", color: "#DB2777", icon: Music2 },
  { name: "Nature / Animals", color: "#4D7C0F", icon: Leaf },
  { name: "Technology / Machines", color: "#0F766E", icon: Cpu },
  { name: "Leadership / Organizing", color: "#7C2D12", icon: Compass },
  { name: "Caregiving / Empathy", color: "#EA580C", icon: HeartHandshake },
];

export default function Assessments() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="flex flex-wrap items-center gap-4 rounded-[28px] border border-[#EEF1EA] bg-gradient-to-br from-[#FFF7ED] to-white p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#D97706] shadow-sm">
          <ClipboardList size={20} strokeWidth={2.25} />
        </div>
        <div>
          <p className="font-black text-[#101828]">Short, playful activities — not a test</p>
          <p className="mt-1 text-sm leading-6 text-[#5B6472]">
            Each assessment is a 3–5 minute mini-activity for one domain. There's no pass or fail —
            only what your child enjoys and how confidently they engage.
          </p>
        </div>
      </section>

      <section className="rounded-[32px] border border-[#EEF1EA] bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
        <h2 className="text-2xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Available Assessments
        </h2>
        <p className="mt-1 text-sm text-[#8A93A1]">These activities are being built and will unlock here soon.</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.name}
                className="flex items-center gap-3 rounded-3xl border border-[#EEF1EA] bg-white p-5 opacity-90 shadow-[0_6px_18px_rgba(15,23,42,0.03)]"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${domain.color}18`, color: domain.color }}
                >
                  <Icon size={22} strokeWidth={2.1} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-[#101828]">{domain.name}</p>
                  <span className="mt-1 inline-block rounded-full bg-[#F4F6F0] px-2.5 py-1 text-xs font-black text-[#9CA3AF]">
                    Coming soon
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
