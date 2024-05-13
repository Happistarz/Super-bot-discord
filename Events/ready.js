const SlashCommandsLoader = require(global.LOADERS + 'SlashCommandsLoader');
const { ActivityType } = require('discord.js');

/**
 * Event that runs when the bot is ready
 * @param {Discord.Client} bot
 */
module.exports = async bot => {
	// Load all slash commands
	SlashCommandsLoader(bot);

	// Set the bot's presence
	bot.user.setPresence({
		activities: [
			{
				name: 'your commands',
				type: ActivityType.Watching,
			},
		],
		status: 'online',
	});

	console.log('[EVENT] READY | Bot is ready!');
};
