const dir = require('./dir.json');
const root = __dirname;
global.ROOT = root + '/';
Object.keys(dir).forEach(key => {
	global[key] = root + dir[key];
});

const { BanUser, newModel } = require(global.DATABASE_MODELS + 'BanUser');
// const { ModelCollection, listModels } = require(global.DATABASE +
// 	'ModelCollection');
const moment = require('moment');
async function test() {
	// newModel return a new instance of the model or false if the read fails
	// const collection = listModels(BanUser, "username = 'happiz'")
	// 	.then(console.log)
	// 	.catch(console.error);
	const banUser = new BanUser();
	banUser.username = 'happiz';
	banUser.userid = '18446744073709551615';
	banUser.warns = 2;
	await banUser.create().then(console.log).catch(console.error);
}
test();
