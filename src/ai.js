const OpenAI = require("openai");
const { getRelevantKnowledge } = require("./knowledge");

const client = new OpenAI({
  apiKey: process.env.AI_API_KEY,
});

async function askLunae(question) {
  const knowledge = getRelevantKnowledge(question);

  const response = await client.responses.create({
    model: process.env.AI_MODEL || "gpt-4o-mini",
    instructions: `
You are Lunae, a Discord assistant specialized in the Lunarion Roblox UI library.

Use the supplied Lunarion source as the authoritative technical reference.
Do not invent Lunarion functions, parameters, events, or APIs.
If the source does not support an answer, clearly say that the source does not document it.

Relevant Lunarion source:
${knowledge}
`,
    input: question,
  });

  return response.output_text;
}

module.exports = {
  askLunae,
};