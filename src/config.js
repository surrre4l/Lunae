require("dotenv").config();

module.exports = {
  discordToken: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,

  aiApiKey: process.env.AI_API_KEY,
  aiModel: process.env.AI_MODEL || "gpt-4o-mini",

  knowledgePath:
    process.env.KNOWLEDGE_PATH || "./knowledge/Lunarion.lua",
};