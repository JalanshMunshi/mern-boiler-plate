const User = require("../models/user");

let auth = (req, res, next) => {
    let token = req.cookies.userAuth;
    // find the user to check if the user is
    // authenticated or not, with the token.
    User.findByToken(token, (err, user) => {
        if(err) {
            throw err;
        }
        // check if user with the token exists or not
        if(user === null) {
            return res.json({
                isAuth: false,
                error: true
            });
        }
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };