// i guess server.js is a good name?
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3001;

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'commerce',
})

db.connect((err) => {
    if (err) {
        console.error('database connection error: ', err);
    } else {
        console.log('connected to mysql database');
    }
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})

// API requests
app.get('/api/categories', (req, res) => {    
    const query = 'SELECT * FROM kategorijos'
    db.query(query, (err, result) => {
        if (err) {
            console.error('error executing query: ', err);
            res.status(500).json({ error: 'Internal server error'});
            return;
        }
    

        console.log(`GET request to /api/categories.`);
        res.json(result);
    });
})