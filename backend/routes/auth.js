var express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');
const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

router.post('/login', async function (req, res, next) {
    const rows = await db.query(
        `SELECT * FROM users WHERE email='${req.body.email}' and password='${req.body.password}' LIMIT 1`
    );

    if (rows.length === 0) {
        data = 'Incorrect login details';
        return res.status(404).json("incorrect login details");
    } else {
        data = rows;
    }

    token = jwt.sign({ data }, "secret", { algorithm: 'HS256'});

    return res.json({data, token});
});

router.post('/register', async function (req, res, next) {
    const rows = await db.query(
        `SELECT * FROM users WHERE email='${req.body.email}' LIMIT 1`
    );

    if (rows.length === 0) {
        const result = await db.query(
            `INSERT INTO users
            (email, password, given_name, family_name, picture, role)
            VALUES
            ('${req.body.email}', '${req.body.password}', '${req.body.given_name}', '${req.body.family_name}', 'default', 'user')`
        );
        let message = 'Error registering user, please try again';

        if (result.affectedRows) {
            message = 'User registered successfully';
            return res.json(200, {message});
        }
        return res.json(500, {message});

    } else {
        message = 'There already is an account registered to this email';
        return res.json(409, {message});
    }

});

router.get('/', (req, res) => {
    const token = req.headers.authorization;
    console.log("This guy wants to know if he's in")
    console.log("bro said my token is " + token)
    if (!token) {
        console.log("the fool actually forgot his token")
      return res.json({ authenticated: false });
    }
  
    try {
        const decoded = jwt.verify(token.split(" ")[1], "secret");
        console.log(`looks good. role: ${decoded.role}`)
        return res.json({ authenticated: true, role: decoded.role, name: decoded.name, picture: decoded.picture });
    } catch (error) {
        console.log("what a moron. " + error)
        return res.json({ authenticated: false });
    }
    
});

module.exports = router;