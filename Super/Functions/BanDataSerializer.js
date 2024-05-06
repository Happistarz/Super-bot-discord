const CryptoJS = require('crypto-js');
const config = require(global.ROOT+'config.json');

module.exports = {
	/**
	 * Encrypt data using AES encryption
	 * @param {Object} data the data object to encrypt
	 * @returns {string}
	 */
	banDataEncrypt(data) {
		return CryptoJS.AES.encrypt(JSON.stringify(data), config.secret_key).toString();
	},
	/**
	 * Decrypt data using AES encryption
	 * @param {string} data the data string to decrypt
	 * @returns {Object}
	 */
	banDataDecrypt(data) {
		const bytes = CryptoJS.AES.decrypt(data, config.secret_key);
		return bytes.toString(CryptoJS.enc.Utf8);
	},
};
