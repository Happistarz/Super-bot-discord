const CryptoJS = require('crypto-js');

module.exports = {
	banDataEncrypt(data) {
		return CryptoJS.AES.encrypt(JSON.stringify(data), 'SuP3rS3cR3t').toString();
	},
	banDataDecrypt(data) {
		const bytes = CryptoJS.AES.decrypt(data, 'SuP3rS3cR3t');
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	},
};
