const { SlashCommandBuilder } = require("discord.js");
const { loadLunarionSource } = require("../knowledge");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Show Lunae's knowledge status."),

  async execute(interaction) {
    try {
      const source = loadLunarionSource();

      await interaction.reply(
        `**Lunae Knowledge Status**\n` +
        `Lunarion source: loaded\n` +
        `Source size: ${source.length.toLocaleString()} characters`
      );
    } catch (error) {
      console.error("Status command error:", error);

      await interaction.reply(
        "Lunae's Lunarion source could not be loaded."
      );
    }
  },
};