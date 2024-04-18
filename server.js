const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log('Connected to MongoDB');
    })

app.use('/', express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', '/index.html'));
})

// Serve CSS file
app.get('/views/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'styles.css'));
});

// Serve JavaScript file
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});