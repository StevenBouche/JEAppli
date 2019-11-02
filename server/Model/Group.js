var mongoose = require("mongoose");
var UserItem = require("./UserItem.js");
var IdItem = require("./Identifiant.js");


const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    users: [UserItem],
    identifiants: [IdItem.schema]
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

module.exports = {
    schema: groupSchema,
    obj: Group
};