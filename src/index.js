const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const { askLunae } = require("./ai");
const { handleCommand } = require("./commands/router");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
  console.log(`Lunae is online as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    const handled = await handleCommand(interaction, {
      askLunae,
    });

    if (!handled && !interaction.replied && !interaction.deferred) {
      await interaction.reply("Unknown Lunae command.");
    }
  } catch (error) {
    console.error("Interaction error:", error);

    if (interaction.deferred || interaction.replied) {
      await interaction.editReply("Something went wrong while processing the command.");
    } else {
      await interaction.reply("Something went wrong while processing the command.");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);