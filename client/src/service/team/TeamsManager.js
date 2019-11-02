import request from '../request'

const TeamsManager = {};

TeamsManager.getTeams = async () => {
    var endpoint = '/teams';
    var res = await request.get(endpoint,'');
    return res;
}

TeamsManager.getTeamsStruct = async () => {
    var endpoint = '/teams/struct';
    var res = await request.get(endpoint,'');
    return res;
}

TeamsManager.getGroupsTeam = async () => {
    var endpoint = '/team/group';
    var res = await request.get(endpoint,'');
    return res;
}

TeamsManager.createTeam = async (name,description) => {
    var endpoint = '/team';
    var item = {
        name: name,
        description: description
    }
    var res = await request.post(endpoint,item);
    return res;
}

TeamsManager.updateTeam = async (teamid,name,description) => {
    var endpoint = '/team';
    var item = {
        teamid: teamid,
        name: name,
        description: description
    }
    var res = await request.put(endpoint,item);
    return res;
}

TeamsManager.getGroupTeam = async (teamid) => {
    var endpoint = '/team/groups';
    var item = "?teamid="+teamid;

    var res = await request.get(endpoint,item);
    return res;
}

TeamsManager.getTeamGroup = async (teamid,groupid) => {
    var endpoint = '/team/group';
    var item = "?teamid="+teamid+"&groupid="+groupid;

    var res = await request.get(endpoint,item);
    return res;
}

TeamsManager.createGroup = async (teamid,name,desc) => {
    var endpoint = '/team/group';

    var item = {
        teamid: teamid,
        name: name,
        description: desc
    };

    var res = await request.post(endpoint,item);
    return res;
}

TeamsManager.updateGroup = async (teamid,groupid,name,desc) => {
    var endpoint = '/team/group';

    var item = {
        teamid: teamid,
        groupid: groupid,
        name: name,
        description: desc
    };

    var res = await request.put(endpoint,item);
    return res;
}

TeamsManager.getIdentifiants = async(teamid, groupid) => {
    var endpoint = '/team/group/id';
    var item = "?teamid="+teamid+"&"+"groupid="+groupid;
    
    var res = await request.get(endpoint,item);
    return res;
}

TeamsManager.createIdentifiant= async (teamid,groupid,identifiant) => {
    var endpoint = '/team/group/id';
    var item = {
        teamid: teamid,
        groupid: groupid,
        identifiant: identifiant
    }
    var res = await request.post(endpoint,item);
    return res;
}

TeamsManager.updateIdentifiant= async (teamid,groupid,identifiantid,identifiant) => {
    var endpoint = '/team/group/id';
    var item = {
        teamid: teamid,
        groupid: groupid,
        identifiantid: identifiantid,
        identifiant: identifiant
    }
    var res = await request.put(endpoint,item);
    return res;
}

TeamsManager.getUsetTeamComp = async (teamid,term) => {
    var endpoint = '/team/auto';
    var item = "?teamid="+teamid+"&"+"term="+term;
    var res = await request.get(endpoint,item);
    return res;
}

TeamsManager.getUserGroupTeamComp = async (teamid,groupid,term) => {
    var endpoint = '/team/group/auto';
    var item = "?teamid="+teamid+"&groupid="+groupid+"&term="+term;
    var res = await request.get(endpoint,item);
    return res;
}

TeamsManager.addUserTeam = async (teamid, userid) => {
    var endpoint = '/team/user';
    var item = {
        teamid: teamid,
        userid: userid
    }
    var res = await request.post(endpoint,item);
    return res;
}

TeamsManager.addUserGroupTeam = async (teamid, groupid, userid) => {
    var endpoint = '/team/group/user';
    var item = {
        teamid: teamid,
        userid: userid, 
        groupid: groupid
    }
    var res = await request.post(endpoint,item);
    return res;
}

TeamsManager.updateUserTeam = async (teamid, userid, userrole) => {
    var endpoint = '/team/user';
    var item = {
        teamid: teamid,
        userid: userid, 
        userrole: userrole
    }
    var res = await request.put(endpoint,item);
    return res;
}

TeamsManager.updateUserGroupTeam = async (teamid, groupid, userid, userrole) => {
    var endpoint = '/team/group/user';
    var item = {
        teamid: teamid,
        userid: userid, 
        groupid: groupid,
        userrole: userrole
    }
    var res = await request.put(endpoint,item);
    return res;
}

export default TeamsManager;