const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { sequelize, log_settings } = require('../../../bot')
const Sequelize = require('sequelize');
module.exports = {
    name: 'edit_guild_log_options',
    returnNoErrors: false,
    ownerOnly: true,
    run: async (client, interaction, container) => {
        function getEmoji(server_id, emoji_name) {
            let emoji = '';
            emoji = client.guilds.cache.get(server_id).emojis.cache.find(emoji => emoji.name === emoji_name)
            return emoji;
        }
        const guild_log_settings = await log_settings.findOne({
            where: {
                guild_id: interaction.guild.id
            },
        })
        let logSettings = function (log_option) {
            let emoji = '';
            if (log_option === 'log_channel') {
                if (guild_log_settings.get('log_channel') === null) {
                    emoji = getEmoji('994925406505410600', 'icons_dyellow')
                } else {
                    emoji = `<#${guild_log_settings.get('log_channel')}>`
                }
            } else if (guild_log_settings.get(log_option) === true) {
                emoji = getEmoji('994925406505410600', 'icons_dgreen')
            } else if (guild_log_settings.get(log_option) == false) {
                emoji = getEmoji('994925406505410600', 'icons_dred')
            } else if (log_option === 'blacklisted_roles' || log_option === 'blacklisted_channels') {
                if (guild_log_settings.get(log_option) === null) {
                    emoji = `${getEmoji('951796448285048852', 'cloud_hypen')} **N/A**`
                } else {
                    if (log_option === 'blacklisted_roles') {
                        const roles = guild_log_settings.get('blacklisted_roles')
                        let arr = roles.split(',')
                        let arrSorted = arr.map(x => '<@&' + x + '>')
                        emoji = arrSorted
                    } else if (log_option === 'blacklisted_channels') {
                        const channels = guild_log_settings.get('blacklisted_channels')
                        let arr = channels.split(',')
                        let arrSorted = arr.map(i => '<#' + i + '>').join('\n')
                        emoji = arrSorted
                    }
                }
            }
            return emoji;
        }
        const messageEmbed = interaction.message.embeds[0]
        const updatedEmbed = new container.Discord.MessageEmbed()
            .setTitle(`Toggle Log Options for ${interaction.guild.name}`)
            .addFields(
                { name: '\u200b', value: 'Message Delete', inline: true },
                { name: '\u200b', value: 'Disabled', inline: true }
            );
        const newMessageActionRow1 = new container.Discord.MessageActionRow()
            .addComponents(
                new container.Discord.MessageSelectMenu()
                    .setCustomId('log_settings_options')
                    .setPlaceholder(`Log Options for ${interaction.guild.name}`)
                    .addOptions([
                        {
                            label: 'Role Create',
                            description: 'Activated when a new role is created.',
                            value: 'roleCreate',
                        },
                        {
                            label: 'Role Update',
                            description: 'Activated when a role is updated.',
                            value: 'roleUpdate',
                        },
                        {
                            label: 'Role Delete',
                            description: 'Activated when a role is deleted.',
                            value: 'roleDelete'
                        },
                        {
                            label: 'Message Delete',
                            description: 'Activated when a message is deleted.',
                            value: 'messageDelete'
                        },
                        {
                            label: 'Message Update',
                            description: 'Activated when a message is updated/edited.',
                            value: 'messageUpdate'
                        },
                    ]),
            );
        const newMessageActionRow2 = new container.Discord.MessageActionRow()
            .addComponents(
                new container.Discord.MessageButton()
                    .setStyle('SECONDARY')
                    .setLabel('Exit')
                    .setCustomId('exit_settings_button'),
                new container.Discord.MessageButton()
                    .setStyle('SECONDARY')
                    .setLabel('End Interaction')
                    .setCustomId('end_interaction_button')
            );
        interaction.update({ embeds: [updatedEmbed], components: [newMessageActionRow1, newMessageActionRow2] })
    }
}