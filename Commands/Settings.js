module.exports = {
	name: 'settings',
	description: 'Settings command',
	permissions: 'ADMINISTRATOR',
	dm: false,
	// option lang with choices
	options: [
		{
			name: 'lang',
			description: 'The language to set the bot to',
			type: 'STRING',
			required: false,
			choices: [
				{
					name: 'English',
					value: 'en',
				},
				{
					name: 'Francais',
					value: 'fr',
				},
			],
		},
	],
	async execute(interaction) {
		const lang = interaction.options.getString('lang');
		if (lang) {
			// set the language
			await interaction.reply({
				content: `The language has been set to ${lang}`,
			});
		}
	},
};
