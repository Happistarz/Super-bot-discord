const Discord = require('discord.js');
const fs = require('fs');
const Embeds = require(global.HELPERS + 'Embeds');

const { AffiliatedGuild, newModel } = require(global.DATABASE_MODELS +
	'AffiliatedGuild');
const moment = require('moment');

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
		log_channel = interaction.options.getChannel('log_channel');

		const components = new Discord.ActionRowBuilder().setComponents(reason);

		affiliateModal.setComponents(components);

		const guild = await newModel(
			AffiliatedGuild,
			`guildid = ${interaction.guild.id}`,
		);

		// check if the guild is already affiliated
		if (guild.success) {
			// found a guild with the same id so alert the user
			await interaction.reply({
				content:
					'This guild is already affiliated, try contacting the referee for more information.',
				ephemeral: true,
			});
			return;
		}

		await interaction.showModal(affiliateModal);
	},
	async onModalSubmit(interaction) {
		const reason = interaction.fields.getTextInputValue('reason');

		const affiliatedGuild = new AffiliatedGuild();
		affiliatedGuild.guildid = interaction.guild.id;
		affiliatedGuild.guildname = interaction.guild.name;
		affiliatedGuild.reason = reason;
		affiliatedGuild.originalmembercount = interaction.guild.memberCount;
		affiliatedGuild.logchannel = log_channel.id;
		affiliatedGuild.date = moment().format('YYYY-MM-DD HH:mm:ss');
		affiliatedGuild.refereeid = referee.id;
		affiliatedGuild.refereename = referee.username;

		await affiliatedGuild.create();

		interaction.reply({
			embeds: [
				Embeds.createAffiliationEmbed(referee, reason, interaction.client),
			],
		});
	},
};
