var mongoose = require("mongoose");
var validator = require('validator');
const HttpError = require("../Erreur/HttpError")

const IdentifiantSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new HttpError(400,{ error: 'Invalid Email address' })
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    url: {
        type: String,
        validate: value => {
            if (!validator.isURL(value)) {
                throw new HttpError(400,{ error: 'Invalid URL' })
            }
        }
    }
}, { timestamps: true });

const Identifiant = mongoose.model('Identifiant', IdentifiantSchema);

module.exports = {
    schema: IdentifiantSchema,
    obj: Identifiant
};