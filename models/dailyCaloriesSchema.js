const mongoose = require('mongoose');

const dailyCaloriesSchema = new mongoose.Schema({
    breakfast: [{ name: String, calories: Number }],
    lunch: [{ name: String, calories: Number }],
    dinner: [{ name: String, calories: Number }],
    snacks: [{ name: String, calories: Number }],
    exercise: [{ name: String, calories: Number }],
    totalBreakfastCalories: Number,
    totalLunchCalories: Number,
    totalDinnerCalories: Number,
    totalSnacksCalories: Number,
    totalExerciseCalories: Number,
    budgetCalories: Number,
    totalConsumedCalories: Number,
    calorieDifference: Number,
    surplusOrDeficit: String,
    date: {
        type: Date,
        default: function () {
            // Only set the createdAt field if it's not already set
            if (this.isNew) {
                const today = new Date();
                return new Date(today.getFullYear(), today.getMonth(), today.getDate());
            }
        }
    }
});

const DailyCalories = mongoose.model('DailyCalories', dailyCaloriesSchema);

module.exports = DailyCalories;