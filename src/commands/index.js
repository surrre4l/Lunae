const fs = require("fs");
const path = require("path");

function loadCommands() {
  const commands = new Map();
  const commandsPath = __dirname;

  for (const file of fs.readdirSync(commandsPath)) {
    if (file === "index.js" || !file.endsWith(".js")) continue;

    const command = require(path.join(commandsPath, file));

    if (command?.data?.name) {
      commands.set(command.data.name, command);
    }
  }

  return commands;
}

module.exports = {
  loadCommands,
};