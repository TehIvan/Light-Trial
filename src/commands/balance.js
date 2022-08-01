const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Command } = require("foundation-ivan");
const Balance = require("../util/balance");
const { color } = require(process.cwd() + "/data/config.json");

module.exports = class BalanceCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("balance")
            .setDescription("View a user's balance")
            .toJSON()
        )
    }

    async execute() {
        try {
            const balance = await new Balance(this.member.id).fetch();
            
            this.interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(color)
                    .setTitle(`Your Balance`)
                    .setDescription(`$${balance.amount || 0}`)
                ]
            })
        } catch (error) {
            this.interaction.reply({
                ephemeral: true,
                content: `An error occured while processing this command`
            })
            console.log(error);
        }
    }
}