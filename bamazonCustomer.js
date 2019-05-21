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


//Query function to run once connection is established
function initialQuery(){
  //using connection query to query the database, select product name, price, id and stock quantity from products
  connection.query("SELECT product_name, price, item_id, stock_quantity FROM products", function(err, results) {
    if (err) throw err;
    console.log('----------------------------------------------------')

    //For the length of the results, print out id, name, and price.
    for (i = 0; i < results.length; i++){
      console.log("ID:"+results[i].item_id + " |", "Product: " + results[i].product_name + " | ", "Price: $" + results[i].price)
      
    }
    console.log('----------------------------------------------------')
    //use inquirer to get information from user
   inquirer
   //prompt asks the user for information
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
    //take the information from prompt, and then use it for the code below
    .then(function(answer){
      //Since the database ID starts at 1 and software counts at 0, take the user's ID answer, subtract by 1 to grab the ID and use that to find 
        // the item quantity and compare the quantity to what the user said. 
      if (results[answer.id - 1].stock_quantity > answer.units){

          let quantity = results[answer.id - 1].stock_quantity - answer.units;
          // run another query to update the products table, using the ID and the quantity calculation made above
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
            }
          );
          console.log('----------------------------------------------------')
          //Console log to the user the number of units they asked for, the price of all units combined calculated below, and the amount of
            // stock left after the user puts in their order
          console.log("number of units: " + answer.units)
          console.log("Your total is $"+(results[answer.id - 1].price)*answer.units)
          console.log(results[answer.id - 1].stock_quantity - answer.units + " units left in stock.")
          initialQuery()
      }
      // If the user asks for more quantity than available for sale, they should get this message 
      else {
        console.log('----------------------------------------------------')
        console.log("Insufficient quantity!");
        initialQuery()
      }
    })
  
  });
}
  


