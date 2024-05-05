const { PermissionsBitField } = require('discord.js');
const { createSuperUnbanEmbed } = require(global.HELPERS + 'Embeds');

module.exports = {
	name: 'superunban',
	description: 'Ban a user with additional options',
	dm: false,
	options: [
		{
			name: 'user',
			description: 'The user to unban',
			type: 'USER',
			required: true,
		},

		{
			name: 'reason',
			description: 'The reason for the unban',
			type: 'STRING',
			required: true,
		},
	],

	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason');

		const author = interaction.member;

		if (!user) {
			return interaction.reply({ content: 'User not found', ephemeral: true });
		}

		if (!author.permissions.has(PermissionsBitField.Flags.BanMembers)) {
			return interaction.reply({
				content: 'You do not have permission to unban users',
				ephemeral: true,
			});
		}

		try {
			await interaction.guild.bans.remove(user, reason);
		} catch (error) {
			return interaction.reply({
				content: `Failed to unban user: ${error}`,
				ephemeral: true,
			});
		}

		await interaction.reply({
			embeds: [createSuperUnbanEmbed(user, author, reason)],
		});
	},
};
