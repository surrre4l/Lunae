const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("themes")
    .setDescription("Show documented Lunarion themes."),

  async execute(interaction) {
    const themes = [
      "Lunarion",
      "Default",
      "Amethyst",
      "Ocean",
      "Rose",
      "Emerald",
      "Light",
      "Sakura",
    ];

    await interaction.reply(
      `**Documented Lunarion themes:**\n${themes
        .map((theme) => `• ${theme}`)
        .join("\n")}`
    );
  },
};