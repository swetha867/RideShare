const express = require("express");
var mysql = require("mysql");
const app = express();
const axios = require("axios");
const port = 5000;

app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "rideshare",
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
        `'${dname}', '${lic_no}', '${Driver_contact}', '${DuserName}', '${Dpassword}')`;
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
    } else if (req.body.role == "rider") {
      const { RuserName, Rpassword, Rname, Rider_contact } = req.body;
      let sql =
        "INSERT INTO rider (Rusername, Rpassword, Rname, Rider_contact) VALUES (";
      let sqlQuery =
        sql + `'${RuserName}', '${Rpassword}', '${Rname}', '${Rider_contact}')`;
      console.log(sqlQuery);
      con.query(sqlQuery, (error, results, fields) => {
        if (error) {
          console.error("An error occurred while executing the query");
          res.send({ valid: false });
          throw error;
        }
        console.log("row inserted");
        res.send({ valid: true });
      });
    }
  });

  app.post("/api/auth/authenticate", (req, res) => {
    const { role, user, password } = req.body.loginData;
    console.log(role,user,password);
    if (role == "rider") {
      var sql = "SELECT * FROM rider WHERE RuserName = "+`'${user}'`+ "AND Rpassword ="+`'${password}'` ;
      console.log(sql);
      con.query(sql, function (err, result) {
        try{
        console.log(result.length);
        if(result.length>0){  
        res.send({ status: "OK" });
        }else{
        res.send({ status: "error" });
        }
      }
      catch(err){
        console.log(err)
        res.send({ status: "error" });
      }
      })

    } else if (role == "driver") {
      var sql = "SELECT * FROM driver WHERE DuserName = "+`'${user}'`+ "AND Dpassword ="+`'${password}'` ;
      console.log(sql);
      con.query(sql, function (err, result) {
        try{
        console.log(result.length);
        if(result.length>0){  
        res.send({ status: "OK" });
        }else{
        res.send({ status: "error" });
        }
      }
      catch(err){
        console.log(err)
        res.send({ status: "error" });
      }
      })
    }
  });
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
