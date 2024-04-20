const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const calRoutes = require('./routes/calRoutes');

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
// aka, form data:
//'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, 'public')));

// serve routes
app.use('/', calRoutes);

// catch all for uncaught requests
app.get('/*', (req, res) => {
    res.status(404).send('404 Not Found');
})

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});