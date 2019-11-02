var User = require("./../Model/User.js");

const UserManager = {};

UserManager.getUser = async (userid) => {
    var user = await User.findById(userid);
    if (!user) throw new HttpError(404, "User ressource not found");
    return user;
};

UserManager.getUsersTerm = async (term) => {
    var user = await User.find();
    var result = user.filter(us => us.name.includes(term) ? true : false);
  //  console.log(result);
    return result;
};

UserManager.createUser = async () => {

};

UserManager.updateUser = async () => {

};

UserManager.deleteUser = async () => {

};





module.exports = UserManager;