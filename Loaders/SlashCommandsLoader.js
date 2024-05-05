const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

/**
 * Initialize all slash commands from the Commands folder
 * @param {Discord.Client} bot
 */
module.exports = async bot => {
	// Create an array to store all the slash commands
	let commands = [];

	// For each command in the Commands folder
	bot.commands.forEach(async command => {
		// Create a new slash command with the command name and description
		let slashCommand = new Discord.SlashCommandBuilder()
			.setName(command.name)
			.setDescription(command.description)
			.setDMPermission(command.dm)
			.setDefaultMemberPermissions(
				command.permissions === 'NONE'
					? null
					: Discord.PermissionFlagsBits[command.permissions],
			);

		// If the command has options
		if (command.options?.length >= 1) {
			for (let i = 0; i < command.options.length; i++) {
				// Add the options to the slash command based on the type like addUserOption, addStringOption, etc.
				slashCommand[
					`add${
						command.options[i].type[0].toUpperCase() +
						command.options[i].type
							.slice(1, command.options[i].type.length)
							.toLowerCase()
					}Option`
				](option =>
					option
						.setName(command.options[i].name)
						.setDescription(command.options[i].description)
						.setRequired(command.options[i].required),
				);

				// If the option has choices
				if (command.options[i].choices) {
					for (let j = 0; j < command.options[i].choices.length; j++) {
						slashCommand.options[i].addChoice(
							command.options[i].choices[j].name,
							command.options[i].choices[j].value,
						);
					}
				}
			}
		}

		// Push the slash command to the commands array
		await commands.push(slashCommand);
		console.log(`[LOADER] SLASH | ${command.name} loaded!`);
	});

	// Register the slash commands
	const rest = new REST({ version: '10' }).setToken(bot.token);

	await rest.put(Routes.applicationCommands(bot.user.id), { body: commands });
	console.log('[LOADER] SLASH | Slash commands registered!');
};
