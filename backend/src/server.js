const express =  require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://tindev:tindev@clustereder-0gbps.mongodb.net/tindev?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(function () {
    console.log("Connected to DB");
}).catch(function (err) {
    console.log("ERROR : " + err.message);
});

server.use(express.json());
server.use(routes);

server.listen(3333);
