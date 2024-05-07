const fs = require("fs");

module.exports = {
    addCommand(command, guild_id, author, output,success) {
        let data = this.getFile(guild_id);

        const commandData = {
            COMMAND: command,
            OUTPUT: output,
            SUCCESS: success,
            DATE: new Date().toISOString().split("T")[0],
            AUTHOR: {
                ID: author.id,
                USERNAME: author.username,
            }
        }

        data.COMMANDS.push(commandData);
        this.writeCommandFile(guild_id, data);
    },
    getFile(guild_id) {
        if (!fs.existsSync(global.DATA_AFFILIATED_HISTORY + guild_id + ".json")) {
            fs.writeFileSync(global.DATA_AFFILIATED_HISTORY + guild_id + ".json", JSON.stringify({ COMMANDS: [] }, null, 2));
        }
        return JSON.parse(fs.readFileSync(global.DATA_AFFILIATED_HISTORY + guild_id + ".json"));
    },
    writeCommandFile(guild_id, data) {
        fs.writeFileSync(global.DATA_AFFILIATED_HISTORY + guild_id + ".json", JSON.stringify(data, null, 2));
    },
    removeCommand(guild_id, command) {
        let data = this.getFile(guild_id);
        data.COMMANDS = data.COMMANDS.filter((cmd) => cmd.COMMAND !== command);
        this.writeCommandFile(guild_id, data);
    },
    getCommandHistory(guild_id) {
        return this.getFile(guild_id).COMMANDS;
    },
    deleteCommandHistory(guild_id) {
        fs.unlinkSync(global.DATA_AFFILIATED_HISTORY + guild_id + ".json");
    }
}