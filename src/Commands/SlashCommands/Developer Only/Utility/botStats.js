const { EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextChannel, ButtonBuilder } = require('discord.js');
const { errorLogger } = require('../../../../../logger')
const package = require('../../../../../package.json')
module.exports = {
	name: "botstats",
	description: "View developer information and status for the bot",
	run: async (client, interaction, container) => {
		try {
			interaction.reply({ content: `${package.dependencies['discord.js']}`})
		}
		catch (error) {
			errorLogger(error)
		}
	}
}