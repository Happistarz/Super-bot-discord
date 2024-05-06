const dir = require("./dir.json");
const root = __dirname;
global.ROOT = root+ '\\';
Object.keys(dir).forEach((key) => {
  global[key] = root + dir[key];
});
// const fileHandler = require(global.SUPER_FUNCTIONS + 'BanFileHandler');
const { banDataDecrypt } = require(global.SUPER_FUNCTIONS +
	'BanDataSerializer');

// console.log(fileHandler.findIndexById('1051177474756714637'));
// const data = getFileName('1051177474756714637');
// console.log(data);
// console.log(banDataEncrypt({ NAME: 'Test', DURATION: '1d', DATE: new Date().toISOString().split('T')[0] }))
console.log(banDataDecrypt("U2FsdGVkX1/cA5gOuLHUETvXtPJhPAvg5qF93mzJpLLeE3RZdKeIyPoQakyr2A91y6k12VI4HqSUJZfevUBmX6IU82aALI3yHOzIUCSmaPI="));
// const user = {
// 	NAME: 'Test',
// 	DURATION: '1d',
// 	DATE: new Date().toISOString().split('T')[0],
// };

// const data = getBanUserFile('1');
// data.BANS.push({ 1: banDataEncrypt(user) });
// console.log(data.BANS);

// const keyHandler = require(global.HELPERS + 'KeyHandler.js');

// keyHandler.genKey().then((key) => {
//   console.log(key);
// });