const Connection = require(global.DATABASE + 'Connection');
const moment = require('moment');

/**
 * Base class for models that interact with the database.
 * The class provides basic CRUD operations and is meant to be extended
 * @class Model
 */
class Model {
	/**
	 * Creates an instance of Model.
	 * @param {string} table the table name in the database
	 * @param {string} primary the primary key of the table
	 */
	constructor(table, primary) {
		// prevent direct instantiation, must be extended
		if (new.target === Model) {
			throw new TypeError('Cannot construct Model instances directly');
		}

		this.table = table;
		this.primary = primary;

		// properties that are not part of the database but are used internally
		this.arraysys = ['table', 'primary', 'arraysys'];
	}

	/**
	 * Loops through the object properties and returns the keys and values
	 * @returns {Object} an object containing the keys and values of the object
	 */
	#selfData() {
		const keys = [];
		const values = [];

		// loop through the object properties
		Object.keys(this).forEach(key => {
			// if the property is not part of the arraysys, add it to the keys and values
			if (!this.arraysys.includes(key)) {
				keys.push(key);
				// if the property is a date and not null or undefined, format it
				if (
					key.includes('date') &&
					this[key] !== 'NULL' &&
					this[key] !== 'undefined'
				) {
					values.push(`'${moment(this[key]).format('YYYY-MM-DD')}'`);
				} else {
					// convert the property to a string and add it to the values
					values.push(`'${this[key]}'`);
				}
			}
		});

		return { keys, values };
	}

	/**
	 * Executes a query on the database
	 * @param {string} query the query to execute
	 * @returns {Promise} a promise that resolves with the result of the query
	 */
	async #query(query) {
		// connect to the database
		const db = await Connection.connect();
		try {
			// execute the query
			const result = await new Promise((resolve, reject) => {
				db.query(query, function (err, result) {
					// if there is an error, reject the promise
					if (err) {
						console.log(err);
						reject(err);
					} else {
						// resolve the promise with the result
						resolve(result);
					}
				});
			});

			// close the connection and return the result
			await Connection.close(db);
			return result;
		} catch (error) {
			// if there is an error, log it, close the connection and return false
			console.error(error);
			await Connection.close(db);
			return false;
		}
	}

	/**
	 * Executes a raw query on the database without builded query
	 * @param {string} query the query to execute
	 * @returns
	 */
	async raw(query) {
		return await this.#query(query);
	}

	/**
	 * Reads an object from the database by its id
	 * @param {string} id the id of the object to read from the database
	 * @returns {Promise} a promise that resolves with the result of the query
	 */
	async read(id) {
		// read by id and query
		const query = `SELECT * FROM ${this.table} WHERE ${this.primary} = '${id}'`;
		const result = await this.#query(query);

		// if the result is empty, return false
		if (!result.length) {
			return false;
		}

		// set the object properties
		Object.keys(result[0]).forEach(key => {
			this[key] = result[0][key];
		});

		return true;
	}

	/**
	 * Reads an object from the database by a condition
	 * @param {string} condition the condition to match the object
	 * @returns {Promise} a promise that resolves with the result of the query
	 */
	async readBy(condition) {
		// read by condition
		const query = `SELECT * FROM ${this.table} WHERE ${condition}`;
		const result = await this.#query(query);

		// unique or empty result
		if (!result.length || result.length > 1) {
			return false;
		}

		// set the object properties
		Object.keys(result[0]).forEach(key => {
			this[key] = result[0][key];
		});

		return true;
	}

	/**
	 * Creates an object in the database with the object properties
	 * @returns {Promise} a promise that resolves with the result of the query
	 */
	async create() {
		// get the keys and values of the object without the primary key
		let data = this.#selfData();
		data.keys = data.keys.filter(key => key !== this.primary);
		data.values = data.values.filter(
			value => value !== `'${this[this.primary]}'`,
		);

		// build the query
		const query = `INSERT INTO ${this.table} (${data.keys.join(
			',',
		)}) VALUES (${data.values.join(',')})`;

		// execute the query
		return this.#query(query);
	}

	/**
	 * Updates an object in the database with the object properties
	 * @returns {Promise} a promise that resolves with the result of the query
	 */
	async update() {
		// get the keys and values of the object
		const data = this.#selfData();

		// build the query
		const query = `UPDATE ${this.table} SET ${data.keys
			.map((key, i) => `${key} = ${data.values[i]}`)
			.join(',')} WHERE ${this.primary} = '${this[this.primary]}'`;

		// execute the query
		return this.#query(query);
	}

	/**
	 * Deletes an object from the database by its id
	 * @returns {Promise} a promise that resolves with the result of the query
	 */
	async delete() {
		// build the query
		const query = `DELETE FROM ${this.table} WHERE ${this.primary} = '${
			this[this.primary]
		}'`;

		// execute the query
		return this.#query(query);
	}

	/**
	 * Simple toString method that logs the object properties for debugging
	 */
	toString() {
		console.log(JSON.stringify(this, null, 2));
	}
}

/**
 * Returns a new instance of the model or false if the read fails
 * @param {Model} T the model class extending Model
 * @param {*} condition the condition to match the object
 * @returns {T} a new instance of the model or false if the read fails
 */
async function newModel(T, condition) {
	const model = new T();
	// if readBy returns false, return false
	if (!(await model.readBy(condition))) {
		return { success: false, model: null };
	}
	return { success: true, model };
}

module.exports = { Model, newModel };
