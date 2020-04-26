import React from "react";
import { connect } from "react-redux";
import "../rideShare.css";
import {
  setUser,
  setPassword,
  setIsLoggedIn,
  setLoadingState,
} from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Login = ({ user, password, isLoggedIn, loadingState, dispatch }) => {
  const [isErrorMessage, setIsErrorMessage] = React.useState(false);
  const [role, setRole] = React.useState("");

  const handleLogIn = () => {
    const loginData = {
      user,
      password,
    };
    dispatch(setLoadingState("loading"));

    axios
      .post("/api/auth/authenticate", { loginData })
      .then(function (response) {
        setLoadingState(false);

        if (response.data.status === "OK") {
          dispatch(setIsLoggedIn(true));
          dispatch(setLoadingState("init"));
        } else {
          setIsErrorMessage(true);
          dispatch(setIsLoggedIn(false));
        }
      });
  };
  if (isLoggedIn) {
    return <Redirect to="Home" />;
  }

  //const [user ,setUser]=React.useState('');
  return (
    <div className="container">
      <h2>Login</h2>
      <div>
        <label>
          Select your role:
          <select onChange={(e) => dispatch(setRole(e.target.value))}>
            <option value="Driver">Driver</option>
            <option value="Rider">Rider</option>
          </select>
        </label>
      </div>
      <div>
        <input
          type="text"
          value={user}
          id="email"
          placeholder="Email"
          onChange={(e) => dispatch(setUser(e.target.value))}
          placeholder="Enter Email"
          name="uname"
          required
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
      </div>
      <div>
        <button onClick={handleLogIn} id="login">
          {" "}
          Log in
        </button>
      </div>
      <div className="isa_error">
        {isErrorMessage && <b> Email or Password is incorrect</b>}
      </div>
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
export default connect(mapStateToProps)(Login);
