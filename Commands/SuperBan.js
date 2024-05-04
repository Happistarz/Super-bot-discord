const Discord = require('discord.js');

module.exports = {
	name: 'superban',
	description: 'Ban a user with additional options',
	dm: false,
	permissions: 'NONE',
	// options: [
	// 	{
	// 		name: 'user',
	// 		description: 'The user to ban',
	// 		type: 'USER',
	// 		required: true,
	// 	},
	// 	{
	// 		name: 'reason',
	// 		description: 'The reason for the ban',
	// 		type: 'STRING',
	// 		required: true,
	// 	},
	// 	{
	// 		name: 'duration',
	// 		description: 'The ban duration',
	// 		type: 'STRING',
	// 		required: true,
	// 	},
	// 	{
	// 		name: 'permanent',
	// 		description: 'Whether the ban is permanent',
	// 		type: 'BOOLEAN',
	// 		required: false,
	// 	},
	// ],
	execute(message, args) {
		// Check if the user has the necessary permissions to use this command
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			return message.reply('You do not have permission to use this command.');
		}

		// Check if the command has the correct number of arguments
		if (args.length < 3) {
			return message.reply(
				'Please provide the user, reason, and ban duration.',
			);
		}

		// Parse the command arguments
		const user = message.mentions.users.first();
		const reason = args[1];
		const time = args[2];
		const isPermanent = args[3] === 'forever';

		// Check if the user is valid
		if (!user) {
			return message.reply('Please mention a valid user to ban.');
		}

		// Create the ban embed
		const banEmbed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setTitle('User Banned')
			.setDescription(
				`User: ${user}\nReason: ${reason}\nDuration: ${
					isPermanent ? 'Permanent' : time
				}`,
			);

		// Ban the user
		message.guild.members
			.ban(user, { reason: reason })
			.then(() => {
				// Send the ban embed
				message.channel.send(banEmbed);
			})
			.catch(error => {
				console.error(`Failed to ban user: ${error}`);
				message.reply('Failed to ban the user.');
			});
	},
};
