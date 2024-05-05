const Discord = require('discord.js');

const { createInfoEmbed } = require(global.HELPERS + 'Embeds');

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	dm: false,
	permissions: 'Administrator',
	options: [
		{
			name: 'command',
			description: 'The command to reload',
			type: 'STRING',
			required: true,
		},
	],
	async execute(interaction) {
		if (!interaction.member.permissions.has('ADMINISTRATOR')) {
			return interaction.reply(
				'You do not have permission to use this command.',
			);
		}

		const commandName = interaction.options.getString('command');
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply('That command does not exist.');
		}

		delete require.cache[require.resolve(`./${commandName}.js`)];

		try {
			const newCommand = require(`./${commandName}.js`);
			interaction.client.commands.set(newCommand.name, newCommand);
			interaction.reply({
				embeds: [
					createInfoEmbed(
						'Reloaded!',
						`Command \`${commandName}\` was reloaded!`,
					),
				],
			});
		} catch (error) {
			console.error(error);
			interaction.reply(
				`There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``,
			);
		}
	},
};
