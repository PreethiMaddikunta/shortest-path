// server.js

const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const { permutations } = require('./permutations');

app.use(cors());
app.use(bodyParser.json());

// Load city data from a JSON file
const cityData = JSON.parse(fs.readFileSync('cities.json', 'utf8'));

// API endpoint to serve city data
app.get('/api/cities', (req, res) => {
  res.json(cityData);
});

// API endpoint to calculate the shortest path
app.post('/api/shortest-path', (req, res) => {
  const selectedCities = req.body.selectedCities;

  if (selectedCities.length < 2) {
    res.json(selectedCities); // If there are 1 or 0 cities, the path is the same
    return;
  }

  // Generate all possible permutations of the selected cities
  const cityPermutations = permutations(selectedCities);

  // Initialize variables to store the shortest path and distance
  let shortestPath = cityPermutations[0];
  let shortestDistance = calculateTotalDistance(cityPermutations[0]);

  // Calculate the total distance for each permutation and find the shortest path
  for (const permutation of cityPermutations) {
    const distance = calculateTotalDistance(permutation);
    if (distance < shortestDistance) {
      shortestDistance = distance;
      shortestPath = permutation;
    }
  }

//   const shortestPath = selectedCities.reverse();
  res.json(shortestPath);
});

// Helper function to calculate the total distance of a path
function calculateTotalDistance(path) {
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const city1 = path[i];
      const city2 = path[i + 1];
    }
    return totalDistance;
  }


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
