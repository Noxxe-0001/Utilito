// import all the required modules
const { MessageEmbed, MessageActionRow, Modal, TextInputComponent, TextChannel, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { sequelize, log_settings } = require('../../../../bot')
const Sequelize = require('sequelize');
const { errorLogger } = require('../../../../logger')
module.exports = {
    // The options and information for the current command
    name: "createpanel",
    description: "Get information about the current server",
    run: async (client, interaction, container) => {
        try {
            const embed = new EmbedBuilder()
                .setTitle('Create a new Ticket here!')
                .setDescription('Click the button below to create a ticket.')
            const createTicketButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('create_ticket_button')
                        .setLabel('Create Ticket')
                        .setStyle(1),
            );
            await interaction.reply({ embeds: [embed], components: [createTicketButton]})
        }
        catch (err) {
            errorLogger(err);
        }
    }
}