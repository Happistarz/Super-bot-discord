const Discord = require("discord.js");
const Embed = require(global.HELPERS + "Embeds");

module.exports = {
    name: "embed",
    description: "test Embed and Components",
    dm: false,
    async execute(interaction) {
        interaction.reply({
            embeds: [Embed.createSuperBanEmbed(interaction.user, "reason", "duration",interaction.client)],
        })
        // interaction.channel.messages.fetch(interaction.user.id).then(msg => {
        //     const filter = msg.filter(m => m.author.id === interaction.client.user.id);
        //     console.log(filter);
        // })
        // interaction.reply('done!').catch(console.error);
    }
}