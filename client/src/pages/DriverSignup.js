import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "../rideShare.css";
import "../App.css";
import { setLoadingState } from "../redux/actions/userActions";
const Signup = ({ loadingState, dispatch }) => {
  const [did, setDid] = React.useState("");
  const [lic_no, setLicNo] = React.useState("");
  const [dname, setDname] = React.useState("");
  const [Driver_contact, setContact] = React.useState("");
  const [isErrorMessage, setIsErrorMessage] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState(false);

  const handleSignUp = () => {
    //  dispatch(setLoadingState("loading"));
    const userData = {
      did,
      dname,
      lic_no,
      Driver_contact,
    };
    //var headers = { 'Content-Type': 'application/json' }
    axios
      .post("/api/auth/DriverCreate", userData)
      .then((response) => {
        dispatch(setLoadingState("init"));
        console.log(response);

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
      <p>Please fill in this form to create Driver account.</p>
      <div id="signup">
        <input
          type="text"
          value={did}
          id="last"
          placeholder="did"
          onChange={(e) => setDid(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={dname}
          id="dname"
          placeholder="driver name"
          onChange={(e) => setDname(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          id="lic_no"
          placeholder="Licence Number"
          value={lic_no}
          onChange={(e) => setLicNo(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          id="Driver_contact"
          placeholder="Contact"
          value={Driver_contact}
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
