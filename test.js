const dir = require('./dir.json');
const root = __dirname;
Object.keys(dir).forEach(key => {
	global[key] = root + dir[key];
});
const { getBanUserFile } = require(global.SUPER_FUNCTIONS + 'BanFileHandler');
const { banDataEncrypt } = require(global.SUPER_FUNCTIONS +
	'BanDataSerializer');

const user = {
	NAME: 'Test',
	DURATION: '1d',
	DATE: new Date().toISOString().split('T')[0],
};

const data = getBanUserFile('1');
data.BANS.push({ 1: banDataEncrypt(user) });
console.log(data.BANS);
