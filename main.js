const { loadMessageCommands } = require('./src/Functions/Handlers/Handler');

(async () => {
    const Discord = require('discord.js')
    require('dotenv').config()
    const Config = require('./Config');
    const path = __dirname
    const client = new Discord.Client(
        {
            intents: 3276799,
            partials: ['CHANNEL', 'USER', 'GUILD_MEMBER', 'REACTION', 'MESSAGE'],
        }
    )
    exports.client = client;
    exports.path = path;
    exports.config = config;
    client.commands = {};
    client.events = new Discord.Collection();
    client.commands.messageCommands = new Discord.Collection();
    client.commands.messageCommands.aliases = new Discord.Collection();
    client.commands.contextMenus = new Discord.Collection();
    client.commands.slashCommands = new Discord.Collection();
    client.commands.buttonCommands = new Discord.Collection();
    client.commands.selectMenus = new Discord.Collection();

    const Handler = require(`${path}/src/Functions/Handlers/Handler`)
    await Handler.loadMessageCommands(client, path);
	await Handler.loadEvents(client);
	await client.login(process.env.CLIENT_TOKEN);
	await Handler.loadSlashCommands(client, path);
	await Handler.loadContextMenus(client, path);
	await Handler.loadButtonCommands(client, path);
	await Handler.loadSelectMenus(client, path);
})