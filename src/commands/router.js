const { loadCommands } = require("./index");

const commands = loadCommands();

async function handleCommand(interaction, services) {
  const command = commands.get(interaction.commandName);

  if (!command || typeof command.execute !== "function") {
    return false;
  }

  await command.execute(interaction, services.askLunae);
  return true;
}

module.exports = {
  handleCommand,
};