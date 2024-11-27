// Function to validate individual school objects
const validateSchool = (school) => {
  if (!school.name || typeof school.name !== "string") {
    return "Invalid or missing 'name'.";
  }
  if (!school.address || typeof school.address !== "string") {
    return "Invalid or missing 'address'.";
  }
  if (
    school.latitude === undefined ||
    typeof school.latitude !== "number" ||
    school.latitude < -90 ||
    school.latitude > 90
  ) {
    return "Invalid or missing 'latitude' (must be a number between -90 and 90).";
  }
  if (
    school.longitude === undefined ||
    typeof school.longitude !== "number" ||
    school.longitude < -180 ||
    school.longitude > 180
  ) {
    return "Invalid or missing 'longitude' (must be a number between -180 and 180).";
  }
  return null; // Valid school
};

module.exports = validateSchool;
