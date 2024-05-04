const Discord = require('discord.js');
const bot = new Discord.Client({ intents: 3276799 });
const config = require('./config.json');

const CommandsLoader = require('./Loaders/CommandsLoader');
const EventsLoader = require('./Loaders/EventsLoader');

bot.commands = new Discord.Collection();
CommandsLoader(bot);
EventsLoader(bot);

bot.login(config.token);
