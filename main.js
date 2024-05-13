// Root imports
const Discord = require('discord.js');
const bot = new Discord.Client({ intents: 3276799 });
const config = require('./config.json');

// get the directories
const dir = require('./dir.json');
const root = __dirname;
global.ROOT = root+ '/';
Object.keys(dir).forEach(key => {
	global[key] = root + dir[key];
});
// Loaders
const CommandsLoader = require(global.LOADERS + 'CommandsLoader');
const EventsLoader = require(global.LOADERS + 'EventsLoader');
// Loaders initialization
bot.commands = new Discord.Collection();
CommandsLoader(bot);
EventsLoader(bot);

// Login
bot.login(config.token);
