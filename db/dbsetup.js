const db = require("./db");

const tableName = "schools";
const dbName = "schoolDB";

const createDatabase = () => {
  db.query(`SHOW DATABASES LIKE '${dbName}'`, (err, result) => {
    // query to check if the database already exist
    if (err) {
      console.log(err.sqlMessage);
    }
    if (result.length > 0) {
      console.log("Database already exists");
    } else {
      db.query(`CREATE DATABASE ${dbName}`, (err, result) => {
        // query to create a database
        if (err) {
          console.log(err.sqlMessage);
        }
        console.log(
          `Database ${dbName} created, Following this kindly update the sql config `
        );
      });
    }
  });
};

const createTable = () => {
  const tableCreation = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), latitude FLOAT, longitude FLOAT)`;
  db.query(tableCreation, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      return;
    }
    console.log(`Table '${tableName}' created`);
  });
};

const initializeDatabase = () => {
  createDatabase();
  createTable();
};

module.exports = initializeDatabase;
