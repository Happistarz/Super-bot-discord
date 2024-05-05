const Discord = require('discord.js');
const fs = require('fs');

let referee = null;

module.exports = {
	name: 'affiliate',
	description: 'Affiliation demand command',
	permissions: 'NONE',
	dm: false,
	options: [
		{
			name: 'referee',
			description: 'The referee to send the demand to',
			type: 'USER',
			required: true,
		},
	],
	async execute(interaction) {
		const affiliateModal = new Discord.ModalBuilder()
			.setCustomId(`affiliateModal_${this.name}`)
			.setTitle('Affiliate demand');

		let reason = new Discord.TextInputBuilder()
			.setCustomId('reason')
			.setLabel('Reason')
			.setStyle(Discord.TextInputStyle.Paragraph)
			.setMinLength(10)
			.setRequired(true);

		referee = interaction.options.getUser('referee');

		const components = new Discord.ActionRowBuilder().setComponents(reason);

		affiliateModal.setComponents(components);

		await interaction.showModal(affiliateModal);
	},
	onModalSubmit(interaction) {
		const reason = interaction.fields.getTextInputValue('reason');

		let data = JSON.parse(
			fs.readFileSync('./Data/Affiliated/PENDING_AFFILIATION.json'),
		);

		data.GUILDS.push({
			KEY: Math.random().toString(15),
			GUILD_ID: interaction.guild.id,
			GUILD_NAME: interaction.guild.name,
			REASON: reason,
			DATE: new Date().toISOString().split('T')[0],
			REFEREE: {
				ID: referee.id,
				NAME: referee.username,
			},
		});

		fs.writeFileSync(
			'./Data/Affiliated/PENDING_AFFILIATION.json',
			JSON.stringify(data, null, 2),
		);

		interaction.reply({
			content: `Affiliation demand sent to ${referee} for the reason: ${reason}`,
		});
	},
};
