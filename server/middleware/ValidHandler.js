const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const HttpError = require("../Erreur/HttpError")

var verif = {};

var teamIdSchema = Joi.object().keys({ teamid: Joi.objectId().required() }).unknown();
var groupIdSchema = Joi.object().keys({ groupid: Joi.objectId().required() }).unknown();
var userIdSchema = Joi.object().keys({ userid: Joi.objectId().required() }).unknown();
var identifiantIdSchema = Joi.object().keys({ identifiantid: Joi.objectId().required() }).unknown();
var userRoleSchema = Joi.object().keys({ userrole: Joi.string().valid('viewer', 'user', 'admin', 'moderator').required() }).unknown();
var nameElementSchema = Joi.object().keys({ name: Joi.string().required() }).unknown();
var descElementSchema = Joi.object().keys({ description: Joi.string().required() }).unknown();

var identifiantSchema = Joi.object().keys({
    identifiant: Joi.object({
        username: Joi.string(),
        email: Joi.string().email().lowercase(),
        password: Joi.string(),
        description: Joi.string(),
        url: Joi.string()
    }).required()
}).unknown();

/*
 * Exemple
var joiUserSchema = Joi.object({
    name: Joi.object({
        first: Joi.string().required(),
        last: Joi.string().required()
    }),
    email: Joi.string().email().required(),
    bestFriend: Joi.string().meta({ type: 'ObjectId', ref: 'User' }),
    metaInfo: Joi.any(),
    addresses: Joi.array().items({
        line1: Joi.string().required(),
        line2: Joi.string()
    }).meta({ _id: false, timestamps: true })
});

var mongooseUserSchema = new Mongoose.Schema(Joigoose.convert(joiUserSchema));

*/

function verification(body, tabschema, res, next) {
   
    try {
        tabschema.forEach(function (element) {
            var result = Joi.validate(body, element);
            var { value, error } = result;
            const valid = error == null;
            if (!valid) throw new HttpError(400, 'Invalid request :' + JSON.stringify(error));
        });
    } catch (error) {
        next(error);
    }
    next();
};

verif.team = async (req, res, next) => {

    const body = req.body;
    var tabSchema = [];

    if (req.method == 'GET' || req.method == 'DELETE') {
        tabSchema.push(teamIdSchema);
    } else if (req.method == 'PUT') {
        tabSchema.push(teamIdSchema);
        tabSchema.push(nameElementSchema);
        tabSchema.push(descElementSchema);
    } else if (req.method == 'POST') {
        tabSchema.push(nameElementSchema);
        tabSchema.push(descElementSchema);
    }

    verification(body, tabSchema, res, next);
}

verif.teamuser = async (req, res, next) => {

    const body = req.body;
    var tabSchema = [];

    if (req.method == 'GET' || req.method == 'DELETE') {
       
        tabSchema.push(teamIdSchema);
        verification(body, tabSchema, res, next);
    } else if (req.method == 'PUT') {
        tabSchema.push(teamIdSchema);
        tabSchema.push(userIdSchema);
        tabSchema.push(userRoleSchema);
        verification(body, tabSchema, res, next);
    } else if (req.method == 'POST') {
        tabSchema.push(teamIdSchema);
        tabSchema.push(userIdSchema);
        verification(body, tabSchema, res, next);
    }

}

verif.teamgroup = async (req, res, next) => {

    const body = req.body;
    var tabSchema = [];

    if (req.method == 'GET' || req.method == 'DELETE') {
        tabSchema.push(teamIdSchema);
        const query = req.query;
        verification(query, tabSchema, res, next);
    } else if (req.method == 'PUT') {
        tabSchema.push(teamIdSchema);
        tabSchema.push(groupIdSchema);
        tabSchema.push(nameElementSchema);
        tabSchema.push(descElementSchema);
        verification(body, tabSchema, res, next);
    } else if (req.method == 'POST') {
        tabSchema.push(teamIdSchema);
        tabSchema.push(nameElementSchema);
        tabSchema.push(descElementSchema);
      //  console.log(body)
        verification(body, tabSchema, res, next);
    }

   
}

verif.groupuser = async (req, res, next) => {

    const body = req.body;
    var tabSchema = [];

    if (req.method == 'GET' || req.method == 'DELETE') {
        tabSchema.push(teamIdSchema);
        tabSchema.push(groupIdSchema);
        tabSchema.push(userIdSchema);
    } else if (req.method == 'PUT') {
        tabSchema.push(teamIdSchema);
        tabSchema.push(groupIdSchema);
        tabSchema.push(userIdSchema);
        tabSchema.push(userRoleSchema);
    } else if (req.method == 'POST') {
        tabSchema.push(teamIdSchema);
        tabSchema.push(userIdSchema);
        tabSchema.push(groupIdSchema);
    }

    verification(body, tabSchema, res, next);
}

verif.groupID = async (req, res, next) => {
   // console.log("perm identifiant")
    const body = req.body;
    var tabSchema = [];

    if (req.method == 'GET' || req.method == 'DELETE') {
       // console.log("get")
        tabSchema.push(teamIdSchema);
        tabSchema.push(groupIdSchema);
        const query = req.query;
        verification(query, tabSchema, res, next);
    } else if (req.method == 'PUT') {
        tabSchema.push(teamIdSchema);
        tabSchema.push(groupIdSchema);
        tabSchema.push(identifiantIdSchema);
        tabSchema.push(identifiantSchema);
        verification(body, tabSchema, res, next);
    } else if (req.method == 'POST') {
        tabSchema.push(teamIdSchema);
        tabSchema.push(groupIdSchema);
        tabSchema.push(identifiantSchema);
        verification(body, tabSchema, res, next);
    }

    

}

module.exports = verif;