const { SlashCommandBuilder } = require("discord.js");
const { loadLunarionSource } = require("../knowledge");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("api")
    .setDescription("Look up a Lunarion API name.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("API name to search for")
        .setRequired(true)
    ),

  async execute(interaction) {
    const name = interaction.options.getString("name").toLowerCase();
    const source = loadLunarionSource();

    const lines = source.split("\n");
    const matches = lines.filter((line) =>
      line.toLowerCase().includes(name)
    );

    if (!matches.length) {
      await interaction.reply(
        `I couldn't find \`${name}\` in the Lunarion source.`
      );
      return;
    }

    const result = matches.slice(0, 20).join("\n");

    await interaction.reply(
      `**Lunarion source matches for \`${name}\`:**\n\`\`\`lua\n${result.slice(
        0,
        1800
      )}\n\`\`\``
    );
  },
};