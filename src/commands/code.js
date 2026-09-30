const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("code")
    .setDescription("Ask Lunae to create Lunarion code.")
    .addStringOption((option) =>
      option
        .setName("request")
        .setDescription("Describe the Lunarion code you need")
        .setRequired(true)
    ),

  async execute(interaction, askLunae) {
    const request = interaction.options.getString("request");

    await interaction.deferReply();

    try {
      const answer = await askLunae(
        `Create Lunarion Lua code for this request:\n${request}`
      );

      await interaction.editReply(
        answer.length > 2000
          ? `${answer.slice(0, 1997)}...`
          : answer
      );
    } catch (error) {
      console.error("Code command error:", error);
      await interaction.editReply(
        "I couldn't generate the Lunarion code right now."
      );
    }
  },
};