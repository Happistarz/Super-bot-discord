const fs = require('fs');

module.exports = {
	getFileName(id) {

		let file = global.DATA_USER_BAN;

		const router = JSON.parse(
			fs.readFileSync(global.DATA_USER_BAN + '_ROUTER.json'),
		);

		Object.keys(router).forEach(key => {
			const start = router[key].START;
			const limit = router[key].LIMIT;

			if (id >= start && id <= limit) {
				file= global.DATA_USER_BAN+`${key}.json`;
			}
		});

		if (file === global.DATA_USER_BAN) {
			return null;
		}

		return file;
	},
	findIndexById(id) {
		const file = this.getBanUserFile(id);

		if (!file) {
			return null;
		}

		return file.BANS.findIndex(ban => Object.keys(ban)[0] === id);
	},
	/**
	 * Get the ban file of a user returning the data as an object
	 * @param {string} id
	 * @returns Object
	 */
	getBanUserFile(id) {

		const file = this.getFileName(id);

		// Check if the file exists and is not empty
		if (fs.existsSync(file) && fs.statSync(file).size > 0) {
			return JSON.parse(fs.readFileSync(file));
		}
	},
	/**
	 * Write the ban file of a user with the data provided
	 * @param {string} id
	 * @param {Object} data
	 */
	writeBanUserFile(id, data) {
		const file = this.getFileName(id);

		fs.writeFileSync(file, JSON.stringify(data, null, 2));
	},
};
