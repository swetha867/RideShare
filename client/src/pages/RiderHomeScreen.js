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

const Home = ({ user, password, isLoggedIn, loadingState, dispatch }) => {
  const [fromLocation, setFromLocation] = React.useState("");
  const [toLocation, setToLocation] = React.useState("");

  const [responseMessage, setResponseMessage] = React.useState("");

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    dispatch(setUser(""));
    dispatch(setPassword(""));
    console.log("isLoggedin in logout", isLoggedIn);
  };

  const counter = 0;
  const postRide = () => {
    const rideDetails = {
      fromLocation,
      toLocation,
    };

    axios
      .post("/api/postRide", rideDetails)
      .then((res) => {
        if (res.data.status) {
          console.log("ride is posted");
          setResponseMessage("Ride is posted");
        } else {
          console.log("ride not posted");
          setResponseMessage("Ride is not posted");
        }
      })
      .catch((e) => {
        console.log("error");
      });
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
    <div className="container">
      {isLoggedIn && (
        <div>
          <h2> Post your Ride</h2>
          <div>
            <input
              type="text"
              id="fromLocation"
              value={fromLocation}
              placeholder="Enter From Location"
              onChange={(e) => setFromLocation(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="text"
              id="toLocation"
              value={toLocation}
              placeholder="Enter To Location"
              onChange={(e) => setToLocation(e.target.value)}
            ></input>
          </div>
          <div>
            <button onClick={postRide} id="submit">
              Post Ride
            </button>
          </div>

          <div>{responseMessage}</div>
          {isLoggedIn && (
            <div className="logout">
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
export default connect(mapStateToProps)(Home);
