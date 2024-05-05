const fs = require('fs');
const { getBanUserFile, writeBanUserFile } = require(global.SUPER_FUNCTIONS +
	'BanFileHandler');
const { banDataDecrypt } = require(global.SUPER_FUNCTIONS +
	'BanDataSerializer');

export default function onMemberJoinEvent(interaction) {
	const user = interaction.user;

	const data = getBanUserFile(user.id);

	if (data.BANS[user.id]) {
		const bannedData = data.BANS[user.id];
		const bannedDataDecrypted = banDataDecrypt(bannedData);

		if (new Date(bannedDataDecrypted.DATE) <= new Date()) {
			delete data.BANS[user.id];
			writeBanUserFile(user.id, data);
		} else {
			interaction.guild.members.ban(user.id, {
				reason: `User is banned until ${bannedDataDecrypted.DATE}. Reason: ${bannedDataDecrypted.REASON}`,
			});
		}
	}
}
