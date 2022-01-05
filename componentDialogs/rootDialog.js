const { WaterfallDialog, ComponentDialog, DialogSet, DialogTurnStatus } = require('botbuilder-dialogs');
const { TicketBookDialog } = require('./ticketBookDialog');
// const { TicketCancelDialog } = require('./ticketCancelDialog');
const { rootDialog, ticketBookDialog, ticketCancelDialog } = require('../constant/dialogConstant');
const root = 'root';

class RootDialog extends ComponentDialog {
    constructor(conversationState) {
        super(rootDialog);

        if (!conversationState) throw new Error('Conversation State is not found');
        this.conversationState = conversationState;
        this.addDialog(new WaterfallDialog(root, [
            this.flow.bind(this)
        ]));

        this.addDialog(new TicketBookDialog(conversationState));
        this.initialDialogId = root;
    }

    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);
        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    async flow(step) {
        const userReply = step.context.activity.text.toLowerCase();
        switch (userReply) {
        case 'book ticket':
            console.log('ticket book');
            return await step.beginDialog(ticketBookDialog);
            break;
        case 'cancel ticket':
            return await step.beginDialog(ticketCancelDialog);
            break;
        default:
            await step.context.sendActivity('error');
            break;
        }
        return await step.endDialog();
    }
}
module.exports.RootDialog = RootDialog;
