const { MessageEmbed, MessageActionRow, MessageButton, EmbedBuilder, ButtonBuilder, SelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { sequelize, log_settings } = require('../../../../bot');
const Sequelize = require('sequelize');
const { errorLogger } = require('../../../../logger')
module.exports = {
    name: 'close_ticket_button',
    run: async (client, interaction, container) => {
        try {
            const channel = interaction.channel.id
            // Delete Channel
            await interaction.guild.channels.cache.get(channel).delete
        }
        catch (error) {
            errorLogger(error)
        }
    },
};