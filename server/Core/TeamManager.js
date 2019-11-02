var Team = require("./../Model/Team.js");
var enumRole = require("./../permission/Role.js");
var PasswordManager = require("./PasswordManager.js")
var GroupExport = require("./../Model/Group.js");
var IdentifiantExport = require("./../Model/Identifiant.js");
var HttpError = require("../Erreur/HttpError.js");
var PermissionManager = require('./PermissionManager.js');
var Group = GroupExport.obj;
var Identifiant = IdentifiantExport.obj;
var UserManager = require('./UserManager.js');
var enumRole = require("./../permission/Role.js");

const TeamManager = {};

/*
 * 
 *  TODO :
 *         
 *         
 *          Factorisation de code
 * 
 *
 * 
 */

async function getTeamById(teamId) {
   // console.log("TEAM ID "+teamId)
    var teams = await Team.findById(teamId);
    if (!teams) throw new HttpError(404, "Team ressource not found");
    return teams;
};

async function getGroupTeamById(teamId, groupid) {
    var teams = await Team.findById(teamId);
    var group = teams.groups.find(function (element) {
        return element._id.equals(groupid);
    });
    if (!group) throw new HttpError(404, "Group ressource not found");
    return group;
};

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

function canView(user){
    return userHaveclaim('GET', user);
}



/**
 * 
 * Handle Team
 * 
 */

TeamManager.getTeam = async (teamid) => {
    return await getTeamById(teamid);
}

TeamManager.getTeams = async (userid) => {

    var teams = await Team.find({ 'users.id': userid }).select('name description');
    var items = [];
    
    for (var i = 0; i < teams.length; i++) {
        var team = {};
        var user = await TeamManager.getUser(teams[i]._id, userid);
        var b = canView(user);
        if (b) {
            team.userrole = user.role;
            team.name = teams[i].name,
                team.description = teams[i].description;
            team._id = teams[i]._id;
            items.push(team);

        }
    }

   // console.log(items);
    return items;
};


//TODO simplifier
TeamManager.getTeamsExplorer = async (userid) => {
    var teams = await Team.find({ 'users.id': userid }).select('_id name groups');

    var items = [];

    for (var i = 0; i < teams.length; i++) {
        var team = {};
        var user = await TeamManager.getUser(teams[i]._id, userid);
        var b = canView(user);
        if (b) {
            team.name = teams[i].name,
            team._id = teams[i]._id;
            team.groups = [];
            if (teams[i].groups.length != 0) {
                if (user.role == 'admin' || user.role == 'moderator') {          
                    for (var x = 0; x < teams[i].groups.length; x++) {
                        team.groups[x] = {
                            '_id': teams[i].groups[x]._id,
                            'name': teams[i].groups[x].name
                        };
                    }
                } else {            
                    for (var x = 0; x < teams[i].groups.length; x++) {
                        user = await TeamManager.getUserGroup(teams[i]._id, teams[i].groups[x]._id, userid);
                        if (user != null) {     
                            b = canView(user);
                            if (b) {
                                var group = {};
                                group.name = teams[i].groups[x].name,
                                group._id = teams[i].groups[x]._id;
                                team.groups.push(group);
                            }
                        }
                    }
                }
            }
            items.push(team);
        }         
    }
    return items;
};

TeamManager.createTeam = async (userId, name, description) => {
    const team = new Team();
    var useritem = { id: userId, role: 'admin' };
    team.set({ name, description });
    team.users.push(useritem);
    await team.save();
    return team;
};

TeamManager.updateTeam = async (teamid, name, description) => {
    var team = await getTeamById(teamid);
    team.set({ name, description });
    await team.save();
    return team;
};

TeamManager.deleteTeam = async (teamid) => {
    throw new HttpError(500,"Not implemented");
};


/**
 *
 * Handle UserTeam
 *
 */

TeamManager.autoCompUsers = async (teamid,term) => {
    var users = await UserManager.getUsersTerm(term);
    var team = await TeamManager.getTeam(teamid);
    var res = [];
    var result = users.filter(function (user) {
        for (var i = 0; i < team.users.length; i++) {
            if (team.users[i].id.equals(user._id)) return false;
        }
        res.push({ _id: user._id, name: user.name });
        return true;
    })
    return res;
}

TeamManager.autoCompUsersGroup = async (teamid, groupid, term) => {

    var team = await getTeamById(teamid);
    var group = await getGroupTeamById(teamid, groupid);

    var res = [];
    //var r = team.users.filter(us => us.name.includes(term) ? true : false);
   // console.log("TERM" + term)

    for (var i = 0; i < team.users.length; i++) {
        var userItem = await UserManager.getUser(team.users[i].id);
        if (userItem.name.includes(term)) {
            res.push({ id: team.users[i].id, name: userItem.name });
        }
    }

  //  console.log(res);
  /*  var result = r.filter(async function (user) {
        
        for (var i = 0; i < group.users.length; i++) {
            if (group.users[i].id.equals(user._id) ) return false;
        }
        var userItem = await UserManager.getUser(user.id);
        res.push({ _id: user.id, name: userItem.name });
        return true;
    })

    console.log(res)*/
    return res;
}

