import React from 'react';

const Teams = React.lazy(() => import('./views/Teams/Teams'));
const Team = React.lazy(() => import('./views/Team/Team'));
const User = React.lazy(() => import('./views/User'));
const Group = React.lazy(() => import('./views/Group/Group'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/teams', name: 'Teams', component: Teams },
  { path: '/team/:id', exact: true, name: 'GroupsTeam', component: Team },
  { path: '/group', name: 'Group', component: Group },
  { path: '/me', exact: true, name: 'Team', component: User }
];

export default routes;
