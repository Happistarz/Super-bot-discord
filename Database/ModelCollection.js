const { Model } = require(global.DATABASE + 'Model');

/**
 * Class to store a collection of models
 * @class ModelCollection
 */
class ModelCollection {
	/**
	 * Creates an instance of ModelCollection.
	 * @param {Array} [models=[]] an array of models
	 */
	constructor(models = []) {
		this.models = models;
	}

	/**
	 * Adds a model to the collection
	 * @param {Model} model the model to add
	 */
	add(model) {
		this.models.push(model);
	}

	/**
	 * Removes a model from the collection
	 * @param {Model} model the model to remove
	 */
	remove(model) {
		this.models = this.models.filter(m => m !== model);
	}

	/**
	 * Gets a model from the collection by id
	 * @param {string} id the id of the model to get
	 * @returns {Model} the model with the specified id
	 */
	get(id) {
		return this.models.find(m => m.id === id);
	}

	/**
	 * Gets all the models in the collection
	 * @returns {Array} an array of all the models in the collection
	 */
	getAll() {
		return this.models;
	}

	/**
	 * Clears the collection
	 */
	clear() {
		this.models = [];
	}
}

/**
 * Lists models from the database
 * @param {Model} T the model to list
 * @param {*} condition the condition to filter the models
 * @returns {ModelCollection} a collection of models
 */
async function listModels(T, condition) {
	// Create a new instance of the model
	const models = new ModelCollection();

	// Create a new instance of the model to use the raw method and table property
	const modelInstance = new T();

	// Get the results from the database
	const results = await modelInstance.raw(
		'SELECT * FROM ' + modelInstance.table + ' WHERE ' + condition,
	);

	// If there are no results, return null
	if (!results) {
		return null;
	}

	// For each result, create a new model and add it to the collection
	results.forEach(result => {
		// Create a new instance of the model
		const model = new T();

		// Set the properties of the model
		Object.keys(result).forEach(key => {
			model[key] = result[key];
		});

		// Add the model to the collection
		models.add(model);
	});

	return models;
}

module.exports = { ModelCollection, listModels };
