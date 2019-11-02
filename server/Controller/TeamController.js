var TeamManager = require("./../Core/TeamManager.js");

const TeamController = {};

/*
 *      TEAM
 */

TeamController.getTeams = async (req, res, next) => { 
    try {
        var teams = await TeamManager.getTeams(req.user._id);
      
    //    console.log('TEAM CONSTROLLER : ' + teams);
        return res.status(200).send(teams);
    } catch (error) {
        return next(error);
    }
};

TeamController.getTeamsStruct = async (req, res, next) => {
    try {
        var teams = await TeamManager.getTeamsExplorer(req.user._id);

      //  console.log('TEAM CONSTROLLER struct : ' + teams);
        return res.status(200).send(teams);
    } catch (error) {
        return next(error);
    }
};

TeamController.getTeam = async (req, res, next) => {

    var teamid = req.body.teamid;
   
    try {
        var team = await TeamManager.getTeam(teamid);
        if (team != null) return res.status(200).send(team);
        else res.status(404).send();
    } catch (error) {
        return next(error);
    }
};

TeamController.post = async (req, res, next) => {
   // console.log("create team");
    var userid = req.user._id;

    try {
        var team = TeamManager.createTeam(userid, req.body.name, req.body.description);
        res.status(201).send(team);
    } catch (error) {
        return next(error);
    }

};

TeamController.put = async (req, res, next) => {
  // console.log("update team");
    var teamid = req.body.teamid;
    var name = req.body.name;
    var desc = req.body.description;

    try {
        var team = await TeamManager.updateTeam(teamid, name , desc);
        res.status(201).send(team);
    } catch (error) {
        return next(error);
    }

};

TeamController.delete = async (req, res, next) => {

    var teamid = req.body.teamid;

    try {
        var res = await TeamManager.deleteTeam(teamid);
        res.status(201).send(res);
    } catch (error) {
        return next(error);
    }

};

/*
 *      TEAM USER
 */
TeamController.getUserTeamComp = async (req, res, next) => {

    var teamid = req.query.teamid;
    var term = req.query.term;

    try {
        var user = await TeamManager.autoCompUsers(teamid, term);
        return res.status(201).send(user);
    } catch (error) {
        return next(error);
    }
    

}

TeamController.getUserGroupTeamComp = async (req, res, next) => {

    var teamid = req.query.teamid;
    var groupid = req.query.groupid;
    var term = req.query.term;

    try {
        var user = await TeamManager.autoCompUsersGroup(teamid, groupid, term);
        return res.status(201).send(user);
    } catch (error) {
        return next(error);
    }


}


TeamController.getUsersTeam = async (req, res, next) => {

    var teamid = req.body.teamid;

    try {
        var user = await TeamManager.getUsers(teamid);
        return res.status(201).send(user);
    } catch (error) {
        return next(error);
    }

};

TeamController.addUser = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.body.teamid;
    var useraddid = req.body.userid;

    try {
        var team = await TeamManager.addUser(teamid, useraddid, userid);
        return res.status(201).send(team);
    } catch (error) {
        return next(error);
    }
    
};

TeamController.putUser = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.body.teamid;
    var userupid = req.body.userid;
    var userrole = req.body.userrole;

   
    try {
        var user = await TeamManager.updateUser(teamid, userupid, userrole, userid);
        return res.status(201).send(user);
    } catch (error) {
        return next(error);
    }
};

TeamController.deleteUser = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.body.teamid;
    var userdelid = req.body.userid;

    try {
        var team = await TeamManager.deleteUser(teamid, userdelid, userid);
        return res.status(201).send(team);
    } catch (error) {
        next(error);
    }
 
};

/*
 *      TEAM GROUP
 */
TeamController.getGroup = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.query.teamid;
    var groupid = req.query.groupid;
    var perm = req.userperm;

    try {
        var group = await TeamManager.getGroup(teamid,groupid, userid, perm);
        return res.status(200).send(group);
    } catch (error) {
        return next(error);
    }
}

TeamController.addGroup = async (req, res, next) => {

  //  console.log("Add group");
    var groupname = req.body.name;
    var groupdesc = req.body.description;
    var userid = req.user._id;
    var teamid = req.body.teamid;

    try {
        var team = await TeamManager.addGroupTeam(teamid, userid, groupname, groupdesc);
        return res.status(201).send(team);
    } catch (error) {
        return next(error);
    }
};

TeamController.getGroups = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.query.teamid;
    var groups;
 
    try {
        var groups = await TeamManager.getGroups(teamid, userid);
        return res.status(200).send(groups);
    } catch (error) {
        return next(error);
    }
    
};

