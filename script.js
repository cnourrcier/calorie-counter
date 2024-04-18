const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
let isError = false;

function cleanInputString(str) {
    const regex = /[+-\s]/g; // g makes it global, meaning it will search the entire string beyond the first instance.
    return str.replace(regex, "");
}

function isInvalidInput(str) {
    const regex = /\d+e\d+/i; // i makes it case insensitive
    return str.match(regex);
}

function addEntry() {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; // querySelectorAll(input[type="text"]) returns a NodeList of all the text inputs in the form
    const HTMLString = `<label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
                        <input id="${entryDropdown.value}-${entryNumber}-name" type="text" placeholder="Name" >
                        <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
                        <input id="${entryDropdown.value}-${entryNumber}-calories" type="number" min= "0" placeholder="Calories" >
                        `;
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateCalories(e) { // this function will be an event listener, e is the browser event, a commonly used name for it.
    e.preventDefault(); // prevents the submit event from reloading the page.
    isError = false; // reset global error flag to false.
    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]'); // This returns any number inputs in the #breakfast element.
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]); // budgetNumberInput is an element, so pass it in array form.
    if (isError) {
        return null;
    }
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories; // Order matters for the tests
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
    output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
                        <hr>
                        <p>${budgetCalories} Calories Budgeted</p>
                        <p>${consumedCalories} Calories Consumed</p>
                        <p>${exerciseCalories} Calories Burned</p>
                        <button type="button" id="save">Save</button>
    `;
    output.classList.remove('hide');

    const saveButton = document.getElementById("save");
    saveButton.addEventListener('click', saveData);
}

function getCaloriesFromInputs(list) { // list will be the result of query selector, which is a NodeList, which is similar to an array.
    let calories = 0;
    for (const item of list) {
        const currVal = cleanInputString(item.value);
        const invalidInputMatch = isInvalidInput(currVal);
        if (invalidInputMatch) {
            alert(`Invalid Input: ${invalidInputMatch[0]}`);
            isError = true;
            return null; // return null to indicate the function has failed.
        }
        calories += Number(currVal);
    }
    return calories;
}

function saveData() {
    isError = false;
    const breakfastFoodInputs = document.querySelectorAll('#breakfast input[type=text]');
    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]'); // This returns any number inputs in the #breakfast element.
    const breakfastFoods = [];
    for (let i = 0; i < breakfastFoodInputs.length; i++) {
        const foodName = breakfastFoodInputs[i].value;
        const calories = parseInt(breakfastNumberInputs[i].value);
        breakfastFoods.push({ name: foodName, calories: calories });
    }
    const lunchFoodInputs = document.querySelectorAll('#lunch input[type=text]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
    const lunchFoods = [];
    for (let i = 0; i < lunchFoodInputs.length; i++) {
        const foodName = lunchFoodInputs[i].value;
        const calories = parseInt(lunchNumberInputs[i].value);
        lunchFoods.push({ name: foodName, calories: calories });
    }
    const dinnerFoods = [];
    const dinnerFoodInputs = document.querySelectorAll('#dinner input[type=text]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    for (let i = 0; i < dinnerFoodInputs.length; i++) {
        const foodName = dinnerFoodInputs[i].value;
        const calories = parseInt(dinnerNumberInputs[i].value);
        dinnerFoods.push({ name: foodName, calories: calories });
    }
    const snackFoods = [];
    const snacksFoodInputs = document.querySelectorAll('#snacks input[type=text]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    for (let i = 0; i < snacksFoodInputs.length; i++) {
        const foodName = snacksFoodInputs[i].value;
        const calories = parseInt(snacksNumberInputs[i].value);
        snackFoods.push({ name: foodName, calories: calories });
    }
    const exercises = [];
    const exerciseNameInputs = document.querySelectorAll('#exercise input[type=text]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');
    for (let i = 0; i < exerciseNameInputs.length; i++) {
        const exerciseName = exerciseNameInputs[i].value;
        const calories = parseInt(exerciseNumberInputs[i].value);
        exercises.push({ name: exerciseName, calories: calories });
    }
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
    if (isError) {
        return null;
    }
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories; // Order matters for the tests
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
    dailyCaloriesObj = {
        breakfast: breakfastFoods,
        lunch: lunchFoods,
        dinner: dinnerFoods,
        snacks: snackFoods,
        exercises: exercises,
        totalBreakfastCalories: breakfastCalories,
        totalLunchCalories: lunchCalories,
        totalDinnerCalories: dinnerCalories,
        totalSnacksCalories: snacksCalories,
        totalExerciseCalories: exerciseCalories,
        budgetCalories: budgetCalories,
        totalConsumedCalories: consumedCalories,
        calorieDifference: remainingCalories,
        surplusOrDeficit: surplusOrDeficit
    }
    console.log(dailyCaloriesObj);
    fetch('/calorie-stats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dailyCaloriesObj)
    })
        .then(response => {
            if (response.ok) {
                // Data saved successfully
                console.log('Data saved successfully');
            } else {
                // Error saving data
                console.error('Error saving data');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function clearForm() {
    const inputContainers = Array.from(document.querySelectorAll('.input-container')); // Get all elements with class of input-container. Wrap in Array.from to convert to array to have access to array methods.
    for (const container of inputContainers) {
        container.innerHTML = '';
    }
    budgetNumberInput.value = '';
    output.innerText = '';
    output.classList.add('hide');
}

addEntryButton.addEventListener('click', addEntry);
calorieCounter.addEventListener('submit', calculateCalories);
clearButton.addEventListener('click', clearForm);
