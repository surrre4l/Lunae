const fs = require("fs");
const path = require("path");
const {
  REST,
  Routes,
} = require("discord.js");

require("dotenv").config();

const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const commands = [];

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));

  if (command?.data) {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN
);

async function deploy() {
  try {
    console.log(`Deploying ${commands.length} Lunae commands...`);

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );

    console.log("All Lunae commands deployed.");
  } catch (error) {
    console.error(error);
  }
}

deploy();