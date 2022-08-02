const { MessageEmbed, MessageActionRow, MessageButton, EmbedBuilder, ButtonBuilder, SelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { sequelize, log_settings } = require('../../../../bot');
const Sequelize = require('sequelize');
module.exports = {
    name: 'create_ticket_button',
    run: async (client, interaction, container) => {
        const ticketChannel = await interaction.guild.channels.create({
            name: `ticket-0839`,
            type: 0,
            topic: `This is a ticket for ${interaction.user.id}`,
            reason: `User opened a new ticket!`,
            parent: "950298796296900618"
        })
        const ticketCreatedEmbed = new EmbedBuilder()
            .setTitle('Ticket Created!')
            .setDescription(`Your ticket has been created! <#${ticketChannel.id}>`)
        await interaction.reply({ embeds: [ticketCreatedEmbed] })
        const embedInsideTicket = new EmbedBuilder()
            .setTitle('Here is your ticket')
            .setDescription('Please be patient and wait for a member of staff to assist you.')
        const actionRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('close_ticket_button')
                .setLabel('Close Ticket')
                .setStyle(1),
        );
        await interaction.guild.channels.cache.get(ticketChannel.id).send({ embeds: [embedInsideTicket], components: [actionRow]})
    },
};