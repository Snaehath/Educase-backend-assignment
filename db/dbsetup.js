const db = require("./db");

const tableName = "schools";

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
  createTable();
};

module.exports = initializeDatabase;
