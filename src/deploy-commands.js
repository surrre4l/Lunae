const {
  REST,
  Routes,
  SlashCommandBuilder,
} = require("discord.js");

require("dotenv").config();

const command = new SlashCommandBuilder()
  .setName("lunae")
  .setDescription("Ask Lunae about Lunarion.")
  .addStringOption((option) =>
    option
      .setName("question")
      .setDescription("Your Lunarion question")
      .setRequired(true)
  );

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN
);

async function deploy() {
  try {
    console.log("Deploying Lunae command...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: [command.toJSON()],
      }
    );

    console.log("Lunae command deployed.");
  } catch (error) {
    console.error(error);
  }
}

deploy();