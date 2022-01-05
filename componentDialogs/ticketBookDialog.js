const { WaterfallDialog, ComponentDialog, Dialog } = require('botbuilder-dialogs');
const { ConfirmPrompt, ChoicePrompt, DateTimePrompt, NumberPrompt, TextPrompt, ChoiceFactory } = require('botbuilder-dialogs');
const { AttachmentLayoutTypes, CardFactory } = require('botbuilder');
const { ticketBookDialog } = require('../constant/dialogConstant');
const amberFortCard = require('../resources/adaptiveCards/carouselCards/amberFortCard.json');
const albertHallCard = require('../resources/adaptiveCards/carouselCards/albertHallCard.json');
const cityPalaceCard = require('../resources/adaptiveCards/carouselCards/cityPalaceCard.json');
const hawaMahalCard = require('../resources/adaptiveCards/carouselCards/hawaMahalCard.json');
const jantarMantarCard = require('../resources/adaptiveCards/carouselCards/jantarMantarCard.json');
const nahargarhFortCard = require('../resources/adaptiveCards/carouselCards/nahargarhFortCard.json');
const { finalDataCard2 } = require('../resources/adaptiveCards/finalDataCards/finalDataCard2');
const { finalDataCard3 } = require('../resources/adaptiveCards/finalDataCards/finalDataCard3');
const { finalDataCard4 } = require('../resources/adaptiveCards/finalDataCards/finalDataCard4');
const { finalDataCard5 } = require('../resources/adaptiveCards/finalDataCards/finalDataCard5');
const { finalDataCard6 } = require('../resources/adaptiveCards/finalDataCards/finalDataCard6');
const { finalDataCard7 } = require('../resources/adaptiveCards/finalDataCards/finalDataCard7');
const personCount = require('../resources/adaptiveCards/personCount.json');
const getDataCard = require('../resources/adaptiveCards/getDataCard.json');
const card = [getDataCard, personCount];

