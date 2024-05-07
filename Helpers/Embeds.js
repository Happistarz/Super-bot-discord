const { EmbedBuilder } = require("discord.js");

module.exports = {
  /////////////////////////////////////////////////
  // Common Embeds
  /////////////////////////////////////////////////

  createBanEmbed: (user, reason, time, isPermanent) => {
    const banEmbed = new EmbedBuilder()
      .setColor("#e21b20")
      .setTitle("User Banned")
      .setDescription(
        `**${user.tag}** has been banned for **${time}**. ${
          isPermanent ? "This ban is permanent." : ""
        }`
      )
      .setTimestamp();

    return banEmbed;
  },
  createKickEmbed: (user, reason) => {
    const kickEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("User Kicked")
      .setDescription(`**${user.tag}** has been kicked.`)
      .addField("Reason", reason)
      .setTimestamp();

    return kickEmbed;
  },
  createMuteEmbed: (user, reason, time, isPermanent) => {
    const muteEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("User Muted")
      .setDescription(
        `**${user.tag}** has been muted for **${time}**. ${
          isPermanent ? "This mute is permanent." : ""
        }`
      )
      .addField("Reason", reason)
      .setTimestamp();

    return muteEmbed;
  },
  createUnmuteEmbed: (user) => {
    const unmuteEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("User Unmuted")
      .setDescription(`**${user.tag}** has been unmuted.`)
      .setTimestamp();

    return unmuteEmbed;
  },
  createWarnEmbed: (user, reason) => {
    const warnEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("User Warned")
      .setDescription(`**${user.tag}** has been warned.`)
      .addField("Reason", reason)
      .setTimestamp();

    return warnEmbed;
  },
  createUnbanEmbed: (user) => {
    const unbanEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("User Unbanned")
      .setDescription(`**${user.tag}** has been unbanned.`)
      .setTimestamp();

    return unbanEmbed;
  },
  createPurgeEmbed: (amount, channel) => {
    const purgeEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("Messages Purged")
      .setDescription(`**${amount}** messages have been purged in ${channel}.`)
      .setTimestamp();

    return purgeEmbed;
  },

  createInfoEmbed: (title, description) => {
    const infoEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle(title)
      .setDescription(description)
      .setTimestamp();

    return infoEmbed;
  },

  /////////////////////////////////////////////////
  // Super Embeds
  /////////////////////////////////////////////////

  createSuperBanEmbed: (user, reason, time,bot) => {
    const superBanEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: "SuperBot",
        iconURL: bot.user.displayAvatarURL(),
      })
      .setTitle("ಠ_ಠ User Banned")
      .setDescription(`**${user.tag}** has been banned for **${time}**`)
      .addFields(
        {
          name: "Reason :",
          value: reason,
        }
      )
      .setImage("https://cubedhuang.com/images/alex-knight-unsplash.webp")
      .setThumbnail(user.displayAvatarURL())
      .setFooter({
        text: "Superbot & Co",
        iconURL: bot.user.displayAvatarURL(),
      })
      .setTimestamp();

    return superBanEmbed;
  },
  createSuperKickEmbed: (user, reason) => {
    const superKickEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("User Kicked")
      .setDescription(`**${user.tag}** has been kicked.`)
      .addField("Reason", reason)
      .setTimestamp();

    return superKickEmbed;
  },
  createSuperMuteEmbed: (user, reason, time, isPermanent) => {
    const superMuteEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("User Muted")
      .setDescription(
        `**${user.tag}** has been muted for **${time}**. ${
          isPermanent ? "This mute is permanent." : ""
        }`
      )
      .addFields({ name: "Reason", value: reason })
      .setTimestamp();

    return superMuteEmbed;
  },
  createSuperUnmuteEmbed: (user) => {
    const superUnmuteEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("User Unmuted")
      .setDescription(`**${user.tag}** has been unmuted.`)
      .setTimestamp();

    return superUnmuteEmbed;
  },
  createSuperWarnEmbed: (user, reason) => {
    const superWarnEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("User Warned")
      .setDescription(`**${user.tag}** has been warned.`)
      .addFields({ name: "Reason", value: reason })
      .setTimestamp();

    return superWarnEmbed;
  },
  createSuperUnbanEmbed: (user, author, reason) => {
    const superUnbanEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("User Unbanned")
      .setDescription(`**${user.tag}** has been unbanned by **${author.tag}**.`)
      .addFields({ name: "Reason", value: reason })
      .setTimestamp();

    return superUnbanEmbed;
  },
  createSuperPurgeEmbed: (amount, channel) => {
    const superPurgeEmbed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("Messages Purged")
      .setDescription(`**${amount}** messages have been purged in ${channel}.`)
      .setTimestamp();

    return superPurgeEmbed;
  },
};
