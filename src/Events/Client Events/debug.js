const { sequelize, log_settings, guild_config } = require('../../../bot')
const Sequelize = require('sequelize');
const { WebhookClient } = require('discord.js');
const Table = require('cli-table3');
const chalk = require('chalk')
module.exports = {
    name: "debug",
    run: async (info, client, container) => {
        var table = new Table({
            chars: {
                'top': '═',
                'top-mid': '╦',
                'top-left': '╔',
                'top-right': '╗',
                'bottom': '═',
                'bottom-mid': '╩',
                'bottom-left': '╚',
                'bottom-right': '╝',
                'left': '║',
                'left-mid': '╠',
                'mid': '═',
                'mid-mid': '╬',
                'right': '║',
                'right-mid': '╣',
                'middle': '║'
            },
            colWidths: [25, 25],
            style: { border: [], head: [] },
            wordWrap: true,
            wrapOnWordBoundary: false,
        });
        table.push(
            [{ colSpan: 2, content: `${info}` }],
        )
        console.log(chalk.cyanBright(table.toString()));
    }
}