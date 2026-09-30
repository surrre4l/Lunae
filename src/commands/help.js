const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show Lunae's available commands."),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Lunae")
      .setDescription("Discord AI assistant specialized in Lunarion.")
      .addFields(
        {
          name: "/lunae",
          value: "Ask Lunae a question about Lunarion.",
        },
        {
          name: "Knowledge",
          value:
            "Lunae uses the Lunarion source and API notes as its technical reference.",
        }
      );

    await interaction.reply({ embeds: [embed] });
  },
};