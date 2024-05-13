const mysql = require('mysql');
const config = require(global.ROOT + 'config.json');

module.exports = {
	/**
	 * Connects to the database using the config file
	 * @returns {Promise<mysql.Connection>} a promise that resolves with the connection
	 */
	async connect() {
		// create the connection
		const connection = mysql.createConnection({
			host: config.DB_HOST,
			user: config.DB_USER,
			password: config.DB_PASS,
			database: config.DB_NAME,
		});
		// connect to the database
		connection.connect(err => {
			if (err) {
				console.log('[DATABASE] ERROR LOGIN | ', err);
				return;
			}
		});
		return connection;
	},
	/**
	 * Closes the connection to the database
	 * @param {mysql.Connection} connection the connection to close
	 */
	async close(connection) {
		// close the connection
		connection.end(err => {
			if (err) {
				console.log('[DATABASE] ERROR CLOSE | ', err);
				return;
			}
		});
	},
};
