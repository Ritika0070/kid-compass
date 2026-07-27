const KEY_PREFIX = "kids-compass-results-";

function resultsKey(email) {
  return `${KEY_PREFIX}${email || "guest"}`;
}

export function getAllResults(email) {
  try {
    const raw = localStorage.getItem(resultsKey(email));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveResult(email, domainName, result) {
  const all = getAllResults(email);
  all[domainName] = { ...result, completedAt: new Date().toISOString() };
  localStorage.setItem(resultsKey(email), JSON.stringify(all));
  return all;
}
