var mongoose = require("mongoose");
var enumRole = require("./../permission/Role.js");

var ObjectId = mongoose.Schema.Types.ObjectId;

const usersTeam = mongoose.Schema({
    id: {
        type: ObjectId,
        
        index: true,
        ref: 'User'
    },
    role: {
        type: String,
        enum: enumRole,
        default: 'user'
    }
}, { _id: false });

module.exports = usersTeam;