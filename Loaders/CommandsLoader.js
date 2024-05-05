const fs = require('fs');

/**
 * Initialize all commands in the Commands folder
 * @param {Discord.Client} bot
 */
module.exports = async bot => {
	// Read all files in the Commands folder
	fs.readdirSync('./Commands')
		.filter(f => f.endsWith('.js'))
		.forEach(file => {
			// Import the command
			const command = require(`../Commands/${file}`);

			if (!command.name || typeof command.name !== 'string')
				throw new Error(`Command ${file} does not have a name!`);

			// Set the command in the bot
			bot.commands.set(command.name, command);

			console.log(`[LOADER] COMMAND | ${command.name} loaded!`);
		});
};
