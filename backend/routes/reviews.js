const express = require('express');
const router = express.Router();
const reviews = require('../services/reviews');

// GET CATEGORIES
router.get('/', async function (req, res, next) {
    try {
        res.json(await reviews.getMultiple(req.query.page));
    } catch (err) {
        console.error(`error getting reviews `, err.message);
        next(err);
    }
});

router.get('/product/:id', async function (req, res, next) {
  try {
      res.json(await reviews.getProductReviews(req.query.page, req.params.id));
  } catch (err) {
      console.error(`error getting product reviews `, err.message);
      next(err);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
      res.json(await reviews.get(req.params.id));
  } catch (err) {
      console.error(`error getting review `, err.message);
      next(err);
  }
});

router.post('/', async function (req, res, next) {
    try {
        res.json(await reviews.create(req.body))
    } catch (err) {
        console.error(`error creating review `, err.message);
        next(err);
    }
})

router.put('/:id', async function(req, res, next) {
    try {
      res.json(await reviews.update(req.params.id, req.body));
    } catch (err) {
      console.error(`error updating review `, err.message);
      next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await reviews.remove(req.params.id));
    } catch (err) {
      console.error(`error deleting review `, err.message);
      next(err);
    }
});

module.exports = router;