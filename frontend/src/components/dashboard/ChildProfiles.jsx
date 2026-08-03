import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { profileApi } from "../../services/api";
import { REQUIRED_FIELDS } from "../../utils/profileComplete";
import {
  User,
  GraduationCap,
  Sparkles,
  Users,
  HeartHandshake,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  Clock,
  School,
  MapPin,
  Languages,
  Mail,
} from "lucide-react";

function getDifficulty(age) {
  const n = Number(age);
  if (!n) return "Not selected";
  if (n <= 6) return "Easy";
  if (n <= 9) return "Medium";
  return "Hard";
}

const emptyProfile = {
  fullName: "",
  preferredName: "",
  age: "",
  gender: "",
  grade: "",
  school: "",
  city: "",
  language: "",
  guardianName: "",
  guardianRelation: "",
  guardianEmail: "",
  favoriteSubject: "",
  favoriteActivity: "",
  hobbies: "",
  supportNote: "",
  consent: false,
};

// Unicode-aware: \p{L} matches letters in any script (Hindi, Arabic,
// Chinese, accented Latin, etc.), not just A-Z. Requires the "u" flag.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[\p{L}][\p{L}\s'.-]{1,49}$/u;
const PREFERRED_NAME_RE = /^[\p{L}][\p{L}\s'.-]{0,7}$/u; // 1–8 characters total, shown on the main menu
const LETTERS_ONLY_RE = /^[\p{L}][\p{L}\s'-]{1,79}$/u;
const SCHOOL_RE = /^[\p{L}\p{N}\s,.'-]{2,80}$/u;
const HAS_LETTER_RE = /\p{L}/u;
const HOBBIES_RE = /^[\p{L}\p{N}\s,.'-]{2,300}$/u;
const GRADE_RE = /^[\p{L}\p{N}\s.-]{1,20}$/u;

const FIELD_VALIDATORS = {
  fullName: { re: NAME_RE, message: "Enter a valid name (letters only)." },
  preferredName: {
    re: PREFERRED_NAME_RE,
    message: "Preferred name must be 1–8 letters (shown on the main menu).",
  },
  age: {
    validate: (v) => Number.isInteger(Number(v)) && Number(v) > 0,
    message: "Age must be a positive whole number.",
  },
  school: {
    validate: (v) => SCHOOL_RE.test(v) && HAS_LETTER_RE.test(v),
    message: "Enter a valid school name.",
  },
  grade: { re: GRADE_RE, message: "Enter a valid grade/class, e.g. Class 4." },
  city: { re: NAME_RE, message: "Enter a valid city name (letters only)." },
  favoriteSubject: { re: LETTERS_ONLY_RE, message: "Enter a valid subject (letters only)." },
  favoriteActivity: { re: LETTERS_ONLY_RE, message: "Enter a valid activity (letters only)." },
  hobbies: {
    validate: (v) => HOBBIES_RE.test(v) && HAS_LETTER_RE.test(v),
    message: "Enter valid hobbies or interests.",
  },
  guardianName: { re: NAME_RE, message: "Enter a valid name (letters only)." },
  guardianEmail: { re: EMAIL_RE, message: "Enter a valid email address." },
};

const baseInputClass =
  "h-12 w-full rounded-2xl border border-[#E5E7DF] bg-[#FCFDFB] px-4 text-sm text-[#101828] outline-none transition focus:border-[#16A34A] focus:bg-white focus:ring-4 focus:ring-[#DCEFE1]";
const baseTextareaClass =
  "min-h-[100px] w-full rounded-2xl border border-[#E5E7DF] bg-[#FCFDFB] px-4 py-3 text-sm text-[#101828] outline-none transition focus:border-[#16A34A] focus:bg-white focus:ring-4 focus:ring-[#DCEFE1]";
const errorRing = "border-red-500 focus:border-red-500 focus:ring-red-100";
const labelClass = "mb-2 block text-sm font-bold text-[#344054]";

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

      <div className="mt-5 grid gap-5 md:grid-cols-2">{children}</div>
    </div>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-bold text-red-600">{message}</p>;
}

export default function ChildProfiles() {
  const { user, token } = useAuth();
  const storageKey = `kids-compass-profile-${user?.email || "guest"}`;

  const [profile, setProfile] = useState({
    ...emptyProfile,
    fullName: user?.name || "",
    guardianEmail: user?.email || "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState("");

  const update = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const { [field]: _removed, ...rest } = current;
      return rest;
    });
    setMessage("");
    setError("");
  };

  const inputClass = (field) => `${baseInputClass} ${errors[field] ? errorRing : ""}`;
  const textareaClass = (field) => `${baseTextareaClass} ${errors[field] ? errorRing : ""}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      setProfile((current) => ({ ...current, ...JSON.parse(saved) }));
    }

    async function loadFromDatabase() {
      if (!token) return;

      try {
        const data = await profileApi.get(token);
        if (data.profile) {
          setProfile((current) => {
            const merged = { ...current, ...data.profile };
            localStorage.setItem(storageKey, JSON.stringify(merged));
            return merged;
          });
        }
      } catch {
        // Backend unavailable — locally saved profile still works.
      }
    }

    loadFromDatabase();
  }, [storageKey, token]);

  function validate() {
    const next = {};
    for (const field of REQUIRED_FIELDS) {
      const value = String(profile[field] ?? "").trim();

      if (!value) {
        next[field] = "This field is required.";
        continue;
      }

      const rule = FIELD_VALIDATORS[field];
      if (rule) {
        const isValid = rule.validate ? rule.validate(value) : rule.re.test(value);
        if (!isValid) next[field] = rule.message;
      }
    }
    return next;
  }

  const saveProfile = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstField = REQUIRED_FIELDS.find((f) => validationErrors[f]);
      const el = document.getElementById(`field-${firstField}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      setMessage("");
      setError("Please fix the highlighted fields below.");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      localStorage.setItem(storageKey, JSON.stringify(profile));

      if (token) {
        try {
          await profileApi.save(profile, token);
        } catch {
          // Local save still succeeds even if the backend call fails.
        }
      }

      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setLastSaved(time);
      setMessage("Profile saved successfully.");
    } catch (err) {
      setError(err.message || "Could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  const difficulty = getDifficulty(profile.age);
  const displayName = profile.preferredName || profile.fullName || "Child";
  const initial = displayName.charAt(0).toUpperCase() || "C";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Intro strip */}
      <section className="flex flex-wrap items-center gap-4 rounded-[28px] border border-[#EEF1EA] bg-gradient-to-br from-[#EAF6EE] to-white p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#15803D] shadow-sm">
          <Shield size={20} strokeWidth={2.25} />
        </div>
        <div>
          <p className="font-black text-[#101828]">Why we ask for these details</p>
          <p className="mt-1 text-sm leading-6 text-[#5B6472]">
            This information personalizes activities and sets the right difficulty level for your
            child. Nothing here is shared outside your account, and camera/microphone access is
            always separately consented to below.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        {/* Main form */}
        <div className="space-y-6">
          <SectionCard
            icon={User}
            tint="#EFF6FF"
            iconColor="#2563EB"
            title="Personal Details"
            subtitle="Basic information about your child"
          >
            <div>
              <label className={labelClass}>Full name</label>
              <input
                id="field-fullName"
                className={inputClass("fullName")}
                placeholder="Example: Riya Sharma"
                value={profile.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
              <FieldError message={errors.fullName} />
            </div>
            <div>
              <label className={labelClass}>Preferred name</label>
              <input
                id="field-preferredName"
                maxLength={8}
                className={inputClass("preferredName")}
                placeholder="Example: Riya"
                value={profile.preferredName}
                onChange={(e) => update("preferredName", e.target.value)}
              />
              <FieldError message={errors.preferredName} />
            </div>
            <div>
              <label className={labelClass}>Age</label>
              <input
                id="field-age"
                className={inputClass("age")}
                type="number"
                min="1"
                step="1"
                placeholder="Enter age"
                value={profile.age}
                onChange={(e) => update("age", e.target.value)}
              />
              <FieldError message={errors.age} />
            </div>
            <div>
              <label className={labelClass}>Gender</label>
              <select
                id="field-gender"
                className={inputClass("gender")}
                value={profile.gender}
                onChange={(e) => update("gender", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Boy">Boy</option>
                <option value="Girl">Girl</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <FieldError message={errors.gender} />
            </div>
          </SectionCard>

          <SectionCard
            icon={GraduationCap}
            tint="#FFF7ED"
            iconColor="#D97706"
            title="School & Language"
            subtitle="Helps tailor activity difficulty and wording"
          >
            <div>
              <label className={labelClass}><School size={13} className="mr-1 -mt-0.5 inline" strokeWidth={2.25} />School name</label>
              <input
                id="field-school"
                className={inputClass("school")}
                placeholder="Example: Green Valley School"
                value={profile.school}
                onChange={(e) => update("school", e.target.value)}
              />
              <FieldError message={errors.school} />
            </div>
            <div>
              <label className={labelClass}>Grade / Class</label>
              <input
                id="field-grade"
                className={inputClass("grade")}
                placeholder="Example: Class 4"
                value={profile.grade}
                onChange={(e) => update("grade", e.target.value)}
              />
              <FieldError message={errors.grade} />
            </div>
            <div>
              <label className={labelClass}><MapPin size={13} className="mr-1 -mt-0.5 inline" strokeWidth={2.25} />City</label>
              <input
                id="field-city"
                className={inputClass("city")}
                placeholder="Example: Delhi"
                value={profile.city}
                onChange={(e) => update("city", e.target.value)}
              />
              <FieldError message={errors.city} />
            </div>
            <div>
              <label className={labelClass}><Languages size={13} className="mr-1 -mt-0.5 inline" strokeWidth={2.25} />Preferred language</label>
              <select
                id="field-language"
                className={inputClass("language")}
                value={profile.language}
                onChange={(e) => update("language", e.target.value)}
              >
                <option value="">Select</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Other">Other</option>
              </select>
              <FieldError message={errors.language} />
            </div>
          </SectionCard>

          <SectionCard
            icon={Sparkles}
            tint="#F5F3FF"
            iconColor="#7C3AED"
            title="Interests & Personality"
            subtitle="What lights your child up"
          >
            <div>
              <label className={labelClass}>Favorite subject</label>
              <input
                id="field-favoriteSubject"
                className={inputClass("favoriteSubject")}
                placeholder="Example: Art, Maths, English"
                value={profile.favoriteSubject}
                onChange={(e) => update("favoriteSubject", e.target.value)}
              />
              <FieldError message={errors.favoriteSubject} />
            </div>
            <div>
              <label className={labelClass}>Favorite activity</label>
              <input
                id="field-favoriteActivity"
                className={inputClass("favoriteActivity")}
                placeholder="Example: drawing, football, stories"
                value={profile.favoriteActivity}
                onChange={(e) => update("favoriteActivity", e.target.value)}
              />
              <FieldError message={errors.favoriteActivity} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Hobbies or interests</label>
              <textarea
                id="field-hobbies"
                className={textareaClass("hobbies")}
                placeholder="Example: drawing, dancing, puzzles, music..."
                value={profile.hobbies}
                onChange={(e) => update("hobbies", e.target.value)}
              />
              <FieldError message={errors.hobbies} />
            </div>
          </SectionCard>

          <SectionCard
            icon={Users}
            tint="#EAF6EE"
            iconColor="#16A34A"
            title="Guardian Details"
            subtitle="Primary point of contact"
          >
            <div>
              <label className={labelClass}>Guardian name</label>
              <input
                id="field-guardianName"
                className={inputClass("guardianName")}
                placeholder="Example: Mother / Father name"
                value={profile.guardianName}
                onChange={(e) => update("guardianName", e.target.value)}
              />
              <FieldError message={errors.guardianName} />
            </div>
            <div>
              <label className={labelClass}>Relation</label>
              <select
                id="field-guardianRelation"
                className={inputClass("guardianRelation")}
                value={profile.guardianRelation}
                onChange={(e) => update("guardianRelation", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Guardian">Guardian</option>
                <option value="Other">Other</option>
              </select>
              <FieldError message={errors.guardianRelation} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}><Mail size={13} className="mr-1 -mt-0.5 inline" strokeWidth={2.25} />Guardian email</label>
              <input
                id="field-guardianEmail"
                className={inputClass("guardianEmail")}
                type="email"
                placeholder="you@example.com"
                value={profile.guardianEmail}
                onChange={(e) => update("guardianEmail", e.target.value)}
              />
              <FieldError message={errors.guardianEmail} />
            </div>
          </SectionCard>

          <SectionCard
            icon={HeartHandshake}
            tint="#FFF1F2"
            iconColor="#E11D48"
            title="Support Note"
            subtitle="Anything we should be mindful of"
          >
            <div className="md:col-span-2">
              <textarea
                className={baseTextareaClass}
                placeholder="Anything parent/guardian wants us to keep in mind..."
                value={profile.supportNote}
                onChange={(e) => update("supportNote", e.target.value)}
              />
            </div>
          </SectionCard>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="overflow-hidden rounded-[28px] border border-[#EEF1EA] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.03)]">
            <div className="bg-gradient-to-br from-[#16A34A] to-[#15803D] p-6 text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black">
                {initial}
              </div>
              <p className="mt-4 text-2xl font-black" style={{ fontFamily: "'Baloo 2', cursive" }}>
                {displayName}
              </p>
              <p className="mt-1 text-sm font-semibold text-white/85">
                {profile.age ? `Age ${profile.age}` : "Age not added"} · {difficulty}
              </p>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#EEF1EA] bg-[#FAFBF7] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#15803D]">
                    <Shield size={16} strokeWidth={2.25} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#101828]">Camera & mic consent</p>
                    <p className="mt-1 text-xs leading-5 text-[#8A93A1]">Only for speaking activities.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => update("consent", !profile.consent)}
                  className={`h-7 w-12 shrink-0 rounded-full p-1 transition ${profile.consent ? "bg-[#16A34A]" : "bg-[#D8DDD1]"}`}
                >
                  <span className={`block h-5 w-5 rounded-full bg-white transition ${profile.consent ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              {message && (
                <div className="flex items-start gap-2 rounded-2xl border border-[#B7D96A] bg-[#F1FFD2] px-4 py-3 text-sm font-bold text-[#42591F]">
                  <CheckCircle2 size={16} strokeWidth={2.25} className="mt-0.5 shrink-0" />
                  {message}
                </div>
              )}

              {error && (
                <div className="flex items-start gap-2 rounded-2xl border border-[#FFB3A8] bg-[#FFF0ED] px-4 py-3 text-sm font-bold text-[#9B2D1F]">
                  <AlertCircle size={16} strokeWidth={2.25} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              {lastSaved && (
                <p className="flex items-center gap-1.5 text-xs font-bold text-[#8A93A1]">
                  <Clock size={13} strokeWidth={2.25} />
                  Last saved at {lastSaved}
                </p>
              )}

              <button
                type="button"
                onClick={saveProfile}
                disabled={saving}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123524] font-black text-white transition hover:bg-[#16A34A] disabled:opacity-70"
              >
                <Save size={16} strokeWidth={2.25} />
                {saving ? "Saving..." : "Save profile"}
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}