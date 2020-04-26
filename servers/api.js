const express = require("express");
var mysql = require("mysql");
const app = express();
const axios = require("axios");
const port = 5000;

app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Login@12345",
  database: "Final_project",
});

con.connect(function (err) {
  if (err) throw err;
  // if (err) {
  //   console.log(err);
  //   process.exit(1);
  // }

  app.post("/api/auth/DriverCreate", (req, res) => {
    console.log(req.body);
    const { did, dname, lic_no, Driver_contact } = req.body;
    let sql =
      "INSERT INTO driver (did, dname, lic_no, Driver_contact) VALUES (";
    let values = sql + `${did}, '${dname}', '${lic_no}', '${Driver_contact}')`;
    console.log(values);
    con.query(values, (err, result) => {
      if (err) {
        console.log("error");
        res.send({ valid: false });
      } else {
        console.log("row inserted");
        res.send({ valid: true });
      }
    });
  });

  app.post("/api/auth/RiderCreate", (req, res) => {
    console.log(req.body);
    const { rid, Rname, Rider_contact } = req.body;
    let sql =
      "INSERT INTO rider (rid, Rname, Rider_contact) VALUES (";
    let values = sql + `${rid}, '${Rname}', '${Rider_contact}')`;
    console.log(values);
    con.query(values, (err, result) => {
      if (err) {
        console.log("error");
        res.send({ valid: false });
      } else {
        console.log("row inserted");
        res.send({ valid: true });
      }
    });
  });

  app.post("/api/auth/authenticate", (req, res) => {
    const { userName, password } = req.body;
    con.query("select did from driver", (err, result) => {
      if (err) console.log(err);
      let did = result;
      console.log(did);
    });
  });
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
