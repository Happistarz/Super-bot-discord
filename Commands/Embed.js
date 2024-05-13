const Discord = require('discord.js');
const Embed = require(global.HELPERS + 'Embeds');
// const { BanUser, newModel } = require(global.DATABASE_MODELS + 'BanUser');
// const moment = require('moment');

module.exports = {
	name: 'embed',
	description: 'test Embed and Components',
	dm: false,
	async execute(interaction) {
		// const banUser = await newModel(BanUser, 'id = 1');
		// banUser.addWarn().then(banUser.toString()).catch(console.error);

		await interaction.reply({
			embeds: [
				Embed.createAffiliationEmbed(
					interaction.user,
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, arcu nec efficitur ultricies, nunc nisl posuere felis, nec gravida turpis nunc nec odio. In hac habitasse platea dictumst. Phasellus auctor, sem nec volutpat aliquam, nunc nisl posuere felis, nec gravida turpis nunc nec odio. In hac habitasse platea dictumst. Phasellus auctor, sem nec volutpat aliquam',
					interaction.client,
				),
			],
		});
		// interaction.channel.messages.fetch(interaction.user.id).then(msg => {
		//     const filter = msg.filter(m => m.author.id === interaction.client.user.id);
		//     console.log(filter);
		// })
		// interaction.reply('done!').catch(console.error);
	},
};
