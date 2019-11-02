var enumRole = require("./../permission/Role.js");
var TeamManager = require("./TeamManager.js");
const HttpError = require("../Erreur/HttpError")

const PermissionManager = {};

PermissionManager.getValueOfRole = (role) => {
    for (var i = 0; i < enumRole.length; i++) {
        if (enumRole[i] == role) return i;
    }
    return -1;
};

function userCanActionOnUser(userRole,userActionRole,userActionRoleNext) {

    var valUser = PermissionManager.getValueOfRole(userRole);
    var valUserActionNext = PermissionManager.getValueOfRole(userActionRoleNext);
    var valUserAction = PermissionManager.getValueOfRole(userActionRole);

    if (valUser < valUserActionNext && valUser < valUserAction) {
        return true;
    }

    return false;
}

PermissionManager.userActionTeam = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.body.teamid;
    var userActionId = req.body.userid;
    var userNextRole = req.body.userrole;

    try {
    
        var user = await TeamManager.getUser(teamid, userid);
        var userAction = await TeamManager.getUser(teamid, userActionId);
        var b = userCanActionOnUser(user.role, userAction.role, userNextRole);
        if (!b) throw new HttpError(401, "User have not permission to other user");
        next();

    } catch (error) {
        next(error);
    }

}

PermissionManager.userActionGroup = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.body.teamid;
    var groupid = req.body.groupid;
    var userActionId = req.body.userid;
    var userNextRole = req.body.userrole;

    try {
        var user = await TeamManager.getUserGroup(teamid, groupid, userid);
        var userAction = await TeamManager.getUserGroup(teamid, groupid, userActionId);
        if (!userCanActionOnUser(user.role, userAction.role, userNextRole)) throw new HttpError(401, "User have not permission to other user");
        next();
    } catch (error) {
        next(error);
    }
}

PermissionManager.permTeam = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.body.teamid;
    if (!teamid) teamid = req.query.teamid;
    try {
        var user = await TeamManager.getUser(teamid, userid);
        if (!user) throw new HttpError(404, "User is not in this Team");
        if (!userHaveclaim(req.method, user)) throw new HttpError(401,"User have not permission of this ressource");
        next();
    } catch (error) {
        next(error);
    }
}

PermissionManager.permTeamBool = async (userid, teamid, method) => {

    try {
        var user = await TeamManager.getUser(teamid, userid);
        if (!user) return false;
        if (!userHaveclaim(method, user)) return false;

    } catch (error) {
        return false;
    }
    
    return true;
}

PermissionManager.permGroupBool = async (userid, teamid,groupid, method) => {

    try {
        var user = await TeamManager.getUser(teamid, userid);
        if (user == null) return false;
        if (!userHaveclaim(method, user)) {
            user = await TeamManager.getUserGroup(teamid, groupid, userid);
            if (!user == null) return false;
            if (!userHaveclaim(method, user)) {
                return false;
            }
        }
    } catch (error) {
        return false;
    }

    return true;
        
}


PermissionManager.permGroup = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.body.teamid;
    var groupid = req.body.groupid;

    if (!teamid) teamid = req.query.teamid;
    try {
        var user = await TeamManager.getUser(teamid, userid);
        var usergrp = await TeamManager.getUserGroup(teamid, groupid, userid);
        if (user == null) throw new HttpError(404, "User is not in this Team");
    //    console.log(user)
        if (!userHaveclaim(req.method, user)) {
            if (!usergrp == null) throw new HttpError(404, "User is not in this Group");
            if (!userHaveclaim(req.method, usergrp)) {
                throw new HttpError(401, "User have not permission of this ressource");
            }
        }
        req.userperm = user.role;
        next();
    } catch (error) {
        next(error);
    }
}


PermissionManager.getNextRole = (role) => {
    for (var i = 0; i < enumRole.length; i++) {
        if (enumRole[i] == role) {
            if (i == 0) return enumRole[0];
            else return enumRole[i - 1];
        }
    }
    return "";
};

PermissionManager.canView = (user) => {
    return PermissionManager.userHaveclaim('GET', user);
}

function userHaveclaim(method, user) {

    if (user.role) {

        if (method == 'GET') {
            if (!(user.role == 'user')) return true;
        }
        else if (method == 'POST' || method == 'PUT') {
            if (user.role == 'admin' || user.role == 'moderator') return true;
        }
        else if (method == 'DELETE') {
            if (user.role == 'admin') return true;
        }
    }
    return false;
};



module.exports = PermissionManager;