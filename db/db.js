const mysql = require("mysql");

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Database server hostname (default is localhost)
  user: process.env.DB_USERNAME, // Username for the MySQL database
  password: process.env.DB_PASSWORD, // Password for the MySQL user
  database: process.env.DB_DBNAME, // Name of the database to connect to
  port: process.env.DB_PORT,
});

// Establish the database connection
connection.connect((err) => {
  if (err) {
    // Log the error message if the connection fails
    console.log(err.sqlMessage);
    return;
  }
  // Log a success message if the connection is successful
  console.log("SQL connected!");
});

module.exports = connection;
