import React from "react";
import { connect } from "react-redux";
import "../App.css";
import "../rideShare.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DriverSignup from "./DriverSignup";
import RiderSignup from "./RiderSignup";
import { Redirect } from "react-router-dom";

const Signup = () => {
  return (
    <div className="App">
      <Router>
        <div className="nav-bar">
            <div className="pill-nav">
                <Link   to="/RiderSignup">Rider Registration</Link>
                <Link to="/DriverSignup">Driver Registration</Link>
            </div>
        </div>
        <Switch>
          <Route path="/RiderSignup" component={RiderSignup} />
          <Route path="/DriverSignup" component={DriverSignup} />
        </Switch>
      </Router>
    </div>
  );
};

export default (Signup);
