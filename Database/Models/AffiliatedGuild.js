const { Model, newModel } = require(global.DATABASE + 'Model');
const moment = require('moment');
class AffiliatedGuild extends Model {
	constructor() {
		super('affiliatedguild', 'id');
		this.id = -1;
		this.guildid = 0;
		this.guildname = '';
		this.refereeid = 0;
		this.refereename = '';
		this.reason = '';
		this.date = moment().format('YYYY-MM-DD');
		this.originalmembercount = 0;
		this.logchannel = 0;
	}

	/**
	 * Affiliate a guild
	 * (its just an alias for create)
	 */
	async affiliate() {
		return this.create();
	}

	/**
	 * Unaffiliate a guild
	 * (its just an alias for delete)
	 */
	async unaffiliate() {
		return this.delete();
	}
}

module.exports = { AffiliatedGuild, newModel };
