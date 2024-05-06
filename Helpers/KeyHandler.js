const { generateKey } = require("crypto");
const fs = require("fs");

module.exports = {
    /**
     * Generate a 128-bit AES key and add it to the NOT_AVAILABLES array in KEYS.json
     * @returns {Promise<string>}
     */
    async genKey() {
        try {
            // Generate a 128-bit AES key
            const key = await new Promise((resolve, reject) => {
                generateKey("aes", { length: 128 }, (err, key) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(key.export().toString("hex"));
                });
            });

            // Read the KEYS.json file
            let data = this.readKeyData();

            // Find the index of the key in the NOT_AVAILABLES array
            let index = data.NOT_AVAILABLES.findIndex((element) => element.key === key);

            // If the key is already in use, generate a new one
            while (index !== -1) {
                // Regenerate a 128-bit AES key
                key = await new Promise((resolve, reject) => {
                    generateKey("aes", { length: 128 }, (err, key) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(key.export().toString("hex"));
                    });
                });

                // Check if the new key is already in use
                index = data.NOT_AVAILABLES.findIndex((element) => element.key === key);
            }

            // Add the key to the NOT_AVAILABLES array
            this.addKeyData(key);
            return key;
        } catch (err) {
            console.log(err);
        }
    },
    /**
     * Read the KEYS.json file and return its parsed content
     * @returns {Object}
     */
    readKeyData() {
        let data = JSON.parse(fs.readFileSync(global.DATA + "KEYS.json"));
        return data;
    },
    /**
     * Write data to the KEYS.json file
     * @param {Object} data any object to write to the KEYS.json file
     */
    writeKeyData(data) {
        fs.writeFileSync(global.DATA + "KEYS.json", JSON.stringify(data, null, 2));
    },
    /**
     * Add a key to the NOT_AVAILABLES array in KEYS.json
     * @param {string} key the key to add to the NOT_AVAILABLES array 
     */
    addKeyData(key) {
        let data = this.readKeyData();

        // Get the current date and time in the format "YYYY-MM-DD HH:MM:SS"
        let date = new Date().toISOString().slice(0,19).replace("T", " ");
        
        // Add the key to the NOT_AVAILABLES array
        data.NOT_AVAILABLES.push({ key: key, date: date, accepted: null});
        
        this.writeKeyData(data);
    },
    /**
     * Remove a key from the NOT_AVAILABLES array in KEYS.json
     * @param {string} key the key to remove from the NOT_AVAILABLES array
     */
    removeKeyData(key) {
        let data = this.readKeyData();

        // Find the index of the key in the NOT_AVAILABLES array
        let index = data.NOT_AVAILABLES.findIndex((element) => element.key === key);

        // Remove the key from the NOT_AVAILABLES array
        data.NOT_AVAILABLES.splice(index, 1);

        this.writeKeyData(data);
    },
    /**
     * Set the accepted status of a key in the NOT_AVAILABLES array in KEYS.json
     * @param {string} key the key to set the accepted status of
     * @param {boolean} accepted the accepted status to set
     */
    setAccepted(key, accepted) {
        let data = this.readKeyData();

        // Find the index of the key in the NOT_AVAILABLES array
        let index = data.NOT_AVAILABLES.findIndex((element) => element.key === key);

        if (!accepted) {
            // Remove the key from the NOT_AVAILABLES array
            data.NOT_AVAILABLES.splice(index, 1);
        } else {
            // Set the accepted status of the key
            data.NOT_AVAILABLES[index].accepted = accepted;
        }

        this.writeKeyData(data);
    }
};
