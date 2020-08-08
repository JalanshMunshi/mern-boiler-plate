const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const config = require('./config/key');

app.use(express.json());
app.use(cookieParser());

const uri = config.mongoURI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  })
        .then(() => console.log('MongoDB connected.'))
        .catch((err) => console.log(`MongoDB connection failed: ${err}.`));

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(() => res.status(200).json(`User '${req.body.firstname}' added!`))
    .catch((err) => res.status(400).json(`Unable to add user. Error: ${err}.`));
})

port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