TeamController.updateGroup = async (req, res, next) => {

    var groupname = req.body.name;
    var groupdesc = req.body.description;
    var teamid = req.body.teamid;
    var groupid = req.body.groupid;
    
    try {
        var group = await TeamManager.updateGroupTeam(teamid, groupid, groupname, groupdesc);
        return res.status(201).send(group);
    } catch (error) {
        return next(error);
    }

};

TeamController.deleteGroup = async (req, res, next) => {

    var teamid = req.body.teamid;
    var groupid = req.body.groupid;

    try {

        var team = TeamManager.deleteGroupTeam(teamid, groupid);
        return res.status(201).send(team);

    } catch (error) {
        return next(error);
    }
}

/*
 *      TEAM USER GROUP
 */

TeamController.getUserGroup = async (req, res, next) => {

    var teamid = req.body.teamid;
    var groupid = req.body.groupid;
    var usergrp = req.body.userid;

    try {

        var user = await TeamManager.getUserGroup(teamid, groupid, usergrp); 
        return res.status(201).send(user);
    
    } catch (error) {
        return next(error);
    }
}

TeamController.getUsersGroup = async (req, res, next) => {

    var teamid = req.body.teamid;
    var groupid = req.body.groupid;

    try {

        var users = await TeamManager.getUsersGroup(teamid, groupid);
        return res.status(201).send(users);

    } catch (error) {
        return next(error);
    }
}

TeamController.addUserGroup = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.body.teamid;
    var groupid = req.body.groupid;
    var useraddid = req.body.userid;

    try {

        var team = await TeamManager.addUserGroupTeam(teamid, groupid, userid, useraddid);
     //   console.log(team);
        return res.status(201).send(team);

    } catch (error) {
        return next(error);
    }
}

TeamController.updateUserGroup = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.body.teamid;
    var groupid = req.body.groupid;
    var usergrp = req.body.userid;
    var userrole = req.body.userrole;

    try {

        var group = await TeamManager.updateUserGroupTeam(teamid, groupid, userid, usergrp, userrole);
        return res.status(201).send(group);

    } catch (error) {
        return next(error);
    }
}

TeamController.deleteUserGroup = async (req, res, next) => {

    var userid = req.user._id;
    var teamid = req.body.teamid;
    var groupid = req.body.groupid;
    var usergrp = req.body.userid;


    try {

        var group = TeamManager.delUserGroupTeam(teamid, groupid, userid, usergrp);
        return res.status(201).send(group);

    } catch (error) {
        return next(error);
    }
}

/*
 *      TEAM IDENTIFIANT GROUP
 */

TeamController.getIDsGroup = async (req, res, next) => {
  
    var teamid = req.query.teamid;
    var groupid = req.query.groupid;
  //  console.log("get constroller identifiants")
    try {

        var identif = await TeamManager.getIdentifiants(teamid, groupid);
        return res.status(201).send(identif);

    } catch (error) {
        return next(error);
    }
}

TeamController.getIDGroup = async (req, res, next) => {

    var teamid = req.body.teamid;
    var groupid = req.body.groupid;
    var identifiant = req.body.identifiantid;

    try {

        var identif = await TeamManager.getIdentifiant(teamid, groupid, identifiant);
        return res.status(201).send(identif);

    } catch (error) {
        return next(error);
    }
}

TeamController.addIDGroup = async (req, res, next) => {

    var teamid = req.body.teamid;
    var groupid = req.body.groupid;
    var identifiant = req.body.identifiant;

    try {
      //  console.log(identifiant);
        var id = await TeamManager.createIdentifiant(teamid, groupid, identifiant);
        return res.status(201).send(id);

    } catch (error) {
        return next(error);
    }
}

TeamController.updateIDGroup = async (req, res, next) => {

    var teamid = req.body.teamid;
    var groupid = req.body.groupid;
    var identifiantid = req.body.identifiantid;
    var identifiant = req.body.identifiant;

    try {

        var group = TeamManager.updateIdentifiant(teamid, groupid, identifiantid, identifiant);
        return res.status(201).send(group);

    } catch (error) {
        return next(error);
    }
}

TeamController.deleteIDGroup = async (req, res, next) => {

    var teamid = req.body.teamid;
    var groupid = req.body.groupid;
    var identifiantid = req.body.identifiant;

    try {

        var group = await TeamManager.deleteIdentifiant(teamid, groupid, identifiantid);
        return res.status(201).send(group);

    } catch (error) {
        return next(error);
    }
}


module.exports = TeamController;