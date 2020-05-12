const express = require("express");
var mysql = require("mysql");
const app = express();
const axios = require("axios");
const port = 5000;

app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "password",
  // database: "rideshare",
  password: "Login@12345",
  database: "Final_project",
});

con.connect(function (err) {
  if (err) throw err;
  // if (err) {
  //   console.log(err);
  //   process.exit(1);
  // }

  app.post("/api/auth/Create", (req, res) => {
    if (req.body.role == "driver") {
      const { dname, lic_no, Driver_contact, DuserName, Dpassword } = req.body;
      let sql =
        "INSERT INTO driver (dname, lic_no, Driver_contact, Dusername, Dpassword) VALUES (";
      let values =
        sql +
        `'${dname}', '${lic_no}', '${Driver_contact}', '${DuserName}', '${Dpassword}');`;
      con.query(values, (err, result) => {
        if (err) {
          console.log("error");
          res.send({ valid: false });
        } else {
          res.send({ valid: true });
        }
      });
    } else if (req.body.role == "rider") {
      const { RuserName, Rpassword, Rname, Rider_contact } = req.body;
      let sql =
        "INSERT INTO rider (Rusername, Rpassword, Rname, Rider_contact) VALUES (";
      let sqlQuery =
        sql + `'${RuserName}', '${Rpassword}', '${Rname}', '${Rider_contact}')`;
      con.query(sqlQuery, (error, results, fields) => {
        if (error) {
          console.error("An error occurred while executing the query");
          res.send({ valid: false });
          throw error;
        } else {
          res.send({ valid: true });
        }
      });
    }
  });

  app.post("/api/auth/authenticate", (req, res) => {
    const { role, user, password } = req.body.loginData;
    if (role == "rider") {
      var sql =
        "SELECT * FROM rider WHERE RuserName = " +
        `'${user}'` +
        "AND Rpassword =" +
        `'${password}'`;
      con.query(sql, function (err, result) {
        try {
          if (result.length > 0) {
            res.send({ status: "OK" });
          } else {
            res.send({ status: "error" });
          }
        } catch (err) {
          console.log(err);
          res.send({ status: "error" });
        }
      });
    } else if (role == "driver") {
      var sql =
        "SELECT did FROM driver WHERE DuserName = " +
        `'${user}'` +
        "AND Dpassword =" +
        `'${password}'`;
      con.query(sql, function (err, result) {
        try {
          if (result.length > 0) {
            res.send({ status: "OK", didStatus: "true", did: result });
          } else {
            res.send({ status: "error" });
          }
        } catch (err) {
          console.log(err);
          res.send({ status: "error" });
        }
      });
    }
  });

  app.post("/api/auth/carCreate", (req, res) => {
    const { carModel, carname, lic_no } = req.body;
    let carSql = "insert into car (cid, color, model) values (";
    let carValues = carSql + `'${lic_no}', '${carname}', '${carModel}');`;
    con.query(carValues, (err, res1) => {
      if (err) {
        console.log("Error");
        res.send({ valid: false });
      } else {
        res.send({ valid: true });
      }
    });
  });

  app.post("/api/postRide", (req, res) => {
    const { toLocation, fromLocation } = req.body;
    let trip = "insert into Trip (to_location, from_location) values (";
    let tripValues = trip + `'${toLocation}', '${fromLocation}');`;
    con.query(tripValues, (err, res1) => {
      if (err) {
        console.log("Error");
        res.send({ status: false });
      } else {
        res.send({ status: true });
      }
    });
  });

  app.post("/api/showRides", (req, res) => {
    let rides =
      "select from_location, tid from trip where tid not in( select tid from gets);";
    con.query(rides, (err, res1) => {
      if (err) {
        console.log("error");
        res.send({ status: false });
      } else if (res1.length === 0) {
        res.send({ status: true, empty: true });
      } else {
        res.send({ status: true, result: res1 });
      }
    });
  });

  app.post("/api/rideSelect", (req, res) => {
    const { did, tid, accepts, rejects } = req.body;
    let rides = `insert into gets (did, tid, accepts, rejects) values ('${did}', '${tid}', '${accepts}', '${rejects}');`;
    con.query(rides, (err, res1) => {
      if (err) {
        console.log("error");
        res.send({ status: false });
      } else {
        console.log(res1);
        res.send({ status: true });
      }
    });
  });

  app.post("/api/ridesHistory", (req, res) => {
    const { did } = req.body;
    let rides =
      `select r.rusername from rider r, pays p where r.rid=p.rid group by p.did,r.rid having p.did=${did};`;
    con.query(rides, (err, res1) => {
      if (err) {
        console.log("error");
        res.send({ status: false });
      } else {
        res.send({ status: true, result: res1 });
      }
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
