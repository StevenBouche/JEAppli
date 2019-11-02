import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';


import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config

// routes config
import routes from '../../routes';
import TeamsManager from '../../service/team/TeamsManager'

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  state = { data: []};

  async componentDidMount() {
    var data = await TeamsManager.getTeamsStruct();
    const newState = {...this.state};
    newState.data = data;
    this.setState(newState);
  }

  render() {

    var elemti = {
      title: true,
      name: 'Dashboard',
      wrapper: {            
        element: '',       
        attributes: {}      
      },
      class: ''    
    };

    var element = {
      name: 'Your teams',
      url: '/teams',
      icon: 'icon-user',
      children: []
    };

    for(var i = 0; i < this.state.data.length; i++){
          var tm = {
            name: this.state.data[i].name,
            url: '/team/'+this.state.data[i]._id,
            icon: 'icon-list',
            children: []
          };
          for(var x = 0; x < this.state.data[i].groups.length; x++){
              var grp = {
                name: this.state.data[i].groups[x].name,
          //      url: '/group?teamid='+this.state.data[i]._id+"&groupid="+this.state.data[i].groups[x]._id,
          url: '/team/'+this.state.data[i]._id,
                icon: 'icon-notebook'
              };
              tm.children.push(grp);
          }
          element.children.push(tm)
    }
    
    var nav = { 'items': []};
    nav.items.push(elemti);
    nav.items.push(element);

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader></DefaultHeader>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={nav} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/teams" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
