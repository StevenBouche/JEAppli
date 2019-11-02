var mongoose = require("mongoose");
var UserItem = require("./UserItem.js");
var GroupItem = require("./Group.js");

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    users: [UserItem],
    groups: [GroupItem.schema],
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;