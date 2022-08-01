const { Client, GatewayIntentBits } = require("discord.js");
const { App } = require('foundation-ivan');
const { token, guildId } = require(process.cwd() + "/data/config.json");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]
});

new App({
    client, token, 
    eventPath: process.cwd() + "/src/events",
    cmdPath: process.cwd() + '/src/commands',
    guilds: [guildId]
})