const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const auth = require('./routes/auth');
const books = require('./routes/books');
const lists = require('./routes/lists');

const app = express();
const PORT = process.env.PORT || 5001;

mongoose.connect('mongodb://localhost:27017/mybrary-test1', { useNewUrlParser: true }, (err, db) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MongoDb...");
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use('/api/auth', auth);
app.use('/api/books', books);
app.use('/api/lists', lists);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}...`)
});