TeamManager.getUsers = async (teamId) => {
    var team = await getTeamById(teamId);
    return team.users;
};

TeamManager.getUser = async (teamId, userId) => {
    var team = await getTeamById(teamId);
    var user = team.users.find(function (element) {
        return element.id.equals(userId);
    });

    if (!user) return null;
    else return user;
};

TeamManager.updateUser = async (teamid, useraddid, userrole, userid) => {

    var team = await getTeamById(teamid);
    for (var i = 0; i < team.users.length; i++) {
        if (team.users[i].id.equals(useraddid)) {
            team.users[i].role = userrole;
            await team.save();
            return team;
        }
    }
    throw new HttpError(404,"User not found in this Team");
   
};

TeamManager.addUser = async (teamid, useraddid, userid) => {
   
    var newUser = await TeamManager.getUser(teamid, useraddid);
   
    if (newUser != null) {
        throw new HttpError(400,"User " + useraddid + " already exist in this Team");
    }

    var team = await getTeamById(teamid); 
    team.users.push({ id: useraddid, role: 'user' });
    await team.save();
    return team;
 
};

TeamManager.deleteUser = async (teamid, userdelid, userid) => {
    var team = await getTeamById(teamid);
    team.users.splice(team.users.findIndex(e => e.id.equals(userdelid)), 1);
    await team.save();
    return team;
};


/**
 *
 * Handle Group
 *
 */

//TODO revoir boucle pour passer en filter

function getValueOfRole(role) {
    for (var i = 0; i < enumRole.length; i++) {
        if (enumRole[i] == role) return i;
    }
    return -1;
};

async function getPermGroup(userid, teamid, groupid) {
    var user = await TeamManager.getUser(teamid, userid);

    if (user == null) throw new HttpError(404, "User is not in this Team");
    if (user.role == 'admin') return user.role;

    var usergrp = await TeamManager.getUserGroup(teamid, groupid, userid);
    if (usergrp == null) {
        return user.role;
    }
    else {
        var i = getValueOfRole(usergrp.role);
        var x = getValueOfRole(user.role);
        if (i < x) return usergrp.role;
        else return user.role;
    }

}

TeamManager.getGroup = async (teamid, groupid, userid, userperm) => {

    var team = {};
    team.group = {};

    var teamItem = await getTeamById(teamid);
    var group = await getGroupTeamById(teamid, groupid);

    team.userrole = await getPermGroup(userid, teamid, groupid);
    team._id = teamid;
    team.group = group;
    team.name = teamItem.name;

    for (var i = 0; i < team.group.users.length; i++) {
        var userItem = await UserManager.getUser(team.group.users[i].id);
       
        team.group.users[i] = {
            id: team.group.users[i].id,
            role: team.group.users[i].role,
            name: userItem.name
        };
     
    }
  //  console.log(team)
    return team;
}

TeamManager.getGroups = async (teamid, userid) => {

    var teams = await getTeamById(teamid);
    var team = {};
    var user = await TeamManager.getUser(teams._id, userid);

    team._id = teamid;
    team.groups = [];
    team.userrole = user.role;
    team.users = teams.users;
    team.name = teams.name;

    for (var i = 0; i < team.users.length; i++) {
        var userItem = await UserManager.getUser(team.users[i].id);

        team.users[i] = {
            id: team.users[i].id,
            role: team.users[i].role,
            name: userItem.name
        };

    }

    if (teams.groups.length != 0) {
        if (user.role == 'admin' || user.role == 'moderator') {
            for (var x = 0; x < teams.groups.length; x++) {
                team.groups[x] = {
                    '_id': teams.groups[x]._id,
                    'name': teams.groups[x].name,
                    'description': teams.groups[x].description,
                    'userrole' : user.role
                };
            }
        } else {
            for (var x = 0; x < teams.groups.length; x++) {
                user = await TeamManager.getUserGroup(teams._id, teams.groups[x]._id, userid);
                if (user != null) {
                    b = canView(user);
                    if (b) {
                        var group = {};
                        group.name = teams.groups[x].name,
                        group._id = teams.groups[x]._id;
                        group.description = teams.groups[x].description;
                        group.userrole = user.role;
                        team.groups.push(group);
                    }
                }
            }
        }
    }

 //   console.log(team)
    return team;

};

TeamManager.addGroupTeam = async (teamid, userid, name, description) => {
    var team = await getTeamById(teamid);
    var group = new Group();
    var useritem = { id: userid, role: 'admin' };
    group.set({ name, description });
    group.users.push(useritem);
    team.groups.push(group);
    await team.save();
    return group;
};

TeamManager.updateGroupTeam = async (teamid, groupid, groupname, groupdesc) => {

    var team = await getTeamById(teamid);

    var group = team.groups.find(function (element) {
        if (element._id.equals(groupid)) {
            element.name = groupname;
            element.description = groupdesc;
        }
        return element._id.equals(groupid);
    });

    if (!group) throw new HttpError(404,"Group ressource not found");
    team.save();
    return team;
};

