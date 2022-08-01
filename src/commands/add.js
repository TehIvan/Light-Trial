const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Command } = require("foundation-ivan");
const Balance = require("../util/balance");
const { color } = require(process.cwd() + "/data/config.json");

module.exports = class AddCommand extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("add")
            .setDescription("[DEV ONLY]Add a specific amount to a user's balance")
            .addUserOption(i => i.setName("user").setRequired(true).setDescription("The user"))
            .addNumberOption(i => i.setName("amount").setRequired(true).setDescription("The amount"))
            .toJSON()
        )
    }

    async execute() {
        try {
            const amount = this.interaction.options.getNumber("amount", true);
            const user = this.interaction.options.getUser("user", true);
            const balance = await new Balance(user.id).fetch();
            
            await balance.increment(amount);
            this.interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(color).setTitle("Amount Added")
                    .setDescription(`New balance is ${balance.amount}`)
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