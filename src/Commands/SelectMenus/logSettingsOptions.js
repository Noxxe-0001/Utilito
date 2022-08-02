const { MessageEmbed, MessageActionRow, MessageButton, EmbedBuilder, ButtonBuilder, SelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { sequelize, log_settings } = require('../../../bot')
const Sequelize = require('sequelize');
module.exports = {
    name: "log_settings_options",
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
        if (interaction.values[0] === 'roleCreate') {
            const messageEmbed = interaction.message.embeds[0]
            const updatedEmbed = new EmbedBuilder()
                .setTitle(`Role Create`)
                .setDescription('Emitted whenever a new role is created.\n\`TIP:\` *Members who are blacklisted will be ignored by the bot\'s logging.*')
            const newMessageActionRow1 = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('log_settings_options')
                        .setPlaceholder(`Log Options for ${interaction.guild.name}`)
                        .addOptions([
                            {
                                label: 'Role Create',
                                description: 'Activated when a new role is created.',
                                value: 'roleCreate',
                                default: true,
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
                            {
                                label: 'Member Ban',
                                description: 'Activated when a member is banned from the server.',
                                value: 'memberBan'
                            },
                            {
                                label: 'Member Kick',
                                description: 'Activated when a member is kicked from the server.',
                                value: 'memberKick'
                            },
                            {
                                label: 'Member Timeout',
                                description: 'Activated when a member is put in timeout.',
                                value: 'memberTimeout',
                            },
                            {
                                label: 'Member Nickname Update',
                                description: 'Activated when a member\'s nickname is changed/updated.',
                                value: 'memberNicknameUpdate',
                            },
                            {
                                label: 'Member Temp-Ban',
                                description: 'Activated when a member is temporarily banned from the server.',
                                value: 'memberTempBan',
                            },
                            {
                                label: 'Member Unban',
                                description: 'Activated when a member is unbanned.',
                                value: 'memberUnban',
                            },
                            {
                                label: 'Member Warn',
                                description: 'Activated when a member is warned.',
                                value: 'memberWarn',
                            },
                            {
                                label: 'Member Muted',
                                description: 'Activated when a member is muted.',
                                value: 'memberMute',
                            },
                            {
                                label: 'Member Unmuted',
                                description: 'Activated when a member is unmuted.',
                                value: 'memberUnmuted',
                            },
                        ]),
                );
            const newMessageActionRow2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(4)
                        .setLabel('Disable')
                        .setCustomId('role_create_disable_button')
                        .setDisabled(guild_log_settings.get('role_create') === false),
                    new ButtonBuilder()
                        .setStyle(3)
                        .setLabel('Enable')
                        .setDisabled(guild_log_settings.get('role_create') === true)
                        .setCustomId('role_create_enable_button'),
                    new ButtonBuilder()
                        .setStyle(2)
                        .setLabel('Exit')
                        .setCustomId('exit_settings_button'),
                    new ButtonBuilder()
                        .setStyle(1)
                        .setLabel('Back')
                        .setCustomId('log_settings_back_button'),
                );
            interaction.update({ embeds: [updatedEmbed], components: [newMessageActionRow1, newMessageActionRow2] })
        } else if (interaction.values[0] === 'roleDelete') {
            const messageEmbed = interaction.message.embeds[0]
            const updatedEmbed = new EmbedBuilder()
                .setTitle(`Role Delete`)
                .setDescription('Emitted whenever a role is deleted.\n\`TIP:\` *Members who are blacklisted will be ignored by the bot\'s logging.*')
            const newMessageActionRow1 = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('log_settings_options')
                        .setPlaceholder(`Log Options for ${interaction.guild.name}`)
                        .addOptions([
                            {
                                label: 'Role Create',
                                description: 'Activated when a new role is created.',
                                value: 'roleCreate'
                            },
                            {
                                label: 'Role Update',
                                description: 'Activated when a role is updated.',
                                value: 'roleUpdate',
                            },
                            {
                                label: 'Role Delete',
                                description: 'Activated when a role is deleted.',
                                value: 'roleDelete',
                                default: true,
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
                            {
                                label: 'Member Ban',
                                description: 'Activated when a member is banned from the server.',
                                value: 'memberBan'
                            },
                            {
                                label: 'Member Kick',
                                description: 'Activated when a member is kicked from the server.',
                                value: 'memberKick'
                            },
                            {
                                label: 'Member Timeout',
                                description: 'Activated when a member is put in timeout.',
                                value: 'memberTimeout',
                            },
                            {
                                label: 'Member Nickname Update',
                                description: 'Activated when a member\'s nickname is changed/updated.',
                                value: 'memberNicknameUpdate',
                            },
                            {
                                label: 'Member Temp-Ban',
                                description: 'Activated when a member is temporarily banned from the server.',
                                value: 'memberTempBan',
                            },
                            {
                                label: 'Member Unban',
                                description: 'Activated when a member is unbanned.',
                                value: 'memberUnban',
                            },
                            {
                                label: 'Member Warn',
                                description: 'Activated when a member is warned.',
                                value: 'memberWarn',
                            },
                            {
                                label: 'Member Muted',
                                description: 'Activated when a member is muted.',
                                value: 'memberMute',
                            },
                            {
                                label: 'Member Unmuted',
                                description: 'Activated when a member is unmuted.',
                                value: 'memberUnmuted',
                            },
                        ]),
                );
            const newMessageActionRow2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(4)
                        .setLabel('Disable')
                        .setCustomId('role_delete_disable_button')
                        .setDisabled(guild_log_settings.get('role_delete') === false),
                    new ButtonBuilder()
                        .setStyle(3)
                        .setLabel('Enable')
                        .setCustomId('role_delete_enable_button')
                    .setDisabled(guild_log_settings.get('role_delete') === true),
                    new ButtonBuilder()
                        .setStyle(2)
                        .setLabel('Exit')
                        .setCustomId('exit_settings_button'),
                    new ButtonBuilder()
                        .setStyle(1)
                        .setLabel('Back')
                        .setCustomId('log_settings_back_button'),
                );
            interaction.update({ embeds: [updatedEmbed], components: [newMessageActionRow1, newMessageActionRow2] })
        } else if (interaction.values[0] === 'roleUpdate') {
            const messageEmbed = interaction.message.embeds[0]
            const updatedEmbed = new EmbedBuilder()
                .setTitle(`Role Update`)
                .setDescription('Emitted whenever a role is updated/edited.\n\`TIP:\` *Members who are blacklisted will be ignored by the bot\'s logging.*')
            const newMessageActionRow1 = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('log_settings_options')
                        .setPlaceholder(`Log Options for ${interaction.guild.name}`)
                        .addOptions([
                            {
                                label: 'Role Create',
                                description: 'Activated when a new role is created.',
                                value: 'roleCreate'
                            },
                            {
                                label: 'Role Update',
                                description: 'Activated when a role is updated.',
                                value: 'roleUpdate',
                                default: true
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
                            {
                                label: 'Member Ban',
                                description: 'Activated when a member is banned from the server.',
                                value: 'memberBan'
                            },
                            {
                                label: 'Member Kick',
                                description: 'Activated when a member is kicked from the server.',
                                value: 'memberKick'
                            },
                            {
                                label: 'Member Timeout',
                                description: 'Activated when a member is put in timeout.',
                                value: 'memberTimeout',
                            },
                            {
                                label: 'Member Nickname Update',
                                description: 'Activated when a member\'s nickname is changed/updated.',
                                value: 'memberNicknameUpdate',
                            },
                            {
                                label: 'Member Temp-Ban',
                                description: 'Activated when a member is temporarily banned from the server.',
                                value: 'memberTempBan',
                            },
                            {
                                label: 'Member Unban',
                                description: 'Activated when a member is unbanned.',
                                value: 'memberUnban',
                            },
                            {
                                label: 'Member Warn',
                                description: 'Activated when a member is warned.',
                                value: 'memberWarn',
                            },
                            {
                                label: 'Member Muted',
                                description: 'Activated when a member is muted.',
                                value: 'memberMute',
                            },
                            {
                                label: 'Member Unmuted',
                                description: 'Activated when a member is unmuted.',
                                value: 'memberUnmuted',
                            },
                        ]),
                );
            const newMessageActionRow2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(4)
                        .setLabel('Disable')
                        .setDisabled(guild_log_settings.get('role_update') === false)
                        .setCustomId('role_update_disable_button'),
                    new ButtonBuilder()
                        .setStyle(3)
                        .setLabel('Enable')
                        .setDisabled(guild_log_settings.get('role_update') === true)
                        .setCustomId('role_update_enable_button'),
                    new ButtonBuilder()
                        .setStyle(2)
                        .setLabel('Exit')
                        .setCustomId('exit_settings_button'),
                    new ButtonBuilder()
                        .setStyle(1)
                        .setLabel('Back')
                        .setCustomId('log_settings_back_button'),
                );
            interaction.update({ embeds: [updatedEmbed], components: [newMessageActionRow1, newMessageActionRow2] })
        } else if (interaction.values[0] === 'messageDelete') {
            const messageEmbed = interaction.message.embeds[0]
            const updatedEmbed = new EmbedBuilder()
                .setTitle(`Message Delete`)
                .setDescription('Emitted whenever a message is delete.\n\`TIP:\` *Members or channels that are blacklisted will be ignored by the bot\'s logging.*')
            const newMessageActionRow1 = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
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
                                value: 'messageDelete',
                                default: true,
                            },
                            {
                                label: 'Message Update',
                                description: 'Activated when a message is updated/edited.',
                                value: 'messageUpdate'
                            },
                            {
                                label: 'Member Ban',
                                description: 'Activated when a member is banned from the server.',
                                value: 'memberBan'
                            },
                            {
                                label: 'Member Kick',
                                description: 'Activated when a member is kicked from the server.',
                                value: 'memberKick'
                            },
                            {
                                label: 'Member Timeout',
                                description: 'Activated when a member is put in timeout.',
                                value: 'memberTimeout',
                            },
                            {
                                label: 'Member Nickname Update',
                                description: 'Activated when a member\'s nickname is changed/updated.',
                                value: 'memberNicknameUpdate',
                            },
                            {
                                label: 'Member Temp-Ban',
                                description: 'Activated when a member is temporarily banned from the server.',
                                value: 'memberTempBan',
                            },
                            {
                                label: 'Member Unban',
                                description: 'Activated when a member is unbanned.',
                                value: 'memberUnban',
                            },
                            {
                                label: 'Member Warn',
                                description: 'Activated when a member is warned.',
                                value: 'memberWarn',
                            },
                            {
                                label: 'Member Muted',
                                description: 'Activated when a member is muted.',
                                value: 'memberMute',
                            },
                            {
                                label: 'Member Unmuted',
                                description: 'Activated when a member is unmuted.',
                                value: 'memberUnmuted',
                            },
                        ]),
                );
            const newMessageActionRow2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(4)
                        .setLabel('Disable')
                        .setDisabled(guild_log_settings.get('message_delete') === false)
                        .setCustomId('message_delete_disable_button'),
                    new ButtonBuilder()
                        .setStyle(3)
                        .setLabel('Enable')
                        .setDisabled(guild_log_settings.get('message_delete') === true)
                        .setCustomId('message_delete_enable_button'),
                    new ButtonBuilder()
                        .setStyle(2)
                        .setLabel('Exit')
                        .setCustomId('exit_settings_button'),
                    new ButtonBuilder()
                        .setStyle(1)
                        .setLabel('Back')
                        .setCustomId('log_settings_back_button'),
                );
            interaction.update({ embeds: [updatedEmbed], components: [newMessageActionRow1, newMessageActionRow2] })
        } else if (interaction.values[0] === 'messageUpdate') {
            const messageEmbed = interaction.message.embeds[0]
            const updatedEmbed = new EmbedBuilder()
                .setTitle(`Message Update`)
                .setDescription('Emitted whenever a message is updated/edited.\n\`TIP:\` *Members or channels that are blacklisted will be ignored by the bot\'s logging.*')
            const newMessageActionRow1 = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('log_settings_options')
                        .setPlaceholder(`Log Options for ${interaction.guild.name}`)
                        .addOptions([
                            {
                                label: 'Role Create',
                                description: 'Activated when a new role is created.',
                                value: 'roleCreate'
                            },
                            {
                                label: 'Role Update',
                                description: 'Activated when a role is updated.',
                                value: 'roleUpdate',
                            },
                            {
                                label: 'Role Delete',
                                description: 'Activated when a role is deleted.',
                                value: 'roleDelete',
                            },
                            {
                                label: 'Message Delete',
                                description: 'Activated when a message is deleted.',
                                value: 'messageDelete'
                            },
                            {
                                label: 'Message Update',
                                description: 'Activated when a message is updated/edited.',
                                value: 'messageUpdate',
                                default: true
                            },
                            {
                                label: 'Member Ban',
                                description: 'Activated when a member is banned from the server.',
                                value: 'memberBan'
                            },
                            {
                                label: 'Member Kick',
                                description: 'Activated when a member is kicked from the server.',
                                value: 'memberKick'
                            },
                            {
                                label: 'Member Timeout',
                                description: 'Activated when a member is put in timeout.',
                                value: 'memberTimeout',
                            },
                            {
                                label: 'Member Nickname Update',
                                description: 'Activated when a member\'s nickname is changed/updated.',
                                value: 'memberNicknameUpdate',
                            },
                            {
                                label: 'Member Temp-Ban',
                                description: 'Activated when a member is temporarily banned from the server.',
                                value: 'memberTempBan',
                            },
                            {
                                label: 'Member Unban',
                                description: 'Activated when a member is unbanned.',
                                value: 'memberUnban',
                            },
                            {
                                label: 'Member Warn',
                                description: 'Activated when a member is warned.',
                                value: 'memberWarn',
                            },
                            {
                                label: 'Member Muted',
                                description: 'Activated when a member is muted.',
                                value: 'memberMute',
                            },
                            {
                                label: 'Member Unmuted',
                                description: 'Activated when a member is unmuted.',
                                value: 'memberUnmuted',
                            },
                        ]),
                );
            const newMessageActionRow2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(4)
                        .setLabel('Disable')
                        .setDisabled(guild_log_settings.get('message_edit') === false)
                        .setCustomId('message_update_disable_button'),
                    new ButtonBuilder()
                        .setStyle(3)
                        .setLabel('Enable')
                        .setDisabled(guild_log_settings.get('message_edit') === true)
                        .setCustomId('message_update_enable_button'),
                    new ButtonBuilder()
                        .setStyle(2)
                        .setLabel('Exit')
                        .setCustomId('exit_settings_button'),
                    new ButtonBuilder()
                        .setStyle(1)
                        .setLabel('Back')
                        .setCustomId('log_settings_back_button'),
                );
            interaction.update({ embeds: [updatedEmbed], components: [newMessageActionRow1, newMessageActionRow2] })

        } else if (interaction.values[0] === 'memberBan') {
            const messageEmbed = interaction.message.embeds[0]
            const updatedEmbed = new EmbedBuilder()
                .setTitle(`Member Ban`)
                .setDescription('Emitted whenever a member is banned from the server.\n\`TIP:\` *Members or channels that are blacklisted will be ignored by the bot\'s logging.*')
            const newMessageActionRow1 = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('log_settings_options')
                        .setPlaceholder(`Log Options for ${interaction.guild.name}`)
                        .addOptions([
                            {
                                label: 'Role Create',
                                description: 'Activated when a new role is created.',
                                value: 'roleCreate'
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
                            {
                                label: 'Member Ban',
                                description: 'Activated when a member is banned from the server.',
                                value: 'memberBan',
                                default: true
                            },
                            {
                                label: 'Member Kick',
                                description: 'Activated when a member is kicked from the server.',
                                value: 'memberKick'
                            },
                            {
                                label: 'Member Timeout',
                                description: 'Activated when a member is put in timeout.',
                                value: 'memberTimeout',
                            },
                            {
                                label: 'Member Nickname Update',
                                description: 'Activated when a member\'s nickname is changed/updated.',
                                value: 'memberNicknameUpdate',
                            },
                            {
                                label: 'Member Temp-Ban',
                                description: 'Activated when a member is temporarily banned from the server.',
                                value: 'memberTempBan',
                            },
                            {
                                label: 'Member Unban',
                                description: 'Activated when a member is unbanned.',
                                value: 'memberUnban',
                            },
                            {
                                label: 'Member Warn',
                                description: 'Activated when a member is warned.',
                                value: 'memberWarn',
                            },
                            {
                                label: 'Member Muted',
                                description: 'Activated when a member is muted.',
                                value: 'memberMute',
                            },
                            {
                                label: 'Member Unmuted',
                                description: 'Activated when a member is unmuted.',
                                value: 'memberUnmuted',
                            },
                        ]),
                );
            const newMessageActionRow2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(4)
                        .setLabel('Disable')
                        .setDisabled(guild_log_settings.get('member_ban') === false)
                        .setCustomId('member_ban_disable_button'),
                    new ButtonBuilder()
                        .setStyle(3)
                        .setLabel('Enable')
                        .setDisabled(guild_log_settings.get('member_ban') === true)
                        .setCustomId('member_ban_enable_button'),
                    new ButtonBuilder()
                        .setStyle(2)
                        .setLabel('Exit')
                        .setCustomId('exit_settings_button'),
                    new ButtonBuilder()
                        .setStyle(1)
                        .setLabel('Back')
                        .setCustomId('log_settings_back_button'),
                );
            interaction.update({ embeds: [updatedEmbed], components: [newMessageActionRow1, newMessageActionRow2] })

        }
    }
}