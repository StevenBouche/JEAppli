import React, { Component } from 'react';
import { HashRouter, Route, Switch, Router } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import { createBrowserHistory } from 'history';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const browserHistory = createBrowserHistory();
const AuthenticationRoutes  = React.lazy(() => import('./route/AuthenticationRoutes'));
const ProtectedRoutes  = React.lazy(() => import('./route/ProtectedRoute'));

class App extends Component {
 
  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
          <Router history={browserHistory}>
          <Switch>
             
              <AuthenticationRoutes exact path="/login" name="Login Page" component={Login}/*render={props => <Login {...props}/>}*/ />
              <AuthenticationRoutes exact path="/register" name="Register Page" component={Register}/*render={props => <Register {...props}/>}*/ />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <ProtectedRoutes path="/" name="Home" component={DefaultLayout} />
            
            </Switch>
          </Router>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
