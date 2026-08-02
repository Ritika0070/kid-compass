// Groups a child into Junior / Middle / Senior so the WHOLE game
// (all 3 in-game levels: Easy, Medium, Hard) is calibrated to their
// age/class — a Senior's "Easy" is still harder than a Junior's "Hard".

function groupFromAge(age) {
  const n = Number(age);
  if (!n) return null;
  if (n <= 7) return "Junior";
  if (n <= 9) return "Middle";
  return "Senior";
}

function groupFromGrade(grade) {
  if (!grade) return null;
  const match = String(grade).match(/\d+/);
  if (!match) return null;
  const n = Number(match[0]);
  if (n <= 2) return "Junior";
  if (n <= 4) return "Middle";
  return "Senior";
}

const RANK = { Junior: 1, Middle: 2, Senior: 3 };

export function getAgeGroup(age, grade) {
  const fromAge = groupFromAge(age);
  const fromGrade = groupFromGrade(grade);

  if (fromGrade && fromAge) {
    const avgRank = Math.round((RANK[fromAge] + RANK[fromGrade] * 2) / 3);
    return Object.keys(RANK).find((k) => RANK[k] === avgRank) || fromGrade;
  }

  return fromGrade || fromAge || "Middle";
}
