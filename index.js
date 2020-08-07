const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  })
        .then(() => console.log('MongoDB connected.'))
        .catch((err) => console.log(`MongoDB connection failed: ${err}.`));

app.get('/', (req, res) => {
    res.send('hello world!');
});

app.listen(5000);
