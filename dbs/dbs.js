const mongoose = require('mongoose');
const uri = '';
mongoose.connect(uri, {
    // userCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection sucessful..');
}).catch((e) => {
    console.log('no connection');
});
