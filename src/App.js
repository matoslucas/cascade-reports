import React, { Component } from 'react';

import { Router, Route, Switch, } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import withTracker from './withTracker';

import ProtectedRoute from './comps/ProtectedRoute'
import auth from "./utils/Auth";


import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import './App.css';


import NavbarPage from './comps/NavbarPage'
import FooterPage from './comps/FooterPage'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Timeline from './pages/Timeline'
import Prospect from './pages/Prospect'



const history = createBrowserHistory()

class App extends Component {

  triggerAction(action) {
    console.log(action)

    auth.logout(() => {
      history.push("/");
    });

  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <NavbarPage action={this.triggerAction} />

            <Switch>
              <Route path="/dashboard" component={ProtectedRoute(withTracker(Dashboard))} />
              <Route path="/timelines" component={ProtectedRoute(withTracker(Timeline))} />
              <Route path="/timeline/:id" component={ProtectedRoute(withTracker(Timeline))} />
              <Route path="/prospect" component={ProtectedRoute(withTracker(Prospect))} />
              <Route path="/" component={withTracker(Login)} />
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