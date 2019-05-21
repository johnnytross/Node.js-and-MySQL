//Dependencies include mysql for the DB, inquirer for prompts, and express
const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require('express');

const connection = mysql.createConnection({
  //Not using local host, this is the IP of a docker machine that is hosting
  host: "192.168.99.100",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "docker",
  //DB
  database: "bamazon_db"
});
  
//The connection and throw an error if it doesn't connect
connection.connect(function(err) {
  if (err) {
    console.log("error:" + err.stack)
  }
  //Let me know if it does connect
  console.log("DB connected!")
  //Start the first query
  initialQuery()
});



function initialQuery(){
  connection.query("SELECT product_name, price, item_id, stock_quantity FROM products", function(err, results) {
    if (err) throw err;
    console.log('----------------------------------------------------')
    for (i = 0; i < results.length; i++){
      console.log("ID:"+results[i].item_id + " |", "Product: " + results[i].product_name + " | ", "Price: $" + results[i].price)
      
    }
    console.log('----------------------------------------------------')
   inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: "Please enter the ID of the product you'd like to buy."
      },
      {
        name: 'units',
        type: 'input',
        message: 'How many units would you like to buy?'
      }
    ])
    .then(function(answer){
      if (results[answer.id - 1].stock_quantity > answer.units){

          let quantity = results[answer.id - 1].stock_quantity - answer.units;
          // console.log(quantity);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: quantity
              },
              {
                item_id: answer.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Database update successful");
              //function could go here
            }
          );
          console.log('----------------------------------------------------')
          console.log("number of units: " + answer.units)
          console.log("Your total is $"+(results[answer.id - 1].price)*answer.units)
          console.log(results[answer.id - 1].stock_quantity - answer.units + " units left in stock.")
          initialQuery()
      }
      else {
        console.log("Insufficient quantity!");
        initialQuery()
      }
      // get back the stock the user wants to buy console.log(answer.units)
      // get the ID back from user | console.log(answer.id);
      // get the stock quantity back, based on which item the user picked | console.log(results[answer.id - 1].stock_quantity)
    })
  
  });
}
  


