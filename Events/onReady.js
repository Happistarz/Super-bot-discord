const SlashCommandsLoader = require('../Loaders/SlashCommandsLoader');

module.exports = async bot => {
	SlashCommandsLoader(bot);
	console.log('[EVENT] READY | Slash commands registered!');
};
