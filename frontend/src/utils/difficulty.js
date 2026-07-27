function levelFromAge(age) {
  const n = Number(age);
  if (!n) return null;
  if (n <= 6) return "Easy";
  if (n <= 9) return "Medium";
  return "Hard";
}

function levelFromGrade(grade) {
  if (!grade) return null;
  const match = String(grade).match(/\d+/);
  if (!match) return null;
  const n = Number(match[0]);
  if (n <= 1) return "Easy";
  if (n <= 4) return "Medium";
  return "Hard";
}

const RANK = { Easy: 1, Medium: 2, Hard: 3 };

export function getDifficultyLevel(age, grade) {
  const fromAge = levelFromAge(age);
  const fromGrade = levelFromGrade(grade);

  if (fromGrade && fromAge) {
    const avgRank = Math.round((RANK[fromAge] + RANK[fromGrade] * 2) / 3);
    return Object.keys(RANK).find((k) => RANK[k] === avgRank) || fromGrade;
  }

  return fromGrade || fromAge || "Medium";
}
