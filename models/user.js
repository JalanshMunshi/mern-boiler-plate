const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExpiration: {
        type: Number
    }
});
const saltRounds = 10;
userSchema.pre('save', (next) => {
    var user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) {
                    return next(err);
                }
                user.password = hash;
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;