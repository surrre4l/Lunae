const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Show information about Lunae."),

  async execute(interaction) {
    await interaction.reply(
      "Lunae is a Discord AI assistant focused on the Lunarion Roblox UI library."
    );
  },
};