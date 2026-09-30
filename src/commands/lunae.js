const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lunae")
    .setDescription("Ask Lunae about Lunarion.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Your Lunarion question")
        .setRequired(true)
    ),

  async execute(interaction, askLunae) {
    const question = interaction.options.getString("question");

    await interaction.deferReply();

    try {
      const answer = await askLunae(question);

      await interaction.editReply(
        answer.length > 2000 ? answer.slice(0, 1997) + "..." : answer
      );
    } catch (error) {
      console.error("Lunae command error:", error);

      await interaction.editReply(
        "I couldn't process that request. Please check Lunae's configuration."
      );
    }
  },
};