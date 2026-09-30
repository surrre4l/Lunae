const {
  Client,
  GatewayIntentBits,
  Collection,
} = require("discord.js");

require("dotenv").config();

const { askLunae } = require("./ai");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

client.once("ready", () => {
  console.log(`Lunae is online as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName !== "lunae") return;

  const question = interaction.options.getString("question");

  if (!question) {
    await interaction.reply("Please provide a question.");
    return;
  }

  await interaction.deferReply();

  try {
    const answer = await askLunae(question);
    await interaction.editReply(answer.slice(0, 2000));
  } catch (error) {
    console.error(error);
    await interaction.editReply(
      "I couldn't process that request. Check the bot configuration and try again."
    );
  }
});

client.login(process.env.DISCORD_TOKEN);