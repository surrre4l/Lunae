const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("source")
    .setDescription("Show where Lunae gets its Lunarion knowledge."),

  async execute(interaction) {
    await interaction.reply(
      "**Lunae Knowledge Source**\n" +
        "Lunae uses the Lunarion source stored in `knowledge/Lunarion.lua` " +
        "as its primary technical reference."
    );
  },
};