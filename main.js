const Discord = require('discord.js');
const bot = new Discord.Client({ intents: 3276799});
const config = require('./config.json');

bot.login(config.token);

bot.on('ready', () => {
    console.log('Bot is ready!');
});