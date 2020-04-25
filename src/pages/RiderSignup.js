import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "../rideShare.css";
import "../App.css";
import { setLoadingState } from "../redux/actions/userActions";
const Signup = ({ loadingState, dispatch }) => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isErrorMessage, setIsErrorMessage] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState(false);

  const handleSignUp = () => {
    //  dispatch(setLoadingState("loading"));
    const userData = {
      userName,
      email,
      password,
    };
    //var headers = { 'Content-Type': 'application/json' }
    axios
      .post("/api/auth/create", { userData })
      .then(function (response) {
        dispatch(setLoadingState("init"));

        if (response.data === "OK") {
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
      <div id="signup">
        <input
          type="text"
          value={userName}
          id="last"
          placeholder="userName"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSignUp} id="send">
          SignUp
        </button>
      </div>
      <div class="isa_error">
        {isErrorMessage && <b> UserName or email is already taken</b>}
      </div>
      <div class="isa_success">
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
