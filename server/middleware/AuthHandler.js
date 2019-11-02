const jwt = require('jsonwebtoken')
const User = require('../Model/User.js')
const HttpError = require("../Erreur/HttpError")

const auth = async (req, res, next) => {
    // console.log(req.header('Authorization'));
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        if (!user) {
            throw new HttpError(401, "User authentification fail");
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        req.user = null;
        next(error);
    }

}

module.exports = auth;