module.exports = {
    name : 'evalbtn',
    returnNoErrors: false,
    ownerOnly: true,
    run : async(client, interaction, container) => {
        interaction.message.delete()
    }
}