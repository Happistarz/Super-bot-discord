const fs = require('fs');

module.exports = async bot => {
	fs.readdirSync('./Commands')
		.filter(f => f.endsWith('.js'))
		.forEach(file => {
			const command = require(`../Commands/${file}`);

			if (!command.name || typeof command.name !== 'string')
				throw new Error(`Command ${file} does not have a name!`);

			bot.commands.set(command.name, command);

			console.log(`[LOADER] COMMAND | ${command.name} loaded!`);
		});
};
