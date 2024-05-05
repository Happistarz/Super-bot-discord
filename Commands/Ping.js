const Discord = require('discord.js');

/**
 * Command to test the bot's latency
 */
module.exports = {
	name: 'ping',
	description: 'Ping!',
	permissions: 'NONE',
	dm: false,
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
