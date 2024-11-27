const express = require("express");
const router = express.Router();
const db = require("../db/db");
const distanceCalulate = require("../utils/distanceCalculator");
const validator = require("../utils/validateSchool");

// Route to add a new school to the database
router.post("/addSchool", (req, res) => {
  const tableName = "schools";
  const schools = req.body; // Expecting array of school objects from the request body

  // Check if the input is an array
  if (!Array.isArray(schools) || schools.length === 0) {
    return res
      .status(400)
      .json("Input must be a non-empty array of school objects.");
  }

  // Validate each school object in the array
  for (const school of schools) {
    const error = validator(school);
    if (error) {
      return res.status(400).json(error); // Respond with the first validation error
    }
  }

  const insertValues = `INSERT INTO ${tableName} (name, address, latitude, longitude) VALUES ?`;

  const values = schools.map((school) => [
    school.name,
    school.address,
    school.latitude,
    school.longitude,
  ]);

  db.query(
    insertValues,
    [values], // Pass dynamic values as parameters
    (err, result) => {
      if (err) {
        // If an error occurs, send the SQL error message
        return res.json(err.sqlMessage);
      }
      // Respond with the number of records inserted
      return res.status(200).json("record inserted " + result.affectedRows);
    }
  );
});

// Route to list all schools sorted by proximity to user's location
router.get("/listSchools/:coordinates", (req, res) => {
  const tableName = "schools";
  const { coordinates } = req.params; // Get the user's coordinates from the route parameters
  const [latitude, longitude] = coordinates.split(","); // Split coordinates into latitude and longitude

  // Query to fetch all schools from the database
  db.query(`SELECT * FROM ${tableName}`, (err, result, fields) => {
    if (err) {
      // If an error occurs, send the SQL error message
      return res.json(err.sqlMessage);
    }

    // Map over the results to calculate the distance of each school from the user
    const schoolWithDistance = result.map((school) => {
      const { latitude: schoolLat, longitude: schoolLon } = school; // Extract school's latitude and longitude
      const distance = distanceCalulate(
        latitude,
        longitude,
        schoolLat,
        schoolLon
      );
      return { ...school, distance }; // Add the distance property to each school object
    });

    // Sort schools based on distance in ascending order
    const sortSchools = schoolWithDistance.sort(
      (a, b) => a.distance - b.distance
    );

    // Send the sorted list of schools as a response
    return res.status(200).send(sortSchools);
  });
});

// Route to delete a record from the "customers" table based on a specific address
router.delete("/:uid", (req, res) => {
  const { uid } = req.params;
  const sql = "DELETE FROM customers WHERE id = ? OR name = ? OR address = ?"; // Hardcoded query to delete specific rows
  db.query(sql, [uid, uid, uid], (err, result) => {
    if (err) {
      // If an error occurs, send the SQL error message
      return res.json(err.sqlMessage);
    }
    // Respond with the number of rows deleted
    return res
      .status(200)
      .json("Number of rows deleted: " + result.affectedRows);
  });
});

module.exports = router;
