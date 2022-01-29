const mongoose = require('mongoose');
const uri = 'mongodb+srv://FZ-faiz:faizrepo409@cluster0.vihvd.mongodb.net/ticketDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {
    // userCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection sucessful..');
}).catch((e) => {
    console.log('no connection');
});
