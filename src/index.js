const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} = require("discord.js");
const http = require("http");
require("dotenv").config();

const { askLunae } = require("./ai");
const { handleCommand } = require("./commands/router");
const { loadCommands } = require("./commands");

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

async function registerCommands() {
  const commands = loadCommands();

  const commandData = Array.from(commands.values()).map((command) =>
    command.data.toJSON()
  );

  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_TOKEN
  );

  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    {
      body: commandData,
    }
  );

  console.log(
    `Registered ${commandData.length} Lunae slash commands.`
  );
}

client.once("clientReady", async () => {
  console.log(`Lunae is online as ${client.user.tag}`);

  try {
    await registerCommands();
  } catch (error) {
    console.error("Command registration failed:", error);
  }
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