const path = require('path');
const port = process.env.port || process.env.PORT || 3080;
const dotenv = require('dotenv');
const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

const express = require('express');
const Ticket = require('./router/ticketrouter');
require('./dbs/dbs');
const { RootDialog } = require('./componentDialogs/rootDialog');
const { BotFrameworkAdapter, MemoryStorage, ConversationState } = require('botbuilder');

// This bot's main dialog.
const { TBBOT } = require('./tbbot');
const server = express();
server.listen(port, () => {
    console.log(`\nlistening to ${ port }`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Catch-all for errors.
// Set the onTurnError for the singleton BotFrameworkAdapter.
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${ error }`);
    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const rootDialog = new RootDialog(conversationState);
const tbbot = new TBBOT(conversationState, rootDialog);

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route
        await tbbot.run(context);
    });
});

server.use(express.json());
server.use('/ticket', Ticket);
