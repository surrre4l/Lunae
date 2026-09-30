const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("debug")
    .setDescription("Ask Lunae to analyze Lunarion code.")
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("Lunarion Lua code to analyze")
        .setRequired(true)
    ),

  async execute(interaction, askLunae) {
    const code = interaction.options.getString("code");

    await interaction.deferReply();

    try {
      const answer = await askLunae(
        `Analyze this Lunarion Lua code. Identify likely errors and explain how to fix them. Do not invent Lunarion APIs.

Code:
${code}`
      );

      await interaction.editReply(
        answer.length > 2000 ? `${answer.slice(0, 1997)}...` : answer
      );
    } catch (error) {
      console.error("Debug command error:", error);
      await interaction.editReply(
        "I couldn't analyze that code right now."
      );
    }
  },
};