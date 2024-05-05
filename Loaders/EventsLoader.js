const fs = require('fs');

/**
 * Initialize all events in the Events folder
 * @param {Discord.Client} bot
 */
module.exports = async bot => {
	// Read all files in the Events folder
	fs.readdirSync('./Events')
		.filter(f => f.endsWith('.js'))
		.forEach(file => {
			// Import the event
			let event = require(`../Events/${file}`);
			// Bind the event to the bot
			bot.on(file.split('.js').join(''), event.bind(null, bot));
			console.log(`[LOADER] EVENT | ${file} loaded!`);
		});
};
