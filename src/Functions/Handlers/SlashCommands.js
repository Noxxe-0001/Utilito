const fs = require('fs');
const Filer = require('../../Functions/Utilities/Filer');
const chalk = require('chalk')
const Table = require('cli-table3')
var table = new Table({
    chars: {
        'top': '═',
        'top-mid': '╦',
        'top-left': '╔',
        'top-right': '╗',
        'bottom': '═',
        'bottom-mid': '╩',
        'bottom-left': '╚',
        'bottom-right': '╝',
        'left': '║',
        'left-mid': '╠',
        'mid': '═',
        'mid-mid': '╬',
        'right': '║',
        'right-mid': '╣',
        'middle': '║'
    },
    colWidths: [25, 25],
    style: { border: [], head: [] },
    wordWrap: true,
    wrapOnWordBoundary: false,
});
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
module.exports = async function(client, path) {
    Filer(`${path}/src/Commands/SlashCommands`, async function (err, res) {
		res.forEach(file => {
			if (fs.statSync(file).isDirectory()) return;
			const cmd = require(file);
			if (cmd.ignoreFile) return;
            client.commands.slashCommands.set(require(file).name, require(file));
            var table = new Table({
                chars: {
                    'top': '═',
                    'top-mid': '╦',
                    'top-left': '╔',
                    'top-right': '╗',
                    'bottom': '═',
                    'bottom-mid': '╩',
                    'bottom-left': '╚',
                    'bottom-right': '╝',
                    'left': '║',
                    'left-mid': '╠',
                    'mid': '═',
                    'mid-mid': '╬',
                    'right': '║',
                    'right-mid': '╣',
                    'middle': '║'
                },
                colWidths: [25, 25],
                style: { border: [], head: [] },
                wordWrap: true,
                wrapOnWordBoundary: false,
            });
            table.push(
                [{ colSpan: 2, hAlign: 'center', content: `COMMAND CREATED` }],
                ["NAME", `${cmd.name}`],
            )
            console.log(chalk.greenBright(table.toString()));
		});
		let promise = Promise.resolve();
		res.forEach(async function(file) {
			promise = promise.then(async function() {
				const interval = 5000;
				if (fs.statSync(file).isDirectory()) return;
				const cmd = require(file);
				if (cmd.ignoreFile) return;

				if (cmd.guilds && Array.isArray(cmd.guilds)) {cmd.guilds.forEach(guildID => {
                    (async () => {
                    const guild = client.guilds.cache.get(guildID) ?? await client.guilds.fetch(guildID)
                    const verifier = guild.commands.cache.find(x => x.name == cmd.name)
                    if (verifier) await guild.commands.edit(verifier.id, {
                        name: cmd.name,
                        description: cmd.description ?? "None",
                        options: cmd.options ?? [],
                        type: cmd.type ?? ApplicationCommandType.ChatInput
                    })
                    else await guild.commands.create({
                        name: cmd.name,
                        description: cmd.description ?? "None",
                        options: cmd.options ?? [],
                        type: cmd.type ?? ApplicationCommandType.ChatInput
                    })
                })()
            })}
				else {
					const verifier = client.application.commands.cache.find(x => x.name == cmd.name);
					if (verifier) {await client.application.commands.edit(verifier.id, {
                        name: cmd.name,
                        description: cmd.description ?? "None.",
                        options: cmd.options ?? [],
                        type: cmd.type ?? ApplicationCommandType.ChatInput
                    })}
					else {await client.application.commands.create({
                        name: cmd.name,
                        description: cmd.description ?? "None.",
                        options: cmd.options ?? [],
                        type: cmd.type ?? ApplicationCommandType.ChatInput
                    })};
                }
				return new Promise(function(resolve) {
					setTimeout(resolve, interval);
				});
			});
		});
	});
};