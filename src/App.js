import React, { Component } from 'react';

import { Router, Route, Switch, } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import withTracker from './withTracker';

import ProtectedRoute from './comps/ProtectedRoute'
import auth from "./utils/Auth";


import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';


import './App.css';


import NavbarComp from './comps/NavbarComp'
import FooterPage from './comps/FooterPage'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Timeline from './pages/Timeline'
import Prospects from './pages/Prospects'
import AllTask from './pages/AllTask'

import Inspections from './pages/Inspections'


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
            <NavbarComp action={this.triggerAction} />
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                marginBottom: 80,
                marginTop: 40
              }} >
              <Switch>
                <Route path="/dashboard" component={ProtectedRoute(withTracker(Dashboard))} />
                <Route path="/timelines" component={ProtectedRoute(withTracker(Timeline))} />
                <Route path="/timeline/:id" component={ProtectedRoute(withTracker(Timeline))} />
                <Route path="/prospect/:id" component={ProtectedRoute(withTracker(Prospects))} />
                <Route path="/tasks/:id" component={ProtectedRoute(withTracker(AllTask))} />
                <Route path="/inspections" component={ProtectedRoute(withTracker(Inspections))} />
                <Route path="/" component={withTracker(Login)} />
              </Switch>
            </div>
            <FooterPage />

          </div>
        </Router>

      </div>
    )
  }
}

export default App;