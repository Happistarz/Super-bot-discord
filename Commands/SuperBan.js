const { PermissionsBitField } = require('discord.js');
const { createSuperBanEmbed } = require('../Helpers/Embeds');

module.exports = {
	name: 'superban',
	description: 'Ban a user with additional options',
	dm: false,
	options: [
		{
			name: 'user',
			description: 'The user to ban',
			type: 'USER',
			required: true,
		},
		{
			name: 'reason',
			description: 'The reason for the ban',
			type: 'STRING',
			required: true,
		},
		{
			name: 'duration',
			description: 'The ban duration',
			type: 'STRING',
			required: true,
		},
	],
	async execute(interaction) {
		// Check if the user has the necessary permissions to use this command
		if (
			!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
		) {
			return interaction.reply(
				'You do not have permission to use this command.',
			);
		}

		// Check if the command has the correct number of arguments
		if (interaction.options.length < 3) {
			return interaction.reply(
				'Please provide the user, reason, and ban duration.',
			);
		}

		// Check if the user is valid
		if (!interaction.options.getUser('user')) {
			return interaction.reply('Please mention a valid user to ban.');
		}

		// Ban the user
		await interaction.options
			.getUser('user')
			.send({
				content: `You have been banned from ${
					interaction.guild.name
				} for ${interaction.options.getString(
					'duration',
				)}. Reason: ${interaction.options.getString('reason')}`,
			})
			.then(() => {
				interaction.guild.members
					.ban(interaction.options.getUser('user'), {
						reason: interaction.options.getString('reason'),
					})
					.then(() => {
						interaction.reply({
							embeds: [
								createSuperBanEmbed(
									interaction.options.getUser('user'),
									interaction.options.getString('reason'),
									interaction.options.getString('duration'),
								),
							],
						});
					})
					.catch(error => {
						console.error(`Failed to ban user: ${error}`);
						interaction.reply({
							content: `Failed to ban user: ${error}`,
							ephemeral: true,
						});
					});
			})
			.catch(() => {
				return interaction.reply({
					content:
						'Failed to send a message to the user, the user has not been banned',
					ephemeral: true,
				});
			});
	},
};
