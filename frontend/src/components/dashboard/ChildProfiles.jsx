import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { profileApi } from "../../services/api";

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
  city: "",
  guardianName: "",
  guardianRelation: "",
  guardianEmail: "",
  favoriteSubject: "",
  favoriteActivity: "",
  hobbies: "",
  supportNote: "",
  consent: false,
};

export default function ChildProfiles() {
  const { user, token } = useAuth();
  const storageKey = `kids-compass-profile-${user?.email || "guest"}`;

  const [profile, setProfile] = useState({
    ...emptyProfile,
    fullName: user?.name || "",
    guardianEmail: user?.email || "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState("");

  const update = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
  };

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
        // Backend band ho to bhi local saved profile kaam karegi.
      }
    }

    loadFromDatabase();
  }, [storageKey, token]);

  const saveProfile = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      localStorage.setItem(storageKey, JSON.stringify(profile));

      if (token) {
        try {
          await profileApi.save(profile, token);
        } catch {
          // Local save successful rahega, backend unavailable ho to error nahi dikhayenge.
        }
      }

      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

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

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl border border-[#e4e7df] bg-white p-6 shadow-sm">
        <h1 className="text-4xl font-black text-[#101828]" style={{ fontFamily: "'Baloo 2', cursive" }}>
          Child Profile
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#667085]">
          Basic child details for personalizing activities and assessment difficulty.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-3xl border border-[#e4e7df] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-[#101828]">Basic Information</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-[#344054]">Full name</label>
              <input className="h-12 w-full rounded-2xl border border-[#d8ddd1] px-4 outline-none focus:border-[#1f7a4d] focus:ring-4 focus:ring-[#dff2b8]" placeholder="Example: Riya Sharma" value={profile.fullName} onChange={(e) => update("fullName", e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#344054]">Preferred name</label>
              <input className="h-12 w-full rounded-2xl border border-[#d8ddd1] px-4 outline-none focus:border-[#1f7a4d] focus:ring-4 focus:ring-[#dff2b8]" placeholder="Example: Riya" value={profile.preferredName} onChange={(e) => update("preferredName", e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#344054]">Age</label>
              <input className="h-12 w-full rounded-2xl border border-[#d8ddd1] px-4 outline-none focus:border-[#1f7a4d] focus:ring-4 focus:ring-[#dff2b8]" type="number" min="4" max="12" placeholder="Age between 4 and 12" value={profile.age} onChange={(e) => update("age", e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#344054]">Grade / Class</label>
              <input className="h-12 w-full rounded-2xl border border-[#d8ddd1] px-4 outline-none focus:border-[#1f7a4d] focus:ring-4 focus:ring-[#dff2b8]" placeholder="Example: Class 4" value={profile.grade} onChange={(e) => update("grade", e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#344054]">City</label>
              <input className="h-12 w-full rounded-2xl border border-[#d8ddd1] px-4 outline-none focus:border-[#1f7a4d] focus:ring-4 focus:ring-[#dff2b8]" placeholder="Example: Delhi" value={profile.city} onChange={(e) => update("city", e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#344054]">Favorite subject</label>
              <input className="h-12 w-full rounded-2xl border border-[#d8ddd1] px-4 outline-none focus:border-[#1f7a4d] focus:ring-4 focus:ring-[#dff2b8]" placeholder="Example: Art, Maths, English" value={profile.favoriteSubject} onChange={(e) => update("favoriteSubject", e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#344054]">Favorite activity</label>
              <input className="h-12 w-full rounded-2xl border border-[#d8ddd1] px-4 outline-none focus:border-[#1f7a4d] focus:ring-4 focus:ring-[#dff2b8]" placeholder="Example: drawing, football, stories" value={profile.favoriteActivity} onChange={(e) => update("favoriteActivity", e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#344054]">Parent / guardian name</label>
              <input className="h-12 w-full rounded-2xl border border-[#d8ddd1] px-4 outline-none focus:border-[#1f7a4d] focus:ring-4 focus:ring-[#dff2b8]" placeholder="Example: Mother / Father name" value={profile.guardianName} onChange={(e) => update("guardianName", e.target.value)} />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-[#344054]">Hobbies or interests</label>
              <textarea className="min-h-[90px] w-full rounded-2xl border border-[#d8ddd1] px-4 py-3 outline-none focus:border-[#1f7a4d] focus:ring-4 focus:ring-[#dff2b8]" placeholder="Example: drawing, dancing, puzzles, music..." value={profile.hobbies} onChange={(e) => update("hobbies", e.target.value)} />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-[#344054]">Support note</label>
              <textarea className="min-h-[90px] w-full rounded-2xl border border-[#d8ddd1] px-4 py-3 outline-none focus:border-[#1f7a4d] focus:ring-4 focus:ring-[#dff2b8]" placeholder="Anything parent/guardian wants us to keep in mind..." value={profile.supportNote} onChange={(e) => update("supportNote", e.target.value)} />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-[#e4e7df] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#101828]">Profile Summary</h2>

            <div className="mt-5 rounded-3xl bg-[#eef7e8] p-5">
              <p className="text-2xl font-black text-[#101828]">{displayName}</p>
              <p className="mt-1 text-sm text-[#667085]">
                {profile.age ? `Age ${profile.age}` : "Age not added"} · {difficulty}
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-[#e4e7df] bg-[#fbfcf8] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-black text-[#101828]">Camera & microphone consent</p>
                  <p className="mt-1 text-sm text-[#667085]">For speaking activities only.</p>
                </div>

                <button
                  type="button"
                  onClick={() => update("consent", !profile.consent)}
                  className={`h-8 w-14 rounded-full p-1 transition ${profile.consent ? "bg-[#1f7a4d]" : "bg-[#d8ddd1]"}`}
                >
                  <span className={`block h-6 w-6 rounded-full bg-white transition ${profile.consent ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>
            </div>

            {message && <div className="mt-5 rounded-2xl border border-[#b7d96a] bg-[#f1ffd2] px-4 py-3 text-sm font-bold text-[#42591f]">{message}</div>}
            {error && <div className="mt-5 rounded-2xl border border-[#ffb3a8] bg-[#fff0ed] px-4 py-3 text-sm font-bold text-[#9b2d1f]">{error}</div>}

            {lastSaved && <p className="mt-4 text-sm font-bold text-[#667085]">Last saved at {lastSaved}</p>}

            <button
              type="button"
              onClick={saveProfile}
              disabled={saving}
              className="mt-6 h-12 w-full rounded-2xl bg-[#123524] font-black text-white transition hover:bg-[#1f7a4d] disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}
