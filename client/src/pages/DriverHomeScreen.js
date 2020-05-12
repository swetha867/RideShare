import React from "react";
import { connect } from "react-redux";
import "../rideShare.css";
import axios from "axios";
import "../App.css";

import {
  setUser,
  setPassword,
  setIsLoggedIn,
  setLoadingState,
} from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";

const DriverHomeScreen = ({
  user,
  password,
  isLoggedIn,
  loadingState,
  dispatch,
  driverId,
}) => {
  const [responseMessage, setResponseMessage] = React.useState([]);
  const [response, setResponse] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [historyStat, setHistoryStat] = React.useState("");
  const [history, setHistory] = React.useState();
  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    dispatch(setUser(""));
    dispatch(setPassword(""));
    console.log("isLoggedin in logout", isLoggedIn);
  };

  const showRides = () => {
    axios
      .post("/api/showRides")
      .then((res) => {
        if (res.data.status) {
          if (res.data.empty) {
            setStatus("empty");
          } else {
            setResponseMessage(res.data.result);
            setResponse("true");
            setStatus("");
            setHistoryStat("");
          }
        } else {
          console.log("Error is showrides");
          setResponse("false");
        }
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  const rideSelect = (location, tid, acc, rej) => {
    console.log(`${location}, ${tid}, ${acc}, ${rej}`);
    const body = {
      did: driverId,
      tid: tid,
      accepts: acc,
      rejects: rej,
    };
    axios
      .post("/api/rideSelect", body)
      .then((res) => {
        if (res.data.status) {
          if (acc === "1") {
            setStatus("accepted");
          } else if (rej === "1") {
            setStatus("rejected");
          }
        } else {
          console.log("Error in accepting ride");
          setStatus("");
        }
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  const RidesHistory = () => {
    const body = {
      did: driverId,
    };
    axios
      .post("/api/ridesHistory", body)
      .then((res) => {
        if (res.data.status) {
          let result = res.data.result;
          setHistory(result);
          setHistoryStat("true");
          setResponse("");
          if (result.length === 0) {
            setHistoryStat("empty");
            setResponse("");
          }
        } else {
          console.log("Error is rides history");
          setResponse("");
          setHistoryStat("error");
        }
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  return (
    //if user is logged in, logout button appears in homepage and their notes are visible
    <div className="container">
      {isLoggedIn && (
        <div>
          <h2> Get Available Rides</h2>
          <div>
            <button onClick={showRides} id="submit">
              Get available Rides
            </button>
          </div>
          <div>
            <button onClick={RidesHistory}>Rides History</button>
          </div>
          {historyStat === "true" && (
            <div>
              <b>Your previous rides:</b>
              {history.map((values, index) => (
                <div key={index}>{values.rusername}</div>
              ))}
            </div>
          )}
          {historyStat === "empty" && <div>You have no rides history</div>}
          <div>
            {response === "true" &&
              responseMessage.map((res, index) => (
                <div key={index} className="d-flex">
                  {res.from_location}
                  <button
                    name={res.from_location}
                    onClick={() => {
                      let accepts = "1";
                      let rejects = "0";
                      return rideSelect(
                        res.from_location,
                        res.tid,
                        accepts,
                        rejects
                      );
                    }}
                    className="button d-flex"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      let accepts = "0";
                      let rejects = "1";
                      return rideSelect(
                        res.from_location,
                        res.tid,
                        accepts,
                        rejects
                      );
                    }}
                    className="button d-flex"
                  >
                    Reject
                  </button>
                </div>
              ))}
          </div>
          {status === "accepted" && <b>Ride is accepted</b>}
          {status === "rejected" && <b>Ride is rejected</b>}
          {status === "empty" && <b>No available rides to display</b>}
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
    driverId: state.userReducer.driverId,
  };
};
export default connect(mapStateToProps)(DriverHomeScreen);
