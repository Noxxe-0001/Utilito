const { MessageEmbed, MessageActionRow, MessageButton, EmbedBuilder, ButtonBuilder, SelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { sequelize, log_settings } = require('../../../bot')
const Sequelize = require('sequelize');
module.exports = {
    name: 'exit_settings_button',
    run: async (client, interaction, container) => {
        try {
            const embed = interaction.message.embeds[0]
            interaction.update({ embeds: [embed], components: []});
        }
        catch (err) {
            console.log(err);
        }
    }
}