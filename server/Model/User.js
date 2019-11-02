var mongoose = require("mongoose");
var validator = require('validator')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var HttpError = require('../Erreur/HttpError')
require('dotenv').config();

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new HttpError(400,'Invalid Email address')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    // console.log(user.password);
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
        //console.log(user.password);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email });
    if (!user) {
        throw new HttpError(400,'Invalid login credentials' );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new HttpError(400,'Invalid login credentials');
    }
    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;