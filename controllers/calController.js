const DailyCalories = require('../models/dailyCaloriesSchema');
const moment = require('moment');
const path = require('path');



exports.getHomePage = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
};

exports.viewCaloriesHistory = async (req, res) => {
    // Fetch data from the database for calorie history
    // First I want to start by showing the totalConsumedCalories
    const totalCaloriesHistory = await DailyCalories.find({}).select('-_id totalConsumedCalories');
    if (!totalCaloriesHistory) {
        return res.status(404).send('No data found!');
    }
    res.json(totalCaloriesHistory);
};

exports.viewCaloriesByDay = (async (req, res) => {
    let { date } = req.query;
    // parse the date string into a Date object
    const parsedDate = moment(date, 'YYYY-MM-DD').toDate();
    const calorieData = await DailyCalories.findOne({ date: parsedDate });
    if (!calorieData) {
        return res.status(404).send('No data found for that date!');
    }
    res.json([calorieData]); // Pass obj inside an array to client
});

exports.getEditCaloriesPage = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'edit-calories.html'));
};

exports.editCaloriesById = (async (req, res) => {
    const updatedCalories = await DailyCalories.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updatedCalories) {
        return res.status(404).send('User not found');
    } else {
        res.status(200).send('Data updated successfully');
    }
});

exports.deleteCalRecordById = async (req, res) => {
    const deletedRecord = await DailyCalories.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
        return res.status(404).send('User not found');
    } else {
        res.status(200).send('Data deleted successfully');
    }
};

exports.saveCalRecord = async (req, res) => {
    const dailyCaloriesData = req.body; // the client will send dailyCaloriesObj as JSON
    // Save data to MongoDB
    const newRecord = await DailyCalories.create(dailyCaloriesData);
    if (!newRecord) {
        return res.status(404).send('Error: error saving data');
    } else {
        res.status(200).send('Data saved successfully');
    }
};