const fs = require('fs');

module.exports = {
	/**
	 * Get the ban file of a user returning the data as an object
	 * @param {string} id
	 * @returns Object
	 */
	getBanUserFile(id) {
		let file = global.DATA_USER_BAN;

		const router = JSON.parse(
			fs.readFileSync(global.DATA_USER_BAN + '_ROUTER.json'),
		);

		Object.keys(router).forEach(key => {
			const start = router[key].START;
			const limit = router[key].LIMIT;

			if (id >= start && id <= limit) {
				file += `${key}.json`;
			}
		});

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
		let file = global.DATA_USER_BAN;

		const router = JSON.parse(
			fs.readFileSync(global.DATA_USER_BAN + '_ROUTER.json'),
		);

		Object.keys(router).forEach(key => {
			const start = router[key].START;
			const limit = router[key].LIMIT;

			if (id >= start && id <= limit) {
				file += `${key}.json`;
			}
		});

		fs.writeFileSync(file, JSON.stringify(data, null, 2));
	},
};
