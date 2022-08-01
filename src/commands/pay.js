const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Command } = require("foundation-ivan");
const Balance = require("../util/balance");
const { color } = require(process.cwd() + "/data/config.json");

module.exports = class PayCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("pay")
            .setDescription("Pay someone!")
            .addUserOption(i => i.setRequired(true).setName("user").setDescription("The user"))
            .addNumberOption(i => i.setRequired(true).setName("amount").setDescription("The amount"))
            .toJSON()
        )
    }

    async execute() {
        try {
            const user = this.interaction.options.getUser("user", true);
            const amount = this.interaction.options.getNumber("amount", true);

            const sender = await new Balance(this.member.id).fetch();
            const receiver = await new Balance(user.id).fetch();

            if (sender.amount < amount) {
                return this.interaction.reply({
                    ephemeral: true,
                    content: `You do not have enough funds to complete this transaction.`
                })
            }

            await sender.decrement(amount);
            await receiver.increment(amount);

            this.interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder().setColor(color)
                    .setTitle("Transaction Successful")
                    .setDescription(`Transferred $${amount} to ${user.username}'s account.`)
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