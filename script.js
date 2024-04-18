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
    `;
    output.classList.remove('hide');
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
