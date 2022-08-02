const chalk = require("chalk")
const Table = require("cli-table3")
module.exports = {
    name: "errorManager",
    customEvent: true,
    run: async (client) => {
        process.on('unhandledRejection', error => {
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
                [{ colSpan: 2, hAlign: 'center', content: `NEW ERROR` }],
                [`ERROR NAME`, `${error.name}`],
                [{ colSpan: 2, hAlign: 'center', content: `ERROR` }],
                [{ colSpan: 2, content: `${error.message}` }],
                [{ colSpan: 2, hAlign: 'center', content: `ERROR STACK` }],
                [{ colSpan: 2, content: `${error.stack}`}]
            )
            console.log(chalk.redBright(table.toString()));
        })
        process.on('uncaughtException', error => {
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
                [{ colSpan: 2, hAlign: 'center', content: `NEW ERROR` }],
                [`ERROR NAME`, `${error.name}`],
                [{ colSpan: 2, hAlign: 'center', content: `ERROR` }],
                [{ colSpan: 2, content: `${error.message}` }],
                [{ colSpan: 2, hAlign: 'center', content: `ERROR STACK` }],
                [{ colSpan: 2, content: `${error.stack}`}]
            )
            console.log(chalk.redBright(table.toString()));
        })
    }
}