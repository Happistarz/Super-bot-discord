const Discord = require('discord.js');
const fs = require('fs');
const { getBanUserFile, writeBanUserFile } = require(global.SUPER_FUNCTIONS +
	'BanFileHandler');
const { banDataEncrypt } = require(global.SUPER_FUNCTIONS +
	'BanDataSerializer');

export default function onSuperBanEvent(interaction) {
	const user = interaction.options.getUser('user');
	const duration = interaction.options.getString('duration');

	const affiliate = JSON.parse(
		fs.readFileSync(global.DATA_AFFILIATED + 'AFFILIATED.json'),
	);

	try {
		let data = getBanUserFile(user.id);

		const userBanned = {
			NAME: user.username,
			DURATION: duration,
			DATE: new Date().toISOString().split('T')[0],
		};

		data.BANS.push({ [user.id]: banDataEncrypt(userBanned) });

		writeBanUserFile(user.id, data);
	} catch (error) {
		console.error(error);
		return;
	}

	// Remove the guild from the affiliate list to not ban the user twice
	affiliate = affiliate.filter(
		guild => guild.GUILD_ID !== interaction.guild.id,
	);
}
