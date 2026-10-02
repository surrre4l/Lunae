const fs = require("fs");
const path = require("path");

const CUSTOM_EXTENSIONS = new Set([".md", ".txt", ".lua", ".json"]);
const MAX_CUSTOM_FILE_CHARS = 30000;

function getKnowledgePath() {
  return path.resolve(
    process.env.KNOWLEDGE_PATH || "./knowledge/Lunarion.lua"
  );
}

function getCustomKnowledgeDir() {
  return path.join(path.dirname(getKnowledgePath()), "custom");
}

function loadLunarionSource() {
  const knowledgePath = getKnowledgePath();
  if (!fs.existsSync(knowledgePath)) {
    throw new Error(`Lunarion source not found: ${knowledgePath}`);
  }
  return fs.readFileSync(knowledgePath, "utf8");
}

function loadCustomKnowledge() {
  const directory = getCustomKnowledgeDir();
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => CUSTOM_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => {
      const filePath = path.join(directory, entry.name);
      const stats = fs.statSync(filePath);
      if (!stats.isFile() || stats.size > MAX_CUSTOM_FILE_CHARS * 4) return null;
      return {
        name: entry.name,
        content: fs.readFileSync(filePath, "utf8").slice(0, MAX_CUSTOM_FILE_CHARS),
      };
    })
    .filter(Boolean);
}

function getTerms(query) {
  return [...new Set(
    String(query || "")
      .toLowerCase()
      .split(/[^a-z0-9_]+/)
      .filter((term) => term.length > 1)
  )];
}

function selectRelevantLines(content, terms, maxLines = 80) {
  const lines = content.split(/\r?\n/);
  if (!terms.length) return lines.slice(0, maxLines).join("\n");

  const ranked = lines.map((line, index) => {
    const lower = line.toLowerCase();
    const score = terms.reduce((total, term) => total + (lower.includes(term) ? 1 : 0), 0);
    return { line, index, score };
  }).filter((item) => item.score > 0);

  return ranked
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, maxLines)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.line)
    .join("\n");
}

function getRelevantKnowledge(query, maxLength = 18000) {
  const source = loadLunarionSource();
  const terms = getTerms(query);
  const sourceExcerpt = selectRelevantLines(source, terms, 100) || source.slice(0, 6000);
  const customDocs = loadCustomKnowledge()
    .map((doc) => {
      const searchable = `${doc.name}\n${doc.content}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (searchable.includes(term) ? 1 : 0), 0);
      return { ...doc, score };
    })
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

  const sections = [`[LUNARION SOURCE — authoritative API reference]\n${sourceExcerpt}`];
  let used = sections[0].length;
  const budget = Math.max(0, maxLength - used - 100);

  for (const doc of customDocs) {
    if (used >= maxLength || budget <= 0) break;
    const excerpt = selectRelevantLines(doc.content, terms, 80) || doc.content.slice(0, 3000);
    const section = `\n\n[CUSTOM GITHUB KNOWLEDGE: ${doc.name} — supplementary reference]\n${excerpt}`;
    const remaining = maxLength - used;
    if (remaining <= 0) break;
    sections.push(section.slice(0, remaining));
    used += section.length;
  }

  return sections.join("").slice(0, maxLength);
}

module.exports = {
  loadLunarionSource,
  loadCustomKnowledge,
  getRelevantKnowledge,
};
