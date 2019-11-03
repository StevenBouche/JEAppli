var Express     = require("express");
var BodyParser = require("body-parser");
var Mongoose = require("mongoose");
var routes = require("./router.js");
var ErrorHandler = require("./middleware/ErrorHandler");
var cors = require("cors");
require('dotenv').config();
console.log("Mongo URL "+process.env.MANGOURL)
var mangoUrl = process.env.MANGOURL;
//var MONGODB_URL = process.env.MONGODB_URL;
//var Schemas = require("./config/configMongoose.js");

Mongoose.connect(mangoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const app = Express();

var whitelist = ['https://localhost:443','http://localhost:443','https://appje.stevenbouche.com']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(ErrorHandler);

console.log("Executing Server : app.js...");

module.exports = app;


