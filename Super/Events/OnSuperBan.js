const Discord = require("discord.js");
const fs = require("fs");
const fileHandler = require(global.SUPER_FUNCTIONS +
  "BanFileHandler");
const { banDataEncrypt } = require(global.SUPER_FUNCTIONS +
  "BanDataSerializer");

module.exports = {
  onSuperBanEvent(user, duration, guild_id) {
    let affiliate = JSON.parse(
      fs.readFileSync(global.DATA_AFFILIATED + "AFFILIATED.json")
    );

    // Remove the guild from the affiliate list to not ban the user twice
    affiliate = affiliate.GUILDS.filter((guild) => guild.GUILD_ID !== guild_id);

    try {
      let data = fileHandler.getBanUserFile(user.id);

      const userBanned = {
        NAME: user.username,
        DURATION: duration,
        DATE: new Date().toISOString().split("T")[0],
        WARNS: []
      };

      data.BANS.push({ [user.id]: banDataEncrypt(userBanned) });

      fileHandler.writeBanUserFile(user.id, data);

	  // for each guild in the affiliate list, ban the user
	  affiliate.forEach((guild) => {
		const guildObj = global.client.guilds.cache.get(guild.GUILD_ID);

		if (guildObj) {
		  guildObj.members.ban(user, {
			reason: `ಠ_ಠ You are blacklisted from all affiliated servers.`,
		  });
		}
	  });
    } catch (error) {
      console.error(error);
      return;
    }
  },
};
