var Express = require("express");
var ErrorHandler = require("./middleware/ErrorHandler");
var VerifHandler = require("./middleware/ValidHandler.js");
var PermManager = require("./Core/PermissionManager.js");

const routes = Express();
const auth = require("./middleware/AuthHandler.js");

routes.get('/', function (req, res) {
    res.send('hello world');
});

var UserController = require("./Controller/UserController");
routes.get('/users', UserController.get);
routes.post('/user', UserController.post);
routes.post('/user/login', UserController.login);
routes.get('/user/me', auth, UserController.me);
routes.post('/user/logout', auth, UserController.logout);

var TeamController = require("./Controller/TeamController");
routes.get('/teams', auth, TeamController.getTeams);
routes.get('/teams/struct', auth, TeamController.getTeamsStruct);
routes.get('/team', VerifHandler.team, auth, PermManager.permTeam, TeamController.getTeam);
routes.post('/team', VerifHandler.team, auth, TeamController.post);
routes.put('/team', VerifHandler.team, auth, PermManager.permTeam, TeamController.put);


routes.get('/team/auto', auth, PermManager.permTeam, TeamController.getUserTeamComp);
routes.get('/team/users', VerifHandler.teamuser, auth, PermManager.permTeam, TeamController.getUsersTeam);
routes.post('/team/user', VerifHandler.teamuser, auth, PermManager.permTeam, TeamController.addUser);
routes.put('/team/user', VerifHandler.teamuser, auth, PermManager.permTeam, PermManager.userActionTeam, TeamController.putUser);
//routes.delete('/team/user', VerifHandler.teamuser, auth, PermManager.permTeam, PermManager.userActionTeam, TeamController.deleteUser); // 

routes.get('/team/group/auto', auth, PermManager.permGroup, TeamController.getUserGroupTeamComp);
routes.get('/team/group', auth, PermManager.permGroup, TeamController.getGroup);
routes.get('/team/groups', VerifHandler.teamgroup, auth, PermManager.permGroup, TeamController.getGroups);
routes.post('/team/group', VerifHandler.teamgroup, auth, PermManager.permTeam,TeamController.addGroup);
routes.put('/team/group', VerifHandler.teamgroup, auth, PermManager.permGroup, TeamController.updateGroup);
//routes.delete('/team/group', VerifHandler.teamgroup, auth, PermManager.permGroup, TeamController.deleteGroup); //

routes.get('/team/group/user', VerifHandler.groupuser, auth, PermManager.permGroup, TeamController.getUsersGroup); 
routes.post('/team/group/user', VerifHandler.groupuser, auth, PermManager.permGroup, TeamController.addUserGroup);
routes.put('/team/group/user', VerifHandler.groupuser, auth, PermManager.permGroup, PermManager.userActionGroup,  TeamController.updateUserGroup); 
//routes.delete('/team/group/user', VerifHandler.groupuser, auth, PermManager.permGroup, PermManager.userActionGroup,  TeamController.deleteUserGroup); // 

routes.get('/team/group/id', VerifHandler.groupID, auth, PermManager.permGroup, TeamController.getIDsGroup);
routes.post('/team/group/id', VerifHandler.groupID, auth, PermManager.permGroup, TeamController.addIDGroup);
routes.put('/team/group/id', VerifHandler.groupID, auth, PermManager.permGroup, TeamController.updateIDGroup);
//routes.delete('/team/group/id', VerifHandler.groupID, auth, PermManager.permGroup, TeamController.deleteIDGroup);

routes.use(ErrorHandler);

module.exports = routes;

