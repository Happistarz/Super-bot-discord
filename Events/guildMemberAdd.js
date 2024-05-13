const Discord = require('discord.js');
const fs = require('fs');
const { onMemberJoinEvent } = require(global.SUPER_EVENTS + 'OnMemberJoin');
module.exports = (bot, member) => {

    const affiliate = JSON.parse(fs.readFileSync(global.DATA_AFFILIATED + 'AFFILIATED.json'));

    if (affiliate.GUILDS.find((guild) => guild.GUILD_ID === member.guild.id)) {   
        onMemberJoinEvent(member);
    }
}