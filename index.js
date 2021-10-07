const express = require('express');
const Datastore = require('nedb');
const app = express();

app.listen(3000, () => console.log("Listening at port 3000"));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/msg', (request,response) =>{
    console.log("I've got a request");
    console.log(request.body);
    const data = request.body;
    data.timestamp = Date();
    database.insert(data);
    response.json(data);
});