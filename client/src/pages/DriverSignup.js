import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "../rideShare.css";
import "../App.css";
import { setLoadingState } from "../redux/actions/userActions";
const Signup = ({ loadingState, dispatch }) => {
  const [DuserName, setUser] = React.useState("");
  const [Dpassword, setPassword] = React.useState("");
  const [lic_no, setLicNo] = React.useState("");
  const [dname, setDname] = React.useState("");
  const [carname, setCarName] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [Driver_contact, setContact] = React.useState("");
  const [isErrorMessage, setIsErrorMessage] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState(false);

  const handleSignUp = () => {
    //  dispatch(setLoadingState("loading"));
    const role = "driver";
    const userData = {
      role,
      DuserName,
      Dpassword,
      dname,
      lic_no,
      Driver_contact,
    };
    const carData = {
      carname,
      carModel,
      lic_no,
    }
    //var headers = { 'Content-Type': 'application/json' }
    axios
      .post("/api/auth/Create", userData)
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

    axios
      .post("/api/auth/carCreate", carData)
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
          value={DuserName}
          id="user"
          placeholder="username"
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div id="password">
        <input
          type="password"
          value={Dpassword}
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
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
        <input
          type="text"
          value={carname}
          id="carName"
          placeholder="car name"
          onChange={(e) => setCarName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={carModel}
          id="carModel"
          placeholder="car Model"
          onChange={(e) => setCarModel(e.target.value)}
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
