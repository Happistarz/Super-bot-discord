const dir = require('./dir.json');
const root = __dirname;
global.ROOT = root + '/';
Object.keys(dir).forEach(key => {
	global[key] = root + dir[key];
});

// const { BanUser, newModel } = require(global.DATABASE_MODELS + 'BanUser');
// // const { ModelCollection, listModels } = require(global.DATABASE +
// // 	'ModelCollection');
// const moment = require('moment');
// async function test() {
// 	// newModel return a new instance of the model or false if the read fails
// 	// const collection = listModels(BanUser, "username = 'happiz'")
// 	// 	.then(console.log)
// 	// 	.catch(console.error);
// 	const banUser = new BanUser();
// 	banUser.username = 'happiz';
// 	banUser.userid = '18446744073709551615';
// 	banUser.warns = 2;
// 	await banUser.create().then(console.log).catch(console.error);
// }
// test();

const { Guild, newModel } = require(global.DATABASE_MODELS + 'Guild');
// interactionCreate
async function t(lang) {
	let guild = await newModel(Guild, "guildid = '1236290471928795176'");
	if (guild.success) {
		guild = guild.model;
		guild.setLang(lang).then(console.log).catch(console.error);
		const LANG = require(global.LANG + guild.lang + '.json');
		console.log(LANG.welcome);
	} else {
		const LANG = require(global.LANG + 'en.json');
		console.log(LANG.welcome);
	}
}

// guildMemberAdd, if it's the first time the bot is added to the server
async function t2() {
	let guild = new Guild();
	guild.guildid = '1236290471928795176';
	guild.lang = 'en';
	await guild.create().then(console.log).catch(console.error);
	const LANG = require(global.LANG + guild.lang + '.json');
	console.log(LANG.welcome);
}

// guildDelete, if the guild is deleted
async function t3() {
	let guild = await newModel(Guild, "guildid = '1236290471928795176'");
	if (guild.success) {
		guild = guild.model;
		guild.delete().then(console.log).catch(console.error);
	} else {
		console.log('Guild not found');
	}
}
