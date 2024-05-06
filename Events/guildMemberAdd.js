const Discord = require('discord.js');
const { onMemberJoinEvent } = require(global.SUPER_EVENTS + 'OnMemberJoin');
module.exports = (bot, member) => {

    onMemberJoinEvent(member);
}