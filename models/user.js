const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
userSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) {
        return next();   
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if(err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if(err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
}

userSchema.methods.generateToken = function(callback) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save((err, user) => {
        if(err) {
            return callback(err);
        }
        callback(null, user);
    })
}

userSchema.statics.findByToken = function(token, callback) {
    var user = this;
    jwt.verify(token, 'secret', function(err, decode) {
        user.findOne({
            '_id':decode,
            'token': token
        }, function(err, user) {
            if(err) {
                return callback(err);
            }
            callback(null, user);
        });
    })
}

const User = mongoose.model('User', userSchema);
module.exports = User;