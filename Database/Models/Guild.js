const { Model, newModel } = require(global.DATABASE + 'Model');
class Guild extends Model {
	constructor() {
		super('guild', 'id');
		this.id = -1;
		this.guildid = 0;
		this.lang = 'en';
	}

	async setLang(lang) {
		this.lang = lang;
		if (this.id !== -1) return this.update();
	}
}

module.exports = { Guild, newModel };
