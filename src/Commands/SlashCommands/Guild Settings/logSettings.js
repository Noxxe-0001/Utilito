// import all the required modules
const { EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextChannel, ButtonBuilder, embedLength } = require('discord.js');
const { sequelize, log_settings } = require('../../../../bot');
const Sequelize = require('sequelize');
module.exports = {
	// The options and information for the current command
	name: 'logsettings',
	description: 'View the current log settings configured for this guild.',
	run: async (client, interaction, container) => {
		await interaction.deferReply();
		try {
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
			const logSettings = function(log_option) {
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
				return emoji;
			};
			const guildSettingsActionRow = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('edit_guild_log_options')
						.setLabel('Toggle Settings')
						.setStyle(1),
					new ButtonBuilder()
						.setCustomId('exit_settings_button')
						.setLabel('Exit')
						.setStyle(2),
				);
			const guildSettingsEmbed = new EmbedBuilder()
				.setTitle(`Mod Log Settings [${interaction.guild.name}]`)
				.setColor('#303136')
				.setDescription(`Here are the moderation log settings!\nAll Moderation logs can be configured here!\n${getEmoji('994925406505410600', 'icons_dgreen')} = Enabled\n${getEmoji('994925406505410600', 'icons_dred')} = Disabled\n${getEmoji('994925406505410600', 'icons_dyellow')} = Not Set`)
				.addFields(
					{ name: 'Configured Channels', value: `Log Channel: ${logSettings('log_channel')}`, inline: true },
					{
						name: 'Log Modules', value: `
                        ${getEmoji('994928084534956062', 'icons_createrole')} Role Create: ${logSettings('role_create')}
                        ${getEmoji('994928084534956062', 'icons_updaterole')} Role Update: ${logSettings('role_update')}
                        ${getEmoji('994928084534956062', 'icons_deleterole')} Role Delete: ${logSettings('role_delete')}
                        ${getEmoji('994928084534956062', 'icons_deletethread')} Message Delete: ${logSettings('message_delete')}
                        ${getEmoji('994928084534956062', 'icons_updatethread')} Message Update: ${logSettings('message_edit')}
                        ${getEmoji('994928084534956062', 'icons_banmembers')} Member Kick: ${logSettings('member_kick')}
						${getEmoji('951796448285048852', 'cloud_ban')} Member Ban: ${logSettings('member_ban')}`, inline: true,
					},
				);
			if (guild_log_settings.get('log_channel') === null) {
				guildSettingsEmbed.setFooter({ text: 'Logging is disabled as a log channel has not been set.' });
			}
			await interaction.editReply({ embeds: [guildSettingsEmbed], components: [guildSettingsActionRow] });
		}
		catch (err) {
			console.log(err)
		}
	},
};
