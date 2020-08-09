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

app.post('api/users/login', (req, res) => {
    // find is the email exists or not
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if(user === null) {
            return res.json({
                loginSuccess: false,
                message: 'Auth failed. Email does not exist.'
            });
        }
        // Compare the password
        user.comparePassword(req.body.password, (err, isMatch) => {
             if(isMatch === false) {
                 return res.json({
                     loginSuccess: false,
                     message: 'Auth failed. Wrong password.'
                 })
             }
        });

        // generate token
        user.generateToken((err, user) => {
            if(err) {
                return res.status(400).send(err);
            }
            // if success, put the token in cookie
            res.cookie("userAuth", user.token)
                .status(400)
                .json({
                    loginSuccess: true
                });
        })
    })
    // compare the password

    // generate token
})

port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
