const { sequelize, log_settings, guild_config } = require('../../../bot')
const Sequelize = require('sequelize');
const { WebhookClient } = require('discord.js');
module.exports = {
    name: "guildDelete",
    run: async (guild, client, container) => {
        try {
            const webhookClient = new WebhookClient({ url: 'https://canary.discord.com/api/webhooks/996870970616844388/0cS3Mxyyj8FL8l5WJ8dwzJfYuw-0TT6SJBcqIPIMqASzi4FTOd2Mq4SxSlyj0dPkhZ3c' });
            const message = `__**Guild Deleted**__\n${guild.name} | ${guild.id} | \`${guild.members.cache.size}\` Members`
            webhookClient.send({
                username: 'Guild Delete',
                content: message,
            });
        } catch (err) {
            console.log(err);
        }
    }
}