import React from "react";
import logo from "./logo.svg";
import { connect } from "react-redux";
import "./App.css";
import "./rideShare.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RiderHomeScreen from "./pages/RiderHomeScreen";
import DriverHomeScreen from "./pages/DriverHomeScreen";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  setIsLoggedIn,
  setIsDriver,
  setIsRider,
} from "./redux/actions/userActions";

const App = (isLoggedIn, isDriver, isRider) => {
  const authenticated = isLoggedIn.isLoggedIn;
  const driver = isDriver.isDriver;
  const rider = false;
  // const driver=true;
  // const rider=isRider.isRider;
  // alert(isLoggedIn.isLoggedIn);

  return (
    <div className="App">
      <Router>
        <div className="nav-bar">
          {!authenticated && (
            <div className="pill-nav">
              <Link to="/login">Login</Link>
              <Link to="/signUp">Signup</Link>
            </div>
          )}
          {authenticated && rider && (
            <div>
              <Link to="/RiderHomeScreen">RIDER Home SCREEN</Link>
            </div>
          )}
          {authenticated && driver && (
            <div>
              <Link to="/DriverHomeScreen">Driver Home SCREEN</Link>
            </div>
          )}
        </div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signUp" component={Signup} />
          <Route path="/RiderHomeScreen" component={RiderHomeScreen} />
          <Route path="/DriverHomeScreen" component={DriverHomeScreen} />
        </Switch>
      </Router>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    isDriver: state.userReducer.isDriver,
    isRider: state.userReducer.isRider,
  };
};
export default connect(mapStateToProps)(App);
