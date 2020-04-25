import React from "react";
import logo from "./logo.svg";
import { connect } from "react-redux";
import "./App.css";
import "./rideShare.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RiderHomeScreen from "./pages/RiderHomeScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Redirect } from "react-router-dom";

import { setIsLoggedIn } from "./redux/actions/userActions";
const App = (isLoggedIn) => {
  const authenticated = isLoggedIn.isLoggedIn;
  return (
    <div className="App">
      <Router>
        <div className="nav-bar">
          {!authenticated && (
            <div class="pill-nav">
                <Link   to="/login">Login</Link>
                <Link to="/signUp">Signup</Link>
            </div>
          )}
          {authenticated && (
            <div>
              <Link to="/RiderHomeScreen">Home</Link>
            </div>
          )}
        </div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signUp" component={Signup} />
          <Route path="/RiderHomeScreen" component={RiderHomeScreen} />
        </Switch>
      </Router>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
  };
};
export default connect(mapStateToProps)(App);
