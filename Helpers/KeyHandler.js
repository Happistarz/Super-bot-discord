const { generateKey } = require("crypto");
const fs = require("fs");

global.DATA = __dirname+"/../Data/";

// module.exports = {
    async function genKey() {
        return new Promise((resolve, reject) => {
            generateKey("aes", { length: 128 }, (err, keyObject) => {
                if (err) {
                    reject(err);
                } else {
                    const key = keyObject.export().toString("hex");
                    resolve(key);
                }
            });
        });
    }
    function readKeyData() {
        let data = JSON.parse(fs.readFileSync(global.DATA + "KEYS.json"));
        return data;
    }
    function writeKeyData(data) {
        fs.writeFileSync(global.DATA + "KEYS.json", JSON.stringify(data, null, 2));
    }
    function addKeyData(key) {
        let data = readKeyData();

        let date = new Date().toISOString().split("T")[0];
        
        data.NOT_AVAILABLES.push({ key: key, date: date, accepted: null});
        
        writeKeyData(data);
    }
    function removeKeyData(key) {
        let data = readKeyData();

        let index = data.NOT_AVAILABLES.findIndex((element) => element.key === key);

        data.NOT_AVAILABLES.splice(index, 1);

        writeKeyData(data);
    }
    function setAccepted(key, accepted) {
        let data = readKeyData();

        let index = data.NOT_AVAILABLES.findIndex((element) => element.key === key);

        data.NOT_AVAILABLES[index].accepted = accepted;

        writeKeyData(data);
    }
// };