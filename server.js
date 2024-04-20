const mongoose = require('mongoose');
const DailyCalories = require('./models/dailyCaloriesSchema');
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const moment = require('moment');

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log('Connected to MongoDB');
    })

// View req method and path for troubleshooting
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
// built-in middleware to handle urlencoded data
// in other words, form data:
//'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: true }));
// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
})

app.get('/view-calories-history', async (req, res) => {
    // Fetch data from the database for calorie history
    // First I want to start by showing the totalConsumedCalories
    const totalCaloriesHistory = await DailyCalories.find({}).select('-_id totalConsumedCalories');
    if (!totalCaloriesHistory) {
        return res.status(404).send('No data found!');
    }
    res.json(totalCaloriesHistory);
})

app.get('/view-calories-by-day', async (req, res) => {
    let { date } = req.query;
    // parse the date string into a Date object
    const parsedDate = moment(date, 'YYYY-MM-DD').toDate();
    const calorieData = await DailyCalories.findOne({ date: parsedDate });
    if (!calorieData) {
        return res.status(404).send('No data found for that date!');
    }
    res.json([calorieData]); // Pass obj inside an array to client
})

app.get('/edit-calories', async (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'edit-calories.html'));
})

app.put('/edit-calories/:id', async (req, res) => {
    const updatedCalories = await DailyCalories.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updatedCalories) {
        return res.status(404).send('User not found');
    } else {
        res.status(200).send('Data updated successfully');
    }
})

app.delete('/delete-record/:id', async (req, res) => {
    const deletedRecord = await DailyCalories.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
        return res.status(404).send('User not found');
    } else {
        res.status(200).send('Data deleted successfully');
    }
})

app.post('/save-daily-calories', (req, res) => {
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

app.get('/*', (req, res) => {
    res.status(404).send('404 Not Found');
})

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});