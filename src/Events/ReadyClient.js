const chalk = require('chalk');
const Table = require('cli-table3');
const Sequelize = require('sequelize');
module.exports = {
	name: 'ready',
	once: true,
	run: async (client) => {
		const table = new Table({
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
				'middle': '║',
			},
			colWidths: [20, 30],
			style: { border: [], head: [] },
		});
		table.push(
			[{ content: 'CLIENT INFORMATION', hAlign: 'center', colSpan: 2 }],
			['CLIENT TAG', `${client.user.tag}`],
			['GUILD COUNT', `${client.guilds.cache.size}`],
			['USER COUNT', `${client.users.cache.size}`],
			['NODE.JS VERSION', `${process.version}`],
		);
		console.log(chalk.greenBright(table.toString()));
		const table1 = new Table({
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
				'middle': '║',
			},
			colWidths: [20, 30],
			style: { border: [], head: [] },
		});
		table1.push(
			[{ content: 'COMMAND INFORMATION', hAlign: 'center', colSpan: 2 }],
			['MESSAGE COMMANDS', `${client.commands.messageCommands.size}`],
			['MESSAGE COMMAND ALIASES', `${client.commands.messageCommands.aliases.size}`],
			['SLASH COMMANDS', `${client.commands.slashCommands.size}`],
			['SELECT MENUS', `${client.commands.selectMenus.size}`],
			['CONTEXT MENUS', `${client.commands.contextMenus.size}`],
			['BUTTON COMMANDS', `${client.commands.buttonCommands.size}`],
			['EVENTS', `${client.events.size}`],
		);
		console.log(chalk.greenBright(table1.toString()));
	},
};