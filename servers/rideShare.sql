Create database rideshare;
use rideshare;
DROP TABLE Rider;

DROP TABLE Driver;



CREATE TABLE Rider (
rid INTEGER auto_increment Primary Key, 
RuserName CHAR(20),
Rpassword char(20),
Rname CHAR(20), 
Rider_contact VARCHAR(32), 
R_Rating DECIMAL(10,2));


ALTER TABLE Rider AUTO_INCREMENT = 500;

CREATE TABLE Driver (
Did INTEGER auto_increment Primary Key, 
DuserName CHAR(20),
Dpassword char(20),
Dname CHAR(20),
lic_no VARCHAR(32), 
Driver_contact VARCHAR(32), 
D_rating DECIMAL(10,2));

ALTER TABLE Rider AUTO_INCREMENT = 100;
