const { getRelevantKnowledge } = require("./knowledge");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

async function askLunae(question) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const knowledge = getRelevantKnowledge(question);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(
      GEMINI_API_KEY
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: `
You are Lunae, a Discord assistant specialized in the Lunarion Roblox UI library.

Use the supplied Lunarion source as the authoritative technical reference.

Rules:
- Never invent Lunarion functions, parameters, events, or APIs.
- If the source doesn't document something, say so.
- Use the exact API names and parameters found in the source.
- Keep answers useful and concise.

Relevant Lunarion source:
${knowledge}
`,
            },
          ],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: question }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        `Gemini API error: ${response.status}`
    );
  }

  const answer =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

  if (!answer) {
    throw new Error("Gemini returned an empty response.");
  }

  return answer;
}

module.exports = {
  askLunae,
};