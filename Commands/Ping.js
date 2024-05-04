const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	permissions: 'NONE',
	dm: false,
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
