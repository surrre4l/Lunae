const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("explain")
    .setDescription("Explain a Lunarion API or concept.")
    .addStringOption((option) =>
      option
        .setName("topic")
        .setDescription("Lunarion API or concept to explain")
        .setRequired(true)
    ),

  async execute(interaction, askLunae) {
    const topic = interaction.options.getString("topic");

    await interaction.deferReply();

    try {
      const answer = await askLunae(
        `Explain this Lunarion API or concept using the actual Lunarion source as the authority: ${topic}`
      );

      await interaction.editReply(
        answer.length > 2000 ? `${answer.slice(0, 1997)}...` : answer
      );
    } catch (error) {
      console.error("Explain command error:", error);
      await interaction.editReply(
        "I couldn't explain that Lunarion topic right now."
      );
    }
  },
};