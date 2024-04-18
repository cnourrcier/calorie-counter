const mongoose = require('mongoose');
const DailyCalories = require('./models/dailyCaloriesSchema');
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log('Connected to MongoDB');
    })

app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', '/index.html'));
})

// Serve CSS file
app.get('/views/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'styles.css'));
});

// Serve JavaScript file
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.post('/calorie-stats', (req, res) => {
    const dailyCaloriesData = req.body; // the client will send dailyCaloriesObj as JSON
    // Save data to MongoDB
    DailyCalories.create(dailyCaloriesData)
        .then(savedData => {
            res.status(200).send('Data saved successfully');
        })
        .catch(error => {
            console.error('Error saving data:', error);
            res.status(500).send('Internal server error');
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});