const { MessageEmbed, Interaction } = require('discord.js');
const { sequelize, log_settings } = require('../../bot')
const Sequelize = require('sequelize');

module.exports = {
    name: "messageDelete",
    run: async (message, client, container) => {
        try {
            const cloud_emoji_guild = client.guilds.cache.get('951796448285048852').emojis.cache.find(emoji => emoji.name === 'cloud_delete')
            const message_delete_embed = new MessageEmbed()
                .setTitle(`${cloud_emoji_guild} Message Deleted!`)
                .setDescription(`A Message was deleted from ${message.channel.name}`)
                .setColor('#303136')
            const guild_settings = await log_settings.findOne({
                attributes: [
                    'guild_id',
                    'log_channel',
                    'message_delete'
                ],
                where: { guild_id: message.guild.id }
            });

            const log_channels = guild_settings.get('log_channel');
            message.guild.channels.cache.get(log_channels).send({ embeds: [message_delete_embed]})
        }
        catch (err) {
            console.log(err);
        }
    }
}