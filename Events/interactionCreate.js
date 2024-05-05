const Discord = require('discord.js');

/**
 * Event that runs when an interaction is created
 * @param {Discord.Client} bot
 * @param {Discord.Interaction} interaction
 * @returns
 */
module.exports = async (bot, interaction) => {
	let command = null;
	switch (interaction.type) {
		case Discord.InteractionType.ApplicationCommand:
			// Get the command
			command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;

			// try to execute the command and catch any errors
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
			break;
		case Discord.InteractionType.ModalSubmit:
			// Get the command
			command = interaction.client.commands.get(
				interaction.customId.split('_')[1],
			);
			if (!command) return;

			// try to execute the command and catch any errors
			try {
				await command.onModalSubmit?.(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'There was an error while submitting the modal!',
					ephemeral: true,
				});
			}
			break;
		default:
			break;
	}
};
