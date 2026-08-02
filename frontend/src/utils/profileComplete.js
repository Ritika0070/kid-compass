// Everything except the optional Support Note and the camera/mic consent
// toggle must be filled before assessments unlock.
export const REQUIRED_FIELDS = [
  "fullName",
  "preferredName",
  "age",
  "gender",
  "grade",
  "school",
  "city",
  "language",
  "guardianName",
  "guardianRelation",
  "guardianEmail",
  "favoriteSubject",
  "favoriteActivity",
  "hobbies",
];

export function loadProfile(email) {
  try {
    const raw = localStorage.getItem(`kids-compass-profile-${email || "guest"}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isProfileComplete(profile) {
  if (!profile) return false;
  return REQUIRED_FIELDS.every((field) => String(profile[field] || "").trim().length > 0);
}

export function getMissingFieldCount(profile) {
  if (!profile) return REQUIRED_FIELDS.length;
  return REQUIRED_FIELDS.filter((field) => !String(profile[field] || "").trim()).length;
}