//TODO revoir droit a test
TeamManager.deleteGroupTeam = async (teamid, groupid) => {
    /*var team = await getTeamById(teamid);
    team.groups.splice(team.groups.findIndex(e => e.id.equals(groupid)), 1);
    await GroupManager.deleteGroup(groupid);*/
    throw new HttpError(500,"not implemented ");
};

/*
 * 
 * 
 *  USER GROUP
 * 
 * 
 */

TeamManager.getUserGroup = async (teamid, groupid, userid) => {

    //TODO VERIFIER

    var team = await getTeamById(teamid);

    var group = team.groups.find(function (element) { return element._id.equals(groupid); });
    if (!group) return null;

    var user = group.users.find(function (element) {return element.id.equals(userid);});
    if (!user) return null;

    return user;
}

TeamManager.getUsersGroup = async (teamid, groupid) => {
    var group = await getGroupTeamById(teamId,groupid);
    return team.group;
}

TeamManager.addUserGroupTeam = async (teamid, groupid, userid, useraddid) => {
   //TODO verid si besoin de userid
    var userTeam = await TeamManager.getUser(teamid, useraddid);
    var newUser = await TeamManager.getUserGroup(teamid, groupid, useraddid);

    if (userTeam == null) throw new HttpError(400,"User " + useraddid + " not exist in this Team");
    if (newUser != null) throw new HttpError(400,"User " + useraddid + " already exist in this Group");
  
    var team = await getTeamById(teamid);
    var group = team.groups.find(function (element) {
        if (element._id.equals(groupid)) {
            element.users.push({ id: useraddid, role: 'user' });
        }
        return element._id.equals(groupid);
    });

    await team.save();
    return team;

}

//a test
TeamManager.updateElementOfGroup = async (tid, grpid, elid, el,elname) => {

    var team = await getTeamById(tid);

    var group = team.groups.find(function (element) {
        if (element._id.equals(grpid)) {
            element[elname].find(function (sub) {
                if (sub.id.equals(elid)) {
                    sub.set(el);
                }
                return user.id.equals(userupid);
            });
        }
        return element._id.equals(groupid);
    });

    await team.save();
}


TeamManager.updateUserGroupTeam = async (teamid, groupid, userid, userupid, userrole) => {

    var team = await getTeamById(teamid);
    
    var group = team.groups.find(function (element) {
        if (element._id.equals(groupid)) {
            element.users.find(function (user) {
                if (user.id.equals(userupid)) {
                    user.role = userrole;
                }
                return user.id.equals(userupid);
            });
        }
        return element._id.equals(groupid);
    });

    return group;

}

TeamManager.delUserGroupTeam = async (teamid, groupid, userid, userdelid) => {

    var team = await getTeamById(teamid);

    var group = team.groups.find(function (element) {
        if (element._id.equals(groupid)) {
            element.users.splice(element.users.findIndex(e => e.id.equals(userdelid)), 1);
        }
        return element._id.equals(groupid);
    });

    return group;
}

/**
 *
 * Handle Indentifiant
 *
 */

TeamManager.getIdentifiant = async (teamid, groupid, idid) => {
    var group = await getGroupTeamById(teamid, groupid);
    var id = group.identifiants.find((element) => {
        if (element._id.equals(idid)) {
            element.password = PasswordManager.decrypt(element.password);
        }
        return element._id.equals(idid);
    });
    return id;
};

TeamManager.getIdentifiants = async (teamid, groupid, userid) => {
 //   console.log("get identifiant")
    var group = await getGroupTeamById(teamid, groupid);
    group.identifiants.forEach((element) => {
        element.password = PasswordManager.decrypt(Buffer.from(element.password));
    });
    return group.identifiants;
};

TeamManager.updateIdentifiant = async (teamid, groupid, identifid, ident) => {

    var team = await getTeamById(teamid);
    ident.password = PasswordManager.encrypt(ident.password);

    var team = await getTeamById(teamid);
    
    var group = team.groups.find(function (element) {
        var id = element._id;
        if (id.equals(groupid)) {
            element.identifiants.find(function (iden) {
                var id = iden._id;
                if (id.equals(identifid)) iden.set(ident);
                return id.equals(identifid);
            });
        }
        return id.equals(groupid);
    });
    team.save();
    return group;
};

TeamManager.createIdentifiant = async (teamid, groupid, ident) => {

    var team = await getTeamById(teamid);

    ident.password = PasswordManager.encrypt(ident.password);
    var identifiant = new Identifiant(ident);
 //   console.log(team);
    var group = team.groups.find(function(element){
        if (element._id.equals(groupid)) {
            element.identifiants.push(identifiant);
         //   console.log(element.identifiants);
        } 
        return element._id.equals(groupid);
    });
    await team.save();
    if (!group) throw new HttpError(404, 'Group not found');
    return group;
   
};

TeamManager.deleteIdentifiant = async (teamid, groupid, idid) => {

    var team = await getTeamById(teamid);

    var group = team.groups.find(function (element) {
        if (element._id.equals(groupid)) {
            element.identifiants.splice(element.identifiants.findIndex(e => e.id.equals(idid)), 1);
        }
        return element._id.equals(groupid);
    });

    return group;
};


module.exports = TeamManager;