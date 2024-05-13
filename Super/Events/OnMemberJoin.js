const fs = require('fs');

module.exports = {
	onMemberJoinEvent(member) {
		// const data = fileHandler.getBanUserFile(member.id);
		// if (fileHandler.findIndexById(member.id) !== -1) {
		// 	const bannedData = data.BANS[fileHandler.findIndexById(member.id)];
		// 	const bannedDataDecrypted = banDataDecrypt(bannedData);
		// 	if (new Date(bannedDataDecrypted.DATE) <= new Date()) {
		// 		delete data.BANS[fileHandler.findIndexById(member.id)];
		// 		fileHandler.writeBanUserFile(member.id, data);
		// 	} else {
		// 		member.ban({
		// 			reason: `ಠ_ಠ You are blacklisted from all affiliated servers.`,
		// 		});
		// 	}
		// }
	},
};
