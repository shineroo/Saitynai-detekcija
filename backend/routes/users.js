var express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');
const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

router.post('/', async function (req, res, next) {
    try {
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
    } catch (err) {
        console.log(err);
    }
    

});

router.get('/:id', async function (req, res, next) {
    try {
        const rows = await db.query(
            `SELECT * FROM users WHERE id='${req.params.id}' LIMIT 1`
        );
    
        if (rows.length === 0) {
            message = 'No user with this id';
            return res.json(200, {message});
    
        } else {
            data = rows;
            return res.json(200, {data});
        }
    } catch (err) {
        console.log(err);
    }
});

  
router.put('/:id', async function(req, res, next) {
    try {
    const result = await db.query(
        `UPDATE users
        SET given_name='${req.body.given_name}', family_name='${req.body.family_name}', 
            picture='${req.body.picture}', email=${req.body.email}, password=${req.body.password}, role=${req.body.role}
        WHERE id=${req.params.id}`
    );

    let message = 'error updating user';
    if (result.affectedRows) {
        message = 'user updated successfully';
        return res.json(200, {message});
    }
    return res.json(500, {message});

    } catch (err) {
    console.error(`error updating review `, err.message);
    return res.json(500, {message});
    }
});
  
router.delete('/:id', async function(req, res, next) {
    try {
        const result = await db.query(
            `DELETE FROM users WHERE id=${req.params.id}`
        );
        
        let message = 'error deleting review';
        
        if (result.affectedRows) {
            message = 'user deleted successfully';
            return res.json(200, {message});
        }
        return res.json(500, {message});

    } catch (err) {
    console.error(`error deleting review `, err.message);
    next(err);
    }
});

module.exports = router;