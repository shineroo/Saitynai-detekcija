const express = require('express');
const router = express.Router();
const reviews = require('../services/reviews');
const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');
const { RequestError } = require('request-promise/errors');
const { AuthorizationError } = require('../helper');

router.get('/', async function (req, res, next) {
    try {
      return res.json(await reviews.getMultiple(req.query.page));
    } catch (err) {
        console.error(`error getting reviews `, err.message);
        next(err);
        return res.status(500).json('internal server error');
    }
});

router.get('/:id', async function (req, res, next) {
  try {
      const rows = await db.query(
        `SELECT * FROM reviews WHERE id=${req.params.id}`
      );

      if (rows.length === 0) {        
        return res.status(404).json('no review with this id');
      } else {
        data = rows;
        return res.json({data});
      }

  } catch (err) {
      console.error(`error getting review `, err.message);
      next(err);
      return res.status(500).json('internal server error');
  }
});

router.post('/', async function (req, res, next) {
    try {
      if (helper.validToken(req.headers.authorization)) {
        if (
            req.body.author === undefined
            || req.body.text === undefined
            || req.body.rating === undefined
            || isNaN(req.body.rating)) {
          throw new RequestError('Incorrect request structure')
        }
  
        const result = await db.query(
          `INSERT INTO reviews
          (author, text, rating, fk_product)
          VALUES
          ('${req.body.author}', '${req.body.text}', ${req.body.rating}, ${req.body.fk_product})`
        );
        let message = 'error creating review';
  
        if (result.affectedRows) {
            message = 'review created successfully';
            return res.status(201).json(message);
        } else {
          return res.status(500).json(message);
        }
      } else {
        throw new AuthorizationError('Not authorized');
      }      
    } catch (err) {

      switch (true) {
        case err instanceof RequestError:
          console.error(`error creating review`, err.message);
          return res.status(400).json("Incorrect request structure.");
          break;
        
        case err instanceof AuthorizationError:
          return res.status(401).json("Not authorized.");
          break;
        
        default:
          console.error(`error creating review`, err.message);
          next(err);
          return res.status(500).json('internal server error');
          break;
      }
    }
})

router.put('/:id', async function(req, res, next) {
  try {
    if (helper.administratorToken(req.headers.authorization)) {
      if (
          req.body.author === undefined
          || req.body.text === undefined
          || req.body.rating === undefined
          || isNaN(req.body.rating)) {
        throw new RequestError('Incorrect request structure')
      }

      const result = await db.query(
          `UPDATE categories
          SET author='${req.body.author}', text='${req.body.text}', rating=${req.body.rating}
          WHERE id=${req.params.id}`
      );

      let message = 'error creating review';

      if (result.affectedRows) {
          message = 'review updated successfully';
          return res.status(200).json(message);
      } else {
        return res.status(404).json("no review with this id");
      }
    } else {
      throw new AuthorizationError('Not authorized');
    }      
  } catch (err) {
    // this should really be a switch
    if (err instanceof RequestError) {
      console.error(`error creating review`, err.message);
      return res.status(400).json("Incorrect request structure.");
    } else if (err instanceof AuthorizationError) {
      return res.status(401).json("Not authorized.");
    } else {
      console.error(`error creating review`, err.message);
      next(err);
      return res.status(500).json('internal server error'); 
    }
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    if (helper.administratorToken(req.headers.authorization)) {
      const result = await db.query(
        `DELETE FROM reviews WHERE id=${req.params.id}`
      );

      if (result.affectedRows) {        
        return res.status(200).json('review deleted successfully');
      } else {
        return res.status(404).json('no review with this id');
      }
    } else {
      throw new AuthorizationError('Not authorized');
    }

  } catch (err) {
      switch (true) {
        case err instanceof RequestError:
          console.error(`error deleting review`, err.message);
          return res.status(400).json("Incorrect request structure.");
          break;
        
        case err instanceof AuthorizationError:
          return res.status(401).json("Not authorized.");
          break;
        
        default:
          console.error(`error deleting review`, err.message);
          next(err);
          return res.status(500).json('internal server error');
          break;
      }
  }
});

module.exports = router;