const CHOICE_PROMPT = 'CHOICE_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
const TEXT_PROMPT = 'TEXT_PROMPT';
const DATETIME_PROMPT = 'DATETIME_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class TicketBookDialog extends ComponentDialog {
    constructor(conversationState) {
        super('ticketBookDialog');
        this.addDialog(new TextPrompt(TEXT_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT));
        this.addDialog(new DateTimePrompt(DATETIME_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.firstStep.bind(this),
            this.getNameOfUser.bind(this),
            this.getNumberOfUser.bind(this),
            this.getMail.bind(this),
            this.getPlaceAndTimeOfVisit.bind(this),
            this.getNumberOfVisiters.bind(this),
            this.confirmStep.bind(this),
            this.summaryStep.bind(this),
            this.repeatStep.bind(this)
        ]));
        this.initialDialogId = WATERFALL_DIALOG;
    }

    createAdaptiveCard1() {
        return CardFactory.adaptiveCard(amberFortCard);
    }

    createAdaptiveCard2() {
        return CardFactory.adaptiveCard(albertHallCard);
    }

    createAdaptiveCard3() {
        return CardFactory.adaptiveCard(cityPalaceCard);
    }

    createAdaptiveCard4() {
        return CardFactory.adaptiveCard(hawaMahalCard);
    }

    createAdaptiveCard5() {
        return CardFactory.adaptiveCard(jantarMantarCard);
    }

    createAdaptiveCard6() {
        return CardFactory.adaptiveCard(nahargarhFortCard);
    }

    async firstStep(step) {
        return await step.prompt(CONFIRM_PROMPT, 'Are you sure, you want to book ticket?', ['Yes', 'No']);
    }

    async getNameOfUser(step) {
        if (step.result === true) {
            return await step.prompt(TEXT_PROMPT, 'What is your name?');
        }

        if (step.result === false) {
            await step.context.sendActivity('Please, try one more time');
            return this.endLoop(step);
        }
    }

    async getNumberOfUser(step) {
        step.values.userName = step.result;
        return await step.prompt(NUMBER_PROMPT, `Hi! ${ step.values.userName } , what is your mobile number?`);
    }

    async getMail(step) {
        step.values.mobile = step.result;
        return await step.prompt(TEXT_PROMPT, `${ step.values.userName } , what is your Email?`);
    }

    async getPlaceAndTimeOfVisit(step) {
        step.values.mail = step.result;
        // Show cards in carousel
        await step.context.sendActivity({
            attachments: [
                this.createAdaptiveCard1(),
                this.createAdaptiveCard2(),
                this.createAdaptiveCard3(),
                this.createAdaptiveCard4(),
                this.createAdaptiveCard5(),
                this.createAdaptiveCard6()
            ],
            attachmentLayout: AttachmentLayoutTypes.Carousel
        });

        // Show card for get place and time
        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(card[0])]
        });

        return Dialog.EndOfTurn;
    }

    async getNumberOfVisiters(step) {
        const placeAndTime = step.context.activity.value;

        // Convert object into array
        const dataOfPlaceAndTime = Object.entries(placeAndTime);
        step.values.data = dataOfPlaceAndTime;

        await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(card[1])]
        });
        return Dialog.EndOfTurn;
    }

    async confirmStep(step) {
        const entries = step.values.data;
        const personNumber = step.context.activity.value.personCount;
        // console.log(personNumber);

        const ticket = 100;
        const discount = 15;

        if (entries.length === 2) {
            var ticketForAmberFort = (ticket * personNumber);
            await step.context.sendActivity({
                text: 'You entered following information',
                attachments: [CardFactory.adaptiveCard(finalDataCard2(step.values.userName.toUpperCase(), step.values.mobile, step.values.mail, personNumber, ticketForAmberFort, entries[1][0], entries[1][1]))]
            });
        } else if (entries.length === 3) {
            var ticketForAlbertHall = (personNumber * ((ticket * 2) - (ticket * (2 * discount / 100))));
            await step.context.sendActivity({
                text: 'You entered following information',
                attachments: [CardFactory.adaptiveCard(finalDataCard3(step.values.userName.toUpperCase(), step.values.mobile, step.values.mail, personNumber, ticketForAlbertHall, entries[1][0], entries[1][1], entries[2][0], entries[2][1]))]
            });
        } else if (entries.length === 4) {
            var ticketForCityPalace = (personNumber * ((ticket * 3) - (ticket * (3 * discount / 100))));
            await step.context.sendActivity({
                text: 'You entered following information',
                attachments: [CardFactory.adaptiveCard(finalDataCard4(step.values.userName.toUpperCase(), step.values.mobile, step.values.mail, personNumber, ticketForCityPalace, entries[1][0], entries[1][1], entries[2][0], entries[2][1], entries[3][0], entries[3][1]))]
            });
        } else if (entries.length === 5) {
            var ticketForHawaMahal = (personNumber * ((ticket * 4) - (ticket * (4 * discount / 100))));
            await step.context.sendActivity({
                text: 'You entered following information',
                attachments: [CardFactory.adaptiveCard(finalDataCard5(step.values.userName.toUpperCase(), step.values.mobile, step.values.mail, personNumber, ticketForHawaMahal, entries[1][0], entries[1][1], entries[2][0], entries[2][1], entries[3][0], entries[3][1], entries[4][0], entries[4][1]))]
            });
        } else if (entries.length === 6) {
            var ticketForJantarMantar = (personNumber * ((ticket * 5) - (ticket * (5 * discount / 100))));
            await step.context.sendActivity({
                text: 'You entered following information',
                attachments: [CardFactory.adaptiveCard(finalDataCard6(step.values.userName.toUpperCase(), step.values.mobile, step.values.mail, personNumber, ticketForJantarMantar, entries[1][0], entries[1][1], entries[2][0], entries[2][1], entries[3][0], entries[3][1], entries[4][0], entries[4][1], entries[5][0], entries[5][1]))]
            });
        } else if (entries.length === 7) {
            var ticketForNahargarhFort = (personNumber * ((ticket * 6) - (ticket * (6 * discount / 100))));
            await step.context.sendActivity({
                text: 'You entered following information',
                attachments: [CardFactory.adaptiveCard(finalDataCard7(step.values.userName.toUpperCase(), step.values.mobile, step.values.mail, personNumber, ticketForNahargarhFort, entries[1][0], entries[1][1], entries[2][0], entries[2][1], entries[3][0], entries[3][1], entries[4][0], entries[4][1], entries[5][0], entries[5][1], entries[6][0], entries[6][1]))]
            });
        }

        return await step.prompt(CONFIRM_PROMPT, 'Are you sure that all details are correct?', ['Yes', 'No']);
    }

    async summaryStep(step) {
        if (step.result === true) {
            await step.context.sendActivity('Ticket book successfully...');
            return await step.prompt(CHOICE_PROMPT, {
                prompt: 'What do you want to do',
                choices: ChoiceFactory.toChoices(['Book Ticket', 'Cancel Ticket'])
            });
        }

        if (step.result === false) {
            await step.context.sendActivity('Please, try again and fill all information correctlly');
            return this.endLoop(step);
        }
    }

    async repeatStep(step) {
        step.values.choice = step.result;
        // console.log(step);
        if (step.result.value === 'Book Ticket') {
            return await step.beginDialog(ticketBookDialog);
        }
        return await step.endDialog();
    }

    async endLoop(step) {
        if (step.result === false) {
            console.log('hi');
            return await step.beginDialog(ticketBookDialog);
        }
    }
}

module.exports.TicketBookDialog = TicketBookDialog;
