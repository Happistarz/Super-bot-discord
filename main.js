// Root imports
const Discord = require('discord.js');
const bot = new Discord.Client({ intents: 3276799 });
const config = require('./config.json');

// Loaders
const CommandsLoader = require('./Loaders/CommandsLoader');
const EventsLoader = require('./Loaders/EventsLoader');

// Loaders initialization
bot.commands = new Discord.Collection();
CommandsLoader(bot);
EventsLoader(bot);

// Login
bot.login(config.token);
