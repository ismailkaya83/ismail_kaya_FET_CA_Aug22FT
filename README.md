# REST API - Course Assignment
# Application Installation and Usage Instructions
1. Download the file
2. Open the file via VS Code
3. Create DB using script below
4. Create a .env file and paste Environment Variables below into it
5. Install npm by entering terminal 'npm install'. This would install all required libraries and packages.
6. Test the app by entering terminal 'npm test'. This would run all the tests.

# DATABASE SETUP-
STEP 1: Create the database in MySQL Workbench:

Use the following SQL script to create the “myTodo” MySQL Database for this course assignment:

CREATE SCHEMA `myTodo`;

STEP 2: Create the database user in MySQL Workbench:

Use the following SQL script to create an “admin” Database User with all database privileges:

CREATE USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'P@ssw0rd';
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'P@ssw0rd';
GRANT ALL PRIVILEGES ON database_name.* TO 'admin'@'localhost';

# Environment Variables

HOST="localhost"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="P@ssw0rd"
DATABASE_NAME="myTodo"
DIALECT="mysql"
PORT="3000"
TOKEN_SECRET=824b1b6c6b321f3b8ec7769a628d5e3c78b76c50b1ea5f3718a2bfa5e458fe90bacd2d22862b288ca0067cde33abb81bbb483fd72ee47d81fbcaf4bb840c5ea0
TEST_EMAIL=ismail@yahoo.com
TEST_PASSWORD=1234

# Additional Libraries/Packages

- To use the MySQL Server database in NodeJS applications, we will need a mysql2 package.
- mysql is a Node.js driver for MySQL. It is written in JavaScript, does not require compiling, and is 100% MIT licensed.
- Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, read replication and more.
- dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
- nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
  Run npm run dev to start the application in development mode.
- Express-session is a middleware that allows you to store session data on the client side.
- Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application.

# NodeJS Version Used
- v18.12.1

# POSTMAN Documentation link

https://documenter.getpostman.com/view/23032598/2s93XyU3Nq
Todo Api Document.pdf

