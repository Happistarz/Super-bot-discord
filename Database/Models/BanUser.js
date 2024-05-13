const { Model, newModel } = require(global.DATABASE + 'Model');
const moment = require('moment');
class BanUser extends Model {
	constructor() {
		super('banuser', 'id');
		this.id = -1;
		this.reason = '';
		this.date = moment().format('YYYY-MM-DD');
		this.userid = 0;
		this.username = '';
		this.warns = 0;
	}

	/**
	 * Adds a warn to the user
	 */
	async addWarn() {
		this.warns++;
		if (this.warns >= 5) {
			// await this.ban();
		} else {
			await this.update();
		}
	}

	/**
	 * Removes a warn from the user
	 * @returns {Promise<string>} a promise that resolves with the result of the query
	 */
	async removeWarn() {
		if (this.warns > 0) {
			this.warns--;
			await this.update();
		}
		return 'The user has no warns';
	}

	/**
	 * Bans the user
	 * (its just an alias for create to make the code more readable)
	 */
	async ban() {
		await this.create();
	}

	/**
	 * Unbans the user
	 * (its just an alias for delete to make the code more readable)
	 */
	async unban() {
		await this.delete();
	}
}

module.exports = { BanUser, newModel };
