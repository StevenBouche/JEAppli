import React from 'react'
import AuthManager from '../service/auth'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoutes = ({component: Component, ...rest}) => {
 const {path} = rest;

 var b = AuthManager.isLogin();

if(b){
  return <Redirect to="/" />
}

return (
   <Route exact path={path} render={props => <Component {...props}/>} />
 )
}

export default ProtectedRoutes;