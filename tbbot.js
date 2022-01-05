const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');
const welcomeCard = require('./resources/adaptiveCards/welcomeCard.json');
const cards = [welcomeCard];

class TBBOT extends ActivityHandler {
    constructor(conversationState, rootDialog) {
        super();
        if (!conversationState) throw new Error('ConversationState is not defined.');
        this.conversationState = conversationState;
        this.rootDialog = rootDialog;
        this.accessor = this.conversationState.createProperty('DialogAccessor');
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            // Iterate for check user id not equal to bot id.
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity({
                        attachments: [CardFactory.adaptiveCard(cards[0])]
                    });
                    await this.sendSuggestedActions(context);
                }
            }
            await next();
        });

        this.onMessage(async (context, next) => {
            await this.rootDialog.run(context, this.accessor);
            await next();
        });
    }

    async sendSuggestedActions(context) {
        var reply = MessageFactory.suggestedActions(['Book Ticket', 'Cancel Ticket'], 'What would you like to do?');
        await context.sendActivity(reply);
    }

    async run(context) {
        await super.run(context);
        await this.conversationState.saveChanges(context, false);
    };
}

module.exports.TBBOT = TBBOT;
