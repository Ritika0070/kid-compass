const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const AGE_GROUP_HINTS = {
  Junior: "children around age 5-7 (Class 1-2). Use very simple visual/emoji-style patterns or single-digit counting only.",
  Middle: "children around age 8-9 (Class 3-4). Use simple number sequences and basic arithmetic patterns.",
  Senior: "children around age 10-12 (Class 5+). Use multi-step number sequences, light logic/syllogism puzzles, and slightly bigger numbers.",
};

const LEVEL_HINTS = {
  Easy: "Make it noticeably easier than this age group's baseline difficulty.",
  Medium: "Make it moderately harder than the Easy tier for this same age group.",
  Hard: "Make it the hardest tier for this age group, but still solvable by a child in that group without outside help.",
};

function buildPrompt(ageGroup, level, count) {
  return `You are generating logical-thinking mini-quiz questions for a children's education app called Kid Compass.

Audience: ${AGE_GROUP_HINTS[ageGroup] || AGE_GROUP_HINTS.Middle}
Difficulty tier: ${level}. ${LEVEL_HINTS[level] || ""}

Generate exactly ${count} DIFFERENT logical pattern/sequence questions appropriate for this audience and tier. Keep language simple, positive, and child-safe. Avoid violence, scary themes, or anything inappropriate for children. Vary the question style (patterns, sequences, simple analogies, or light logic) so they feel fresh, not repetitive or textbook-like.

Respond with ONLY valid JSON, no markdown, no explanation, in exactly this shape:
{
  "questions": [
    {
      "prompt": "string - the question or pattern shown to the child",
      "helper": "string - a short instruction like 'What comes next?'",
      "options": ["string", "string", "string", "string"],
      "answer": "string - must exactly match one of the options"
    }
  ]
}`;
}

function isValidQuestion(q) {
  const hasPrompt = q && typeof q.prompt === "string" && q.prompt.trim().length > 0;
  const hasHelper = q && typeof q.helper === "string";
  const hasOptions =
    q &&
    Array.isArray(q.options) &&
    q.options.length === 4 &&
    q.options.every((o) => typeof o === "string" && o.trim().length > 0) &&
    new Set(q.options).size === 4;
  const hasValidAnswer = q && typeof q.answer === "string" && hasOptions && q.options.includes(q.answer);

  return Boolean(hasPrompt && hasHelper && hasOptions && hasValidAnswer);
}

export async function generateLogicalQuestions(req, res) {
  const { ageGroup, level, count = 5 } = req.body;

  const validAgeGroups = ["Junior", "Middle", "Senior"];
  const validLevels = ["Easy", "Medium", "Hard"];
  const ageGroupOk = validAgeGroups.includes(ageGroup);
  const levelOk = validLevels.includes(level);

  if (ageGroupOk === false || levelOk === false) {
    return res.status(400).json({ message: "Invalid ageGroup or level" });
  }

  const hasKey = Boolean(process.env.GROQ_API_KEY);
  if (hasKey === false) {
    return res.status(503).json({ message: "AI question generation is not configured" });
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.9,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You output only strict JSON. Never include markdown fences or commentary." },
          { role: "user", content: buildPrompt(ageGroup, level, count) },
        ],
      }),
    });

    const responseOk = response.ok;
    if (responseOk === false) {
      const errText = await response.text();
      console.error("Groq API error:", response.status, errText);
      return res.status(502).json({ message: "AI question generation failed" });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseErr) {
      const match = raw.match(/\{[\s\S]*\}/);
      const hasMatch = Boolean(match);
      if (hasMatch === false) throw new Error("No JSON found in AI response");
      parsed = JSON.parse(match[0]);
    }

    const rawQuestions = Array.isArray(parsed.questions) ? parsed.questions : [];
    const questions = rawQuestions.filter(isValidQuestion);

    if (questions.length < count) {
      return res.status(502).json({ message: "AI returned incomplete or invalid questions" });
    }

    return res.status(200).json({ questions: questions.slice(0, count) });
  } catch (err) {
    console.error("generateLogicalQuestions error:", err.message);
    return res.status(500).json({ message: "Something went wrong generating questions" });
  }
}
