const Discord = require("discord.js");
const fileHandler = require(global.SUPER_FUNCTIONS + "BanFileHandler");
const { banDataDecrypt } = require(global.SUPER_FUNCTIONS +
  "BanDataSerializer");
module.exports = (bot, ban) => {
  const data = fileHandler.getBanUserFile(ban.user.id);

  if (fileHandler.findIndexById(ban.user.id) !== -1) {
    const bannedData = data.BANS[fileHandler.findIndexById(ban.user.id)];
    const bannedDataDecrypted = banDataDecrypt(bannedData);

    const index = fileHandler.findIndexById(ban.user.id);
    if (index > -1) {
      data.BANS.splice(index, 1);
    }
    fileHandler.writeBanUserFile(ban.user.id, data);
  }
};
