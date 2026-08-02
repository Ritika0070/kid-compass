// A backend profile field only wins if it actually has a value —
// this prevents an empty/default backend response from wiping out
// good data that's already sitting in local state or localStorage.
export function mergeBackendProfile(local, backend) {
  if (!backend) return local;
  const merged = { ...local };
  for (const key of Object.keys(backend)) {
    const value = backend[key];
    const hasValue = typeof value === "boolean" ? true : String(value ?? "").trim().length > 0;
    if (hasValue) merged[key] = value;
  }
  return merged;
}