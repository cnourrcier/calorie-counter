// Extract the ID from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);
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

function createEntryHTML(entryNumber, value) {
    return `<label for="${value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input id="${value}-${entryNumber}-name" type="text" placeholder="Name" >
    <label for="${value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input id="${value}-${entryNumber}-calories" type="number" min= "0" placeholder="Calories" >
    `;
}

function addEntry() {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; // querySelectorAll(input[type="text"]) returns a NodeList of all the text inputs in the form
    const HTMLString = createEntryHTML(entryNumber, entryDropdown.value);
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateCalories(e) { // this function will be an event listener, e is the browser event, a commonly used name for it.
    e.preventDefault(); // prevents the submit event from reloading the page.
    isError = false; // reset global error flag to false.
    const fields = ['breakfast', 'lunch', 'dinner', 'snacks', 'exercise'];
    fieldData = {};
    fields.forEach(type => {
        const nameInputs = document.querySelectorAll(`#${type} input[type=text]`);
        const numberInputs = document.querySelectorAll(`#${type} input[type=number]`);
        const field = [];
        for (let i = 0; i < nameInputs.length; i++) {
            const name = nameInputs[i].value;
            const calories = parseInt(numberInputs[i].value);
            field.push({ name: name, calories: calories });
        }
        fieldData[type] = field;
    });
    const totalExerciseCalories = getCaloriesFromInputs(document.querySelectorAll(`#exercise input[type=number]`));
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]); // budgetNumberInput is an element, so pass it in array form.
    if (isError) {
        return null;
    }
    const totalConsumedCalories = fields.reduce((total, type) => total + getCaloriesFromInputs(document.querySelectorAll(`#${type} input[type=number]`)), 0) - totalExerciseCalories;
    const remainingCalories = budgetCalories - totalConsumedCalories + totalExerciseCalories;
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
    const dailyCaloriesObj = {
        ...fieldData,
        totalBreakfastCalories: getCaloriesFromInputs(document.querySelectorAll(`#breakfast input[type=number]`)),
        totalLunchCalories: getCaloriesFromInputs(document.querySelectorAll(`#lunch input[type=number]`)),
        totalDinnerCalories: getCaloriesFromInputs(document.querySelectorAll(`#dinner input[type=number]`)),
        totalSnacksCalories: getCaloriesFromInputs(document.querySelectorAll(`#snacks input[type=number]`)),
        totalExerciseCalories: totalExerciseCalories,
        budgetCalories: budgetCalories,
        totalConsumedCalories: totalConsumedCalories,
        calorieDifference: Math.abs(remainingCalories),
        surplusOrDeficit: surplusOrDeficit
    }
    console.log(dailyCaloriesObj);
    output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
                        <hr>
                        <p>${budgetCalories} Calories Budgeted</p>
                        <p>${totalConsumedCalories} Calories Consumed</p>
                        <p>${totalExerciseCalories} Calories Burned</p>
                        <button type="button" id="update">Update</button>
    `;
    output.classList.remove('hide');

    const updateButton = document.getElementById("update");
    updateButton.addEventListener('click', function () {
        updateData(dailyCaloriesObj)
        output.classList.add('hide');
    });
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

function updateData(dailyCaloriesObj) {
    console.log(dailyCaloriesObj);
    fetch(`/edit-calories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dailyCaloriesObj)
    })
        .then(res => {
            if (res.ok) {
                // Data saved successfully
                console.log('Data updated successfully');
                alert('Data updated successfully!');
            } else {
                // Error saving data
                console.error('Error saving data');
                alert('Error saving data!');
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