const dateForm = document.getElementById("date-form");
const output = document.getElementById("output");


function getDate(e) {
    e.preventDefault();
    const selectedDate = document.getElementById("date-input").value;
    console.log(selectedDate);
    fetchData(selectedDate);
}

function fetchData(date) {
    fetch(`/get-calories-by-date?date=${date}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Failed to fetch data');
            }
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayMessage('Failed to fetch data. Please try again');
        });
}

function displayData(data) {
    dataObj = data[0];
    const caloriesDataDiv = document.getElementById('calories-data');
    caloriesDataDiv.innerHTML = ''; // Clear previous data
    if (data.length === 0) {
        displayMessage('No data found for the selected date.');
    } else {
        // Display fetched data
        data.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.textContent = JSON.stringify(entry);
            caloriesDataDiv.appendChild(entryDiv);
        });
    }
    showEditButton(dataObj._id);
}

function showEditButton(id) {
    output.innerHTML = `<button type="button" id="edit">Edit</button>`;
    output.classList.remove('hide');

    const editButton = document.getElementById("edit");
    editButton.addEventListener('click', function () {
        redirectToEditForm(id)
    })
}

function redirectToEditForm(id) {
    redirectUrl = `edit-calories/${id}`;
    window.location.href = redirectUrl;
    // I want to redirect to a new page with a form to update the data, 
    // I want to pass the id because I need to send it with the updated data to the server
}

function displayMessage(message) {
    const caloriesDataDiv = document.getElementById('calories-data');
    caloriesDataDiv.innerHTML = `<p>${message}</p>`;
}

dateForm.addEventListener("submit", getDate);