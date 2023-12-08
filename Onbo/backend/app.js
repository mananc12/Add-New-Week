const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Parse incoming JSON data

const dataFilePath = 'db.json';

// Function to read data from the file
const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data from file:', err);
    return { weeks: [] };
  }
};

// Function to write data to the file
const writeDataToFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
  } catch (err) {
    console.error('Error writing data to file:', err);
  }
};

app.get('/', (req, res) => {
  const data = readDataFromFile();
  res.json(data);
});

// POST endpoint to add a new week
app.post('/api/weeks', (req, res) => {
  const { nameWeeksBeforeWeekAdded, nameWeeksAfterWeekAdded } = req.body;

  if (nameWeeksBeforeWeekAdded && Array.isArray(nameWeeksBeforeWeekAdded)) {
    // Handle the 'before' week data
    const newData = { weeks: [...nameWeeksBeforeWeekAdded] };
    writeDataToFile(newData);
    console.log('Updated weeks array:', JSON.stringify(newData, null, 2));//console.log statement
    return res.json({ message: 'Weeks added successfully', weeks: newData.weeks });
  } else if (nameWeeksAfterWeekAdded && Array.isArray(nameWeeksAfterWeekAdded)) {
    // Handle the 'after' week data
    const newData = { weeks: [...nameWeeksAfterWeekAdded] };
    writeDataToFile(newData);
    console.log('Updated weeks array:', JSON.stringify(newData, null, 2)); // console.log statement

    return res.json({ message: 'Weeks added successfully', weeks: newData.weeks });
  } else {
    return res.status(400).json({ error: 'Invalid data format' });
  }
});
  

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
