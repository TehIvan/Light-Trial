const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Command } = require("foundation-ivan");
const Balance = require('../util/balance')
const { color } = require(process.cwd() + "/data/config.json");

module.exports = class BuyCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("buy")
            .setDescription("Simulate purchases")
            .addNumberOption(i => i.setRequired(true).setName("amount").setDescription("Amount to buy"))
            .toJSON()
        )
    }

    async execute() {
        try {
            const balance = await new Balance(this.member.id).fetch();
            const amount = this.interaction.options.getNumber("amount", true);

            if (balance.amount < amount) {
                return this.interaction.reply({
                    ephemeral: true,
                    content: "You do not have enough money for this purchase!"
                })
            }

            await balance.decrement(amount);

            this.interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(color)
                    .setTitle("Bought!")
                    .setDescription(`You have $${balance.amount} remaining.`)
                ]
            });
        } catch (error) {
            this.interaction.reply({
                ephemeral: true,
                content: `An error occured while processing this command`
            })
            console.log(error);
        }
    }
}