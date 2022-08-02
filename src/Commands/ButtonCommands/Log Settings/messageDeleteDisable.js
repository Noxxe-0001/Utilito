const { MessageEmbed, MessageActionRow, MessageButton, EmbedBuilder, ButtonBuilder, SelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { sequelize, log_settings } = require('../../../../bot')
const Sequelize = require('sequelize');
module.exports = {
    name : 'message_delete_disable_button',
    run: async (client, interaction, container) => {
        const messageActionRow = ActionRowBuilder.from(interaction.message.components[1])
        const messageActionRow1 = ActionRowBuilder.from(interaction.message.components[0])
        const enableButton = ButtonBuilder.from(messageActionRow.components[1])
        const disableButton = ButtonBuilder.from(messageActionRow.components[0])
        const messageEmbed = interaction.message.embeds[0]
        const newMessageActionRow = ActionRowBuilder.from(interaction.message.components[1])
        newMessageActionRow.components[0].setDisabled(true)
        newMessageActionRow.components[1].setDisabled(false)
        const affectedRows = await log_settings.update({ message_delete: false }, { where: { guild_id: interaction.guild.id } })
        interaction.update({ components: [messageActionRow1, newMessageActionRow] });
    }
}