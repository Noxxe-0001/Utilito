// import all the required modules
const { MessageEmbed, MessageActionRow, Modal, TextInputComponent, TextChannel, EmbedBuilder, ActionRow, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { sequelize, log_settings } = require('../../../../bot')
const Sequelize = require('sequelize');
const { errorLogger } = require('../../../../logger')
module.exports = {
    // The options and information for the current command
    name: "serverinfo",
    description: "Get information about the current server",
    run: async (client, interaction, container) => {
        try {

            await interaction.deferReply()
            const guildOwner = await interaction.guild.fetchOwner()
            const embed = new EmbedBuilder()
                .setTitle(`${interaction.guild.name} Server Information`)
                .setDescription(`**ID:** ${interaction.guild.id}\n**Owner ID:** ${guildOwner.user.tag}`)
                .addFields(
                    {
                        name: `Users [${interaction.guild.members.cache.size}] [${interaction.guild.members.cache.filter(m => m.user.bot).size} Bots]`,
                        value: `Online: ${interaction.guild.members.cache.filter(m => m.presence).filter(m => m.presence.status === 'online').size}\nIdle: ${interaction.guild.members.cache.filter(m => m.presence).filter(m => m.presence.status === 'idle').size}\nDnD: ${interaction.guild.members.cache.filter(m => m.presence).filter(m => m.presence.status === 'dnd').size}\nOffline: ${interaction.guild.members.cache.filter(m => !m.presence).size}`
                    }
                )
            
            await interaction.editReply({ embeds: [embed]})
            }
        catch (err) {
            errorLogger(err);
        }
    }
}