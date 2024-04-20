const dateForm = document.getElementById("date-form");
const output = document.getElementById("output");


function getDate(e) {
    e.preventDefault();
    const selectedDate = document.getElementById("date-input").value;
    console.log(selectedDate);
    fetchData(selectedDate);
}

function fetchData(date) {
    fetch(`/view-calories-by-day?date=${date}`)
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
    showButtons(dataObj._id);
}

function showButtons(id) {
    output.innerHTML = `<button type="button" id="edit">Edit</button>
                        <button type="button" id="delete">Delete</button>`;
    output.classList.remove('hide');

    const editButton = document.getElementById("edit");
    const deleteButton = document.getElementById("delete");
    editButton.addEventListener('click', function () {
        redirectUrl = `edit-calories?id=${id}`;
        redirectForm(redirectUrl);
    })
    deleteButton.addEventListener('click', function () {
        deleteRecord(id);
    })
}

function deleteRecord(id) {
    fetch(`/delete-record/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => {
            if (res.ok) {
                // Data saved successfully
                console.log('Data deleted successfully');
                alert('Data deleted successfully!');
            } else {
                // Error saving data
                console.error('Error deleting data');
                alert('Error deleting data!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    redirectForm('/');
}

function redirectForm(redirectUrl) {
    window.location.href = redirectUrl;
}

function displayMessage(message) {
    const caloriesDataDiv = document.getElementById('calories-data');
    caloriesDataDiv.innerHTML = `<p>${message}</p>`;
}

dateForm.addEventListener("submit", getDate);