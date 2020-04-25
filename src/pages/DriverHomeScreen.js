import React from "react";
import { connect } from "react-redux";
import "../rideShare.css";
import axios from "axios";

import {
  setUser,
  setPassword,
  setIsLoggedIn,
  setLoadingState,
} from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";

const DriverHomeScreen = ({ user, password, isLoggedIn, loadingState, dispatch }) => {
  

  const [responseMessage, setResponseMessage] = React.useState("");

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    dispatch(setUser(""));
    dispatch(setPassword(""));
    console.log("isLoggedin in logout", isLoggedIn);
  };

  const counter = 0;
  const showRides = () => {
   
  };
  

  React.useEffect(() => {
    if (!isLoggedIn) {
      //making a call to auth server to check if the user is logged in.
      const loginData = {
        user,
        password,
      };
      dispatch(setLoadingState("loading"));
      setTimeout(() => {
        axios
          .post("/api/auth/authenticate", { loginData })
          .then(function (response) {
            setLoadingState(false);

            if (response.data.status === "OK") {
              dispatch(setIsLoggedIn(true));
              dispatch(setLoadingState("init"));
              //Save token as cookie
              // setCookie('authToken', response.data.token, { path: '/' });
            } else {
              dispatch(setIsLoggedIn(false));
            }
          });
      }, 4000);
    }
  });

  return (
    //if user is logged in, logout button appears in homepage and their notes are visible
    <div class="container">
      {isLoggedIn && (
        <div>
          <h2> Get Available Rides</h2>
          <div>
              <button onClick={showRides} id="submit">
              Get available Rides
            </button>
          </div>
         
          <div>{responseMessage}</div>
          {isLoggedIn && (
            <div class="logout">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    password: state.userReducer.password,
    isLoggedIn: state.userReducer.isLoggedIn,
    loadingState: state.userReducer.loadingState,
  };
};
export default connect(mapStateToProps)(DriverHomeScreen);
