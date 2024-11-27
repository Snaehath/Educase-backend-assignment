const degreesToRadians = (degrees) => {
  // Multiply degrees by (π / 180) to get radians
  return degrees * (Math.PI / 180);
};

// Function to calculate the "crow flies" (straight-line) distance between two coordinates
// Parameters:
// - userLat: Latitude of the user's location
// - userLon: Longitude of the user's location
// - schoolLat: Latitude of the school's location
// - schoolLon: Longitude of the school's location

const getCrowDistanceBetweenCoords = (
  userLat,
  userLon,
  schoolLat,
  schoolLon
) => {
  const earthRadiusKm = 6371;
  const dLat = degreesToRadians(schoolLat - userLat);
  const dLon = degreesToRadians(schoolLon - userLon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(userLat)) *
      Math.cos(degreesToRadians(schoolLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;
  return Math.round(distance * 100) / 100;
};

module.exports = getCrowDistanceBetweenCoords;
