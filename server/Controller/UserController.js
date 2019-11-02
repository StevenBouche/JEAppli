var User = require("./../Model/User.js");
var HttpError = require("../Erreur/HttpError.js");

const UserController = {};

UserController.get = async (req, res, next) => {

    var user;

    try {
        user = await User.find();
    } catch {
        return res.status(500).send(err);
    }

    res.status(200).send(user);
};

UserController.post = async (req, res, next) => {

    // Create a new user
    try {
    //    console.log(req.body);
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
     //   console.log(token);
        res.status(201).send({ 'token': token })
    } catch (error) {
        return next(error);
    }
    
};

UserController.login = async (req, res, next) => {
    //Login a registered user
    try {
        const { email, password } = req.body;
   //     console.log(email, password);
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }
        const token = await user.generateAuthToken();
        res.status(200).send({ 'token': token });
    } catch (error) {
        return next(error);
    }
};

UserController.me = async (req, res, next) => {
    //TODO
    if (req.user == null) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    } else {
        res.send(req.user);
    }
};


UserController.logout = async (req, res, next) => {

    var userid = req.user._id;
    var token = req.token;

    try {
        var user = await User.findById(userid);

        var i = user.tokens.findIndex(e => e.token == token);
        if (i >= 0) {
            user.tokens.splice(i, 1);
            await user.save();
            res.status(200).send();
        }
        else {
            throw new HttpError(500, 'Bad token');
        }
       
    } catch (error) {
        return next(error);
    }
}


module.exports = UserController;