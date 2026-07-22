import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  UserCog,
  Mail,
  Bell,
  ShieldCheck,
  LogOut,
  Trash2,
  Lock,
} from "lucide-react";

function SectionCard({ icon: Icon, tint, iconColor, title, subtitle, children }) {
  return (
    <div className="rounded-[28px] border border-[#EEF1EA] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: tint, color: iconColor }}
        >
          <Icon size={18} strokeWidth={2.25} />
        </div>
        <div>
          <h2 className="text-lg font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
            {title}
          </h2>
          {subtitle && <p className="text-xs font-semibold text-[#9CA3AF]">{subtitle}</p>}
        </div>
      </div>

      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function ToggleRow({ title, text, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#EEF1EA] bg-[#FAFBF7] p-4">
      <div>
        <p className="text-sm font-black text-[#101828]">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[#8A93A1]">{text}</p>
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`h-7 w-12 shrink-0 rounded-full p-1 transition ${checked ? "bg-[#16A34A]" : "bg-[#D8DDD1]"}`}
      >
        <span className={`block h-5 w-5 rounded-full bg-white transition ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

export default function Settings({ onNavigate }) {
  const { user, logout } = useAuth();

  const [weeklyEmail, setWeeklyEmail] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Account */}
      <SectionCard
        icon={UserCog}
        tint="#EFF6FF"
        iconColor="#2563EB"
        title="Account"
        subtitle="Your login details"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#344054]">Name</label>
            <div className="flex h-12 items-center rounded-2xl border border-[#E5E7DF] bg-[#FAFBF7] px-4 text-sm font-semibold text-[#101828]">
              {user?.name || "—"}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-[#344054]">
              <Mail size={13} className="mr-1 -mt-0.5 inline" strokeWidth={2.25} />
              Email
            </label>
            <div className="flex h-12 items-center rounded-2xl border border-[#E5E7DF] bg-[#FAFBF7] px-4 text-sm font-semibold text-[#101828]">
              {user?.email || "—"}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-dashed border-[#DCE2D3] bg-[#FAFBF7] p-4">
          <Lock size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-[#9CA3AF]" />
          <p className="text-sm leading-6 text-[#8A93A1]">
            Editing your name/email and changing your password are coming soon. For now, contact
            support if you need this updated.
          </p>
        </div>
      </SectionCard>

      {/* Notifications */}
      <SectionCard
        icon={Bell}
        tint="#FFF7ED"
        iconColor="#D97706"
        title="Notifications"
        subtitle="Choose what we email you about"
      >
        <ToggleRow
          title="Weekly progress email"
          text="A short recap of completed activities and interest highlights."
          checked={weeklyEmail}
          onChange={() => setWeeklyEmail((v) => !v)}
        />
        <ToggleRow
          title="Product updates"
          text="Occasional emails about new features and activities."
          checked={productUpdates}
          onChange={() => setProductUpdates((v) => !v)}
        />
      </SectionCard>

      {/* Privacy & Data */}
      <SectionCard
        icon={ShieldCheck}
        tint="#EAF6EE"
        iconColor="#16A34A"
        title="Privacy & Data"
        subtitle="How your child's data is handled"
      >
        <div className="rounded-2xl border border-[#EEF1EA] bg-[#FAFBF7] p-4">
          <p className="text-sm leading-6 text-[#5B6472]">
            Camera and microphone consent is managed per child profile, and can be turned on or
            off any time from the Child Profiles page.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.("Child Profiles")}
            className="mt-3 rounded-xl border border-[#E5E7DF] bg-white px-4 py-2 text-sm font-bold text-[#15803D] transition hover:bg-[#EAF6EE]"
          >
            Manage consent in Child Profiles
          </button>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-dashed border-[#DCE2D3] bg-[#FAFBF7] p-4">
          <ShieldCheck size={16} strokeWidth={2.25} className="mt-0.5 shrink-0 text-[#9CA3AF]" />
          <p className="text-sm leading-6 text-[#8A93A1]">
            Data export and full account deletion requests are coming soon.
          </p>
        </div>
      </SectionCard>

      {/* Danger zone */}
      <SectionCard
        icon={Trash2}
        tint="#FFF1F2"
        iconColor="#E11D48"
        title="Danger Zone"
        subtitle="Careful — these affect your access"
      >
        <button
          type="button"
          onClick={logout}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#E5E7DF] bg-white text-sm font-bold text-[#4B5563] transition hover:bg-[#F7F8F5] sm:w-auto sm:px-6"
        >
          <LogOut size={16} strokeWidth={2.25} />
          Log out of this account
        </button>

        <button
          type="button"
          disabled
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#FFB3A8] bg-[#FFF0ED] text-sm font-bold text-[#9B2D1F] opacity-60 sm:w-auto sm:px-6"
        >
          <Trash2 size={16} strokeWidth={2.25} />
          Delete account (coming soon)
        </button>
      </SectionCard>
    </div>
  );
}
