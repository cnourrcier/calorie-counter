# Calorie Counter

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Credits](#credits)
- [License](#license)

## Description
The Calorie Counter project is a web application designed to help users track their daily calorie intake and expenditure. Users can input their budgeted calorie allowance and log the calories consumed and burned through various meals and exercises. The application then calculates the remaining calorie balance and provides feedback on whether the user is in a calorie surplus or deficit.

**This application includes full CRUD (Create, Read, Update, Delete) functionality**

The front end portion of this project is based on the tutorial available on [freeCodeCamp.org](https://www.freecodecamp.org/). I have since modifed the code and added more features. Additionally, I have included a back end portion with a database. I am actively building on this project daily. The original project can be found [here](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/).

## Features
- Allows users to input their daily calorie budget.
- Enables users to add entries for meals (breakfast, lunch, dinner, snacks) and exercises.
- Automatically calculates the remaining calorie balance.
- Provides feedback on whether the user is in a calorie surplus or deficit.
- Allows user to save food, exercise, and calorie data to a database.
- Provides option to retrieve a list of total calories for all recorded dates.
- Allows user to view a comprehensive dataset for each date.
- Enables user to edit previously saved records.
- Gives user the option to delete records.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/cnourrcier/calorie-counter.git
```

2. Install dependencies:

```bash
cd calorie-counter
npm install
```

3. Set up MongoDB:
- Install MongoDB locally or use a cloud-based MongoDB service like MongoDB Atlas.
- Update the MongoDB connection string in `server.js` to point to your MongoDB instance.

## Usage

1. **Frontend Usage:**
    - Enter your daily calorie budget in the provided input field.
    - Add entries for each meal and exercise by selecting the appropriate dropdown option and filling in the details.
    - Click the "Add Entry" button to add the entry.
    - Once all entries are added, click the "Calculate Calories" button to calculate the remaining calorie balance.
    - View the output to see your calorie balance and whether you're in a surplus or deficit.
    - To save the form data, click the "Save" button.
    - To clear the form and start over, click the "Clear" button.
    - Choose an option from the selection dropdown to view history of total daily calories consumed or calorie stats by date.
    - Choose calorie stats by date and make the choice to edit or delete record by pressing the corresponding "Edit" or "Delete" button.

2. **Backend Configuration:**
    - Configure the backend server by setting up environment variables.
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
        ```
        PORT=<desired_port>
        MONGODB_URI=<your_mongodb_connection_string>
        ```
    - Replace `<your_mongodb_connection_string>` with your MongoDB connection string.
    - Start the server using `npm run start`.


## API Endpoints

| Endpoint                  | Method | Description                             |
|---------------------------|--------|-----------------------------------------|
| /                         | GET    | Serve home page                         |
| /view-calories-history    | GET    | Fetch total consumed calories history   |
| /view-calories-by-day     | GET    | Fetch calorie data for a specific day   |
| /edit-calories            | GET    | Serve edit calories page               |
| /edit-calories/:id        | PUT    | Update daily calorie data by ID        |
| /delete-record/:id        | DELETE | Delete daily calorie record by ID       |
| /save-daily-calories      | POST   | Save daily calorie data to MongoDB     |
| /*                        | GET    | Handle 404 Not Found                   |


## Credits
- This project is based on the tutorial available on [freeCodeCamp.org](https://www.freecodecamp.org/) as part of the JavaScript Algorithms and Data Structures (Beta) Certificate program. All credit for the tutorial content goes to the instructors and contributors at freeCodeCamp.

## License
This project is licensed under the BSD-3 License - see the [License](LICENSE) file for details. 



