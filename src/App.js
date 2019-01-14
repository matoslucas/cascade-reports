import React, { Component } from 'react';

import { Router, Route, Switch, Redirect, } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import withTracker from './withTracker';

import NavbarPage from './comps/NavbarPage'
import FooterPage from './comps/FooterPage'

import './App.css';

//import StatusWraper from './section/StatusWraper'
import Dashboard from './pages/Dashboard'
import Timeline from './pages/Timeline'

const history = createBrowserHistory()

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <NavbarPage /> 

            <Switch>

              <Route exact strict path="/" render={({ location }) => {
                if (location.pathname === window.location.pathname) {
                  return <Redirect to="/dashboard" />;
                }
                return null;
              }} />
              <Route path="/dashboard" component={withTracker(Dashboard)} />
              <Route path="/timelines" component={withTracker(Timeline)} />
              <Route path="/timeline/:id" component={withTracker(Timeline)} />
             
            </Switch>
            <br /> <br /> <br />
            <FooterPage /> 

          </div>
        </Router>

      </div>
    )
  }
}

export default App;
