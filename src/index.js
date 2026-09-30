const { Client, GatewayIntentBits } = require("discord.js");
const http = require("http");
require("dotenv").config();

const { askLunae } = require("./ai");
const { handleCommand } = require("./commands/router");

const PORT = process.env.PORT || 3000;

// Render health server
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end("Lunae is running.");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Health server listening on port ${PORT}`);
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", () => {
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
      await interaction.editReply(
        "Something went wrong while processing the command."
      );
    } else {
      await interaction.reply(
        "Something went wrong while processing the command."
      );
    }
  }
});

client.login(process.env.DISCORD_TOKEN);