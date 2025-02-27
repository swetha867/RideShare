import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "../rideShare.css";
import "../App.css";
import { setLoadingState } from "../redux/actions/userActions";
const Signup = ({ loadingState, dispatch }) => {
  const [RuserName, setUser] = React.useState("");
  const [Rpassword, setPassword] = React.useState("");
  const [rid, setRid] = React.useState("");
  const [Rname, setRname] = React.useState("");
  const [Rider_contact, setContact] = React.useState("");
  const [isErrorMessage, setIsErrorMessage] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState(false);

  const handleSignUp = () => {
    //  dispatch(setLoadingState("loading"));
   const role='rider';
    const userData = {
      role, Rname, Rider_contact, RuserName, Rpassword
    };
    //var headers = { 'Content-Type': 'application/json' }
    axios
      .post("/api/auth/Create", userData)
      .then(function (response) {
        dispatch(setLoadingState("init"));

        if (response.data.valid) {
          setResponseMessage(true);
          setIsErrorMessage(false);
        } else {
          setResponseMessage(false);
          setIsErrorMessage(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <p>Please fill in this form to create Rider account.</p>
      <div id="user">
        <input
          type="text"
          value={RuserName}
          id="user"
          placeholder="username"
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div id="password">
        <input
          type="password"
          value={Rpassword}
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          id="rname"
          placeholder="name"
          value={Rname}
          onChange={(e) => setRname(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={Rider_contact}
          id="contact"
          placeholder="Contact Number"
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSignUp} id="send">
          SignUp
        </button>
      </div>
      <div className="isa_error">
        {isErrorMessage && <b> UserName or email is already taken</b>}
      </div>
      <div className="isa_success">
        {responseMessage && <b> Your Account is created . Please Login</b>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingState: state.userReducer.loadingState,
  };
};
export default connect(mapStateToProps)(Signup);
