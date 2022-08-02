const { MessageEmbed, MessageActionRow, MessageButton, EmbedBuilder, ButtonBuilder, SelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { sequelize, log_settings } = require('../../../../bot');
const Sequelize = require('sequelize');
module.exports = {
	name: 'edit_guild_log_options',
	run: async (client, interaction, container) => {
		function getEmoji(server_id, emoji_name) {
			let emoji = '';
			emoji = client.guilds.cache.get(server_id).emojis.cache.find(emoji => emoji.name === emoji_name);
			return emoji;
		}
		const guild_log_settings = await log_settings.findOne({
			where: {
				guild_id: interaction.guild.id,
			},
		});
		const logSettings = function (log_option) {
			let emoji = '';
			if (log_option === 'log_channel') {
				if (guild_log_settings.get('log_channel') === null) {
					emoji = getEmoji('994925406505410600', 'icons_dyellow');
				}
				else {
					emoji = `<#${guild_log_settings.get('log_channel')}>`;
				}
			}
			else if (guild_log_settings.get(log_option) === true) {
				emoji = getEmoji('994925406505410600', 'icons_dgreen');
			}
			else if (guild_log_settings.get(log_option) == false) {
				emoji = getEmoji('994925406505410600', 'icons_dred');
			}
			else if (log_option === 'blacklisted_roles' || log_option === 'blacklisted_channels') {
				if (guild_log_settings.get(log_option) === null) {
					emoji = `${getEmoji('951796448285048852', 'cloud_hypen')} **N/A**`;
				}
				else if (log_option === 'blacklisted_roles') {
					const roles = guild_log_settings.get('blacklisted_roles');
					const arr = roles.split(',');
					const arrSorted = arr.map(x => '<@&' + x + '>');
					emoji = arrSorted;
				}
				else if (log_option === 'blacklisted_channels') {
					const channels = guild_log_settings.get('blacklisted_channels');
					const arr = channels.split(',');
					const arrSorted = arr.map(i => '<#' + i + '>').join('\n');
					emoji = arrSorted;
				}
			}
			return emoji;
		};
		const messageEmbed = interaction.message.embeds[0];
		const updatedEmbed = new container.Discord.EmbedBuilder()
			.setTitle('Role Create')
			.setDescription('Emitted whenever a new role is created.\n\`TIP:\`*Members who are blacklisted will be ignored by the bot\'s logging.*');
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
							value: 'roleDelete',
						},
						{
							label: 'Message Delete',
							description: 'Activated when a message is deleted.',
							value: 'messageDelete',
						},
						{
							label: 'Message Update',
							description: 'Activated when a message is updated/edited.',
							value: 'messageUpdate',
						},
						{
							label: 'Member Ban',
							description: 'Activated when a member is banned from the server.',
							value: 'memberBan',
						},
						{
							label: 'Member Kick',
							description: 'Activated when a member is kicked from the server.',
							value: 'memberKick',
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
					.setCustomId('role_create_disable_button'),
				new ButtonBuilder()
					.setStyle(3)
					.setLabel('Enable')
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
		if (guild_log_settings.get('role_create') === true) {
			newMessageActionRow2.components[1].setDisabled(true);
		}
		else if (guild_log_settings.get('role_create') === false) {
			newMessageActionRow2.components[0].setDisabled(true);
		}
		interaction.update({ embeds: [updatedEmbed], components: [newMessageActionRow1, newMessageActionRow2] });
		module.exports = {};
	},
};