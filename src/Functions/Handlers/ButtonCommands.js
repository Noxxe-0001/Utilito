const fs = require("fs");
const Filer = require('../../Functions/Utilities/Filer');
module.exports = async function(client, path) {
    Filer(`${path}/src/Commands/ButtonCommands`, async function(err, res) {
        res.forEach(file => {
            if (fs.statSync(file).isDirectory()) return;
            const button = require(file)
            if (button.ignoreFile) return;
            client.commands.buttonCommands.set(button.name, button)
        })
    })
}