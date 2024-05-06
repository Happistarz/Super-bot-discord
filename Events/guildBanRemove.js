const Discord = require('discord.js');
const fileHandler = require(global.SUPER_FUNCTIONS + 'BanFileHandler');
const { banDataDecrypt } = require(global.SUPER_FUNCTIONS + 'BanDataSerializer');
module.exports = (bot, ban) => {
    const data = fileHandler.getBanUserFile(ban.user.id);

    if (fileHandler.findIndexById(ban.user.id) !== -1) {
        const bannedData = data.BANS[fileHandler.findIndexById(ban.user.id)];
        const bannedDataDecrypted = banDataDecrypt(bannedData);

        // if (new Date(bannedDataDecrypted.DATE) <= new Date()) {
            const index = fileHandler.findIndexById(ban.user.id);
            if (index > -1) {
                data.BANS.splice(index, 1);
            }
            fileHandler.writeBanUserFile(ban.user.id, data);
        // } else {
        //     member.ban({
        //         reason: `ಠ_ಠ You are blacklisted from all affiliated servers.`,
        //     });
        // }
    }
}