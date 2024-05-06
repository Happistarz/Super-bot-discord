const Discord = require('discord.js');
const fs = require('fs');
const keyHandler = require(global.HELPERS+'KeyHandler.js');
const { banDataEncrypt } = require(global.SUPER_FUNCTIONS + 'BanDataSerializer');

let referee = null;
let log_channel = null;

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
		{
			name: 'log_channel',
			description: 'The channel to send the logs to',
			type: 'CHANNEL',
			required: true,
		}
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
		log_channel = interaction.options.getChannel('log_channel');

		const components = new Discord.ActionRowBuilder().setComponents(reason);

		affiliateModal.setComponents(components);

		await interaction.showModal(affiliateModal);
	},
	async onModalSubmit(interaction) {
		const reason = interaction.fields.getTextInputValue('reason');

		let data = JSON.parse(
			fs.readFileSync(global.DATA_AFFILIATED + 'PENDING_AFFILIATION.json'),
		);

		const key = await keyHandler.genKey();

		data.GUILDS.push({
			KEY: key,
			GUILD_ID: interaction.guild.id,
			GUILD_NAME: interaction.guild.name,
			REASON: banDataEncrypt(reason),
			MEMBER_COUNT: interaction.guild.memberCount,
			LOG_CHANNEL: log_channel.id,
			DATE: new Date().toISOString().slice(0,19).replace("T", " "),
			REFEREE: {
				ID: referee.id,
				NAME: referee.username,
			},
		});

		fs.writeFileSync(
			global.DATA_AFFILIATED + 'PENDING_AFFILIATION.json',
			JSON.stringify(data, null, 2),
		);

		interaction.reply({
			content: `Affiliation demand sent to ${referee} for the reason: ${reason}`,
		});
	},
};
