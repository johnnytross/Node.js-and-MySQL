# Node.js-and-MySQL

1. First, open Visual Studio and locate the bamazonCustomer.js file. 

2. On the left side of Visual Studio, locate the file name and right click on it. Select open in Terminal.

3. In the terminal, run the command nodemon bamazonCustomer.js
![nodemon command](/step1Bamazon.png)
    
4. It will now display the current products that are for sale, listed by ID, name and price. 
 ![Product Listing](Node.js-and-MySQL\step2Bamazon.png)
    
5. You will be prompted to enter the ID of the product you would like to buy. And then you will be prompted to enter the quantity that you want of the selected product 
     ![Prompt ID quantity](Node.js-and-MySQL\step3Bamazon.png)
    
6. Now it should display the number of units, price, the amount of stock left and that the Database update was successful 
    ![Prompt ID quantity](Node.js-and-MySQL\step4Bamazon.png)
    
7. However, if you were to input a quantity higher than what is available, you will get the "Insufficient quantity!" message.
    ![Prompt ID quantity](Node.js-and-MySQL\BamazonInsufficientQuantity.png)
