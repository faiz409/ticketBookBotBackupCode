const { WaterfallDialog, ComponentDialog } = require('botbuilder-dialogs');
const { ConfirmPrompt, ChoicePrompt, TextPrompt, ChoiceFactory } = require('botbuilder-dialogs');
const { getid, deleteid } = require('../api/api');
const { ticketBookDialog, ticketCancelDialog } = require('../constant/dialogconstant');

const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const TEXT_PROMPT = 'TEXT_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class TicketCancelDialog extends ComponentDialog {
    constructor(conversationState) {
        super(ticketCancelDialog);
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new TextPrompt(TEXT_PROMPT));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [

            this.enterId.bind(this),
            this.sure.bind(this),
            this.summary.bind(this),
            this.repeat.bind(this)

        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async enterId(step) {
        return await step.prompt(TEXT_PROMPT, 'Enter the ticket id which you want to cancel');
    }

    async sure(step) {
        step.values.id = step.result;
        const data = await getid(step);
        if (data == null) {
            await step.context.sendActivity('Ticket data not found');
            return await step.replaceDialog(ticketCancelDialog);
        } else if (data.errors) {
            await step.context.sendActivity('Please fill the correct ticket ID');
            return await step.replaceDialog(ticketCancelDialog);
        } else {
            return await step.prompt(CONFIRM_PROMPT, 'Are you sure ?', ['yes', 'no']);
        }
    }

    async summary(step) {
        if (step.result === true) {
            await deleteid(step);
            await step.context.sendActivity(' Ticket  successfully cancel.');
            return await step.prompt(CHOICE_PROMPT, {
                prompt: 'What do you want to do',
                choices: ChoiceFactory.toChoices(['Book Ticket', 'Cancel Ticket'])
            });
        }

        if (step.result === false) {
            return await step.prompt(CHOICE_PROMPT, {
                prompt: 'What do you want to do',
                choices: ChoiceFactory.toChoices(['Book Ticket', 'Cancel Ticket'])
            });
        }
    }

    async repeat(step) {
        step.values.choice = step.result;
        if (step.result.value === 'Book Ticket') {
            return await step.beginDialog(ticketBookDialog);
        } else if (step.result.value === 'Cancel Ticket') {
            return await step.beginDialog(ticketCancelDialog);
        }
        return await step.endDialog();
    }
}

module.exports.TicketCancelDialog = TicketCancelDialog;
