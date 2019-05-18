// var express = require('express');
// var app = express();
// var sql = require("mssql");
// var inquirer = require("inquirer");

// app.get('/', function (req, res) {
   


//     // config for your database
//     var config = {
//         user: 'root',
//         password: 'docker',
//         server: 'localhost', 
//         database: 'bamazon_db' 
//     };

//     // connect to your database
//     sql.connect(config, res, function (err) {
    
//         if (err) console.log(err);

//         // create Request object
//         var request = new sql.Request();

//         test()
            
        
//     });
// });


// function test(){
//   app.query("SELECT * FROM products", function(err, results) {
//     if (err) throw err;
//     console.log(results);
//   })
// }

// var server = app.listen(5000, function () {
//     console.log('Server is running..');
// });


const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require('express');

const connection = mysql.createConnection({
  host: "192.168.99.100",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "docker",
  database: "bamazon_db"
});
  
connection.connect(function(err) {
  if (err) {
    console.log("error:" + err.stack)
  }
  console.log("DB connected!")
});
  


