// import all the required modules
const { MessageEmbed, MessageActionRow, Modal, TextInputComponent, TextChannel, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { sequelize, log_settings, ticket_configuration } = require('../../../../bot')
const Sequelize = require('sequelize');
const { errorLogger } = require('../../../../logger')
module.exports = {
    // The options and information for the current command
    name: "ticket",
    description: "Get information about the current server",
    options:
        [
            {
                name: `settings`,
                description: `View the current configured ticket settings for this server.`,
                type: "1"
            },
            {
                name: `disable`,
                description: `Disable the ticket system module for this server.`,
                type: "1"
            },
            {
                name: `enable`,
                description: `Enable the ticket system if it has been disabled.`,
                type: "1"
            }
        ],
    run: async (client, interaction, container) => {
        try {
            const guild_ticket_configuration = await ticket_configuration.findOne(
                {
                    where: {
                        guild_id: interaction.guild.id
                    }
                }
            )
            await interaction.deferReply();
            if (interaction.options.getSubcommand() === 'settings') {
                const welcome_message = guild_ticket_configuration.get('welcome_message')
                await interaction.editReply(`${welcome_message}`)
            } else if (interaction.options.getSubcommand() === 'disable') {
                await interaction.editReply('You chose to disable the ticket system module for this server.')
            } else if (interaction.options.getSubcommand() === 'enable') {
                await interaction.editReply('You chose to enable the ticket system module for the current server')
            }
        }
        catch (err) {
            errorLogger(err);
        }
    }
}
