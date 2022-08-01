const { PrismaClient } = require("@prisma/client");

module.exports = class Balance {

    /** 
     * @param {string} userId 
     */
    constructor(userId) {
        this.userId = userId;
        this.db = new PrismaClient();
    }

    async fetch() {
        const user = await this.db.balance.findFirst({
            where: { userId: this.userId }
        })

        if (!user) {
            const newRec = await this.db.balance.create({
                data: {
                    userId: this.userId,
                    amount: 0
                }
            });
            this.dbRef = newRec;
            return this;
        } else {
            this.dbRef = user;
            return this;
        }
    }

    get amount() {
        return this.dbRef.amount;
    }

    async increment(amount) {
        this.dbRef = await this.db.balance.update({
            where: {
                id: this.dbRef.id
            },
            data: {
                amount: this.amount + amount
            }
        });
        return true;
    }

    async decrement(amount) {
        this.dbRef = await this.db.balance.update({
            where: {
                id: this.dbRef.id
            },
            data: {
                amount: this.amount - amount
            }
        });
        return true;
    }
}