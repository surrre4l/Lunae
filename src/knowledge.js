const fs = require("fs");
const path = require("path");

function loadLunarionSource() {
  const knowledgePath = path.resolve(
    process.env.KNOWLEDGE_PATH || "./knowledge/Lunarion.lua"
  );

  if (!fs.existsSync(knowledgePath)) {
    throw new Error(`Lunarion source not found: ${knowledgePath}`);
  }

  return fs.readFileSync(knowledgePath, "utf8");
}

function getRelevantKnowledge(query, maxLength = 12000) {
  const source = loadLunarionSource();
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const lines = source.split("\n");

  const matches = lines.filter((line) => {
    const lower = line.toLowerCase();
    return terms.some((term) => lower.includes(term));
  });

  const result = matches.join("\n");

  return (result || source).slice(0, maxLength);
}

module.exports = {
  loadLunarionSource,
  getRelevantKnowledge,
};