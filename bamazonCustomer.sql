DROP DATABASE IF EXISTS bamazon_db ;
CREATE DATABASE bamazon_db ;

use bamazon_db;

create table products (
	item_id int auto_increment,
    product_name varchar(100) not null,
    department_name varchar(48) not null,
    price decimal (9,2) not null,
    stock_quantity int (100) not null,
    primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Not another sock", "Clothing", 6.50, 100), ("Car spoiler (too big)", "Auto", 250.00, 10), ("Possible burger", "Food", 12.50, 0),
("Skyrim Definite Edition (for Graphing calculators)", "Games", 60.50, 99), ("Shoes that don't fit", "Clothing", 80.50, 4), 
("Shirt that'll have a hole soon", "Clothing", 18.99, 100), ("80's themed Beer bottle opener", "Misc.", 4.50, 60), 
("Crappy (but cheap) laptop", "Electronics", 250, 25), ("Overpriced water bottle", "Misc.", 28.50, 50), 
("You need this pen", "Misc.", 99.99, 7);

select * from products;