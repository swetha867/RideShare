const express = require("express");
var mysql = require('mysql');
const app = express();
const axios = require("axios");
const port = 3005;

app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "rideshare"

});

con.connect(function(err) {
  if (err) throw err;
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("Connected!");
  


  app.use((req, res, next) => {
    //logging the endpoint url
    console.log("original url " + req.originalUrl);
    next();
  });
  app.post("/api/auth/create", (req, res) => {
    console.log(req.headers);
    console.log("AuthService server", req.body.userData);
    const { userName, email, password, } = req.body.userData;
    var sql = "INSERT INTO RIDER (userName,email, password) VALUES ?";
    var values = 
      [userName, email,password];
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  app.post("/api/auth/authenticate", (req, res) => {

    
  });
  });
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
