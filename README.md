# Buyme Ecommerce Platform

Buyme is a full-stack Ecommerce platform built with Laravel and React, utilizing Laravel Sanctum for authentication. The platform allows users to buy and sell products, provides detailed information about different products, and offers smart search functionality through the MySQL database. Additionally, products can be sorted by categories.

## Features

- **User Authentication:** Secure user authentication using Laravel Sanctum.
- **Product Management:** Sell and buy products with ease.
- **Product Details:** Get detailed information about different products.
- **Smart Search:** Efficient search functionality to find products quickly.
- **Category Sorting:** Sort products based on different categories.

## How to Use

### Clone the Repository

```bash
git clone https://github.com/your-username/buyme.git
cd buyme
Laravel Backend
Install Dependencies:
bash
Copy code
cd backend
composer install
```
Database Setup:

Configure the .env file with your MySQL database credentials.
Run database migrations:
bash
Copy code
```
php artisan migrate
```
Start Laravel Development Server:
bash
Copy code
```
php artisan serve
```
React Frontend
Install Dependencies:
bash
Copy code
```
cd frontend
npm install
```
Start React Development Server:
bash
Copy code
```
npm start
```
MySQL Database (XAMPP)
Download and Install XAMPP:

XAMPP Download
Start Apache and MySQL Servers:

Launch XAMPP and start both Apache and MySQL servers.
Create Database:

Open phpMyAdmin (http://localhost/phpmyadmin) and create a new database for the project.
Configure Laravel .env File:

Set the database connection details in the Laravel .env file.
Run Migrations:

bash
Copy code
```
cd backend
php artisan migrate
```
Now, you can access the Buyme Ecommerce platform at http://localhost:3000.

Feel free to explore, buy, and sell products on Buyme!

Contributing
Contributions are welcome! Please follow our contribution guidelines.
