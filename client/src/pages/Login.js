import React from "react";
import { connect } from "react-redux";
import "../rideShare.css";
import {
  setUser,
  setPassword,
  setIsLoggedIn,
  setLoadingState,
  setIsDriver,
  setIsRider,
} from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Login = ({ user, password, isLoggedIn, loadingState, isDriver, isRider, dispatch }) => {
  const [isErrorMessage, setIsErrorMessage] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [roleValidate, setRoleValidate] = React.useState("");

  const handleLogIn = () => {
    /*if (role != "rider" || role != "driver") {
      setRoleValidate("Please select role");
      setIsErrorMessage(true);

    } else {*/
      if(role === "driver"){
        dispatch(setIsDriver(true));
        dispatch(setIsRider(false));

      }
      else{
        dispatch(setIsRider(true));
        dispatch(setIsDriver(false));
      }
      setRoleValidate("");
      setIsErrorMessage(false);
      const loginData = {
        role,
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
  if (isLoggedIn && isDriver) {
    return <Redirect to="/DriverHomeScreen" />;
  }
  else if(isLoggedIn && isRider){
    return <Redirect to="/RiderHomeScreen" />;

  }

  //const [user ,setUser]=React.useState('');
  return (
    <div className="container">
      <h2>Login</h2>
      <div class="select">
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="0">Select Role</option>

          <option value="driver">Driver</option>
          <option value="rider">Rider</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          value={user}
          id="email"
          placeholder="UserName"
          onChange={(e) => dispatch(setUser(e.target.value))}
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
          Log in
        </button>
      </div>
      <div className="isa_error">
        {isErrorMessage && <b> Email or Password is incorrect</b>}
        {isErrorMessage && <b> {roleValidate}</b>}
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
    isDriver:state.userReducer.isDriver,
    isRider:state.userReducer.isRider
  };
};
export default connect(mapStateToProps)(Login);
