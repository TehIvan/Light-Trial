const { Event, App } = require("foundation-ivan");
const { PrismaClient } = require("@prisma/client")

module.exports = class Ready extends Event {

    constructor() {
        super("ready")
    }

    /**
     * @param {App} app 
     */
    async execute(app) {
        const client = new PrismaClient();
        client.$connect();
        console.log(`Bot => Ready: ${app.client.user.tag}`)
    }
}