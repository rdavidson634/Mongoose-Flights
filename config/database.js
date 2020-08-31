const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/flights',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


//shortcut to mongoose connection object
const db = mongoose.connection;

db.on('connected', function () {
    console.log(`connected to mongodb at ${db.host}:${db.port} `)
});