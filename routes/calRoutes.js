const express = require('express');
const router = express.Router();
const calController = require('../controllers/calController');


router.route('/')
    .get(calController.getHomePage);

router.route('/view-calories-history')
    .get(calController.viewCaloriesHistory);

router.route('/view-calories-by-day')
    .get(calController.viewCaloriesByDay);

router.route('/edit-calories')
    .get(calController.getEditCaloriesPage);

router.route('/edit-calories/:id')
    .put(calController.editCaloriesById);

router.route('/delete-record/:id')
    .delete(calController.deleteCalRecordById);

router.route('/save-daily-calories')
    .post(calController.saveCalRecord);

module.exports = router;