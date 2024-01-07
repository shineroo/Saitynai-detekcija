const express = require('express');
const router = express.Router();
const categories = require('../services/categories');
const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');
const { RequestError } = require('request-promise/errors');
const {AuthorizationError} = require('../helper');


// GET CATEGORIES
router.get('/', async function (req, res, next) {
    try {
        res.json(await categories.getMultiple(req.query.page));
    } catch (err) {
        console.error(`error getting categories `, err.message);
        return res.status(500).json("internal server error");
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
  try {
      const rows = await db.query(
        `SELECT * FROM categories WHERE id=${req.params.id}`
      );

      if (rows.length === 0) {        
        return res.status(404).json('no category with this id');
      } else {
        data = rows;
        return res.json({data});
      }

  } catch (err) {
      console.error(`error getting category `, err.message);
      next(err);
      return res.status(500).json('internal server error');
  }
});

router.post('/', async function (req, res, next) {
    try {
      if (helper.administratorToken(req.headers.authorization)) {
        if (req.body.name === undefined) {
          throw new RequestError('Incorrect request structure')
        }
  
        const result = await db.query(
          `INSERT INTO categories
          (name)
          VALUES
          ('${req.body.name}')`
        );
        let message = 'error creating category';
  
        if (result.affectedRows) {
            message = 'category created successfully';
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
          console.error(`error creating category`, err.message);
          return res.status(400).json("Incorrect request structure.");
          break;
        
        case err instanceof AuthorizationError:
          return res.status(401).json("Not authorized.");
          break;
        
        default:
          console.error(`error creating category`, err.message);
          next(err);
          return res.status(500).json('internal server error');
          break;
      }
    }
})

router.put('/:id', async function(req, res, next) {
  try {
    if (helper.administratorToken(req.headers.authorization)) {
      if (req.body.name === undefined) {
        throw new RequestError('Incorrect request structure')
      }

      const result = await db.query(
          `UPDATE categories
          SET name='${req.body.name}'
          WHERE id=${req.params.id}`
      );

      let message = 'error creating category';

      if (result.affectedRows) {
          message = 'category updated successfully';
          return res.status(200).json(message);
      } else {
        return res.status(404).json("no category with this id");
      }
    } else {
      throw new AuthorizationError('Not authorized');
    }      
  } catch (err) {
    // this should really be a switch
    if (err instanceof RequestError) {
      console.error(`error creating category`, err.message);
      return res.status(400).json("Incorrect request structure.");
    } else if (err instanceof AuthorizationError) {
      return res.status(401).json("Not authorized.");
    } else {
      console.error(`error creating category`, err.message);
      next(err);
      return res.status(500).json('internal server error'); 
    }
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    if (helper.administratorToken(req.headers.authorization)) {
      const result = await db.query(
        `DELETE FROM categories WHERE id=${req.params.id}`
      );

      if (result.affectedRows) {        
        return res.status(200).json('category deleted successfully');
      } else {
        return res.status(404).json('no category with this id');
      }
    } else {
      throw new AuthorizationError('Not authorized');
    }

  } catch (err) {
      switch (true) {
        case err instanceof RequestError:
          console.error(`error creating category`, err.message);
          return res.status(400).json("Incorrect request structure.");
          break;
        
        case err instanceof AuthorizationError:
          return res.status(401).json("Not authorized.");
          break;
        
        default:
          console.error(`error creating category`, err.message);
          next(err);
          return res.status(500).json('internal server error');
          break;
      }
  }
});

module.exports = router;